
import { Agent, Task, Message, ViewMode } from "@/types";
import { AgentDetails } from "./detail-panel/AgentDetails";
import { TaskDetails } from "./detail-panel/TaskDetails";
import { MessageDetails } from "./detail-panel/MessageDetails";
import { DefaultContent } from "./detail-panel/DefaultContent";

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
  const hasSelection = selectedAgent || selectedTask || selectedMessage;

  return (
    <div className="w-80 bg-card border-l border-border p-6 overflow-y-auto">
      {selectedAgent && <AgentDetails agent={selectedAgent} />}
      {selectedTask && !selectedAgent && <TaskDetails task={selectedTask} agents={agents} />}
      {selectedMessage && !selectedAgent && !selectedTask && <MessageDetails message={selectedMessage} agents={agents} />}
      {!hasSelection && <DefaultContent />}
    </div>
  );
};
