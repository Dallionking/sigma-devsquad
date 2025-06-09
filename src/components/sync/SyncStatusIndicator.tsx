
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { WifiOff, Wifi, RefreshCcw, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export const SyncStatusIndicator = () => {
  const { isOnline, pendingSync, forceSync } = useDataPersistence();

  const getSyncStatus = () => {
    if (!isOnline) return 'offline';
    if (pendingSync > 0) return 'syncing';
    return 'synced';
  };

  const syncStatus = getSyncStatus();

  const statusConfig = {
    offline: {
      icon: WifiOff,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-950',
      badge: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
      text: 'Offline'
    },
    syncing: {
      icon: RefreshCcw,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50 dark:bg-yellow-950',
      badge: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
      text: `Syncing (${pendingSync} pending)`
    },
    synced: {
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-950',
      badge: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
      text: 'Synced'
    }
  };

  const config = statusConfig[syncStatus];
  const StatusIcon = config.icon;

  return (
    <div className="flex items-center space-x-2">
      <div className={`p-1 rounded-full ${config.bg}`}>
        <StatusIcon 
          className={`w-4 h-4 ${config.color} ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} 
        />
      </div>
      <Badge className={config.badge}>
        {config.text}
      </Badge>
      {!isOnline && (
        <Button
          size="sm"
          variant="outline"
          onClick={forceSync}
          className="text-xs"
        >
          Retry
        </Button>
      )}
    </div>
  );
};
