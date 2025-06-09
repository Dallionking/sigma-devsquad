
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Bot, Calendar, Mail, Users } from 'lucide-react';
import { Agent, Task, Message } from '@/types';
import { AgentProfile } from '@/types/teams';
import { cn } from '@/lib/utils';

interface ContextAwarePanelProps {
  type: 'agent' | 'task' | 'message' | 'agentProfile' | null;
  data: any;
  isVisible: boolean;
  agents?: Agent[];
  onDismiss: () => void;
}

export const ContextAwarePanel = ({
  type,
  data,
  isVisible,
  agents,
  onDismiss
}: ContextAwarePanelProps) => {
  if (!isVisible || !data) {
    return null;
  }

  const getIcon = () => {
    switch (type) {
      case 'agent': return Bot;
      case 'agentProfile': return Users;
      case 'task': return Calendar;
      case 'message': return Mail;
      default: return Bot;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'agent': return data.name || 'Agent Details';
      case 'agentProfile': return data.name || 'Agent Profile';
      case 'task': return data.title || 'Task Details';
      case 'message': return 'Message Details';
      default: return 'Details';
    }
  };

  const Icon = getIcon();

  return (
    <div className={cn(
      "fixed right-0 top-0 h-full w-96 bg-background border-l border-border/60 shadow-lg transition-transform duration-300 ease-in-out z-40",
      isVisible ? "translate-x-0" : "translate-x-full"
    )}>
      <Card className="h-full border-0 rounded-none">
        <CardHeader className="border-b border-border/30">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icon className="w-5 h-5" />
              {getTitle()}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onDismiss}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 overflow-auto">
          {type === 'agent' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Status</h4>
                <Badge variant={data.status === 'working' ? 'default' : 'secondary'}>
                  {data.status}
                </Badge>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Type</h4>
                <p className="text-sm text-muted-foreground">{data.type}</p>
              </div>
              
              {data.currentTask && (
                <div>
                  <h4 className="font-medium mb-2">Current Task</h4>
                  <p className="text-sm text-muted-foreground">{data.currentTask}</p>
                </div>
              )}
              
              {data.progress !== undefined && (
                <div>
                  <h4 className="font-medium mb-2">Progress</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${data.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{data.progress}%</span>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {type === 'agentProfile' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Role</h4>
                <Badge variant="outline">{data.role}</Badge>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Availability</h4>
                <Badge variant={data.availability === 'available' ? 'default' : 'secondary'}>
                  {data.availability}
                </Badge>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Performance Rating</h4>
                <p className="text-sm text-muted-foreground">{data.performanceRating}/10</p>
              </div>
            </div>
          )}
          
          {type === 'task' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{data.description || 'No description available'}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Status</h4>
                <Badge variant={data.status === 'completed' ? 'default' : 'secondary'}>
                  {data.status}
                </Badge>
              </div>
              
              {data.priority && (
                <div>
                  <h4 className="font-medium mb-2">Priority</h4>
                  <Badge variant={data.priority === 'high' ? 'destructive' : 'outline'}>
                    {data.priority}
                  </Badge>
                </div>
              )}
            </div>
          )}
          
          {type === 'message' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Content</h4>
                <p className="text-sm text-muted-foreground">{data.content || 'No content available'}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Timestamp</h4>
                <p className="text-sm text-muted-foreground">{data.timestamp || new Date().toLocaleString()}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
