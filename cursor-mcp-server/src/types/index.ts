/**
 * Vibe DevSquad MCP Types
 * Types and interfaces for the Cursor MCP server integration
 */

// Re-export shared types from VS Code extension (adapted for MCP)
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  model?: string;
  tokens?: number;
  streaming?: boolean;
  chunks?: string[];
}

export interface ChatContext {
  currentFile?: {
    path: string;
    content: string;
    language: string;
    selection?: {
      start: { line: number; character: number };
      end: { line: number; character: number };
    };
  };
  workspaceRoot?: string;
  openFiles?: Array<{
    path: string;
    language: string;
  }>;
  projectContext?: {
    name: string;
    description?: string;
    technologies?: string[];
  };
}

export interface ChatResponse {
  id: string;
  message: string;
  model: string;
  tokens: number;
  streaming: boolean;
  chunks?: string[];
}

// MCP-specific types for Vibe DevSquad integration
export interface VibeDevSquadConfig {
  bridgeUrl: string;
  apiKey?: string;
  planningAgentId?: string;
  enableStreaming: boolean;
  maxTokens: number;
}

export interface PlanningAgentRequest {
  type: 'chat' | 'analyze' | 'suggest' | 'create_task';
  content: string;
  context?: ChatContext;
  streaming?: boolean;
}

export interface PlanningAgentResponse {
  id: string;
  type: string;
  content: string;
  metadata?: Record<string, any>;
  streaming?: boolean;
  chunks?: string[];
}

// Task Management Types (adapted from VS Code extension)
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  createdAt: number;
  updatedAt: number;
  dueDate?: number;
  tags?: string[];
  dependencies?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  createdAt: number;
  updatedAt: number;
  tasks: Task[];
  members?: string[];
  technologies?: string[];
}

// WebSocket Bridge Types
export interface BridgeMessage {
  id: string;
  type: string;
  action?: string;
  data?: any;
  timestamp?: number;
  error?: VibeDevSquadError;
}

export interface PendingRequest {
  resolve: (value: any) => void;
  reject: (error: any) => void;
  timeout: NodeJS.Timeout;
  timestamp?: number;
  onChunk?: (chunk: string) => void;
}

export interface StreamingChunk {
  id: string;
  chunk: string;
  index: number;
  final: boolean;
}

// Error handling
export interface MCPError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface VibeDevSquadError extends MCPError {
  // Add properties specific to VibeDevSquadError if needed
}

// Tool execution results
export interface ToolResult {
  success: boolean;
  data?: any;
  error?: MCPError;
  streaming?: boolean;
  chunks?: StreamingChunk[];
}
