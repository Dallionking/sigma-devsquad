
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useEventBus } from '@/hooks/useEventBus';
import { useToast } from '@/hooks/use-toast';

export interface PerformanceThreshold {
  id: string;
  metricName: string;
  warningThreshold: number;
  criticalThreshold: number;
  unit: string;
  enabled: boolean;
  comparisonType: 'greater' | 'less' | 'equal';
}

export interface PerformanceAlert {
  id: string;
  metricName: string;
  currentValue: number;
  threshold: number;
  severity: 'warning' | 'critical' | 'info';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  trend?: 'improving' | 'declining' | 'stable';
}

export interface TrendData {
  metricName: string;
  values: number[];
  timestamps: Date[];
  trend: 'improving' | 'declining' | 'stable';
  confidence: number;
}

export interface ImprovementSuggestion {
  id: string;
  category: 'performance' | 'memory' | 'render' | 'state' | 'network';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  priority: number;
  relatedMetrics: string[];
}

interface PerformanceAlertsContextType {
  alerts: PerformanceAlert[];
  thresholds: PerformanceThreshold[];
  trends: TrendData[];
  suggestions: ImprovementSuggestion[];
  addAlert: (alert: Omit<PerformanceAlert, 'id' | 'timestamp'>) => void;
  acknowledgeAlert: (alertId: string) => void;
  updateThreshold: (threshold: PerformanceThreshold) => void;
  getActiveAlerts: () => PerformanceAlert[];
  getCriticalAlerts: () => PerformanceAlert[];
  clearOldAlerts: () => void;
  generateImprovementSuggestions: () => void;
}

const PerformanceAlertsContext = createContext<PerformanceAlertsContextType | undefined>(undefined);

const defaultThresholds: PerformanceThreshold[] = [
  {
    id: 'render-time',
    metricName: 'Render Time',
    warningThreshold: 16,
    criticalThreshold: 33,
    unit: 'ms',
    enabled: true,
    comparisonType: 'greater'
  },
  {
    id: 'memory-usage',
    metricName: 'Memory Usage',
    warningThreshold: 50,
    criticalThreshold: 80,
    unit: 'MB',
    enabled: true,
    comparisonType: 'greater'
  },
  {
    id: 'state-update-time',
    metricName: 'State Update Time',
    warningThreshold: 5,
    criticalThreshold: 10,
    unit: 'ms',
    enabled: true,
    comparisonType: 'greater'
  },
  {
    id: 'completion-rate',
    metricName: 'Task Completion Rate',
    warningThreshold: 70,
    criticalThreshold: 50,
    unit: '%',
    enabled: true,
    comparisonType: 'less'
  }
];

export const PerformanceAlertsProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [thresholds, setThresholds] = useState<PerformanceThreshold[]>(defaultThresholds);
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [suggestions, setSuggestions] = useState<ImprovementSuggestion[]>([]);
  const { subscribe } = useEventBus();
  const { toast } = useToast();

  const addAlert = (alertData: Omit<PerformanceAlert, 'id' | 'timestamp'>) => {
    const newAlert: PerformanceAlert = {
      ...alertData,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      acknowledged: false
    };

    setAlerts(prev => [newAlert, ...prev]);

    // Show toast notification
    toast({
      title: `Performance Alert: ${alertData.severity.toUpperCase()}`,
      description: alertData.message,
      variant: alertData.severity === 'critical' ? 'destructive' : 'default'
    });

    console.log('Performance alert triggered:', newAlert);
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const updateThreshold = (threshold: PerformanceThreshold) => {
    setThresholds(prev => 
      prev.map(t => t.id === threshold.id ? threshold : t)
    );
  };

  const getActiveAlerts = () => alerts.filter(alert => !alert.acknowledged);
  const getCriticalAlerts = () => alerts.filter(alert => alert.severity === 'critical' && !alert.acknowledged);

  const clearOldAlerts = () => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    setAlerts(prev => prev.filter(alert => alert.timestamp > oneDayAgo));
  };

  const detectTrend = (values: number[]): 'improving' | 'declining' | 'stable' => {
    if (values.length < 3) return 'stable';
    
    const recent = values.slice(-3);
    const increasing = recent.every((val, i) => i === 0 || val > recent[i - 1]);
    const decreasing = recent.every((val, i) => i === 0 || val < recent[i - 1]);
    
    if (increasing) return 'improving';
    if (decreasing) return 'declining';
    return 'stable';
  };

  const generateImprovementSuggestions = () => {
    const newSuggestions: ImprovementSuggestion[] = [];
    
    // Analyze current alerts and trends to generate suggestions
    const criticalAlerts = getCriticalAlerts();
    const renderTimeAlerts = criticalAlerts.filter(a => a.metricName.includes('Render'));
    const memoryAlerts = criticalAlerts.filter(a => a.metricName.includes('Memory'));
    
    if (renderTimeAlerts.length > 0) {
      newSuggestions.push({
        id: 'render-optimization',
        category: 'render',
        title: 'Optimize Component Rendering',
        description: 'High render times detected. Consider implementing React.memo, useMemo, and useCallback for expensive components.',
        impact: 'high',
        effort: 'medium',
        priority: 1,
        relatedMetrics: ['Render Time']
      });
    }

    if (memoryAlerts.length > 0) {
      newSuggestions.push({
        id: 'memory-cleanup',
        category: 'memory',
        title: 'Memory Leak Prevention',
        description: 'High memory usage detected. Review event listeners, timeouts, and ensure proper cleanup in useEffect hooks.',
        impact: 'high',
        effort: 'medium',
        priority: 2,
        relatedMetrics: ['Memory Usage']
      });
    }

    // Add general performance suggestions
    newSuggestions.push({
      id: 'state-optimization',
      category: 'state',
      title: 'State Management Optimization',
      description: 'Consider using state normalization and avoiding deep object updates to improve state update performance.',
      impact: 'medium',
      effort: 'low',
      priority: 3,
      relatedMetrics: ['State Update Time']
    });

    setSuggestions(newSuggestions);
  };

  // Monitor performance metrics and check thresholds
  useEffect(() => {
    const unsubscribers = [
      subscribe('performance-metric', (data: any) => {
        const threshold = thresholds.find(t => 
          t.enabled && data.type && t.metricName.toLowerCase().includes(data.type.toLowerCase())
        );

        if (threshold) {
          const value = data.type === 'memory' ? data.value / (1024 * 1024) : data.value;
          let shouldAlert = false;
          let severity: 'warning' | 'critical' = 'warning';

          if (threshold.comparisonType === 'greater') {
            if (value > threshold.criticalThreshold) {
              shouldAlert = true;
              severity = 'critical';
            } else if (value > threshold.warningThreshold) {
              shouldAlert = true;
              severity = 'warning';
            }
          } else if (threshold.comparisonType === 'less') {
            if (value < threshold.criticalThreshold) {
              shouldAlert = true;
              severity = 'critical';
            } else if (value < threshold.warningThreshold) {
              shouldAlert = true;
              severity = 'warning';
            }
          }

          if (shouldAlert) {
            addAlert({
              metricName: threshold.metricName,
              currentValue: value,
              threshold: severity === 'critical' ? threshold.criticalThreshold : threshold.warningThreshold,
              severity,
              message: `${threshold.metricName} ${severity === 'critical' ? 'critically ' : ''}exceeded threshold: ${value.toFixed(2)}${threshold.unit} (threshold: ${severity === 'critical' ? threshold.criticalThreshold : threshold.warningThreshold}${threshold.unit})`
            });
          }
        }
      })
    ];

    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, [thresholds, subscribe]);

  // Clean up old alerts periodically
  useEffect(() => {
    const interval = setInterval(clearOldAlerts, 60000); // Every minute
    return () => clearInterval(interval);
  }, []);

  // Generate suggestions when alerts change
  useEffect(() => {
    if (alerts.length > 0) {
      generateImprovementSuggestions();
    }
  }, [alerts]);

  return (
    <PerformanceAlertsContext.Provider
      value={{
        alerts,
        thresholds,
        trends,
        suggestions,
        addAlert,
        acknowledgeAlert,
        updateThreshold,
        getActiveAlerts,
        getCriticalAlerts,
        clearOldAlerts,
        generateImprovementSuggestions
      }}
    >
      {children}
    </PerformanceAlertsContext.Provider>
  );
};

export const usePerformanceAlerts = () => {
  const context = useContext(PerformanceAlertsContext);
  if (context === undefined) {
    throw new Error('usePerformanceAlerts must be used within a PerformanceAlertsProvider');
  }
  return context;
};
