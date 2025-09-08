// Utility function for combining class names
export function cn(...classes) {
  return classes
    .filter(Boolean)
    .filter(cls => typeof cls === 'string')
    .join(' ')
    .trim();
}

// Alternative implementation using clsx (if you prefer)
export function classNames(...classes) {
  return cn(...classes);
}
