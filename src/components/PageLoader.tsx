import React from 'react';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { BarChart3 } from 'lucide-react';

interface PageLoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function PageLoader({
  message = 'Loading cryptocurrency data...',
  size = 'lg'
}: PageLoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <div className="text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-primary-600 dark:text-primary-400 animate-pulse" />
          </div>
          <LoadingSpinner size={size} />
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 font-medium">
          {message}
        </p>
      </div>
    </div>
  );
}

// Skeleton loader for content areas
export function ContentSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="crypto-loading h-8 w-48 rounded"></div>
          <div className="crypto-loading h-4 w-32 rounded"></div>
        </div>
        <div className="crypto-loading h-10 w-24 rounded"></div>
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="crypto-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="crypto-loading w-10 h-10 rounded-full"></div>
                <div className="space-y-2">
                  <div className="crypto-loading h-4 w-20 rounded"></div>
                  <div className="crypto-loading h-3 w-12 rounded"></div>
                </div>
              </div>
              <div className="crypto-loading w-5 h-5 rounded"></div>
            </div>
            <div className="space-y-3">
              <div className="crypto-loading h-6 w-24 rounded"></div>
              <div className="flex justify-between">
                <div className="crypto-loading h-4 w-16 rounded"></div>
                <div className="crypto-loading h-4 w-12 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
