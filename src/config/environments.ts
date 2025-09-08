// Environment-specific configurations
export const environments = {
  development: {
    apiBaseUrl: 'https://api.coingecko.com/api/v3',
    apiTimeout: 10000,
    apiRetryAttempts: 3,
    enableAnalytics: false,
    enableErrorReporting: false,
    enableDebugMode: true,
    enableServiceWorker: false,
    cacheDuration: 60000, // 1 minute
    logLevel: 'debug',
  },
  
  staging: {
    apiBaseUrl: 'https://api.coingecko.com/api/v3',
    apiTimeout: 15000,
    apiRetryAttempts: 3,
    enableAnalytics: true,
    enableErrorReporting: true,
    enableDebugMode: true,
    enableServiceWorker: false,
    cacheDuration: 300000, // 5 minutes
    logLevel: 'info',
  },
  
  production: {
    apiBaseUrl: 'https://api.coingecko.com/api/v3',
    apiTimeout: 20000,
    apiRetryAttempts: 5,
    enableAnalytics: true,
    enableErrorReporting: true,
    enableDebugMode: false,
    enableServiceWorker: true,
    cacheDuration: 600000, // 10 minutes
    logLevel: 'warn',
  },
  
  test: {
    apiBaseUrl: 'https://api.coingecko.com/api/v3',
    apiTimeout: 5000,
    apiRetryAttempts: 1,
    enableAnalytics: false,
    enableErrorReporting: false,
    enableDebugMode: true,
    enableServiceWorker: false,
    cacheDuration: 0, // No caching in tests
    logLevel: 'error',
  },
} as const;

export type Environment = keyof typeof environments;
export type EnvironmentConfig = typeof environments[Environment];

// Get current environment
export const getCurrentEnvironment = (): Environment => {
  const env = import.meta.env.MODE || import.meta.env.NODE_ENV || 'development';
  
  // Map Vite modes to our environment names
  switch (env) {
    case 'development':
    case 'dev':
      return 'development';
    case 'staging':
    case 'stage':
      return 'staging';
    case 'production':
    case 'prod':
      return 'production';
    case 'test':
      return 'test';
    default:
      console.warn(`Unknown environment: ${env}, falling back to development`);
      return 'development';
  }
};

// Get environment-specific configuration
export const getEnvironmentConfig = (): EnvironmentConfig => {
  const currentEnv = getCurrentEnvironment();
  return environments[currentEnv];
};

// Environment-specific feature flags
export const featureFlags = {
  development: {
    showDebugInfo: true,
    enableHotReload: true,
    enableSourceMaps: true,
    enableMockData: false,
    enablePerformanceMonitoring: false,
  },
  
  staging: {
    showDebugInfo: true,
    enableHotReload: false,
    enableSourceMaps: true,
    enableMockData: false,
    enablePerformanceMonitoring: true,
  },
  
  production: {
    showDebugInfo: false,
    enableHotReload: false,
    enableSourceMaps: false,
    enableMockData: false,
    enablePerformanceMonitoring: true,
  },
  
  test: {
    showDebugInfo: false,
    enableHotReload: false,
    enableSourceMaps: false,
    enableMockData: true,
    enablePerformanceMonitoring: false,
  },
} as const;

export type FeatureFlags = typeof featureFlags[Environment];

// Get feature flags for current environment
export const getFeatureFlags = (): FeatureFlags => {
  const currentEnv = getCurrentEnvironment();
  return featureFlags[currentEnv];
};

// Environment validation
export const validateEnvironment = (): void => {
  const currentEnv = getCurrentEnvironment();
  const config = getEnvironmentConfig();
  
  console.log(`🌍 Environment: ${currentEnv}`);
  console.log(`📊 Config:`, config);
  
  // Validate required environment variables
  const requiredVars = [
    'VITE_API_BASE_URL',
    'VITE_APP_NAME',
    'VITE_APP_VERSION'
  ];
  
  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
  
  // Environment-specific validations
  if (currentEnv === 'production') {
    if (config.enableDebugMode) {
      console.warn('⚠️ Debug mode is enabled in production');
    }
    
    if (!config.enableErrorReporting) {
      console.warn('⚠️ Error reporting is disabled in production');
    }
  }
  
  console.log('✅ Environment validation passed');
};
