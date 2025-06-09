
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { useToast } from "@/hooks/use-toast";
import { Wifi, RefreshCcw, CheckCircle, AlertCircle, Clock } from "lucide-react";

interface SyncProgress {
  phase: 'connecting' | 'fetching' | 'merging' | 'uploading' | 'complete';
  progress: number;
  currentAction: string;
  itemsProcessed: number;
  totalItems: number;
}

export const ReconnectionSyncStatus = () => {
  const { isOnline, pendingSync, forceSync } = useDataPersistence();
  const { toast } = useToast();
  const [syncProgress, setSyncProgress] = useState<SyncProgress>({
    phase: 'connecting',
    progress: 0,
    currentAction: 'Establishing connection...',
    itemsProcessed: 0,
    totalItems: 0
  });
  const [lastReconnection, setLastReconnection] = useState<Date | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Simulate sync progress when coming back online
  useEffect(() => {
    if (isOnline && pendingSync > 0 && !isSyncing) {
      setIsSyncing(true);
      setLastReconnection(new Date());
      simulateSync();
    }
  }, [isOnline, pendingSync, isSyncing]);

  const simulateSync = async () => {
    const phases = [
      { phase: 'connecting', action: 'Establishing secure connection...', duration: 1000 },
      { phase: 'fetching', action: 'Fetching remote changes...', duration: 2000 },
      { phase: 'merging', action: 'Merging local and remote data...', duration: 3000 },
      { phase: 'uploading', action: 'Uploading queued changes...', duration: 2500 },
      { phase: 'complete', action: 'Synchronization complete', duration: 500 }
    ];

    for (const phaseInfo of phases) {
      setSyncProgress(prev => ({
        ...prev,
        phase: phaseInfo.phase as any,
        currentAction: phaseInfo.action,
        totalItems: pendingSync
      }));

      // Simulate progress within each phase
      const steps = 20;
      for (let i = 0; i <= steps; i++) {
        await new Promise(resolve => setTimeout(resolve, phaseInfo.duration / steps));
        const phaseProgress = (i / steps) * 100;
        const overallProgress = (phases.indexOf(phaseInfo) * 100 + phaseProgress) / phases.length;
        
        setSyncProgress(prev => ({
          ...prev,
          progress: Math.round(overallProgress),
          itemsProcessed: Math.floor((overallProgress / 100) * pendingSync)
        }));
      }
    }

    toast({
      title: "Sync Complete",
      description: `Successfully synchronized ${pendingSync} changes`,
    });

    setTimeout(() => {
      setIsSyncing(false);
      setSyncProgress({
        phase: 'connecting',
        progress: 0,
        currentAction: 'Ready to sync',
        itemsProcessed: 0,
        totalItems: 0
      });
    }, 2000);
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'connecting': return Wifi;
      case 'fetching':
      case 'uploading': return RefreshCcw;
      case 'merging': return Clock;
      case 'complete': return CheckCircle;
      default: return AlertCircle;
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'complete': return 'text-green-600';
      case 'connecting': return 'text-blue-600';
      default: return 'text-yellow-600';
    }
  };

  if (!isOnline) return null;

  return (
    <Card className="w-full bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Wifi className="w-4 h-4 text-green-600" />
            <span className="text-green-700 dark:text-green-300">Connection Restored</span>
          </div>
          {lastReconnection && (
            <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
              {lastReconnection.toLocaleTimeString()}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {isSyncing ? (
          <>
            <div className="flex items-center space-x-3">
              {React.createElement(getPhaseIcon(syncProgress.phase), {
                className: `w-5 h-5 ${getPhaseColor(syncProgress.phase)} ${
                  syncProgress.phase !== 'complete' ? 'animate-spin' : ''
                }`
              })}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{syncProgress.currentAction}</span>
                  <span className="text-xs text-muted-foreground">
                    {syncProgress.progress}%
                  </span>
                </div>
                <Progress value={syncProgress.progress} className="h-2" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {syncProgress.itemsProcessed} of {syncProgress.totalItems} items processed
              </span>
              <span className="capitalize">{syncProgress.phase} phase</span>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-700 dark:text-green-300">
                All data synchronized
              </span>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={forceSync}
              className="border-green-200 hover:bg-green-100 dark:border-green-800 dark:hover:bg-green-900"
            >
              <RefreshCcw className="w-4 h-4 mr-1" />
              Sync Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
