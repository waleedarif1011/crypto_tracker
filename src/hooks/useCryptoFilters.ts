import { useState, useCallback, useMemo } from 'react';

export interface CryptoFilters {
  searchTerm: string;
  sortBy: 'market_cap' | 'price' | 'change' | 'volume' | 'name';
  sortOrder: 'asc' | 'desc';
  priceRange: {
    min: number | null;
    max: number | null;
  };
  showFavoritesOnly: boolean;
  marketCapRange: {
    min: number | null;
    max: number | null;
  };
}

export interface FilterState {
  filters: CryptoFilters;
  setSearchTerm: (term: string) => void;
  setSortBy: (sortBy: CryptoFilters['sortBy']) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setPriceRange: (range: { min: number | null; max: number | null }) => void;
  setMarketCapRange: (range: { min: number | null; max: number | null }) => void;
  setShowFavoritesOnly: (show: boolean) => void;
  clearAllFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
}

const initialFilters: CryptoFilters = {
  searchTerm: '',
  sortBy: 'market_cap',
  sortOrder: 'asc',
  priceRange: {
    min: null,
    max: null,
  },
  showFavoritesOnly: false,
  marketCapRange: {
    min: null,
    max: null,
  },
};

export function useCryptoFilters(): FilterState {
  const [filters, setFilters] = useState<CryptoFilters>(initialFilters);

  const setSearchTerm = useCallback((term: string) => {
    setFilters(prev => ({ ...prev, searchTerm: term }));
  }, []);

  const setSortBy = useCallback((sortBy: CryptoFilters['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }));
  }, []);

  const setSortOrder = useCallback((sortOrder: 'asc' | 'desc') => {
    setFilters(prev => ({ ...prev, sortOrder }));
  }, []);

  const setPriceRange = useCallback((priceRange: { min: number | null; max: number | null }) => {
    setFilters(prev => ({ ...prev, priceRange }));
  }, []);

  const setMarketCapRange = useCallback((marketCapRange: { min: number | null; max: number | null }) => {
    setFilters(prev => ({ ...prev, marketCapRange }));
  }, []);

  const setShowFavoritesOnly = useCallback((showFavoritesOnly: boolean) => {
    setFilters(prev => ({ ...prev, showFavoritesOnly }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchTerm !== '' ||
      filters.sortBy !== 'market_cap' ||
      filters.sortOrder !== 'asc' ||
      filters.priceRange.min !== null ||
      filters.priceRange.max !== null ||
      filters.showFavoritesOnly ||
      filters.marketCapRange.min !== null ||
      filters.marketCapRange.max !== null
    );
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchTerm !== '') count++;
    if (filters.sortBy !== 'market_cap') count++;
    if (filters.sortOrder !== 'asc') count++;
    if (filters.priceRange.min !== null || filters.priceRange.max !== null) count++;
    if (filters.showFavoritesOnly) count++;
    if (filters.marketCapRange.min !== null || filters.marketCapRange.max !== null) count++;
    return count;
  }, [filters]);

  return {
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
  };
}
