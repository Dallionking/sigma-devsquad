
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEventBus } from '@/hooks/useEventBus';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Monitor, Zap, AlertTriangle } from 'lucide-react';

interface RenderMetric {
  componentName: string;
  renderTime: number;
  timestamp: number;
  renderCount: number;
}

interface RenderTimeTrackerProps {
  isRecording: boolean;
}

export const RenderTimeTracker = ({ isRecording }: RenderTimeTrackerProps) => {
  const [renderMetrics, setRenderMetrics] = useState<Map<string, RenderMetric>>(new Map());
  const [recentRenders, setRecentRenders] = useState<any[]>([]);
  const { subscribe } = useEventBus();

  useEffect(() => {
    if (!isRecording) return;

    const unsubscribers = [
      subscribe('performance-metric', (data: any) => {
        if (data.type === 'render' && data.component) {
          const componentName = data.component;
          const renderTime = data.value;
          
          setRenderMetrics(prev => {
            const newMap = new Map(prev);
            const existing = newMap.get(componentName);
            
            if (existing) {
              existing.renderTime = (existing.renderTime + renderTime) / 2; // Rolling average
              existing.renderCount += 1;
              existing.timestamp = data.timestamp;
            } else {
              newMap.set(componentName, {
                componentName,
                renderTime,
                timestamp: data.timestamp,
                renderCount: 1
              });
            }
            
            return newMap;
          });
          
          setRecentRenders(prev => [
            { componentName, renderTime, timestamp: data.timestamp },
            ...prev.slice(0, 19)
          ]);
        }
      })
    ];

    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, [subscribe, isRecording]);

  const sortedComponents = Array.from(renderMetrics.values())
    .sort((a, b) => b.renderTime - a.renderTime);

  const chartData = sortedComponents.slice(0, 10).map(metric => ({
    name: metric.componentName.length > 15 
      ? `${metric.componentName.substring(0, 15)}...` 
      : metric.componentName,
    renderTime: parseFloat(metric.renderTime.toFixed(2)),
    renderCount: metric.renderCount
  }));

  const slowComponents = sortedComponents.filter(m => m.renderTime > 16);
  const avgRenderTime = sortedComponents.length > 0 
    ? sortedComponents.reduce((sum, m) => sum + m.renderTime, 0) / sortedComponents.length 
    : 0;

  const getRenderStatus = (renderTime: number) => {
    if (renderTime < 8) return { status: 'excellent', color: 'success' };
    if (renderTime < 16) return { status: 'good', color: 'secondary' };
    if (renderTime < 32) return { status: 'slow', color: 'warning' };
    return { status: 'very slow', color: 'destructive' };
  };

  return (
    <div className="space-y-4">
      {/* Render Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Monitor className="w-4 h-4" />
              <span className="font-medium">Components Tracked</span>
            </div>
            <div className="text-2xl font-bold">{renderMetrics.size}</div>
            <div className="text-sm text-muted-foreground">Active components</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4" />
              <span className="font-medium">Avg Render Time</span>
            </div>
            <div className="text-2xl font-bold">{avgRenderTime.toFixed(2)}ms</div>
            <Badge variant={avgRenderTime > 16 ? "destructive" : "secondary"} className="mt-1">
              {avgRenderTime > 16 ? "Needs optimization" : "Good"}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">Slow Components</span>
            </div>
            <div className="text-2xl font-bold">{slowComponents.length}</div>
            <div className="text-sm text-muted-foreground">&gt; 16ms render time</div>
          </CardContent>
        </Card>
      </div>

      {/* Component Render Times Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Component Render Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="renderTime" fill="#8884d8" name="Render Time (ms)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Component Performance List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Component Performance Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sortedComponents.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No render metrics available yet
              </div>
            ) : (
              sortedComponents.map((metric) => {
                const status = getRenderStatus(metric.renderTime);
                return (
                  <div
                    key={metric.componentName}
                    className="flex items-center justify-between p-3 border rounded hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="font-medium">{metric.componentName}</div>
                      <Badge variant={status.color as any}>
                        {status.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-mono">
                        {metric.renderTime.toFixed(2)}ms
                      </span>
                      <span className="text-muted-foreground">
                        {metric.renderCount} renders
                      </span>
                      <span className="text-muted-foreground">
                        {new Date(metric.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
