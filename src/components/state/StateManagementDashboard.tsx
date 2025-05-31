
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DetailedSyncStatus } from "@/components/sync/DetailedSyncStatus";
import { PresenceIndicators } from "@/components/collaboration/PresenceIndicators";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { 
  Database, 
  Users, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Save,
  RotateCcw,
  Shield
} from "lucide-react";

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
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
          {/* System Health Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>System Health</span>
                <Badge variant={stateHealth.overall === 'healthy' ? 'default' : 'destructive'}>
                  {stateHealth.overall}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-vibe-primary">
                    {stateHealth.metrics.totalOperations}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Operations</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {stateHealth.metrics.successfulOperations}
                  </div>
                  <div className="text-sm text-muted-foreground">Successful</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {stateHealth.metrics.failedOperations}
                  </div>
                  <div className="text-sm text-muted-foreground">Failed</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {stateHealth.metrics.averageResponseTime}ms
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Response</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Component Status</h4>
                {stateHealth.components.map((component, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(component.status)}
                      <div>
                        <div className="font-medium">{component.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Last updated: {component.lastUpdate.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={component.status === 'healthy' ? 'default' : 
                                    component.status === 'warning' ? 'secondary' : 'destructive'}>
                        {component.status}
                      </Badge>
                      {component.issues > 0 && (
                        <div className="text-xs text-red-600 mt-1">
                          {component.issues} issue{component.issues > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="flex flex-col items-center space-y-2 h-auto py-4">
                  <Save className="w-6 h-6" />
                  <span>Force Save</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
                  <RotateCcw className="w-6 h-6" />
                  <span>Restore State</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
                  <Database className="w-6 h-6" />
                  <span>Clear Cache</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center space-y-2 h-auto py-4">
                  <Activity className="w-6 h-6" />
                  <span>Run Diagnostics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <DetailedSyncStatus />
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-4">
          <PresenceIndicators />
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Performance Monitoring</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">
                      {performance?.monitoring?.metrics?.renderTime || 12}ms
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Render Time</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">
                      {performance?.monitoring?.metrics?.memoryUsage || 45}MB
                    </div>
                    <div className="text-sm text-muted-foreground">Memory Usage</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">
                      {performance?.batching?.getQueueStats?.()?.pendingBatches || 3}
                    </div>
                    <div className="text-sm text-muted-foreground">Pending Batches</div>
                  </div>
                </div>

                {/* Debug Information */}
                {debugger?.isCapturing && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Debug mode is active. {debugger.debugEntries?.length || 0} entries captured.
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-2"
                        onClick={debugger.exportDebugData}
                      >
                        Export Debug Data
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Event Bus Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Event Bus Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Listeners</span>
                  <Badge>{eventBus?.getActiveListeners?.()?.size || 0}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Recent Events</span>
                  <Badge>{eventBus?.getEventHistory?.()?.length || 0}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
