
import { useState, useCallback, useEffect } from 'react';
import { WorkflowHistoryEntry, WorkflowVersion, WorkflowChange, WorkflowMetrics, WorkflowComparison } from '@/types/workflow-history';
import { WorkflowRule } from '@/types/workflow-automation';

export const useWorkflowHistory = () => {
  const [history, setHistory] = useState<WorkflowHistoryEntry[]>([]);
  const [versions, setVersions] = useState<WorkflowVersion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('workflow-history');
    const savedVersions = localStorage.getItem('workflow-versions');
    
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    if (savedVersions) {
      setVersions(JSON.parse(savedVersions));
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('workflow-history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('workflow-versions', JSON.stringify(versions));
  }, [versions]);

  const recordChange = useCallback((
    workflowId: string,
    changeType: WorkflowHistoryEntry['changeType'],
    changes: WorkflowChange[],
    snapshot: any,
    changedBy: string = 'System'
  ) => {
    const entry: WorkflowHistoryEntry = {
      id: `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      workflowId,
      version: getNextVersion(workflowId),
      changeType,
      changedBy,
      timestamp: new Date().toISOString(),
      changes,
      snapshot,
      metadata: {
        userAgent: navigator.userAgent,
        sessionId: `session-${Date.now()}`
      }
    };

    setHistory(prev => [entry, ...prev]);
    return entry;
  }, [history]);

  const getNextVersion = (workflowId: string): number => {
    const workflowHistory = history.filter(h => h.workflowId === workflowId);
    return workflowHistory.length > 0 
      ? Math.max(...workflowHistory.map(h => h.version)) + 1 
      : 1;
  };

  const createVersion = useCallback((
    workflowId: string,
    name: string,
    snapshot: WorkflowRule,
    description?: string,
    tags: string[] = []
  ) => {
    const version: WorkflowVersion = {
      id: `version-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      workflowId,
      version: getNextVersion(workflowId),
      name,
      description,
      snapshot,
      createdAt: new Date().toISOString(),
      createdBy: 'Current User',
      isActive: false,
      tags
    };

    setVersions(prev => [version, ...prev]);
    return version;
  }, [history]);

  const activateVersion = useCallback((versionId: string) => {
    setVersions(prev => prev.map(v => ({
      ...v,
      isActive: v.id === versionId
    })));
  }, []);

  const getWorkflowHistory = useCallback((workflowId: string) => {
    return history
      .filter(h => h.workflowId === workflowId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [history]);

  const getWorkflowVersions = useCallback((workflowId: string) => {
    return versions
      .filter(v => v.workflowId === workflowId)
      .sort((a, b) => b.version - a.version);
  }, [versions]);

  const compareVersions = useCallback((
    baseVersionId: string,
    compareVersionId: string
  ): WorkflowComparison | null => {
    const baseVersion = versions.find(v => v.id === baseVersionId);
    const compareVersion = versions.find(v => v.id === compareVersionId);

    if (!baseVersion || !compareVersion) return null;

    const differences = calculateDifferences(baseVersion.snapshot, compareVersion.snapshot);
    
    // Mock metrics - in a real app, these would come from actual execution data
    const baseMetrics: WorkflowMetrics = {
      version: baseVersion.version,
      executionCount: Math.floor(Math.random() * 100),
      successRate: Math.random() * 100,
      averageExecutionTime: Math.random() * 1000,
      errorCount: Math.floor(Math.random() * 10),
      period: {
        start: baseVersion.createdAt,
        end: new Date().toISOString()
      }
    };

    const compareMetrics: WorkflowMetrics = {
      version: compareVersion.version,
      executionCount: Math.floor(Math.random() * 100),
      successRate: Math.random() * 100,
      averageExecutionTime: Math.random() * 1000,
      errorCount: Math.floor(Math.random() * 10),
      period: {
        start: compareVersion.createdAt,
        end: new Date().toISOString()
      }
    };

    return {
      baseVersion,
      compareVersion,
      differences,
      metricsComparison: {
        base: baseMetrics,
        compare: compareMetrics,
        improvement: {
          executionCount: compareMetrics.executionCount - baseMetrics.executionCount,
          successRate: compareMetrics.successRate - baseMetrics.successRate,
          averageExecutionTime: baseMetrics.averageExecutionTime - compareMetrics.averageExecutionTime
        }
      }
    };
  }, [versions]);

  const calculateDifferences = (oldSnapshot: any, newSnapshot: any): WorkflowChange[] => {
    const changes: WorkflowChange[] = [];
    
    // Compare basic properties
    const fields = ['name', 'description', 'isEnabled', 'priority'];
    fields.forEach(field => {
      if (oldSnapshot[field] !== newSnapshot[field]) {
        changes.push({
          field,
          oldValue: oldSnapshot[field],
          newValue: newSnapshot[field],
          changeDescription: `${field} changed from "${oldSnapshot[field]}" to "${newSnapshot[field]}"`
        });
      }
    });

    // Compare trigger
    if (JSON.stringify(oldSnapshot.trigger) !== JSON.stringify(newSnapshot.trigger)) {
      changes.push({
        field: 'trigger',
        oldValue: oldSnapshot.trigger,
        newValue: newSnapshot.trigger,
        changeDescription: 'Trigger configuration updated'
      });
    }

    // Compare conditions
    if (JSON.stringify(oldSnapshot.conditions) !== JSON.stringify(newSnapshot.conditions)) {
      changes.push({
        field: 'conditions',
        oldValue: oldSnapshot.conditions,
        newValue: newSnapshot.conditions,
        changeDescription: `Conditions changed (${oldSnapshot.conditions?.length || 0} → ${newSnapshot.conditions?.length || 0})`
      });
    }

    // Compare actions
    if (JSON.stringify(oldSnapshot.actions) !== JSON.stringify(newSnapshot.actions)) {
      changes.push({
        field: 'actions',
        oldValue: oldSnapshot.actions,
        newValue: newSnapshot.actions,
        changeDescription: `Actions changed (${oldSnapshot.actions?.length || 0} → ${newSnapshot.actions?.length || 0})`
      });
    }

    return changes;
  };

  const revertToVersion = useCallback((versionId: string) => {
    const version = versions.find(v => v.id === versionId);
    if (version) {
      activateVersion(versionId);
      return version.snapshot;
    }
    return null;
  }, [versions, activateVersion]);

  const exportHistory = useCallback((workflowId?: string) => {
    const data = workflowId 
      ? { history: getWorkflowHistory(workflowId), versions: getWorkflowVersions(workflowId) }
      : { history, versions };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workflow-history-${workflowId || 'all'}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  }, [history, versions, getWorkflowHistory, getWorkflowVersions]);

  return {
    history,
    versions,
    isLoading,
    recordChange,
    createVersion,
    activateVersion,
    getWorkflowHistory,
    getWorkflowVersions,
    compareVersions,
    revertToVersion,
    exportHistory
  };
};
