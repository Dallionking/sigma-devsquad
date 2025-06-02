
export interface WorkflowHistoryEntry {
  id: string;
  workflowId: string;
  version: number;
  changeType: 'created' | 'updated' | 'deleted' | 'enabled' | 'disabled' | 'executed';
  changedBy: string;
  timestamp: string;
  changes: WorkflowChange[];
  snapshot: any; // Complete workflow state at this point
  metadata: {
    userAgent?: string;
    ipAddress?: string;
    sessionId?: string;
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
  lastExecuted?: string;
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
