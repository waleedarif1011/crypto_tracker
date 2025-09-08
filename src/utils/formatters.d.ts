// Number and currency formatting utilities

export interface PriceFormatOptions {
  style?: 'currency';
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export interface MarketCapFormatOptions {
  decimals?: number;
  currency?: string;
}

export interface VolumeFormatOptions {
  decimals?: number;
  currency?: string;
}

export interface PercentageFormatOptions {
  decimals?: number;
  showSign?: boolean;
  showSymbol?: boolean;
}

export interface NumberFormatOptions {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export interface NumberAbbreviatedOptions {
  decimals?: number;
  currency?: string;
  compact?: boolean;
}

export interface DateFormatOptions {
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
}

export interface TimeFormatOptions {
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
}

export interface ColorOptions {
  positiveColor?: string;
  negativeColor?: string;
  neutralColor?: string;
  positiveBg?: string;
  negativeBg?: string;
  neutralBg?: string;
  positiveBorder?: string;
  negativeBorder?: string;
  neutralBorder?: string;
}

export interface LargeNumberOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export interface PercentageWithColorOptions {
  decimals?: number;
  showSign?: boolean;
  showSymbol?: boolean;
}

export interface PercentageWithColorResult {
  value: string;
  colorClass: string;
  isPositive: boolean;
  isNegative: boolean;
  isNeutral: boolean;
}

// Currency and number formatting
export function formatPrice(price: number | null | undefined, currency?: string, options?: PriceFormatOptions): string;
export function formatMarketCap(marketCap: number | null | undefined, options?: MarketCapFormatOptions): string;
export function formatVolume(volume: number | null | undefined, options?: VolumeFormatOptions): string;
export function formatPercentage(percentage: number | null | undefined, options?: PercentageFormatOptions): string;
export function formatNumber(number: number | null | undefined, options?: NumberFormatOptions): string;
export function formatNumberAbbreviated(number: number | null | undefined, options?: NumberAbbreviatedOptions): string;
export function formatSupply(supply: number | null | undefined, symbol?: string): string;

// Date and time formatting
export function formatDate(date: string | Date | number | null | undefined, options?: DateFormatOptions): string;
export function formatTime(date: string | Date | number | null | undefined, options?: TimeFormatOptions): string;
export function formatChartDate(timestamp: number | string | null | undefined, timeframe?: string): string;
export function formatTooltipDate(timestamp: number | string | null | undefined, timeframe?: string): string;
export function formatRelativeTime(date: string | Date | number | null | undefined): string;

// Text formatting
export function truncateText(text: string | null | undefined, maxLength?: number, suffix?: string): string;
export function capitalize(text: string | null | undefined): string;
export function formatCryptoName(name: string | null | undefined): string;

// URL and link utilities
export function formatUrl(url: string | null | undefined): string;
export function isValidUrl(url: string | null | undefined): boolean;

// Color and theme utilities
export function getPriceChangeColor(change: number | null | undefined, options?: ColorOptions): string;
export function getPriceChangeIcon(change: number | null | undefined): string;
export function getPriceChangeBgColor(change: number | null | undefined, options?: ColorOptions): string;
export function getPriceChangeBorderColor(change: number | null | undefined, options?: ColorOptions): string;

// Validation utilities
export function isValidEmail(email: string | null | undefined): boolean;
export function isValidCryptoAddress(address: string | null | undefined, type?: string): boolean;

// Enhanced null/undefined handling utilities
export function safeFormat<T>(value: T, formatter: (val: T) => string, fallback?: string): string;
export function safeNumber(value: number | string | null | undefined, fallback?: number): number;
export function safeString(value: any, fallback?: string): string;
export function formatLargeNumber(number: number | null | undefined, options?: LargeNumberOptions): string;
export function formatPercentageWithColor(percentage: number | null | undefined, options?: PercentageWithColorOptions): PercentageWithColorResult;
