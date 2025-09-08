import { useState, useEffect, useMemo, useCallback } from 'react';
import { getCoinDetail, getCoinHistory, formatApiError } from '../utils/coingeckoApi.js';
import { usePerformance } from './usePerformance';

interface CoinDetailData {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
    small: string;
    thumb: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    market_cap_rank: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    price_change_percentage_1h?: number;
    price_change_percentage_14d?: number;
    price_change_percentage_200d?: number;
    price_change_percentage_1y?: number;
    total_volume: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: {
      usd: number;
    };
    ath_change_percentage: {
      usd: number;
    };
    ath_date: {
      usd: string;
    };
    atl: {
      usd: number;
    };
    atl_change_percentage: {
      usd: number;
    };
    atl_date: {
      usd: string;
    };
    last_updated: string;
  };
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    subreddit_url: string;
    repos_url: {
      github: string[];
    };
  };
  community_data?: {
    facebook_likes: number;
    twitter_followers: number;
    reddit_average_posts_48h: number;
    reddit_average_comments_48h: number;
    reddit_subscribers: number;
  };
  developer_data?: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
  };
}

interface ChartDataPoint {
  timestamp: number;
  date: string;
  price: number;
  volume: number;
  priceChange?: number;
  priceChangePercent?: number;
}

export function useOptimizedCoinDetail(coinId: string | undefined) {
  const [coinData, setCoinData] = useState<CoinDetailData | null>(null);
  const [priceHistory, setPriceHistory] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartError, setChartError] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1' | '7' | '30' | '90' | '365'>('7');

  // Performance monitoring
  usePerformance('CoinDetail');

  // Memoized API call functions
  const fetchCoinData = useCallback(async () => {
    if (!coinId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const data = await getCoinDetail(coinId, {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: true,
        developer_data: true,
        sparkline: false,
      });
      
      setCoinData(data);
    } catch (err) {
      console.error('Error fetching coin data:', err);
      setError(formatApiError(err));
    } finally {
      setLoading(false);
    }
  }, [coinId]);

  const fetchPriceHistory = useCallback(async () => {
    if (!coinId) return;
    
    try {
      setChartLoading(true);
      setChartError(null);
      
      const historyData = await getCoinHistory(coinId, 'usd', selectedTimeframe, 'daily');
      
      // Transform data for chart
      const chartData: ChartDataPoint[] = historyData.prices.map(([timestamp, price]: [number, number], index: number) => {
        const previousPrice = index > 0 ? historyData.prices[index - 1][1] : price;
        const priceChange = price - previousPrice;
        const priceChangePercent = previousPrice !== 0 ? (priceChange / previousPrice) * 100 : 0;
        
        return {
          timestamp,
          date: new Date(timestamp).toLocaleDateString(),
          price,
          volume: historyData.total_volumes[index]?.[1] || 0,
          priceChange,
          priceChangePercent,
        };
      });
      
      setPriceHistory(chartData);
    } catch (err) {
      console.error('Error fetching price history:', err);
      setChartError(formatApiError(err));
    } finally {
      setChartLoading(false);
    }
  }, [coinId, selectedTimeframe]);

  // Fetch coin detail data
  useEffect(() => {
    fetchCoinData();
  }, [fetchCoinData]);

  // Fetch price history data
  useEffect(() => {
    fetchPriceHistory();
  }, [fetchPriceHistory]);

  // Memoized chart colors calculation
  const chartColors = useMemo(() => {
    if (priceHistory.length < 2) {
      return {
        stroke: 'hsl(var(--primary))',
        fill: 'hsl(var(--primary) / 0.1)',
        gradientStart: 'hsl(var(--primary) / 0.3)',
        gradientEnd: 'hsl(var(--primary) / 0.05)',
      };
    }

    const firstPrice = priceHistory[0].price;
    const lastPrice = priceHistory[priceHistory.length - 1].price;
    const isPositive = lastPrice >= firstPrice;

    if (isPositive) {
      return {
        stroke: '#10b981', // green-500
        fill: '#10b981',
        gradientStart: '#10b981',
        gradientEnd: '#10b981',
      };
    } else {
      return {
        stroke: '#ef4444', // red-500
        fill: '#ef4444',
        gradientStart: '#ef4444',
        gradientEnd: '#ef4444',
      };
    }
  }, [priceHistory]);

  // Memoized format functions
  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }, []);

  const formatMarketCap = useCallback((value: number) => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`;
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    }
    return formatPrice(value);
  }, [formatPrice]);

  const formatPercentage = useCallback((value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  }, []);

  const formatDate = useCallback((timestamp: number) => {
    const date = new Date(timestamp);
    if (selectedTimeframe === '1') {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }, [selectedTimeframe]);

  const getTimeframeLabel = useCallback((timeframe: string) => {
    const labels = {
      '1': '1 Day',
      '7': '7 Days',
      '30': '30 Days',
      '90': '90 Days',
      '365': '1 Year'
    };
    return labels[timeframe as keyof typeof labels] || timeframe;
  }, []);

  // Memoized retry functions
  const retryCoinData = useCallback(() => {
    fetchCoinData();
  }, [fetchCoinData]);

  const retryPriceHistory = useCallback(() => {
    fetchPriceHistory();
  }, [fetchPriceHistory]);

  return {
    // Data
    coinData,
    priceHistory,
    chartColors,
    
    // Loading states
    loading,
    chartLoading,
    
    // Error states
    error,
    chartError,
    
    // Timeframe
    selectedTimeframe,
    setSelectedTimeframe,
    
    // Format functions
    formatPrice,
    formatMarketCap,
    formatPercentage,
    formatDate,
    getTimeframeLabel,
    
    // Retry functions
    retryCoinData,
    retryPriceHistory,
  };
}
