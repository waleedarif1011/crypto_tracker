// Comprehensive examples of all formatter functions
import {
  formatPrice,
  formatMarketCap,
  formatVolume,
  formatPercentage,
  formatNumber,
  formatNumberAbbreviated,
  formatSupply,
  formatDate,
  formatTime,
  formatChartDate,
  formatTooltipDate,
  formatRelativeTime,
  truncateText,
  capitalize,
  formatCryptoName,
  formatUrl,
  isValidUrl,
  getPriceChangeColor,
  getPriceChangeIcon,
  getPriceChangeBgColor,
  getPriceChangeBorderColor,
  isValidEmail,
  isValidCryptoAddress,
  safeFormat,
  safeNumber,
  safeString,
  formatLargeNumber,
  formatPercentageWithColor
} from './formatters.js';

// Example usage for all formatter functions
export function formattersExample() {
  console.log('=== FORMATTERS EXAMPLES ===\n');

  // Currency formatting examples
  console.log('--- Currency Formatting ---');
  console.log('formatPrice(43250.123456):', formatPrice(43250.123456));
  console.log('formatPrice(43250.123456, "EUR"):', formatPrice(43250.123456, 'EUR'));
  console.log('formatPrice(null):', formatPrice(null));
  console.log('formatPrice(undefined):', formatPrice(undefined));

  // Market cap formatting examples
  console.log('\n--- Market Cap Formatting ---');
  console.log('formatMarketCap(847000000000):', formatMarketCap(847000000000));
  console.log('formatMarketCap(1500000000):', formatMarketCap(1500000000));
  console.log('formatMarketCap(50000000):', formatMarketCap(50000000));
  console.log('formatMarketCap(1500000):', formatMarketCap(1500000));
  console.log('formatMarketCap(500):', formatMarketCap(500));

  // Volume formatting examples
  console.log('\n--- Volume Formatting ---');
  console.log('formatVolume(28500000000):', formatVolume(28500000000));
  console.log('formatVolume(1500000000):', formatVolume(1500000000));
  console.log('formatVolume(50000000):', formatVolume(50000000));

  // Percentage formatting examples
  console.log('\n--- Percentage Formatting ---');
  console.log('formatPercentage(5.2):', formatPercentage(5.2));
  console.log('formatPercentage(-3.1):', formatPercentage(-3.1));
  console.log('formatPercentage(0):', formatPercentage(0));
  console.log('formatPercentage(5.2, { showSign: false }):', formatPercentage(5.2, { showSign: false }));
  console.log('formatPercentage(5.2, { showSymbol: false }):', formatPercentage(5.2, { showSymbol: false }));

  // Number formatting examples
  console.log('\n--- Number Formatting ---');
  console.log('formatNumber(1234567.89):', formatNumber(1234567.89));
  console.log('formatNumber(1234567.89, { maximumFractionDigits: 0 }):', formatNumber(1234567.89, { maximumFractionDigits: 0 }));

  // Number abbreviation examples
  console.log('\n--- Number Abbreviation ---');
  console.log('formatNumberAbbreviated(1234567):', formatNumberAbbreviated(1234567));
  console.log('formatNumberAbbreviated(1234567890):', formatNumberAbbreviated(1234567890));
  console.log('formatNumberAbbreviated(1234567890123):', formatNumberAbbreviated(1234567890123));
  console.log('formatNumberAbbreviated(-1234567):', formatNumberAbbreviated(-1234567));

  // Supply formatting examples
  console.log('\n--- Supply Formatting ---');
  console.log('formatSupply(19500000, "btc"):', formatSupply(19500000, 'btc'));
  console.log('formatSupply(120000000):', formatSupply(120000000));

  // Date formatting examples
  console.log('\n--- Date Formatting ---');
  const now = new Date();
  console.log('formatDate(now):', formatDate(now));
  console.log('formatDate(now, { year: "2-digit" }):', formatDate(now, { year: '2-digit' }));
  console.log('formatTime(now):', formatTime(now));

  // Chart date formatting examples
  console.log('\n--- Chart Date Formatting ---');
  const timestamp = Date.now();
  console.log('formatChartDate(timestamp, "1h"):', formatChartDate(timestamp, '1h'));
  console.log('formatChartDate(timestamp, "1d"):', formatChartDate(timestamp, '1d'));
  console.log('formatChartDate(timestamp, "7d"):', formatChartDate(timestamp, '7d'));
  console.log('formatChartDate(timestamp, "30d"):', formatChartDate(timestamp, '30d'));
  console.log('formatChartDate(timestamp, "1y"):', formatChartDate(timestamp, '1y'));

  // Tooltip date formatting examples
  console.log('\n--- Tooltip Date Formatting ---');
  console.log('formatTooltipDate(timestamp, "1h"):', formatTooltipDate(timestamp, '1h'));
  console.log('formatTooltipDate(timestamp, "1d"):', formatTooltipDate(timestamp, '1d'));

  // Relative time formatting examples
  console.log('\n--- Relative Time Formatting ---');
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  console.log('formatRelativeTime(oneHourAgo):', formatRelativeTime(oneHourAgo));
  console.log('formatRelativeTime(oneDayAgo):', formatRelativeTime(oneDayAgo));

  // Text formatting examples
  console.log('\n--- Text Formatting ---');
  const longText = 'This is a very long text that should be truncated for display purposes.';
  console.log('truncateText(longText, 30):', truncateText(longText, 30));
  console.log('capitalize("bitcoin"):', capitalize('bitcoin'));
  console.log('formatCryptoName("bitcoin cash"):', formatCryptoName('bitcoin cash'));

  // URL formatting examples
  console.log('\n--- URL Formatting ---');
  const url = 'https://bitcoin.org/';
  console.log('formatUrl(url):', formatUrl(url));
  console.log('isValidUrl(url):', isValidUrl(url));
  console.log('isValidUrl("invalid-url"):', isValidUrl('invalid-url'));

  // Color utilities examples
  console.log('\n--- Color Utilities ---');
  console.log('getPriceChangeColor(5.2):', getPriceChangeColor(5.2));
  console.log('getPriceChangeColor(-3.1):', getPriceChangeColor(-3.1));
  console.log('getPriceChangeColor(0):', getPriceChangeColor(0));
  console.log('getPriceChangeIcon(5.2):', getPriceChangeIcon(5.2));
  console.log('getPriceChangeIcon(-3.1):', getPriceChangeIcon(-3.1));
  console.log('getPriceChangeBgColor(5.2):', getPriceChangeBgColor(5.2));
  console.log('getPriceChangeBorderColor(-3.1):', getPriceChangeBorderColor(-3.1));

  // Validation examples
  console.log('\n--- Validation ---');
  console.log('isValidEmail("test@example.com"):', isValidEmail('test@example.com'));
  console.log('isValidEmail("invalid-email"):', isValidEmail('invalid-email'));
  console.log('isValidCryptoAddress("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", "bitcoin"):', isValidCryptoAddress('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', 'bitcoin'));
  console.log('isValidCryptoAddress("0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6", "ethereum"):', isValidCryptoAddress('0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', 'ethereum'));

  // Safe formatting examples
  console.log('\n--- Safe Formatting ---');
  console.log('safeFormat(null, formatPrice):', safeFormat(null, formatPrice));
  console.log('safeFormat(undefined, formatPrice):', safeFormat(undefined, formatPrice));
  console.log('safeNumber("123.45"):', safeNumber('123.45'));
  console.log('safeNumber(null):', safeNumber(null));
  console.log('safeString(123):', safeString(123));
  console.log('safeString(null):', safeString(null));

  // Large number formatting examples
  console.log('\n--- Large Number Formatting ---');
  console.log('formatLargeNumber(1234567):', formatLargeNumber(1234567));
  console.log('formatLargeNumber(1234567.89):', formatLargeNumber(1234567.89));

  // Percentage with color examples
  console.log('\n--- Percentage with Color ---');
  const positiveResult = formatPercentageWithColor(5.2);
  const negativeResult = formatPercentageWithColor(-3.1);
  const neutralResult = formatPercentageWithColor(0);
  
  console.log('formatPercentageWithColor(5.2):', positiveResult);
  console.log('formatPercentageWithColor(-3.1):', negativeResult);
  console.log('formatPercentageWithColor(0):', neutralResult);

  console.log('\n=== END OF EXAMPLES ===');
}

// Real-world usage examples
export function realWorldExamples() {
  console.log('\n=== REAL-WORLD USAGE EXAMPLES ===\n');

  // Example: Formatting cryptocurrency data
  const cryptoData = {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 43250.123456,
    marketCap: 847000000000,
    volume24h: 28500000000,
    priceChange24h: 2.5,
    priceChange7d: -1.2,
    circulatingSupply: 19500000,
    lastUpdated: new Date()
  };

  console.log('--- Cryptocurrency Data Formatting ---');
  console.log(`Name: ${formatCryptoName(cryptoData.name)} (${cryptoData.symbol.toUpperCase()})`);
  console.log(`Price: ${formatPrice(cryptoData.price)}`);
  console.log(`Market Cap: ${formatMarketCap(cryptoData.marketCap)}`);
  console.log(`24h Volume: ${formatVolume(cryptoData.volume24h)}`);
  console.log(`24h Change: ${formatPercentage(cryptoData.priceChange24h)}`);
  console.log(`7d Change: ${formatPercentage(cryptoData.priceChange7d)}`);
  console.log(`Circulating Supply: ${formatSupply(cryptoData.circulatingSupply, cryptoData.symbol)}`);
  console.log(`Last Updated: ${formatRelativeTime(cryptoData.lastUpdated)}`);

  // Example: Chart data formatting
  const chartData = [
    { timestamp: Date.now() - 24 * 60 * 60 * 1000, price: 42000, volume: 25000000000 },
    { timestamp: Date.now() - 12 * 60 * 60 * 1000, price: 43000, volume: 28000000000 },
    { timestamp: Date.now(), price: 43250, volume: 28500000000 }
  ];

  console.log('\n--- Chart Data Formatting ---');
  chartData.forEach((point, index) => {
    console.log(`Point ${index + 1}:`);
    console.log(`  Date: ${formatChartDate(point.timestamp, '1d')}`);
    console.log(`  Tooltip Date: ${formatTooltipDate(point.timestamp, '1d')}`);
    console.log(`  Price: ${formatPrice(point.price)}`);
    console.log(`  Volume: ${formatVolume(point.volume)}`);
  });

  // Example: Safe formatting with null/undefined values
  const apiResponse = {
    price: null,
    marketCap: undefined,
    volume: 'invalid',
    priceChange: 5.2
  };

  console.log('\n--- Safe Formatting with API Response ---');
  console.log(`Price: ${safeFormat(apiResponse.price, formatPrice)}`);
  console.log(`Market Cap: ${safeFormat(apiResponse.marketCap, formatMarketCap)}`);
  console.log(`Volume: ${safeFormat(apiResponse.volume, formatVolume)}`);
  console.log(`Price Change: ${safeFormat(apiResponse.priceChange, formatPercentage)}`);

  console.log('\n=== END OF REAL-WORLD EXAMPLES ===');
}

// Run examples if this file is executed directly
if (typeof window === 'undefined' && typeof process !== 'undefined') {
  formattersExample();
  realWorldExamples();
}
