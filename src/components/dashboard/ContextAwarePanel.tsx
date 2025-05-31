
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Info, Activity, Settings, MessageSquare, Users, Clock } from 'lucide-react';
import { Agent, Task, Message } from '@/types';
import { AgentProfile } from '@/types/teams';
import { cn } from '@/lib/utils';
import { AgentDetails } from './detail-panel/AgentDetails';
import { TaskDetails } from './detail-panel/TaskDetails';
import { MessageDetails } from './detail-panel/MessageDetails';
import { AgentCommunicationInterface } from '@/components/teams/AgentCommunicationInterface';

interface ContextAwarePanelProps {
  type: 'agent' | 'task' | 'message' | 'agentProfile' | null;
  data: Agent | Task | Message | AgentProfile | null;
  isVisible: boolean;
  agents: Agent[];
  onDismiss: () => void;
  className?: string;
}

export const ContextAwarePanel = ({
  type,
  data,
  isVisible,
  agents,
  onDismiss,
  className
}: ContextAwarePanelProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const getContextInfo = () => {
    if (!data || !type) return null;

    switch (type) {
      case 'agent':
        const agent = data as Agent;
        return {
          title: agent.name,
          subtitle: agent.type,
          status: agent.status,
          icon: Users,
          actions: [
            { label: 'Configure', icon: Settings, action: () => console.log('Configure agent') },
            { label: 'Chat', icon: MessageSquare, action: () => console.log('Chat with agent') }
          ]
        };
      case 'task':
        const task = data as Task;
        return {
          title: task.title,
          subtitle: task.assignedAgent,
          status: task.status,
          icon: Clock,
          actions: [
            { label: 'Edit', icon: Settings, action: () => console.log('Edit task') },
            { label: 'Activity', icon: Activity, action: () => console.log('View activity') }
          ]
        };
      case 'message':
        const message = data as Message;
        return {
          title: `${message.from} → ${message.to}`,
          subtitle: message.type,
          status: null,
          icon: MessageSquare,
          actions: [
            { label: 'Reply', icon: MessageSquare, action: () => console.log('Reply to message') }
          ]
        };
      case 'agentProfile':
        const profile = data as AgentProfile;
        return {
          title: profile.name,
          subtitle: profile.role,
          status: profile.status,
          icon: Users,
          actions: [
            { label: 'Configure', icon: Settings, action: () => console.log('Configure profile') },
            { label: 'Chat', icon: MessageSquare, action: () => console.log('Chat with profile') }
          ]
        };
      default:
        return null;
    }
  };

  const contextInfo = getContextInfo();

  if (!isAnimating && !isVisible) {
    return null;
  }

  if (type === 'agentProfile' && data) {
    return (
      <div className={cn(
        "fixed right-0 top-0 h-full w-96 bg-background border-l border-border z-50 transition-transform duration-300 ease-in-out",
        isVisible ? "translate-x-0" : "translate-x-full",
        className
      )}>
        <AgentCommunicationInterface
          agent={data as AgentProfile}
          onClose={onDismiss}
        />
      </div>
    );
  }

  return (
    <div className={cn(
      "fixed right-0 top-0 h-full w-96 bg-background border-l border-border shadow-lg z-50 transition-all duration-300 ease-in-out overflow-hidden",
      isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
      className
    )}>
      {contextInfo && (
        <div className="flex flex-col h-full">
          {/* Enhanced Header */}
          <div className="flex-shrink-0 p-4 border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {type}
                </Badge>
                {contextInfo.status && (
                  <Badge 
                    variant={
                      contextInfo.status === "working" || contextInfo.status === "in-progress" ? "default" : 
                      contextInfo.status === "error" || contextInfo.status === "blocked" ? "destructive" : 
                      "secondary"
                    }
                    className="text-xs"
                  >
                    {contextInfo.status}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive transition-colors"
                title="Close panel (Esc)"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="mb-3">
              <h3 className="font-semibold text-foreground text-sm line-clamp-1 mb-1">
                {contextInfo.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {contextInfo.subtitle}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              {contextInfo.actions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={action.action}
                    className="h-7 px-2 text-xs hover:bg-primary/10 transition-colors"
                  >
                    <Icon className="w-3 h-3 mr-1" />
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Content with Tabs */}
          <div className="flex-1 overflow-hidden">
            <Tabs defaultValue="details" className="h-full flex flex-col">
              <TabsList className="m-4 mb-2 grid w-auto grid-cols-2 bg-muted/50">
                <TabsTrigger value="details" className="text-xs">
                  <Info className="w-3 h-3 mr-1" />
                  Details
                </TabsTrigger>
                <TabsTrigger value="activity" className="text-xs">
                  <Activity className="w-3 h-3 mr-1" />
                  Activity
                </TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                <TabsContent value="details" className="mt-0">
                  {type === 'agent' && <AgentDetails agent={data as Agent} />}
                  {type === 'task' && <TaskDetails task={data as Task} agents={agents} />}
                  {type === 'message' && <MessageDetails message={data as Message} agents={agents} />}
                </TabsContent>
                
                <TabsContent value="activity" className="mt-0">
                  <Card className="p-4">
                    <h4 className="font-medium text-foreground mb-3">Recent Activity</h4>
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground">
                        Activity timeline will appear here
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-xs">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-muted-foreground">Status updated - 2 minutes ago</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-muted-foreground">Configuration changed - 1 hour ago</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-muted-foreground">Task assigned - 3 hours ago</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};
