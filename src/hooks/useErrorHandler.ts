
/**
 * Centralized Error Handling Hook
 * Provides consistent error handling across the application
 */

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ErrorState {
  hasError: boolean;
  error: Error | null;
  errorId: string | null;
}

export interface ErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  fallbackMessage?: string;
}

export const useErrorHandler = () => {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    errorId: null
  });
  const { toast } = useToast();

  const handleError = useCallback((
    error: Error | string,
    options: ErrorHandlerOptions = {}
  ) => {
    const {
      showToast = true,
      logError = true,
      fallbackMessage = 'An unexpected error occurred'
    } = options;

    const errorObj = typeof error === 'string' ? new Error(error) : error;
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Log error for debugging
    if (logError) {
      console.error(`[${errorId}]`, errorObj);
    }

    // Update error state
    setErrorState({
      hasError: true,
      error: errorObj,
      errorId
    });

    // Show toast notification
    if (showToast) {
      toast({
        title: 'Error',
        description: errorObj.message || fallbackMessage,
        variant: 'destructive'
      });
    }

    return errorId;
  }, [toast]);

  const clearError = useCallback(() => {
    setErrorState({
      hasError: false,
      error: null,
      errorId: null
    });
  }, []);

  const retryWithErrorHandling = useCallback(async <T>(
    operation: () => Promise<T>,
    retryCount: number = 3,
    options?: ErrorHandlerOptions
  ): Promise<T | null> => {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= retryCount; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt === retryCount) {
          handleError(lastError, options);
          return null;
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
    
    return null;
  }, [handleError]);

  return {
    errorState,
    handleError,
    clearError,
    retryWithErrorHandling
  };
};
