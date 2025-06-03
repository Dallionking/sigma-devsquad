
import React from 'react';
import { Agent, Task, Message } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MainLayoutSyncPanelProps {
  syncPanelCollapsed: boolean;
  hasSelection: boolean;
  selectedAgent: Agent | null;
  selectedTask: Task | null;
  selectedMessage: Message | null;
  onSyncPanelToggle: () => void;
  onDismissSelection: () => void;
}

export const MainLayoutSyncPanel = ({
  syncPanelCollapsed,
  hasSelection,
  selectedAgent,
  selectedTask,
  selectedMessage,
  onSyncPanelToggle,
  onDismissSelection
}: MainLayoutSyncPanelProps) => {
  if (!hasSelection) {
    return null;
  }

  return (
    <div className={cn(
      "bg-background border-l transition-all duration-300 flex flex-col",
      syncPanelCollapsed ? "w-12" : "w-80"
    )}>
      {/* Panel Header */}
      <div className="flex items-center justify-between p-3 border-b bg-muted/50">
        {!syncPanelCollapsed && (
          <h3 className="font-medium text-sm">Details</h3>
        )}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSyncPanelToggle}
            className="h-8 w-8 p-0"
          >
            {syncPanelCollapsed ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismissSelection}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Panel Content */}
      {!syncPanelCollapsed && (
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {selectedAgent && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Agent Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-medium">{selectedAgent.name}</div>
                  <div className="text-xs text-muted-foreground">{selectedAgent.type}</div>
                </div>
                <Badge 
                  variant={selectedAgent.status === 'working' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {selectedAgent.status}
                </Badge>
                {selectedAgent.currentTask && (
                  <div>
                    <div className="text-xs font-medium mb-1">Current Task</div>
                    <div className="text-xs text-muted-foreground">{selectedAgent.currentTask}</div>
                  </div>
                )}
                {selectedAgent.progress !== undefined && (
                  <div>
                    <div className="text-xs font-medium mb-1">Progress</div>
                    <div className="text-xs text-muted-foreground">{selectedAgent.progress}%</div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {selectedTask && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Task Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-medium">{selectedTask.title}</div>
                  <div className="text-xs text-muted-foreground">{selectedTask.description}</div>
                </div>
                <Badge 
                  variant={selectedTask.status === 'completed' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {selectedTask.status}
                </Badge>
                {selectedTask.assignedAgent && (
                  <div>
                    <div className="text-xs font-medium mb-1">Assigned Agent</div>
                    <div className="text-xs text-muted-foreground">{selectedTask.assignedAgent}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {selectedMessage && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Message Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-medium">{selectedMessage.from}</div>
                  <div className="text-xs text-muted-foreground">{selectedMessage.content}</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(selectedMessage.timestamp).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
