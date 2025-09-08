import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { CryptoListItem } from './CryptoListItem';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { getTopCryptosWithVanryPriority } from '../utils/coingeckoApi.js';
import { useListPerformance } from '../hooks/usePerformance';
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

interface VirtualizedCryptoListProps {
  limit?: number;
  showFavorites?: boolean;
  className?: string;
  filters?: CryptoFilters;
  itemHeight?: number;
  containerHeight?: number;
}

interface GridItemProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  data: {
    items: CryptoData[];
    columnsPerRow: number;
    favorites: string[];
    showFavorites: boolean;
    onToggleFavorite: (cryptoId: string, e: React.MouseEvent) => void;
  };
}

const GridItem = React.memo<GridItemProps>(({ columnIndex, rowIndex, style, data }) => {
  const { items, columnsPerRow, favorites, showFavorites, onToggleFavorite } = data;
  const index = rowIndex * columnsPerRow + columnIndex;
  const crypto = items[index];

  if (!crypto) {
    return <div style={style} />;
  }

  return (
    <div style={style} className="p-2">
      <CryptoListItem
        crypto={crypto}
        isFavorite={favorites.includes(crypto.id)}
        showFavorites={showFavorites}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
});

GridItem.displayName = 'GridItem';

export function VirtualizedCryptoList({
  limit = 100,
  showFavorites = true,
  className = '',
  filters,
  itemHeight = 300,
  containerHeight = 600
}: VirtualizedCryptoListProps) {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  const { startListRender, endListRender } = useListPerformance(
    'VirtualizedCryptoList',
    cryptoData.length
  );

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

  // Handle container resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoized event handlers
  const toggleFavorite = useCallback((cryptoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
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

  // Calculate grid dimensions
  const { columnsPerRow, rowCount } = useMemo(() => {
    const itemWidth = 300; // Approximate width of each crypto card
    const columnsPerRow = Math.max(1, Math.floor(containerWidth / itemWidth));
    const rowCount = Math.ceil(filteredAndSortedData.length / columnsPerRow);
    
    return { columnsPerRow, rowCount };
  }, [containerWidth, filteredAndSortedData.length]);

  // Grid data for virtualization
  const gridData = useMemo(() => ({
    items: filteredAndSortedData,
    columnsPerRow,
    favorites,
    showFavorites,
    onToggleFavorite: toggleFavorite
  }), [filteredAndSortedData, columnsPerRow, favorites, showFavorites, toggleFavorite]);

  // Performance measurement
  useEffect(() => {
    if (filteredAndSortedData.length > 0) {
      startListRender();
      const timer = setTimeout(() => {
        endListRender();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [filteredAndSortedData.length, startListRender, endListRender]);

  if (loading) {
    return (
      <div className={className}>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
            Failed to Load Data
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (filteredAndSortedData.length === 0) {
    return (
      <div className={className}>
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
            No Cryptocurrencies Found
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            No cryptocurrency data is available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className} ref={containerRef}>
      <div className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
        Showing {filteredAndSortedData.length} cryptocurrencies
      </div>
      
      <Grid
        columnCount={columnsPerRow}
        columnWidth={containerWidth / columnsPerRow}
        height={containerHeight}
        rowCount={rowCount}
        rowHeight={itemHeight}
        itemData={gridData}
        overscanRowCount={2}
        overscanColumnCount={1}
      >
        {GridItem}
      </Grid>
    </div>
  );
}
