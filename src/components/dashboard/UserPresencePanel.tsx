
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ViewMode } from '@/types';
import { Users, Clock, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserPresencePanelProps {
  viewMode: ViewMode;
  componentId: string;
  projectId: string;
  showPerformance?: boolean;
  className?: string;
}

export const UserPresencePanel = ({
  viewMode,
  componentId,
  projectId,
  showPerformance = false,
  className
}: UserPresencePanelProps) => {
  // Mock user presence data
  const activeUsers = [
    { id: '1', name: 'Alice', avatar: '👩‍💻', status: 'active' },
    { id: '2', name: 'Bob', avatar: '👨‍💻', status: 'idle' },
    { id: '3', name: 'Charlie', avatar: '🧑‍💻', status: 'active' }
  ];

  const performanceMetrics = {
    responseTime: '1.2s',
    uptime: '99.9%',
    activeConnections: 3
  };

  return (
    <Card className={cn("bg-card/50 border-border/30", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {activeUsers.filter(u => u.status === 'active').length} active
              </span>
            </div>
            
            <div className="flex -space-x-2">
              {activeUsers.map((user) => (
                <div
                  key={user.id}
                  className="w-8 h-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-sm"
                  title={user.name}
                >
                  {user.avatar}
                </div>
              ))}
            </div>
          </div>

          {showPerformance && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {performanceMetrics.responseTime}
              </div>
              <div className="flex items-center gap-1">
                <Activity className="w-3 h-3" />
                {performanceMetrics.uptime}
              </div>
              <Badge variant="outline" className="text-xs">
                {performanceMetrics.activeConnections} connections
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
