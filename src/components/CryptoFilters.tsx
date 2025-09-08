import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  ChevronDown, 
  Star, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  BarChart3,
  Volume2,
  Type,
  RotateCcw
} from 'lucide-react';
import { Button } from './ui/Button';
import { EnhancedSearchInput } from './ui/EnhancedSearchInput';
import { useCryptoFilters, type CryptoFilters } from '../hooks/useCryptoFilters';
import { useDebounce } from '../hooks/useDebounce';

interface CryptoFiltersProps {
  onFiltersChange: (filters: CryptoFilters) => void;
  className?: string;
}

export function CryptoFilters({ onFiltersChange, className = '' }: CryptoFiltersProps) {
  const {
    filters,
    setSearchTerm,
    setSortBy,
    setSortOrder,
    setPriceRange,
    setMarketCapRange,
    setShowFavoritesOnly,
    clearAllFilters,
    hasActiveFilters,
    activeFilterCount,
  } = useCryptoFilters();

  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [showMarketCapRange, setShowMarketCapRange] = useState(false);

  // Debounce search term
  const debouncedSearchTerm = useDebounce(filters.searchTerm, 300);

  // Memoize the complete filters object to prevent unnecessary re-renders
  const completeFilters = useMemo(() => ({
    ...filters,
    searchTerm: debouncedSearchTerm
  }), [filters, debouncedSearchTerm]);

  // Notify parent component when filters change
  React.useEffect(() => {
    onFiltersChange(completeFilters);
  }, [completeFilters, onFiltersChange]);

  const sortOptions = [
    { value: 'market_cap', label: 'Market Cap', icon: BarChart3 },
    { value: 'price', label: 'Price', icon: DollarSign },
    { value: 'change', label: '24h Change', icon: TrendingUp },
    { value: 'volume', label: 'Volume', icon: Volume2 },
    { value: 'name', label: 'Name', icon: Type },
  ];

  const handlePriceRangeChange = (field: 'min' | 'max', value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    setPriceRange({
      ...filters.priceRange,
      [field]: numValue,
    });
  };

  const handleMarketCapRangeChange = (field: 'min' | 'max', value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    setMarketCapRange({
      ...filters.marketCapRange,
      [field]: numValue,
    });
  };

  const formatPriceInput = (value: number | null) => {
    return value === null ? '' : value.toString();
  };

  const formatMarketCapInput = (value: number | null) => {
    if (value === null) return '';
    if (value >= 1e12) return (value / 1e12).toFixed(2);
    if (value >= 1e9) return (value / 1e9).toFixed(2);
    if (value >= 1e6) return (value / 1e6).toFixed(2);
    return value.toString();
  };

  // const parseMarketCapInput = (value: string) => {
  //   if (value === '') return null;
  //   const num = parseFloat(value);
  //   if (value.includes('T')) return num * 1e12;
  //   if (value.includes('B')) return num * 1e9;
  //   if (value.includes('M')) return num * 1e6;
  //   return num;
  // };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Enhanced Search Bar */}
      <EnhancedSearchInput
        value={filters.searchTerm}
        onChange={setSearchTerm}
        placeholder="Search cryptocurrencies..."
        size="lg"
        showKeyboardHint={true}
        className="w-full"
      />

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Sort Dropdown */}
        <div className="relative flex-1">
          <select
            value={filters.sortBy}
            onChange={(e) => setSortBy(e.target.value as CryptoFilters['sortBy'])}
            className="appearance-none w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg px-3 py-2 pr-8 text-sm text-neutral-700 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        </div>

        {/* Sort Order Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSortOrder(filters.sortOrder === 'asc' ? 'desc' : 'asc')}
          className="flex items-center gap-2 min-w-[100px]"
        >
          {filters.sortOrder === 'asc' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {filters.sortOrder === 'asc' ? 'Asc' : 'Desc'}
        </Button>

        {/* Favorites Toggle */}
        <Button
          variant={filters.showFavoritesOnly ? "primary" : "outline"}
          size="sm"
          onClick={() => setShowFavoritesOnly(!filters.showFavoritesOnly)}
          className="flex items-center gap-2"
        >
          <Star className="w-4 h-4" />
          Favorites
        </Button>

        {/* Advanced Filters Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFiltersExpanded ? 'rotate-180' : ''}`} />
        </Button>

        {/* Clear All Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isFiltersExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 space-y-4">
          {/* Price Range Filter */}
          <div>
            <button
              onClick={() => setShowPriceRange(!showPriceRange)}
              className="flex items-center justify-between w-full text-left font-medium text-neutral-900 dark:text-neutral-50 mb-2"
            >
              <span className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Price Range
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showPriceRange ? 'rotate-180' : ''}`} />
            </button>
            
            {showPriceRange && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                    Min Price ($)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formatPriceInput(filters.priceRange.min)}
                    onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                    Max Price ($)
                  </label>
                  <input
                    type="number"
                    placeholder="∞"
                    value={formatPriceInput(filters.priceRange.max)}
                    onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Market Cap Range Filter */}
          <div>
            <button
              onClick={() => setShowMarketCapRange(!showMarketCapRange)}
              className="flex items-center justify-between w-full text-left font-medium text-neutral-900 dark:text-neutral-50 mb-2"
            >
              <span className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Market Cap Range
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMarketCapRange ? 'rotate-180' : ''}`} />
            </button>
            
            {showMarketCapRange && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                    Min Market Cap (B)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formatMarketCapInput(filters.marketCapRange.min)}
                    onChange={(e) => handleMarketCapRangeChange('min', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                    Max Market Cap (B)
                  </label>
                  <input
                    type="number"
                    placeholder="∞"
                    value={formatMarketCapInput(filters.marketCapRange.max)}
                    onChange={(e) => handleMarketCapRangeChange('max', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.searchTerm && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm">
              Search: "{filters.searchTerm}"
              <button
                onClick={() => setSearchTerm('')}
                className="ml-1 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          
          {filters.sortBy !== 'market_cap' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
              Sort: {sortOptions.find(opt => opt.value === filters.sortBy)?.label}
              <button
                onClick={() => setSortBy('market_cap')}
                className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          
          {filters.showFavoritesOnly && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm">
              Favorites Only
              <button
                onClick={() => setShowFavoritesOnly(false)}
                className="ml-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          
          {(filters.priceRange.min !== null || filters.priceRange.max !== null) && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
              Price: ${filters.priceRange.min || '0'} - ${filters.priceRange.max || '∞'}
              <button
                onClick={() => setPriceRange({ min: null, max: null })}
                className="ml-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
