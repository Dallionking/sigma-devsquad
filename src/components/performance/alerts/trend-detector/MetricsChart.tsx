
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { MetricData } from './types';
import { formatMetricName } from './trendAnalysisUtils';

interface MetricsChartProps {
  metricsHistory: MetricData[];
}

export const MetricsChart: React.FC<MetricsChartProps> = ({ metricsHistory }) => {
  if (metricsHistory.length === 0) {
    return null;
  }

  return (
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
  );
};
