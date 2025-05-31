
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWebSocket, RealtimeUpdate } from '@/contexts/WebSocketContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { activity, users, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityEvent {
  id: string;
  userId: string;
  userName: string;
  avatar?: string;
  action: string;
  target: string;
  timestamp: Date;
  type: 'edit' | 'create' | 'delete' | 'comment' | 'join' | 'leave';
}

interface UserActivityTimelineProps {
  className?: string;
  maxEvents?: number;
}

export const UserActivityTimeline = ({ 
  className, 
  maxEvents = 50 
}: UserActivityTimelineProps) => {
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const { onUpdate, presenceUsers } = useWebSocket();

  useEffect(() => {
    const unsubscribe = onUpdate((update) => {
      const newActivity: ActivityEvent = {
        id: update.id,
        userId: update.userId,
        userName: update.userId, // In a real app, you'd resolve this from user data
        action: getActionFromUpdate(update),
        target: update.component || 'unknown',
        timestamp: new Date(update.timestamp),
        type: getActivityType(update)
      };

      setActivities(prev => [newActivity, ...prev.slice(0, maxEvents - 1)]);
    });

    return unsubscribe;
  }, [onUpdate, maxEvents]);

  const getActionFromUpdate = (update: RealtimeUpdate): string => {
    switch (update.type) {
      case 'agent_update': return 'updated agent';
      case 'task_update': return 'modified task';
      case 'message_update': return 'sent message';
      case 'edit_conflict': return 'started editing';
      default: return 'performed action';
    }
  };

  const getActivityType = (update: RealtimeUpdate): ActivityEvent['type'] => {
    switch (update.type) {
      case 'agent_update': return 'edit';
      case 'task_update': return 'edit';
      case 'message_update': return 'comment';
      case 'edit_conflict': return 'edit';
      default: return 'edit';
    }
  };

  const getActivityIcon = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'edit': return '✏️';
      case 'create': return '➕';
      case 'delete': return '🗑️';
      case 'comment': return '💬';
      case 'join': return '👋';
      case 'leave': return '👋';
      default: return '📝';
    }
  };

  const getTimeAgo = (timestamp: Date): string => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <activity className="w-5 h-5" />
          Activity Timeline
          <Badge variant="secondary" className="ml-auto">
            {activities.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-96">
          <div className="space-y-3 p-4">
            {activities.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No recent activity</p>
                <p className="text-sm">Activity will appear here as users collaborate</p>
              </div>
            ) : (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback className="text-xs">
                      {activity.userName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{activity.userName}</span>
                      <span className="text-lg">{getActivityIcon(activity.type)}</span>
                      <span className="text-sm text-muted-foreground">{activity.action}</span>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      in <span className="font-medium">{activity.target}</span>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mt-1">
                      {getTimeAgo(activity.timestamp)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
