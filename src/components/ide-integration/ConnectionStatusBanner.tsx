
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, XCircle, Settings, Wifi, WifiOff } from "lucide-react";

interface ConnectionStatusBannerProps {
  connectionStatus: string;
}

export const ConnectionStatusBanner = ({ connectionStatus }: ConnectionStatusBannerProps) => {
  const connectionStatuses = {
    connected: { 
      icon: CheckCircle, 
      color: "text-green-600 dark:text-green-400", 
      bg: "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900",
      badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      pulse: "animate-pulse-subtle"
    },
    connecting: { 
      icon: AlertCircle, 
      color: "text-yellow-600 dark:text-yellow-400", 
      bg: "bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900",
      badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      pulse: "animate-pulse"
    },
    disconnected: { 
      icon: XCircle, 
      color: "text-red-600 dark:text-red-400", 
      bg: "bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950 dark:to-red-900",
      badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      pulse: ""
    }
  };

  const statusConfig = connectionStatuses[connectionStatus as keyof typeof connectionStatuses];
  const StatusIcon = statusConfig.icon;
  const ConnectivityIcon = connectionStatus === 'connected' ? Wifi : WifiOff;

  return (
    <Card className={`card-enhanced border-2 ${statusConfig.bg} ${statusConfig.pulse} transition-all duration-300`}>
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          {/* Status Information */}
          <div className="flex items-start sm:items-center space-x-4 flex-1">
            {/* Status Icon */}
            <div className={`p-3 rounded-full bg-background/80 backdrop-blur-sm shadow-md ${statusConfig.pulse}`}>
              <StatusIcon className={`w-6 h-6 sm:w-7 sm:h-7 ${statusConfig.color}`} />
            </div>
            
            {/* Status Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="heading-secondary text-xl sm:text-2xl text-foreground">
                  VS Code Integration
                </h3>
                <ConnectivityIcon className={`w-5 h-5 ${statusConfig.color} hidden sm:block`} />
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
          </div>
          
          {/* Action Controls */}
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
              className="btn-secondary-enhanced gap-2 min-w-fit"
              aria-label={`Configure ${connectionStatus} IDE connection`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Configure</span>
            </Button>
          </div>
        </div>
        
        {/* Additional Status Information */}
        {connectionStatus === 'connecting' && (
          <div className="mt-4 p-3 bg-background/50 rounded-lg border border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span>Establishing connection to IDE...</span>
            </div>
          </div>
        )}
        
        {connectionStatus === 'disconnected' && (
          <div className="mt-4 p-3 bg-background/50 rounded-lg border border-border/50">
            <p className="text-sm text-muted-foreground">
              Please check your IDE extension and try reconnecting.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
