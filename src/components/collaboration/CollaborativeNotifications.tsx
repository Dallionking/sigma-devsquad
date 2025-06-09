
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  MessageSquare, 
  Edit, 
  Users, 
  GitMerge, 
  X,
  Check,
  AlertTriangle,
  FileText,
  UserPlus,
  UserMinus
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CollaborativeNotification {
  id: string;
  type: 'user-joined' | 'user-left' | 'edit-started' | 'edit-finished' | 'message-sent' | 'conflict-detected' | 'conflict-resolved';
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  componentId?: string;
  priority: 'low' | 'medium' | 'high';
  dismissed?: boolean;
}

interface CollaborativeNotificationsProps {
  className?: string;
  showToasts?: boolean;
}

export const CollaborativeNotifications = ({ 
  className, 
  showToasts = true 
}: CollaborativeNotificationsProps) => {
  const [notifications, setNotifications] = useState<CollaborativeNotification[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const { onUpdate, presenceUsers } = useWebSocket();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onUpdate((update) => {
      const notification: CollaborativeNotification = {
        id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: getNotificationType(update.type, update.data),
        userId: update.userId,
        userName: getUserName(update.userId),
        message: generateMessage(update.type, update.data, getUserName(update.userId)),
        timestamp: update.timestamp,
        componentId: update.component,
        priority: getPriority(update.type, update.data)
      };

      setNotifications(prev => [notification, ...prev.slice(0, 19)]); // Keep last 20

      // Show toast for high priority notifications
      if (showToasts && notification.priority === 'high') {
        toast({
          title: "Collaboration Update",
          description: notification.message,
          duration: 5000,
        });
      }
    });

    return unsubscribe;
  }, [onUpdate, showToasts, toast]);

  // Simulate presence-based notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly generate some collaborative activities for demo
      if (Math.random() > 0.8 && presenceUsers.length > 0) {
        const randomUser = presenceUsers[Math.floor(Math.random() * presenceUsers.length)];
        const activities = ['edit-started', 'message-sent', 'edit-finished'];
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        
        const notification: CollaborativeNotification = {
          id: `sim-${Date.now()}`,
          type: randomActivity as any,
          userId: randomUser.id,
          userName: randomUser.name,
          message: generateMessage(randomActivity, { component: randomUser.activeComponent }, randomUser.name),
          timestamp: new Date().toISOString(),
          componentId: randomUser.activeComponent,
          priority: 'medium'
        };

        setNotifications(prev => [notification, ...prev.slice(0, 19)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [presenceUsers]);

  const getNotificationType = (updateType: string, data: any): CollaborativeNotification['type'] => {
    switch (updateType) {
      case 'presence_update':
        if (data.joined) return 'user-joined';
        if (data.left) return 'user-left';
        return 'edit-started';
      case 'edit_conflict':
        if (data.action === 'resolve') return 'conflict-resolved';
        return 'conflict-detected';
      case 'message_update':
        return 'message-sent';
      default:
        return 'edit-started';
    }
  };

  const getUserName = (userId: string): string => {
    const user = presenceUsers.find(u => u.id === userId);
    return user?.name || 'Unknown User';
  };

  const generateMessage = (type: string, data: any, userName: string): string => {
    switch (type) {
      case 'user-joined':
        return `${userName} joined the collaboration`;
      case 'user-left':
        return `${userName} left the collaboration`;
      case 'edit-started':
        return `${userName} started editing ${data?.component || 'a component'}`;
      case 'edit-finished':
        return `${userName} finished editing ${data?.component || 'a component'}`;
      case 'message-sent':
        return `${userName} sent a message`;
      case 'conflict-detected':
        return `Edit conflict detected with ${userName}`;
      case 'conflict-resolved':
        return `${userName} resolved an edit conflict`;
      default:
        return `${userName} performed an action`;
    }
  };

  const getPriority = (type: string, data: any): 'low' | 'medium' | 'high' => {
    switch (type) {
      case 'edit_conflict':
        return 'high';
      case 'message_update':
        return 'medium';
      default:
        return 'low';
    }
  };

  const getNotificationIcon = (type: CollaborativeNotification['type']) => {
    switch (type) {
      case 'user-joined': return <UserPlus className="w-4 h-4 text-green-500" />;
      case 'user-left': return <UserMinus className="w-4 h-4 text-red-500" />;
      case 'edit-started': return <Edit className="w-4 h-4 text-blue-500" />;
      case 'edit-finished': return <Check className="w-4 h-4 text-green-500" />;
      case 'message-sent': return <MessageSquare className="w-4 h-4 text-purple-500" />;
      case 'conflict-detected': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'conflict-resolved': return <GitMerge className="w-4 h-4 text-green-500" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, dismissed: true } : notif
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const activeNotifications = notifications.filter(n => !n.dismissed);
  const recentNotifications = activeNotifications.slice(0, isExpanded ? 10 : 3);

  if (activeNotifications.length === 0) return null;

  return (
    <div className={cn("space-y-2", className)}>
      {/* Notification Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4" />
          <span className="text-sm font-medium">Collaboration Activity</span>
          <Badge variant="secondary">{activeNotifications.length}</Badge>
        </div>
        
        <div className="flex gap-1">
          {activeNotifications.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-6 text-xs"
            >
              {isExpanded ? 'Show Less' : `Show All (${activeNotifications.length})`}
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllNotifications}
            className="h-6 text-xs"
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {recentNotifications.map((notification) => (
          <Card 
            key={notification.id}
            className={cn(
              "transition-all duration-200 hover:shadow-sm",
              getPriorityColor(notification.priority)
            )}
          >
            <CardContent className="p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="w-5 h-5">
                        <AvatarFallback className="text-xs">
                          {notification.userName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium truncate">
                        {notification.userName}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {notification.type.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-1">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{new Date(notification.timestamp).toLocaleTimeString()}</span>
                      {notification.componentId && (
                        <>
                          <span>•</span>
                          <span>{notification.componentId.replace('-', ' ')}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissNotification(notification.id)}
                  className="h-6 w-6 p-0 flex-shrink-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
