
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
          <WorkflowVisualization 
            agents={agents}
            tasks={tasks}
            selectedAgent={selectedAgent}
            onAgentSelect={onAgentSelect}
          />
        );
      case "communication":
        return (
          <AdvancedCommunicationPanel
            agents={agents}
            messages={messages}
            selectedMessage={selectedMessage}
            onMessageSelect={onMessageSelect}
          />
        );
      case "tasks":
        return (
          <TaskManagement 
            tasks={tasks}
            agents={agents}
            selectedTask={selectedTask}
            onTaskSelect={onTaskSelect}
          />
        );
      case "messages":
        return (
          <MessageInspector 
            messages={messages}
            agents={agents}
            selectedMessage={selectedMessage}
            onMessageSelect={onMessageSelect}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-background p-6 overflow-auto">
      {renderContent()}
    </div>
  );
};
