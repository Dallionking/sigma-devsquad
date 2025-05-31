
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePerformanceMonitoring } from '@/hooks/performance/usePerformanceMonitoring';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { HardDrive, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';

interface MemorySnapshot {
  timestamp: number;
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface MemoryVisualizationProps {
  isRecording: boolean;
}

export const MemoryVisualization = ({ isRecording }: MemoryVisualizationProps) => {
  const [memoryHistory, setMemoryHistory] = useState<MemorySnapshot[]>([]);
  const [currentMemory, setCurrentMemory] = useState<MemorySnapshot | null>(null);
  const { measureMemoryUsage } = usePerformanceMonitoring();

  // Collect memory data
  useEffect(() => {
    if (!isRecording) return;

    const collectMemoryData = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const snapshot: MemorySnapshot = {
          timestamp: Date.now(),
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit
        };
        
        setCurrentMemory(snapshot);
        setMemoryHistory(prev => [...prev.slice(-59), snapshot]); // Keep last 60 readings
      }
    };

    collectMemoryData();
    const interval = setInterval(collectMemoryData, 2000);

    return () => clearInterval(interval);
  }, [isRecording]);

  const formatBytes = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const getMemoryStatus = () => {
    if (!currentMemory) return { status: 'unknown', color: 'secondary' };
    
    const usagePercent = (currentMemory.usedJSHeapSize / currentMemory.jsHeapSizeLimit) * 100;
    
    if (usagePercent < 50) return { status: 'optimal', color: 'success' };
    if (usagePercent < 75) return { status: 'moderate', color: 'warning' };
    return { status: 'high', color: 'destructive' };
  };

  const chartData = memoryHistory.map(snapshot => ({
    time: new Date(snapshot.timestamp).toLocaleTimeString(),
    used: snapshot.usedJSHeapSize / (1024 * 1024),
    total: snapshot.totalJSHeapSize / (1024 * 1024),
    limit: snapshot.jsHeapSizeLimit / (1024 * 1024)
  }));

  const pieData = currentMemory ? [
    {
      name: 'Used Memory',
      value: currentMemory.usedJSHeapSize,
      color: '#8884d8'
    },
    {
      name: 'Available Memory',
      value: Math.max(0, currentMemory.totalJSHeapSize - currentMemory.usedJSHeapSize),
      color: '#82ca9d'
    },
    {
      name: 'System Reserved',
      value: Math.max(0, currentMemory.jsHeapSizeLimit - currentMemory.totalJSHeapSize),
      color: '#ffc658'
    }
  ] : [];

  const memoryStatus = getMemoryStatus();
  const memoryTrend = memoryHistory.length >= 2 
    ? memoryHistory[memoryHistory.length - 1].usedJSHeapSize - memoryHistory[memoryHistory.length - 2].usedJSHeapSize
    : 0;

  const handleForceGC = () => {
    // Force garbage collection if available (Chrome DevTools)
    if ('gc' in window) {
      (window as any).gc();
      measureMemoryUsage();
    }
  };

  return (
    <div className="space-y-4">
      {/* Memory Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <HardDrive className="w-4 h-4" />
              <span className="font-medium">Used Memory</span>
            </div>
            <div className="text-2xl font-bold">
              {currentMemory ? formatBytes(currentMemory.usedJSHeapSize) : '0 MB'}
            </div>
            <Badge variant={memoryStatus.color as any} className="mt-1">
              {memoryStatus.status}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">Memory Trend</span>
            </div>
            <div className="text-2xl font-bold">
              {memoryTrend > 0 ? '+' : ''}{formatBytes(Math.abs(memoryTrend))}
            </div>
            <Badge variant={memoryTrend > 1024 * 1024 ? "warning" : "secondary"} className="mt-1">
              {memoryTrend > 0 ? "Increasing" : memoryTrend < 0 ? "Decreasing" : "Stable"}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">Usage %</span>
            </div>
            <div className="text-2xl font-bold">
              {currentMemory 
                ? ((currentMemory.usedJSHeapSize / currentMemory.jsHeapSizeLimit) * 100).toFixed(1)
                : '0.0'
              }%
            </div>
            <div className="text-sm text-muted-foreground">of heap limit</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="w-4 h-4" />
              <span className="font-medium">Actions</span>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleForceGC}
              className="w-full"
              disabled={!('gc' in window)}
            >
              Force GC
            </Button>
            <div className="text-xs text-muted-foreground mt-1">
              {('gc' in window) ? 'Available in DevTools' : 'Not available'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Memory Usage Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5" />
            Memory Usage Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`${value.toFixed(1)} MB`, '']} />
                <Area
                  type="monotone"
                  dataKey="used"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                  name="Used Memory"
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stackId="2"
                  stroke="#82ca9d"
                  fill="transparent"
                  strokeDasharray="5 5"
                  name="Total Allocated"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Memory Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Memory Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${formatBytes(value)}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatBytes(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Memory Limits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentMemory && (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm">Used Memory:</span>
                    <span className="font-mono">{formatBytes(currentMemory.usedJSHeapSize)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Allocated:</span>
                    <span className="font-mono">{formatBytes(currentMemory.totalJSHeapSize)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Heap Size Limit:</span>
                    <span className="font-mono">{formatBytes(currentMemory.jsHeapSizeLimit)}</span>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="text-sm text-muted-foreground mb-2">Memory Pressure</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ 
                          width: `${(currentMemory.usedJSHeapSize / currentMemory.jsHeapSizeLimit) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
