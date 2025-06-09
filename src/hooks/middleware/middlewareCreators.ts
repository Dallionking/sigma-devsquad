
import { StateMiddleware, MiddlewareConfig, MiddlewareContext } from './types';

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
