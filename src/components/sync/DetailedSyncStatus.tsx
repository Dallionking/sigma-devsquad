
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Database,
  FileText,
  Users,
  Settings,
  Activity,
  Wifi
} from "lucide-react";

interface SyncActivity {
  id: string;
  type: 'component' | 'data' | 'config' | 'user_action';
  component: string;
  action: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  progress?: number;
  timestamp: Date;
  duration?: number;
  details?: string;
  userId?: string;
}

interface ComponentSyncStatus {
  component: string;
  status: 'synced' | 'syncing' | 'error' | 'pending';
  lastSync: Date;
  itemCount: number;
  syncedItems: number;
}

export const DetailedSyncStatus = () => {
  const { isOnline, pendingSync, forceSync } = useDataPersistence();
  const [syncActivities, setSyncActivities] = useState<SyncActivity[]>([]);
  const [componentStatus, setComponentStatus] = useState<ComponentSyncStatus[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock sync activities for demonstration
  useEffect(() => {
    const mockActivities: SyncActivity[] = [
      {
        id: '1',
        type: 'component',
        component: 'Agent Management',
        action: 'Syncing agent configurations',
        status: 'in_progress',
        progress: 75,
        timestamp: new Date(Date.now() - 30000),
        userId: 'user-1'
      },
      {
        id: '2',
        type: 'data',
        component: 'Task Management',
        action: 'Uploading task updates',
        status: 'completed',
        timestamp: new Date(Date.now() - 120000),
        duration: 2300,
        userId: 'user-2'
      },
      {
        id: '3',
        type: 'config',
        component: 'Team Settings',
        action: 'Synchronizing team preferences',
        status: 'failed',
        timestamp: new Date(Date.now() - 180000),
        details: 'Network timeout during upload',
        userId: 'user-1'
      }
    ];
    setSyncActivities(mockActivities);

    const mockComponentStatus: ComponentSyncStatus[] = [
      {
        component: 'Agents',
        status: 'syncing',
        lastSync: new Date(Date.now() - 30000),
        itemCount: 15,
        syncedItems: 12
      },
      {
        component: 'Tasks',
        status: 'synced',
        lastSync: new Date(Date.now() - 120000),
        itemCount: 47,
        syncedItems: 47
      },
      {
        component: 'Messages',
        status: 'error',
        lastSync: new Date(Date.now() - 300000),
        itemCount: 23,
        syncedItems: 20
      },
      {
        component: 'Teams',
        status: 'pending',
        lastSync: new Date(Date.now() - 600000),
        itemCount: 8,
        syncedItems: 8
      }
    ];
    setComponentStatus(mockComponentStatus);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'synced':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in_progress':
      case 'syncing':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'failed':
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'component': return <Settings className="w-4 h-4" />;
      case 'data': return <Database className="w-4 h-4" />;
      case 'config': return <FileText className="w-4 h-4" />;
      case 'user_action': return <Users className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wifi className={`w-5 h-5 ${isOnline ? 'text-green-500' : 'text-red-500'}`} />
            <span>Synchronization Dashboard</span>
          </div>
          <Badge variant={isOnline ? "default" : "destructive"}>
            {isOnline ? 'Online' : 'Offline'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {componentStatus.filter(c => c.status === 'synced').length}
                </div>
                <div className="text-sm text-muted-foreground">Synced</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {componentStatus.filter(c => c.status === 'syncing').length}
                </div>
                <div className="text-sm text-muted-foreground">Syncing</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {componentStatus.filter(c => c.status === 'pending').length}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {componentStatus.filter(c => c.status === 'error').length}
                </div>
                <div className="text-sm text-muted-foreground">Errors</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Overall Progress</h4>
              <Progress 
                value={
                  (componentStatus.reduce((acc, c) => acc + c.syncedItems, 0) / 
                   componentStatus.reduce((acc, c) => acc + c.itemCount, 0)) * 100
                } 
                className="h-3"
              />
            </div>

            <Button onClick={forceSync} disabled={!isOnline} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Force Sync All Components
            </Button>
          </TabsContent>

          <TabsContent value="components" className="space-y-4 mt-4">
            <div className="space-y-3">
              {componentStatus.map((component, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(component.status)}
                      <span className="font-medium">{component.component}</span>
                    </div>
                    <Badge variant={
                      component.status === 'synced' ? 'default' :
                      component.status === 'syncing' ? 'secondary' :
                      component.status === 'error' ? 'destructive' : 'outline'
                    }>
                      {component.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Items: {component.syncedItems}/{component.itemCount}</span>
                      <span>Last sync: {component.lastSync.toLocaleTimeString()}</span>
                    </div>
                    <Progress 
                      value={(component.syncedItems / component.itemCount) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-4">
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {syncActivities.map((activity) => (
                  <div key={activity.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="flex items-center space-x-1 mt-1">
                          {getStatusIcon(activity.status)}
                          {getTypeIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{activity.component}</div>
                          <div className="text-sm text-muted-foreground">{activity.action}</div>
                          {activity.details && (
                            <div className="text-xs text-red-600 mt-1">{activity.details}</div>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        <div>{activity.timestamp.toLocaleTimeString()}</div>
                        {activity.duration && (
                          <div>{formatDuration(activity.duration)}</div>
                        )}
                      </div>
                    </div>
                    {activity.progress !== undefined && activity.status === 'in_progress' && (
                      <div className="mt-2">
                        <Progress value={activity.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
