
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DetailedSyncStatus } from "@/components/sync/DetailedSyncStatus";
import { PresenceIndicators } from "@/components/collaboration/PresenceIndicators";
import { SystemHealthCard } from "./SystemHealthCard";
import { QuickActionsCard } from "./QuickActionsCard";
import { PerformanceMonitoringCard } from "./PerformanceMonitoringCard";
import { EventBusActivityCard } from "./EventBusActivityCard";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";

export const StateManagementDashboard = () => {
  const { 
    isOnline, 
    pendingSync, 
    eventBus,
    debugger,
    performance 
  } = useDataPersistence();
  
  const [activeTab, setActiveTab] = useState('overview');

  // Mock state health data
  const stateHealth = {
    overall: 'healthy' as const,
    components: [
      { name: 'Agent Management', status: 'healthy' as const, lastUpdate: new Date(), issues: 0 },
      { name: 'Task Management', status: 'warning' as const, lastUpdate: new Date(Date.now() - 300000), issues: 1 },
      { name: 'Team Management', status: 'healthy' as const, lastUpdate: new Date(Date.now() - 60000), issues: 0 },
      { name: 'Message System', status: 'error' as const, lastUpdate: new Date(Date.now() - 600000), issues: 2 }
    ],
    metrics: {
      totalOperations: 1247,
      successfulOperations: 1225,
      failedOperations: 22,
      averageResponseTime: 142
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-vibe-primary">State Management Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Badge variant={isOnline ? "default" : "destructive"}>
            {isOnline ? 'Online' : 'Offline'}
          </Badge>
          {pendingSync > 0 && (
            <Badge variant="secondary">
              {pendingSync} pending
            </Badge>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sync">Synchronization</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <SystemHealthCard stateHealth={stateHealth} />
          <QuickActionsCard />
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <DetailedSyncStatus />
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-4">
          <PresenceIndicators />
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <PerformanceMonitoringCard performance={performance} debugger={debugger} />
          <EventBusActivityCard eventBus={eventBus} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
