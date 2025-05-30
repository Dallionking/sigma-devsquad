
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
  | "custom"
  | "qa"
  | "documentation";

export type ViewMode = "workflow" | "communication" | "tasks" | "messages";

export interface Agent {
  id: string;
  type: AgentType;
  name: string;
  status: "working" | "idle" | "error" | "offline" | "waiting";
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
  status: "pending" | "in-progress" | "completed" | "failed" | "blocked";
  assignedTo: string;
  assignedAgent?: string; // For backward compatibility
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  deadline?: string; // For backward compatibility
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
  type: "direct" | "broadcast" | "system" | "request" | "response" | "notification";
  priority: "low" | "medium" | "high";
  status: "sent" | "delivered" | "read";
  attachments?: string[];
}
