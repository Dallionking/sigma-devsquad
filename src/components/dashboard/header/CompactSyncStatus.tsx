
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SyncStatusIndicator } from "@/components/sync/SyncStatusIndicator";
import { ConnectionStatusBadge } from "@/components/sync/ConnectionStatusBadge";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { Wifi, WifiOff, ChevronDown, RefreshCw, AlertTriangle, CheckCircle, Settings } from "lucide-react";

export const CompactSyncStatus = () => {
  const { isOnline, pendingSync, forceSync } = useDataPersistence();

  const getSyncStatusConfig = () => {
    if (!isOnline) {
      return {
        icon: WifiOff,
        color: "text-red-500",
        bg: "bg-red-50 dark:bg-red-950",
        label: "Offline",
        statusText: "Working offline"
      };
    }
    if (pendingSync > 0) {
      return {
        icon: RefreshCw,
        color: "text-yellow-500 animate-spin",
        bg: "bg-yellow-50 dark:bg-yellow-950",
        label: "Syncing",
        statusText: `${pendingSync} pending`
      };
    }
    return {
      icon: CheckCircle,
      color: "text-green-500",
      bg: "bg-green-50 dark:bg-green-950",
      label: "Synced",
      statusText: "All data synced"
    };
  };

  const config = getSyncStatusConfig();
  const StatusIcon = config.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 px-2 flex items-center space-x-2 hover:bg-muted/50 transition-colors"
        >
          {/* Compact Status Indicator */}
          <div className={`p-1.5 rounded-full ${config.bg} flex items-center justify-center`}>
            <StatusIcon className={`w-3.5 h-3.5 ${config.color}`} />
          </div>
          
          {/* Status Text - Hidden on mobile */}
          <span className="hidden sm:inline text-xs font-medium text-muted-foreground">
            {config.label}
          </span>
          
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-80 bg-background border shadow-lg p-0 z-50"
      >
        {/* Header */}
        <div className="p-4 border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Sync Status</h3>
            <Badge 
              variant={isOnline ? "default" : "destructive"} 
              className="text-xs"
            >
              {config.label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {config.statusText}
          </p>
        </div>
        
        {/* Detailed Status Information */}
        <div className="p-4 space-y-4">
          {/* Connection Status */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Connection</h4>
            <ConnectionStatusBadge 
              status={isOnline ? 'connected' : 'disconnected'}
              label={isOnline ? 'Online - all systems operational' : 'Offline - working locally'}
            />
          </div>
          
          {/* Sync Details */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Synchronization</h4>
            <SyncStatusIndicator />
          </div>
          
          <DropdownMenuSeparator />
          
          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              onClick={forceSync}
              disabled={!isOnline}
              size="sm"
              className="w-full justify-start"
              variant="outline"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Force Sync Now
            </Button>
            
            {!isOnline && (
              <div className="flex items-start space-x-2 p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded-md">
                <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-yellow-700 dark:text-yellow-300">
                  <p className="font-medium">Working Offline</p>
                  <p>Changes will sync when connection is restored</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Troubleshooting */}
          <div className="pt-2 border-t">
            <h4 className="text-sm font-medium text-foreground mb-2">Troubleshooting</h4>
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs h-8"
              >
                <Settings className="w-3 h-3 mr-2" />
                Check Network Settings
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs h-8"
              >
                <RefreshCw className="w-3 h-3 mr-2" />
                Reset Sync Queue
              </Button>
            </div>
          </div>
          
          {/* Footer Info */}
          <div className="pt-2 border-t text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Last sync:</span>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
            {pendingSync > 0 && (
              <div className="flex justify-between mt-1">
                <span>Pending items:</span>
                <span>{pendingSync}</span>
              </div>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
