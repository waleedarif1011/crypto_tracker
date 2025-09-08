import React from 'react';
import { Search, X } from 'lucide-react';

interface EnhancedSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showKeyboardHint?: boolean;
  onClear?: () => void;
  autoFocus?: boolean;
  disabled?: boolean;
}

export function EnhancedSearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  size = "md",
  showKeyboardHint = false,
  onClear,
  autoFocus = false,
  disabled = false,
}: EnhancedSearchInputProps) {
  const sizeClasses = {
    sm: "py-2 px-3 text-sm",
    md: "py-3 px-4 text-base",
    lg: "py-4 px-5 text-lg",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <Search className={`${iconSizes[size]} text-neutral-400 group-focus-within:text-primary-500 transition-colors duration-200`} />
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={disabled}
        className={`
          w-full pl-12 pr-12 bg-white dark:bg-neutral-800 
          border-2 border-neutral-200 dark:border-neutral-700 
          rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 
          focus:outline-none transition-all duration-200 
          placeholder:text-neutral-500 dark:placeholder:text-neutral-400 
          text-neutral-900 dark:text-neutral-50 
          shadow-sm hover:shadow-md focus:shadow-lg
          disabled:opacity-50 disabled:cursor-not-allowed
          ${sizeClasses[size]}
        `}
      />

      {/* Clear Button */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          disabled={disabled}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all duration-200 disabled:opacity-50"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Keyboard Hint */}
      {showKeyboardHint && !value && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-neutral-400 dark:text-neutral-500 pointer-events-none">
          <kbd className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded text-xs font-mono border border-neutral-200 dark:border-neutral-600">
            ⌘K
          </kbd>
        </div>
      )}

      {/* Search Suggestions Overlay (for future enhancement) */}
      {value && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg z-20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="p-4 text-sm text-neutral-500 dark:text-neutral-400">
            Search suggestions coming soon...
          </div>
        </div>
      )}
    </div>
  );
}
