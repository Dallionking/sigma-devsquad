
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { Clock, Upload, Edit, Trash2, Plus, AlertCircle, CheckCircle } from "lucide-react";

interface QueuedAction {
  id: string;
  type: 'create' | 'update' | 'delete';
  entity: string;
  description: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  size: number; // in bytes
  status: 'pending' | 'retrying' | 'failed';
}

export const OfflineQueueVisualization = () => {
  const { pendingSync } = useDataPersistence();
  
  // Mock queued actions - in production, this would come from the sync context
  const [queuedActions] = useState<QueuedAction[]>([
    {
      id: '1',
      type: 'create',
      entity: 'Agent Configuration',
      description: 'Create new "Research Assistant" agent',
      timestamp: new Date(Date.now() - 5 * 60000),
      priority: 'high',
      size: 2048,
      status: 'pending'
    },
    {
      id: '2',
      type: 'update',
      entity: 'Task Assignment',
      description: 'Update task priority for "Data Analysis"',
      timestamp: new Date(Date.now() - 3 * 60000),
      priority: 'medium',
      size: 512,
      status: 'pending'
    },
    {
      id: '3',
      type: 'delete',
      entity: 'Message Thread',
      description: 'Delete conversation thread #47',
      timestamp: new Date(Date.now() - 1 * 60000),
      priority: 'low',
      size: 256,
      status: 'retrying'
    }
  ]);

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'create': return Plus;
      case 'update': return Edit;
      case 'delete': return Trash2;
      default: return Upload;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'retrying': return AlertCircle;
      case 'failed': return AlertCircle;
      default: return CheckCircle;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'low': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      default: return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'retrying': return 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300';
      case 'failed': return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      default: return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
    }
  };

  const totalSize = queuedActions.reduce((sum, action) => sum + action.size, 0);
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Queued Actions ({queuedActions.length})</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{formatBytes(totalSize)}</Badge>
            <Button size="sm" variant="outline">
              Clear Queue
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {queuedActions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No actions queued for sync</p>
          </div>
        ) : (
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {queuedActions.map((action, index) => {
                const ActionIcon = getActionIcon(action.type);
                const StatusIcon = getStatusIcon(action.status);
                
                return (
                  <div key={action.id}>
                    <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="p-2 bg-muted rounded-lg">
                        <ActionIcon className="w-4 h-4" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm truncate">
                            {action.entity}
                          </span>
                          <Badge className={getPriorityColor(action.priority)}>
                            {action.priority}
                          </Badge>
                          <Badge className={getStatusColor(action.status)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {action.status}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mb-2">
                          {action.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                            <span>{action.timestamp.toLocaleTimeString()}</span>
                            <span>{formatBytes(action.size)}</span>
                          </div>
                          
                          {action.status === 'failed' && (
                            <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                              Retry
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {index < queuedActions.length - 1 && <Separator className="my-2" />}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
