
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react";

interface Notification {
  id: string;
  type: "success" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Backend Agent Completed Task",
      message: "User authentication module has been successfully implemented",
      timestamp: "2 minutes ago",
      read: false
    },
    {
      id: "2",
      type: "warning",
      title: "DevOps Agent Issue",
      message: "CI/CD pipeline configuration needs attention",
      timestamp: "15 minutes ago",
      read: false
    },
    {
      id: "3",
      type: "info",
      title: "Planning Agent Update",
      message: "New project requirements have been analyzed",
      timestamp: "1 hour ago",
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "info": return <Info className="w-4 h-4 text-blue-500" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.slice(0, 3).map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border ${
                notification.read ? "bg-muted/30" : "bg-card"
              } hover:bg-accent/50 transition-colors`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{notification.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {notification.timestamp}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark Read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissNotification(notification.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
