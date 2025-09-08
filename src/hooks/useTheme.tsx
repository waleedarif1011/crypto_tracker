import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Theme types
export type Theme = 'light' | 'dark' | 'system';
export type ThemeMode = 'light' | 'dark';

// Theme context interface
export interface ThemeContextType {
  // Current theme state
  theme: Theme;
  isDark: boolean;
  systemTheme: ThemeMode;

  // Theme actions
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  cycleTheme: () => void;

  // Theme utilities
  resolvedTheme: ThemeMode;
  colors: ThemeColors;
  applyTheme: (theme: Theme) => void;

  // Theme information
  isSystemTheme: boolean;
  isLightTheme: boolean;
  isDarkTheme: boolean;
}

// Theme colors interface
export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
}

// Theme constants
export const THEME_MODES = {
  LIGHT: 'light' as const,
  DARK: 'dark' as const,
  SYSTEM: 'system' as const,
} as const;

export const THEME_COLORS: Record<ThemeMode, ThemeColors> = {
  light: {
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    primary: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
  },
  dark: {
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#334155',
    primary: '#60a5fa',
    success: '#34d399',
    warning: '#fbbf24',
    danger: '#f87171',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme storage key
const THEME_STORAGE_KEY = 'crypto-theme';

// Utility functions
const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && Object.values(THEME_MODES).includes(stored as Theme)) {
      return stored as Theme;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }

  return 'system';
};

const setStoredTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error);
  }
};

const getSystemTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyThemeToDocument = (isDark: boolean): void => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  // Apply/remove dark class for Tailwind
  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Update meta theme-color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isDark ? '#1f2937' : '#ffffff');
  }

  // Update theme-color meta tag
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', isDark ? '#1f2937' : '#ffffff');
  }

  // Apply CSS custom properties for dynamic theming
  const colors = THEME_COLORS[isDark ? 'dark' : 'light'];
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--theme-${key}`, value);
  });
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Theme state
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);
  const [systemTheme, setSystemTheme] = useState<ThemeMode>(getSystemTheme);

  // Computed values
  const resolvedTheme: ThemeMode = theme === 'system' ? systemTheme : theme;
  const isDark = resolvedTheme === 'dark';
  const colors = THEME_COLORS[resolvedTheme];

  // Computed booleans
  const isSystemTheme = theme === 'system';
  const isLightTheme = resolvedTheme === 'light';
  const isDarkTheme = resolvedTheme === 'dark';

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    applyThemeToDocument(isDark);
  }, [isDark]);

  // Theme action functions
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    setStoredTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  }, [theme, setTheme]);

  const cycleTheme = useCallback(() => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }, [theme, setTheme]);

  const applyTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, [setTheme]);

  // Context value
  const value: ThemeContextType = {
    // State
    theme,
    isDark,
    systemTheme,

    // Actions
    setTheme,
    toggleTheme,
    cycleTheme,

    // Utilities
    resolvedTheme,
    colors,
    applyTheme,

    // Information
    isSystemTheme,
    isLightTheme,
    isDarkTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Hook for getting basic theme values
export function useThemeValue() {
  const { isDark, theme, resolvedTheme } = useTheme();
  return { isDark, theme, resolvedTheme };
}

// Hook for theme colors
export function useThemeColors() {
  const { colors, resolvedTheme } = useTheme();
  return { colors, resolvedTheme };
}

// Hook for theme actions only
export function useThemeActions() {
  const { setTheme, toggleTheme, cycleTheme, applyTheme } = useTheme();
  return { setTheme, toggleTheme, cycleTheme, applyTheme };
}

// Hook for theme information
export function useThemeInfo() {
  const { isSystemTheme, isLightTheme, isDarkTheme, systemTheme } = useTheme();
  return { isSystemTheme, isLightTheme, isDarkTheme, systemTheme };
}

// Utility functions for external use
export const getThemeColors = (theme: Theme, isDark: boolean): ThemeColors => {
  if (theme === 'system') {
    return isDark ? THEME_COLORS.dark : THEME_COLORS.light;
  }
  return THEME_COLORS[theme] || THEME_COLORS.light;
};

export const applyThemeToDocumentUtil = (theme: Theme, isDark: boolean): void => {
  applyThemeToDocument(isDark);
};

// Type guards
export const isValidTheme = (theme: string): theme is Theme => {
  return Object.values(THEME_MODES).includes(theme as Theme);
};

export const isValidThemeMode = (mode: string): mode is ThemeMode => {
  return mode === 'light' || mode === 'dark';
};

// Theme preference utilities
export const getPreferredTheme = (): Theme => {
  return getStoredTheme();
};

export const clearThemePreference = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(THEME_STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear theme preference:', error);
  }
};

// Theme detection utilities
export const detectSystemTheme = (): ThemeMode => {
  return getSystemTheme();
};

export const isSystemDark = (): boolean => {
  return getSystemTheme() === 'dark';
};

export const isSystemLight = (): boolean => {
  return getSystemTheme() === 'light';
};
