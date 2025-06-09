
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { 
  Wifi, 
  WifiOff, 
  ChevronDown, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Settings,
  Globe,
  Server,
  Database
} from "lucide-react";
import { cn } from "@/lib/utils";

export const ConnectionStatusHeader = () => {
  const { isOnline, pendingSync, forceSync } = useDataPersistence();
  const [isExpanded, setIsExpanded] = useState(false);

  const getConnectionConfig = () => {
    if (!isOnline) {
      return {
        icon: WifiOff,
        color: "text-red-500",
        bg: "bg-red-50 dark:bg-red-950",
        label: "Offline",
        description: "Working in offline mode"
      };
    }
    if (pendingSync > 0) {
      return {
        icon: RefreshCw,
        color: "text-yellow-500 animate-spin",
        bg: "bg-yellow-50 dark:bg-yellow-950",
        label: "Syncing",
        description: `${pendingSync} items pending sync`
      };
    }
    return {
      icon: CheckCircle,
      color: "text-green-500",
      bg: "bg-green-50 dark:bg-green-950",
      label: "Connected",
      description: "All systems operational"
    };
  };

  const config = getConnectionConfig();
  const StatusIcon = config.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-3 flex items-center gap-2 hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border/30"
        >
          {/* Status Indicator */}
          <div className={cn("p-1 rounded-full", config.bg, "flex items-center justify-center")}>
            <StatusIcon className={cn("w-3 h-3", config.color)} />
          </div>
          
          {/* Status Label */}
          <span className="text-xs font-medium text-foreground">
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
        <div className="p-4 border-b bg-gradient-to-r from-muted/30 to-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusIcon className={cn("w-4 h-4", config.color)} />
              <h3 className="font-semibold text-foreground">Connection Status</h3>
            </div>
            <Badge 
              variant={isOnline ? "default" : "destructive"} 
              className="text-xs"
            >
              {config.label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {config.description}
          </p>
        </div>
        
        {/* Connection Details */}
        <div className="p-4 space-y-4">
          {/* Service Status */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Service Status</h4>
            <div className="space-y-2">
              {/* API Connection */}
              <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                <div className="flex items-center gap-2">
                  <Globe className="w-3 h-3 text-blue-500" />
                  <span className="text-xs font-medium">API Gateway</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-600">Online</span>
                </div>
              </div>
              
              {/* WebSocket */}
              <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                <div className="flex items-center gap-2">
                  <Server className="w-3 h-3 text-purple-500" />
                  <span className="text-xs font-medium">WebSocket</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-600">Connected</span>
                </div>
              </div>
              
              {/* Database */}
              <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                <div className="flex items-center gap-2">
                  <Database className="w-3 h-3 text-orange-500" />
                  <span className="text-xs font-medium">Database</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-600">Synced</span>
                </div>
              </div>
            </div>
          </div>
          
          <DropdownMenuSeparator />
          
          {/* Actions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Actions</h4>
            <div className="space-y-1">
              <Button
                onClick={forceSync}
                disabled={!isOnline}
                size="sm"
                className="w-full justify-start h-8 text-xs"
                variant="outline"
              >
                <RefreshCw className="w-3 h-3 mr-2" />
                Force Sync
              </Button>
              
              <Button
                size="sm"
                className="w-full justify-start h-8 text-xs"
                variant="outline"
              >
                <Settings className="w-3 h-3 mr-2" />
                Connection Settings
              </Button>
            </div>
          </div>
          
          {/* Warning for offline mode */}
          {!isOnline && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-md border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-medium text-yellow-700 dark:text-yellow-300">Working Offline</p>
                  <p className="text-yellow-600 dark:text-yellow-400 mt-1">
                    Changes will sync automatically when connection is restored
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Connection Info */}
          <div className="pt-2 border-t text-xs text-muted-foreground">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-medium">Last sync:</span>
                <br />
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
              <div>
                <span className="font-medium">Latency:</span>
                <br />
                <span className="text-green-600">24ms</span>
              </div>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
