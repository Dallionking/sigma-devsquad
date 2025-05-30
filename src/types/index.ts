
export type ViewMode = "workflow" | "communication" | "tasks" | "messages" | "analytics";
export type AgentType = "planning" | "frontend" | "backend" | "qa" | "documentation" | "devops";
export type AgentStatus = "working" | "idle" | "waiting" | "error";

export interface Agent {
  id: string;
  type: AgentType;
  name: string;
  status: AgentStatus;
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
  status: "pending" | "in-progress" | "completed" | "blocked";
  type: string;
  assignedAgent: AgentType;
  assignedTo: string;
  priority: "low" | "medium" | "high";
  deadline: string;
  createdAt: string;
}

export interface Message {
  id: string;
  from: AgentType;
  to: AgentType;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  type: "request" | "response" | "notification";
  status: "pending" | "delivered" | "read" | "failed";
}
