
import { MainWorkflowContent } from "./MainWorkflowContent";
import { ViewMode, Agent, Task, Message } from "@/types";

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

export const MainWorkflowArea = (props: MainWorkflowAreaProps) => {
  return <MainWorkflowContent {...props} />;
};
