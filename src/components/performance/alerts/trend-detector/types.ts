
export interface TrendAnalysis {
  metricName: string;
  trend: 'improving' | 'declining' | 'stable';
  confidence: number;
  slope: number;
  prediction: 'alert_likely' | 'stable' | 'improving';
  timeToAlert?: number; // minutes until threshold breach
}

export interface MetricData {
  timestamp: Date;
  renderTime: number;
  memoryUsage: number;
  stateUpdateTime: number;
  completionRate: number;
}
