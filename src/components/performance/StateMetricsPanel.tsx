
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEventBus } from '@/hooks/useEventBus';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Database, TrendingUp, Clock } from 'lucide-react';

interface StateMetric {
  timestamp: number;
  sliceId: string;
  operationType: 'read' | 'write' | 'update' | 'delete';
  duration: number;
  dataSize: number;
}

interface StateMetricsPanelProps {
  isRecording: boolean;
}

export const StateMetricsPanel = ({ isRecording }: StateMetricsPanelProps) => {
  const [metrics, setMetrics] = useState<StateMetric[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const { subscribe } = useEventBus();

  useEffect(() => {
    if (!isRecording) return;

    const unsubscribers = [
      subscribe('state-slice-update', (data: any) => {
        const metric: StateMetric = {
          timestamp: Date.now(),
          sliceId: data.sliceId || 'unknown',
          operationType: 'update',
          duration: data.duration || 0,
          dataSize: JSON.stringify(data.state || {}).length
        };
        
        setMetrics(prev => [...prev.slice(-49), metric]);
      }),
      
      subscribe('performance-metric', (data: any) => {
        if (data.type === 'stateUpdate') {
          const metric: StateMetric = {
            timestamp: data.timestamp,
            sliceId: data.stateName || 'unknown',
            operationType: 'update',
            duration: data.value,
            dataSize: 0
          };
          
          setMetrics(prev => [...prev.slice(-49), metric]);
        }
      })
    ];

    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, [subscribe, isRecording]);

  // Update chart data when metrics change
  useEffect(() => {
    const now = Date.now();
    const last30Seconds = metrics.filter(m => now - m.timestamp < 30000);
    
    // Group by 2-second intervals
    const intervals = Array.from({ length: 15 }, (_, i) => {
      const intervalStart = now - (14 - i) * 2000;
      const intervalEnd = intervalStart + 2000;
      
      const intervalMetrics = last30Seconds.filter(
        m => m.timestamp >= intervalStart && m.timestamp < intervalEnd
      );
      
      return {
        time: new Date(intervalStart).toLocaleTimeString(),
        operations: intervalMetrics.length,
        avgDuration: intervalMetrics.length > 0 
          ? intervalMetrics.reduce((sum, m) => sum + m.duration, 0) / intervalMetrics.length 
          : 0,
        totalSize: intervalMetrics.reduce((sum, m) => sum + m.dataSize, 0)
      };
    });
    
    setChartData(intervals);
  }, [metrics]);

  const recentMetrics = metrics.slice(-10);
  const avgDuration = metrics.length > 0 
    ? metrics.reduce((sum, m) => sum + m.duration, 0) / metrics.length 
    : 0;

  const getOperationColor = (type: StateMetric['operationType']) => {
    switch (type) {
      case 'read': return 'secondary';
      case 'write': return 'default';
      case 'update': return 'warning';
      case 'delete': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-4">
      {/* State Operation Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4" />
              <span className="font-medium">Total Operations</span>
            </div>
            <div className="text-2xl font-bold">{metrics.length}</div>
            <div className="text-sm text-muted-foreground">Since recording started</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Avg Duration</span>
            </div>
            <div className="text-2xl font-bold">{avgDuration.toFixed(2)}ms</div>
            <Badge variant={avgDuration > 5 ? "destructive" : "secondary"} className="mt-1">
              {avgDuration > 5 ? "Slow" : "Fast"}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">Operations/sec</span>
            </div>
            <div className="text-2xl font-bold">
              {chartData.length > 0 
                ? (chartData[chartData.length - 1]?.operations / 2 || 0).toFixed(1)
                : '0.0'
              }
            </div>
            <div className="text-sm text-muted-foreground">Current rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            State Operation Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="operations" 
                  stroke="#8884d8" 
                  name="Operations"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="avgDuration" 
                  stroke="#82ca9d" 
                  name="Avg Duration (ms)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Operations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Recent State Operations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentMetrics.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No state operations recorded yet
              </div>
            ) : (
              recentMetrics.reverse().map((metric, index) => (
                <div
                  key={`${metric.timestamp}-${index}`}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant={getOperationColor(metric.operationType) as any}>
                      {metric.operationType}
                    </Badge>
                    <span className="font-medium">{metric.sliceId}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{metric.duration.toFixed(2)}ms</span>
                    <span>{(metric.dataSize / 1024).toFixed(1)}KB</span>
                    <span>{new Date(metric.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
