# 🚀 Deployment Guide

This guide covers all deployment options for the Crypto Tracker application, including Docker, Vercel, and traditional hosting platforms.

## 📋 Deployment Options

### 🎯 Recommended Deployments
1. **Vercel** - Best for React applications with edge functions
2. **Docker** - Best for containerized deployments
3. **Netlify** - Alternative to Vercel with similar features
4. **Traditional Hosting** - For custom server environments

## 🌐 Vercel Deployment

### Prerequisites
- Vercel account
- GitHub repository
- Vercel CLI (optional)

### Automatic Deployment

#### Method 1: GitHub Integration
1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the crypto-tracker repository

2. **Configure Project**
   ```json
   {
     "framework": "vite",
     "buildCommand": "npm run build:prod",
     "outputDirectory": "dist",
     "installCommand": "npm ci",
     "nodeVersion": "18.x"
   }
   ```

3. **Set Environment Variables**
   ```env
   VITE_API_BASE_URL=https://api.coingecko.com/api/v3
   VITE_APP_NAME=Crypto Tracker
   VITE_APP_VERSION=1.0.0
   NODE_ENV=production
   VITE_ENABLE_ANALYTICS=true
   VITE_ENABLE_ERROR_REPORTING=true
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Access your live application

#### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

### Vercel Configuration

#### vercel.json
```json
{
  "version": 2,
  "name": "crypto-tracker",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://api.coingecko.com/api/v3/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### Environment Variables in Vercel
```bash
# Set environment variables via CLI
vercel env add VITE_API_BASE_URL
vercel env add VITE_APP_NAME
vercel env add VITE_APP_VERSION

# List environment variables
vercel env ls

# Remove environment variable
vercel env rm VITE_API_BASE_URL
```

## 🐳 Docker Deployment

### Production Docker Build

#### Dockerfile
```dockerfile
# Multi-stage Dockerfile for React + Vite crypto tracker app

# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies for native modules
RUN apk add --no-cache python3 make g++

# Copy package files for better caching
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci --silent && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Set proper permissions for nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Switch to non-root user
USER nginx

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose Production
```yaml
# docker-compose.yml
version: '3.8'

services:
  crypto-tracker:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:8080"
    environment:
      - NODE_ENV=production
      - VITE_API_BASE_URL=${VITE_API_BASE_URL:-https://api.coingecko.com/api/v3}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Docker Deployment Commands

#### Build and Run
```bash
# Build production image
docker build -t crypto-tracker .

# Run production container
docker run -p 3000:8080 crypto-tracker

# Run with environment variables
docker run -p 3000:8080 \
  -e NODE_ENV=production \
  -e VITE_API_BASE_URL=https://api.coingecko.com/api/v3 \
  crypto-tracker
```

#### Docker Compose
```bash
# Start production services
docker-compose up --build

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild without cache
docker-compose build --no-cache
```

### Docker Registry Deployment

#### Build and Push to Registry
```bash
# Build image
docker build -t your-registry/crypto-tracker:latest .

# Tag for registry
docker tag crypto-tracker:latest your-registry/crypto-tracker:v1.0.0

# Push to registry
docker push your-registry/crypto-tracker:latest
docker push your-registry/crypto-tracker:v1.0.0
```

#### Deploy from Registry
```bash
# Pull and run from registry
docker run -p 3000:8080 your-registry/crypto-tracker:latest

# Or use docker-compose with registry image
# docker-compose.yml
services:
  crypto-tracker:
    image: your-registry/crypto-tracker:latest
    ports:
      - "3000:8080"
```

## 🌍 Traditional Hosting

### Nginx Configuration

#### nginx.conf
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/crypto-tracker/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api/ {
        proxy_pass https://api.coingecko.com/api/v3/;
        proxy_set_header Host api.coingecko.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Apache Configuration

#### .htaccess
```apache
RewriteEngine On

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache static assets
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header set Cache-Control "public, immutable"
</FilesMatch>

# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Security headers
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"
```

### Manual Deployment Steps

#### 1. Build Application
```bash
# Install dependencies
npm ci

# Build for production
npm run build:prod

# Verify build
ls -la dist/
```

#### 2. Upload to Server
```bash
# Upload dist folder to server
scp -r dist/* user@server:/var/www/crypto-tracker/

# Or use rsync
rsync -avz dist/ user@server:/var/www/crypto-tracker/
```

#### 3. Configure Web Server
```bash
# Copy nginx configuration
sudo cp nginx.conf /etc/nginx/sites-available/crypto-tracker
sudo ln -s /etc/nginx/sites-available/crypto-tracker /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔧 Environment-Specific Deployments

### Development Environment
```bash
# Development deployment
npm run dev:docker

# Or manual development
npm run dev
```

### Staging Environment
```bash
# Staging build
NODE_ENV=staging npm run build:prod

# Deploy to staging
vercel --env staging
```

### Production Environment
```bash
# Production build
NODE_ENV=production npm run build:prod

# Deploy to production
vercel --prod
```

## 📊 Deployment Monitoring

### Health Checks
```bash
# Check application health
curl -f http://localhost:3000/health

# Check Docker container health
docker ps
docker logs crypto-tracker

# Check Vercel deployment
vercel ls
vercel logs
```

### Performance Monitoring
```bash
# Lighthouse audit
npx lighthouse http://localhost:3000 --output html

# Bundle analysis
npm run build:analyze

# Performance testing
npx web-vitals
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test
    
    - name: Build application
      run: npm run build:prod
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

### Docker CI/CD
```yaml
# .github/workflows/docker.yml
name: Build and Push Docker Image

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Build Docker image
      run: docker build -t crypto-tracker:${{ github.sha }} .
    
    - name: Push to registry
      run: |
        echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
        docker push crypto-tracker:${{ github.sha }}
```

## 🚨 Rollback Procedures

### Vercel Rollback
```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]

# Or promote a specific deployment
vercel promote [deployment-url]
```

### Docker Rollback
```bash
# List images
docker images

# Rollback to previous image
docker run -p 3000:8080 crypto-tracker:previous-tag

# Update docker-compose
# Edit docker-compose.yml to use previous image tag
docker-compose up -d
```

### Traditional Hosting Rollback
```bash
# Backup current deployment
cp -r /var/www/crypto-tracker /var/www/crypto-tracker.backup

# Restore previous deployment
cp -r /var/www/crypto-tracker.previous/* /var/www/crypto-tracker/

# Reload web server
sudo systemctl reload nginx
```

## 📈 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build:analyze

# Optimize images
npx imagemin src/assets/* --out-dir=dist/assets

# Enable compression
gzip -k dist/assets/*.js
gzip -k dist/assets/*.css
```

### Runtime Optimization
```bash
# Enable service worker
VITE_ENABLE_SERVICE_WORKER=true npm run build:prod

# Enable caching
VITE_CACHE_DURATION=600000 npm run build:prod

# Enable analytics
VITE_ENABLE_ANALYTICS=true npm run build:prod
```

## 🔐 Security Considerations

### Environment Variables
```bash
# Never commit sensitive data
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.production" >> .gitignore

# Use secure environment variable management
vercel env add VITE_API_KEY
```

### Security Headers
```nginx
# Add security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
```

---

**Deployment Guide** - For more details, see the [Setup Guide](SETUP.md) and [Troubleshooting Guide](TROUBLESHOOTING.md).
