import React, { useState, useMemo } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { Button } from './ui/Button';
import { CryptoList } from './CryptoList';

interface CryptoListWithSearchProps {
  limit?: number;
  showFavorites?: boolean;
  className?: string;
}

export function CryptoListWithSearch({ 
  limit = 50, 
  showFavorites = true, 
  className = '' 
}: CryptoListWithSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'market_cap' | 'price' | 'change'>('market_cap');

  // Get favorites from localStorage
  const favorites = useMemo(() => {
    const saved = localStorage.getItem('crypto-favorites');
    return saved ? JSON.parse(saved) : [];
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const toggleFavoritesFilter = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  return (
    <div className={className}>
      {/* Search and Filter Controls */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cryptocurrencies..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="crypto-input w-full pl-10 pr-4 py-3"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <Button
              variant={showFavoritesOnly ? "primary" : "outline"}
              size="sm"
              onClick={toggleFavoritesFilter}
              disabled={favorites.length === 0}
            >
              <Star className="w-4 h-4 mr-2" />
              Favorites ({favorites.length})
            </Button>
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'market_cap' | 'price' | 'change')}
                className="appearance-none bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg px-3 py-2 pr-8 text-sm text-neutral-700 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="market_cap">Market Cap</option>
                <option value="price">Price</option>
                <option value="change">24h Change</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || showFavoritesOnly) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                Search: "{searchTerm}"
                <button
                  onClick={clearSearch}
                  className="ml-1 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                >
                  ×
                </button>
              </span>
            )}
            {showFavoritesOnly && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm">
                Favorites Only
                <button
                  onClick={toggleFavoritesFilter}
                  className="ml-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Crypto List */}
      <CryptoList 
        limit={limit} 
        showFavorites={showFavorites}
        searchTerm={searchTerm}
        showFavoritesOnly={showFavoritesOnly}
        sortBy={sortBy}
      />
    </div>
  );
}
