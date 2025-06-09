
import { CheckCircle, AlertCircle, XCircle, Wifi, WifiOff } from "lucide-react";

interface ConnectionStatusIconProps {
  connectionStatus: string;
}

export const ConnectionStatusIcon = ({ connectionStatus }: ConnectionStatusIconProps) => {
  const connectionStatuses = {
    connected: { 
      icon: CheckCircle, 
      color: "text-green-600 dark:text-green-400", 
      pulse: "animate-pulse-subtle"
    },
    connecting: { 
      icon: AlertCircle, 
      color: "text-yellow-600 dark:text-yellow-400", 
      pulse: "animate-pulse"
    },
    disconnected: { 
      icon: XCircle, 
      color: "text-red-600 dark:text-red-400", 
      pulse: ""
    }
  };

  const statusConfig = connectionStatuses[connectionStatus as keyof typeof connectionStatuses];
  const StatusIcon = statusConfig.icon;
  const ConnectivityIcon = connectionStatus === 'connected' ? Wifi : WifiOff;

  return (
    <>
      <div className={`p-3 rounded-full bg-background/80 backdrop-blur-sm shadow-md ${statusConfig.pulse} hover-scale`}>
        <StatusIcon className={`w-6 h-6 sm:w-7 sm:h-7 ${statusConfig.color}`} />
      </div>
      <ConnectivityIcon className={`w-5 h-5 ${statusConfig.color} hidden sm:block`} />
    </>
  );
};
