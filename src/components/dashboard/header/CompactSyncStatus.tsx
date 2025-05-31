
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SyncStatusIndicator } from "@/components/sync/SyncStatusIndicator";
import { ConnectionStatusBadge } from "@/components/sync/ConnectionStatusBadge";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { Wifi, WifiOff, ChevronDown } from "lucide-react";

export const CompactSyncStatus = () => {
  const { isOnline } = useDataPersistence();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 px-2">
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-green-600" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-600" />
            )}
            <span className="hidden sm:inline text-xs">
              {isOnline ? "Online" : "Offline"}
            </span>
            <ChevronDown className="w-3 h-3" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-background border shadow-lg p-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Connection Status</span>
            <Badge variant={isOnline ? "default" : "destructive"} className="text-xs">
              {isOnline ? "Connected" : "Disconnected"}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <SyncStatusIndicator />
            <ConnectionStatusBadge 
              status={isOnline ? 'connected' : 'disconnected'}
              label={isOnline ? 'All systems operational' : 'Working offline'}
            />
          </div>
          
          <div className="pt-2 border-t text-xs text-muted-foreground">
            Last sync: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
