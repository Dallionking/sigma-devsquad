/**
 * Type definitions for Vibe DevSquad platform integration
 */

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high';
    projectId?: string;
    assignee?: string;
    createdAt: Date;
    updatedAt: Date;
    dueDate?: Date;
    tags?: string[];
    dependencies?: string[];
}

export interface Project {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'completed' | 'archived';
    createdAt: Date;
    updatedAt: Date;
    tasks?: Task[];
    metadata?: Record<string, any>;
}

export interface AgentResponse {
    requestId: string;
    success: boolean;
    result?: any;
    error?: string;
    timestamp: number;
}

export interface ProjectAnalysis {
    projectId: string;
    structure: {
        totalFiles: number;
        languages: string[];
        frameworks: string[];
        dependencies: string[];
    };
    complexity: {
        score: number;
        factors: string[];
    };
    recommendations: string[];
    suggestedTasks: Partial<Task>[];
}

export interface FileAnalysis {
    fileName: string;
    language: string;
    complexity: number;
    issues: Array<{
        type: 'warning' | 'error' | 'info';
        message: string;
        line?: number;
    }>;
    suggestions: string[];
}

export interface ChatResponse {
    id: string;
    message: string;
    model?: string;
    tokens?: number;
    streaming?: boolean;
    chunks?: string[];
    timestamp: number;
}

export interface ChatContext {
    type: 'file' | 'selection' | 'project';
    name?: string;
    path?: string;
    content?: string;
    text?: string;
    language?: string;
    range?: {
        start: { line: number; character: number };
        end: { line: number; character: number };
    };
}

export interface ChatMessage {
    type: 'user' | 'ai';
    content: string;
    timestamp: number;
    context?: ChatContext[];
    id?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}
