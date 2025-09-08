import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Star, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { formatPrice, formatMarketCap, formatVolume } from '../utils/formatters';

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

interface CryptoListItemProps {
  crypto: CryptoData;
  isFavorite: boolean;
  showFavorites: boolean;
  onToggleFavorite: (cryptoId: string, e: React.MouseEvent) => void;
}

export const CryptoListItem = memo<CryptoListItemProps>(({
  crypto,
  isFavorite,
  showFavorites,
  onToggleFavorite
}) => {
  const navigate = useNavigate();

  const handleCardClick = useCallback(() => {
    console.log('Card clicked for:', crypto.id);
    try {
      navigate(`/coin/${crypto.id}`);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to direct URL change
      window.location.href = `/coin/${crypto.id}`;
    }
  }, [navigate, crypto.id]);

  const handleToggleFavorite = useCallback((e: React.MouseEvent) => {
    onToggleFavorite(crypto.id, e);
  }, [onToggleFavorite, crypto.id]);

  const handleViewDetails = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    console.log('View Details clicked for:', crypto.id);
    try {
      navigate(`/coin/${crypto.id}`);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to direct URL change
      window.location.href = `/coin/${crypto.id}`;
    }
  }, [navigate, crypto.id]);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01IDEuNDEtMS40MUwxMCAxNC4xN2w3LjU5LTcuNTlMMTkgOGwtOSA5eiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4KPC9zdmc+';
  }, []);

  return (
    <Card
      className="crypto-card hover:shadow-crypto cursor-pointer transition-all duration-200 hover:scale-[1.02]"
      onClick={handleCardClick}
    >
      <CardContent className="p-4 sm:p-6">
        {/* Header with coin info and favorite button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-10 h-10 rounded-full"
              onError={handleImageError}
            />
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 text-sm sm:text-base">
                {crypto.name}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 uppercase">
                {crypto.symbol}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {showFavorites && (
              <button
                onClick={handleToggleFavorite}
                className={`p-1 rounded-full transition-colors duration-200 ${
                  isFavorite
                    ? 'text-yellow-500 hover:text-yellow-600'
                    : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
                }`}
                aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
              >
                <Star
                  className={`w-4 h-4 ${
                    isFavorite ? 'fill-current' : ''
                  }`}
                />
              </button>
            )}
            <span className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-full text-neutral-600 dark:text-neutral-400">
              #{crypto.market_cap_rank}
            </span>
          </div>
        </div>

        {/* Price and change */}
        <div className="space-y-3">
          <div>
            <p className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-50">
              {formatPrice(crypto.current_price)}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {crypto.price_change_percentage_24h >= 0 ? (
                <TrendingUp className="w-4 h-4 text-success-600 dark:text-success-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-danger-600 dark:text-danger-400" />
              )}
              <span
                className={`text-sm font-medium ${
                  crypto.price_change_percentage_24h >= 0
                    ? 'text-success-600 dark:text-success-400'
                    : 'text-danger-600 dark:text-danger-400'
                }`}
              >
                {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          </div>

          {/* Market data */}
          <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-1">Market Cap</p>
              <p className="font-medium text-neutral-900 dark:text-neutral-50">
                {formatMarketCap(crypto.market_cap)}
              </p>
            </div>
            <div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-1">Volume 24h</p>
              <p className="font-medium text-neutral-900 dark:text-neutral-50">
                {formatVolume(crypto.total_volume)}
              </p>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              onClick={handleViewDetails}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border border-neutral-300 dark:border-neutral-600 bg-transparent text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200"
            >
              View Details
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

CryptoListItem.displayName = 'CryptoListItem';
