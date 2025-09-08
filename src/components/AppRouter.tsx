import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layout';
import { ErrorBoundary } from './ErrorBoundary';
import { PageLoader } from './PageLoader';
import { NotFound } from './NotFound';
import { CoinProvider } from '../context/CoinContext';

/**
 * Lazy-loaded page components for better performance
 * 
 * @description
 * These components are loaded on-demand to reduce the initial bundle size
 * and improve application startup performance.
 */
const Home = lazy(() => import('../pages/Home').then(module => ({ default: module.Home })));
const CoinDetail = lazy(() => import('../pages/CoinDetail').then(module => ({ default: module.CoinDetail })));

/**
 * Loading fallback component for lazy-loaded pages
 * 
 * @component
 * @returns {JSX.Element} Loading spinner with message
 * 
 * @description
 * Displays a loading spinner while lazy-loaded components are being fetched.
 * Provides user feedback during route transitions.
 * 
 * @example
 * ```tsx
 * <Suspense fallback={<LoadingFallback />}>
 *   <LazyComponent />
 * </Suspense>
 * ```
 */
const LoadingFallback = () => <PageLoader message="Loading page..." />;

/**
 * Error fallback component for route-level errors
 * 
 * @component
 * @returns {JSX.Element} Error message with reload button
 * 
 * @description
 * Displays a user-friendly error message when a route fails to load.
 * Provides a reload button to retry loading the page.
 * 
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<ErrorFallback />}>
 *   <App />
 * </ErrorBoundary>
 * ```
 */
const ErrorFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
        Something went wrong
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        We encountered an error while loading this page.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="crypto-button"
      >
        Reload Page
      </button>
    </div>
  </div>
);

/**
 * Main application router component
 * 
 * @component
 * @returns {JSX.Element} The complete routing structure
 * 
 * @description
 * This component sets up the complete routing structure for the crypto tracker application.
 * It includes error boundaries, lazy loading, and context providers for optimal performance
 * and user experience.
 * 
 * Features:
 * - Lazy-loaded page components for better performance
 * - Error boundaries at multiple levels for robust error handling
 * - Coin context provider for state management
 * - 404 handling for unknown routes
 * - Suspense boundaries for loading states
 * 
 * Routes:
 * - `/` - Home page with cryptocurrency list
 * - `/coin/:id` - Individual cryptocurrency detail page
 * - `/404` - Not found page
 * - `*` - Catch-all redirect to 404
 * 
 * @example
 * ```tsx
 * // Use in your main App component
 * function App() {
 *   return <AppRouter />;
 * }
 * ```
 * 
 * @since 1.0.0
 * @author AI Assistant (Claude Sonnet 4) - Router implementation and documentation
 */
export function AppRouter() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Router>
        <CoinProvider>
          <Layout>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Home route - displays cryptocurrency list */}
                <Route
                  path="/"
                  element={
                    <ErrorBoundary>
                      <Home />
                    </ErrorBoundary>
                  }
                />

                {/* Coin detail route - displays individual cryptocurrency details */}
                <Route
                  path="/coin/:id"
                  element={
                    <ErrorBoundary>
                      <CoinDetail />
                    </ErrorBoundary>
                  }
                />

                {/* 404 page for not found routes */}
                <Route path="/404" element={<NotFound />} />

                {/* Catch-all route - redirects unknown routes to 404 */}
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </Layout>
        </CoinProvider>
      </Router>
    </ErrorBoundary>
  );
}
