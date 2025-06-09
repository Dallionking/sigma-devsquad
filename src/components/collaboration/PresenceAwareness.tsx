
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useWebSocket } from '@/contexts/WebSocketContext';
import { Users, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PresenceAwarenessProps {
  componentId: string;
  className?: string;
  showLabels?: boolean;
  maxVisible?: number;
}

export const PresenceAwareness = ({ 
  componentId, 
  className, 
  showLabels = true,
  maxVisible = 5 
}: PresenceAwarenessProps) => {
  const { presenceUsers, isConnected } = useWebSocket();

  const activeUsers = presenceUsers.filter(
    user => user.activeComponent === componentId
  );

  const visibleUsers = activeUsers.slice(0, maxVisible);
  const extraCount = Math.max(0, activeUsers.length - maxVisible);

  if (!isConnected || activeUsers.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showLabels && (
        <span className="text-sm text-muted-foreground">
          {activeUsers.length === 1 ? '1 person' : `${activeUsers.length} people`} viewing
        </span>
      )}
      
      <div className="flex items-center -space-x-2">
        {visibleUsers.map((user, index) => (
          <Tooltip key={user.id}>
            <TooltipTrigger>
              <div className="relative">
                <Avatar 
                  className={cn(
                    "w-7 h-7 border-2 border-background ring-2 ring-green-500",
                    "transition-transform hover:scale-110"
                  )}
                  style={{ zIndex: visibleUsers.length - index }}
                >
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-xs">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-center">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">Active now</p>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
        
        {extraCount > 0 && (
          <Tooltip>
            <TooltipTrigger>
              <div className="w-7 h-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                +{extraCount}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{extraCount} more {extraCount === 1 ? 'person' : 'people'} viewing</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {activeUsers.length > 0 && (
        <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
          Live
        </Badge>
      )}
    </div>
  );
};
