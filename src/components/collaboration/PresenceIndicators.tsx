
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { useTeams } from "@/contexts/TeamContext";
import { cn } from "@/lib/utils";
import { Clock, MessageCircle, Edit } from "lucide-react";

interface PresenceIndicatorsProps {
  className?: string;
  showDetails?: boolean;
  maxVisible?: number;
}

export const PresenceIndicators = ({ 
  className, 
  showDetails = false, 
  maxVisible = 5 
}: PresenceIndicatorsProps) => {
  const { presenceUsers, isConnected } = useWebSocket();
  const { agentProfiles } = useTeams();

  const getActivityIcon = (activeComponent?: string) => {
    if (!activeComponent) return <Clock className="w-3 h-3" />;
    
    if (activeComponent.includes('chat') || activeComponent.includes('message')) {
      return <MessageCircle className="w-3 h-3" />;
    }
    
    return <Edit className="w-3 h-3" />;
  };

  const getActivityColor = (activeComponent?: string) => {
    if (!activeComponent) return "text-gray-500";
    
    if (activeComponent.includes('chat')) return "text-blue-500";
    if (activeComponent.includes('edit')) return "text-green-500";
    
    return "text-purple-500";
  };

  const formatLastSeen = (lastSeen: string) => {
    const diff = Date.now() - new Date(lastSeen).getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    return "1d+ ago";
  };

  if (!isConnected || presenceUsers.length === 0) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="w-2 h-2 rounded-full bg-gray-400" />
        <span className="text-sm text-muted-foreground">Offline</span>
      </div>
    );
  }

  const visibleUsers = presenceUsers.slice(0, maxVisible);
  const hiddenCount = Math.max(0, presenceUsers.length - maxVisible);

  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-2", className)}>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">
            {presenceUsers.length} online
          </span>
        </div>

        <div className="flex -space-x-2">
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
                  
                  {/* Activity indicator */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-background rounded-full flex items-center justify-center">
                    <div className={cn("transition-colors", getActivityColor(user.activeComponent))}>
                      {getActivityIcon(user.activeComponent)}
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <div className="font-medium">{user.name}</div>
                  {user.activeComponent && (
                    <div className="text-xs text-muted-foreground">
                      Active in: {user.activeComponent.replace('-', ' ')}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    Last seen: {formatLastSeen(user.lastSeen)}
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
          
          {hiddenCount > 0 && (
            <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
              <span className="text-xs font-medium">+{hiddenCount}</span>
            </div>
          )}
        </div>

        {showDetails && (
          <div className="hidden md:flex items-center gap-2 ml-2">
            <Badge variant="secondary" className="text-xs">
              {presenceUsers.filter(u => u.activeComponent?.includes('chat')).length} chatting
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {presenceUsers.filter(u => u.activeComponent?.includes('edit')).length} editing
            </Badge>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};
