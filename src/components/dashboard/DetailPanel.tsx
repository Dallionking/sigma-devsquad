
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Agent, Task, Message, ViewMode } from "@/pages/Index";
import { 
  Bot, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  MessageSquare, 
  ArrowRight,
  Settings,
  Pause,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface DetailPanelProps {
  selectedAgent: Agent | null;
  selectedTask: Task | null;
  selectedMessage: Message | null;
  viewMode: ViewMode;
  agents: Agent[];
}

export const DetailPanel = ({ 
  selectedAgent, 
  selectedTask, 
  selectedMessage, 
  viewMode,
  agents 
}: DetailPanelProps) => {
  const navigate = useNavigate();

  const getAgentName = (agentType: string) => {
    const agent = agents.find(a => a.type === agentType);
    return agent?.name || agentType;
  };

  const renderAgentDetails = () => {
    if (!selectedAgent) return null;

    const statusConfig = {
      working: { icon: Play, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
      idle: { icon: Clock, color: "text-muted-foreground", bg: "bg-muted" },
      waiting: { icon: Clock, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
      error: { icon: AlertCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/20" }
    };

    const config = statusConfig[selectedAgent.status];
    const StatusIcon = config.icon;

    return (
      <div className="space-y-6">
        {/* Agent Header */}
        <div className="text-center">
          <div className={cn("w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center", config.bg)}>
            <Bot className={cn("w-8 h-8", config.color)} />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{selectedAgent.name}</h3>
          <Badge 
            variant="secondary" 
            className={cn("mt-2", config.bg, config.color)}
          >
            <StatusIcon className="w-3 h-3 mr-1" />
            {selectedAgent.status}
          </Badge>
        </div>

        {/* Current Task */}
        <Card className="p-4">
          <h4 className="font-medium text-foreground mb-2">Current Task</h4>
          <p className="text-sm text-muted-foreground mb-3">{selectedAgent.currentTask}</p>
          
          {selectedAgent.status === "working" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground font-medium">{selectedAgent.progress}%</span>
              </div>
              <Progress value={selectedAgent.progress} className="h-2" />
            </div>
          )}
        </Card>

        {/* Agent Stats */}
        <Card className="p-4">
          <h4 className="font-medium text-foreground mb-3">Statistics</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Last Active</span>
              <span className="text-sm text-foreground">
                {new Date(selectedAgent.lastActive).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status Duration</span>
              <span className="text-sm text-foreground">2h 15m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Tasks Completed</span>
              <span className="text-sm text-foreground">12</span>
            </div>
          </div>
        </Card>

        {/* Agent Controls */}
        <Card className="p-4">
          <h4 className="font-medium text-foreground mb-3">Controls</h4>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              disabled={selectedAgent.status === "error"}
            >
              <Pause className="w-4 h-4 mr-2" />
              Pause Agent
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              disabled={selectedAgent.status !== "error"}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart Agent
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => navigate("/agent-configuration")}
            >
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  const renderTaskDetails = () => {
    if (!selectedTask) return null;

    const agent = agents.find(a => a.type === selectedTask.assignedAgent);
    
    const statusConfig = {
      pending: { icon: Clock, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
      "in-progress": { icon: Play, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
      completed: { icon: CheckCircle, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
      blocked: { icon: AlertCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/20" }
    };

    const config = statusConfig[selectedTask.status];
    const StatusIcon = config.icon;

    const priorityConfig = {
      high: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300",
      medium: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300",
      low: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
    };

    return (
      <div className="space-y-6">
        {/* Task Header */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{selectedTask.title}</h3>
          <div className="flex items-center space-x-2">
            <Badge 
              variant="secondary" 
              className={cn(config.bg, config.color)}
            >
              <StatusIcon className="w-3 h-3 mr-1" />
              {selectedTask.status}
            </Badge>
            <Badge 
              variant="secondary" 
              className={priorityConfig[selectedTask.priority]}
            >
              {selectedTask.priority} priority
            </Badge>
          </div>
        </div>

        {/* Task Description */}
        <Card className="p-4">
          <h4 className="font-medium text-foreground mb-2">Description</h4>
          <p className="text-sm text-muted-foreground">{selectedTask.description}</p>
        </Card>

        {/* Task Details */}
        <Card className="p-4">
          <h4 className="font-medium text-foreground mb-3">Details</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Assigned Agent</span>
              <span className="text-sm text-foreground">{agent?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Created</span>
              <span className="text-sm text-foreground">
                {new Date(selectedTask.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Deadline</span>
              <span className="text-sm text-foreground">
                {new Date(selectedTask.deadline).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Task ID</span>
              <span className="text-sm text-foreground font-mono">{selectedTask.id}</span>
            </div>
          </div>
        </Card>

        {/* Progress */}
        {agent?.status === "working" && selectedTask.status === "in-progress" && (
          <Card className="p-4">
            <h4 className="font-medium text-foreground mb-3">Progress</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Completion</span>
                <span className="text-foreground font-medium">{agent.progress}%</span>
              </div>
              <Progress value={agent.progress} className="h-2" />
            </div>
          </Card>
        )}
      </div>
    );
  };

  const renderMessageDetails = () => {
    if (!selectedMessage) return null;

    const typeConfig = {
      request: { color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
      response: { color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
      notification: { color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20" }
    };

    const config = typeConfig[selectedMessage.type];

    return (
      <div className="space-y-6">
        {/* Message Header */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Message Details</h3>
          <div className="flex items-center space-x-3 mb-3">
            <Badge 
              variant="secondary"
              className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
            >
              {getAgentName(selectedMessage.from)}
            </Badge>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <Badge 
              variant="secondary"
              className="text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20"
            >
              {getAgentName(selectedMessage.to)}
            </Badge>
          </div>
          <Badge 
            variant="secondary" 
            className={cn(config.bg, config.color)}
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            {selectedMessage.type}
          </Badge>
        </div>

        {/* Message Content */}
        <Card className="p-4">
          <h4 className="font-medium text-foreground mb-3">Content</h4>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-foreground leading-relaxed">
              {selectedMessage.content}
            </p>
          </div>
        </Card>

        {/* Message Metadata */}
        <Card className="p-4">
          <h4 className="font-medium text-foreground mb-3">Metadata</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Timestamp</span>
              <span className="text-sm text-foreground">
                {new Date(selectedMessage.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Message ID</span>
              <span className="text-sm text-foreground font-mono">{selectedMessage.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Type</span>
              <span className="text-sm text-foreground">{selectedMessage.type}</span>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const renderDefaultContent = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
        <Bot className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">No Selection</h3>
      <p className="text-sm text-muted-foreground max-w-xs mx-auto">
        Select an agent, task, or message from the main area to view detailed information and controls.
      </p>
    </div>
  );

  const hasSelection = selectedAgent || selectedTask || selectedMessage;

  return (
    <div className="w-80 bg-card border-l border-border p-6 overflow-y-auto">
      {selectedAgent && renderAgentDetails()}
      {selectedTask && !selectedAgent && renderTaskDetails()}
      {selectedMessage && !selectedAgent && !selectedTask && renderMessageDetails()}
      {!hasSelection && renderDefaultContent()}
    </div>
  );
};
