import React from 'react';
import { cn } from '../../utils/cn';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  children: React.ReactNode;
}

export function Badge({
  variant = 'default',
  size = 'md',
  showIcon = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors duration-200';

  const variantClasses = {
    default: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    neutral: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// Specialized badge for percentage changes
interface PercentageBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  value: number;
  showSign?: boolean;
  precision?: number;
  prefix?: string;
  suffix?: string;
}

export function PercentageBadge({
  value,
  showSign = true,
  precision = 2,
  prefix = '',
  suffix = '%',
  showIcon = true,
  size = 'sm',
  className,
  ...props
}: PercentageBadgeProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isZero = value === 0;

  const getVariant = () => {
    if (isPositive) return 'success';
    if (isNegative) return 'danger';
    return 'neutral';
  };

  const getIcon = () => {
    if (isPositive) return <TrendingUp className="w-3 h-3" />;
    if (isNegative) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const formatValue = () => {
    const sign = showSign && isPositive ? '+' : '';
    return `${sign}${value.toFixed(precision)}`;
  };

  return (
    <Badge
      variant={getVariant()}
      size={size}
      showIcon={showIcon}
      className={cn('gap-1', className)}
      {...props}
    >
      {showIcon && getIcon()}
      <span>{prefix}{formatValue()}{suffix}</span>
    </Badge>
  );
}

// Price change badge with currency formatting
interface PriceChangeBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  value: number;
  currency?: string;
  showSign?: boolean;
  precision?: number;
}

export function PriceChangeBadge({
  value,
  currency = 'USD',
  showSign = true,
  precision = 2,
  showIcon = true,
  size = 'sm',
  className,
  ...props
}: PriceChangeBadgeProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;

  const getVariant = () => {
    if (isPositive) return 'success';
    if (isNegative) return 'danger';
    return 'neutral';
  };

  const getIcon = () => {
    if (isPositive) return <TrendingUp className="w-3 h-3" />;
    if (isNegative) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const formatValue = () => {
    const sign = showSign && isPositive ? '+' : '';
    const formattedValue = Math.abs(value).toFixed(precision);
    return `${sign}$${formattedValue}`;
  };

  return (
    <Badge
      variant={getVariant()}
      size={size}
      showIcon={showIcon}
      className={cn('gap-1', className)}
      {...props}
    >
      {showIcon && getIcon()}
      <span>{formatValue()}</span>
    </Badge>
  );
}

// Status badge for different states
interface StatusBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'failed' | 'warning';
}

export function StatusBadge({
  status,
  size = 'sm',
  className,
  ...props
}: StatusBadgeProps) {
  const statusConfig = {
    active: { variant: 'success' as const, text: 'Active' },
    inactive: { variant: 'neutral' as const, text: 'Inactive' },
    pending: { variant: 'warning' as const, text: 'Pending' },
    completed: { variant: 'success' as const, text: 'Completed' },
    failed: { variant: 'danger' as const, text: 'Failed' },
    warning: { variant: 'warning' as const, text: 'Warning' },
  };

  const config = statusConfig[status];

  return (
    <Badge
      variant={config.variant}
      size={size}
      className={className}
      {...props}
    >
      {config.text}
    </Badge>
  );
}

// Market cap rank badge
interface RankBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  rank: number;
  maxRank?: number;
}

export function RankBadge({
  rank,
  maxRank = 100,
  size = 'sm',
  className,
  ...props
}: RankBadgeProps) {
  const getVariant = () => {
    if (rank <= 10) return 'success';
    if (rank <= 50) return 'info';
    if (rank <= 100) return 'warning';
    return 'neutral';
  };

  return (
    <Badge
      variant={getVariant()}
      size={size}
      className={cn('gap-1', className)}
      {...props}
    >
      <span>#{rank}</span>
    </Badge>
  );
}
