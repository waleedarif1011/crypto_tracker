# Search and Filter Functionality

This document describes the comprehensive search and filter functionality implemented for the cryptocurrency tracker application.

## Overview

The search and filter system provides users with powerful tools to find and organize cryptocurrency data. It includes:

- **Debounced Search** (300ms delay) for smooth performance
- **Multiple Filter Options** including sort, price range, and market cap filters
- **Real-time Filtering** with instant results
- **Mobile-responsive Design** that works on all devices
- **Smooth Animations** for better user experience
- **React Hooks** for efficient state management

## Components

### 1. `CryptoFilters`

The main filter component that provides all filtering controls.

**Props:**
```typescript
interface CryptoFiltersProps {
  onFiltersChange: (filters: CryptoFilters) => void;
  className?: string;
}
```

**Features:**
- Search input with debounced filtering
- Sort dropdown (Market Cap, Price, 24h Change, Volume, Name)
- Sort order toggle (Ascending/Descending)
- Favorites filter toggle
- Advanced filters panel (Price Range, Market Cap Range)
- Clear all filters button
- Active filter indicators
- Mobile-responsive layout

### 2. `CryptoListWithFilters`

A combined component that includes both filters and the crypto list.

**Props:**
```typescript
interface CryptoListWithFiltersProps {
  limit?: number;
  showFavorites?: boolean;
  className?: string;
}
```

### 3. `CryptoList`

The core list component that displays filtered cryptocurrency data.

**Props:**
```typescript
interface CryptoListProps {
  limit?: number;
  showFavorites?: boolean;
  className?: string;
  filters?: CryptoFilters;
}
```

## Hooks

### 1. `useDebounce`

Custom hook for debouncing values to improve performance.

```typescript
function useDebounce<T>(value: T, delay: number): T
```

**Usage:**
```typescript
const debouncedSearchTerm = useDebounce(searchTerm, 300);
```

### 2. `useCryptoFilters`

Custom hook for managing filter state and actions.

```typescript
interface FilterState {
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
```

## Filter Types

### CryptoFilters Interface

```typescript
interface CryptoFilters {
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
```

## Usage Examples

### Basic Usage

```typescript
import { CryptoListWithFilters } from './components/CryptoListWithFilters';

function MyComponent() {
  return (
    <CryptoListWithFilters 
      limit={50} 
      showFavorites={true} 
    />
  );
}
```

### Advanced Usage with Custom Filters

```typescript
import { CryptoFilters, CryptoList } from './components';
import { useCryptoFilters } from './hooks/useCryptoFilters';

function MyComponent() {
  const {
    filters,
    setSearchTerm,
    setSortBy,
    clearAllFilters,
    hasActiveFilters
  } = useCryptoFilters();

  const handleFiltersChange = (newFilters) => {
    // Custom logic here
    console.log('Filters changed:', newFilters);
  };

  return (
    <div>
      <CryptoFilters onFiltersChange={handleFiltersChange} />
      <CryptoList filters={filters} />
    </div>
  );
}
```

### Custom Filter Configuration

```typescript
import { CryptoFilters } from './components/CryptoFilters';

function CustomFilters() {
  const [filters, setFilters] = useState();

  return (
    <CryptoFilters 
      onFiltersChange={setFilters}
      className="custom-filter-styling"
    />
  );
}
```

## Features

### Search Functionality

- **Debounced Input**: 300ms delay to prevent excessive API calls
- **Real-time Results**: Instant filtering as you type
- **Case-insensitive**: Searches both name and symbol
- **Clear Button**: Easy way to clear search

### Sort Options

- **Market Cap**: Default sorting by market cap rank
- **Price**: Sort by current price
- **24h Change**: Sort by percentage change
- **Volume**: Sort by 24h trading volume
- **Name**: Alphabetical sorting

### Filter Options

- **Price Range**: Min/max price filters
- **Market Cap Range**: Min/max market cap filters
- **Favorites Only**: Show only favorited cryptocurrencies
- **Sort Order**: Ascending or descending

### User Experience

- **Smooth Animations**: CSS transitions for all interactions
- **Mobile Responsive**: Optimized for all screen sizes
- **Active Filter Indicators**: Visual feedback for applied filters
- **Clear All Filters**: One-click reset functionality
- **Filter Count Badge**: Shows number of active filters

## Performance Optimizations

1. **Debounced Search**: Prevents excessive filtering operations
2. **useMemo**: Optimized filtering and sorting calculations
3. **Efficient State Management**: Minimal re-renders
4. **Lazy Loading**: Components load only when needed

## Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels
- **Focus Management**: Clear focus indicators
- **Color Contrast**: Meets WCAG guidelines

## Mobile Responsiveness

- **Responsive Grid**: Adapts to screen size
- **Touch-friendly**: Large touch targets
- **Collapsible Filters**: Space-efficient on mobile
- **Optimized Layout**: Stacked layout on small screens

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **ES6+ Features**: Uses modern JavaScript features
- **CSS Grid**: Modern layout system
- **CSS Custom Properties**: Dynamic theming support

## Future Enhancements

- **Saved Filter Sets**: Save and restore filter combinations
- **Filter Presets**: Quick access to common filter combinations
- **Advanced Search**: Regex support, multiple search terms
- **Filter History**: Track and restore previous filter states
- **Export Filters**: Share filter configurations
