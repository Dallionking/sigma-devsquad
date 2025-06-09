
import { useCallback, useEffect, useRef } from 'react';

export type EventHandler<T = any> = (data: T) => void;

interface EventBusEvent<T = any> {
  type: string;
  data: T;
  timestamp: number;
  source?: string;
}

class EventBus {
  private listeners: Map<string, Set<EventHandler>> = new Map();
  private middleware: Array<(event: EventBusEvent) => EventBusEvent> = [];
  private eventHistory: EventBusEvent[] = [];
  private maxHistorySize = 100;

  // Subscribe to events
  subscribe<T>(eventType: string, handler: EventHandler<T>): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    
    this.listeners.get(eventType)!.add(handler);
    
    // Return unsubscribe function
    return () => {
      const handlers = this.listeners.get(eventType);
      if (handlers) {
        handlers.delete(handler);
        if (handlers.size === 0) {
          this.listeners.delete(eventType);
        }
      }
    };
  }

  // Emit events
  emit<T>(eventType: string, data: T, source?: string): void {
    let event: EventBusEvent<T> = {
      type: eventType,
      data,
      timestamp: Date.now(),
      source
    };

    // Apply middleware transformations
    for (const middleware of this.middleware) {
      event = middleware(event) as EventBusEvent<T>;
    }

    // Add to history
    this.eventHistory.push(event);
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.shift();
    }

    // Notify listeners
    const handlers = this.listeners.get(eventType);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(event.data);
        } catch (error) {
          console.error(`Error in event handler for ${eventType}:`, error);
        }
      });
    }

    console.log(`Event emitted: ${eventType}`, event);
  }

  // Add middleware
  addMiddleware(middleware: (event: EventBusEvent) => EventBusEvent): void {
    this.middleware.push(middleware);
  }

  // Remove middleware
  removeMiddleware(middleware: (event: EventBusEvent) => EventBusEvent): void {
    const index = this.middleware.indexOf(middleware);
    if (index > -1) {
      this.middleware.splice(index, 1);
    }
  }

  // Get event history
  getEventHistory(): EventBusEvent[] {
    return [...this.eventHistory];
  }

  // Clear event history
  clearEventHistory(): void {
    this.eventHistory = [];
  }

  // Get all active listeners
  getActiveListeners(): Map<string, number> {
    const result = new Map<string, number>();
    this.listeners.forEach((handlers, eventType) => {
      result.set(eventType, handlers.size);
    });
    return result;
  }
}

// Global event bus instance
const globalEventBus = new EventBus();

export const useEventBus = () => {
  const listenersRef = useRef<Array<() => void>>([]);

  // Subscribe to events with automatic cleanup
  const subscribe = useCallback(<T>(eventType: string, handler: EventHandler<T>, deps: any[] = []) => {
    const unsubscribe = globalEventBus.subscribe(eventType, handler);
    listenersRef.current.push(unsubscribe);
    return unsubscribe;
  }, []);

  // Emit events
  const emit = useCallback(<T>(eventType: string, data: T, source?: string) => {
    globalEventBus.emit(eventType, data, source);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      listenersRef.current.forEach(unsubscribe => unsubscribe());
      listenersRef.current = [];
    };
  }, []);

  return {
    subscribe,
    emit,
    addMiddleware: globalEventBus.addMiddleware.bind(globalEventBus),
    removeMiddleware: globalEventBus.removeMiddleware.bind(globalEventBus),
    getEventHistory: globalEventBus.getEventHistory.bind(globalEventBus),
    clearEventHistory: globalEventBus.clearEventHistory.bind(globalEventBus),
    getActiveListeners: globalEventBus.getActiveListeners.bind(globalEventBus)
  };
};

// Hook for subscribing to specific events
export const useEventSubscription = <T>(
  eventType: string,
  handler: EventHandler<T>,
  deps: any[] = []
) => {
  const { subscribe } = useEventBus();

  useEffect(() => {
    const unsubscribe = subscribe(eventType, handler);
    return unsubscribe;
  }, [eventType, subscribe, ...deps]);
};

export { globalEventBus };
