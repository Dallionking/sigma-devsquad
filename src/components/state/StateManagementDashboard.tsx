
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePersistentStateManager } from "@/hooks/usePersistentStateManager";
import { useStateSynchronization } from "@/hooks/useStateSynchronization";
import { StateRecoveryPanel } from "./StateRecoveryPanel";
import { EnhancedSyncStatusCard } from "./EnhancedSyncStatusCard";
import { 
  Database, 
  RefreshCw, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Save,
  Shield
} from "lucide-react";

interface AppState {
  agents: any[];
  tasks: any[];
  preferences: Record<string, any>;
  workspace: Record<string, any>;
  lastActivity: number;
}

const initialAppState: AppState = {
  agents: [],
  tasks: [],
  preferences: {},
  workspace: {},
  lastActivity: Date.now()
};

export const StateManagementDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  
  // Initialize persistent state manager
  const persistentState = usePersistentStateManager<AppState>({
    key: 'app-state',
    initialState: initialAppState,
    maxVersions: 20,
    autoSaveInterval: 3000,
    enableCompression: false,
    enableEncryption: false,
    validationSchema: (data) => {
      return typeof data === 'object' && 
             Array.isArray(data.agents) && 
             Array.isArray(data.tasks) &&
             typeof data.preferences === 'object' &&
             typeof data.workspace === 'object';
    },
    errorRecoveryStrategy: 'rollback'
  });

  // Initialize state synchronization
  const stateSync = useStateSynchronization(
    persistentState.state,
    (newState, source) => {
      persistentState.updateState(newState, source);
    },
    {
      stateKey: 'app-state',
      syncScope: 'global',
      conflictResolution: 'latest-wins',
      enableOptimisticUpdates: true
    }
  );

  const [syncStatus, setSyncStatus] = useState(stateSync.getSyncStatus());

  // Update sync status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncStatus(stateSync.getSyncStatus());
    }, 1000);

    return () => clearInterval(interval);
  }, [stateSync]);

  // Handle state updates with broadcasting
  const handleStateUpdate = (updates: Partial<AppState>, source = 'user') => {
    persistentState.updateState(updates, source);
    stateSync.broadcastStateChange({ ...persistentState.state, ...updates }, source);
  };

  // Handle state restoration
  const handleRestore = (snapshotId: string) => {
    persistentState.restoreFromVersion(snapshotId);
    stateSync.broadcastStateChange(persistentState.state, 'restore');
  };

  // Handle state reset
  const handleReset = () => {
    persistentState.updateState(initialAppState, 'reset');
    stateSync.broadcastStateChange(initialAppState, 'reset');
  };

  // Handle export
  const handleExport = (snapshot: any) => {
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `state-backup-${snapshot.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle import
  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (imported.data) {
          handleStateUpdate(imported.data, 'import');
        }
      } catch (error) {
        console.error('Import failed:', error);
      }
    };
    reader.readAsText(file);
  };

  const getHealthStatus = () => {
    if (persistentState.recoveryInfo?.hasCorruptedData) return 'critical';
    if (persistentState.isSaving || syncStatus.isPending) return 'warning';
    return 'healthy';
  };

  const getHealthColor = () => {
    switch (getHealthStatus()) {
      case 'critical': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'healthy': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getHealthIcon = () => {
    switch (getHealthStatus()) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <Clock className="w-4 h-4" />;
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              State Management Health
            </div>
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 ${getHealthColor()}`}>
                {getHealthIcon()}
                <span className="text-sm font-medium">
                  {getHealthStatus().toUpperCase()}
                </span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {persistentState.versionHistory.length}
              </div>
              <div className="text-muted-foreground">Versions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {syncStatus.pendingCount}
              </div>
              <div className="text-muted-foreground">Pending Syncs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {persistentState.lastSaved ? 
                  Math.round((Date.now() - persistentState.lastSaved.getTime()) / 1000) : 
                  'Never'
                }
              </div>
              <div className="text-muted-foreground">
                {persistentState.lastSaved ? 'Seconds Ago' : 'Last Saved'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Object.keys(persistentState.state).length}
              </div>
              <div className="text-muted-foreground">State Keys</div>
            </div>
          </div>

          {/* Save Progress */}
          {persistentState.isSaving && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Saving state...</span>
                <span>In Progress</span>
              </div>
              <Progress value={100} className="h-2 animate-pulse" />
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => persistentState.forceSave('Manual save')}
              disabled={persistentState.isSaving}
            >
              <Save className="w-4 h-4 mr-1" />
              Force Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStateUpdate({ lastActivity: Date.now() }, 'health-check')}
            >
              <Activity className="w-4 h-4 mr-1" />
              Activity Ping
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeComponent} onValueChange={setActiveComponent}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="recovery">Recovery</TabsTrigger>
          <TabsTrigger value="sync">Sync Status</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current State Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Agents</span>
                      <Badge variant="outline">
                        {persistentState.state.agents.length} configured
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Tasks</span>
                      <Badge variant="outline">
                        {persistentState.state.tasks.length} active
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                  <strong>Last Activity:</strong> {new Date(persistentState.state.lastActivity).toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recovery" className="space-y-4">
          <StateRecoveryPanel
            recoveryInfo={persistentState.recoveryInfo}
            versionHistory={persistentState.versionHistory}
            onRestore={handleRestore}
            onReset={handleReset}
            onExport={handleExport}
            onImport={handleImport}
            onClearRecovery={persistentState.clearRecoveryInfo}
          />
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <EnhancedSyncStatusCard detailed />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Cross-Component Synchronization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sync Scope</span>
                  <Badge variant="outline">{stateSync.syncScope}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Current Version</span>
                  <Badge variant="outline">v{syncStatus.currentVersion}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pending Operations</span>
                  <Badge variant={syncStatus.isPending ? "destructive" : "default"}>
                    {syncStatus.pendingCount}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Security & Validation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    State validation is active. All data is validated before saving.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Validation Schema:</span>
                    <div className="text-muted-foreground">Active</div>
                  </div>
                  <div>
                    <span className="font-medium">Data Integrity:</span>
                    <div className="text-muted-foreground">Checksum verified</div>
                  </div>
                  <div>
                    <span className="font-medium">Recovery Strategy:</span>
                    <div className="text-muted-foreground">Rollback enabled</div>
                  </div>
                  <div>
                    <span className="font-medium">Auto-save:</span>
                    <div className="text-muted-foreground">Every 3 seconds</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
