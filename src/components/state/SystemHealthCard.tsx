
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertTriangle, Clock } from "lucide-react";

interface ComponentStatus {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  lastUpdate: Date;
  issues: number;
}

interface SystemHealthMetrics {
  totalOperations: number;
  successfulOperations: number;
  failedOperations: number;
  averageResponseTime: number;
}

interface SystemHealthData {
  overall: 'healthy' | 'warning' | 'error';
  components: ComponentStatus[];
  metrics: SystemHealthMetrics;
}

interface SystemHealthCardProps {
  stateHealth: SystemHealthData;
}

export const SystemHealthCard = ({ stateHealth }: SystemHealthCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>System Health</span>
          <Badge variant={stateHealth.overall === 'healthy' ? 'default' : 'destructive'}>
            {stateHealth.overall}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-vibe-primary">
              {stateHealth.metrics.totalOperations}
            </div>
            <div className="text-sm text-muted-foreground">Total Operations</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {stateHealth.metrics.successfulOperations}
            </div>
            <div className="text-sm text-muted-foreground">Successful</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {stateHealth.metrics.failedOperations}
            </div>
            <div className="text-sm text-muted-foreground">Failed</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {stateHealth.metrics.averageResponseTime}ms
            </div>
            <div className="text-sm text-muted-foreground">Avg Response</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">Component Status</h4>
          {stateHealth.components.map((component, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(component.status)}
                <div>
                  <div className="font-medium">{component.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Last updated: {component.lastUpdate.toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={component.status === 'healthy' ? 'default' : 
                              component.status === 'warning' ? 'secondary' : 'destructive'}>
                  {component.status}
                </Badge>
                {component.issues > 0 && (
                  <div className="text-xs text-red-600 mt-1">
                    {component.issues} issue{component.issues > 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
