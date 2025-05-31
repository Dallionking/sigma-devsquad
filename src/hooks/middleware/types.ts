
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

export interface MiddlewareItem {
  id: string;
  middleware: StateMiddleware;
  priority: number;
  enabled: boolean;
}

export interface MiddlewareListItem {
  id: string;
  priority: number;
  enabled: boolean;
}
