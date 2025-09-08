# CoinGecko API Utilities

This directory contains comprehensive utilities for interacting with the CoinGecko API, specifically designed for cryptocurrency applications.

## Files Overview

- `coingeckoApi.js` - Main API client with all CoinGecko endpoints
- `coingeckoApi.example.js` - Usage examples and demonstrations
- `api.js` - General API utilities (axios-based)
- `formatters.js` - Data formatting utilities
- `cn.js` - Class name utilities

## CoinGecko API Features

### 🚀 Key Features

- **Rate Limiting**: Automatic 1.5-second delays between requests for free tier compliance
- **Retry Logic**: Exponential backoff for failed requests
- **Error Handling**: Comprehensive error formatting and handling
- **Vanry Priority**: Special function to prioritize Vanry/USDT pair in results
- **TypeScript Support**: JSDoc comments for better IntelliSense
- **Caching Ready**: Built for easy integration with caching layers

### 📊 Available Functions

#### Core Functions
```javascript
import {
  getTopCryptosWithVanryPriority,
  getCoinDetail,
  getCoinHistory,
  getSimplePrices,
  getTrendingCoins,
  searchCoins,
  getGlobalStats,
} from './utils/coingeckoApi';
```

#### Main API Endpoints

1. **`getTopCryptosWithVanryPriority(options)`**
   - Gets top cryptocurrencies with Vanry prioritized
   - Automatically fetches and prioritizes Vanry data
   - Handles missing Vanry data gracefully

2. **`getCoinDetail(coinId, options)`**
   - Detailed information about a specific coin
   - Market data, description, community stats

3. **`getCoinHistory(coinId, vs_currency, days, interval)`**
   - Historical price data
   - Multiple timeframes and intervals

4. **`getSimplePrices(coinIds, vs_currencies, ...options)`**
   - Current prices for multiple coins
   - Lightweight and fast

5. **`getTrendingCoins()`**
   - Currently trending cryptocurrencies

6. **`searchCoins(query)`**
   - Search for coins by name or symbol

7. **`getGlobalStats()`**
   - Global cryptocurrency market statistics

## Configuration

### Environment Variables

```bash
# Optional: CoinGecko API key for higher rate limits
REACT_APP_COINGECKO_API_KEY=your_api_key_here
```

### Rate Limiting

The API client includes automatic rate limiting for the free tier:
- **1.5 second delay** between requests
- **Exponential backoff** for retries
- **Smart error handling** for rate limit errors

## Usage Examples

### Basic Usage

```javascript
import { getTopCryptosWithVanryPriority } from './utils/coingeckoApi';

// Get top 20 cryptos with Vanry prioritized
const cryptos = await getTopCryptosWithVanryPriority({
  per_page: 20,
  price_change_percentage: '1h,24h,7d'
});
```

### React Hook Integration

```javascript
import { useEffect, useState } from 'react';
import { getTopCryptosWithVanryPriority } from './utils/coingeckoApi';

function CryptoList() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getTopCryptosWithVanryPriority();
        setCryptos(data);
      } catch (error) {
        console.error('Failed to load cryptos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {cryptos.map(coin => (
        <div key={coin.id}>
          {coin.name}: ${coin.current_price}
        </div>
      ))}
    </div>
  );
}
```

### Vanry Priority Feature

The `getTopCryptosWithVanryPriority` function ensures Vanry appears in your results:

```javascript
const cryptos = await getTopCryptosWithVanryPriority();
// Vanry will be at the top of the list if available
// Falls back gracefully if Vanry data is unavailable
```

## Error Handling

All functions include comprehensive error handling:

```javascript
import { formatApiError } from './utils/coingeckoApi';

try {
  const data = await getCoinDetail('bitcoin');
} catch (error) {
  const userFriendlyMessage = formatApiError(error);
  console.error(userFriendlyMessage);
}
```

## Type Definitions

The API includes JSDoc type definitions for better IntelliSense:

```javascript
/**
 * @typedef {Object} CoinMarket
 * @property {string} id
 * @property {string} symbol
 * @property {string} name
 * @property {number} current_price
 * @property {number} market_cap
 * // ... more properties
 */
```

## Rate Limit Status

Check current rate limiting status:

```javascript
import { getRateLimitStatus } from './utils/coingeckoApi';

const status = getRateLimitStatus();
console.log('Time until next request:', status.timeUntilNextRequest);
```

## Best Practices

1. **Use appropriate delays**: The built-in rate limiting handles this automatically
2. **Cache results**: Consider implementing caching for frequently requested data
3. **Handle errors gracefully**: Always wrap API calls in try-catch blocks
4. **Use the Vanry priority function**: For applications that need to highlight Vanry
5. **Monitor rate limits**: Use `getRateLimitStatus()` for debugging

## API Limits (Free Tier)

- **Requests per minute**: ~40 (with 1.5s delays)
- **Monthly requests**: 10,000
- **Historical data**: Last 365 days
- **Real-time updates**: 1-2 minute delays

Consider upgrading to a paid plan for higher limits and real-time data.
