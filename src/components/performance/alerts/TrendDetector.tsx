
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePerformanceAlerts } from '@/contexts/PerformanceAlertsContext';
import { TrendingUp, TrendingDown, AlertTriangle, Activity } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

interface TrendAnalysis {
  metricName: string;
  trend: 'improving' | 'declining' | 'stable';
  confidence: number;
  slope: number;
  prediction: 'alert_likely' | 'stable' | 'improving';
  timeToAlert?: number; // minutes until threshold breach
}

export const TrendDetector = () => {
  const { addAlert } = usePerformanceAlerts();
  const [trends, setTrends] = useState<TrendAnalysis[]>([]);
  const [metricsHistory, setMetricsHistory] = useState<any[]>([]);

  // Simulate metrics collection
  useEffect(() => {
    const interval = setInterval(() => {
      const newMetric = {
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
            trend: trend.trend
          });
        }
      });
    }
  }, [metricsHistory, addAlert]);

  const analyzeTrends = (history: any[]): TrendAnalysis[] => {
    const metrics = ['renderTime', 'memoryUsage', 'stateUpdateTime', 'completionRate'];
    
    return metrics.map(metric => {
      const values = history.map(h => h[metric]);
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

  const calculateTrend = (values: number[]): 'improving' | 'declining' | 'stable' => {
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

  const calculateSlope = (values: number[]): number => {
    if (values.length < 2) return 0;
    
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = values.reduce((sum, y, x) => sum + x * y, 0);
    const sumXX = (n * (n - 1) * (2 * n - 1)) / 6;
    
    return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  };

  const calculateConfidence = (values: number[]): number => {
    if (values.length < 3) return 0;
    
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);
    const coefficientOfVariation = stdDev / mean;
    
    // Lower coefficient of variation = higher confidence
    return Math.max(0, Math.min(100, (1 - coefficientOfVariation) * 100));
  };

  const getThresholdForMetric = (metric: string): number => {
    const thresholds: Record<string, number> = {
      renderTime: 16,
      memoryUsage: 80,
      stateUpdateTime: 5,
      completionRate: 70
    };
    return thresholds[metric] || 100;
  };

  const estimateTimeToAlert = (values: number[], slope: number, threshold: number): number => {
    if (slope === 0) return Infinity;
    
    const currentValue = values[values.length - 1];
    const minutesToBreach = (threshold - currentValue) / (slope * 12); // Assuming 12 data points per hour
    
    return Math.max(0, minutesToBreach);
  };

  const formatMetricName = (metric: string): string => {
    const names: Record<string, string> = {
      renderTime: 'Render Time',
      memoryUsage: 'Memory Usage',
      stateUpdateTime: 'State Update Time',
      completionRate: 'Completion Rate'
    };
    return names[metric] || metric;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'declining': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (prediction: string) => {
    switch (prediction) {
      case 'alert_likely': return 'bg-red-100 text-red-800 border-red-200';
      case 'improving': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Trend Detection & Early Warning
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Trends Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trends.map((trend) => (
            <div key={trend.metricName} className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center gap-2">
                  {getTrendIcon(trend.trend)}
                  {trend.metricName}
                </h4>
                <Badge variant="outline" className={getTrendColor(trend.prediction)}>
                  {trend.prediction.replace('_', ' ')}
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Trend: <strong>{trend.trend}</strong></div>
                <div>Confidence: <strong>{trend.confidence.toFixed(1)}%</strong></div>
                {trend.timeToAlert && trend.timeToAlert < 60 && (
                  <div className="flex items-center gap-1 text-orange-600">
                    <AlertTriangle className="w-3 h-3" />
                    Alert likely in {Math.round(trend.timeToAlert)}min
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Metrics Chart */}
        {metricsHistory.length > 0 && (
          <div className="h-64">
            <h4 className="font-medium mb-2">Performance Metrics Over Time</h4>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metricsHistory}>
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                  fontSize={12}
                />
                <YAxis fontSize={12} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleString()}
                  formatter={(value: number, name: string) => [
                    `${value.toFixed(2)}${name.includes('Time') ? 'ms' : name.includes('Memory') ? 'MB' : '%'}`,
                    formatMetricName(name)
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="renderTime" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="memoryUsage" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="completionRate" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
