
import { ViewMode, Agent, Task, Message } from "@/types";
import { WorkflowVisualization } from "./WorkflowVisualization";
import { CommunicationGraph } from "./CommunicationGraph";
import { TaskManagement } from "./TaskManagement";
import { MessageInspector } from "./MessageInspector";
import { AdvancedCommunicationPanel } from "@/components/planning-agent/AdvancedCommunicationPanel";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, CheckSquare, MessageSquare, GitBranch } from "lucide-react";

interface MainWorkflowAreaProps {
  viewMode: ViewMode;
  agents: Agent[];
  tasks: Task[];
  messages: Message[];
  selectedAgent: Agent | null;
  selectedTask: Task | null;
  selectedMessage: Message | null;
  onAgentSelect: (agent: Agent | null) => void;
  onTaskSelect: (task: Task | null) => void;
  onMessageSelect: (message: Message | null) => void;
}

export const MainWorkflowArea = ({ 
  viewMode, 
  agents, 
  tasks, 
  messages,
  selectedAgent,
  selectedTask,
  selectedMessage,
  onAgentSelect,
  onTaskSelect,
  onMessageSelect
}: MainWorkflowAreaProps) => {
  
  // Enhanced content header for each view mode
  const getViewModeHeader = () => {
    const headerConfig = {
      workflow: {
        icon: GitBranch,
        title: "Workflow Management",
        subtitle: "Monitor and orchestrate your AI development workflow",
        stats: {
          active: agents.filter(a => a.status === "working").length,
          total: agents.length,
          label: "Active Agents"
        }
      },
      communication: {
        icon: MessageSquare,
        title: "Agent Communication Hub",
        subtitle: "Advanced visualization and analysis of agent interactions",
        stats: {
          active: messages.filter(m => {
            const messageTime = new Date(m.timestamp).getTime();
            const oneHourAgo = Date.now() - (60 * 60 * 1000);
            return messageTime > oneHourAgo;
          }).length,
          total: messages.length,
          label: "Recent Messages"
        }
      },
      tasks: {
        icon: CheckSquare,
        title: "Task Management Center",
        subtitle: "Comprehensive task tracking and management system",
        stats: {
          active: tasks.filter(t => t.status === "in-progress").length,
          total: tasks.length,
          label: "Active Tasks"
        }
      },
      messages: {
        icon: Activity,
        title: "Message Inspector",
        subtitle: "Detailed analysis and inspection of agent messages",
        stats: {
          active: messages.filter(m => m.type === "request").length,
          total: messages.length,
          label: "Request Messages"
        }
      }
    };

    const config = headerConfig[viewMode];
    const Icon = config.icon;

    return (
      <div className="mb-6 pb-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{config.title}</h2>
              <p className="text-muted-foreground">{config.subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Card className="px-4 py-2 bg-card/50 border-border/50">
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-primary">{config.stats.active}</div>
                <div className="text-sm text-muted-foreground">
                  <div>of {config.stats.total}</div>
                  <div>{config.stats.label}</div>
                </div>
              </div>
            </Card>
            
            <Badge 
              variant="secondary" 
              className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Live Updates
            </Badge>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (viewMode) {
      case "workflow":
        return (
          <div className="h-full space-y-6">
            {getViewModeHeader()}
            <div className="flex-1">
              <WorkflowVisualization 
                agents={agents}
                tasks={tasks}
                selectedAgent={selectedAgent}
                onAgentSelect={onAgentSelect}
              />
            </div>
          </div>
        );
      case "communication":
        return (
          <div className="h-full space-y-6">
            {getViewModeHeader()}
            <div className="flex-1">
              <AdvancedCommunicationPanel
                agents={agents}
                messages={messages}
                selectedMessage={selectedMessage}
                onMessageSelect={onMessageSelect}
              />
            </div>
          </div>
        );
      case "tasks":
        return (
          <div className="h-full space-y-6">
            {getViewModeHeader()}
            <div className="flex-1">
              <TaskManagement 
                tasks={tasks}
                agents={agents}
                selectedTask={selectedTask}
                onTaskSelect={onTaskSelect}
              />
            </div>
          </div>
        );
      case "messages":
        return (
          <div className="h-full space-y-6">
            {getViewModeHeader()}
            <div className="flex-1">
              <MessageInspector 
                messages={messages}
                agents={agents}
                selectedMessage={selectedMessage}
                onMessageSelect={onMessageSelect}
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Select a view mode to get started</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-background overflow-hidden">
      <div className="h-full p-6">
        {renderContent()}
      </div>
    </div>
  );
};
