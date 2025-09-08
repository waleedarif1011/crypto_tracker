/**
 * TypeScript declarations for coingeckoApi.js
 */

export interface CoinBasic {
  id: string;
  symbol: string;
  name: string;
}

export interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
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
  sparkline_in_7d: {
    price: number[];
  };
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
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
    price_change_24h: number;
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
    reddit_accounts_active_48h: number;
    telegram_channel_user_count: number;
  };
  developer_data?: {
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
}

export interface CoinGeckoConfig {
  baseURL: string;
  apiKey: string;
  timeout: number;
  rateLimitDelay: number;
  maxRetries: number;
}

export interface GetCoinsMarketsOptions {
  vs_currency?: string;
  order?: string;
  per_page?: number;
  page?: number;
  sparkline?: boolean;
  price_change_percentage?: string;
}

export interface GetCoinDetailOptions {
  localization?: boolean;
  tickers?: boolean;
  market_data?: boolean;
  community_data?: boolean;
  developer_data?: boolean;
  sparkline?: boolean;
}

export interface GetCoinHistoryOptions {
  vs_currency?: string;
  days?: string;
  interval?: string;
}

export interface GetSimplePricesOptions {
  include_market_cap?: boolean;
  include_24hr_vol?: boolean;
  include_24hr_change?: boolean;
  include_last_updated_at?: boolean;
}

export interface RateLimitStatus {
  lastRequestTime: number;
  timeUntilNextRequest: number;
  isRateLimited: boolean;
  rateLimitDelay: number;
}

// API Functions
export declare function getCoinsList(): Promise<CoinBasic[]>;
export declare function getCoinsMarkets(options?: GetCoinsMarketsOptions): Promise<CoinMarket[]>;
export declare function getCoinDetail(coinId: string, options?: GetCoinDetailOptions): Promise<CoinDetail>;
export declare function getCoinHistory(
  coinId: string,
  vs_currency?: string,
  days?: string,
  interval?: string
): Promise<any>;
export declare function getSimplePrices(
  coinIds: string[],
  vs_currencies?: string[],
  include_market_cap?: boolean,
  include_24hr_vol?: boolean,
  include_24hr_change?: boolean,
  include_last_updated_at?: boolean
): Promise<any>;
export declare function getTrendingCoins(): Promise<any>;
export declare function searchCoins(query: string): Promise<any>;
export declare function getTopCryptosWithVanryPriority(options?: GetCoinsMarketsOptions): Promise<CoinMarket[]>;
export declare function getGlobalStats(): Promise<any>;
export declare function getSupportedCurrencies(): Promise<string[]>;
export declare function formatApiError(error: any): string;
export declare function hasApiKey(): boolean;
export declare function getRateLimitStatus(): RateLimitStatus;

// Configuration
export declare const COINGECKO_CONFIG: CoinGeckoConfig;