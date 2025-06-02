export type TeamType = 
  | "frontend" 
  | "backend" 
  | "devops" 
  | "qa" 
  | "data" 
  | "design" 
  | "product";

export type TeamComposition = "human" | "ai" | "hybrid";

export type TeamRole = 
  | "lead" 
  | "senior" 
  | "mid" 
  | "junior";

export type AgentSpecialization = 
  // Frontend specializations
  | "ui-ux-designer"
  | "component-developer" 
  | "react-specialist"
  | "angular-specialist"
  | "vue-specialist"
  // Backend specializations
  | "api-developer"
  | "database-engineer"
  | "system-architect"
  | "microservices-specialist"
  // DevOps specializations
  | "infrastructure-engineer"
  | "cicd-specialist"
  | "security-expert"
  | "cloud-architect"
  // QA specializations
  | "test-engineer"
  | "automation-specialist"
  | "performance-tester"
  | "security-tester"
  // Data specializations
  | "data-engineer"
  | "ml-engineer"
  | "data-scientist"
  | "analytics-engineer"
  // Design specializations
  | "product-designer"
  | "interaction-designer"
  | "visual-designer"
  // Product specializations
  | "product-manager"
  | "business-analyst"
  | "technical-writer";

export interface Team {
  id: string;
  name: string;
  type: TeamType;
  composition: TeamComposition;
  description: string;
  leaderId?: string;
  memberIds: string[];
  color: string;
  status: "active" | "inactive" | "archived";
  createdAt: string;
  objectives: string[];
  kpis: TeamKPI[];
}

export interface TeamKPI {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: "up" | "down" | "stable";
}

export interface AgentProfile {
  id: string;
  name: string;
  teamId: string;
  role: TeamRole;
  specialization: AgentSpecialization;
  skills: AgentSkill[];
  frameworks: string[];
  experience: number; // years
  availability: "available" | "busy" | "offline";
  performanceRating: number; // 1-5
  communicationPreference: "direct" | "mediated";
  avatar: string;
  bio: string;
}

export interface AgentSkill {
  name: string;
  level: number; // 1-5
  category: "technical" | "soft" | "domain";
}

export interface TeamCommunication {
  id: string;
  teamId: string;
  fromAgentId: string;
  toAgentId?: string; // if null, it's a team-wide message
  content: string;
  type: "message" | "task-assignment" | "status-update" | "announcement";
  timestamp: string;
  attachments?: string[];
  isRead: boolean;
  priority: "low" | "medium" | "high" | "urgent";
}

export interface TeamTask {
  id: string;
  title: string;
  description: string;
  teamId: string;
  assignedAgentId?: string;
  status: "pending" | "in-progress" | "review" | "completed" | "blocked";
  priority: "low" | "medium" | "high" | "urgent";
  deadline: string;
  createdAt: string;
  estimatedHours: number;
  actualHours?: number;
  dependencies: string[];
  tags: string[];
  parentTaskId?: string; // for sub-tasks
}
