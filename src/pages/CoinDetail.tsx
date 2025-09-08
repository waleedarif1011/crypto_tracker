import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Star,
  ExternalLink,
  DollarSign,
  BarChart3,
  Activity,
  Globe
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { getCoinDetail, getCoinHistory, formatApiError } from '../utils/coingeckoApi.js';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

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

export function CoinDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [coinData, setCoinData] = useState<CoinDetailData | null>(null);
  
  console.log('CoinDetail component loaded with id:', id);
  const [priceHistory, setPriceHistory] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartError, setChartError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1' | '7' | '30' | '90' | '365'>('7');

  // Fetch coin detail data
  useEffect(() => {
    const fetchCoinData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const data = await getCoinDetail(id, {
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
    };

    fetchCoinData();
  }, [id]);

  // Fetch price history data
  useEffect(() => {
    const fetchPriceHistory = async () => {
      if (!id) return;
      
      try {
        setChartLoading(true);
        setChartError(null);
        
        const historyData = await getCoinHistory(id, 'usd', selectedTimeframe, 'daily');
        
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
    };

    fetchPriceHistory();
  }, [id, selectedTimeframe]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`;
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    }
    return formatPrice(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    if (selectedTimeframe === '1') {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTimeframeLabel = (timeframe: string) => {
    const labels = {
      '1': '1 Day',
      '7': '7 Days',
      '30': '30 Days',
      '90': '90 Days',
      '365': '1 Year'
    };
    return labels[timeframe as keyof typeof labels] || timeframe;
  };

  const getChartColors = () => {
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
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const priceChange = data.priceChange || 0;
      const priceChangePercent = data.priceChangePercent || 0;
      const isPositive = priceChange >= 0;

      return (
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 min-w-[200px]">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2 font-medium">
            {formatDate(data.timestamp)}
          </p>
          <div className="space-y-1">
            <p className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
              {formatPrice(data.price)}
            </p>
            {priceChange !== 0 && (
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {isPositive ? '+' : ''}{formatPrice(priceChange)}
                </span>
                <span className={`text-sm font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  ({isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%)
                </span>
              </div>
            )}
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Volume: {formatMarketCap(data.volume)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (error || !coinData) {
    return (
      <div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
            {error || 'Coin not found'}
          </h2>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={coinData.image.large}
              alt={coinData.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
                  {coinData.name}
                </h1>
                <span className="text-lg text-neutral-600 dark:text-neutral-400 uppercase">
                  {coinData.symbol}
                </span>
                <span className="text-sm bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-full text-neutral-600 dark:text-neutral-400">
                  #{coinData.market_data.market_cap_rank}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                  {formatPrice(coinData.market_data.current_price.usd)}
                </span>
                <div className="flex items-center gap-1">
                  {coinData.market_data.price_change_percentage_24h >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-success-600 dark:text-success-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-danger-600 dark:text-danger-400" />
                  )}
                  <span
                    className={`font-medium ${
                      coinData.market_data.price_change_percentage_24h >= 0
                        ? 'price-up'
                        : 'price-down'
                    }`}
                  >
                    {formatPercentage(coinData.market_data.price_change_percentage_24h)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsFavorite(!isFavorite)}
              className={isFavorite ? 'text-yellow-500 border-yellow-500' : ''}
            >
              <Star className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Favorited' : 'Add to Favorites'}
            </Button>
            {coinData.links.homepage[0] && (
              <a
                href={coinData.links.homepage[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg border border-neutral-300 dark:border-neutral-600 bg-transparent text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:ring-primary-500 transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Price History Chart */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Price History
            </CardTitle>
            <div className="flex gap-2">
              {(['1', '7', '30', '90', '365'] as const).map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className="text-xs"
                >
                  {getTimeframeLabel(timeframe)}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {chartLoading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <LoadingSpinner size="lg" />
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Loading price history...
              </p>
            </div>
          ) : chartError ? (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-danger-600 dark:text-danger-400 mb-2 font-medium">
                  Failed to load price history
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  {chartError}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setChartError(null);
                    setChartLoading(true);
                    // Re-trigger the effect by updating a dependency
                    setSelectedTimeframe(selectedTimeframe);
                  }}
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : priceHistory.length > 0 ? (
            <div className="h-64 sm:h-80 lg:h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={getChartColors().gradientStart} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={getChartColors().gradientEnd} stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" stroke="currentColor" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={formatDate}
                    className="text-xs fill-current"
                    axisLine={false}
                    tickLine={false}
                    minTickGap={32}
                  />
                  <YAxis 
                    domain={['dataMin - 100', 'dataMax + 100']}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    className="text-xs fill-current"
                    axisLine={false}
                    tickLine={false}
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={getChartColors().stroke}
                    strokeWidth={2}
                    fill="url(#priceGradient)"
                    dot={false}
                    activeDot={{ 
                      r: 6, 
                      fill: getChartColors().stroke,
                      stroke: '#fff',
                      strokeWidth: 2,
                      style: { filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
              </div>
              <div>
                <p className="text-neutral-600 dark:text-neutral-400 font-medium mb-1">
                  No price history data available
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-500">
                  Price data may not be available for this time period
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Price Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Market Cap</p>
                <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                  {formatMarketCap(coinData.market_data.market_cap.usd)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">24h Volume</p>
                <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                  {formatMarketCap(coinData.market_data.total_volume.usd)}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">24h High</p>
                <p className="text-lg font-semibold text-success-600 dark:text-success-400">
                  {formatPrice(coinData.market_data.high_24h.usd)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-success-600 dark:text-success-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">24h Low</p>
                <p className="text-lg font-semibold text-danger-600 dark:text-danger-400">
                  {formatPrice(coinData.market_data.low_24h.usd)}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-danger-600 dark:text-danger-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Price Change Periods */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Price Changes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {coinData.market_data.price_change_percentage_1h !== undefined && (
              <div className="text-center">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">1 Hour</p>
                <p
                  className={`text-lg font-semibold ${
                    coinData.market_data.price_change_percentage_1h >= 0
                      ? 'price-up'
                      : 'price-down'
                  }`}
                >
                  {formatPercentage(coinData.market_data.price_change_percentage_1h)}
                </p>
              </div>
            )}
            <div className="text-center">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">24 Hours</p>
              <p
                className={`text-lg font-semibold ${
                  coinData.market_data.price_change_percentage_24h >= 0
                    ? 'price-up'
                    : 'price-down'
                }`}
              >
                {formatPercentage(coinData.market_data.price_change_percentage_24h)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">7 Days</p>
              <p
                className={`text-lg font-semibold ${
                  coinData.market_data.price_change_percentage_7d >= 0
                    ? 'price-up'
                    : 'price-down'
                }`}
              >
                {formatPercentage(coinData.market_data.price_change_percentage_7d)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">30 Days</p>
              <p
                className={`text-lg font-semibold ${
                  coinData.market_data.price_change_percentage_30d >= 0
                    ? 'price-up'
                    : 'price-down'
                }`}
              >
                {formatPercentage(coinData.market_data.price_change_percentage_30d)}
              </p>
            </div>
            {coinData.market_data.price_change_percentage_200d !== undefined && (
              <div className="text-center">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">200 Days</p>
                <p
                  className={`text-lg font-semibold ${
                    coinData.market_data.price_change_percentage_200d >= 0
                      ? 'price-up'
                      : 'price-down'
                  }`}
                >
                  {formatPercentage(coinData.market_data.price_change_percentage_200d)}
                </p>
              </div>
            )}
            {coinData.market_data.price_change_percentage_1y !== undefined && (
              <div className="text-center">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">1 Year</p>
                <p
                  className={`text-lg font-semibold ${
                    coinData.market_data.price_change_percentage_1y >= 0
                      ? 'price-up'
                      : 'price-down'
                  }`}
                >
                  {formatPercentage(coinData.market_data.price_change_percentage_1y)}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ATH/ATL Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success-600 dark:text-success-400" />
              All-Time High
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Price</p>
                <p className="text-xl font-bold text-success-600 dark:text-success-400">
                  {formatPrice(coinData.market_data.ath.usd)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Date</p>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                  {new Date(coinData.market_data.ath_date.usd).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">From ATH</p>
                <p className="text-sm font-medium text-danger-600 dark:text-danger-400">
                  {formatPercentage(coinData.market_data.ath_change_percentage.usd)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-danger-600 dark:text-danger-400" />
              All-Time Low
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Price</p>
                <p className="text-xl font-bold text-danger-600 dark:text-danger-400">
                  {formatPrice(coinData.market_data.atl.usd)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Date</p>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                  {new Date(coinData.market_data.atl_date.usd).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">From ATL</p>
                <p className="text-sm font-medium text-success-600 dark:text-success-400">
                  {formatPercentage(coinData.market_data.atl_change_percentage.usd)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Supply Information */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Supply Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Circulating Supply</p>
              <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                {coinData.market_data.circulating_supply.toLocaleString()} {coinData.symbol.toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Total Supply</p>
              <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                {coinData.market_data.total_supply?.toLocaleString() || 'N/A'} {coinData.symbol.toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Max Supply</p>
              <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                {coinData.market_data.max_supply?.toLocaleString() || 'N/A'} {coinData.symbol.toUpperCase()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community & Developer Data */}
      {(coinData.community_data || coinData.developer_data) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {coinData.community_data && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Community Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {coinData.community_data.reddit_subscribers && (
                    <div className="text-center">
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Reddit Subscribers</p>
                      <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                        {coinData.community_data.reddit_subscribers.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {coinData.community_data.twitter_followers && (
                    <div className="text-center">
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Twitter Followers</p>
                      <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                        {coinData.community_data.twitter_followers.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {coinData.community_data.facebook_likes && (
                    <div className="text-center">
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Facebook Likes</p>
                      <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                        {coinData.community_data.facebook_likes.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {coinData.community_data.reddit_average_posts_48h && (
                    <div className="text-center">
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Reddit Posts (48h)</p>
                      <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                        {coinData.community_data.reddit_average_posts_48h.toFixed(1)}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {coinData.developer_data && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Developer Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {coinData.developer_data.stars && (
                    <div className="text-center">
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">GitHub Stars</p>
                      <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                        {coinData.developer_data.stars.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {coinData.developer_data.forks && (
                    <div className="text-center">
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">GitHub Forks</p>
                      <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                        {coinData.developer_data.forks.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {coinData.developer_data.total_issues && (
                    <div className="text-center">
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Issues</p>
                      <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                        {coinData.developer_data.total_issues.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {coinData.developer_data.pull_requests_merged && (
                    <div className="text-center">
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Merged PRs</p>
                      <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                        {coinData.developer_data.pull_requests_merged.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Links */}
      {(coinData.links.homepage.length > 0 || coinData.links.blockchain_site.length > 0 || coinData.links.repos_url?.github?.length > 0) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {coinData.links.homepage.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-neutral-300 dark:border-neutral-600 bg-transparent text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:ring-primary-500 transition-colors duration-200"
                >
                  <Globe className="w-4 h-4" />
                  Website
                </a>
              ))}
              {coinData.links.blockchain_site.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-neutral-300 dark:border-neutral-600 bg-transparent text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:ring-primary-500 transition-colors duration-200"
                >
                  <BarChart3 className="w-4 h-4" />
                  Explorer
                </a>
              ))}
              {coinData.links.repos_url?.github?.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-neutral-300 dark:border-neutral-600 bg-transparent text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:ring-primary-500 transition-colors duration-200"
                >
                  <BarChart3 className="w-4 h-4" />
                  GitHub
                </a>
              ))}
              {coinData.links.subreddit_url && (
                <a
                  href={coinData.links.subreddit_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-neutral-300 dark:border-neutral-600 bg-transparent text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:ring-primary-500 transition-colors duration-200"
                >
                  <Globe className="w-4 h-4" />
                  Reddit
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Description */}
      {coinData.description.en && (
        <Card>
          <CardHeader>
            <CardTitle>About {coinData.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-neutral dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: coinData.description.en.split('.')[0] + '.'
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
