import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TrendingUp, TrendingDown, Search } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { CryptoListItem } from './CryptoListItem';
import { getTopCryptosWithVanryPriority } from '../utils/coingeckoApi.js';
import type { CryptoFilters } from '../hooks/useCryptoFilters';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
}

interface CryptoListProps {
  limit?: number;
  showFavorites?: boolean;
  className?: string;
  filters?: CryptoFilters;
}

export function CryptoList({ 
  limit = 50, 
  showFavorites = true, 
  className = '',
  filters
}: CryptoListProps) {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('crypto-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('crypto-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fetch crypto data
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getTopCryptosWithVanryPriority({ per_page: limit });
        setCryptoData(data);
      } catch (err) {
        console.error('Error fetching crypto data:', err);
        setError('Failed to load cryptocurrency data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, [limit]);

  // Memoized event handlers
  const toggleFavorite = useCallback((cryptoId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setFavorites(prev =>
      prev.includes(cryptoId)
        ? prev.filter(id => id !== cryptoId)
        : [...prev, cryptoId]
    );
  }, []);


  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    if (!filters) return cryptoData;
    
    let filtered = cryptoData;

    // Apply search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(crypto =>
        crypto.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Apply favorites filter
    if (filters.showFavoritesOnly) {
      filtered = filtered.filter(crypto => favorites.includes(crypto.id));
    }

    // Apply price range filter
    if (filters.priceRange.min !== null || filters.priceRange.max !== null) {
      filtered = filtered.filter(crypto => {
        const price = crypto.current_price;
        const min = filters.priceRange.min;
        const max = filters.priceRange.max;
        
        if (min !== null && price < min) return false;
        if (max !== null && price > max) return false;
        return true;
      });
    }

    // Apply market cap range filter
    if (filters.marketCapRange.min !== null || filters.marketCapRange.max !== null) {
      filtered = filtered.filter(crypto => {
        const marketCap = crypto.market_cap;
        const min = filters.marketCapRange.min;
        const max = filters.marketCapRange.max;
        
        if (min !== null && marketCap < min) return false;
        if (max !== null && marketCap > max) return false;
        return true;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'price':
          comparison = a.current_price - b.current_price;
          break;
        case 'change':
          comparison = a.price_change_percentage_24h - b.price_change_percentage_24h;
          break;
        case 'volume':
          comparison = a.total_volume - b.total_volume;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'market_cap':
        default:
          comparison = a.market_cap_rank - b.market_cap_rank;
          break;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [cryptoData, filters, favorites]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
                <div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-16 mb-2" />
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-12" />
                </div>
              </div>
              <div className="w-6 h-6 bg-neutral-200 dark:bg-neutral-700 rounded" />
            </div>
            <div className="space-y-3">
              <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-20" />
              <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-16" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-12 mb-1" />
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-16" />
                </div>
                <div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-12 mb-1" />
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-16" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-danger-100 dark:bg-danger-900 rounded-full flex items-center justify-center mx-auto mb-4">
        <TrendingDown className="w-8 h-8 text-danger-600 dark:text-danger-400" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
        Failed to Load Data
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
        {error || 'Unable to fetch cryptocurrency data. Please check your connection and try again.'}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
      >
        Try Again
      </button>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <TrendingUp className="w-8 h-8 text-neutral-400" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
        No Cryptocurrencies Found
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400">
        No cryptocurrency data is available at the moment.
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className={className}>
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <ErrorState />
      </div>
    );
  }

  if (cryptoData.length === 0) {
    return (
      <div className={className}>
        <EmptyState />
      </div>
    );
  }

  if (filteredAndSortedData.length === 0) {
    return (
      <div className={className}>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
            No Results Found
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            {filters?.searchTerm 
              ? `No cryptocurrencies match "${filters.searchTerm}"`
              : filters?.showFavoritesOnly 
                ? "You haven't added any favorites yet"
                : "No cryptocurrency data is available"
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredAndSortedData.map((crypto) => (
          <CryptoListItem
            key={crypto.id}
            crypto={crypto}
            isFavorite={favorites.includes(crypto.id)}
            showFavorites={showFavorites}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
