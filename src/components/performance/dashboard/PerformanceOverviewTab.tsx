
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PerformanceOverviewTabProps {
  performanceData: any;
}

export const PerformanceOverviewTab = ({ performanceData }: PerformanceOverviewTabProps) => {
  if (!performanceData) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
    </div>
  );
};
