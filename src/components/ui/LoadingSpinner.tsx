import React from 'react';
import { cn } from '../../utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'neutral' | 'white';
  className?: string;
}

export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  className
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'text-primary-600 dark:text-primary-400',
    neutral: 'text-neutral-600 dark:text-neutral-400',
    white: 'text-white',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <svg
        className={cn(
          'animate-spin',
          sizeClasses[size],
          colorClasses[color]
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        style={{
          animation: 'spin 1s linear infinite',
        }}
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="60 20"
        />
        <circle
          className="opacity-80"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="15 65"
          strokeDashoffset="15"
        />
      </svg>
    </div>
  );
}

// Alternative spinner styles
export function PulseLoader({ className }: { className?: string }) {
  return (
    <div className={cn('flex space-x-1', className)}>
      <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse" />
      <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse animation-delay-75" />
      <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse animation-delay-150" />
    </div>
  );
}

export function SkeletonLoader({
  className,
  width = '100%',
  height = '1rem'
}: {
  className?: string;
  width?: string;
  height?: string;
}) {
  return (
    <div
      className={cn(
        'crypto-loading bg-neutral-200 dark:bg-neutral-700 rounded',
        className
      )}
      style={{ width, height }}
    />
  );
}

// Loading overlay for full sections
export function LoadingOverlay({
  isLoading,
  children,
  spinnerSize = 'lg'
}: {
  isLoading: boolean;
  children: React.ReactNode;
  spinnerSize?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white dark:bg-neutral-900 bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
          <LoadingSpinner size={spinnerSize} />
        </div>
      )}
    </div>
  );
}
