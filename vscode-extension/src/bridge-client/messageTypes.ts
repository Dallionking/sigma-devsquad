/**
 * Message types for WebSocket communication with Vibe DevSquad platform
 */

export type MessageType = 
    | 'auth'
    | 'ping'
    | 'pong'
    | 'planning_agent_request'
    | 'planning_agent_response'
    | 'task_created'
    | 'task_updated'
    | 'project_analyzed'
    | 'file_analyzed'
    | 'error'
    | 'status_update';

export interface BaseMessage {
    type: MessageType;
    timestamp: number;
    requestId?: string;
}

export interface AuthMessage extends BaseMessage {
    type: 'auth';
    payload: {
        extensionId: string;
        version: string;
        apiKey?: string;
    };
}

export interface PingMessage extends BaseMessage {
    type: 'ping';
}

export interface PongMessage extends BaseMessage {
    type: 'pong';
}

export interface PlanningAgentRequestMessage extends BaseMessage {
    type: 'planning_agent_request';
    payload: {
        action: 'create_task' | 'analyze_project' | 'analyze_file' | 'get_suggestions';
        data: any;
    };
}

export interface PlanningAgentResponseMessage extends BaseMessage {
    type: 'planning_agent_response';
    payload: {
        success: boolean;
        result?: any;
        error?: string;
    };
}

export interface TaskCreatedMessage extends BaseMessage {
    type: 'task_created';
    payload: {
        taskId: string;
        title: string;
        description: string;
        projectId?: string;
    };
}

export interface TaskUpdatedMessage extends BaseMessage {
    type: 'task_updated';
    payload: {
        taskId: string;
        changes: Record<string, any>;
    };
}

export interface ProjectAnalyzedMessage extends BaseMessage {
    type: 'project_analyzed';
    payload: {
        projectId: string;
        analysis: any;
    };
}

export interface FileAnalyzedMessage extends BaseMessage {
    type: 'file_analyzed';
    payload: {
        fileName: string;
        analysis: any;
    };
}

export interface ErrorMessage extends BaseMessage {
    type: 'error';
    payload: {
        code: string;
        message: string;
        details?: any;
    };
}

export interface StatusUpdateMessage extends BaseMessage {
    type: 'status_update';
    payload: {
        status: 'connected' | 'disconnected' | 'error';
        message?: string;
    };
}

export type PlatformMessage = 
    | AuthMessage
    | PingMessage
    | PongMessage
    | PlanningAgentRequestMessage
    | PlanningAgentResponseMessage
    | TaskCreatedMessage
    | TaskUpdatedMessage
    | ProjectAnalyzedMessage
    | FileAnalyzedMessage
    | ErrorMessage
    | StatusUpdateMessage;
