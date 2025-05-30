
export type ViewMode = "workflow" | "communication" | "tasks" | "messages";
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
  assignedAgent: AgentType;
  priority: "low" | "medium" | "high";
  deadline: string;
  createdAt: string;
}

export interface Message {
  id: string;
  from: AgentType;
  to: AgentType;
  content: string;
  timestamp: string;
  type: "request" | "response" | "notification";
}
