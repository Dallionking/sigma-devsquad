
import { ViewMode, Agent, Task, Message } from "@/types";
import { ViewModeHeader } from "./ViewModeHeader";
import { MainWorkflowContent } from "./MainWorkflowContent";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  return (
    <div className="flex-1 bg-gradient-to-br from-background via-background/95 to-slate-50/50 dark:to-slate-950/50 overflow-hidden min-h-0 relative">
      {/* Enhanced background texture */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.015] dark:opacity-[0.025]" />
      
      <div className={cn(
        "h-full flex flex-col min-h-0 relative z-10",
        isMobile ? "p-4" : "p-6 lg:p-8"
      )}>
        <div className="flex-shrink-0 animate-in fade-in-0 slide-in-from-top-4 duration-500">
          <ViewModeHeader 
            viewMode={viewMode}
            agents={agents}
            tasks={tasks}
            messages={messages}
          />
        </div>
        
        <div className="flex-1 min-h-0 mt-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
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
