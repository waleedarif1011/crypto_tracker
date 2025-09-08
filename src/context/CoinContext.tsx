import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useParams } from 'react-router-dom';

/**
 * Coin data structure for cryptocurrency information
 * @interface CoinData
 */
interface CoinData {
  /** Unique identifier for the cryptocurrency */
  id: string;
  /** Display name of the cryptocurrency */
  name: string;
  /** Trading symbol (e.g., BTC, ETH) */
  symbol: string;
  /** URL to the cryptocurrency's logo image */
  image?: string;
  /** Current price in USD */
  current_price?: number;
  /** 24-hour price change percentage */
  price_change_percentage_24h?: number;
  /** Market capitalization rank */
  market_cap_rank?: number;
}

/**
 * Context type for coin-related state management
 * @interface CoinContextType
 */
interface CoinContextType {
  /** Current coin data or null if no coin is selected */
  currentCoin: CoinData | null;
  /** Function to update the current coin data */
  setCurrentCoin: (coin: CoinData | null) => void;
  /** Loading state for coin data fetching */
  isLoading: boolean;
}

/**
 * React context for managing coin-related state across the application
 * 
 * @description
 * This context provides centralized state management for cryptocurrency data,
 * allowing components to access and update coin information without prop drilling.
 * 
 * @example
 * ```typescript
 * // Access coin context in a component
 * const { currentCoin, setCurrentCoin, isLoading } = useCoin();
 * 
 * // Update current coin
 * setCurrentCoin({ id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' });
 * ```
 */
const CoinContext = createContext<CoinContextType | undefined>(undefined);

/**
 * Props for the CoinProvider component
 * @interface CoinProviderProps
 */
interface CoinProviderProps {
  /** Child components that will have access to the coin context */
  children: ReactNode;
}

/**
 * Provider component for coin-related state management
 * 
 * @component
 * @param {CoinProviderProps} props - Component props
 * @returns {JSX.Element} The provider component wrapping children
 * 
 * @description
 * This provider component manages cryptocurrency data state and provides it to
 * all child components through React Context. It automatically fetches coin
 * data when the route changes and handles loading states and error fallbacks.
 * 
 * Features:
 * - Automatic coin data fetching on route changes
 * - Loading state management
 * - Error handling with fallback data
 * - Centralized state management
 * 
 * @example
 * ```tsx
 * // Wrap your app with CoinProvider
 * <CoinProvider>
 *   <App />
 * </CoinProvider>
 * 
 * // Access coin data in any child component
 * const { currentCoin, isLoading } = useCoin();
 * ```
 * 
 * @since 1.0.0
 * @author AI Assistant (Claude Sonnet 4) - Context implementation and documentation
 */
export function CoinProvider({ children }: CoinProviderProps) {
  const [currentCoin, setCurrentCoin] = useState<CoinData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams<{ id: string }>();

  /**
   * Fetches coin data when route changes
   * 
   * @function fetchCoinData
   * @description
   * Automatically fetches cryptocurrency data when the route parameter changes.
   * Handles loading states, API errors, and provides fallback data.
   * 
   * Process:
   * 1. Check if coin ID exists in route params
   * 2. Set loading state to true
   * 3. Fetch coin data from CoinGecko API
   * 4. Transform data to match CoinData interface
   * 5. Handle errors with fallback data
   * 6. Set loading state to false
   * 
   * @example
   * ```typescript
   * // When navigating to /coin/ethereum
   * // Automatically fetches Ethereum data and updates context
   * ```
   */
  useEffect(() => {
    const fetchCoinData = async () => {
      if (params.id) {
        setIsLoading(true);
        try {
          // Import the API function dynamically to avoid circular dependencies
          const { getCoinDetail } = await import('../utils/coingeckoApi.js');
          const coinData = await getCoinDetail(params.id, {
            localization: false,
            tickers: false,
            market_data: true,
            community_data: false,
            developer_data: false,
            sparkline: false,
          });

          // Transform API data to match our interface
          setCurrentCoin({
            id: coinData.id,
            name: coinData.name,
            symbol: coinData.symbol.toUpperCase(),
            image: coinData.image?.small,
            current_price: coinData.market_data?.current_price?.usd,
            price_change_percentage_24h: coinData.market_data?.price_change_percentage_24h,
            market_cap_rank: coinData.market_cap_rank,
          });
        } catch (error) {
          console.error('Error fetching coin data:', error);
          // Set fallback data when API fails
          setCurrentCoin({
            id: params.id,
            name: params.id.charAt(0).toUpperCase() + params.id.slice(1),
            symbol: params.id.toUpperCase(),
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        // Clear coin data when not on a coin detail page
        setCurrentCoin(null);
      }
    };

    fetchCoinData();
  }, [params.id]);

  return (
    <CoinContext.Provider value={{ currentCoin, setCurrentCoin, isLoading }}>
      {children}
    </CoinContext.Provider>
  );
}

/**
 * Custom hook to access coin context
 * 
 * @function useCoin
 * @returns {CoinContextType} The coin context value
 * @throws {Error} When used outside of CoinProvider
 * 
 * @description
 * This hook provides access to the coin context state and functions.
 * It must be used within a CoinProvider component, otherwise it will throw an error.
 * 
 * @example
 * ```typescript
 * // In a component
 * const { currentCoin, setCurrentCoin, isLoading } = useCoin();
 * 
 * // Check if coin data is available
 * if (currentCoin) {
 *   console.log(`Current coin: ${currentCoin.name} (${currentCoin.symbol})`);
 * }
 * 
 * // Update coin data
 * setCurrentCoin({
 *   id: 'bitcoin',
 *   name: 'Bitcoin',
 *   symbol: 'BTC'
 * });
 * ```
 * 
 * @since 1.0.0
 * @author AI Assistant (Claude Sonnet 4) - Hook implementation and documentation
 */
export function useCoin() {
  const context = useContext(CoinContext);
  if (context === undefined) {
    throw new Error('useCoin must be used within a CoinProvider');
  }
  return context;
}
