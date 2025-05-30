
import { Badge } from "@/components/ui/badge";

interface ConnectionStatusInfoProps {
  connectionStatus: string;
}

export const ConnectionStatusInfo = ({ connectionStatus }: ConnectionStatusInfoProps) => {
  const connectionStatuses = {
    connected: { 
      color: "text-green-600 dark:text-green-400", 
      badge: "status-success"
    },
    connecting: { 
      color: "text-yellow-600 dark:text-yellow-400", 
      badge: "status-warning"
    },
    disconnected: { 
      color: "text-red-600 dark:text-red-400", 
      badge: "status-error"
    }
  };

  const statusConfig = connectionStatuses[connectionStatus as keyof typeof connectionStatuses];

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-3 mb-2">
        <h3 className="heading-secondary text-xl sm:text-2xl text-foreground">
          VS Code Integration
        </h3>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <p className="text-muted-enhanced">
          Connection Status: 
          <span className={`ml-2 font-semibold capitalize ${statusConfig.color}`}>
            {connectionStatus}
          </span>
        </p>
        
        {connectionStatus === 'connected' && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-subtle"></div>
            <span>Live sync active</span>
          </div>
        )}
      </div>
    </div>
  );
};
