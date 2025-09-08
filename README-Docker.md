# Docker Development Setup

This project includes comprehensive Docker setup for both development and production environments.

## 🚀 Quick Start

### Development (with Hot Reload)
```bash
# Start development environment
npm run dev:docker

# Stop development environment
npm run dev:docker:down

# View logs
npm run dev:docker:logs
```

### Production
```bash
# Build and run production environment
npm run build:docker

# Stop production environment
npm run build:docker:down
```

## 📁 Files Overview

- `Dockerfile` - Production multi-stage build
- `Dockerfile.dev` - Development environment with hot reload
- `docker-compose.yml` - Production services
- `docker-compose.dev.yml` - Development services
- `.dockerignore` - Optimized build context

## 🔧 Development Features

### Hot Reload
- Volume mounting for instant code changes
- Vite dev server with HMR (Hot Module Replacement)
- File watching enabled for Docker environments

### Environment Variables
Create `.env.development` file:
```env
VITE_API_BASE_URL=https://api.coingecko.com/api/v3
NODE_ENV=development
CHOKIDAR_USEPOLLING=true
WATCHPACK_POLLING=true
```

### Port Mapping
- Development: `http://localhost:5173`
- Production: `http://localhost:3000`

## 🛠️ Manual Commands

### Development
```bash
# Build and start
docker-compose -f docker-compose.dev.yml up --build

# Start in background
docker-compose -f docker-compose.dev.yml up -d

# Stop services
docker-compose -f docker-compose.dev.yml down

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Rebuild without cache
docker-compose -f docker-compose.dev.yml build --no-cache
```

### Production
```bash
# Build and start
docker-compose up --build

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

## 🔍 Troubleshooting

### Hot Reload Not Working
- Ensure `CHOKIDAR_USEPOLLING=true` is set
- Check that volumes are properly mounted
- Restart the container: `docker-compose -f docker-compose.dev.yml restart`

### Port Already in Use
- Change ports in docker-compose files
- Kill existing processes: `lsof -ti:5173 | xargs kill -9`

### Build Issues
- Clear Docker cache: `docker system prune -a`
- Rebuild without cache: `docker-compose build --no-cache`

## 📊 Performance Tips

- Use `.dockerignore` to exclude unnecessary files
- Leverage Docker layer caching with proper COPY order
- Use multi-stage builds for smaller production images
- Enable polling for file watching in Docker environments
