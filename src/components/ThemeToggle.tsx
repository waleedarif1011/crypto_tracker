import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.simple';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const { theme, isDark, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const handleThemeChange = () => {
    toggleTheme();
  };

  const getIcon = () => {
    if (isDark) {
      return <Moon size={iconSizes[size]} className="text-blue-400" />;
    } else {
      return <Sun size={iconSizes[size]} className="text-yellow-500" />;
    }
  };

  const getTooltip = () => {
    return isDark ? 'Switch to light mode' : 'Switch to dark mode';
  };

  return (
    <button
      onClick={handleThemeChange}
      className={`
        ${sizeClasses[size]}
        flex items-center justify-center
        rounded-full border border-neutral-300
        bg-white hover:bg-neutral-50
        dark:border-neutral-600 dark:bg-neutral-800 dark:hover:bg-neutral-700
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${className}
      `}
      title={getTooltip()}
      aria-label={getTooltip()}
    >
      {getIcon()}
    </button>
  );
}

// Alternative button style for inline usage
export function ThemeToggleButton({ className = '' }: { className?: string }) {
  const { theme, isDark, toggleTheme } = useTheme();

  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <button
      onClick={handleThemeChange}
      className={`
        flex items-center gap-2 px-3 py-2
        rounded-lg border border-neutral-300
        bg-white hover:bg-neutral-50
        dark:border-neutral-600 dark:bg-neutral-800 dark:hover:bg-neutral-700
        text-sm font-medium text-neutral-700
        dark:text-neutral-200
        transition-colors duration-200
        ${className}
      `}
    >
      {isDark ? (
        <Moon size={16} className="text-blue-400" />
      ) : (
        <Sun size={16} className="text-yellow-500" />
      )}
      <span className="capitalize">{theme}</span>
    </button>
  );
}
