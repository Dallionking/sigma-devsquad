
import { Card, CardContent } from "@/components/ui/card";
import { ConnectionStatusIcon } from "./ConnectionStatusIcon";
import { ConnectionStatusInfo } from "./ConnectionStatusInfo";
import { ConnectionStatusActions } from "./ConnectionStatusActions";
import { ConnectionStatusDetails } from "./ConnectionStatusDetails";

interface ConnectionStatusBannerProps {
  connectionStatus: string;
}

export const ConnectionStatusBanner = ({ connectionStatus }: ConnectionStatusBannerProps) => {
  const connectionStatuses = {
    connected: { 
      bg: "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900",
      pulse: "animate-pulse-subtle"
    },
    connecting: { 
      bg: "bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900",
      pulse: "animate-pulse"
    },
    disconnected: { 
      bg: "bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950 dark:to-red-900",
      pulse: ""
    }
  };

  const statusConfig = connectionStatuses[connectionStatus as keyof typeof connectionStatuses];

  return (
    <Card className={`card-enhanced border-2 ${statusConfig.bg} ${statusConfig.pulse} transition-all duration-300`}>
      <CardContent className="p-responsive">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-start sm:items-center space-x-4 flex-1">
            <ConnectionStatusIcon connectionStatus={connectionStatus} />
            <ConnectionStatusInfo connectionStatus={connectionStatus} />
          </div>
          
          <ConnectionStatusActions connectionStatus={connectionStatus} />
        </div>
        
        <ConnectionStatusDetails connectionStatus={connectionStatus} />
      </CardContent>
    </Card>
  );
};
