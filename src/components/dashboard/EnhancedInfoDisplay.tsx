
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Agent, Task, Message } from '@/types';
import { AgentProfile } from '@/types/teams';
import { Bot, Clock, MessageSquare, Users, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InfoDisplayProps {
  type: 'agent' | 'task' | 'message' | 'agentProfile';
  data: Agent | Task | Message | AgentProfile;
  className?: string;
}

export const EnhancedInfoDisplay = ({ type, data, className }: InfoDisplayProps) => {
  const renderAgentInfo = (agent: Agent) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={`/avatars/${agent.type}.png`} />
          <AvatarFallback>
            <Bot className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">{agent.name}</h3>
          <p className="text-sm text-muted-foreground capitalize">{agent.type} Agent</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-3">
          <div className="text-sm font-medium">Status</div>
          <div className="flex items-center space-x-2 mt-1">
            <div className={cn(
              "w-2 h-2 rounded-full",
              agent.status === 'working' && "bg-green-500 animate-pulse",
              agent.status === 'idle' && "bg-gray-400",
              agent.status === 'error' && "bg-red-500"
            )} />
            <span className="text-sm capitalize">{agent.status}</span>
          </div>
        </Card>
        
        <Card className="p-3">
          <div className="text-sm font-medium">Progress</div>
          <div className="mt-2">
            <Progress value={agent.progress} className="h-2" />
            <div className="text-xs text-muted-foreground mt-1">{agent.progress}%</div>
          </div>
        </Card>
      </div>
      
      <Card className="p-3">
        <div className="text-sm font-medium mb-2">Current Task</div>
        <p className="text-sm text-muted-foreground">{agent.currentTask}</p>
      </Card>
    </div>
  );

  const renderTaskInfo = (task: Task) => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <p className="text-sm text-muted-foreground">Assigned to {task.assignedAgent}</p>
        </div>
        <div className="flex items-center space-x-2">
          {task.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
          {task.status === 'blocked' && <AlertCircle className="w-5 h-5 text-red-500" />}
          {task.status === 'in-progress' && <Activity className="w-5 h-5 text-blue-500 animate-pulse" />}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 text-center">
          <div className="text-xs text-muted-foreground">Priority</div>
          <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
            {task.priority}
          </Badge>
        </Card>
        
        <Card className="p-3 text-center">
          <div className="text-xs text-muted-foreground">Status</div>
          <div className="text-sm font-medium capitalize">{task.status}</div>
        </Card>
        
        <Card className="p-3 text-center">
          <div className="text-xs text-muted-foreground">Due</div>
          <div className="text-sm font-medium">
            {new Date(task.deadline).toLocaleDateString()}
          </div>
        </Card>
      </div>
      
      <Card className="p-3">
        <div className="text-sm font-medium mb-2">Description</div>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </Card>
    </div>
  );

  const renderMessageInfo = (message: Message) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <MessageSquare className="w-8 h-8 text-primary" />
        <div>
          <h3 className="font-semibold">Message Communication</h3>
          <p className="text-sm text-muted-foreground">
            {message.from} → {message.to}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3">
          <div className="text-xs text-muted-foreground">Type</div>
          <Badge variant="outline" className="mt-1">
            {message.type}
          </Badge>
        </Card>
        
        <Card className="p-3">
          <div className="text-xs text-muted-foreground">Timestamp</div>
          <div className="text-sm font-medium">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </Card>
      </div>
      
      <Card className="p-3">
        <div className="text-sm font-medium mb-2">Content</div>
        <div className="p-2 bg-muted rounded text-sm">
          {message.content}
        </div>
      </Card>
    </div>
  );

  const renderAgentProfileInfo = (profile: AgentProfile) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profile.avatar} />
          <AvatarFallback>
            <Users className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">{profile.name}</h3>
          <p className="text-sm text-muted-foreground">{profile.role}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-3">
          <div className="text-sm font-medium">Team</div>
          <div className="text-sm text-muted-foreground mt-1">{profile.teamId}</div>
        </Card>
        
        <Card className="p-3">
          <div className="text-sm font-medium">Availability</div>
          <div className="flex items-center space-x-2 mt-1">
            <div className={cn(
              "w-2 h-2 rounded-full",
              profile.availability === 'available' && "bg-green-500",
              profile.availability === 'offline' && "bg-gray-400",
              profile.availability === 'busy' && "bg-red-500"
            )} />
            <span className="text-sm capitalize">{profile.availability}</span>
          </div>
        </Card>
      </div>
      
      <Card className="p-3">
        <div className="text-sm font-medium mb-2">Skills</div>
        <div className="flex flex-wrap gap-1">
          {profile.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill.name}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div className={cn("p-4", className)}>
      {type === 'agent' && renderAgentInfo(data as Agent)}
      {type === 'task' && renderTaskInfo(data as Task)}
      {type === 'message' && renderMessageInfo(data as Message)}
      {type === 'agentProfile' && renderAgentProfileInfo(data as AgentProfile)}
    </div>
  );
};
