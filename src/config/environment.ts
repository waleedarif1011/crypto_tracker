// Environment configuration and validation
interface EnvironmentConfig {
  // API Configuration
  apiBaseUrl: string;
  apiTimeout: number;
  apiRetryAttempts: number;
  coingeckoApiKey?: string;
  
  // App Configuration
  appName: string;
  appVersion: string;
  nodeEnv: string;
  
  // Feature Flags
  enableAnalytics: boolean;
  enableErrorReporting: boolean;
  enableDebugMode: boolean;
  
  // Performance Settings
  enableServiceWorker: boolean;
  cacheDuration: number;
  
  // Error Reporting
  sentryDsn?: string;
  errorReportingEndpoint?: string;
}

// Environment variable validation
const validateEnvironment = (): EnvironmentConfig => {
  const requiredVars = [
    'VITE_API_BASE_URL',
    'VITE_APP_NAME',
    'VITE_APP_VERSION'
  ];

  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  // Validate API URL format
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  try {
    new URL(apiUrl);
  } catch {
    throw new Error('VITE_API_BASE_URL must be a valid URL');
  }

  // Validate numeric values
  const apiTimeout = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000');
  const apiRetryAttempts = parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS || '3');
  const cacheDuration = parseInt(import.meta.env.VITE_CACHE_DURATION || '300000');

  if (isNaN(apiTimeout) || apiTimeout <= 0) {
    throw new Error('VITE_API_TIMEOUT must be a positive number');
  }

  if (isNaN(apiRetryAttempts) || apiRetryAttempts < 0) {
    throw new Error('VITE_API_RETRY_ATTEMPTS must be a non-negative number');
  }

  if (isNaN(cacheDuration) || cacheDuration <= 0) {
    throw new Error('VITE_CACHE_DURATION must be a positive number');
  }

  return {
    // API Configuration
    apiBaseUrl: apiUrl,
    apiTimeout,
    apiRetryAttempts,
    coingeckoApiKey: import.meta.env.VITE_COINGECKO_API_KEY,
    
    // App Configuration
    appName: import.meta.env.VITE_APP_NAME,
    appVersion: import.meta.env.VITE_APP_VERSION,
    nodeEnv: import.meta.env.NODE_ENV || 'development',
    
    // Feature Flags
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableErrorReporting: import.meta.env.VITE_ENABLE_ERROR_REPORTING === 'true',
    enableDebugMode: import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true',
    
    // Performance Settings
    enableServiceWorker: import.meta.env.VITE_ENABLE_SERVICE_WORKER === 'true',
    cacheDuration,
    
    // Error Reporting
    sentryDsn: import.meta.env.VITE_SENTRY_DSN,
    errorReportingEndpoint: import.meta.env.VITE_ERROR_REPORTING_ENDPOINT,
  };
};

// Export validated configuration
export const config = validateEnvironment();

// Export individual configs for convenience
export const {
  apiBaseUrl,
  apiTimeout,
  apiRetryAttempts,
  coingeckoApiKey,
  appName,
  appVersion,
  nodeEnv,
  enableAnalytics,
  enableErrorReporting,
  enableDebugMode,
  enableServiceWorker,
  cacheDuration,
  sentryDsn,
  errorReportingEndpoint,
} = config;

// Environment-specific configurations
export const isDevelopment = nodeEnv === 'development';
export const isProduction = nodeEnv === 'production';
export const isTest = nodeEnv === 'test';

// Debug logging helper
export const debugLog = (...args: any[]) => {
  if (enableDebugMode) {
    console.log(`[${appName}]`, ...args);
  }
};

// Error logging helper
export const errorLog = (error: Error, context?: string) => {
  console.error(`[${appName}] Error${context ? ` in ${context}` : ''}:`, error);
  
  if (enableErrorReporting && errorReportingEndpoint) {
    // Send error to reporting service
    fetch(errorReportingEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
    }).catch(reportingError => {
      console.error('Failed to report error:', reportingError);
    });
  }
};
