
import { Agent, Task, Message, ViewMode } from "@/types";
import { AgentDetails } from "./detail-panel/AgentDetails";
import { TaskDetails } from "./detail-panel/TaskDetails";
import { MessageDetails } from "./detail-panel/MessageDetails";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X, Info, Settings, Activity, Play, Pause, RotateCcw } from "lucide-react";

interface DetailPanelProps {
  selectedAgent: Agent | null;
  selectedTask: Task | null;
  selectedMessage: Message | null;
  viewMode: ViewMode;
  agents: Agent[];
  onDismiss: () => void;
}

export const DetailPanel = ({ 
  selectedAgent, 
  selectedTask, 
  selectedMessage, 
  viewMode,
  agents,
  onDismiss
}: DetailPanelProps) => {
  const getSelectionInfo = () => {
    if (selectedAgent) {
      return {
        type: "Agent",
        title: selectedAgent.name,
        subtitle: selectedAgent.type,
        status: selectedAgent.status
      };
    }
    if (selectedTask) {
      return {
        type: "Task",
        title: selectedTask.title,
        subtitle: selectedTask.assignedAgent,
        status: selectedTask.status
      };
    }
    if (selectedMessage) {
      return {
        type: "Message",
        title: `${selectedMessage.from} → ${selectedMessage.to}`,
        subtitle: selectedMessage.type,
        status: null
      };
    }
    return null;
  };

  const selectionInfo = getSelectionInfo();

  const getQuickActions = () => {
    if (selectedAgent) {
      return [
        {
          label: selectedAgent.status === "working" ? "Pause" : "Start",
          icon: selectedAgent.status === "working" ? Pause : Play,
          action: () => console.log("Toggle agent"),
          variant: "outline" as const
        },
        {
          label: "Restart",
          icon: RotateCcw,
          action: () => console.log("Restart agent"),
          variant: "outline" as const,
          disabled: selectedAgent.status !== "error"
        },
        {
          label: "Configure",
          icon: Settings,
          action: () => console.log("Configure agent"),
          variant: "default" as const
        }
      ];
    }
    
    if (selectedTask) {
      return [
        {
          label: "Edit Task",
          icon: Settings,
          action: () => console.log("Edit task"),
          variant: "outline" as const
        },
        {
          label: "Reassign",
          icon: Activity,
          action: () => console.log("Reassign task"),
          variant: "outline" as const
        }
      ];
    }

    if (selectedMessage) {
      return [
        {
          label: "Reply",
          icon: Activity,
          action: () => console.log("Reply to message"),
          variant: "default" as const
        }
      ];
    }

    return [];
  };

  const quickActions = getQuickActions();

  return (
    <div className="w-80 bg-card border-l border-border overflow-hidden flex flex-col h-full">
      {/* Header with dismiss button */}
      <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {selectionInfo?.type}
            </Badge>
            {selectionInfo?.status && (
              <Badge 
                variant={
                  selectionInfo.status === "working" || selectionInfo.status === "in-progress" ? "default" : 
                  selectionInfo.status === "error" || selectionInfo.status === "blocked" ? "destructive" : 
                  "secondary"
                }
                className="text-xs"
              >
                {selectionInfo.status}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div>
          <h3 className="font-semibold text-card-foreground text-sm line-clamp-1">
            {selectionInfo?.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {selectionInfo?.subtitle}
          </p>
        </div>

        {/* Quick Actions */}
        {quickActions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant={action.variant}
                  size="sm"
                  onClick={action.action}
                  disabled={action.disabled}
                  className="h-7 px-2 text-xs"
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {action.label}
                </Button>
              );
            })}
          </div>
        )}
      </div>

      {/* Tabbed Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="details" className="h-full flex flex-col">
          <TabsList className="m-4 mb-2 grid w-auto grid-cols-2">
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
              {selectedAgent && <AgentDetails agent={selectedAgent} />}
              {selectedTask && !selectedAgent && <TaskDetails task={selectedTask} agents={agents} />}
              {selectedMessage && !selectedAgent && !selectedTask && <MessageDetails message={selectedMessage} agents={agents} />}
            </TabsContent>
            
            <TabsContent value="activity" className="mt-0">
              <Card className="p-4">
                <h4 className="font-medium text-card-foreground mb-3">Recent Activity</h4>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    {selectedAgent && "Agent activity logs will appear here"}
                    {selectedTask && "Task progress updates will appear here"}
                    {selectedMessage && "Message thread history will appear here"}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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
  );
};
