
export interface StateDebugEntry {
  id: string;
  timestamp: number;
  type: 'state-update' | 'event' | 'selector-update' | 'component-mount' | 'component-unmount';
  source: string;
  data: any;
  stackTrace?: string;
}

export interface DebuggerConfig {
  maxEntries: number;
  captureStackTrace: boolean;
  filterTypes?: string[];
  autoCapture: boolean;
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
