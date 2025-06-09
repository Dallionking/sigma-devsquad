
import { useEffect, useState } from 'react';
import { usePerformanceAlerts } from '@/contexts/PerformanceAlertsContext';
import { TrendAnalysis, MetricData } from './types';
import { analyzeTrends } from './trendAnalysisUtils';

export const useTrendDetector = () => {
  const { addAlert } = usePerformanceAlerts();
  const [trends, setTrends] = useState<TrendAnalysis[]>([]);
  const [metricsHistory, setMetricsHistory] = useState<MetricData[]>([]);

  // Simulate metrics collection
  useEffect(() => {
    const interval = setInterval(() => {
      const newMetric: MetricData = {
        timestamp: new Date(),
        renderTime: Math.random() * 20 + 5,
        memoryUsage: Math.random() * 100 + 50,
        stateUpdateTime: Math.random() * 10 + 2,
        completionRate: Math.random() * 30 + 70
      };

      setMetricsHistory(prev => {
        const updated = [...prev, newMetric];
        return updated.slice(-20); // Keep last 20 points
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Analyze trends when metrics history changes
  useEffect(() => {
    if (metricsHistory.length >= 5) {
      const newTrends = analyzeTrends(metricsHistory);
      setTrends(newTrends);

      // Check for early warning conditions
      newTrends.forEach(trend => {
        if (trend.prediction === 'alert_likely' && trend.timeToAlert && trend.timeToAlert < 10) {
          addAlert({
            metricName: trend.metricName,
            currentValue: 0, // Would be actual current value
            threshold: 0, // Would be actual threshold
            severity: 'warning',
            message: `Early warning: ${trend.metricName} is trending ${trend.trend} and may breach threshold in ${Math.round(trend.timeToAlert)} minutes`,
            acknowledged: false,
            trend: trend.trend
          });
        }
      });
    }
  }, [metricsHistory, addAlert]);

  return {
    trends,
    metricsHistory
  };
};
