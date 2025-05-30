
export type AgentType = 
  | "planning" 
  | "frontend" 
  | "backend" 
  | "fullstack" 
  | "design" 
  | "testing" 
  | "devops" 
  | "research" 
  | "content"
  | "custom";

export type ViewMode = "workflow" | "communication" | "tasks" | "messages";

export interface Agent {
  id: string;
  type: AgentType;
  name: string;
  status: "working" | "idle" | "error" | "offline";
  currentTask: string;
  progress: number;
  lastActive: string;
  capabilities: string[];
  specialization: string;
  background: string;
  description: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  assignedTo: string;
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  progress: number;
  dependencies?: string[];
  tags?: string[];
}

export interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  type: "direct" | "broadcast" | "system";
  priority: "low" | "medium" | "high";
  status: "sent" | "delivered" | "read";
  attachments?: string[];
}
