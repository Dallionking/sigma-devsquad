import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, MemoryStick, Activity } from "lucide-react";

interface PerformanceData {
  renderTime?: number;
  memoryUsage?: number;
  stateUpdateTime?: number;
  networkRequestTime?: number;
}

interface PerformanceMetricsProps {
  metrics: PerformanceData;
  showDetails?: boolean;
}

export const PerformanceMetrics = ({ metrics, showDetails = true }: PerformanceMetricsProps) => {
  const getPerformanceBadge = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return "default";
    if (value <= thresholds.warning) return "secondary";
    return "destructive";
  };

  const formatMemoryUsage = (bytes: number) => {
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Render Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics.renderTime?.toFixed(2) || '0.00'}ms
          </div>
          <Badge 
            variant={getPerformanceBadge(metrics.renderTime || 0, { good: 16, warning: 32 })}
            className="mt-1"
          >
            {(metrics.renderTime || 0) <= 16 ? "Excellent" : 
             (metrics.renderTime || 0) <= 32 ? "Good" : "Needs Work"}
          </Badge>
          {showDetails && (
            <div className="text-xs text-muted-foreground mt-2">
              Target: &lt;16ms for 60fps
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <MemoryStick className="w-4 h-4" />
            Memory Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatMemoryUsage(metrics.memoryUsage || 0)}
          </div>
          <Badge 
            variant={getPerformanceBadge(metrics.memoryUsage || 0, { good: 50 * 1024 * 1024, warning: 100 * 1024 * 1024 })}
            className="mt-1"
          >
            {(metrics.memoryUsage || 0) <= 50 * 1024 * 1024 ? "Optimal" : 
             (metrics.memoryUsage || 0) <= 100 * 1024 * 1024 ? "Good" : "High"}
          </Badge>
          {showDetails && (
            <div className="text-xs text-muted-foreground mt-2">
              Target: &lt;50MB baseline
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="w-4 h-4" />
            State Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics.stateUpdateTime?.toFixed(2) || '0.00'}ms
          </div>
          <Badge 
            variant={getPerformanceBadge(metrics.stateUpdateTime || 0, { good: 5, warning: 15 })}
            className="mt-1"
          >
            {(metrics.stateUpdateTime || 0) <= 5 ? "Fast" : 
             (metrics.stateUpdateTime || 0) <= 15 ? "Good" : "Slow"}
          </Badge>
          {showDetails && (
            <div className="text-xs text-muted-foreground mt-2">
              Target: &lt;5ms per update
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Network Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics.networkRequestTime?.toFixed(2) || '0.00'}ms
          </div>
          <Badge 
            variant={getPerformanceBadge(metrics.networkRequestTime || 0, { good: 200, warning: 500 })}
            className="mt-1"
          >
            {(metrics.networkRequestTime || 0) <= 200 ? "Fast" : 
             (metrics.networkRequestTime || 0) <= 500 ? "Good" : "Slow"}
          </Badge>
          {showDetails && (
            <div className="text-xs text-muted-foreground mt-2">
              Target: &lt;200ms response
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
