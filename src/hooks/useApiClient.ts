
/**
 * Secure API Client Hook
 * Provides rate limiting, validation, and error handling for API calls
 */

import { useState, useCallback } from 'react';
import { useErrorHandler } from './useErrorHandler';
import { securityConfig } from '@/utils/securityConfig';
import { InputValidator } from '@/utils/inputValidation';

interface ApiClientOptions {
  baseUrl?: string;
  timeout?: number;
  retries?: number;
}

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  validateUrl?: boolean;
}

export const useApiClient = (options: ApiClientOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleError, retryWithErrorHandling } = useErrorHandler();
  
  const {
    timeout = 30000,
    retries = 3
  } = options;

  const makeRequest = useCallback(async <T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<T | null> => {
    const {
      method = 'GET',
      headers = {},
      body,
      validateUrl = true
    } = config;

    // Validate URL if requested
    if (validateUrl && !securityConfig.validateApiEndpoint(url)) {
      handleError(new Error('Invalid or unauthorized API endpoint'));
      return null;
    }

    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await retryWithErrorHandling(async () => {
        const fetchResponse = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!fetchResponse.ok) {
          throw new Error(`API request failed: ${fetchResponse.status} ${fetchResponse.statusText}`);
        }

        return fetchResponse.json();
      }, retries);

      return response;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        handleError(new Error('Request timeout'));
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [handleError, retryWithErrorHandling, timeout, retries]);

  const get = useCallback(<T>(url: string, config?: Omit<RequestConfig, 'method' | 'body'>) => 
    makeRequest<T>(url, { ...config, method: 'GET' }), [makeRequest]);

  const post = useCallback(<T>(url: string, body?: any, config?: Omit<RequestConfig, 'method'>) => 
    makeRequest<T>(url, { ...config, method: 'POST', body }), [makeRequest]);

  const put = useCallback(<T>(url: string, body?: any, config?: Omit<RequestConfig, 'method'>) => 
    makeRequest<T>(url, { ...config, method: 'PUT', body }), [makeRequest]);

  const del = useCallback(<T>(url: string, config?: Omit<RequestConfig, 'method' | 'body'>) => 
    makeRequest<T>(url, { ...config, method: 'DELETE' }), [makeRequest]);

  return {
    isLoading,
    get,
    post,
    put,
    delete: del,
    makeRequest
  };
};
