import { BridgeClient } from '../bridge-client/bridgeClient';
import { Task, Project, AgentResponse, ProjectAnalysis, FileAnalysis, ChatResponse, ChatContext, ChatMessage } from '../types/vibeDevSquad';
import { Logger } from '../utils/logger';
import { PlatformMessage } from '../bridge-client/messageTypes';

export class PlanningService {
    private logger: Logger;
    private responseHandlers = new Map<string, (response: AgentResponse) => void>();
    private readonly requestTimeout = 30000; // 30 seconds

    constructor(private bridgeClient: BridgeClient) {
        this.logger = new Logger('PlanningService');
        
        // Listen for Planning Agent responses
        this.bridgeClient.onMessage(message => {
            this.handlePlatformMessage(message);
        });
    }

    /**
     * Create a new task using the Planning Agent
     */
    async createTask(description: string, projectId?: string): Promise<Task> {
        return new Promise((resolve, reject) => {
            const requestId = this.generateRequestId();
            
            // Set up response handler
            const timeout = setTimeout(() => {
                this.responseHandlers.delete(requestId);
                reject(new Error('Request timeout: Failed to create task'));
            }, this.requestTimeout);
            
            const handler = (response: AgentResponse) => {
                clearTimeout(timeout);
                this.responseHandlers.delete(requestId);
                
                if (response.success && response.result) {
                    resolve(response.result as Task);
                } else {
                    reject(new Error(response.error || 'Failed to create task'));
                }
            };
            
            this.responseHandlers.set(requestId, handler);
            
            // Send request to platform
            this.bridgeClient.send('planning_agent_request', {
                action: 'create_task',
                data: { description, projectId }
            }, requestId);
            
            this.logger.info(`Creating task: ${description}`);
        });
    }

    /**
     * Analyze a project using the Planning Agent
     */
    async analyzeProject(workspacePath: string): Promise<ProjectAnalysis> {
        return new Promise((resolve, reject) => {
            const requestId = this.generateRequestId();
            
            const timeout = setTimeout(() => {
                this.responseHandlers.delete(requestId);
                reject(new Error('Request timeout: Failed to analyze project'));
            }, this.requestTimeout);
            
            const handler = (response: AgentResponse) => {
                clearTimeout(timeout);
                this.responseHandlers.delete(requestId);
                
                if (response.success && response.result) {
                    resolve(response.result as ProjectAnalysis);
                } else {
                    reject(new Error(response.error || 'Failed to analyze project'));
                }
            };
            
            this.responseHandlers.set(requestId, handler);
            
            // Send request to platform
            this.bridgeClient.send('planning_agent_request', {
                action: 'analyze_project',
                data: { workspacePath }
            }, requestId);
            
            this.logger.info(`Analyzing project: ${workspacePath}`);
        });
    }

    /**
     * Analyze a file using the Planning Agent
     */
    async analyzeFile(fileName: string, content: string): Promise<FileAnalysis> {
        return new Promise((resolve, reject) => {
            const requestId = this.generateRequestId();
            
            const timeout = setTimeout(() => {
                this.responseHandlers.delete(requestId);
                reject(new Error('Request timeout: Failed to analyze file'));
            }, this.requestTimeout);
            
            const handler = (response: AgentResponse) => {
                clearTimeout(timeout);
                this.responseHandlers.delete(requestId);
                
                if (response.success && response.result) {
                    resolve(response.result as FileAnalysis);
                } else {
                    reject(new Error(response.error || 'Failed to analyze file'));
                }
            };
            
            this.responseHandlers.set(requestId, handler);
            
            // Send request to platform
            this.bridgeClient.send('planning_agent_request', {
                action: 'analyze_file',
                data: { fileName, content }
            }, requestId);
            
            this.logger.info(`Analyzing file: ${fileName}`);
        });
    }

    /**
     * Get suggestions from the Planning Agent
     */
    async getSuggestions(context: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            const requestId = this.generateRequestId();
            
            const timeout = setTimeout(() => {
                this.responseHandlers.delete(requestId);
                reject(new Error('Request timeout: Failed to get suggestions'));
            }, this.requestTimeout);
            
            const handler = (response: AgentResponse) => {
                clearTimeout(timeout);
                this.responseHandlers.delete(requestId);
                
                if (response.success && response.result) {
                    resolve(response.result as string[]);
                } else {
                    reject(new Error(response.error || 'Failed to get suggestions'));
                }
            };
            
            this.responseHandlers.set(requestId, handler);
            
            // Send request to platform
            this.bridgeClient.send('planning_agent_request', {
                action: 'get_suggestions',
                data: { context }
            }, requestId);
            
            this.logger.info('Getting suggestions from Planning Agent');
        });
    }

    /**
     * Get chat response from the Planning Agent with streaming support
     */
    async getChatResponse(
        message: string, 
        context?: ChatContext[], 
        onStreamChunk?: (chunk: string) => void
    ): Promise<ChatResponse> {
        return new Promise((resolve, reject) => {
            const requestId = this.generateRequestId();
            const responseId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            let fullMessage = '';
            const chunks: string[] = [];
            
            const timeout = setTimeout(() => {
                this.responseHandlers.delete(requestId);
                reject(new Error('Request timeout: Failed to get chat response'));
            }, this.requestTimeout);
            
            const handler = (response: AgentResponse) => {
                if (response.result?.type === 'chat_chunk') {
                    // Handle streaming chunk
                    const chunk = response.result.chunk;
                    fullMessage += chunk;
                    chunks.push(chunk);
                    
                    if (onStreamChunk) {
                        onStreamChunk(chunk);
                    }
                } else if (response.result?.type === 'chat_complete') {
                    // Handle completion
                    clearTimeout(timeout);
                    this.responseHandlers.delete(requestId);
                    
                    const chatResponse: ChatResponse = {
                        id: responseId,
                        message: fullMessage || response.result.message,
                        model: response.result.model,
                        tokens: response.result.tokens,
                        streaming: chunks.length > 0,
                        chunks: chunks,
                        timestamp: Date.now()
                    };
                    
                    resolve(chatResponse);
                } else if (!response.success) {
                    // Handle error
                    clearTimeout(timeout);
                    this.responseHandlers.delete(requestId);
                    reject(new Error(response.error || 'Failed to get chat response'));
                }
            };
            
            this.responseHandlers.set(requestId, handler);
            
            // Send request to platform
            this.bridgeClient.send('planning_agent_request', {
                action: 'chat_message',
                data: { 
                    message, 
                    context: context || [],
                    requestId,
                    responseId,
                    streaming: true
                }
            }, requestId);
            
            this.logger.info(`Getting chat response for message: ${message.substring(0, 100)}...`);
        });
    }

    /**
     * Get the connection status of the bridge client
     */
    isConnected(): boolean {
        return this.bridgeClient.isConnected();
    }

    /**
     * Get connection status details
     */
    getConnectionStatus() {
        return this.bridgeClient.getConnectionStatus();
    }

    /**
     * Handle incoming platform messages
     */
    private handlePlatformMessage(message: PlatformMessage): void {
        switch (message.type) {
            case 'planning_agent_response':
                this.handleAgentResponse(message.payload);
                break;
                
            case 'task_created':
                this.logger.info(`Task created: ${message.payload.title}`);
                break;
                
            case 'task_updated':
                this.logger.info(`Task updated: ${message.payload.taskId}`);
                break;
                
            case 'project_analyzed':
                this.logger.info(`Project analyzed: ${message.payload.projectId}`);
                break;
                
            case 'file_analyzed':
                this.logger.info(`File analyzed: ${message.payload.fileName}`);
                break;
                
            case 'error':
                this.logger.error(`Platform error: ${message.payload.message}`);
                break;
                
            default:
                this.logger.debug(`Unhandled message type: ${message.type}`);
        }
    }

    /**
     * Handle Planning Agent responses
     */
    private handleAgentResponse(response: any): void {
        if (!response.requestId) {
            this.logger.warn('Received response without requestId');
            return;
        }
        
        const handler = this.responseHandlers.get(response.requestId);
        if (handler) {
            const agentResponse: AgentResponse = {
                requestId: response.requestId,
                success: response.success,
                result: response.result,
                error: response.error,
                timestamp: response.timestamp || Date.now()
            };
            
            handler(agentResponse);
        } else {
            this.logger.warn(`No handler found for requestId: ${response.requestId}`);
        }
    }

    /**
     * Generate a unique request ID
     */
    private generateRequestId(): string {
        return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Dispose resources
     */
    dispose(): void {
        // Clear any pending response handlers
        this.responseHandlers.clear();
    }
}
