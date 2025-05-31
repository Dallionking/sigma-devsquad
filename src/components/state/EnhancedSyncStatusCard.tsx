
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { 
  Sync, 
  Database, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCcw,
  Wifi,
  WifiOff,
  Clock,
  TrendingUp
} from "lucide-react";

interface SyncComponent {
  id: string;
  name: string;
  status: 'synced' | 'syncing' | 'pending' | 'error';
  progress?: number;
  lastSync?: Date;
  size?: number;
}

interface EnhancedSyncStatusCardProps {
  detailed?: boolean;
}

export const EnhancedSyncStatusCard = ({ detailed = false }: EnhancedSyncStatusCardProps) => {
  const { isOnline, pendingSync, forceSync } = useDataPersistence();
  const [syncComponents, setSyncComponents] = useState<SyncComponent[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);

  // Mock sync components data
  useEffect(() => {
    const components: SyncComponent[] = [
      {
        id: 'agents',
        name: 'Agent Configurations',
        status: pendingSync > 0 ? 'syncing' : 'synced',
        progress: pendingSync > 0 ? 75 : 100,
        lastSync: new Date(Date.now() - 2 * 60 * 1000),
        size: 1.2
      },
      {
        id: 'tasks',
        name: 'Task Definitions',
        status: pendingSync > 2 ? 'pending' : 'synced',
        progress: pendingSync > 2 ? 0 : 100,
        lastSync: new Date(Date.now() - 5 * 60 * 1000),
        size: 0.8
      },
      {
        id: 'messages',
        name: 'Message History',
        status: pendingSync > 1 ? 'syncing' : 'synced',
        progress: pendingSync > 1 ? 45 : 100,
        lastSync: new Date(Date.now() - 1 * 60 * 1000),
        size: 3.4
      },
      {
        id: 'teams',
        name: 'Team Structure',
        status: 'synced',
        progress: 100,
        lastSync: new Date(Date.now() - 10 * 60 * 1000),
        size: 0.5
      }
    ];

    setSyncComponents(components);
    
    // Calculate overall progress
    const totalProgress = components.reduce((sum, comp) => sum + (comp.progress || 0), 0);
    setOverallProgress(totalProgress / components.length);
  }, [pendingSync]);

  const getStatusIcon = (status: SyncComponent['status']) => {
    switch (status) {
      case 'synced': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'syncing': return <RefreshCcw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: SyncComponent['status']) => {
    switch (status) {
      case 'synced': return 'default';
      case 'syncing': return 'default';
      case 'pending': return 'secondary';
      case 'error': return 'destructive';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Enhanced Sync Status
          </div>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <Badge variant={isOnline ? 'default' : 'destructive'}>
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Sync Progress</span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        {/* Component-specific sync status */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Component Synchronization
          </h4>
          
          {syncComponents.map((component) => (
            <div key={component.id} className="space-y-2 p-3 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(component.status)}
                  <span className="font-medium">{component.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(component.status) as any}>
                    {component.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {component.size}MB
                  </span>
                </div>
              </div>
              
              {detailed && component.status === 'syncing' && (
                <div className="space-y-1">
                  <Progress value={component.progress} className="h-1" />
                  <div className="text-xs text-muted-foreground">
                    {component.progress}% complete
                  </div>
                </div>
              )}
              
              {detailed && component.lastSync && (
                <div className="text-xs text-muted-foreground">
                  Last synced: {component.lastSync.toLocaleTimeString()}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sync Actions */}
        <div className="flex gap-2 pt-2 border-t">
          <Button
            onClick={forceSync}
            disabled={!isOnline}
            size="sm"
            className="flex-1"
          >
            <RefreshCcw className="w-4 h-4 mr-1" />
            Force Sync
          </Button>
          {!isOnline && (
            <Alert className="mt-2">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Offline mode active. Changes will sync when connection is restored.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
