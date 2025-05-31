
import React from 'react';
import { SyncStatusIndicator } from "@/components/sync/SyncStatusIndicator";
import { ConnectionStatusBadge } from "@/components/sync/ConnectionStatusBadge";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";

export const SyncStatusHeader = () => {
  const { isOnline } = useDataPersistence();

  return (
    <div className="flex items-center space-x-4 px-4 py-2 bg-muted/30 border-b">
      <SyncStatusIndicator />
      <ConnectionStatusBadge 
        status={isOnline ? 'connected' : 'disconnected'}
        label={isOnline ? 'Online' : 'Offline'}
      />
    </div>
  );
};
