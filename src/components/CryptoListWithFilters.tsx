import React, { useState, useCallback } from 'react';
import { CryptoFilters } from './CryptoFilters';
import { CryptoList } from './CryptoList';
import type { CryptoFilters as CryptoFiltersType } from '../hooks/useCryptoFilters';

interface CryptoListWithFiltersProps {
  limit?: number;
  showFavorites?: boolean;
  className?: string;
}

export function CryptoListWithFilters({ 
  limit = 50, 
  showFavorites = true, 
  className = '' 
}: CryptoListWithFiltersProps) {
  const [filters, setFilters] = useState<CryptoFiltersType | undefined>(undefined);

  const handleFiltersChange = useCallback((newFilters: CryptoFiltersType) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className={className}>
      {/* Filters Component */}
      <CryptoFilters 
        onFiltersChange={handleFiltersChange}
        className="mb-8"
      />

      {/* Crypto List Component */}
      <CryptoList 
        limit={limit}
        showFavorites={showFavorites}
        filters={filters}
      />
    </div>
  );
}
