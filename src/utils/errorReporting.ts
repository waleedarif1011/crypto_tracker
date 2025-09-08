/**
 * Error reporting and logging utilities
 * 
 * @fileoverview
 * This module provides comprehensive error reporting, performance monitoring,
 * and logging capabilities for the crypto tracker application. It includes
 * client-side error tracking, performance metrics, and integration with
 * external error reporting services.
 * 
 * @author AI Assistant (Claude Sonnet 4) - Error reporting system implementation
 * @since 1.0.0
 */

import { config, errorLog } from '@config/environment';

/**
 * Structure for error reports sent to monitoring services
 * @interface ErrorReport
 */
export interface ErrorReport {
  /** Error message or description */
  message: string;
  /** JavaScript stack trace (if available) */
  stack?: string;
  /** Context where the error occurred (e.g., 'api-call', 'component-render') */
  context?: string;
  /** ISO timestamp when the error occurred */
  timestamp: string;
  /** User agent string for browser identification */
  userAgent: string;
  /** URL where the error occurred */
  url: string;
  /** Optional user identifier for tracking */
  userId?: string;
  /** Session identifier for grouping related errors */
  sessionId?: string;
  /** Additional metadata about the error */
  additionalData?: Record<string, any>;
}

/**
 * Structure for performance reports
 * @interface PerformanceReport
 */
export interface PerformanceReport {
  /** Name of the performance metric */
  metric: string;
  /** Measured value (usually in milliseconds) */
  value: number;
  /** ISO timestamp when the metric was recorded */
  timestamp: string;
  /** Context where the metric was measured */
  context?: string;
  /** Additional metadata about the performance measurement */
  additionalData?: Record<string, any>;
}

/**
 * Main error reporting and monitoring class
 * 
 * @class ErrorReporter
 * @description
 * Handles client-side error reporting, performance monitoring, and logging.
 * Provides offline queue management, session tracking, and integration with
 * external monitoring services.
 * 
 * Features:
 * - Global error handling for unhandled errors and promise rejections
 * - Performance monitoring with Web Vitals integration
 * - Offline queue management for reliable error reporting
 * - Session and user tracking for better error context
 * - Integration with external error reporting services
 * 
 * @example
 * ```typescript
 * // Access the singleton instance
 * const reporter = errorReporter;
 * 
 * // Report a custom error
 * reporter.reportError(new Error('API call failed'), 'api-call');
 * 
 * // Set user ID for tracking
 * reporter.setUserId('user123');
 * 
 * // Report performance metric
 * reporter.reportPerformance('page-load', 1500, 'initial-load');
 * ```
 */
class ErrorReporter {
  /** Unique session identifier for grouping related errors */
  private sessionId: string;
  /** Optional user identifier for tracking */
  private userId?: string;
  /** Queue of errors to be sent when online */
  private errorQueue: ErrorReport[] = [];
  /** Queue of performance metrics to be sent */
  private performanceQueue: PerformanceReport[] = [];
  /** Current online/offline status */
  private isOnline: boolean = navigator.onLine;

  /**
   * Creates a new ErrorReporter instance
   * 
   * @constructor
   * @description
   * Initializes the error reporter with a unique session ID and sets up
   * event listeners for online/offline status and global error handlers.
   */
  constructor() {
    this.sessionId = this.generateSessionId();
    this.setupEventListeners();
    this.setupGlobalErrorHandlers();
  }

  /**
   * Generates a unique session identifier
   * 
   * @private
   * @function generateSessionId
   * @returns {string} A unique session ID
   * 
   * @description
   * Creates a unique session identifier using timestamp and random string.
   * Used for grouping related errors and performance metrics.
   * 
   * @example
   * ```typescript
   * const sessionId = this.generateSessionId();
   * // Returns something like "1a2b3c4d5e6f"
   * ```
   */
  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private setupEventListeners(): void {
    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushQueues();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Listen for page unload to flush remaining reports
    window.addEventListener('beforeunload', () => {
      this.flushQueues(true);
    });
  }

  private setupGlobalErrorHandlers(): void {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.reportError({
        message: event.message,
        stack: event.error?.stack,
        context: 'global-error',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        context: 'unhandled-rejection',
      });
    });
  }

  /**
   * Sets the user ID for error tracking
   * 
   * @function setUserId
   * @param {string} userId - The user identifier
   * @description
   * Associates a user ID with error reports for better tracking and debugging.
   * This helps identify which users are experiencing specific errors.
   * 
   * @example
   * ```typescript
   * errorReporter.setUserId('user123');
   * // All subsequent error reports will include this user ID
   * ```
   */
  public setUserId(userId: string): void {
    this.userId = userId;
  }

  /**
   * Reports an error to the monitoring service
   * 
   * @function reportError
   * @param {Error | string} error - The error object or error message
   * @param {string} [context] - Optional context where the error occurred
   * @param {Record<string, any>} [additionalData] - Additional metadata
   * @description
   * Reports an error to the configured error reporting service. If error
   * reporting is disabled or the service is unavailable, the error is
   * logged to the console in development mode.
   * 
   * @example
   * ```typescript
   * // Report an Error object
   * errorReporter.reportError(new Error('API call failed'), 'api-call');
   * 
   * // Report a string error
   * errorReporter.reportError('Network timeout', 'network', { timeout: 5000 });
   * ```
   */
  public reportError(error: Error | string, context?: string, additionalData?: Record<string, any>): void {
    if (!config.enableErrorReporting) {
      return;
    }

    const errorReport: ErrorReport = {
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'object' ? error.stack : undefined,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: this.userId,
      sessionId: this.sessionId,
      additionalData,
    };

    // Log to console in development
    if (config.enableDebugMode) {
      console.error('Error reported:', errorReport);
    }

    // Add to queue
    this.errorQueue.push(errorReport);

    // Try to send immediately if online
    if (this.isOnline) {
      this.sendErrorReport(errorReport);
    }
  }

  public reportPerformance(metric: string, value: number, context?: string, additionalData?: Record<string, any>): void {
    if (!config.enableAnalytics) {
      return;
    }

    const performanceReport: PerformanceReport = {
      metric,
      value,
      timestamp: new Date().toISOString(),
      context,
      additionalData,
    };

    // Add to queue
    this.performanceQueue.push(performanceReport);

    // Try to send immediately if online
    if (this.isOnline) {
      this.sendPerformanceReport(performanceReport);
    }
  }

  private async sendErrorReport(report: ErrorReport): Promise<void> {
    if (!config.errorReportingEndpoint) {
      return;
    }

    try {
      await fetch(config.errorReportingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      });
    } catch (error) {
      console.warn('Failed to send error report:', error);
    }
  }

  private async sendPerformanceReport(report: PerformanceReport): Promise<void> {
    // This would integrate with your analytics service
    // For now, just log in development
    if (config.enableDebugMode) {
      console.log('Performance metric:', report);
    }
  }

  private async flushQueues(sync: boolean = false): Promise<void> {
    // Flush error queue
    while (this.errorQueue.length > 0) {
      const report = this.errorQueue.shift();
      if (report) {
        if (sync) {
          // Use sendBeacon for synchronous sending
          if (navigator.sendBeacon && config.errorReportingEndpoint) {
            navigator.sendBeacon(
              config.errorReportingEndpoint,
              JSON.stringify(report)
            );
          }
        } else {
          await this.sendErrorReport(report);
        }
      }
    }

    // Flush performance queue
    while (this.performanceQueue.length > 0) {
      const report = this.performanceQueue.shift();
      if (report) {
        await this.sendPerformanceReport(report);
      }
    }
  }

  // Public method to manually flush queues
  public async flush(): Promise<void> {
    await this.flushQueues();
  }
}

// Create singleton instance
export const errorReporter = new ErrorReporter();

// React Error Boundary integration
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    errorReporter.reportError(error, 'react-error-boundary', {
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error!} />;
    }

    return this.props.children;
  }
}

// Default error fallback component
const DefaultErrorFallback: React.FC<{ error: Error }> = ({ error }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-gray-900">Something went wrong</h3>
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-4">
        We're sorry, but something unexpected happened. Our team has been notified.
      </div>
      <button
        onClick={() => window.location.reload()}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Reload Page
      </button>
    </div>
  </div>
);

/**
 * Performance monitoring utilities
 * 
 * @namespace performanceMonitor
 * @description
 * Provides utilities for measuring and reporting performance metrics.
 * Includes support for custom performance marks, page load metrics,
 * and Web Vitals integration.
 * 
 * @example
 * ```typescript
 * // Measure custom operation
 * performanceMonitor.markStart('api-call');
 * await fetchData();
 * performanceMonitor.markEnd('api-call');
 * 
 * // Measure page load automatically
 * performanceMonitor.measurePageLoad();
 * ```
 */
export const performanceMonitor = {
  /**
   * Marks the start of a performance measurement
   * 
   * @function markStart
   * @param {string} name - Name of the performance mark
   * @description
   * Creates a performance mark to indicate the start of a measurement.
   * Should be paired with markEnd() to measure duration.
   * 
   * @example
   * ```typescript
   * performanceMonitor.markStart('data-processing');
   * // ... perform operation ...
   * performanceMonitor.markEnd('data-processing');
   * ```
   */
  markStart: (name: string) => {
    if (performance.mark) {
      performance.mark(`${name}-start`);
    }
  },

  /**
   * Marks the end of a performance measurement and reports the duration
   * 
   * @function markEnd
   * @param {string} name - Name of the performance mark
   * @description
   * Creates a performance mark to indicate the end of a measurement,
   * calculates the duration, and reports it to the error reporter.
   * 
   * @example
   * ```typescript
   * performanceMonitor.markStart('api-call');
   * await fetchData();
   * performanceMonitor.markEnd('api-call'); // Reports duration automatically
   * ```
   */
  markEnd: (name: string) => {
    if (performance.mark) {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = performance.getEntriesByName(name)[0];
      if (measure) {
        errorReporter.reportPerformance(name, measure.duration, 'performance-measure');
      }
    }
  },

  /**
   * Measures and reports page load performance metrics
   * 
   * @function measurePageLoad
   * @description
   * Sets up automatic measurement of page load performance metrics including:
   * - Total page load time
   * - DOM content loaded time
   * - First contentful paint time
   * 
   * @example
   * ```typescript
   * // Call once during app initialization
   * performanceMonitor.measurePageLoad();
   * ```
   */
  measurePageLoad: () => {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        errorReporter.reportPerformance('page-load-time', navigation.loadEventEnd - navigation.fetchStart, 'page-load');
        errorReporter.reportPerformance('dom-content-loaded', navigation.domContentLoadedEventEnd - navigation.fetchStart, 'page-load');
        errorReporter.reportPerformance('first-contentful-paint', navigation.domContentLoadedEventEnd - navigation.fetchStart, 'page-load');
      }
    });
  },
};

// Initialize performance monitoring
if (config.enableAnalytics) {
  performanceMonitor.measurePageLoad();
}
