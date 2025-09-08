/**
 * CryptoFilters Component Usage Examples
 * This file demonstrates how to use the search and filter functionality
 */

import React, { useState } from 'react';
import { CryptoFilters } from './CryptoFilters';
import { CryptoListWithFilters } from './CryptoListWithFilters';
import { CryptoList } from './CryptoList';
import type { CryptoFilters as CryptoFiltersType } from '../hooks/useCryptoFilters';

// Example 1: Basic CryptoFilters with callback
export function BasicCryptoFiltersExample() {
  const [filters, setFilters] = useState<CryptoFiltersType | undefined>(undefined);

  const handleFiltersChange = (newFilters: CryptoFiltersType) => {
    setFilters(newFilters);
    console.log('Filters changed:', newFilters);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Basic Filters Example</h2>
      <CryptoFilters onFiltersChange={handleFiltersChange} />
      
      {/* Display current filters */}
      {filters && (
        <div className="mt-6 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <h3 className="font-semibold mb-2">Current Filters:</h3>
          <pre className="text-sm text-neutral-600 dark:text-neutral-400">
            {JSON.stringify(filters, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

// Example 2: Complete CryptoListWithFilters
export function CompleteCryptoListWithFiltersExample() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Complete Filtered List</h2>
      <CryptoListWithFilters limit={50} showFavorites={true} />
    </div>
  );
}

// Example 3: Custom Filter Configuration
export function CustomFilterConfigurationExample() {
  const [filters, setFilters] = useState<CryptoFiltersType | undefined>(undefined);

  const handleFiltersChange = (newFilters: CryptoFiltersType) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Custom Filter Configuration</h2>
      
      {/* Custom styled filters */}
      <div className="mb-8">
        <CryptoFilters 
          onFiltersChange={handleFiltersChange}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-neutral-800 dark:to-neutral-700 p-6 rounded-lg"
        />
      </div>

      {/* Crypto list with custom styling */}
      <CryptoList 
        limit={30}
        showFavorites={true}
        filters={filters}
        className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-6"
      />
    </div>
  );
}

// Example 4: Mobile-Optimized Filters
export function MobileOptimizedFiltersExample() {
  return (
    <div className="px-4">
      <h2 className="text-xl font-bold mb-4">Mobile-Optimized Filters</h2>
      <CryptoListWithFilters 
        limit={20} 
        showFavorites={true}
        className="space-y-4"
      />
    </div>
  );
}

// Example 5: Filter State Management
export function FilterStateManagementExample() {
  const [filters, setFilters] = useState<CryptoFiltersType | undefined>(undefined);
  const [filterHistory, setFilterHistory] = useState<CryptoFiltersType[]>([]);

  const handleFiltersChange = (newFilters: CryptoFiltersType) => {
    setFilters(newFilters);
    
    // Save to history (keep last 5)
    setFilterHistory(prev => {
      const newHistory = [newFilters, ...prev.slice(0, 4)];
      return newHistory;
    });
  };

  const restoreFilter = (filterToRestore: CryptoFiltersType) => {
    setFilters(filterToRestore);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Filter State Management</h2>
      
      <CryptoFilters onFiltersChange={handleFiltersChange} />
      
      {/* Filter History */}
      {filterHistory.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Recent Filters:</h3>
          <div className="space-y-2">
            {filterHistory.map((filter, index) => (
              <button
                key={index}
                onClick={() => restoreFilter(filter)}
                className="block w-full text-left p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                <div className="text-sm">
                  {filter.searchTerm && <span>Search: "{filter.searchTerm}"</span>}
                  {filter.sortBy !== 'market_cap' && <span>Sort: {filter.sortBy}</span>}
                  {filter.showFavoritesOnly && <span>Favorites Only</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <CryptoList limit={25} showFavorites={true} filters={filters} />
      </div>
    </div>
  );
}

// Example 6: Advanced Filter Combinations
export function AdvancedFilterCombinationsExample() {
  const [filters, setFilters] = useState<CryptoFiltersType | undefined>(undefined);

  const handleFiltersChange = (newFilters: CryptoFiltersType) => {
    setFilters(newFilters);
  };

  // Predefined filter sets
  const predefinedFilters = {
    topGainers: {
      searchTerm: '',
      sortBy: 'change' as const,
      sortOrder: 'desc' as const,
      priceRange: { min: null, max: null },
      showFavoritesOnly: false,
      marketCapRange: { min: null, max: null },
    },
    highVolume: {
      searchTerm: '',
      sortBy: 'volume' as const,
      sortOrder: 'desc' as const,
      priceRange: { min: null, max: null },
      showFavoritesOnly: false,
      marketCapRange: { min: null, max: null },
    },
    lowPrice: {
      searchTerm: '',
      sortBy: 'price' as const,
      sortOrder: 'asc' as const,
      priceRange: { min: null, max: 1 },
      showFavoritesOnly: false,
      marketCapRange: { min: null, max: null },
    },
  };

  const applyPredefinedFilter = (filterSet: CryptoFiltersType) => {
    setFilters(filterSet);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Advanced Filter Combinations</h2>
      
      {/* Predefined Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => applyPredefinedFilter(predefinedFilters.topGainers)}
          className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
        >
          Top Gainers
        </button>
        <button
          onClick={() => applyPredefinedFilter(predefinedFilters.highVolume)}
          className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          High Volume
        </button>
        <button
          onClick={() => applyPredefinedFilter(predefinedFilters.lowPrice)}
          className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
        >
          Low Price Coins
        </button>
      </div>

      <CryptoFilters onFiltersChange={handleFiltersChange} />
      
      <div className="mt-6">
        <CryptoList limit={30} showFavorites={true} filters={filters} />
      </div>
    </div>
  );
}
