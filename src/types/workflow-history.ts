
export interface WorkflowHistoryEntry {
  id: string;
  workflowId: string;
  version: number;
  changeType: 'created' | 'updated' | 'deleted' | 'enabled' | 'disabled' | 'executed';
  changedBy: string;
  timestamp: string;
  changes: WorkflowChange[];
  snapshot: any;
  metadata?: {
    userAgent?: string;
    sessionId?: string;
    [key: string]: any;
  };
}

export interface WorkflowChange {
  field: string;
  oldValue: any;
  newValue: any;
  changeDescription: string;
}

export interface WorkflowVersion {
  id: string;
  workflowId: string;
  version: number;
  name: string;
  description?: string;
  snapshot: any;
  createdAt: string;
  createdBy: string;
  isActive: boolean;
  tags: string[];
}

export interface WorkflowMetrics {
  version: number;
  executionCount: number;
  successRate: number;
  averageExecutionTime: number;
  errorCount: number;
  period: {
    start: string;
    end: string;
  };
}

export interface WorkflowComparison {
  baseVersion: WorkflowVersion;
  compareVersion: WorkflowVersion;
  differences: WorkflowChange[];
  metricsComparison: {
    base: WorkflowMetrics;
    compare: WorkflowMetrics;
    improvement: {
      executionCount: number;
      successRate: number;
      averageExecutionTime: number;
    };
  };
}
