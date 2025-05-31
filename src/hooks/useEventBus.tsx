import { useEffect, useCallback, useRef } from 'react';

interface EventBusEvent {
  type: string;
  payload?: any;
  timestamp: number;
  source?: string;
}

class EventBus {
  private listeners: Map<string, Set<(event: EventBusEvent) => void>> = new Map();
  private eventHistory: EventBusEvent[] = [];
  
  subscribe(eventType: string, callback: (event: EventBusEvent) => void) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    
    this.listeners.get(eventType)!.add(callback);
    
    return () => {
      this.listeners.get(eventType)?.delete(callback);
    };
  }
  
  emit(eventType: string, payload?: any, source?: string) {
    const event: EventBusEvent = {
      type: eventType,
      payload,
      timestamp: Date.now(),
      source
    };
    
    this.eventHistory.push(event);
    
    // Keep only last 100 events
    if (this.eventHistory.length > 100) {
      this.eventHistory = this.eventHistory.slice(-100);
    }
    
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(event);
        } catch (error) {
          console.error('Event bus callback error:', error);
        }
      });
    }
  }
  
  getHistory(eventType?: string): EventBusEvent[] {
    if (eventType) {
      return this.eventHistory.filter(event => event.type === eventType);
    }
    return [...this.eventHistory];
  }
  
  clear() {
    this.listeners.clear();
    this.eventHistory = [];
  }
}

const globalEventBus = new EventBus();

export const useEventBus = (componentName?: string) => {
  const componentRef = useRef(componentName || 'unknown');
  
  const emit = useCallback((eventType: string, payload?: any) => {
    globalEventBus.emit(eventType, payload, componentRef.current);
  }, []);
  
  const subscribe = useCallback((eventType: string, callback: (event: EventBusEvent) => void) => {
    return globalEventBus.subscribe(eventType, callback);
  }, []);
  
  const getHistory = useCallback((eventType?: string) => {
    return globalEventBus.getHistory(eventType);
  }, []);
  
  // Auto-cleanup on unmount
  useEffect(() => {
    return () => {
      // Component-specific cleanup could go here
    };
  }, []);
  
  return {
    emit,
    subscribe,
    getHistory,
    eventBus: globalEventBus
  };
};

// Common event types
export const EVENT_TYPES = {
  AGENT_UPDATED: 'agent:updated',
  TASK_CREATED: 'task:created',
  TASK_UPDATED: 'task:updated',
  MESSAGE_SENT: 'message:sent',
  UI_NAVIGATE: 'ui:navigate',
  TEAM_UPDATED: 'team:updated',
  PROJECT_UPDATED: 'project:updated',
  CONFIG_CHANGED: 'config:changed',
  ERROR_OCCURRED: 'error:occurred',
  PERFORMANCE_WARNING: 'performance:warning'
} as const;
