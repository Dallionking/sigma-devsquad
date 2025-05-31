import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { PerformanceMonitoringCard } from "./PerformanceMonitoringCard";
import { EnhancedSyncStatusCard } from "./EnhancedSyncStatusCard";
import { SyncActivityLog } from "./SyncActivityLog";
import { SyncTroubleshootingPanel } from "./SyncTroubleshootingPanel";
import { Database, RotateCcw, Activity, Settings, AlertTriangle, CheckCircle } from "lucide-react";

export const StateManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { 
    isOnline, 
    pendingSync, 
    forceSync, 
    performance,
    debugger: stateDebugger 
  } = useDataPersistence();

  const getSyncStatus = () => {
    if (!isOnline) return { status: 'offline', color: 'destructive', icon: AlertTriangle };
    if (pendingSync > 0) return { status: 'syncing', color: 'warning', icon: RotateCcw };
    return { status: 'synced', color: 'default', icon: CheckCircle };
  };

  const syncStatus = getSyncStatus();
  const StatusIcon = syncStatus.icon;

  return (
    <div className="space-y-6">
      {/* Header with Status Overview */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">State Management Dashboard</h2>
          <p className="text-muted-foreground">Monitor synchronization, performance, and debugging</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={syncStatus.color as any} className="flex items-center gap-1">
            <StatusIcon className="w-3 h-3" />
            {syncStatus.status.toUpperCase()}
          </Badge>
          {pendingSync > 0 && (
            <Badge variant="outline">
              {pendingSync} pending
            </Badge>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Sync Status</span>
            </div>
            <div className="text-2xl font-bold mt-1">
              {isOnline ? 'Online' : 'Offline'}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Pending Items</span>
            </div>
            <div className="text-2xl font-bold mt-1">{pendingSync}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Debug Entries</span>
            </div>
            <div className="text-2xl font-bold mt-1">{stateDebugger.debugEntries.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Performance</span>
            </div>
            <div className="text-2xl font-bold mt-1">
              {performance.monitoring.metrics?.averageRenderTime?.toFixed(0) || 0}ms
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sync">Sync Details</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EnhancedSyncStatusCard />
            <PerformanceMonitoringCard />
          </div>
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <EnhancedSyncStatusCard detailed={true} />
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <SyncActivityLog />
        </TabsContent>

        <TabsContent value="troubleshooting" className="space-y-4">
          <SyncTroubleshootingPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};
