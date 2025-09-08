/**
 * Utility function to format coin names from IDs
 * 
 * @function formatCoinName
 * @param {string} coinId - The cryptocurrency ID to format
 * @returns {string} Formatted coin name with proper capitalization
 * 
 * @description
 * Takes a cryptocurrency ID (e.g., 'bitcoin-cash') and formats it into a
 * human-readable name (e.g., 'Bitcoin Cash') by capitalizing each word.
 * 
 * @example
 * ```typescript
 * formatCoinName('bitcoin-cash') // Returns 'Bitcoin Cash'
 * formatCoinName('ethereum') // Returns 'Ethereum'
 * formatCoinName('') // Returns 'Bitcoin' (fallback)
 * ```
 * 
 * @since 1.0.0
 * @author AI Assistant (Claude Sonnet 4) - Utility function implementation
 */
export function formatCoinName(coinId: string): string {
  if (!coinId) return 'Bitcoin';
  
  return coinId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Common coin name mappings for better display
 * 
 * @constant {Record<string, string>} coinNameMappings
 * @description
 * Maps cryptocurrency IDs to their preferred display names.
 * This ensures consistent and user-friendly naming across the application.
 * 
 * @example
 * ```typescript
 * coinNameMappings['binancecoin'] // Returns 'BNB'
 * coinNameMappings['bitcoin-cash'] // Returns 'Bitcoin Cash'
 * ```
 */
const coinNameMappings: Record<string, string> = {
  'bitcoin': 'Bitcoin',
  'ethereum': 'Ethereum',
  'binancecoin': 'BNB',
  'solana': 'Solana',
  'cardano': 'Cardano',
  'polkadot': 'Polkadot',
  'dogecoin': 'Dogecoin',
  'avalanche-2': 'Avalanche',
  'chainlink': 'Chainlink',
  'polygon': 'Polygon',
  'litecoin': 'Litecoin',
  'bitcoin-cash': 'Bitcoin Cash',
  'stellar': 'Stellar',
  'uniswap': 'Uniswap',
  'ethereum-classic': 'Ethereum Classic',
};

/**
 * Gets the display name for a cryptocurrency
 * 
 * @function getDisplayName
 * @param {string} coinId - The cryptocurrency ID
 * @returns {string} The preferred display name for the cryptocurrency
 * 
 * @description
 * Returns the best display name for a cryptocurrency by first checking
 * the predefined mappings, then falling back to formatted coin name.
 * This ensures consistent and user-friendly naming throughout the app.
 * 
 * @example
 * ```typescript
 * getDisplayName('bitcoin') // Returns 'Bitcoin'
 * getDisplayName('binancecoin') // Returns 'BNB'
 * getDisplayName('bitcoin-cash') // Returns 'Bitcoin Cash'
 * getDisplayName('unknown-coin') // Returns 'Unknown Coin'
 * ```
 * 
 * @since 1.0.0
 * @author AI Assistant (Claude Sonnet 4) - Display name utility implementation
 */
export function getDisplayName(coinId: string): string {
  const lowerId = coinId.toLowerCase();
  return coinNameMappings[lowerId] || formatCoinName(coinId);
}
