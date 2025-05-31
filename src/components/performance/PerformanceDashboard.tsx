
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePerformanceMonitoring } from '@/hooks/performance/usePerformanceMonitoring';
import { StateMetricsPanel } from './StateMetricsPanel';
import { RenderTimeTracker } from './RenderTimeTracker';
import { NetworkTracker } from './NetworkTracker';
import { MemoryVisualization } from './MemoryVisualization';
import { BottleneckAnalyzer } from './BottleneckAnalyzer';
import { OptimizationSuggestions } from './OptimizationSuggestions';
import { Activity, Zap, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PerformanceDashboardProps {
  className?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export const PerformanceDashboard = ({ 
  className, 
  autoRefresh = true,
  refreshInterval = 2000 
}: PerformanceDashboardProps) => {
  const [isRecording, setIsRecording] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [performanceData, setPerformanceData] = useState<any>(null);
  
  const { getPerformanceSnapshot, measureMemoryUsage } = usePerformanceMonitoring();

  // Auto-refresh performance data
  useEffect(() => {
    if (!autoRefresh || !isRecording) return;

    const interval = setInterval(() => {
      const snapshot = getPerformanceSnapshot();
      setPerformanceData(snapshot);
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, isRecording, refreshInterval, getPerformanceSnapshot]);

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleRefresh = () => {
    const snapshot = getPerformanceSnapshot();
    measureMemoryUsage();
    setPerformanceData(snapshot);
  };

  const getOverallStatus = () => {
    if (!performanceData) return { status: 'unknown', color: 'secondary' };

    const issues = [];
    if (performanceData.renderTime > 16) issues.push('slow rendering');
    if (performanceData.memoryUsage > 50 * 1024 * 1024) issues.push('high memory');
    if (performanceData.stateUpdateTime > 5) issues.push('slow state updates');

    if (issues.length === 0) return { status: 'excellent', color: 'success' };
    if (issues.length === 1) return { status: 'good', color: 'warning' };
    return { status: 'needs attention', color: 'destructive' };
  };

  const overallStatus = getOverallStatus();

  return (
    <div className={cn("space-y-6", className)}>
      {/* Dashboard Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Performance Dashboard
              <Badge variant={overallStatus.color as any}>
                {overallStatus.status}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="flex items-center gap-1"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              
              <Button
                variant={isRecording ? "destructive" : "default"}
                size="sm"
                onClick={handleToggleRecording}
                className="flex items-center gap-1"
              >
                {isRecording ? (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    Recording
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4" />
                    Start Recording
                  </>
                )}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="state" className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                State
              </TabsTrigger>
              <TabsTrigger value="render" className="flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Render
              </TabsTrigger>
              <TabsTrigger value="network" className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Network
              </TabsTrigger>
              <TabsTrigger value="memory" className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Memory
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Analysis
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {performanceData && (
                  <>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                          {performanceData.renderTime?.toFixed(2) || '0.00'}ms
                        </div>
                        <div className="text-sm text-muted-foreground">Avg Render Time</div>
                        <Badge variant={performanceData.renderTime > 16 ? "destructive" : "secondary"} className="mt-1">
                          {performanceData.renderTime > 16 ? "Slow" : "Good"}
                        </Badge>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                          {((performanceData.memoryUsage || 0) / (1024 * 1024)).toFixed(1)}MB
                        </div>
                        <div className="text-sm text-muted-foreground">Memory Usage</div>
                        <Badge variant={performanceData.memoryUsage > 50 * 1024 * 1024 ? "destructive" : "secondary"} className="mt-1">
                          {performanceData.memoryUsage > 50 * 1024 * 1024 ? "High" : "Normal"}
                        </Badge>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                          {performanceData.stateUpdateTime?.toFixed(2) || '0.00'}ms
                        </div>
                        <div className="text-sm text-muted-foreground">State Update Time</div>
                        <Badge variant={performanceData.stateUpdateTime > 5 ? "destructive" : "secondary"} className="mt-1">
                          {performanceData.stateUpdateTime > 5 ? "Slow" : "Fast"}
                        </Badge>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                          {performanceData.componentCount || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">Active Components</div>
                        <Badge variant="secondary" className="mt-1">
                          Tracked
                        </Badge>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="state" className="mt-4">
              <StateMetricsPanel isRecording={isRecording} />
            </TabsContent>
            
            <TabsContent value="render" className="mt-4">
              <RenderTimeTracker isRecording={isRecording} />
            </TabsContent>
            
            <TabsContent value="network" className="mt-4">
              <NetworkTracker isRecording={isRecording} />
            </TabsContent>
            
            <TabsContent value="memory" className="mt-4">
              <MemoryVisualization isRecording={isRecording} />
            </TabsContent>
            
            <TabsContent value="analysis" className="mt-4">
              <div className="space-y-4">
                <BottleneckAnalyzer performanceData={performanceData} />
                <OptimizationSuggestions performanceData={performanceData} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
