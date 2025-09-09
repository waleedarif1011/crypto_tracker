# 🐛 Troubleshooting Guide

This guide helps you diagnose and resolve common issues with the Crypto Tracker application.

## 🚨 Common Issues

### Build and Development Issues

#### Issue: Build Fails with TypeScript Errors
**Symptoms:**
- Build process stops with TypeScript compilation errors
- IDE shows red squiggly lines under code

**Solutions:**
```bash
# Check TypeScript errors
npm run type-check

# Fix common TypeScript issues
npm run lint:fix

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Update TypeScript
npm update typescript
```

**Prevention:**
- Enable TypeScript strict mode in IDE
- Run `npm run type-check` before committing
- Use proper type definitions

#### Issue: Development Server Won't Start
**Symptoms:**
- `npm run dev` fails to start
- Port 5173 is already in use
- Module not found errors

**Solutions:**
```bash
# Check if port is in use
lsof -ti:5173

# Kill process using port
kill -9 $(lsof -ti:5173)

# Use different port
npm run dev -- --port 3000

# Check Node.js version
node --version  # Should be 18+

# Clear npm cache
npm cache clean --force
```

#### Issue: Hot Reload Not Working
**Symptoms:**
- Changes don't reflect in browser
- Manual refresh required
- File watching not working

**Solutions:**
```bash
# Check file permissions
ls -la src/

# Restart development server
npm run dev

# Check if files are being watched
# In Docker, ensure volume mounting is correct
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up --build
```

### API and Data Issues

#### Issue: API Rate Limit Exceeded
**Symptoms:**
- "Too many requests" error
- Empty cryptocurrency list
- Network errors in console

**Solutions:**
```bash
# Add API key to environment
echo "VITE_COINGECKO_API_KEY=your_api_key_here" >> .env.local

# Implement request throttling
# Check src/utils/rateLimiter.ts

# Use caching to reduce API calls
# Enable service worker
VITE_ENABLE_SERVICE_WORKER=true
```

**Prevention:**
- Use CoinGecko Pro API key
- Implement proper caching
- Batch API requests when possible

#### Issue: Cryptocurrency Data Not Loading
**Symptoms:**
- Empty list on home page
- Loading spinner never stops
- Network errors in browser console

**Solutions:**
```bash
# Check API connectivity
curl https://api.coingecko.com/api/v3/ping

# Verify environment variables
npm run validate-env

# Check network connectivity
ping api.coingecko.com

# Test API endpoint directly
curl "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usdt&order=market_cap_desc&per_page=10&page=1"
```

#### Issue: Chart Data Not Displaying
**Symptoms:**
- Charts show "No data available"
- Price history not loading
- Chart component errors

**Solutions:**
```bash
# Check chart data API calls
# Open browser dev tools and check Network tab

# Verify chart data format
# Check src/utils/dataProcessing.ts

# Test chart data endpoint
curl "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usdt&days=7"
```

### Docker Issues

#### Issue: Docker Build Fails
**Symptoms:**
- Docker build process stops with errors
- "No such file or directory" errors
- Permission denied errors

**Solutions:**
```bash
# Check Docker is running
docker --version
docker-compose --version

# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache

# Check Dockerfile syntax
docker build -t test-build .

# Check file permissions
ls -la Dockerfile
```

#### Issue: Docker Container Won't Start
**Symptoms:**
- Container exits immediately
- "Port already in use" errors
- Permission errors

**Solutions:**
```bash
# Check container logs
docker-compose logs crypto-tracker

# Check port availability
netstat -tulpn | grep :3000

# Run container interactively
docker run -it crypto-tracker /bin/sh

# Check container status
docker ps -a
```

#### Issue: Volume Mounting Not Working
**Symptoms:**
- Changes not reflected in container
- File watching not working
- Permission issues

**Solutions:**
```bash
# Check volume mounting in docker-compose.yml
volumes:
  - .:/app
  - /app/node_modules

# Verify file permissions
ls -la src/

# Use absolute paths
volumes:
  - /absolute/path/to/project:/app
```

### Environment and Configuration Issues

#### Issue: Environment Variables Not Loading
**Symptoms:**
- Default values being used
- API calls failing
- Feature flags not working

**Solutions:**
```bash
# Check environment file exists
ls -la .env.local

# Validate environment variables
npm run validate-env

# Check environment file format
cat .env.local

# Ensure no spaces around =
VITE_API_BASE_URL=https://api.coingecko.com/api/v3

# Restart development server
npm run dev
```

#### Issue: Build Environment Mismatch
**Symptoms:**
- Different behavior in development vs production
- Missing features in production
- Environment-specific errors

**Solutions:**
```bash
# Check NODE_ENV
echo $NODE_ENV

# Set correct environment
export NODE_ENV=production

# Use environment-specific builds
npm run build:prod

# Check environment variables in production
vercel env ls
```

### Performance Issues

#### Issue: Slow Loading Times
**Symptoms:**
- Long initial load times
- Slow navigation between pages
- High memory usage

**Solutions:**
```bash
# Enable service worker
VITE_ENABLE_SERVICE_WORKER=true

# Increase cache duration
VITE_CACHE_DURATION=600000

# Use production build
npm run build:prod

# Analyze bundle size
npm run build:analyze

# Enable compression
# Check nginx.conf or vercel.json
```

#### Issue: High Memory Usage
**Symptoms:**
- Browser becomes unresponsive
- High CPU usage
- Memory leaks

**Solutions:**
```bash
# Check for memory leaks
# Open browser dev tools > Memory tab

# Reduce list size in development
# Edit src/components/CryptoListWithFilters.tsx

# Enable virtual scrolling
# Check src/components/VirtualizedCryptoList.tsx

# Monitor performance
npm run build:analyze
```

### Navigation and Routing Issues

#### Issue: Navigation Shows Wrong Coin Name
**Symptoms:**
- Header shows "Bitcoin" instead of current coin
- Navigation not updating
- Route parameters not working

**Solutions:**
```bash
# Check CoinContext implementation
# Verify src/context/CoinContext.tsx

# Check route parameters
# Verify src/components/AppRouter.tsx

# Check coin name formatter
# Verify src/utils/coinNameFormatter.ts

# Clear browser cache
# Hard refresh (Ctrl+Shift+R)
```

#### Issue: 404 Errors on Refresh
**Symptoms:**
- Page shows 404 on refresh
- Direct URL access fails
- SPA routing not working

**Solutions:**
```bash
# Check Vercel configuration
# Verify vercel.json routes

# Check nginx configuration
# Verify nginx.conf try_files

# Check Apache configuration
# Verify .htaccess RewriteRule

# Test routing
curl -I http://localhost:3000/coin/bitcoin
```

### Theme and UI Issues

#### Issue: Theme Not Persisting
**Symptoms:**
- Theme resets on page refresh
- Dark/light mode not working
- Theme toggle not responding

**Solutions:**
```bash
# Check theme context
# Verify src/context/ThemeContext.js

# Check localStorage
# Open browser dev tools > Application > Local Storage

# Clear browser storage
localStorage.clear()

# Check theme implementation
# Verify src/components/ThemeToggle.tsx
```

#### Issue: Responsive Design Issues
**Symptoms:**
- Layout breaks on mobile
- Components not responsive
- CSS not loading

**Solutions:**
```bash
# Check Tailwind CSS configuration
# Verify tailwind.config.js

# Check responsive classes
# Verify component className attributes

# Test responsive design
# Use browser dev tools device emulation

# Check CSS build
npm run build
ls -la dist/assets/
```

## 🔍 Debugging Tools

### Browser Developer Tools
```bash
# Open developer tools
F12 or Ctrl+Shift+I

# Check console for errors
Console tab

# Monitor network requests
Network tab

# Check performance
Performance tab

# Monitor memory usage
Memory tab
```

### React Developer Tools
```bash
# Install React DevTools extension
# Chrome: React Developer Tools
# Firefox: React Developer Tools

# Check component state
# Components tab

# Monitor props and state
# Props and State panels
```

### Vite Development Tools
```bash
# Check Vite configuration
# Verify vite.config.ts

# Monitor build process
npm run dev -- --debug

# Check dependency graph
npm run build:analyze
```

## 📊 Performance Monitoring

### Lighthouse Audit
```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --output html

# Check specific metrics
lighthouse http://localhost:3000 --only-categories=performance
```

### Bundle Analysis
```bash
# Analyze bundle size
npm run build:analyze

# Check for large dependencies
npm ls --depth=0

# Find unused dependencies
npx depcheck
```

### Network Monitoring
```bash
# Check API response times
# Browser dev tools > Network tab

# Monitor bundle loading
# Check waterfall chart

# Test on slow connections
# Chrome dev tools > Network > Throttling
```

## 🚨 Emergency Procedures

### Complete Reset
```bash
# Stop all processes
docker-compose down
pkill -f "npm run dev"

# Clear all caches
rm -rf node_modules package-lock.json
npm cache clean --force
docker system prune -a

# Reinstall everything
npm install
docker-compose build --no-cache
```

### Rollback to Previous Version
```bash
# Git rollback
git log --oneline
git reset --hard HEAD~1

# Docker rollback
docker images
docker run -p 3000:8080 crypto-tracker:previous-tag

# Vercel rollback
vercel ls
vercel rollback [deployment-url]
```

### Data Recovery
```bash
# Check browser storage
# Dev tools > Application > Local Storage

# Backup user data
# Export favorites, settings, etc.

# Restore from backup
# Import user data
```

## 📞 Getting Help

### Self-Help Resources
- [Project Documentation](README.md)
- [API Documentation](API.md)
- [Setup Guide](SETUP.md)
- [Deployment Guide](DEPLOYMENT.md)

### Community Support
- [GitHub Issues](https://github.com/yourusername/crypto-tracker/issues)
- [GitHub Discussions](https://github.com/yourusername/crypto-tracker/discussions)
- [Discord Community](https://discord.gg/your-discord)

### Professional Support
- [Contact Support](mailto:support@yourcompany.com)
- [Enterprise Support](https://yourcompany.com/enterprise)

## 📝 Reporting Issues

### Before Reporting
1. Check this troubleshooting guide
2. Search existing issues
3. Try the suggested solutions
4. Gather relevant information

### Information to Include
```bash
# System information
node --version
npm --version
docker --version

# Environment information
cat .env.local
npm run validate-env

# Error logs
npm run dev 2>&1 | tee error.log
docker-compose logs 2>&1 | tee docker-error.log

# Browser information
# User agent, console errors, network requests
```

### Issue Template
```markdown
## Bug Report

### Description
Brief description of the issue

### Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. See error

### Expected Behavior
What you expected to happen

### Actual Behavior
What actually happened

### Environment
- OS: [e.g., Windows 10, macOS 12, Ubuntu 20.04]
- Node.js: [e.g., 18.17.0]
- Browser: [e.g., Chrome 91, Firefox 89]
- Version: [e.g., 1.0.0]

### Additional Context
Any other relevant information
```

---

**Troubleshooting Guide** - For more help, see the [Setup Guide](SETUP.md) or open an [issue](https://github.com/yourusername/crypto-tracker/issues).
