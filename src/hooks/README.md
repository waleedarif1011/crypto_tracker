# Theme Context System

A comprehensive, production-ready theme management system for React applications with dark/light mode support, localStorage persistence, and system preference detection.

## 🚀 Features

- ✅ **Theme State Management** - Manages light/dark/system themes
- ✅ **LocalStorage Persistence** - Remembers user theme preferences
- ✅ **System Preference Detection** - Automatically detects OS theme
- ✅ **Document Class Updates** - Applies Tailwind dark mode classes
- ✅ **TypeScript Support** - Full type safety and IntelliSense
- ✅ **Multiple Hooks** - Granular hooks for specific use cases
- ✅ **Utility Functions** - Helper functions for theme operations
- ✅ **Error Handling** - Robust error handling for storage operations
- ✅ **Performance Optimized** - Uses useCallback for optimal re-renders

## 📦 Installation & Setup

The theme context is already set up in your application. Simply wrap your app with the `ThemeProvider`:

```tsx
import { ThemeProvider } from './hooks/useTheme';

function App() {
  return (
    <ThemeProvider>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

## 🎯 Basic Usage

### Main Hook
```tsx
import { useTheme } from './hooks/useTheme';

function MyComponent() {
  const {
    theme,           // Current theme: 'light' | 'dark' | 'system'
    isDark,          // Boolean: is dark mode active?
    setTheme,        // Function: set theme
    toggleTheme,     // Function: cycle through themes
    cycleTheme,      // Function: cycle light -> dark -> system
    resolvedTheme,   // Resolved theme: 'light' | 'dark'
    colors,          // Theme color palette
    isSystemTheme,   // Boolean: is system theme active?
    isLightTheme,    // Boolean: is light theme resolved?
    isDarkTheme,     // Boolean: is dark theme resolved?
    systemTheme,     // System theme: 'light' | 'dark'
  } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Dark mode: {isDark ? 'Yes' : 'No'}</p>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Specialized Hooks

#### Theme Values Only
```tsx
import { useThemeValue } from './hooks/useTheme';

function ThemeDisplay() {
  const { isDark, theme, resolvedTheme } = useThemeValue();

  return (
    <div>
      Theme: {theme} | Resolved: {resolvedTheme} | Dark: {isDark}
    </div>
  );
}
```

#### Theme Colors Only
```tsx
import { useThemeColors } from './hooks/useTheme';

function ColorDisplay() {
  const { colors, resolvedTheme } = useThemeColors();

  return (
    <div style={{ backgroundColor: colors.background }}>
      <p style={{ color: colors.text }}>Theme: {resolvedTheme}</p>
    </div>
  );
}
```

#### Theme Actions Only
```tsx
import { useThemeActions } from './hooks/useTheme';

function ThemeControls() {
  const { setTheme, toggleTheme, cycleTheme } = useThemeActions();

  return (
    <div>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
      <button onClick={cycleTheme}>Cycle</button>
    </div>
  );
}
```

#### Theme Information Only
```tsx
import { useThemeInfo } from './hooks/useTheme';

function ThemeInfo() {
  const { isSystemTheme, isLightTheme, isDarkTheme, systemTheme } = useThemeInfo();

  return (
    <div>
      <p>Using system theme: {isSystemTheme ? 'Yes' : 'No'}</p>
      <p>Light mode active: {isLightTheme ? 'Yes' : 'No'}</p>
      <p>Dark mode active: {isDarkTheme ? 'Yes' : 'No'}</p>
      <p>System preference: {systemTheme}</p>
    </div>
  );
}
```

## 🎨 Theme Constants & Colors

### Theme Modes
```tsx
import { THEME_MODES } from './hooks/useTheme';

console.log(THEME_MODES.LIGHT);    // 'light'
console.log(THEME_MODES.DARK);     // 'dark'
console.log(THEME_MODES.SYSTEM);   // 'system'
```

### Color Palettes
```tsx
import { THEME_COLORS } from './hooks/useTheme';

// Light theme colors
console.log(THEME_COLORS.light.background);  // '#ffffff'
console.log(THEME_COLORS.light.primary);     // '#3b82f6'

// Dark theme colors
console.log(THEME_COLORS.dark.background);  // '#0f172a'
console.log(THEME_COLORS.dark.primary);     // '#60a5fa'
```

## 🛠️ Utility Functions

### Theme Detection
```tsx
import { detectSystemTheme, isSystemDark, isSystemLight } from './hooks/useTheme';

console.log(detectSystemTheme());  // 'light' | 'dark'
console.log(isSystemDark());       // true | false
console.log(isSystemLight());      // true | false
```

### Theme Management
```tsx
import {
  getPreferredTheme,
  clearThemePreference,
  getThemeColors,
  isValidTheme,
  isValidThemeMode
} from './hooks/useTheme';

// Get stored theme preference
const savedTheme = getPreferredTheme();

// Clear stored preference
clearThemePreference();

// Get theme colors
const colors = getThemeColors('dark', true);

// Validate themes
console.log(isValidTheme('light'));      // true
console.log(isValidTheme('invalid'));    // false
console.log(isValidThemeMode('dark'));   // true
```

## 🎛️ Theme Toggle Components

### Icon Toggle
```tsx
import { ThemeToggle } from './components/ThemeToggle';

function Header() {
  return (
    <header>
      <ThemeToggle size="md" />
    </header>
  );
}
```

### Button Toggle
```tsx
import { ThemeToggleButton } from './components/ThemeToggle';

function Settings() {
  return (
    <div>
      <ThemeToggleButton />
    </div>
  );
}
```

## 🔧 Advanced Configuration

### Custom Theme Colors
You can extend the theme system with custom colors:

```tsx
import { THEME_COLORS } from './hooks/useTheme';

// Add custom colors
THEME_COLORS.light.accent = '#ff6b6b';
THEME_COLORS.dark.accent = '#ff5252';
```

### Custom Theme Modes
```tsx
// Define custom theme type
type CustomTheme = 'light' | 'dark' | 'system' | 'auto';

// Extend the context type
interface CustomThemeContextType extends Omit<ThemeContextType, 'theme'> {
  theme: CustomTheme;
}
```

## 🔍 Type Definitions

```tsx
// Main types exported
export type Theme = 'light' | 'dark' | 'system';
export type ThemeMode = 'light' | 'dark';

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
```

## 🎯 Best Practices

### 1. Use Specialized Hooks
```tsx
// ✅ Good: Use specific hooks for better performance
const { colors } = useThemeColors();
const { setTheme } = useThemeActions();

// ❌ Avoid: Use main hook when you only need specific data
const { colors, setTheme } = useTheme(); // Re-renders on all theme changes
```

### 2. Handle SSR
```tsx
// ✅ Good: Check for window object
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return <div>Loading...</div>; // or null
}
```

### 3. Theme Persistence
```tsx
// ✅ Good: Let the context handle persistence
const { setTheme } = useTheme();

// ❌ Avoid: Manual localStorage management
localStorage.setItem('theme', 'dark'); // Context handles this
```

### 4. Error Handling
```tsx
// ✅ Good: Context handles errors internally
const { setTheme } = useTheme();
setTheme('invalid'); // Won't crash, handled gracefully
```

## 🚨 Troubleshooting

### Theme Not Applying
```tsx
// Check if ThemeProvider is wrapping your app
function App() {
  return (
    <ThemeProvider>  {/* Required! */}
      <YourComponents />
    </ThemeProvider>
  );
}
```

### Console Warnings
```tsx
// localStorage errors are handled gracefully
// Check browser console for storage warnings
// These won't break the app
```

### SSR Issues
```tsx
// Use dynamic imports for SSR
const ThemeProvider = dynamic(() => import('./hooks/useTheme').then(mod => ({ default: mod.ThemeProvider })), {
  ssr: false,
  loading: () => <div>Loading...</div>
});
```

## 📊 Performance Notes

- Uses `useCallback` to prevent unnecessary re-renders
- Minimal state updates for optimal performance
- Efficient localStorage operations with error handling
- Lazy initialization for SSR compatibility

## 🧪 Testing

```tsx
import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from './hooks/useTheme';

const TestComponent = () => {
  const { theme, isDark } = useTheme();
  return <div data-testid="theme">{theme}-{isDark}</div>;
};

test('theme context works', () => {
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );

  expect(screen.getByTestId('theme')).toHaveTextContent('system-false');
});
```

## 📚 Related Documentation

- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [React Context API](https://react.dev/reference/react/useContext)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
