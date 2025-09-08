/**
 * Header Component Usage Examples
 * This file demonstrates how to use the enhanced Header component
 */

import { useState } from 'react';
import { Header } from './Header';

// Example 1: Basic Header with default props
export function BasicHeader() {
  return (
    <Header />
  );
}

// Example 2: Header with custom search functionality
export function HeaderWithSearch() {
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Simulate search results
    if (query.trim()) {
      setSearchResults([`Results for "${query}"`]);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div>
      <Header
        onSearch={handleSearch}
        searchPlaceholder="Search coins, tokens, or exchanges..."
      />

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow p-4">
            {searchResults.map((result, index) => (
              <div key={index} className="text-neutral-900 dark:text-neutral-50">
                {result}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Example 3: Header with custom menu handler
export function HeaderWithMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    console.log('Menu toggled:', !menuOpen);
  };

  return (
    <div>
      <Header
        onMenuClick={handleMenuClick}
        onSearch={(query) => console.log('Search:', query)}
      />

      {/* Custom menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="absolute top-16 left-0 right-0 bg-white dark:bg-neutral-900 p-4">
            <h3 className="text-lg font-semibold mb-4">Custom Menu</h3>
            <div className="space-y-2">
              <button
                onClick={() => setMenuOpen(false)}
                className="block w-full text-left px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
              >
                Close Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Example 4: Header integrated with Layout
export function LayoutWithHeader() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header
        onSearch={(query) => {
          setSearchQuery(query);
          console.log('Global search:', query);
        }}
        searchPlaceholder="Search anything..."
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-4">Main Content</h1>

        {searchQuery && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p className="text-blue-800 dark:text-blue-200">
              Search query: <strong>"{searchQuery}"</strong>
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Your content here */}
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Content Card</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              This is an example content card.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};
