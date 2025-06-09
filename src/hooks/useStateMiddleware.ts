
import { useCallback, useEffect, useRef } from 'react';
import { globalEventBus } from './useEventBus';
import { MiddlewareManager } from './middleware/MiddlewareManager';
import { loggingMiddleware, validationMiddleware, timestampMiddleware } from './middleware/builtInMiddleware';
import { StateMiddleware, MiddlewareConfig, MiddlewareContext } from './middleware/types';

const middlewareManager = new MiddlewareManager();

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

// Re-export types and creators for convenience
export type { StateMiddleware, MiddlewareConfig, MiddlewareContext } from './middleware/types';
export {
  createTransformMiddleware,
  createFilterMiddleware,
  createCacheMiddleware
} from './middleware/middlewareCreators';
