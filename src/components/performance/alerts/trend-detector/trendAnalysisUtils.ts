
import { TrendAnalysis, MetricData } from './types';

export const analyzeTrends = (history: MetricData[]): TrendAnalysis[] => {
  const metrics = ['renderTime', 'memoryUsage', 'stateUpdateTime', 'completionRate'];
  
  return metrics.map(metric => {
    const values = history.map(h => h[metric as keyof MetricData] as number);
    const trend = calculateTrend(values);
    const slope = calculateSlope(values);
    const confidence = calculateConfidence(values);
    
    // Predict if alert is likely
    let prediction: 'alert_likely' | 'stable' | 'improving' = 'stable';
    let timeToAlert: number | undefined;

    if (trend === 'declining' && Math.abs(slope) > 0.5) {
      prediction = 'alert_likely';
      timeToAlert = estimateTimeToAlert(values, slope, getThresholdForMetric(metric));
    } else if (trend === 'improving') {
      prediction = 'improving';
    }

    return {
      metricName: formatMetricName(metric),
      trend,
      confidence,
      slope,
      prediction,
      timeToAlert
    };
  });
};

export const calculateTrend = (values: number[]): 'improving' | 'declining' | 'stable' => {
  if (values.length < 3) return 'stable';
  
  const firstHalf = values.slice(0, Math.floor(values.length / 2));
  const secondHalf = values.slice(Math.floor(values.length / 2));
  
  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  
  const diff = secondAvg - firstAvg;
  const threshold = firstAvg * 0.05; // 5% change threshold
  
  if (Math.abs(diff) < threshold) return 'stable';
  return diff > 0 ? 'declining' : 'improving'; // For performance metrics, higher is usually worse
};

export const calculateSlope = (values: number[]): number => {
  if (values.length < 2) return 0;
  
  const n = values.length;
  const sumX = (n * (n - 1)) / 2;
  const sumY = values.reduce((a, b) => a + b, 0);
  const sumXY = values.reduce((sum, y, x) => sum + x * y, 0);
  const sumXX = (n * (n - 1) * (2 * n - 1)) / 6;
  
  return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
};

export const calculateConfidence = (values: number[]): number => {
  if (values.length < 3) return 0;
  
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);
  const coefficientOfVariation = stdDev / mean;
  
  // Lower coefficient of variation = higher confidence
  return Math.max(0, Math.min(100, (1 - coefficientOfVariation) * 100));
};

export const getThresholdForMetric = (metric: string): number => {
  const thresholds: Record<string, number> = {
    renderTime: 16,
    memoryUsage: 80,
    stateUpdateTime: 5,
    completionRate: 70
  };
  return thresholds[metric] || 100;
};

export const estimateTimeToAlert = (values: number[], slope: number, threshold: number): number => {
  if (slope === 0) return Infinity;
  
  const currentValue = values[values.length - 1];
  const minutesToBreach = (threshold - currentValue) / (slope * 12); // Assuming 12 data points per hour
  
  return Math.max(0, minutesToBreach);
};

export const formatMetricName = (metric: string): string => {
  const names: Record<string, string> = {
    renderTime: 'Render Time',
    memoryUsage: 'Memory Usage',
    stateUpdateTime: 'State Update Time',
    completionRate: 'Completion Rate'
  };
  return names[metric] || metric;
};
