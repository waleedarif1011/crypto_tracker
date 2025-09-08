/**
 * CoinGecko API Utility
 * Comprehensive API client for CoinGecko cryptocurrency data
 * Includes rate limiting, error handling, and retry logic for free tier
 */

/**
 * @typedef {Object} CoinGeckoConfig
 * @property {string} baseURL - Base API URL
 * @property {string} apiKey - API key for authentication
 * @property {number} timeout - Request timeout in milliseconds
 * @property {number} rateLimitDelay - Delay between requests (ms)
 * @property {number} maxRetries - Maximum retry attempts
 */

/** @type {CoinGeckoConfig} */
const COINGECKO_CONFIG = {
  baseURL: import.meta.env.DEV ? '/api' : 'https://api.coingecko.com/api/v3',
  apiKey: import.meta.env.VITE_COINGECKO_API_KEY || '',
  timeout: 10000,
  rateLimitDelay: 1500, // 1.5 seconds between requests for free tier
  maxRetries: 3,
};

// Rate limiting state
let lastRequestTime = 0;

/**
 * Sleep utility for rate limiting
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Rate limiting wrapper
 * @param {Function} apiCall - API call function
 * @returns {Promise<any>}
 */
const withRateLimit = async (apiCall) => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < COINGECKO_CONFIG.rateLimitDelay) {
    const waitTime = COINGECKO_CONFIG.rateLimitDelay - timeSinceLastRequest;
    await sleep(waitTime);
  }

  lastRequestTime = Date.now();
  return apiCall();
};

/**
 * Retry wrapper with exponential backoff
 * @param {Function} apiCall - API call function
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise<any>}
 */
const withRetry = async (apiCall, maxRetries = COINGECKO_CONFIG.maxRetries, baseDelay = 1000) => {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;

      if (attempt < maxRetries) {
        // Check if it's a rate limit error
        if (error?.response?.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          const delay = retryAfter ? parseInt(retryAfter) * 1000 : baseDelay * Math.pow(2, attempt);
          console.warn(`Rate limited. Retrying in ${delay}ms...`);
          await sleep(delay);
        } else if (error?.response?.status >= 500) {
          // Server errors - exponential backoff
          const delay = baseDelay * Math.pow(2, attempt);
          console.warn(`Server error. Retrying in ${delay}ms...`);
          await sleep(delay);
        } else {
          // Other errors - don't retry
          throw error;
        }
      }
    }
  }

  throw lastError;
};

/**
 * Generic API request function
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 * @returns {Promise<any>}
 */
const makeRequest = async (endpoint, params = {}) => {
  const url = `${COINGECKO_CONFIG.baseURL}${endpoint}`;

  const queryParams = new URLSearchParams({
    ...params,
    ...(COINGECKO_CONFIG.apiKey && { x_cg_demo_api_key: COINGECKO_CONFIG.apiKey }),
  });

  const finalUrl = `${url}?${queryParams}`;

  const response = await fetch(finalUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(COINGECKO_CONFIG.timeout),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

/**
 * @typedef {Object} CoinBasic
 * @property {string} id - Coin ID
 * @property {string} symbol - Coin symbol
 * @property {string} name - Coin name
 */

/**
 * @typedef {Object} CoinMarket
 * @property {string} id
 * @property {string} symbol
 * @property {string} name
 * @property {string} image
 * @property {number} current_price
 * @property {number} market_cap
 * @property {number} market_cap_rank
 * @property {number} fully_diluted_valuation
 * @property {number} total_volume
 * @property {number} high_24h
 * @property {number} low_24h
 * @property {number} price_change_24h
 * @property {number} price_change_percentage_24h
 * @property {number} market_cap_change_24h
 * @property {number} market_cap_change_percentage_24h
 * @property {number} circulating_supply
 * @property {number} total_supply
 * @property {number} max_supply
 * @property {number} ath
 * @property {number} ath_change_percentage
 * @property {number} ath_date
 * @property {number} atl
 * @property {number} atl_change_percentage
 * @property {number} atl_date
 * @property {boolean} roi
 * @property {string} last_updated
 * @property {Object} sparkline_in_7d
 * @property {number[]} sparkline_in_7d.price
 */

/**
 * @typedef {Object} CoinDetail
 * @property {string} id
 * @property {string} symbol
 * @property {string} name
 * @property {Object} image
 * @property {string} image.thumb
 * @property {string} image.small
 * @property {string} image.large
 * @property {Object} market_data
 * @property {Object} market_data.current_price
 * @property {number} market_data.current_price.usd
 * @property {number} market_data.market_cap.usd
 * @property {number} market_data.market_cap_rank
 * @property {number} market_data.total_volume.usd
 * @property {Object} market_data.high_24h
 * @property {number} market_data.high_24h.usd
 * @property {Object} market_data.low_24h
 * @property {number} market_data.low_24h.usd
 * @property {number} market_data.price_change_24h
 * @property {number} market_data.price_change_percentage_24h
 * @property {Object} description
 * @property {string} description.en
 */

/**
 * Get list of supported coins
 * @returns {Promise<CoinBasic[]>}
 */
export const getCoinsList = async () => {
  return withRateLimit(() =>
    withRetry(() => makeRequest('/coins/list'))
  );
};

/**
 * Get market data for cryptocurrencies
 * @param {Object} options - Query options
 * @param {string} options.vs_currency - Target currency (default: 'usd')
 * @param {string} options.order - Sort order (default: 'market_cap_desc')
 * @param {number} options.per_page - Results per page (default: 100, max: 250)
 * @param {number} options.page - Page number (default: 1)
 * @param {boolean} options.sparkline - Include sparkline data (default: false)
 * @param {string} options.price_change_percentage - Price change periods
 * @returns {Promise<CoinMarket[]>}
 */
export const getCoinsMarkets = async (options = {}) => {
  const defaultOptions = {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: 100,
    page: 1,
    sparkline: false,
    price_change_percentage: '1h,24h,7d,14d,30d,200d,1y',
    ...options,
  };

  try {
    return await withRateLimit(() =>
      withRetry(() => makeRequest('/coins/markets', defaultOptions))
    );
  } catch (error) {
    console.error('Error fetching coins markets:', error);
    console.log('Falling back to mock data...');
    
    // Import mock data dynamically to avoid circular dependencies
    const { getMockCryptoData } = await import('./mockData.js');
    return getMockCryptoData(defaultOptions.per_page);
  }
};

/**
 * Get detailed information about a specific coin
 * @param {string} coinId - Coin ID (e.g., 'bitcoin')
 * @param {Object} options - Query options
 * @param {boolean} options.localization - Include localized data
 * @param {boolean} options.tickers - Include ticker data
 * @param {boolean} options.market_data - Include market data
 * @param {boolean} options.community_data - Include community data
 * @param {boolean} options.developer_data - Include developer data
 * @param {boolean} options.sparkline - Include sparkline data
 * @returns {Promise<CoinDetail>}
 */
export const getCoinDetail = async (coinId, options = {}) => {
  const defaultOptions = {
    localization: false,
    tickers: false,
    market_data: true,
    community_data: false,
    developer_data: false,
    sparkline: false,
    ...options,
  };

  try {
    return await withRateLimit(() =>
      withRetry(() => makeRequest(`/coins/${coinId}`, defaultOptions))
    );
  } catch (error) {
    console.error('Error fetching coin detail:', error);
    console.log('Falling back to mock data...');
    
    // Import mock data dynamically to avoid circular dependencies
    const { getMockCoinDetail } = await import('./mockData.js');
    const mockData = getMockCoinDetail(coinId);
    
    if (mockData) {
      return mockData;
    } else {
      throw new Error(`Coin '${coinId}' not found in mock data`);
    }
  }
};

/**
 * Get historical price data for a coin
 * @param {string} coinId - Coin ID
 * @param {string} vs_currency - Target currency (default: 'usd')
 * @param {string} days - Number of days of data (default: '7')
 * @param {string} interval - Data interval (default: 'daily')
 * @returns {Promise<Object>}
 */
export const getCoinHistory = async (
  coinId,
  vs_currency = 'usd',
  days = '7',
  interval = 'daily'
) => {
  const params = {
    vs_currency,
    days,
    interval,
  };

  try {
    return await withRateLimit(() =>
      withRetry(() => makeRequest(`/coins/${coinId}/market_chart`, params))
    );
  } catch (error) {
    console.error('Error fetching coin history:', error);
    console.log('Falling back to mock data...');
    
    // Import mock data dynamically to avoid circular dependencies
    const { getMockCoinHistory } = await import('./mockData.js');
    return getMockCoinHistory(coinId, days);
  }
};

/**
 * Get coin price data for multiple coins
 * @param {string[]} coinIds - Array of coin IDs
 * @param {string[]} vs_currencies - Array of target currencies
 * @param {boolean} include_market_cap - Include market cap data
 * @param {boolean} include_24hr_vol - Include 24h volume data
 * @param {boolean} include_24hr_change - Include 24h change data
 * @param {boolean} include_last_updated_at - Include last updated timestamp
 * @returns {Promise<Object>}
 */
export const getSimplePrices = async (
  coinIds,
  vs_currencies = ['usd'],
  include_market_cap = false,
  include_24hr_vol = false,
  include_24hr_change = false,
  include_last_updated_at = false
) => {
  const params = {
    ids: coinIds.join(','),
    vs_currencies: vs_currencies.join(','),
    include_market_cap: include_market_cap.toString(),
    include_24hr_vol: include_24hr_vol.toString(),
    include_24hr_change: include_24hr_change.toString(),
    include_last_updated_at: include_last_updated_at.toString(),
  };

  return withRateLimit(() =>
    withRetry(() => makeRequest('/simple/price', params))
  );
};

/**
 * Get trending coins
 * @returns {Promise<Object>}
 */
export const getTrendingCoins = async () => {
  return withRateLimit(() =>
    withRetry(() => makeRequest('/search/trending'))
  );
};

/**
 * Search for coins
 * @param {string} query - Search query
 * @returns {Promise<Object>}
 */
export const searchCoins = async (query) => {
  return withRateLimit(() =>
    withRetry(() => makeRequest('/search', { query }))
  );
};

/**
 * SPECIAL FUNCTION: Get top cryptocurrencies with Vanry prioritized
 * This function ensures Vanry appears in results and is prioritized
 * @param {Object} options - Query options
 * @returns {Promise<CoinMarket[]>}
 */
export const getTopCryptosWithVanryPriority = async (options = {}) => {
  try {
    // First, try to get Vanry data specifically
    let vanryData = null;
    try {
      const vanryResult = await getSimplePrices(['vanry'], ['usd'], true, true, true, true);
      if (vanryResult && vanryResult.vanry) {
        vanryData = {
          id: 'vanry',
          symbol: 'vanry',
          name: 'Vanry',
          image: 'https://assets.coingecko.com/coins/images/24484/large/4eL9gKU.png',
          current_price: vanryResult.vanry.usd || 0,
          market_cap: vanryResult.vanry.usd_market_cap || 0,
          market_cap_rank: vanryResult.vanry.usd_market_cap_rank || 999,
          total_volume: vanryResult.vanry.usd_24h_vol || 0,
          price_change_percentage_24h: vanryResult.vanry.usd_24h_change || 0,
          // Add other required fields with defaults
          fully_diluted_valuation: null,
          high_24h: vanryResult.vanry.usd || 0,
          low_24h: vanryResult.vanry.usd || 0,
          price_change_24h: 0,
          market_cap_change_24h: 0,
          market_cap_change_percentage_24h: 0,
          circulating_supply: 0,
          total_supply: 0,
          max_supply: null,
          ath: 0,
          ath_change_percentage: 0,
          ath_date: new Date().toISOString(),
          atl: 0,
          atl_change_percentage: 0,
          atl_date: new Date().toISOString(),
          roi: null,
          last_updated: new Date().toISOString(),
          sparkline_in_7d: { price: [] },
        };
      }
    } catch (error) {
      console.warn('Could not fetch Vanry data:', error);
    }

    // Get regular market data
    const marketData = await getCoinsMarkets({
      per_page: 99, // Leave room for Vanry
      ...options,
    });

    // Remove any existing Vanry entry to avoid duplicates
    const filteredData = marketData.filter(coin => coin.id !== 'vanry');

    // Add Vanry at the top if we have data for it
    if (vanryData) {
      return [vanryData, ...filteredData];
    }

    return filteredData;
  } catch (error) {
    console.error('Error fetching top cryptos with Vanry priority:', error);
    console.log('Falling back to mock data...');
    
    // Import mock data dynamically to avoid circular dependencies
    const { getMockCryptoDataWithVanryPriority } = await import('./mockData.js');
    return getMockCryptoDataWithVanryPriority(options);
  }
};

/**
 * Get global cryptocurrency statistics
 * @returns {Promise<Object>}
 */
export const getGlobalStats = async () => {
  return withRateLimit(() =>
    withRetry(() => makeRequest('/global'))
  );
};

/**
 * Get supported currencies
 * @returns {Promise<string[]>}
 */
export const getSupportedCurrencies = async () => {
  return withRateLimit(() =>
    withRetry(() => makeRequest('/simple/supported_vs_currencies'))
  );
};

/**
 * Format API errors for user display
 * @param {Error} error - Error object
 * @returns {string}
 */
export const formatApiError = (error) => {
  if (error?.message?.includes('429')) {
    return 'Rate limit exceeded. Please wait a moment before trying again.';
  }
  if (error?.message?.includes('404')) {
    return 'Coin not found. Please check the coin ID.';
  }
  if (error?.message?.includes('timeout')) {
    return 'Request timed out. Please try again.';
  }
  if (error?.message?.includes('network')) {
    return 'Network error. Please check your connection.';
  }
  return error?.message || 'An unexpected error occurred.';
};

/**
 * Check if API key is configured
 * @returns {boolean}
 */
export const hasApiKey = () => {
  return Boolean(COINGECKO_CONFIG.apiKey);
};

/**
 * Get current rate limit status
 * @returns {Object}
 */
export const getRateLimitStatus = () => {
  const now = Date.now();
  const timeUntilNextRequest = Math.max(0, COINGECKO_CONFIG.rateLimitDelay - (now - lastRequestTime));

  return {
    lastRequestTime,
    timeUntilNextRequest,
    isRateLimited: timeUntilNextRequest > 0,
    rateLimitDelay: COINGECKO_CONFIG.rateLimitDelay,
  };
};

// Export configuration for external use
export { COINGECKO_CONFIG };
