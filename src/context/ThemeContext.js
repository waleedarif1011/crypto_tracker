import { createContext, useContext } from 'react';

// Create the theme context
export const ThemeContext = createContext({
  theme: 'system',
  setTheme: () => {},
  isDark: false,
  toggleTheme: () => {},
});

// Hook to use the theme context
export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return context;
}

// Theme provider component (alternative to the hook-based one)
export function ThemeProvider({ children, value }) {
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Theme constants
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

export const THEME_COLORS = {
  // Light theme colors
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
  // Dark theme colors
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

// Utility functions for theme
export function getThemeColors(theme, isDark) {
  if (theme === 'system') {
    return isDark ? THEME_COLORS.dark : THEME_COLORS.light;
  }
  return THEME_COLORS[theme] || THEME_COLORS.light;
}

export function applyThemeToDocument(theme, isDark) {
  const root = document.documentElement;

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Apply theme colors as CSS custom properties
  const colors = getThemeColors(theme, isDark);
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--theme-${key}`, value);
  });
}
