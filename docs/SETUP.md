# 🚀 Setup and Installation Guide

This guide provides detailed instructions for setting up the Crypto Tracker application in different environments.

## 📋 Prerequisites

### System Requirements
- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher (or yarn 1.22.0+)
- **Git**: Latest version
- **Docker**: 20.10.0+ (optional, for containerized development)
- **Memory**: 4GB RAM minimum, 8GB recommended
- **Storage**: 2GB free space

### Operating System Support
- ✅ **Windows**: 10/11 (WSL2 recommended)
- ✅ **macOS**: 10.15+ (Intel/Apple Silicon)
- ✅ **Linux**: Ubuntu 18.04+, CentOS 7+, Debian 9+

## 🔧 Installation Methods

### Method 1: Standard Installation (Recommended)

#### Step 1: Clone Repository
```bash
# Clone the repository
git clone https://github.com/yourusername/crypto-tracker.git
cd crypto-tracker

# Verify installation
ls -la
```

#### Step 2: Install Dependencies
```bash
# Using npm
npm install

# Or using yarn
yarn install

# Verify installation
npm list --depth=0
```

#### Step 3: Environment Setup
```bash
# Copy environment template
cp env.example .env.local

# Edit environment variables
nano .env.local
# or
code .env.local
```

#### Step 4: Start Development Server
```bash
# Start development server
npm run dev

# Server will start at http://localhost:5173
```

### Method 2: Docker Installation

#### Prerequisites
- Docker Desktop installed and running
- Docker Compose v2.0+

#### Quick Start
```bash
# Clone repository
git clone https://github.com/yourusername/crypto-tracker.git
cd crypto-tracker

# Start with Docker Compose
npm run dev:docker

# Or manually
docker-compose -f docker-compose.dev.yml up --build
```

#### Docker Commands
```bash
# Development environment
docker-compose -f docker-compose.dev.yml up --build
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml logs -f

# Production environment
docker-compose up --build
docker-compose down
```

### Method 3: Vercel Deployment

#### Prerequisites
- Vercel account
- Vercel CLI installed

#### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
```

## ⚙️ Environment Configuration

### Required Environment Variables

Create a `.env.local` file in the project root:

```env
# API Configuration
VITE_API_BASE_URL=https://api.coingecko.com/api/v3
VITE_APP_NAME=Crypto Tracker
VITE_APP_VERSION=1.0.0
NODE_ENV=development
```

### Optional Environment Variables

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

# Error Reporting (Optional)
VITE_SENTRY_DSN=your_sentry_dsn_here
VITE_ERROR_REPORTING_ENDPOINT=your_error_endpoint_here
```

### Environment Validation

```bash
# Validate environment configuration
npm run validate-env

# Validate specific environment
npm run validate-env:dev
npm run validate-env:staging
npm run validate-env:prod
```

## 🛠️ Development Setup

### IDE Configuration

#### VS Code (Recommended)
Install the following extensions:
- **ES7+ React/Redux/React-Native snippets**
- **TypeScript Importer**
- **Tailwind CSS IntelliSense**
- **Prettier - Code formatter**
- **ESLint**

#### VS Code Settings
Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

### Git Configuration

#### Pre-commit Hooks
```bash
# Install husky for git hooks
npm install --save-dev husky

# Setup pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm run type-check"
```

#### Git Ignore
Ensure `.gitignore` includes:
```
# Dependencies
node_modules/
npm-debug.log*

# Environment files
.env
.env.local
.env.*.local

# Build outputs
dist/
build/

# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db
```

## 🧪 Testing Setup

### Unit Testing
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### E2E Testing
```bash
# Install Playwright
npm install --save-dev @playwright/test

# Run E2E tests
npm run test:e2e

# Run E2E tests in UI mode
npm run test:e2e:ui
```

## 📦 Build Configuration

### Development Build
```bash
# Standard development build
npm run build

# Development build with source maps
npm run build:dev
```

### Production Build
```bash
# Optimized production build
npm run build:prod

# Production build with analysis
npm run build:analyze
```

### Build Verification
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Lint with auto-fix
npm run lint:fix
```

## 🐳 Docker Development

### Development Container
```dockerfile
# Dockerfile.dev
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

### Docker Compose Development
```yaml
# docker-compose.dev.yml
version: '3.8'
services:
  crypto-tracker-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - CHOKIDAR_USEPOLLING=true
```

### Docker Commands
```bash
# Build development image
docker build -f Dockerfile.dev -t crypto-tracker-dev .

# Run development container
docker run -p 5173:5173 -v $(pwd):/app crypto-tracker-dev

# Run with environment file
docker run -p 5173:5173 --env-file .env.local crypto-tracker-dev
```

## 🌐 Production Deployment

### Vercel Deployment

#### Automatic Deployment
```bash
# Connect to Vercel
vercel link

# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

#### Manual Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

### Docker Production

#### Build Production Image
```bash
# Build production image
docker build -t crypto-tracker .

# Run production container
docker run -p 3000:8080 crypto-tracker

# Run with environment variables
docker run -p 3000:8080 -e NODE_ENV=production crypto-tracker
```

#### Docker Compose Production
```bash
# Start production services
docker-compose up --build

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔍 Troubleshooting

### Common Installation Issues

#### Node.js Version Issues
```bash
# Check Node.js version
node --version

# Use nvm to manage Node.js versions
nvm install 18
nvm use 18
```

#### Permission Issues (Linux/macOS)
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm

# Or use npx instead of global installs
npx vercel --version
```

#### Port Already in Use
```bash
# Find process using port 5173
lsof -ti:5173

# Kill process
kill -9 $(lsof -ti:5173)

# Or use different port
npm run dev -- --port 3000
```

### Docker Issues

#### Docker Not Running
```bash
# Start Docker Desktop
# On macOS: Open Docker Desktop app
# On Linux: sudo systemctl start docker

# Verify Docker is running
docker --version
docker-compose --version
```

#### Container Build Failures
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache

# Check Docker logs
docker-compose logs crypto-tracker-dev
```

### Environment Issues

#### Missing Environment Variables
```bash
# Check if .env.local exists
ls -la .env.local

# Validate environment
npm run validate-env

# Check environment variables
cat .env.local
```

#### API Connection Issues
```bash
# Test API connection
curl https://api.coingecko.com/api/v3/ping

# Check network connectivity
ping api.coingecko.com

# Verify API key (if using)
echo $VITE_COINGECKO_API_KEY
```

## 📚 Additional Resources

### Documentation
- [API Documentation](API.md)
- [Docker Guide](DOCKER.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Troubleshooting](TROUBLESHOOTING.md)

### External Resources
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [CoinGecko API](https://www.coingecko.com/en/api)

### Community
- [GitHub Issues](https://github.com/yourusername/crypto-tracker/issues)
- [GitHub Discussions](https://github.com/yourusername/crypto-tracker/discussions)
- [Discord Community](https://discord.gg/your-discord)

---

**Need help?** Check the [Troubleshooting Guide](TROUBLESHOOTING.md) or open an [issue](https://github.com/yourusername/crypto-tracker/issues).
