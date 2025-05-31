
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useWebSocket, PresenceUser } from "@/contexts/WebSocketContext";
import { Users, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PresenceIndicatorProps {
  className?: string;
  showCount?: boolean;
  maxVisible?: number;
}

export const PresenceIndicator = ({ 
  className, 
  showCount = true, 
  maxVisible = 3 
}: PresenceIndicatorProps) => {
  const { isConnected, presenceUsers } = useWebSocket();

  if (!isConnected) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <WifiOff className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Offline</span>
      </div>
    );
  }

  const visibleUsers = presenceUsers.slice(0, maxVisible);
  const extraCount = Math.max(0, presenceUsers.length - maxVisible);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Wifi className="w-4 h-4 text-green-500" />
      
      <div className="flex items-center -space-x-2">
        {visibleUsers.map((user) => (
          <Tooltip key={user.id}>
            <TooltipTrigger>
              <div className="relative">
                <Avatar className="w-8 h-8 border-2 border-background">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-xs">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-center">
                <p className="font-medium">{user.name}</p>
                {user.activeComponent && (
                  <p className="text-xs text-muted-foreground">
                    Viewing: {user.activeComponent.replace('-', ' ')}
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
        
        {extraCount > 0 && (
          <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
            <span className="text-xs font-medium">+{extraCount}</span>
          </div>
        )}
      </div>

      {showCount && presenceUsers.length > 0 && (
        <Badge variant="secondary" className="text-xs">
          <Users className="w-3 h-3 mr-1" />
          {presenceUsers.length} online
        </Badge>
      )}
    </div>
  );
};
