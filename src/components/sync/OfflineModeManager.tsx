
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { OfflineModeIndicator } from "./OfflineModeIndicator";
import { OfflineQueueVisualization } from "./OfflineQueueVisualization";
import { ReconnectionSyncStatus } from "./ReconnectionSyncStatus";
import { OfflineCapabilityIndicators } from "./OfflineCapabilityIndicators";
import { DataPrioritizationSettings } from "./DataPrioritizationSettings";
import { BackgroundSyncOptions } from "./BackgroundSyncOptions";

export const OfflineModeManager = () => {
  const { isOnline } = useDataPersistence();
  const [activeTab, setActiveTab] = useState('status');

  return (
    <div className="space-y-4">
      <OfflineModeIndicator />
      {isOnline && <ReconnectionSyncStatus />}
      
      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
            <TabsTrigger value="priority">Priority</TabsTrigger>
            <TabsTrigger value="sync">Sync Options</TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="space-y-4 mt-6">
            <OfflineQueueVisualization />
          </TabsContent>

          <TabsContent value="capabilities" className="space-y-4 mt-6">
            <OfflineCapabilityIndicators />
          </TabsContent>

          <TabsContent value="priority" className="space-y-4 mt-6">
            <DataPrioritizationSettings />
          </TabsContent>

          <TabsContent value="sync" className="space-y-4 mt-6">
            <BackgroundSyncOptions />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
