// Vibe DevSquad Types for Windsurf MCP Integration

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
  metadata?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    stream?: boolean;
  };
}

export interface FileContext {
  path: string;
  content: string;
  language?: string;
  selection?: {
    start: { line: number; character: number };
    end: { line: number; character: number };
  };
}

export interface ProjectContext {
  rootPath: string;
  files: string[];
  structure?: any;
  gitInfo?: {
    branch: string;
    remote?: string;
    uncommittedChanges?: number;
  };
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
  tags?: string[];
  projectId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalysisResult {
  summary: string;
  insights: string[];
  suggestions: string[];
  codeQuality?: {
    score: number;
    issues: string[];
  };
  dependencies?: string[];
  complexity?: number;
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  triggers?: WorkflowTrigger[];
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'research' | 'prd' | 'planning' | 'development' | 'review';
  action: string;
  parameters?: Record<string, any>;
  dependencies?: string[];
}

export interface WorkflowTrigger {
  type: 'manual' | 'schedule' | 'event';
  config: Record<string, any>;
}

export interface CollaborationSession {
  id: string;
  participants: string[];
  type: 'pair-programming' | 'code-review' | 'planning' | 'debugging';
  status: 'active' | 'paused' | 'completed';
  sharedContext?: {
    files: FileContext[];
    cursor?: { file: string; line: number; character: number };
    selection?: { file: string; start: any; end: any };
  };
}

export interface WindsurfCommand {
  command: string;
  args?: any[];
  context?: {
    workspaceFolder?: string;
    activeFile?: string;
    selection?: any;
  };
}

export interface BridgeMessage {
  type: 'request' | 'response' | 'stream' | 'error';
  id: string;
  method?: string;
  params?: any;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

export interface StreamToken {
  content: string;
  type: 'text' | 'code' | 'markdown';
  metadata?: Record<string, any>;
}
