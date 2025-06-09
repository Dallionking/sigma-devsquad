
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { SyncStatusIndicator } from "./SyncStatusIndicator";
import { ConnectionStatusBadge } from "./ConnectionStatusBadge";
import { SyncLoadingStates } from "./SyncLoadingStates";
import { ConflictResolutionDialog } from "./ConflictResolutionDialog";
import { OfflineModeIndicator } from "./OfflineModeIndicator";
import { RecoveryActions } from "./RecoveryActions";
import { ChevronDown, Settings } from "lucide-react";

export const SyncStatusPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConflictDialog, setShowConflictDialog] = useState(false);
  const { isOnline } = useDataPersistence();

  // Mock data for demonstration - in real app, this would come from context
  const mockConflicts = [
    {
      id: '1',
      file: 'agent-config.json',
      localVersion: { name: 'Local Agent', version: '1.0' },
      remoteVersion: { name: 'Remote Agent', version: '1.1' },
      timestamp: new Date().toISOString(),
      conflictType: 'edit' as const
    }
  ];

  const mockOperations = [
    {
      type: 'sync' as const,
      label: 'Syncing agent configurations',
      progress: 65,
      isActive: !isOnline || false
    }
  ];

  const handleResolveConflict = (conflictId: string, resolution: 'local' | 'remote' | 'merge') => {
    console.log('Resolving conflict:', conflictId, 'with:', resolution);
    // Implementation would be handled by the data persistence context
  };

  return (
    <div className="space-y-4">
      <OfflineModeIndicator />
      
      <Card>
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CardTitle className="text-sm">Synchronization Status</CardTitle>
                  <SyncStatusIndicator />
                </div>
                <div className="flex items-center space-x-2">
                  <ConnectionStatusBadge 
                    status={isOnline ? 'connected' : 'disconnected'}
                    showIcon={false}
                  />
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-4">
              <SyncLoadingStates operations={mockOperations} />
              
              {mockConflicts.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div>
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                      {mockConflicts.length} sync conflicts detected
                    </span>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">
                      Manual resolution required
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setShowConflictDialog(true)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    Resolve
                  </Button>
                </div>
              )}
              
              <RecoveryActions />
              
              <div className="flex justify-between items-center pt-2 border-t">
                <div className="text-xs text-muted-foreground">
                  Last sync: {new Date().toLocaleTimeString()}
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4 mr-1" />
                  Sync Settings
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      <ConflictResolutionDialog
        isOpen={showConflictDialog}
        onClose={() => setShowConflictDialog(false)}
        conflicts={mockConflicts}
        onResolve={handleResolveConflict}
      />
    </div>
  );
};
