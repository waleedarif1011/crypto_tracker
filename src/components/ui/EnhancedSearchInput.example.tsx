/**
 * EnhancedSearchInput Component Usage Examples
 * This file demonstrates the improved search UI with better visual design
 */

import React, { useState } from 'react';
import { EnhancedSearchInput } from './EnhancedSearchInput';

// Example 1: Basic Enhanced Search Input
export function BasicEnhancedSearchExample() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        Enhanced Search Input Examples
      </h2>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Basic Search</h3>
        <EnhancedSearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search cryptocurrencies..."
        />
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Current search: "{searchTerm}"
        </p>
      </div>
    </div>
  );
}

// Example 2: Different Sizes
export function SearchSizesExample() {
  const [smallSearch, setSmallSearch] = useState('');
  const [mediumSearch, setMediumSearch] = useState('');
  const [largeSearch, setLargeSearch] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        Search Input Sizes
      </h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Small Size</h3>
          <EnhancedSearchInput
            value={smallSearch}
            onChange={setSmallSearch}
            placeholder="Small search input..."
            size="sm"
            className="max-w-xs"
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Medium Size (Default)</h3>
          <EnhancedSearchInput
            value={mediumSearch}
            onChange={setMediumSearch}
            placeholder="Medium search input..."
            size="md"
            className="max-w-md"
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Large Size</h3>
          <EnhancedSearchInput
            value={largeSearch}
            onChange={setLargeSearch}
            placeholder="Large search input..."
            size="lg"
            className="max-w-lg"
          />
        </div>
      </div>
    </div>
  );
}

// Example 3: With Keyboard Hint
export function SearchWithKeyboardHintExample() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        Search with Keyboard Hint
      </h2>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Search with ⌘K Hint</h3>
        <EnhancedSearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search with keyboard shortcut hint..."
          showKeyboardHint={true}
          size="lg"
        />
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Shows ⌘K hint when empty, disappears when typing
        </p>
      </div>
    </div>
  );
}

// Example 4: Disabled State
export function DisabledSearchExample() {
  const [searchTerm, setSearchTerm] = useState('Bitcoin');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        Disabled Search Input
      </h2>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Disabled Search</h3>
        <EnhancedSearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="This search is disabled..."
          disabled={true}
          size="md"
        />
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Disabled state with reduced opacity and no interactions
        </p>
      </div>
    </div>
  );
}

// Example 5: Auto Focus
export function AutoFocusSearchExample() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        Auto Focus Search
      </h2>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Auto Focused Search</h3>
        <EnhancedSearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="This search auto-focuses..."
          autoFocus={true}
          size="md"
        />
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Automatically focuses when component mounts
        </p>
      </div>
    </div>
  );
}

// Example 6: Custom Styling
export function CustomStyledSearchExample() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        Custom Styled Search
      </h2>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Custom Background</h3>
        <EnhancedSearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Custom styled search..."
          size="lg"
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700 focus:border-blue-500 focus:ring-blue-500/20"
        />
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Custom gradient background and blue accent colors
        </p>
      </div>
    </div>
  );
}

// Example 7: Search with Clear Callback
export function SearchWithClearCallbackExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clearCount, setClearCount] = useState(0);

  const handleClear = () => {
    setClearCount(prev => prev + 1);
    console.log('Search cleared!');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        Search with Clear Callback
      </h2>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Search with Clear Event</h3>
        <EnhancedSearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Type something and clear it..."
          onClear={handleClear}
          size="md"
        />
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Clear count: {clearCount} | Current search: "{searchTerm}"
        </p>
      </div>
    </div>
  );
}

// Example 8: Responsive Search Layout
export function ResponsiveSearchExample() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        Responsive Search Layout
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Mobile Layout</h3>
          <EnhancedSearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Mobile optimized search..."
            size="md"
            className="w-full"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Desktop Layout</h3>
          <EnhancedSearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Desktop optimized search..."
            size="sm"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
}
