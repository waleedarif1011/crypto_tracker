import { useState } from 'react';
import { Palette } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CryptoListWithFilters } from '../components/CryptoListWithFilters';

/**
 * Home page component for the crypto tracker application
 * 
 * @component
 * @returns {JSX.Element} The home page with cryptocurrency list and theme demo
 * 
 * @description
 * The main landing page of the crypto tracker application. Displays a list of
 * cryptocurrencies with filtering capabilities and includes a theme demonstration
 * section for showcasing the application's theming system.
 * 
 * Features:
 * - Cryptocurrency list with real-time data
 * - Advanced filtering and search capabilities
 * - Favorites functionality
 * - Theme demonstration toggle
 * - Responsive design for all screen sizes
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Home />
 * 
 * // The component automatically loads cryptocurrency data
 * // and provides filtering/search functionality
 * ```
 * 
 * @since 1.0.0
 * @author AI Assistant (Claude Sonnet 4) - Component implementation and documentation
 */
export function Home() {
  /** State for controlling theme demo visibility */
  const [showThemeDemo, setShowThemeDemo] = useState(false);

  return (
    <div>
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
          Cryptocurrency Tracker
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Track real-time cryptocurrency prices and market data from CoinGecko API
        </p>
      </div>

      {/* Theme Demo Toggle */}
      <div className="flex justify-center mb-8">
        <Button
          variant={showThemeDemo ? "primary" : "outline"}
          size="sm"
          onClick={() => setShowThemeDemo(!showThemeDemo)}
        >
          <Palette className="w-4 h-4 mr-2" />
          Theme Demo
        </Button>
      </div>

      {/* Crypto List with Filters */}
      <CryptoListWithFilters limit={50} showFavorites={true} />

      {/* Theme Demo Section - Temporarily disabled */}
      {showThemeDemo && (
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
              Theme System Showcase
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Theme demo temporarily disabled for debugging
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
