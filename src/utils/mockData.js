/**
 * Mock cryptocurrency data for development and fallback purposes
 * This data is used when the API is unavailable or fails
 */

export const mockCryptoData = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 43250.50,
    market_cap: 847500000000,
    market_cap_rank: 1,
    fully_diluted_valuation: 908000000000,
    total_volume: 28500000000,
    high_24h: 44100.00,
    low_24h: 42800.00,
    price_change_24h: 1250.50,
    price_change_percentage_24h: 2.98,
    market_cap_change_24h: 24500000000,
    market_cap_change_percentage_24h: 2.98,
    circulating_supply: 19600000,
    total_supply: 19600000,
    max_supply: 21000000,
    ath: 69045,
    ath_change_percentage: -37.35,
    ath_date: '2021-11-10T14:24:11.849Z',
    atl: 67.81,
    atl_change_percentage: 63650.12,
    atl_date: '2013-07-06T00:00:00.000Z',
    roi: null,
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: [42000, 42500, 43000, 42800, 43200, 43500, 43250]
    }
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 2650.75,
    market_cap: 318500000000,
    market_cap_rank: 2,
    fully_diluted_valuation: 318500000000,
    total_volume: 15200000000,
    high_24h: 2680.00,
    low_24h: 2620.00,
    price_change_24h: 45.75,
    price_change_percentage_24h: 1.75,
    market_cap_change_24h: 5500000000,
    market_cap_change_percentage_24h: 1.75,
    circulating_supply: 120000000,
    total_supply: 120000000,
    max_supply: null,
    ath: 4878.26,
    ath_change_percentage: -45.65,
    ath_date: '2021-11-10T14:24:19.604Z',
    atl: 0.432979,
    atl_change_percentage: 612345.67,
    atl_date: '2015-10-20T00:00:00.000Z',
    roi: {
      times: 85.2,
      currency: 'btc',
      percentage: 8520.0
    },
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: [2600, 2620, 2640, 2630, 2650, 2670, 2650]
    }
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'BNB',
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    current_price: 315.20,
    market_cap: 47500000000,
    market_cap_rank: 3,
    fully_diluted_valuation: 47500000000,
    total_volume: 1200000000,
    high_24h: 318.50,
    low_24h: 312.00,
    price_change_24h: 8.20,
    price_change_percentage_24h: 2.67,
    market_cap_change_24h: 1200000000,
    market_cap_change_percentage_24h: 2.67,
    circulating_supply: 150000000,
    total_supply: 150000000,
    max_supply: 200000000,
    ath: 686.31,
    ath_change_percentage: -54.08,
    ath_date: '2021-05-10T07:24:17.097Z',
    atl: 0.0398177,
    atl_change_percentage: 791234.56,
    atl_date: '2017-10-19T00:00:00.000Z',
    roi: null,
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: [310, 312, 315, 313, 316, 318, 315]
    }
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    current_price: 98.45,
    market_cap: 42500000000,
    market_cap_rank: 4,
    fully_diluted_valuation: 55000000000,
    total_volume: 2800000000,
    high_24h: 100.20,
    low_24h: 96.80,
    price_change_24h: 2.45,
    price_change_percentage_24h: 2.55,
    market_cap_change_24h: 1050000000,
    market_cap_change_percentage_24h: 2.55,
    circulating_supply: 432000000,
    total_supply: 559000000,
    max_supply: null,
    ath: 259.96,
    ath_change_percentage: -62.13,
    ath_date: '2021-11-06T21:54:35.825Z',
    atl: 0.500801,
    atl_change_percentage: 19567.89,
    atl_date: '2020-05-11T19:35:23.449Z',
    roi: null,
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: [96, 97, 98, 97.5, 99, 100, 98.45]
    }
  },
  {
    id: 'xrp',
    symbol: 'xrp',
    name: 'XRP',
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    current_price: 0.625,
    market_cap: 35000000000,
    market_cap_rank: 5,
    fully_diluted_valuation: 62500000000,
    total_volume: 1800000000,
    high_24h: 0.632,
    low_24h: 0.618,
    price_change_24h: 0.012,
    price_change_percentage_24h: 1.96,
    market_cap_change_24h: 675000000,
    market_cap_change_percentage_24h: 1.96,
    circulating_supply: 56000000000,
    total_supply: 99987950793,
    max_supply: 100000000000,
    ath: 3.40,
    ath_change_percentage: -81.62,
    ath_date: '2018-01-07T00:00:00.000Z',
    atl: 0.00268621,
    atl_change_percentage: 23156.78,
    atl_date: '2014-05-22T00:00:00.000Z',
    roi: null,
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: [0.62, 0.625, 0.63, 0.628, 0.632, 0.63, 0.625]
    }
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    current_price: 0.485,
    market_cap: 17000000000,
    market_cap_rank: 6,
    fully_diluted_valuation: 21800000000,
    total_volume: 450000000,
    high_24h: 0.492,
    low_24h: 0.478,
    price_change_24h: 0.008,
    price_change_percentage_24h: 1.68,
    market_cap_change_24h: 280000000,
    market_cap_change_percentage_24h: 1.68,
    circulating_supply: 35000000000,
    total_supply: 45000000000,
    max_supply: 45000000000,
    ath: 3.09,
    ath_change_percentage: -84.30,
    ath_date: '2021-09-02T06:00:10.474Z',
    atl: 0.01925275,
    atl_change_percentage: 2418.45,
    atl_date: '2020-03-13T02:22:55.044Z',
    roi: null,
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: [0.48, 0.485, 0.49, 0.488, 0.492, 0.49, 0.485]
    }
  },
  {
    id: 'dogecoin',
    symbol: 'doge',
    name: 'Dogecoin',
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    current_price: 0.085,
    market_cap: 12000000000,
    market_cap_rank: 7,
    fully_diluted_valuation: 12000000000,
    total_volume: 380000000,
    high_24h: 0.087,
    low_24h: 0.083,
    price_change_24h: 0.002,
    price_change_percentage_24h: 2.41,
    market_cap_change_24h: 280000000,
    market_cap_change_percentage_24h: 2.41,
    circulating_supply: 141000000000,
    total_supply: 141000000000,
    max_supply: null,
    ath: 0.731578,
    ath_change_percentage: -88.38,
    ath_date: '2021-05-08T05:08:23.458Z',
    atl: 0.0000869,
    atl_change_percentage: 97678.90,
    atl_date: '2015-05-06T00:00:00.000Z',
    roi: null,
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: [0.083, 0.084, 0.085, 0.0845, 0.086, 0.087, 0.085]
    }
  },
  {
    id: 'avalanche-2',
    symbol: 'avax',
    name: 'Avalanche',
    image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
    current_price: 35.20,
    market_cap: 13000000000,
    market_cap_rank: 8,
    fully_diluted_valuation: 25300000000,
    total_volume: 450000000,
    high_24h: 35.80,
    low_24h: 34.50,
    price_change_24h: 0.80,
    price_change_percentage_24h: 2.33,
    market_cap_change_24h: 295000000,
    market_cap_change_percentage_24h: 2.33,
    circulating_supply: 370000000,
    total_supply: 720000000,
    max_supply: 720000000,
    ath: 144.96,
    ath_change_percentage: -75.72,
    ath_date: '2021-11-21T14:18:56.538Z',
    atl: 2.8,
    atl_change_percentage: 1157.14,
    atl_date: '2020-12-31T13:15:21.540Z',
    roi: null,
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: [34.5, 35, 35.2, 35.1, 35.5, 35.8, 35.2]
    }
  },
  {
    id: 'chainlink',
    symbol: 'link',
    name: 'Chainlink',
    image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
    current_price: 14.25,
    market_cap: 8000000000,
    market_cap_rank: 9,
    fully_diluted_valuation: 14250000000,
    total_volume: 320000000,
    high_24h: 14.50,
    low_24h: 14.00,
    price_change_24h: 0.35,
    price_change_percentage_24h: 2.52,
    market_cap_change_24h: 195000000,
    market_cap_change_percentage_24h: 2.52,
    circulating_supply: 560000000,
    total_supply: 1000000000,
    max_supply: 1000000000,
    ath: 52.70,
    ath_change_percentage: -72.96,
    ath_date: '2021-05-10T00:13:57.214Z',
    atl: 0.148183,
    atl_change_percentage: 9512.45,
    atl_date: '2017-11-29T00:00:00.000Z',
    roi: null,
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: [14, 14.1, 14.2, 14.15, 14.3, 14.4, 14.25]
    }
  },
  {
    id: 'polygon',
    symbol: 'matic',
    name: 'Polygon',
    image: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
    current_price: 0.825,
    market_cap: 7500000000,
    market_cap_rank: 10,
    fully_diluted_valuation: 8250000000,
    total_volume: 280000000,
    high_24h: 0.835,
    low_24h: 0.815,
    price_change_24h: 0.015,
    price_change_percentage_24h: 1.85,
    market_cap_change_24h: 135000000,
    market_cap_change_percentage_24h: 1.85,
    circulating_supply: 9100000000,
    total_supply: 10000000000,
    max_supply: 10000000000,
    ath: 2.92,
    ath_change_percentage: -71.75,
    ath_date: '2021-12-27T02:08:34.307Z',
    atl: 0.00314376,
    atl_change_percentage: 26145.67,
    atl_date: '2019-05-10T00:00:00.000Z',
    roi: {
      times: 312.5,
      currency: 'usd',
      percentage: 31250.0
    },
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: [0.815, 0.82, 0.825, 0.822, 0.83, 0.835, 0.825]
    }
  }
];

/**
 * Get mock crypto data with optional limit
 * @param {number} limit - Number of items to return
 * @returns {Array} Mock cryptocurrency data
 */
export const getMockCryptoData = (limit = 50) => {
  return mockCryptoData.slice(0, Math.min(limit, mockCryptoData.length));
};

/**
 * Get mock crypto data with Vanry priority (Vanry will be added at the top)
 * @param {Object} options - Query options
 * @returns {Array} Mock cryptocurrency data with Vanry at the top
 */
export const getMockCryptoDataWithVanryPriority = (options = {}) => {
  const limit = options.per_page || 50;
  const data = getMockCryptoData(limit - 1); // Leave room for Vanry
  
  // Add Vanry at the top
  const vanryData = {
    id: 'vanry',
    symbol: 'vanry',
    name: 'Vanry',
    image: 'https://assets.coingecko.com/coins/images/24484/large/4eL9gKU.png',
    current_price: 0.125,
    market_cap: 25000000,
    market_cap_rank: 150,
    fully_diluted_valuation: 50000000,
    total_volume: 1500000,
    high_24h: 0.128,
    low_24h: 0.122,
    price_change_24h: 0.003,
    price_change_percentage_24h: 2.46,
    market_cap_change_24h: 600000,
    market_cap_change_percentage_24h: 2.46,
    circulating_supply: 200000000,
    total_supply: 400000000,
    max_supply: 1000000000,
    ath: 0.45,
    ath_change_percentage: -72.22,
    ath_date: '2021-11-15T00:00:00.000Z',
    atl: 0.001,
    atl_change_percentage: 12400.0,
    atl_date: '2020-03-13T00:00:00.000Z',
    roi: null,
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: [0.122, 0.123, 0.124, 0.1235, 0.125, 0.126, 0.125]
    }
  };
  
  return [vanryData, ...data];
};

/**
 * Get mock coin detail data for a specific coin
 * @param {string} coinId - Coin ID
 * @returns {Object|null} Mock coin detail data or null if not found
 */
export const getMockCoinDetail = (coinId) => {
  const coin = mockCryptoData.find(c => c.id === coinId);
  if (!coin) return null;

  // Transform the mock data to match the CoinDetail interface
  return {
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    image: {
      large: coin.image,
      small: coin.image,
      thumb: coin.image
    },
    market_data: {
      current_price: {
        usd: coin.current_price
      },
      market_cap: {
        usd: coin.market_cap
      },
      market_cap_rank: coin.market_cap_rank,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      price_change_percentage_7d: coin.price_change_percentage_24h * 0.8, // Mock 7d change
      price_change_percentage_30d: coin.price_change_percentage_24h * 2.5, // Mock 30d change
      price_change_percentage_1h: coin.price_change_percentage_24h * 0.1, // Mock 1h change
      price_change_percentage_14d: coin.price_change_percentage_24h * 1.5, // Mock 14d change
      price_change_percentage_200d: coin.price_change_percentage_24h * 8, // Mock 200d change
      price_change_percentage_1y: coin.price_change_percentage_24h * 12, // Mock 1y change
      total_volume: {
        usd: coin.total_volume
      },
      high_24h: {
        usd: coin.high_24h
      },
      low_24h: {
        usd: coin.low_24h
      },
      circulating_supply: coin.circulating_supply,
      total_supply: coin.total_supply,
      max_supply: coin.max_supply,
      ath: {
        usd: coin.ath
      },
      ath_change_percentage: {
        usd: coin.ath_change_percentage
      },
      ath_date: {
        usd: coin.ath_date
      },
      atl: {
        usd: coin.atl
      },
      atl_change_percentage: {
        usd: coin.atl_change_percentage
      },
      atl_date: {
        usd: coin.atl_date
      },
      last_updated: coin.last_updated
    },
    description: {
      en: `${coin.name} (${coin.symbol.toUpperCase()}) is a cryptocurrency with a current market cap of $${(coin.market_cap / 1e9).toFixed(2)}B. It has a circulating supply of ${coin.circulating_supply.toLocaleString()} ${coin.symbol.toUpperCase()} tokens.`
    },
    links: {
      homepage: [`https://${coin.id}.com`],
      blockchain_site: [`https://explorer.${coin.id}.com`],
      official_forum_url: [`https://forum.${coin.id}.com`],
      subreddit_url: `https://reddit.com/r/${coin.id}`,
      repos_url: {
        github: [`https://github.com/${coin.id}`]
      }
    },
    community_data: {
      facebook_likes: Math.floor(Math.random() * 100000),
      twitter_followers: Math.floor(Math.random() * 1000000),
      reddit_average_posts_48h: Math.floor(Math.random() * 100),
      reddit_average_comments_48h: Math.floor(Math.random() * 1000),
      reddit_subscribers: Math.floor(Math.random() * 500000)
    },
    developer_data: {
      forks: Math.floor(Math.random() * 10000),
      stars: Math.floor(Math.random() * 50000),
      subscribers: Math.floor(Math.random() * 5000),
      total_issues: Math.floor(Math.random() * 1000),
      closed_issues: Math.floor(Math.random() * 800),
      pull_requests_merged: Math.floor(Math.random() * 500),
      pull_request_contributors: Math.floor(Math.random() * 100)
    }
  };
};

/**
 * Get mock price history data for a specific coin
 * @param {string} coinId - Coin ID
 * @param {string} days - Number of days (1, 7, 30, 90, 365)
 * @returns {Object} Mock price history data
 */
export const getMockCoinHistory = (coinId, days = '7') => {
  const coin = mockCryptoData.find(c => c.id === coinId);
  if (!coin) return { prices: [], total_volumes: [], market_caps: [] };

  const numDays = parseInt(days);
  const currentPrice = coin.current_price;
  const basePrice = currentPrice * 0.8; // Start 20% lower
  const priceRange = currentPrice * 0.4; // 40% price range
  
  const prices = [];
  const total_volumes = [];
  const market_caps = [];
  
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  
  for (let i = numDays; i >= 0; i--) {
    const timestamp = now - (i * dayMs);
    
    // Generate realistic price movement
    const progress = (numDays - i) / numDays;
    const volatility = Math.sin(progress * Math.PI * 4) * 0.1; // Add some volatility
    const trend = progress * 0.2; // 20% upward trend
    const price = basePrice + (priceRange * (trend + volatility + Math.random() * 0.1));
    
    prices.push([timestamp, Math.max(price, basePrice * 0.5)]);
    total_volumes.push([timestamp, coin.total_volume * (0.5 + Math.random())]);
    market_caps.push([timestamp, coin.market_cap * (0.8 + Math.random() * 0.4)]);
  }
  
  return {
    prices,
    total_volumes,
    market_caps
  };
};