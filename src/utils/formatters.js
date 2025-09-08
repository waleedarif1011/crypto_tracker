// Number and currency formatting utilities

export const formatPrice = (price, currency = 'USD', options = {}) => {
  if (price === null || price === undefined || isNaN(price)) return 'N/A';

  const defaultOptions = {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
    ...options,
  };

  return new Intl.NumberFormat('en-US', defaultOptions).format(price);
};

export const formatMarketCap = (marketCap, options = {}) => {
  if (marketCap === null || marketCap === undefined || isNaN(marketCap)) return 'N/A';

  const { decimals = 2, currency = 'USD' } = options;

  if (marketCap >= 1e12) {
    return `${currency === 'USD' ? '$' : ''}${(marketCap / 1e12).toFixed(decimals)}T`;
  } else if (marketCap >= 1e9) {
    return `${currency === 'USD' ? '$' : ''}${(marketCap / 1e9).toFixed(decimals)}B`;
  } else if (marketCap >= 1e6) {
    return `${currency === 'USD' ? '$' : ''}${(marketCap / 1e6).toFixed(decimals)}M`;
  } else if (marketCap >= 1e3) {
    return `${currency === 'USD' ? '$' : ''}${(marketCap / 1e3).toFixed(decimals)}K`;
  }
  return formatPrice(marketCap, currency);
};

export const formatVolume = (volume, options = {}) => {
  if (volume === null || volume === undefined || isNaN(volume)) return 'N/A';

  const { decimals = 2, currency = 'USD' } = options;

  if (volume >= 1e9) {
    return `${currency === 'USD' ? '$' : ''}${(volume / 1e9).toFixed(decimals)}B`;
  } else if (volume >= 1e6) {
    return `${currency === 'USD' ? '$' : ''}${(volume / 1e6).toFixed(decimals)}M`;
  } else if (volume >= 1e3) {
    return `${currency === 'USD' ? '$' : ''}${(volume / 1e3).toFixed(decimals)}K`;
  }
  return formatPrice(volume, currency);
};

export const formatPercentage = (percentage, options = {}) => {
  if (percentage === null || percentage === undefined || isNaN(percentage)) return 'N/A';

  const { decimals = 2, showSign = true, showSymbol = true } = options;
  const formatted = percentage.toFixed(decimals);
  const sign = showSign && percentage >= 0 ? '+' : '';
  const symbol = showSymbol ? '%' : '';
  
  return `${sign}${formatted}${symbol}`;
};

export const formatNumber = (number, options = {}) => {
  if (number === null || number === undefined || isNaN(number)) return 'N/A';

  const defaultOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  };

  return new Intl.NumberFormat('en-US', defaultOptions).format(number);
};

// Enhanced number abbreviation with more options
export const formatNumberAbbreviated = (number, options = {}) => {
  if (number === null || number === undefined || isNaN(number)) return 'N/A';

  const { decimals = 1, currency = '', compact = true } = options;

  if (!compact) {
    return formatNumber(number, { maximumFractionDigits: decimals });
  }

  const absNumber = Math.abs(number);
  const sign = number < 0 ? '-' : '';

  if (absNumber >= 1e12) {
    return `${sign}${currency}${(absNumber / 1e12).toFixed(decimals)}T`;
  } else if (absNumber >= 1e9) {
    return `${sign}${currency}${(absNumber / 1e9).toFixed(decimals)}B`;
  } else if (absNumber >= 1e6) {
    return `${sign}${currency}${(absNumber / 1e6).toFixed(decimals)}M`;
  } else if (absNumber >= 1e3) {
    return `${sign}${currency}${(absNumber / 1e3).toFixed(decimals)}K`;
  }
  
  return `${sign}${currency}${absNumber.toFixed(decimals)}`;
};

export const formatSupply = (supply, symbol = '') => {
  if (supply === null || supply === undefined) return 'N/A';

  const formatted = supply.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return symbol ? `${formatted} ${symbol.toUpperCase()}` : formatted;
};

// Date and time formatting utilities

export const formatDate = (date, options = {}) => {
  if (!date) return 'N/A';

  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date));
};

export const formatTime = (date, options = {}) => {
  if (!date) return 'N/A';

  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  };

  return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date));
};

// Chart-specific date formatting
export const formatChartDate = (timestamp, timeframe = 'daily') => {
  if (!timestamp) return 'N/A';

  const date = new Date(timestamp);
  
  switch (timeframe) {
    case 'hourly':
    case '1h':
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    case 'daily':
    case '1d':
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    case 'weekly':
    case '7d':
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    case 'monthly':
    case '30d':
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        year: '2-digit' 
      });
    case 'yearly':
    case '1y':
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });
    default:
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
  }
};

// Format date for tooltips
export const formatTooltipDate = (timestamp, timeframe = 'daily') => {
  if (!timestamp) return 'N/A';

  const date = new Date(timestamp);
  
  if (timeframe === 'hourly' || timeframe === '1h') {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatRelativeTime = (date) => {
  if (!date) return 'N/A';

  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
};

// Text formatting utilities

export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
};

export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatCryptoName = (name) => {
  if (!name) return '';
  return name.split(' ').map(word => capitalize(word)).join(' ');
};

// URL and link utilities

export const formatUrl = (url) => {
  if (!url) return '';
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Color and theme utilities

export const getPriceChangeColor = (change, options = {}) => {
  if (change === null || change === undefined || isNaN(change)) {
    return options.neutralColor || 'text-gray-600 dark:text-gray-400';
  }
  
  if (change > 0) return options.positiveColor || 'text-green-600 dark:text-green-400';
  if (change < 0) return options.negativeColor || 'text-red-600 dark:text-red-400';
  return options.neutralColor || 'text-gray-600 dark:text-gray-400';
};

export const getPriceChangeIcon = (change) => {
  if (change === null || change === undefined || isNaN(change)) return 'minus';
  if (change > 0) return 'trending-up';
  if (change < 0) return 'trending-down';
  return 'minus';
};

// Get background color for percentage changes
export const getPriceChangeBgColor = (change, options = {}) => {
  if (change === null || change === undefined || isNaN(change)) {
    return options.neutralBg || 'bg-gray-100 dark:bg-gray-800';
  }
  
  if (change > 0) return options.positiveBg || 'bg-green-100 dark:bg-green-900/20';
  if (change < 0) return options.negativeBg || 'bg-red-100 dark:bg-red-900/20';
  return options.neutralBg || 'bg-gray-100 dark:bg-gray-800';
};

// Get border color for percentage changes
export const getPriceChangeBorderColor = (change, options = {}) => {
  if (change === null || change === undefined || isNaN(change)) {
    return options.neutralBorder || 'border-gray-200 dark:border-gray-700';
  }
  
  if (change > 0) return options.positiveBorder || 'border-green-200 dark:border-green-800';
  if (change < 0) return options.negativeBorder || 'border-red-200 dark:border-red-800';
  return options.neutralBorder || 'border-gray-200 dark:border-gray-700';
};

// Validation utilities

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidCryptoAddress = (address, type = 'bitcoin') => {
  // Basic validation - can be extended for different crypto types
  if (!address || typeof address !== 'string') return false;

  switch (type.toLowerCase()) {
    case 'bitcoin':
      return /^([13][a-km-zA-HJ-NP-Z1-9]{25,34})|((bc1)[a-z0-9]{39,59})$/.test(address);
    case 'ethereum':
      return /^0x[a-fA-F0-9]{40}$/.test(address);
    default:
      return address.length > 10; // Basic length check
  }
};

// Enhanced null/undefined handling utilities
export const safeFormat = (value, formatter, fallback = 'N/A') => {
  if (value === null || value === undefined || isNaN(value)) {
    return fallback;
  }
  try {
    return formatter(value);
  } catch (error) {
    console.warn('Formatting error:', error);
    return fallback;
  }
};

// Safe number operations
export const safeNumber = (value, fallback = 0) => {
  if (value === null || value === undefined || isNaN(value)) {
    return fallback;
  }
  return Number(value);
};

// Safe string operations
export const safeString = (value, fallback = '') => {
  if (value === null || value === undefined) {
    return fallback;
  }
  return String(value);
};

// Format large numbers with proper spacing
export const formatLargeNumber = (number, options = {}) => {
  if (number === null || number === undefined || isNaN(number)) return 'N/A';

  const { locale = 'en-US', minimumFractionDigits = 0, maximumFractionDigits = 2 } = options;
  
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(number);
};

// Format percentage with color classes
export const formatPercentageWithColor = (percentage, options = {}) => {
  const { decimals = 2, showSign = true, showSymbol = true } = options;
  const formatted = formatPercentage(percentage, { decimals, showSign, showSymbol });
  const colorClass = getPriceChangeColor(percentage);
  
  return {
    value: formatted,
    colorClass,
    isPositive: percentage > 0,
    isNegative: percentage < 0,
    isNeutral: percentage === 0
  };
};
