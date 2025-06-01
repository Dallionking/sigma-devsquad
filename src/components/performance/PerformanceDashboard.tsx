
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePerformanceMonitoring } from '@/hooks/performance/usePerformanceMonitoring';
import { StateMetricsPanel } from './StateMetricsPanel';
import { RenderTimeTracker } from './RenderTimeTracker';
import { NetworkTracker } from './NetworkTracker';
import { MemoryVisualization } from './MemoryVisualization';
import { BottleneckAnalyzer } from './BottleneckAnalyzer';
import { OptimizationSuggestions } from './OptimizationSuggestions';
import { PerformanceHeader } from './dashboard/PerformanceHeader';
import { PerformanceOverviewTab } from './dashboard/PerformanceOverviewTab';
import { Activity, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
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
      <Card>
        <PerformanceHeader
          overallStatus={overallStatus}
          isRecording={isRecording}
          onToggleRecording={handleToggleRecording}
          onRefresh={handleRefresh}
        />
        
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
              <PerformanceOverviewTab performanceData={performanceData} />
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
