
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Activity, AlertTriangle } from "lucide-react";

interface PerformanceData {
  monitoring?: {
    metrics?: {
      renderTime?: number;
      memoryUsage?: number;
    };
  };
  batching?: {
    getQueueStats?: () => {
      pendingBatches?: number;
    };
  };
}

interface DebuggerData {
  isCapturing?: boolean;
  debugEntries?: any[];
  exportDebugData?: () => void;
}

interface PerformanceMonitoringCardProps {
  performance?: PerformanceData;
  debugger?: DebuggerData;
}

export const PerformanceMonitoringCard = ({ performance, debugger }: PerformanceMonitoringCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-5 h-5" />
          <span>Performance Monitoring</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">
                {performance?.monitoring?.metrics?.renderTime || 12}ms
              </div>
              <div className="text-sm text-muted-foreground">Avg Render Time</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xl font-bold text-green-600">
                {performance?.monitoring?.metrics?.memoryUsage || 45}MB
              </div>
              <div className="text-sm text-muted-foreground">Memory Usage</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xl font-bold text-purple-600">
                {performance?.batching?.getQueueStats?.()?.pendingBatches || 3}
              </div>
              <div className="text-sm text-muted-foreground">Pending Batches</div>
            </div>
          </div>

          {/* Debug Information */}
          {debugger?.isCapturing && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Debug mode is active. {debugger.debugEntries?.length || 0} entries captured.
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2"
                  onClick={debugger.exportDebugData}
                >
                  Export Debug Data
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
