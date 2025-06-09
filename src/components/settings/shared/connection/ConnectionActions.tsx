
import { Button } from "@/components/ui/button";
import { RefreshCw, XCircle } from "lucide-react";

interface ConnectionActionsProps {
  onRefresh: () => Promise<void>;
  onDisconnect: () => void;
  isRefreshing: boolean;
}

export const ConnectionActions = ({ onRefresh, onDisconnect, isRefreshing }: ConnectionActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={onRefresh}
        disabled={isRefreshing}
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
      >
        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        {isRefreshing ? "Refreshing..." : "Refresh"}
      </Button>
      
      <Button
        onClick={onDisconnect}
        variant="outline"
        size="sm"
        className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
      >
        <XCircle className="w-4 h-4" />
        Disconnect
      </Button>
    </div>
  );
};
