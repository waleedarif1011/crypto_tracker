import React from 'react';
import { useTheme, useThemeValue, useThemeColors, useThemeActions, useThemeInfo } from '../hooks/useTheme';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { ThemeToggle, ThemeToggleButton } from './ThemeToggle';
import { Palette, Settings, Info, Zap } from 'lucide-react';

export function ThemeDemo() {
  const theme = useTheme();
  const themeValue = useThemeValue();
  const themeColors = useThemeColors();
  const themeActions = useThemeActions();
  const themeInfo = useThemeInfo();

  const colorSwatches = Object.entries(theme.colors).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Theme Context Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Current Theme State */}
            <div className="space-y-2">
              <h4 className="font-medium text-neutral-900 dark:text-neutral-50">Current State</h4>
              <div className="text-sm space-y-1">
                <div>Theme: <span className="font-mono">{theme.theme}</span></div>
                <div>Resolved: <span className="font-mono">{theme.resolvedTheme}</span></div>
                <div>System: <span className="font-mono">{theme.systemTheme}</span></div>
                <div>Dark Mode: <span className="font-mono">{theme.isDark ? 'true' : 'false'}</span></div>
              </div>
            </div>

            {/* Theme Information */}
            <div className="space-y-2">
              <h4 className="font-medium text-neutral-900 dark:text-neutral-50">Theme Info</h4>
              <div className="text-sm space-y-1">
                <div>System Theme: {themeInfo.isSystemTheme ? 'Yes' : 'No'}</div>
                <div>Light Theme: {themeInfo.isLightTheme ? 'Yes' : 'No'}</div>
                <div>Dark Theme: {themeInfo.isDarkTheme ? 'Yes' : 'No'}</div>
              </div>
            </div>

            {/* Theme Actions */}
            <div className="space-y-2">
              <h4 className="font-medium text-neutral-900 dark:text-neutral-50">Actions</h4>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => themeActions.setTheme('light')}>
                  Light
                </Button>
                <Button size="sm" onClick={() => themeActions.setTheme('dark')}>
                  Dark
                </Button>
                <Button size="sm" onClick={() => themeActions.setTheme('system')}>
                  System
                </Button>
              </div>
            </div>
          </div>

          {/* Theme Toggle Components */}
          <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <h4 className="font-medium text-neutral-900 dark:text-neutral-50 mb-4">Theme Toggle Components</h4>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm">Icon Toggle:</span>
                <ThemeToggle size="md" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Button Toggle:</span>
                <ThemeToggleButton />
              </div>
              <Button size="sm" onClick={themeActions.cycleTheme}>
                <Zap className="w-4 h-4 mr-1" />
                Cycle Theme
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Color Palette ({theme.resolvedTheme})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {colorSwatches.map(({ name, value }) => (
              <div key={name} className="text-center">
                <div
                  className="w-full h-12 rounded-lg border-2 border-neutral-300 dark:border-neutral-600 mb-2"
                  style={{ backgroundColor: value }}
                  title={value}
                />
                <div className="text-xs">
                  <div className="font-medium text-neutral-900 dark:text-neutral-50">{name}</div>
                  <div className="font-mono text-neutral-600 dark:text-neutral-400 text-xs">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            Usage Examples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-neutral-900 dark:text-neutral-50 mb-2">Basic Usage:</h5>
              <pre className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg text-sm overflow-x-auto">
{`const { theme, isDark, setTheme } = useTheme();
// Current theme: ${theme}
// Is dark mode: ${isDark}
// Set theme: setTheme('dark')`}
              </pre>
            </div>

            <div>
              <h5 className="font-medium text-neutral-900 dark:text-neutral-50 mb-2">Specific Hooks:</h5>
              <pre className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg text-sm overflow-x-auto">
{`// Theme values only
const { isDark, theme } = useThemeValue();

// Theme colors only
const { colors, resolvedTheme } = useThemeColors();

// Theme actions only
const { setTheme, toggleTheme } = useThemeActions();

// Theme info only
const { isSystemTheme, isLightTheme } = useThemeInfo();`}
              </pre>
            </div>

            <div>
              <h5 className="font-medium text-neutral-900 dark:text-neutral-50 mb-2">Utility Functions:</h5>
              <pre className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg text-sm overflow-x-auto">
{`import { THEME_MODES, getThemeColors, detectSystemTheme } from '../hooks/useTheme';

// Theme constants
THEME_MODES.LIGHT // 'light'

// Get theme colors
const colors = getThemeColors('dark', true);

// Detect system theme
const systemTheme = detectSystemTheme(); // 'light' | 'dark'`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
