import { useEffect, useRef, useCallback } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
  timestamp: number;
}

interface PerformanceOptions {
  enabled?: boolean;
  logToConsole?: boolean;
  threshold?: number; // Log only if render time exceeds threshold (ms)
}

export function usePerformance(
  componentName: string,
  options: PerformanceOptions = {}
) {
  const {
    enabled = process.env.NODE_ENV === 'development',
    logToConsole = true,
    threshold = 0
  } = options;

  const renderStartTime = useRef<number>(0);
  const renderCount = useRef<number>(0);

  // Start measuring render time
  const startRender = useCallback(() => {
    if (enabled) {
      renderStartTime.current = performance.now();
    }
  }, [enabled]);

  // End measuring and log results
  const endRender = useCallback(() => {
    if (enabled && renderStartTime.current > 0) {
      const renderTime = performance.now() - renderStartTime.current;
      renderCount.current += 1;

      if (renderTime > threshold) {
        const metrics: PerformanceMetrics = {
          renderTime,
          componentName,
          timestamp: Date.now()
        };

        if (logToConsole) {
          console.log(`[Performance] ${componentName}:`, {
            renderTime: `${renderTime.toFixed(2)}ms`,
            renderCount: renderCount.current,
            threshold: threshold > 0 ? `${threshold}ms` : 'N/A'
          });
        }

        // Store metrics for analysis
        if (typeof window !== 'undefined') {
          const existingMetrics = JSON.parse(
            localStorage.getItem('performance-metrics') || '[]'
          );
          existingMetrics.push(metrics);
          
          // Keep only last 100 entries
          if (existingMetrics.length > 100) {
            existingMetrics.splice(0, existingMetrics.length - 100);
          }
          
          localStorage.setItem('performance-metrics', JSON.stringify(existingMetrics));
        }
      }
    }
  }, [enabled, componentName, threshold, logToConsole]);

  // Measure component mount/unmount
  useEffect(() => {
    startRender();
    return () => {
      endRender();
    };
  }, [startRender, endRender]);

  return {
    startRender,
    endRender,
    renderCount: renderCount.current
  };
}

// Hook for measuring expensive operations
export function usePerformanceTimer(operationName: string) {
  const startTime = useRef<number>(0);

  const start = useCallback(() => {
    startTime.current = performance.now();
  }, []);

  const end = useCallback(() => {
    if (startTime.current > 0) {
      const duration = performance.now() - startTime.current;
      console.log(`[Performance] ${operationName}: ${duration.toFixed(2)}ms`);
      return duration;
    }
    return 0;
  }, [operationName]);

  return { start, end };
}

// Hook for measuring API call performance
export function useApiPerformance() {
  const apiTimes = useRef<Map<string, number>>(new Map());

  const startApiCall = useCallback((apiName: string) => {
    apiTimes.current.set(apiName, performance.now());
  }, []);

  const endApiCall = useCallback((apiName: string) => {
    const startTime = apiTimes.current.get(apiName);
    if (startTime) {
      const duration = performance.now() - startTime;
      console.log(`[API Performance] ${apiName}: ${duration.toFixed(2)}ms`);
      apiTimes.current.delete(apiName);
      return duration;
    }
    return 0;
  }, []);

  return { startApiCall, endApiCall };
}

// Hook for measuring list rendering performance
export function useListPerformance(
  listName: string,
  itemCount: number,
  options: PerformanceOptions = {}
) {
  const { enabled = process.env.NODE_ENV === 'development' } = options;
  const renderStartTime = useRef<number>(0);

  const startListRender = useCallback(() => {
    if (enabled) {
      renderStartTime.current = performance.now();
    }
  }, [enabled]);

  const endListRender = useCallback(() => {
    if (enabled && renderStartTime.current > 0) {
      const renderTime = performance.now() - renderStartTime.current;
      const timePerItem = renderTime / itemCount;

      console.log(`[List Performance] ${listName}:`, {
        totalTime: `${renderTime.toFixed(2)}ms`,
        itemCount,
        timePerItem: `${timePerItem.toFixed(2)}ms`,
        efficiency: timePerItem < 1 ? 'Good' : timePerItem < 5 ? 'Acceptable' : 'Slow'
      });
    }
  }, [enabled, listName, itemCount]);

  return { startListRender, endListRender };
}

// Utility to get performance metrics
export function getPerformanceMetrics(): PerformanceMetrics[] {
  if (typeof window === 'undefined') return [];
  
  try {
    return JSON.parse(localStorage.getItem('performance-metrics') || '[]');
  } catch {
    return [];
  }
}

// Utility to clear performance metrics
export function clearPerformanceMetrics(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('performance-metrics');
  }
}

// Utility to analyze performance metrics
export function analyzePerformanceMetrics(): {
  averageRenderTime: number;
  slowestComponent: string;
  totalRenders: number;
  recommendations: string[];
} {
  const metrics = getPerformanceMetrics();
  
  if (metrics.length === 0) {
    return {
      averageRenderTime: 0,
      slowestComponent: '',
      totalRenders: 0,
      recommendations: []
    };
  }

  const averageRenderTime = metrics.reduce((sum, m) => sum + m.renderTime, 0) / metrics.length;
  const slowestComponent = metrics.reduce((slowest, current) => 
    current.renderTime > slowest.renderTime ? current : slowest
  ).componentName;
  const totalRenders = metrics.length;

  const recommendations: string[] = [];
  
  if (averageRenderTime > 16) {
    recommendations.push('Consider using React.memo for components with high render times');
  }
  
  if (metrics.some(m => m.renderTime > 100)) {
    recommendations.push('Some components are taking >100ms to render - investigate optimization');
  }

  const componentCounts = metrics.reduce((acc, m) => {
    acc[m.componentName] = (acc[m.componentName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostRenderedComponent = Object.entries(componentCounts)
    .sort(([,a], [,b]) => b - a)[0];

  if (mostRenderedComponent && mostRenderedComponent[1] > 50) {
    recommendations.push(`${mostRenderedComponent[0]} is rendering frequently - consider memoization`);
  }

  return {
    averageRenderTime,
    slowestComponent,
    totalRenders,
    recommendations
  };
}
