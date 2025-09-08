/**
 * Layout Component Usage Examples
 * This file demonstrates how to use the enhanced Layout component
 */

import React from 'react';
import { Layout } from './Layout';

// Example 1: Default Layout (most common usage)
export function DefaultLayoutExample() {
  return (
    <Layout>
      <div>
        <h1>Default Layout</h1>
        <p>This uses the default settings with header, footer, and consistent spacing.</p>
      </div>
    </Layout>
  );
}

// Example 2: Full Width Layout (for dashboards, charts)
export function FullWidthLayoutExample() {
  return (
    <Layout fullWidth>
      <div className="w-full">
        <h1>Full Width Layout</h1>
        <p>This layout spans the full width without container constraints.</p>
        <div className="bg-neutral-200 dark:bg-neutral-800 h-64 rounded-lg flex items-center justify-center">
          <span>Full width content area</span>
        </div>
      </div>
    </Layout>
  );
}

// Example 3: Layout without Header (for landing pages)
export function NoHeaderLayoutExample() {
  return (
    <Layout showHeader={false}>
      <div>
        <h1>Layout without Header</h1>
        <p>Perfect for landing pages or special layouts.</p>
      </div>
    </Layout>
  );
}

// Example 4: Layout without Footer (for modals, overlays)
export function NoFooterLayoutExample() {
  return (
    <Layout showFooter={false}>
      <div>
        <h1>Layout without Footer</h1>
        <p>Useful for modal content or overlay pages.</p>
      </div>
    </Layout>
  );
}

// Example 5: Custom Container Styling
export function CustomContainerLayoutExample() {
  return (
    <Layout 
      containerClassName="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800"
      mainClassName="bg-white dark:bg-neutral-900 rounded-lg shadow-lg"
    >
      <div>
        <h1>Custom Container Styling</h1>
        <p>This layout has custom background and container styling.</p>
      </div>
    </Layout>
  );
}

// Example 6: Minimal Layout (no header, no footer)
export function MinimalLayoutExample() {
  return (
    <Layout showHeader={false} showFooter={false}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1>Minimal Layout</h1>
          <p>Perfect for error pages, loading screens, or simple content.</p>
        </div>
      </div>
    </Layout>
  );
}

// Example 7: Layout with Custom Main Content Styling
export function CustomMainLayoutExample() {
  return (
    <Layout mainClassName="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-neutral-900 dark:to-neutral-800">
      <div>
        <h1>Custom Main Content Styling</h1>
        <p>This layout has custom styling for the main content area.</p>
      </div>
    </Layout>
  );
}

// Example 8: Responsive Layout with Different Spacing
export function ResponsiveLayoutExample() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50">
            Responsive Layout
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-4">
            This layout automatically adjusts spacing and container width based on screen size.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-50">Feature 1</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">Responsive grid layout</p>
          </div>
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-50">Feature 2</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">Automatic spacing</p>
          </div>
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-50">Feature 3</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">Dark mode support</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
