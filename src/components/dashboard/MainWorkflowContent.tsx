
import { ViewMode, Agent, Task, Message } from "@/types";
import { WorkflowVisualization } from "./WorkflowVisualization";
import { TaskManagement } from "./TaskManagement";
import { MessageInspector } from "./MessageInspector";
import { AdvancedCommunicationPanel } from "@/components/planning-agent/AdvancedCommunicationPanel";

interface MainWorkflowContentProps {
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

export const MainWorkflowContent = ({
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
}: MainWorkflowContentProps) => {
  const renderContent = () => {
    switch (viewMode) {
      case "workflow":
        return (
          <div 
            className="workflow-visualization"
            data-tour="team-projects"
            data-testid="team-projects"
          >
            <WorkflowVisualization 
              agents={agents}
              tasks={tasks}
              selectedAgent={selectedAgent}
              onAgentSelect={onAgentSelect}
            />
          </div>
        );
      case "communication":
        return (
          <div 
            className="communication-hub unified-communication-hub"
            data-tour="team-communication"
            data-testid="communication-hub"
          >
            <AdvancedCommunicationPanel
              agents={agents}
              messages={messages}
              selectedMessage={selectedMessage}
              onMessageSelect={onMessageSelect}
            />
          </div>
        );
      case "tasks":
        return (
          <div 
            className="task-management"
            data-tour="team-tasks"
            data-testid="team-tasks"
          >
            <TaskManagement 
              tasks={tasks}
              agents={agents}
              selectedTask={selectedTask}
              onTaskSelect={onTaskSelect}
            />
          </div>
        );
      case "messages":
        return (
          <div 
            className="message-inspector"
            data-tour="team-messages"
            data-testid="team-messages"
          >
            <MessageInspector 
              messages={messages}
              agents={agents}
              selectedMessage={selectedMessage}
              onMessageSelect={onMessageSelect}
            />
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
    <div className="flex-1">
      {renderContent()}
    </div>
  );
};
