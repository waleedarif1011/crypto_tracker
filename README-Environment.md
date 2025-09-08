# Environment Configuration Guide

This document explains the environment configuration setup for the crypto tracker application.

## 📁 Configuration Files

### Environment Files
- `env.example` - Template for environment variables
- `.env.development` - Development environment (auto-loaded by Vite)
- `.env.staging` - Staging environment
- `.env.production` - Production environment

### Configuration Modules
- `src/config/environment.ts` - Main environment configuration with validation
- `src/config/environments.ts` - Environment-specific settings
- `src/utils/errorReporting.ts` - Error reporting and monitoring

## 🔧 Environment Variables

### Required Variables
```env
VITE_API_BASE_URL=https://api.coingecko.com/api/v3
VITE_APP_NAME=Crypto Tracker
VITE_APP_VERSION=1.0.0
```

### Optional Variables
```env
# API Configuration
VITE_API_TIMEOUT=10000
VITE_API_RETRY_ATTEMPTS=3
VITE_COINGECKO_API_KEY=your_api_key_here

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_REPORTING=false
VITE_ENABLE_DEBUG_MODE=true
VITE_ENABLE_SERVICE_WORKER=false

# Performance Settings
VITE_CACHE_DURATION=300000

# Error Reporting
VITE_SENTRY_DSN=your_sentry_dsn_here
VITE_ERROR_REPORTING_ENDPOINT=your_error_endpoint_here
```

## 🚀 Build Scripts

### Development
```bash
npm run dev                    # Start development server
npm run dev:docker            # Start with Docker
npm run validate-env:dev      # Validate development environment
```

### Production
```bash
npm run build:prod            # Production build with optimizations
npm run build:analyze         # Build with bundle analysis
npm run validate-env:prod     # Validate production environment
```

### Validation
```bash
npm run validate-env          # Validate all environments
npm run type-check           # TypeScript type checking
npm run lint                 # ESLint validation
```

## 🌍 Environment-Specific Configurations

### Development
- Debug mode enabled
- Source maps enabled
- Hot reload enabled
- Error reporting disabled
- Analytics disabled

### Staging
- Debug mode enabled
- Source maps enabled
- Error reporting enabled
- Analytics enabled
- Performance monitoring enabled

### Production
- Debug mode disabled
- Source maps disabled
- Error reporting enabled
- Analytics enabled
- Service worker enabled
- Performance monitoring enabled

## 🔍 Environment Validation

The validation system checks:

1. **Required Variables** - All mandatory environment variables are present
2. **Format Validation** - URLs, numbers, and booleans are properly formatted
3. **Environment-Specific Rules** - Production-specific validations
4. **Security Checks** - Debug mode and error reporting configuration

### Validation Commands
```bash
# Validate all environments
npm run validate-env

# Validate specific environment
npm run validate-env:dev
npm run validate-env:staging
npm run validate-env:prod
```

## 📊 Error Reporting

### Features
- Global error handling
- Unhandled promise rejection tracking
- React Error Boundary integration
- Performance monitoring
- Offline queue management
- Session tracking

### Configuration
```typescript
import { errorReporter } from '@utils/errorReporting';

// Report custom errors
errorReporter.reportError(error, 'context', additionalData);

// Set user ID for tracking
errorReporter.setUserId('user123');

// Performance monitoring
performanceMonitor.markStart('operation');
// ... operation code ...
performanceMonitor.markEnd('operation');
```

## 🏗️ Build Optimization

### Vite Configuration
- **Code Splitting** - Automatic vendor chunking
- **Tree Shaking** - Dead code elimination
- **Minification** - ESBuild for fast minification
- **Source Maps** - Disabled in production
- **Asset Optimization** - Hashed filenames for caching

### Bundle Analysis
```bash
npm run build:analyze
```

This will:
1. Build the application
2. Generate bundle analysis report
3. Open interactive bundle analyzer

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env` files to version control
- Use `env.example` as a template
- Validate all environment variables before deployment
- Use different API keys for different environments

### Production Checklist
- [ ] Debug mode disabled
- [ ] Error reporting enabled
- [ ] Analytics configured
- [ ] API keys secured
- [ ] Source maps disabled
- [ ] Service worker enabled (if applicable)

## 🚨 Troubleshooting

### Common Issues

#### Missing Environment Variables
```bash
Error: Missing required environment variables: VITE_API_BASE_URL
```
**Solution**: Copy `env.example` to `.env.local` and fill in required values.

#### Invalid API URL
```bash
Error: VITE_API_BASE_URL must be a valid URL
```
**Solution**: Ensure the URL includes protocol (https://) and is properly formatted.

#### Build Failures
```bash
Error: Build failed
```
**Solution**: 
1. Run `npm run validate-env` to check configuration
2. Run `npm run type-check` to check TypeScript
3. Run `npm run lint` to check code quality

### Debug Mode
Enable debug mode to see detailed logging:
```env
VITE_ENABLE_DEBUG_MODE=true
```

This will show:
- Environment configuration
- API request/response details
- Performance metrics
- Error details
