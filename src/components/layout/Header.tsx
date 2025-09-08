import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ThemeToggle, ThemeToggleButton } from '../ThemeToggle';
import { EnhancedSearchInput } from '../ui/EnhancedSearchInput';
import { BarChart3, Menu, Home, TrendingUp } from 'lucide-react';
import { useCoin } from '../../context/CoinContext';
import { getDisplayName } from '../../utils/coinNameFormatter';

/**
 * Props for the Header component
 * @interface HeaderProps
 */
interface HeaderProps {
  /** Optional callback function triggered when mobile menu is clicked */
  onMenuClick?: () => void;
  /** Optional callback function triggered when search is submitted */
  onSearch?: (query: string) => void;
  /** Custom placeholder text for the search input */
  searchPlaceholder?: string;
}

/**
 * Main header component for the crypto tracker application
 * 
 * Features:
 * - Responsive navigation with mobile menu
 * - Dynamic coin name display based on current route
 * - Integrated search functionality
 * - Theme toggle controls
 * - Breadcrumb navigation for coin detail pages
 * 
 * @component
 * @param {HeaderProps} props - Component props
 * @returns {JSX.Element} The rendered header component
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Header />
 * 
 * // With custom search handler
 * <Header 
 *   onSearch={(query) => console.log('Search:', query)}
 *   searchPlaceholder="Find your favorite crypto..."
 * />
 * 
 * // With mobile menu handler
 * <Header onMenuClick={() => setSidebarOpen(true)} />
 * ```
 * 
 * @since 1.0.0
 * @author AI Assistant (Claude Sonnet 4) - Comprehensive documentation and component optimization
 */
export function Header({
  onMenuClick,
  onSearch,
  searchPlaceholder = "Search cryptocurrencies..."
}: HeaderProps) {
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const { currentCoin } = useCoin();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Gets the current coin name from context or fallback to formatted ID
   * 
   * @function getCurrentCoinName
   * @returns {string} The display name of the current coin
   * 
   * @description
   * This function determines the appropriate coin name to display in the navigation:
   * 1. If coin data is available from context, use the official name
   * 2. If on a coin detail page, format the coin ID for display
   * 3. Default to 'Bitcoin' for home page or fallback
   * 
   * @example
   * ```typescript
   * // When on /coin/ethereum
   * getCurrentCoinName() // Returns "Ethereum"
   * 
   * // When on /coin/bitcoin-cash
   * getCurrentCoinName() // Returns "Bitcoin Cash"
   * 
   * // When on home page
   * getCurrentCoinName() // Returns "Bitcoin"
   * ```
   */
  const getCurrentCoinName = () => {
    if (currentCoin) {
      return currentCoin.name;
    }
    if (params.id && location.pathname.startsWith('/coin/')) {
      return getDisplayName(params.id);
    }
    return 'Bitcoin';
  };

  const currentCoinName = getCurrentCoinName();

  /**
   * Determines if a navigation path is currently active
   * 
   * @function isActive
   * @param {string} path - The path to check against current location
   * @returns {boolean} True if the path is active, false otherwise
   * 
   * @description
   * Checks if the given path matches the current route:
   * - Exact match for home route ('/')
   * - Prefix match for other routes (e.g., '/coin' matches '/coin/ethereum')
   * 
   * @example
   * ```typescript
   * // When on home page
   * isActive('/') // Returns true
   * isActive('/coin') // Returns false
   * 
   * // When on /coin/ethereum
   * isActive('/') // Returns false
   * isActive('/coin') // Returns true
   * ```
   */
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  /**
   * Handles mobile menu toggle functionality
   * 
   * @function handleMenuToggle
   * @description
   * Toggles the mobile menu state and calls the optional onMenuClick callback
   * Used for responsive navigation on mobile devices
   * 
   * @example
   * ```typescript
   * // Called when mobile menu button is clicked
   * handleMenuToggle() // Toggles menu and calls onMenuClick if provided
   * ```
   */
  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (onMenuClick) onMenuClick();
  };

  /**
   * Handles search form submission
   * 
   * @function handleSearchSubmit
   * @param {React.FormEvent} e - The form submission event
   * @description
   * Prevents default form submission and either calls the onSearch callback
   * or logs the search query to console as fallback
   * 
   * @example
   * ```typescript
   * // When search form is submitted
   * handleSearchSubmit(event) // Calls onSearch with current query
   * ```
   */
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      // TODO: Implement default search functionality
      console.log('Search query:', searchQuery);
    }
  };

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex justify-between items-center h-16">
          {/* Left Section: Logo and Desktop Navigation */}
          <div className="flex items-center gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={handleMenuToggle}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 md:hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg p-1"
              aria-label="Go to home page"
            >
              <div className="w-8 h-8 bg-primary-600 dark:bg-primary-400 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 hidden sm:block">
                Crypto Tracker
              </h1>
              <h1 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 sm:hidden">
                Crypto
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <Link
                to="/"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/')
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>

              <Link
                to={params.id ? `/coin/${params.id}` : "/coin/bitcoin"}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/coin')
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                {currentCoinName}
              </Link>
            </nav>
          </div>

          {/* Right Section: Search and Theme Controls */}
          <div className="flex items-center gap-4">
            {/* Enhanced Search Bar - Hidden on mobile, visible on tablet+ */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:block">
              <EnhancedSearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={searchPlaceholder}
                size="sm"
                className="w-64 lg:w-80"
              />
            </form>

            {/* Theme Controls */}
            <div className="flex items-center gap-2">
              <ThemeToggleButton />
              <div className="hidden sm:block">
                <ThemeToggle size="md" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Search Bar */}
        <div className="sm:hidden pb-4">
          <form onSubmit={handleSearchSubmit}>
            <EnhancedSearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={searchPlaceholder}
              size="md"
              className="w-full"
            />
          </form>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden border-t border-neutral-200 dark:border-neutral-800 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-32 opacity-100 py-3'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <nav className="flex justify-around">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                isActive('/')
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Home className="w-5 h-5" />
              Home
            </Link>

            <Link
              to={params.id ? `/coin/${params.id}` : "/coin/bitcoin"}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                isActive('/coin')
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              {currentCoinName}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
