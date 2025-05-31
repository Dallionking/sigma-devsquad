
import { useCallback, useEffect, useRef } from 'react';
import { globalEventBus } from './useEventBus';

export interface MiddlewareContext {
  timestamp: number;
  source: string;
  type: string;
}

export type StateMiddleware<T = any> = (
  data: T,
  context: MiddlewareContext,
  next: (transformedData: T) => void
) => void;

export interface MiddlewareConfig {
  id: string;
  priority?: number; // Higher priority runs first
  enabled?: boolean;
}

class MiddlewareManager {
  private middleware: Array<{
    id: string;
    middleware: StateMiddleware;
    priority: number;
    enabled: boolean;
  }> = [];

  addMiddleware(middleware: StateMiddleware, config: MiddlewareConfig) {
    const { id, priority = 0, enabled = true } = config;
    
    // Remove existing middleware with same id
    this.removeMiddleware(id);
    
    this.middleware.push({
      id,
      middleware,
      priority,
      enabled
    });
    
    // Sort by priority (higher first)
    this.middleware.sort((a, b) => b.priority - a.priority);
    
    console.log(`Middleware "${id}" added with priority ${priority}`);
  }

  removeMiddleware(id: string) {
    const index = this.middleware.findIndex(m => m.id === id);
    if (index !== -1) {
      this.middleware.splice(index, 1);
      console.log(`Middleware "${id}" removed`);
    }
  }

  enableMiddleware(id: string, enabled: boolean) {
    const middleware = this.middleware.find(m => m.id === id);
    if (middleware) {
      middleware.enabled = enabled;
      console.log(`Middleware "${id}" ${enabled ? 'enabled' : 'disabled'}`);
    }
  }

  processDataSync<T>(data: T, context: MiddlewareContext): T {
    const enabledMiddleware = this.middleware.filter(m => m.enabled);
    
    if (enabledMiddleware.length === 0) {
      return data;
    }

    let currentIndex = 0;
    let currentData = data;
    let isComplete = false;

    const next = (transformedData: T) => {
      currentData = transformedData;
      currentIndex++;
      
      if (currentIndex >= enabledMiddleware.length) {
        isComplete = true;
      } else {
        processNext();
      }
    };

    const processNext = () => {
      const { middleware } = enabledMiddleware[currentIndex];
      try {
        middleware(currentData, context, next);
      } catch (error) {
        console.error(`Error in middleware ${enabledMiddleware[currentIndex].id}:`, error);
        next(currentData); // Continue with original data
      }
    };

    processNext();
    
    // Wait for synchronous processing to complete
    if (!isComplete) {
      console.warn('Middleware processing did not complete synchronously');
    }
    
    return currentData;
  }

  getMiddlewareList() {
    return this.middleware.map(m => ({
      id: m.id,
      priority: m.priority,
      enabled: m.enabled
    }));
  }
}

const middlewareManager = new MiddlewareManager();

// Built-in middleware
const loggingMiddleware: StateMiddleware = (data, context, next) => {
  console.log(`[${context.type}] ${context.source}:`, data);
  next(data);
};

const validationMiddleware: StateMiddleware = (data, context, next) => {
  // Basic validation - can be extended
  if (data !== null && data !== undefined) {
    next(data);
  } else {
    console.warn(`Invalid data in ${context.source}:`, data);
    next(data); // Still continue but warn
  }
};

const timestampMiddleware: StateMiddleware = (data, context, next) => {
  if (typeof data === 'object' && data !== null) {
    next({
      ...data,
      _timestamp: context.timestamp,
      _source: context.source
    });
  } else {
    next(data);
  }
};

export const useStateMiddleware = () => {
  const middlewareRef = useRef(middlewareManager);

  // Setup event bus middleware integration
  useEffect(() => {
    const eventMiddleware = (event: any) => {
      const context: MiddlewareContext = {
        timestamp: event.timestamp || Date.now(),
        source: event.source || 'unknown',
        type: event.type || 'unknown'
      };

      const processedData = middlewareRef.current.processDataSync(event.data, context);
      
      return {
        ...event,
        data: processedData
      };
    };

    globalEventBus.addMiddleware(eventMiddleware);

    return () => {
      globalEventBus.removeMiddleware(eventMiddleware);
    };
  }, []);

  const addMiddleware = useCallback((middleware: StateMiddleware, config: MiddlewareConfig) => {
    middlewareRef.current.addMiddleware(middleware, config);
  }, []);

  const removeMiddleware = useCallback((id: string) => {
    middlewareRef.current.removeMiddleware(id);
  }, []);

  const enableMiddleware = useCallback((id: string, enabled: boolean) => {
    middlewareRef.current.enableMiddleware(id, enabled);
  }, []);

  const getMiddlewareList = useCallback(() => {
    return middlewareRef.current.getMiddlewareList();
  }, []);

  // Register built-in middleware
  useEffect(() => {
    addMiddleware(loggingMiddleware, { id: 'logging', priority: -10, enabled: false });
    addMiddleware(validationMiddleware, { id: 'validation', priority: 100, enabled: true });
    addMiddleware(timestampMiddleware, { id: 'timestamp', priority: 50, enabled: false });
  }, [addMiddleware]);

  return {
    addMiddleware,
    removeMiddleware,
    enableMiddleware,
    getMiddlewareList
  };
};

// Predefined middleware creators
export const createTransformMiddleware = <T, R>(
  id: string,
  transform: (data: T) => R,
  priority = 0
): { middleware: StateMiddleware<T>; config: MiddlewareConfig } => ({
  middleware: (data, context, next) => {
    try {
      const transformed = transform(data);
      next(transformed as any);
    } catch (error) {
      console.error(`Transform error in ${id}:`, error);
      next(data as any);
    }
  },
  config: { id, priority }
});

export const createFilterMiddleware = <T>(
  id: string,
  filter: (data: T, context: MiddlewareContext) => boolean,
  priority = 0
): { middleware: StateMiddleware<T>; config: MiddlewareConfig } => ({
  middleware: (data, context, next) => {
    if (filter(data, context)) {
      next(data);
    } else {
      console.log(`Data filtered out by ${id}:`, data);
      // Don't call next() to stop the chain
    }
  },
  config: { id, priority }
});

export const createCacheMiddleware = <T>(
  id: string,
  cacheKey: (data: T, context: MiddlewareContext) => string,
  ttl = 5000, // 5 seconds default
  priority = 0
): { middleware: StateMiddleware<T>; config: MiddlewareConfig } => {
  const cache = new Map<string, { data: T; timestamp: number }>();

  return {
    middleware: (data, context, next) => {
      const key = cacheKey(data, context);
      const cached = cache.get(key);
      
      if (cached && (Date.now() - cached.timestamp) < ttl) {
        console.log(`Cache hit for ${id}:`, key);
        next(cached.data);
        return;
      }

      // Cache the data
      cache.set(key, { data, timestamp: Date.now() });
      
      // Clean up expired entries
      for (const [k, v] of cache.entries()) {
        if ((Date.now() - v.timestamp) >= ttl) {
          cache.delete(k);
        }
      }

      next(data);
    },
    config: { id, priority }
  };
};
