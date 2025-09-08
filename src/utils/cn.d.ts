/**
 * Utility function for combining class names
 * Filters out falsy values and joins valid class names
 */
export function cn(...classes: (string | undefined | null | false)[]): string;

/**
 * Alternative implementation using clsx (if you prefer)
 */
export function classNames(...classes: (string | undefined | null | false)[]): string;
