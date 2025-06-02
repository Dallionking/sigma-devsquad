
export type ViewMode = "workflow" | "communication" | "tasks" | "messages";
export type AgentType = "planning" | "frontend" | "backend" | "qa" | "documentation" | "devops";
export type AgentStatus = "working" | "idle" | "waiting" | "error" | "active";

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
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "blocked";
  assignedAgent: AgentType | string;
  priority: "low" | "medium" | "high" | "critical";
  deadline: string;
  createdAt: string;
  dueDate?: string;
  category?: string;
  requirements?: string[];
}

export interface Message {
  id: string;
  from: AgentType | string;
  to: AgentType | string;
  content: string;
  timestamp: string;
  type: "request" | "response" | "notification" | "direct" | "file_share" | "task_assignment";
  read?: boolean;
  metadata?: {
    fileName?: string;
    fileSize?: number;
    fileType?: string;
    taskId?: string;
  };
}

export interface Team {
  id: string;
  name: string;
  description: string;
  memberIds: string[];
  members: Array<{
    id: string;
    name: string;
    role: string;
    avatar?: string;
  }>;
  objectives: string[];
  status: "active" | "inactive" | "planning";
  createdAt: string;
  lead?: string;
}
