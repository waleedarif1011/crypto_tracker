import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.DEV ? '/api' : 'https://api.coingecko.com/api/v3';
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    ...(API_KEY && { 'x-cg-demo-api-key': API_KEY }),
  },
});

// API Endpoints
export const API_ENDPOINTS = {
  // Coins
  COINS_LIST: '/coins/list',
  COINS_MARKETS: '/coins/markets',
  COIN_DETAIL: (id) => `/coins/${id}`,
  COIN_MARKET_CHART: (id) => `/coins/${id}/market_chart`,
  COIN_OHLC: (id) => `/coins/${id}/ohlc`,

  // Global
  GLOBAL_DATA: '/global',
  GLOBAL_DEFI: '/global/decentralized_finance_defi',

  // Trending
  TRENDING: '/search/trending',
  SEARCH: '/search',

  // Categories
  CATEGORIES: '/coins/categories',
  CATEGORY_DETAIL: (id) => `/coins/categories/${id}`,

  // Exchanges
  EXCHANGES: '/exchanges',
  EXCHANGE_DETAIL: (id) => `/exchanges/${id}`,

  // Derivatives
  DERIVATIVES: '/derivatives',
  DERIVATIVES_EXCHANGES: '/derivatives/exchanges',
};

// Request interceptors
apiClient.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      t: Date.now(),
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error cases
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          throw new Error(data?.error || 'Bad Request');
        case 401:
          throw new Error('Unauthorized access');
        case 403:
          throw new Error('Access forbidden');
        case 404:
          throw new Error('Resource not found');
        case 429:
          throw new Error('Too many requests. Please try again later.');
        case 500:
          throw new Error('Internal server error');
        default:
          throw new Error(data?.error || `Request failed with status ${status}`);
      }
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

// API Functions

// Get list of all coins
export const getCoinsList = async (params = {}) => {
  const response = await apiClient.get(API_ENDPOINTS.COINS_LIST, { params });
  return response.data;
};

// Get market data for coins
export const getCoinsMarkets = async (params = {}) => {
  const defaultParams = {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: 100,
    page: 1,
    sparkline: false,
    price_change_percentage: '1h,24h,7d',
    ...params,
  };

  const response = await apiClient.get(API_ENDPOINTS.COINS_MARKETS, {
    params: defaultParams,
  });
  return response.data;
};

// Get detailed coin information
export const getCoinDetail = async (id, params = {}) => {
  const defaultParams = {
    localization: false,
    tickers: false,
    market_data: true,
    community_data: false,
    developer_data: false,
    sparkline: false,
    ...params,
  };

  const response = await apiClient.get(API_ENDPOINTS.COIN_DETAIL(id), {
    params: defaultParams,
  });
  return response.data;
};

// Get coin market chart data
export const getCoinMarketChart = async (id, params = {}) => {
  const defaultParams = {
    vs_currency: 'usd',
    days: '7',
    interval: 'daily',
    ...params,
  };

  const response = await apiClient.get(API_ENDPOINTS.COIN_MARKET_CHART(id), {
    params: defaultParams,
  });
  return response.data;
};

// Get global cryptocurrency data
export const getGlobalData = async () => {
  const response = await apiClient.get(API_ENDPOINTS.GLOBAL_DATA);
  return response.data;
};

// Get trending cryptocurrencies
export const getTrendingCoins = async () => {
  const response = await apiClient.get(API_ENDPOINTS.TRENDING);
  return response.data;
};

// Search for coins, categories, and markets
export const searchCrypto = async (query) => {
  const response = await apiClient.get(API_ENDPOINTS.SEARCH, {
    params: { query },
  });
  return response.data;
};

// Get exchanges list
export const getExchanges = async (params = {}) => {
  const defaultParams = {
    per_page: 50,
    page: 1,
    ...params,
  };

  const response = await apiClient.get(API_ENDPOINTS.EXCHANGES, {
    params: defaultParams,
  });
  return response.data;
};

// Utility functions for API responses

// Transform coin market data for easier consumption
export const transformCoinData = (coin) => ({
  id: coin.id,
  symbol: coin.symbol,
  name: coin.name,
  image: coin.image,
  currentPrice: coin.current_price,
  marketCap: coin.market_cap,
  marketCapRank: coin.market_cap_rank,
  priceChange24h: coin.price_change_24h,
  priceChangePercentage24h: coin.price_change_percentage_24h,
  priceChangePercentage7d: coin.price_change_percentage_7d_in_currency,
  totalVolume: coin.total_volume,
  high24h: coin.high_24h,
  low24h: coin.low_24h,
  circulatingSupply: coin.circulating_supply,
  totalSupply: coin.total_supply,
  maxSupply: coin.max_supply,
  ath: coin.ath,
  athChangePercentage: coin.ath_change_percentage,
  atl: coin.atl,
  atlChangePercentage: coin.atl_change_percentage,
  lastUpdated: coin.last_updated,
});

// Format API errors for user display
export const formatApiError = (error) => {
  if (typeof error === 'string') {
    return error;
  }

  if (error?.response?.data?.error) {
    return error.response.data.error;
  }

  if (error?.message) {
    return error.message;
  }

  return 'An unexpected error occurred';
};

// Retry mechanism for failed requests
export const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;

      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError;
};
