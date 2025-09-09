# 📡 API Documentation

This document provides comprehensive information about the API integration, rate limits, and data handling in the Crypto Tracker application.

## 🔗 CoinGecko API Integration

### Base Configuration
- **Base URL**: `https://api.coingecko.com/api/v3`
- **API Version**: v3
- **Authentication**: Optional (API key for higher rate limits)
- **Response Format**: JSON

### Rate Limits

#### Free Tier
- **Rate Limit**: 10-30 calls per minute
- **Monthly Limit**: 10,000 calls
- **Burst Limit**: 50 calls per minute (short bursts)

#### Pro Tier
- **Rate Limit**: 500 calls per minute
- **Monthly Limit**: 1,000,000 calls
- **Burst Limit**: 1,000 calls per minute

#### Rate Limit Headers
```http
X-RateLimit-Limit: 30
X-RateLimit-Remaining: 25
X-RateLimit-Reset: 1640995200
```

## 📊 API Endpoints

### 1. Market Data Endpoint

#### Get Cryptocurrency Market Data
```http
GET /coins/markets
```

**Parameters:**
```typescript
interface MarketDataParams {
  vs_currency: string;        // Currency for price data (e.g., 'usdt')
  order: string;              // Sort order ('market_cap_desc', 'market_cap_asc', 'volume_desc', 'volume_asc', 'id_desc', 'id_asc')
  per_page: number;           // Results per page (1-250)
  page: number;               // Page number
  sparkline: boolean;         // Include sparkline data
  price_change_percentage: string; // Price change percentage ('1h', '24h', '7d', '14d', '30d', '200d', '1y')
  category?: string;          // Category filter
  ids?: string;              // Comma-separated coin IDs
}
```

**Example Request:**
```typescript
const params = {
  vs_currency: 'usdt',
  order: 'market_cap_desc',
  per_page: 50,
  page: 1,
  sparkline: false,
  price_change_percentage: '24h'
};

const response = await fetch(
  `https://api.coingecko.com/api/v3/coins/markets?${new URLSearchParams(params)}`
);
```

**Response Structure:**
```typescript
interface MarketDataResponse {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
}
```

### 2. Coin Detail Endpoint

#### Get Detailed Coin Information
```http
GET /coins/{id}
```

**Parameters:**
```typescript
interface CoinDetailParams {
  localization?: boolean;     // Include localized data
  tickers?: boolean;          // Include ticker data
  market_data?: boolean;      // Include market data
  community_data?: boolean;   // Include community data
  developer_data?: boolean;   // Include developer data
  sparkline?: boolean;        // Include sparkline data
}
```

**Example Request:**
```typescript
const coinId = 'bitcoin';
const params = {
  localization: false,
  tickers: false,
  market_data: true,
  community_data: false,
  developer_data: false,
  sparkline: false
};

const response = await fetch(
  `https://api.coingecko.com/api/v3/coins/${coinId}?${new URLSearchParams(params)}`
);
```

**Response Structure:**
```typescript
interface CoinDetailResponse {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: string | null;
  platforms: Record<string, string>;
  detail_platforms: Record<string, {
    decimal_place: number;
    contract_address: string;
  }>;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  preview_listing: boolean;
  public_notice: string | null;
  additional_notices: string[];
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    whitepaper: string;
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: number | null;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  market_data: {
    current_price: Record<string, number>;
    total_value_locked: Record<string, number> | null;
    mcap_to_tvl_ratio: number | null;
    fdv_to_tvl_ratio: number | null;
    roi: {
      times: number;
      currency: string;
      percentage: number;
    } | null;
    ath: Record<string, number>;
    ath_change_percentage: Record<string, number>;
    ath_date: Record<string, string>;
    atl: Record<string, number>;
    atl_change_percentage: Record<string, number>;
    atl_date: Record<string, string>;
    market_cap: Record<string, number>;
    market_cap_rank: number;
    fully_diluted_valuation: Record<string, number>;
    market_cap_fdv_ratio: number;
    total_volume: Record<string, number>;
    high_24h: Record<string, number>;
    low_24h: Record<string, number>;
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: Record<string, number>;
    price_change_percentage_1h_in_currency: Record<string, number>;
    price_change_percentage_24h_in_currency: Record<string, number>;
    price_change_percentage_7d_in_currency: Record<string, number>;
    price_change_percentage_14d_in_currency: Record<string, number>;
    price_change_percentage_30d_in_currency: Record<string, number>;
    price_change_percentage_60d_in_currency: Record<string, number>;
    price_change_percentage_200d_in_currency: Record<string, number>;
    price_change_percentage_1y_in_currency: Record<string, number>;
    market_cap_change_24h_in_currency: Record<string, number>;
    market_cap_change_percentage_24h_in_currency: Record<string, number>;
    total_supply: number;
    max_supply: number;
    circulating_supply: number;
    last_updated: string;
  };
  community_data: {
    facebook_likes: number | null;
    twitter_followers: number | null;
    reddit_average_posts_48h: number;
    reddit_average_comments_48h: number;
    reddit_subscribers: number | null;
    reddit_accounts_active_48h: number | null;
    telegram_channel_user_count: number | null;
  };
  developer_data: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    code_additions_deletions_4_weeks: {
      additions: number;
      deletions: number;
    };
    commit_count_4_weeks: number;
    last_4_weeks_commit_activity_series: number[];
  };
  status_updates: Array<{
    description: string;
    category: string;
    created_at: string;
    user: string;
    user_title: string;
    pin: boolean;
    project: {
      type: string;
      id: string;
      name: string;
      symbol: string;
      image: {
        thumb: string;
        small: string;
        large: string;
      };
    };
  }>;
  last_updated: string;
  tickers: Array<{
    base: string;
    target: string;
    market: {
      name: string;
      identifier: string;
      has_trading_incentive: boolean;
    };
    last: number;
    volume: number;
    converted_last: Record<string, number>;
    converted_volume: Record<string, number>;
    trust_score: string;
    bid_ask_spread_percentage: number;
    timestamp: string;
    last_traded_at: string;
    last_fetch_at: string;
    is_anomaly: boolean;
    is_stale: boolean;
    trade_url: string | null;
    token_info_url: string | null;
    coin_id: string;
    target_coin_id: string;
  }>;
}
```

### 3. Market Chart Endpoint

#### Get Historical Market Data
```http
GET /coins/{id}/market_chart
```

**Parameters:**
```typescript
interface MarketChartParams {
  vs_currency: string;        // Currency for price data
  days: number | string;      // Number of days or 'max'
  interval?: string;          // Data interval ('daily' for days > 1)
}
```

**Example Request:**
```typescript
const coinId = 'bitcoin';
const params = {
  vs_currency: 'usdt',
  days: 7,
  interval: 'daily'
};

const response = await fetch(
  `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?${new URLSearchParams(params)}`
);
```

**Response Structure:**
```typescript
interface MarketChartResponse {
  prices: Array<[number, number]>;        // [timestamp, price]
  market_caps: Array<[number, number]>;   // [timestamp, market_cap]
  total_volumes: Array<[number, number]>; // [timestamp, volume]
}
```

## 🔧 API Client Implementation

### Base API Client
```typescript
// src/utils/api.ts
class CoinGeckoAPI {
  private baseURL: string;
  private apiKey?: string;
  private rateLimitDelay: number = 1000; // 1 second between requests

  constructor(baseURL: string, apiKey?: string) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  private async request<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    // Rate limiting
    await this.delay(this.rateLimitDelay);

    const url = new URL(`${this.baseURL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['x-cg-demo-api-key'] = this.apiKey;
    }

    const response = await fetch(url.toString(), { headers });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Market data methods
  async getMarketData(params: MarketDataParams): Promise<MarketDataResponse[]> {
    return this.request<MarketDataResponse[]>('/coins/markets', params);
  }

  async getCoinDetail(coinId: string, params?: CoinDetailParams): Promise<CoinDetailResponse> {
    return this.request<CoinDetailResponse>(`/coins/${coinId}`, params);
  }

  async getMarketChart(coinId: string, params: MarketChartParams): Promise<MarketChartResponse> {
    return this.request<MarketChartResponse>(`/coins/${coinId}/market_chart`, params);
  }
}
```

### Error Handling
```typescript
// src/utils/errorHandling.ts
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function handleAPIError(error: unknown): Promise<never> {
  if (error instanceof Response) {
    const errorData = await error.json().catch(() => ({}));
    throw new APIError(
      errorData.error || 'API request failed',
      error.status,
      error.url
    );
  }
  
  if (error instanceof Error) {
    throw new APIError(error.message, 0, 'unknown');
  }
  
  throw new APIError('Unknown error occurred', 0, 'unknown');
}
```

### Caching Strategy
```typescript
// src/utils/cache.ts
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class APICache {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const apiCache = new APICache();
```

## 📊 Data Processing

### Market Data Processing
```typescript
// src/utils/dataProcessing.ts
export function processMarketData(rawData: MarketDataResponse[]): ProcessedCoinData[] {
  return rawData.map(coin => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    image: coin.image,
    currentPrice: coin.current_price,
    marketCap: coin.market_cap,
    marketCapRank: coin.market_cap_rank,
    priceChange24h: coin.price_change_24h,
    priceChangePercentage24h: coin.price_change_percentage_24h,
    volume24h: coin.total_volume,
    high24h: coin.high_24h,
    low24h: coin.low_24h,
    circulatingSupply: coin.circulating_supply,
    totalSupply: coin.total_supply,
    maxSupply: coin.max_supply,
    ath: coin.ath,
    athChangePercentage: coin.ath_change_percentage,
    lastUpdated: new Date(coin.last_updated)
  }));
}
```

### Chart Data Processing
```typescript
export function processChartData(rawData: MarketChartResponse): ChartData {
  return {
    prices: rawData.prices.map(([timestamp, price]) => ({
      timestamp: new Date(timestamp),
      price
    })),
    marketCaps: rawData.market_caps.map(([timestamp, marketCap]) => ({
      timestamp: new Date(timestamp),
      marketCap
    })),
    volumes: rawData.total_volumes.map(([timestamp, volume]) => ({
      timestamp: new Date(timestamp),
      volume
    }))
  };
}
```

## 🚨 Rate Limit Management

### Rate Limiting Implementation
```typescript
// src/utils/rateLimiter.ts
class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private timeWindow: number;

  constructor(maxRequests: number, timeWindowMs: number) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindowMs;
  }

  async waitForSlot(): Promise<void> {
    const now = Date.now();
    
    // Remove old requests outside the time window
    this.requests = this.requests.filter(
      timestamp => now - timestamp < this.timeWindow
    );

    // If we're at the limit, wait
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = Math.min(...this.requests);
      const waitTime = this.timeWindow - (now - oldestRequest);
      
      if (waitTime > 0) {
        await this.delay(waitTime);
        return this.waitForSlot();
      }
    }

    // Record this request
    this.requests.push(now);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Create rate limiter for CoinGecko API
export const coinGeckoRateLimiter = new RateLimiter(30, 60000); // 30 requests per minute
```

## 🔍 API Monitoring

### Request Logging
```typescript
// src/utils/apiLogger.ts
interface APIRequestLog {
  endpoint: string;
  method: string;
  timestamp: number;
  duration: number;
  status: number;
  error?: string;
}

class APILogger {
  private logs: APIRequestLog[] = [];

  logRequest(log: APIRequestLog): void {
    this.logs.push(log);
    
    // Keep only last 100 logs
    if (this.logs.length > 100) {
      this.logs = this.logs.slice(-100);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', log);
    }
  }

  getLogs(): APIRequestLog[] {
    return [...this.logs];
  }

  getAverageResponseTime(): number {
    if (this.logs.length === 0) return 0;
    
    const totalDuration = this.logs.reduce((sum, log) => sum + log.duration, 0);
    return totalDuration / this.logs.length;
  }
}

export const apiLogger = new APILogger();
```

## 📈 Performance Optimization

### Request Batching
```typescript
// src/utils/requestBatcher.ts
class RequestBatcher<T> {
  private batch: Array<{
    id: string;
    resolve: (value: T) => void;
    reject: (error: Error) => void;
  }> = [];
  private batchTimeout: NodeJS.Timeout | null = null;
  private batchDelay = 100; // 100ms

  async add(id: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.batch.push({ id, resolve, reject });
      
      if (this.batchTimeout) {
        clearTimeout(this.batchTimeout);
      }
      
      this.batchTimeout = setTimeout(() => {
        this.processBatch();
      }, this.batchDelay);
    });
  }

  private async processBatch(): Promise<void> {
    const currentBatch = [...this.batch];
    this.batch = [];
    this.batchTimeout = null;

    try {
      const results = await this.fetchBatch(currentBatch.map(item => item.id));
      
      currentBatch.forEach((item, index) => {
        item.resolve(results[index]);
      });
    } catch (error) {
      currentBatch.forEach(item => {
        item.reject(error as Error);
      });
    }
  }

  private async fetchBatch(ids: string[]): Promise<T[]> {
    // Implementation depends on specific API endpoint
    // This is a placeholder for batch fetching logic
    throw new Error('Batch fetching not implemented');
  }
}
```

## 🔐 Security Considerations

### API Key Management
```typescript
// src/utils/security.ts
export function validateAPIKey(apiKey: string): boolean {
  // Basic validation for API key format
  return /^[a-zA-Z0-9_-]{20,}$/.test(apiKey);
}

export function sanitizeAPIKey(apiKey: string): string {
  // Remove any whitespace and convert to lowercase
  return apiKey.trim().toLowerCase();
}
```

### Request Validation
```typescript
export function validateRequestParams(params: Record<string, any>): boolean {
  // Validate required parameters
  const requiredParams = ['vs_currency'];
  const missingParams = requiredParams.filter(param => !params[param]);
  
  if (missingParams.length > 0) {
    throw new Error(`Missing required parameters: ${missingParams.join(', ')}`);
  }

  // Validate parameter types and ranges
  if (params.per_page && (params.per_page < 1 || params.per_page > 250)) {
    throw new Error('per_page must be between 1 and 250');
  }

  return true;
}
```

---

**API Documentation** - For more details, see the [CoinGecko API Documentation](https://www.coingecko.com/en/api/documentation).
