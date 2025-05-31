
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useStateStore } from '@/contexts/StateStoreContext';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { Wifi, WifiOff, Clock, AlertCircle, CheckCircle, Users } from 'lucide-react';

export const SyncStatusIndicator = () => {
  const { state } = useStateStore();
  const { isConnected, presence, conflicts, pendingActions, connect, disconnect } = useRealtimeSync();
  
  const getStatusIcon = () => {
    if (!isConnected) return <WifiOff className="w-4 h-4" />;
    if (conflicts.length > 0) return <AlertCircle className="w-4 h-4" />;
    if (pendingActions.length > 0) return <Clock className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };
  
  const getStatusColor = () => {
    if (!isConnected) return 'destructive';
    if (conflicts.length > 0) return 'destructive';
    if (pendingActions.length > 0) return 'secondary';
    return 'default';
  };
  
  const getStatusText = () => {
    if (!isConnected) return 'Offline';
    if (conflicts.length > 0) return `${conflicts.length} conflicts`;
    if (pendingActions.length > 0) return `${pendingActions.length} pending`;
    return 'Synced';
  };
  
  const activeUsers = Object.keys(presence).length;
  const lastSync = new Date(state.realtime.lastSync).toLocaleTimeString();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8">
          <Badge variant={getStatusColor()} className="flex items-center space-x-1">
            {getStatusIcon()}
            <span>{getStatusText()}</span>
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Sync Status</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Connection</span>
                <Badge variant={isConnected ? 'default' : 'destructive'}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Sync</span>
                <span className="text-sm text-muted-foreground">{lastSync}</span>
              </div>
              
              {pendingActions.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pending Actions</span>
                  <Badge variant="secondary">{pendingActions.length}</Badge>
                </div>
              )}
              
              {conflicts.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">Conflicts</span>
                  <Badge variant="destructive">{conflicts.length}</Badge>
                </div>
              )}
            </div>
          </div>
          
          {activeUsers > 0 && (
            <div>
              <h4 className="font-medium mb-2 flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Active Users ({activeUsers})</span>
              </h4>
              <div className="space-y-1">
                {Object.entries(presence).map(([userId, userData]: [string, any]) => (
                  <div key={userId} className="flex items-center justify-between text-sm">
                    <span>{userData.name || userId}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-muted-foreground">
                        {userData.lastSeen && new Date(userData.lastSeen).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex space-x-2 pt-2">
            {isConnected ? (
              <Button variant="outline" size="sm" onClick={disconnect}>
                <WifiOff className="w-4 h-4 mr-2" />
                Disconnect
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={connect}>
                <Wifi className="w-4 h-4 mr-2" />
                Reconnect
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
