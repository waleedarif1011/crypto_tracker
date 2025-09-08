import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  showHeader?: boolean;
  containerClassName?: string;
  mainClassName?: string;
  fullWidth?: boolean;
}

export function Layout({ 
  children, 
  showFooter = true, 
  showHeader = true,
  containerClassName = '',
  mainClassName = '',
  fullWidth = false
}: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col transition-colors duration-200 ${containerClassName}`}>
      {/* Header */}
      {showHeader && (
        <header role="banner">
          <Header onMenuClick={handleMenuClick} />
        </header>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation menu">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-200"
            onClick={handleMenuClose}
            aria-hidden="true"
          />
          <nav className="absolute top-16 left-0 right-0 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-lg">
            <div className="px-4 py-6 space-y-2">
              <a
                href="/"
                className="block px-3 py-2 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors duration-200"
                onClick={handleMenuClose}
              >
                Home
              </a>
              <a
                href="/markets"
                className="block px-3 py-2 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors duration-200"
                onClick={handleMenuClose}
              >
                Markets
              </a>
              <a
                href="/portfolio"
                className="block px-3 py-2 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors duration-200"
                onClick={handleMenuClose}
              >
                Portfolio
              </a>
              <a
                href="/news"
                className="block px-3 py-2 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors duration-200"
                onClick={handleMenuClose}
              >
                News
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main 
        className={`flex-1 ${fullWidth ? '' : 'max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8'} ${mainClassName}`}
        role="main"
        id="main-content"
      >
        {/* Content Container with consistent spacing */}
        <div className={`${fullWidth ? '' : 'py-6 sm:py-8 lg:py-10'}`}>
          {children}
        </div>
      </main>

      {/* Footer */}
      {showFooter && (
        <footer role="contentinfo">
          <Footer />
        </footer>
      )}

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50 transition-all duration-200"
      >
        Skip to main content
      </a>
    </div>
  );
}
