/**
 * CryptoList Component Usage Examples
 * This file demonstrates how to use the CryptoList component with various configurations
 */

import React, { useState } from 'react';
import { CryptoList } from './CryptoList';
import { CryptoListWithSearch } from './CryptoListWithSearch';

// Example 1: Basic CryptoList (most common usage)
export function BasicCryptoListExample() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Top 50 Cryptocurrencies</h2>
      <CryptoList limit={50} showFavorites={true} />
    </div>
  );
}

// Example 2: Limited List (top 10)
export function LimitedCryptoListExample() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Top 10 Cryptocurrencies</h2>
      <CryptoList limit={10} showFavorites={false} />
    </div>
  );
}

// Example 3: CryptoList with Search and Filters
export function CryptoListWithSearchExample() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Searchable Cryptocurrency List</h2>
      <CryptoListWithSearch limit={50} showFavorites={true} />
    </div>
  );
}

// Example 4: Custom Styled CryptoList
export function CustomStyledCryptoListExample() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Custom Styled List</h2>
      <CryptoList 
        limit={20} 
        showFavorites={true}
        className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800 p-6 rounded-lg"
      />
    </div>
  );
}

// Example 5: Dashboard-style Layout
export function DashboardCryptoListExample() {
  return (
    <div className="space-y-8">
      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
            Top Gainers
          </h3>
          <CryptoList 
            limit={5} 
            showFavorites={false}
            sortBy="change"
            className="space-y-2"
          />
        </div>
        
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
            Highest Price
          </h3>
          <CryptoList 
            limit={5} 
            showFavorites={false}
            sortBy="price"
            className="space-y-2"
          />
        </div>
        
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
            Market Leaders
          </h3>
          <CryptoList 
            limit={5} 
            showFavorites={false}
            sortBy="market_cap"
            className="space-y-2"
          />
        </div>
      </div>

      {/* Full List */}
      <div>
        <h2 className="text-2xl font-bold mb-6">All Cryptocurrencies</h2>
        <CryptoListWithSearch limit={50} showFavorites={true} />
      </div>
    </div>
  );
}

// Example 6: Mobile-Optimized Layout
export function MobileOptimizedCryptoListExample() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 px-4">Cryptocurrency Tracker</h2>
      <CryptoList 
        limit={20} 
        showFavorites={true}
        className="px-4"
      />
    </div>
  );
}

// Example 7: Favorites-Only View
export function FavoritesOnlyExample() {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(true);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Favorites</h2>
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          {showFavoritesOnly ? 'Show All' : 'Show Favorites Only'}
        </button>
      </div>
      
      <CryptoList 
        limit={50} 
        showFavorites={true}
        showFavoritesOnly={showFavoritesOnly}
      />
    </div>
  );
}

// Example 8: Search with Custom Filters
export function CustomSearchExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'market_cap' | 'price' | 'change'>('market_cap');

  return (
    <div>
      <div className="mb-6 space-y-4">
        <h2 className="text-2xl font-bold">Custom Search & Sort</h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50"
          />
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'market_cap' | 'price' | 'change')}
            className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50"
          >
            <option value="market_cap">Sort by Market Cap</option>
            <option value="price">Sort by Price</option>
            <option value="change">Sort by 24h Change</option>
          </select>
        </div>
      </div>
      
      <CryptoList 
        limit={50} 
        showFavorites={true}
        searchTerm={searchTerm}
        sortBy={sortBy}
      />
    </div>
  );
}
