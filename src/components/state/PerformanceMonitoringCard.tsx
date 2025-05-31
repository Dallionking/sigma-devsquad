
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { Activity, AlertTriangle, TrendingUp } from "lucide-react";

export const PerformanceMonitoringCard = () => {
  const { performance } = useDataPersistence();
  const { monitoring } = performance;

  const getPerformanceStatus = () => {
    const avgRenderTime = monitoring.metrics?.averageRenderTime || 0;
    if (avgRenderTime > 16) return { status: 'warning', color: 'yellow' };
    if (avgRenderTime > 8) return { status: 'caution', color: 'orange' };
    return { status: 'good', color: 'green' };
  };

  const status = getPerformanceStatus();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Performance Monitoring
          <Badge variant={status.status === 'good' ? 'default' : 'destructive'}>
            {status.status.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Avg Render Time</div>
            <div className="text-2xl font-bold">
              {monitoring.metrics?.averageRenderTime?.toFixed(2) || 0}ms
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Memory Usage</div>
            <div className="text-2xl font-bold">
              {((monitoring.metrics?.memoryUsage || 0) / (1024 * 1024)).toFixed(1)}MB
            </div>
          </div>
        </div>

        {status.status !== 'good' && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Performance issues detected. Consider optimizing render cycles.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
