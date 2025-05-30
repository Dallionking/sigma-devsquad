
import { ViewMode, Agent, Task, Message } from "@/types";
import { WorkflowVisualization } from "./WorkflowVisualization";
import { CommunicationGraph } from "./CommunicationGraph";
import { TaskManagement } from "./TaskManagement";
import { MessageInspector } from "./MessageInspector";
import { AdvancedCommunicationPanel } from "@/components/planning-agent/AdvancedCommunicationPanel";

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
  const renderContent = () => {
    switch (viewMode) {
      case "workflow":
        return (
          <div className="h-full">
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
          <div className="h-full">
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
          <div className="h-full">
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
          <div className="h-full">
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
    <div className="flex-1 bg-background overflow-hidden">
      <div className="h-full p-6">
        {renderContent()}
      </div>
    </div>
  );
};
