// Vercel-specific configuration
import { config } from './environment';

// Vercel environment detection
export const isVercel = typeof window !== 'undefined' && 
  (window.location.hostname.includes('vercel.app') || 
   window.location.hostname.includes('vercel.com'));

// Vercel-specific API configuration
export const vercelConfig = {
  // Use Vercel's edge functions for API proxying
  apiBaseUrl: isVercel ? '/api' : config.apiBaseUrl,
  
  // Vercel-specific optimizations
  enableEdgeFunctions: isVercel,
  enableISR: isVercel, // Incremental Static Regeneration
  
  // Performance optimizations for Vercel
  enableImageOptimization: isVercel,
  enableWebVitals: isVercel,
  
  // Analytics integration
  enableVercelAnalytics: isVercel && config.enableAnalytics,
};

// Vercel Analytics integration
export const initVercelAnalytics = () => {
  if (vercelConfig.enableVercelAnalytics && typeof window !== 'undefined') {
    // Load Vercel Analytics
    const script = document.createElement('script');
    script.src = 'https://va.vercel-scripts.com/v1/script.debug.js';
    script.defer = true;
    document.head.appendChild(script);
  }
};

// Web Vitals reporting for Vercel
export const reportWebVitals = (metric: any) => {
  if (vercelConfig.enableWebVitals && typeof window !== 'undefined') {
    // Send to Vercel Analytics
    if (window.va) {
      window.va('track', 'web-vital', {
        name: metric.name,
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
      });
    }
  }
};

// Vercel-specific error reporting
export const reportVercelError = (error: Error, context?: string) => {
  if (isVercel && config.enableErrorReporting) {
    // Use Vercel's error reporting
    fetch('/api/error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    }).catch(console.error);
  }
};

// Initialize Vercel-specific features
export const initVercelFeatures = () => {
  if (isVercel) {
    initVercelAnalytics();
    
    // Report page views
    if (vercelConfig.enableVercelAnalytics && window.va) {
      window.va('track', 'page-view', {
        url: window.location.href,
        title: document.title,
      });
    }
  }
};

// Declare global types for Vercel Analytics
declare global {
  interface Window {
    va?: (event: string, data?: any) => void;
  }
}
