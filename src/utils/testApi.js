/**
 * Simple test script for CoinGecko API
 * Run with: node src/utils/testApi.js
 */

const { getTopCryptosWithVanryPriority, getTrendingCoins, formatApiError } = require('./coingeckoApi');

async function testApi() {
  console.log('🧪 Testing CoinGecko API...\n');

  try {
    console.log('📊 Fetching top cryptocurrencies with Vanry priority...');
    const cryptos = await getTopCryptosWithVanryPriority({ per_page: 5 });

    console.log(`✅ Found ${cryptos.length} cryptocurrencies`);
    console.log('Top 3 results:');
    cryptos.slice(0, 3).forEach((coin, index) => {
      console.log(`${index + 1}. ${coin.name} (${coin.symbol.toUpperCase()}) - $${coin.current_price || 'N/A'}`);
    });

    // Check if Vanry is prioritized
    const vanryIndex = cryptos.findIndex(coin => coin.id === 'vanry');
    if (vanryIndex !== -1) {
      console.log(`🎯 Vanry found at position ${vanryIndex + 1}`);
    } else {
      console.log('⚠️  Vanry not found in results');
    }

    console.log('\n📈 Fetching trending coins...');
    const trending = await getTrendingCoins();
    console.log(`✅ Found ${trending.coins?.length || 0} trending coins`);

    console.log('\n🎉 All tests passed! CoinGecko API is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', formatApiError(error));
    console.error('Full error:', error);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testApi();
}

module.exports = { testApi };
