# Vercel Deployment Guide

This guide covers deploying the crypto tracker application to Vercel with optimized settings.

## 🚀 Quick Deployment

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Deploy
```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Or deploy to preview
vercel
```

### 3. Environment Variables
Set these in the Vercel dashboard or via CLI:

```bash
vercel env add VITE_API_BASE_URL
vercel env add VITE_APP_NAME
vercel env add VITE_APP_VERSION
vercel env add VITE_ENABLE_ANALYTICS
vercel env add VITE_ENABLE_ERROR_REPORTING
```

## 📁 Configuration Files

### `vercel.json`
Main Vercel configuration with:
- **Build settings**: Output directory and build command
- **Routing**: SPA routing and API proxying
- **Headers**: Security and caching headers
- **Functions**: Serverless function configuration

### `.vercelignore`
Excludes unnecessary files from deployment:
- Development files
- Docker configurations
- Documentation
- Test files

### `public/_headers`
Static asset caching headers:
- Long-term caching for assets (1 year)
- Short-term caching for HTML (1 hour)
- Security headers for all files

### `public/_redirects`
SPA routing configuration:
- API proxy to CoinGecko
- Fallback to index.html for client-side routing

## 🔧 Build Configuration

### Build Command
```json
{
  "buildCommand": "npm run build:prod"
}
```

### Output Directory
```json
{
  "outputDirectory": "dist"
}
```

### Node Version
```json
{
  "nodeVersion": "18.x"
}
```

## 🌐 Environment Variables

### Required Variables
```env
VITE_API_BASE_URL=https://api.coingecko.com/api/v3
VITE_APP_NAME=Crypto Tracker
VITE_APP_VERSION=1.0.0
NODE_ENV=production
```

### Optional Variables
```env
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_REPORTING=true
VITE_ENABLE_DEBUG_MODE=false
VITE_COINGECKO_API_KEY=your_api_key_here
```

### Setting Variables via CLI
```bash
# Add environment variable
vercel env add VITE_API_BASE_URL

# List environment variables
vercel env ls

# Remove environment variable
vercel env rm VITE_API_BASE_URL
```

## 🛣️ Routing Configuration

### SPA Routing
All non-asset requests are redirected to `index.html` for client-side routing:

```json
{
  "src": "/(.*)",
  "dest": "/index.html"
}
```

### API Proxying
API requests are proxied to CoinGecko:

```json
{
  "src": "/api/(.*)",
  "dest": "https://api.coingecko.com/api/v3/$1"
}
```

## 📊 Performance Optimizations

### Static Asset Caching
- **JavaScript/CSS**: 1 year cache with immutable flag
- **Images/Fonts**: 1 year cache with immutable flag
- **HTML**: 1 hour cache
- **Service Worker**: No cache, must revalidate

### Code Splitting
Vite automatically splits code into chunks:
- `vendor.js` - React and core libraries
- `router.js` - React Router
- `charts.js` - Recharts library
- `utils.js` - Axios and utilities

### Image Optimization
Vercel automatically optimizes images:
- WebP conversion
- Responsive sizing
- Lazy loading

## 🔒 Security Headers

### Applied to All Routes
```json
{
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
}
```

## 📈 Analytics & Monitoring

### Vercel Analytics
Automatically enabled when deployed to Vercel:
- Page views
- Web vitals
- Performance metrics

### Error Reporting
Serverless function at `/api/error` for client-side error reporting.

### Health Checks
Health check endpoint at `/api/health` for monitoring.

## 🚀 Deployment Commands

### Development
```bash
# Deploy to preview
vercel

# Deploy with specific environment
vercel --env production
```

### Production
```bash
# Deploy to production
vercel --prod

# Deploy with custom domain
vercel --prod --confirm
```

### CI/CD Integration
```bash
# GitHub Actions example
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v20
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.ORG_ID }}
    vercel-project-id: ${{ secrets.PROJECT_ID }}
    vercel-args: '--prod'
```

## 🔍 Monitoring & Debugging

### Vercel Dashboard
- View deployments
- Monitor performance
- Check function logs
- View analytics

### Function Logs
```bash
# View function logs
vercel logs

# View specific function logs
vercel logs api/error
```

### Performance Monitoring
- Core Web Vitals
- Page load times
- API response times
- Error rates

## 🛠️ Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check build logs
vercel logs --build

# Test build locally
npm run build:prod
```

#### Environment Variables
```bash
# Verify environment variables
vercel env ls

# Check in function
console.log(process.env.VITE_API_BASE_URL);
```

#### Routing Issues
- Ensure `vercel.json` has correct routing rules
- Check `public/_redirects` file
- Verify SPA routing configuration

### Debug Mode
Enable debug mode for detailed logging:
```env
VITE_ENABLE_DEBUG_MODE=true
```

## 📋 Deployment Checklist

- [ ] Environment variables configured
- [ ] Build command working locally
- [ ] SPA routing configured
- [ ] API proxying working
- [ ] Security headers applied
- [ ] Caching headers optimized
- [ ] Error reporting configured
- [ ] Analytics enabled
- [ ] Health checks working
- [ ] Performance optimized

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
