
import { ViewMode, Agent, Task, Message } from "@/types";
import { ViewModeHeader } from "./ViewModeHeader";
import { MainWorkflowContent } from "./MainWorkflowContent";
import { ResponsiveSpacing } from "@/components/layout/ResponsiveSpacing";

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
    <div className="flex-1 bg-background overflow-hidden min-h-0">
      <ResponsiveSpacing padding="sm" className="h-full">
        <div className="h-full flex flex-col min-h-0">
          <div className="flex-shrink-0">
            <ViewModeHeader 
              viewMode={viewMode}
              agents={agents}
              tasks={tasks}
              messages={messages}
            />
          </div>
          <div className="flex-1 min-h-0 mt-3 sm:mt-4">
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
      </ResponsiveSpacing>
    </div>
  );
};
