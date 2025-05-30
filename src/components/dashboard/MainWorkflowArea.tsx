
import { ViewMode, Agent, Task, Message } from "@/types";
import { ViewModeHeader } from "./ViewModeHeader";
import { MainWorkflowContent } from "./MainWorkflowContent";

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
  return (
    <div className="flex-1 bg-background overflow-hidden">
      <div className="h-full p-6">
        <div className="h-full space-y-6">
          <ViewModeHeader 
            viewMode={viewMode}
            agents={agents}
            tasks={tasks}
            messages={messages}
          />
          <MainWorkflowContent
            viewMode={viewMode}
            agents={agents}
            tasks={tasks}
            messages={messages}
            selectedAgent={selectedAgent}
            selectedTask={selectedTask}
            selectedMessage={selectedMessage}
            onAgentSelect={onAgentSelect}
            onTaskSelect={onTaskSelect}
            onMessageSelect={onMessageSelect}
          />
        </div>
      </div>
    </div>
  );
};
