
export interface StateDebugEntry {
  id: string;
  timestamp: number;
  type: 'state-update' | 'event' | 'selector-update' | 'component-mount' | 'component-unmount' | 'error' | 'warning';
  source: string;
  data: any;
  stackTrace?: string;
}

export interface DebuggerConfig {
  sliceId?: string;
  maxEntries: number;
  captureStackTrace: boolean;
  filterTypes?: string[];
  autoCapture: boolean;
  enableRealTimeTracking?: boolean;
  trackPerformance?: boolean;
}

export interface StateSliceUpdateData {
  sliceId: string;
  updates: any;
  source?: string;
  timestamp: number;
}

export interface SelectorUpdateData {
  label: string;
  value: any;
  timestamp: number;
}

export interface DebugEventData {
  source?: string;
  [key: string]: any;
}

export interface DebugStats {
  totalEntries: number;
  byType: Record<string, number>;
  bySource: Record<string, number>;
  timeRange: {
    earliest: number | null;
    latest: number | null;
  };
}

export interface PerformanceMetrics {
  renderTime?: number;
  updateCount?: number;
  memoryUsage?: number;
  stateUpdateTime?: number;
}

export interface ValidationError {
  field: string;
  message: string;
}
