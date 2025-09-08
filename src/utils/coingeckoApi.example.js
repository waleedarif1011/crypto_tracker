/**
 * CoinGecko API Usage Examples
 * This file demonstrates how to use the CoinGecko API utility functions
 */

import {
  getTopCryptosWithVanryPriority,
  getCoinDetail,
  getCoinHistory,
  getSimplePrices,
  getTrendingCoins,
  searchCoins,
  getGlobalStats,
  formatApiError,
} from './coingeckoApi';

// Example 1: Get top cryptocurrencies with Vanry prioritized
async function loadTopCryptos() {
  try {
    const cryptos = await getTopCryptosWithVanryPriority({
      per_page: 20,
      price_change_percentage: '1h,24h,7d',
    });

    console.log('Top cryptos with Vanry priority:', cryptos);
    return cryptos;
  } catch (error) {
    console.error('Error loading top cryptos:', formatApiError(error));
  }
}

// Example 2: Get detailed information about a specific coin
async function loadCoinDetail(coinId = 'bitcoin') {
  try {
    const coinData = await getCoinDetail(coinId, {
      localization: true,
      market_data: true,
      community_data: true,
      developer_data: false,
      sparkline: true,
    });

    console.log('Coin detail:', coinData);
    return coinData;
  } catch (error) {
    console.error('Error loading coin detail:', formatApiError(error));
  }
}

// Example 3: Get price history for a coin
async function loadPriceHistory(coinId = 'bitcoin', days = 7) {
  try {
    const history = await getCoinHistory(coinId, 'usd', days.toString());

    console.log('Price history:', history);
    return history;
  } catch (error) {
    console.error('Error loading price history:', formatApiError(error));
  }
}

// Example 4: Get current prices for multiple coins
async function loadMultiplePrices() {
  try {
    const prices = await getSimplePrices(
      ['bitcoin', 'ethereum', 'vanry'],
      ['usd', 'eur'],
      true, // include market cap
      true, // include 24h volume
      true, // include 24h change
      true  // include last updated
    );

    console.log('Multiple coin prices:', prices);
    return prices;
  } catch (error) {
    console.error('Error loading prices:', formatApiError(error));
  }
}

// Example 5: Search for coins
async function searchForCoins(query = 'bitcoin') {
  try {
    const results = await searchCoins(query);
    console.log('Search results:', results);
    return results;
  } catch (error) {
    console.error('Error searching coins:', formatApiError(error));
  }
}

// Example 6: Get trending coins
async function loadTrendingCoins() {
  try {
    const trending = await getTrendingCoins();
    console.log('Trending coins:', trending);
    return trending;
  } catch (error) {
    console.error('Error loading trending coins:', formatApiError(error));
  }
}

// Example 7: Get global crypto statistics
async function loadGlobalStats() {
  try {
    const stats = await getGlobalStats();
    console.log('Global stats:', stats);
    return stats;
  } catch (error) {
    console.error('Error loading global stats:', formatApiError(error));
  }
}

// Example usage with React hooks (pseudo-code)
/*
import { useEffect, useState } from 'react';
import { getTopCryptosWithVanryPriority, getCoinDetail } from '../utils/coingeckoApi';

function CryptoDashboard() {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCryptos();
  }, []);

  const loadCryptos = async () => {
    try {
      const data = await getTopCryptosWithVanryPriority();
      setCryptos(data);
    } catch (error) {
      console.error('Failed to load cryptos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCoinDetails = async (coinId) => {
    try {
      const data = await getCoinDetail(coinId);
      setSelectedCoin(data);
    } catch (error) {
      console.error('Failed to load coin details:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {cryptos.map(coin => (
        <div key={coin.id} onClick={() => loadCoinDetails(coin.id)}>
          {coin.name} - ${coin.current_price}
        </div>
      ))}
    </div>
  );
}
*/

export {
  loadTopCryptos,
  loadCoinDetail,
  loadPriceHistory,
  loadMultiplePrices,
  searchForCoins,
  loadTrendingCoins,
  loadGlobalStats,
};
