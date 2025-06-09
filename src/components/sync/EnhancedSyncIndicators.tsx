
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { Wifi, WifiOff, RefreshCcw, AlertTriangle, CheckCircle, Clock, Zap } from "lucide-react";

interface SyncOperation {
  id: string;
  type: 'upload' | 'download' | 'merge' | 'conflict_resolution';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  progress: number;
  file?: string;
  error?: string;
  startTime: number;
  estimatedCompletion?: number;
}

export const EnhancedSyncIndicators = () => {
  const { isOnline, pendingSync, forceSync } = useDataPersistence();
  const [syncOperations, setSyncOperations] = useState<SyncOperation[]>([]);
  const [networkSpeed, setNetworkSpeed] = useState<'fast' | 'medium' | 'slow'>('medium');
  const [conflictCount, setConflictCount] = useState(0);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);

  // Simulate network speed detection
  useEffect(() => {
    const detectNetworkSpeed = () => {
      const connection = (navigator as any).connection;
      if (connection) {
        const speed = connection.effectiveType;
        setNetworkSpeed(
          speed === '4g' ? 'fast' :
          speed === '3g' ? 'medium' : 'slow'
        );
      }
    };

    detectNetworkSpeed();
    const interval = setInterval(detectNetworkSpeed, 30000);
    return () => clearInterval(interval);
  }, []);

  // Simulate sync operations
  useEffect(() => {
    if (pendingSync > 0) {
      const operations: SyncOperation[] = Array.from({ length: pendingSync }, (_, i) => ({
        id: `sync-${i}`,
        type: ['upload', 'download', 'merge'][Math.floor(Math.random() * 3)] as any,
        status: 'in_progress',
        progress: Math.random() * 100,
        file: `file-${i}.json`,
        startTime: Date.now() - Math.random() * 10000,
        estimatedCompletion: Date.now() + Math.random() * 30000
      }));
      setSyncOperations(operations);
    } else {
      setSyncOperations([]);
    }
  }, [pendingSync]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'in_progress': return <RefreshCcw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getNetworkSpeedColor = () => {
    switch (networkSpeed) {
      case 'fast': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'slow': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const handleRetrySync = (operationId: string) => {
    setSyncOperations(prev => 
      prev.map(op => 
        op.id === operationId 
          ? { ...op, status: 'in_progress', progress: 0, error: undefined }
          : op
      )
    );
  };

  const handleCancelSync = (operationId: string) => {
    setSyncOperations(prev => prev.filter(op => op.id !== operationId));
  };

  return (
    <div className="space-y-4">
      {/* Main Sync Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isOnline ? (
                <Wifi className="w-5 h-5 text-green-500" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-500" />
              )}
              Synchronization Status
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isOnline ? "default" : "destructive"}>
                {isOnline ? 'Online' : 'Offline'}
              </Badge>
              <Badge variant="outline" className={getNetworkSpeedColor()}>
                <Zap className="w-3 h-3 mr-1" />
                {networkSpeed} network
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Network Quality Indicator */}
          <div className="flex items-center justify-between text-sm">
            <span>Network Quality</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className={`w-2 h-4 rounded ${networkSpeed !== 'slow' ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div className={`w-2 h-4 rounded ${networkSpeed === 'fast' ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div className={`w-2 h-4 rounded ${networkSpeed === 'fast' ? 'bg-green-500' : 'bg-gray-300'}`} />
              </div>
              <span className={`font-medium ${getNetworkSpeedColor()}`}>
                {networkSpeed.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Auto Sync Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Auto-sync enabled</span>
            <Button
              variant={autoSyncEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setAutoSyncEnabled(!autoSyncEnabled)}
            >
              {autoSyncEnabled ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          {/* Conflict Warning */}
          {conflictCount > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {conflictCount} sync conflicts require resolution
              </AlertDescription>
            </Alert>
          )}

          {/* Force Sync Button */}
          <Button
            onClick={forceSync}
            disabled={!isOnline || syncOperations.length > 0}
            className="w-full"
          >
            {syncOperations.length > 0 ? 'Sync in Progress...' : 'Force Sync Now'}
          </Button>
        </CardContent>
      </Card>

      {/* Active Operations */}
      {syncOperations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Sync Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {syncOperations.map((operation) => (
              <div key={operation.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(operation.status)}
                    <span className="text-sm font-medium">
                      {operation.type.replace('_', ' ')}
                    </span>
                    {operation.file && (
                      <Badge variant="outline" className="text-xs">
                        {operation.file}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {operation.status === 'failed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRetrySync(operation.id)}
                      >
                        Retry
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCancelSync(operation.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
                
                {operation.status === 'in_progress' && (
                  <div className="space-y-1">
                    <Progress value={operation.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{Math.round(operation.progress)}%</span>
                      {operation.estimatedCompletion && (
                        <span>
                          ETA: {Math.max(0, Math.round((operation.estimatedCompletion - Date.now()) / 1000))}s
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {operation.error && (
                  <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                    {operation.error}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
