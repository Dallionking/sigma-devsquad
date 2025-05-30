
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface ConnectionStatusActionsProps {
  connectionStatus: string;
}

export const ConnectionStatusActions = ({ connectionStatus }: ConnectionStatusActionsProps) => {
  const connectionStatuses = {
    connected: { badge: "status-success" },
    connecting: { badge: "status-warning" },
    disconnected: { badge: "status-error" }
  };

  const statusConfig = connectionStatuses[connectionStatus as keyof typeof connectionStatuses];

  return (
    <div className="flex items-center space-x-3 w-full sm:w-auto">
      <Badge 
        variant={connectionStatus === "connected" ? "default" : "secondary"}
        className={`${statusConfig.badge} px-3 py-1 font-medium transition-all duration-200 hover:scale-105`}
      >
        {connectionStatus === "connected" ? "Active" : "Inactive"}
      </Badge>
      
      <Button 
        variant="outline" 
        size="sm"
        className="btn-secondary-enhanced gap-2 min-w-fit hover-scale"
        aria-label={`Configure ${connectionStatus} IDE connection`}
      >
        <Settings className="w-4 h-4" />
        <span className="hidden sm:inline">Configure</span>
      </Button>
    </div>
  );
};
