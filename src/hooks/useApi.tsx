import { useState, useEffect, useCallback } from 'react';
import { apiClient, formatApiError } from '../utils/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useApi<T = any>(
  apiFunction: () => Promise<T>,
  options: UseApiOptions = {}
) {
  const { immediate = false, onSuccess, onError } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await apiFunction();
      setState({
        data: result,
        loading: false,
        error: null,
      });
      onSuccess?.(result);
      return result;
    } catch (error) {
      const errorMessage = formatApiError(error);
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
      onError?.(errorMessage);
      throw error;
    }
  }, [apiFunction, onSuccess, onError]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  const refetch = useCallback(() => {
    return execute();
  }, [execute]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    reset,
    refetch,
  };
}

// Hook for GET requests with caching
export function useApiGet<T = any>(
  url: string,
  params?: Record<string, any>,
  options: UseApiOptions & { cacheTime?: number } = {}
) {
  const { cacheTime = 5 * 60 * 1000, ...apiOptions } = options; // 5 minutes default cache

  const apiFunction = useCallback(() => {
    return apiClient.get(url, { params }).then(response => response.data);
  }, [url, params]);

  return useApi<T>(apiFunction, apiOptions);
}

// Hook for multiple API calls
export function useApiMultiple<T extends Record<string, any>>(
  apiCalls: {
    [K in keyof T]: () => Promise<T[K]>;
  },
  options: UseApiOptions = {}
) {
  const [results, setResults] = useState<Partial<T>>({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const executeAll = useCallback(async () => {
    setLoading(true);
    setErrors({});

    const promises = Object.entries(apiCalls).map(async ([key, apiCall]) => {
      try {
        const result = await apiCall();
        return { key, result, error: null };
      } catch (error) {
        const errorMessage = formatApiError(error);
        return { key, result: null, error: errorMessage };
      }
    });

    const responses = await Promise.all(promises);

    const newResults: Partial<T> = {};
    const newErrors: Partial<Record<keyof T, string>> = {};

    responses.forEach(({ key, result, error }) => {
      if (error) {
        newErrors[key as keyof T] = error;
      } else {
        newResults[key as keyof T] = result;
      }
    });

    setResults(prev => ({ ...prev, ...newResults }));
    setErrors(prev => ({ ...prev, ...newErrors }));
    setLoading(false);

    return { results: newResults, errors: newErrors };
  }, [apiCalls]);

  const reset = useCallback(() => {
    setResults({});
    setErrors({});
    setLoading(false);
  }, []);

  return {
    results,
    loading,
    errors,
    executeAll,
    reset,
    hasErrors: Object.keys(errors).length > 0,
  };
}

// Hook for polling API data
export function useApiPolling<T = any>(
  apiFunction: () => Promise<T>,
  interval: number = 30000, // 30 seconds
  options: UseApiOptions & { enabled?: boolean } = {}
) {
  const { enabled = true, ...apiOptions } = options;

  const api = useApi<T>(apiFunction, { ...apiOptions, immediate: false });

  useEffect(() => {
    if (!enabled) return;

    // Initial call
    api.execute();

    // Set up polling
    const pollInterval = setInterval(() => {
      api.execute();
    }, interval);

    return () => clearInterval(pollInterval);
  }, [api.execute, interval, enabled]);

  return api;
}

// Hook for debounced API calls (useful for search)
export function useDebounceApi<T = any>(
  apiFunction: (query: string) => Promise<T>,
  delay: number = 300,
  options: UseApiOptions = {}
) {
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [query, setQuery] = useState('');

  // Debounce the query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  // API call with debounced query
  const debouncedApiFunction = useCallback(() => {
    if (!debouncedQuery.trim()) {
      return Promise.resolve(null);
    }
    return apiFunction(debouncedQuery);
  }, [apiFunction, debouncedQuery]);

  const api = useApi<T>(debouncedApiFunction, {
    ...options,
    immediate: false,
  });

  // Trigger API call when debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      api.execute();
    } else {
      api.reset();
    }
  }, [debouncedQuery, api]);

  return {
    ...api,
    setQuery,
    query,
    debouncedQuery,
  };
}
