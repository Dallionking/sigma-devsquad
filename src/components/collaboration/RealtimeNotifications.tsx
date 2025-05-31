
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWebSocket, RealtimeUpdate } from "@/contexts/WebSocketContext";
import { useToast } from "@/hooks/use-toast";
import { Bell, X, RefreshCw, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RealtimeNotificationsProps {
  className?: string;
}

export const RealtimeNotifications = ({ className }: RealtimeNotificationsProps) => {
  const [notifications, setNotifications] = useState<RealtimeUpdate[]>([]);
  const [conflicts, setConflicts] = useState<RealtimeUpdate[]>([]);
  const { onUpdate, isConnected } = useWebSocket();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onUpdate((update) => {
      if (update.type === 'edit_conflict') {
        setConflicts(prev => [...prev, update]);
        toast({
          title: "Edit Conflict Detected",
          description: `Conflict in ${update.component || 'unknown component'}`,
          variant: "destructive"
        });
      } else {
        setNotifications(prev => [update, ...prev.slice(0, 4)]); // Keep last 5
        
        // Show toast for important updates
        if (update.type === 'agent_update') {
          toast({
            title: "Agent Updated",
            description: `${update.data.name || 'An agent'} status changed`,
          });
        }
      }
    });

    return unsubscribe;
  }, [onUpdate, toast]);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const resolveConflict = (conflictId: string, resolution: 'accept' | 'reject') => {
    setConflicts(prev => prev.filter(c => c.id !== conflictId));
    
    toast({
      title: "Conflict Resolved",
      description: `Changes ${resolution === 'accept' ? 'accepted' : 'rejected'}`,
    });
  };

  if (!isConnected && notifications.length === 0 && conflicts.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-2", className)}>
      {/* Conflict Alerts */}
      {conflicts.map((conflict) => (
        <Alert key={conflict.id} variant="destructive" className="border-red-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <div>
              <span className="font-medium">Edit Conflict</span>
              <p className="text-sm mt-1">
                Another user is editing {conflict.component || 'this component'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => resolveConflict(conflict.id, 'reject')}
              >
                Keep Mine
              </Button>
              <Button 
                size="sm"
                onClick={() => resolveConflict(conflict.id, 'accept')}
              >
                Accept Theirs
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ))}

      {/* Recent Updates */}
      {notifications.length > 0 && (
        <div className="bg-card border rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="text-sm font-medium">Recent Updates</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {notifications.length}
            </Badge>
          </div>
          
          <div className="space-y-1">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className="flex items-center justify-between bg-muted/50 rounded p-2 text-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>
                    {notification.type.replace('_', ' ')} 
                    {notification.component && ` in ${notification.component}`}
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissNotification(notification.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connection Status */}
      {!isConnected && (
        <Alert>
          <RefreshCw className="h-4 w-4 animate-spin" />
          <AlertDescription>
            Reconnecting to collaboration server...
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
