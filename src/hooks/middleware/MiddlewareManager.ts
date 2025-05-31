
import { StateMiddleware, MiddlewareConfig, MiddlewareContext, MiddlewareItem, MiddlewareListItem } from './types';

export class MiddlewareManager {
  private middleware: MiddlewareItem[] = [];

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

  getMiddlewareList(): MiddlewareListItem[] {
    return this.middleware.map(m => ({
      id: m.id,
      priority: m.priority,
      enabled: m.enabled
    }));
  }
}
