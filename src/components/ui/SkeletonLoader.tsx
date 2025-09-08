import React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  animate?: boolean;
}

export function Skeleton({
  className,
  width = '100%',
  height = '1rem',
  rounded = 'md',
  animate = true,
}: SkeletonProps) {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <div
      className={cn(
        'bg-neutral-200 dark:bg-neutral-700',
        roundedClasses[rounded],
        animate && 'animate-pulse',
        className
      )}
      style={{ width, height }}
    />
  );
}

// Pre-built skeleton components for common use cases
export function SkeletonText({
  lines = 1,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height="0.75rem"
          width={index === lines - 1 ? '75%' : '100%'}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 space-y-4', className)}>
      <div className="flex items-center space-x-4">
        <Skeleton width={48} height={48} rounded="full" />
        <div className="space-y-2 flex-1">
          <Skeleton height="1rem" width="60%" />
          <Skeleton height="0.75rem" width="40%" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton height="0.75rem" />
        <Skeleton height="0.75rem" width="80%" />
      </div>
      <div className="flex justify-between">
        <Skeleton height="1.25rem" width="30%" />
        <Skeleton height="1.25rem" width="25%" />
      </div>
    </div>
  );
}

export function SkeletonList({
  items = 5,
  className,
}: {
  items?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4">
          <Skeleton width={40} height={40} rounded="full" />
          <div className="flex-1 space-y-2">
            <Skeleton height="1rem" width="70%" />
            <Skeleton height="0.75rem" width="50%" />
          </div>
          <div className="text-right space-y-2">
            <Skeleton height="1rem" width="60px" />
            <Skeleton height="0.75rem" width="40px" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable({
  rows = 5,
  columns = 4,
  className,
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} height="1rem" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} height="0.875rem" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonChart({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 space-y-4', className)}>
      <div className="flex justify-between items-center">
        <Skeleton height="1.5rem" width="40%" />
        <div className="flex space-x-2">
          <Skeleton height="2rem" width="60px" />
          <Skeleton height="2rem" width="60px" />
          <Skeleton height="2rem" width="60px" />
        </div>
      </div>
      <div className="h-64 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4">
        <div className="h-full flex items-end justify-between space-x-1">
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton
              key={index}
              width="100%"
              height={`${Math.random() * 80 + 20}%`}
              rounded="sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonAvatar({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  return (
    <Skeleton
      className={cn(sizeClasses[size], 'rounded-full', className)}
      width={sizeClasses[size].split(' ')[0]}
      height={sizeClasses[size].split(' ')[1]}
    />
  );
}

// Loading state wrapper
export function SkeletonWrapper({
  isLoading,
  children,
  skeleton,
  className,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  skeleton?: React.ReactNode;
  className?: string;
}) {
  if (isLoading) {
    return (
      <div className={className}>
        {skeleton || <Skeleton />}
      </div>
    );
  }

  return <>{children}</>;
}
