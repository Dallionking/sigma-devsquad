import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useWebSocket, PresenceUser } from "@/contexts/WebSocketContext";
import { Eye, Edit3, MessageSquare, Users, Activity, Clock } from "lucide-react";

interface CollaborationActivity {
  id: string;
  userId: string;
  userName: string;
  action: 'viewing' | 'editing' | 'typing' | 'commenting';
  component: string;
  timestamp: Date;
  details?: string;
}

export const PresenceIndicators = () => {
  const { presenceUsers, isConnected } = useWebSocket();
  const [recentActivities, setRecentActivities] = useState<CollaborationActivity[]>([]);
  const [typingUsers, setTypingUsers] = useState<Map<string, string>>(new Map());

  // Mock recent activities
  useEffect(() => {
    const mockActivities: CollaborationActivity[] = [
      {
        id: '1',
        userId: 'user-1',
        userName: 'Sarah Chen',
        action: 'editing',
        component: 'Agent Configuration',
        timestamp: new Date(Date.now() - 30000),
        details: 'Updating AI model parameters'
      },
      {
        id: '2',
        userId: 'user-2',
        userName: 'Mike Rodriguez',
        action: 'viewing',
        component: 'Task Dashboard',
        timestamp: new Date(Date.now() - 45000)
      },
      {
        id: '3',
        userId: 'user-1',
        userName: 'Sarah Chen',
        action: 'commenting',
        component: 'Team Chat',
        timestamp: new Date(Date.now() - 60000),
        details: 'Added feedback on sprint planning'
      }
    ];
    setRecentActivities(mockActivities);

    // Simulate typing indicators
    const interval = setInterval(() => {
      setTypingUsers(prev => {
        const newMap = new Map(prev);
        const shouldAddTyping = Math.random() > 0.7;
        
        if (shouldAddTyping && presenceUsers.length > 0) {
          const randomUser = presenceUsers[Math.floor(Math.random() * presenceUsers.length)];
          newMap.set(randomUser.id, randomUser.name);
          
          // Clear typing after 3 seconds
          setTimeout(() => {
            setTypingUsers(current => {
              const updated = new Map(current);
              updated.delete(randomUser.id);
              return updated;
            });
          }, 3000);
        }
        
        return newMap;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [presenceUsers]);

  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'viewing': return <Eye className="w-3 h-3" />;
      case 'editing': return <Edit3 className="w-3 h-3" />;
      case 'typing': return <MessageSquare className="w-3 h-3" />;
      case 'commenting': return <MessageSquare className="w-3 h-3" />;
      default: return <Activity className="w-3 h-3" />;
    }
  };

  const getActivityColor = (action: string) => {
    switch (action) {
      case 'viewing': return 'text-blue-500';
      case 'editing': return 'text-orange-500';
      case 'typing': return 'text-green-500';
      case 'commenting': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="space-y-4">
      {/* Online Users */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Team Presence</span>
            <Badge variant={isConnected ? "default" : "destructive"}>
              {isConnected ? `${presenceUsers.length + 1} online` : 'Disconnected'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            {/* Current user indicator */}
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center space-x-1 p-2 bg-vibe-primary/10 rounded-lg border-2 border-vibe-primary/30">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs bg-vibe-primary text-white">
                      You
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium">You</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>You (Active)</p>
              </TooltipContent>
            </Tooltip>

            {/* Other online users */}
            {presenceUsers.map((user) => (
              <Tooltip key={user.id}>
                <TooltipTrigger>
                  <div className="flex items-center space-x-1 p-2 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                    <Avatar className="w-6 h-6">
                      {user.avatar ? (
                        <AvatarImage src={user.avatar} alt={user.name} />
                      ) : (
                        <AvatarFallback className="text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="text-xs font-medium">{user.name.split(' ')[0]}</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {typingUsers.has(user.id) && (
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-muted-foreground">
                      {user.activeComponent ? `Working on: ${user.activeComponent}` : 'Online'}
                    </p>
                    {typingUsers.has(user.id) && (
                      <p className="text-blue-500">Currently typing...</p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Typing indicators */}
          {typingUsers.size > 0 && (
            <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-950 rounded-md">
              <div className="flex items-center space-x-2 text-sm text-blue-700 dark:text-blue-300">
                <MessageSquare className="w-4 h-4" />
                <span>
                  {Array.from(typingUsers.values()).join(', ')} 
                  {typingUsers.size === 1 ? ' is' : ' are'} typing...
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <Avatar className="w-6 h-6 mt-0.5">
                  <AvatarFallback className="text-xs">
                    {activity.userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{activity.userName}</span>
                    <div className={`${getActivityColor(activity.action)}`}>
                      {getActivityIcon(activity.action)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {activity.action} {activity.component}
                    </span>
                  </div>
                  {activity.details && (
                    <p className="text-xs text-muted-foreground mt-1">{activity.details}</p>
                  )}
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{timeAgo(activity.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
