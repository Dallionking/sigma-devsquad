import { BridgeClient } from '../bridge-client/bridgeClient';
import { Task, ProjectAnalysis, FileAnalysis, ChatResponse, ChatContext } from '../types/vibeDevSquad';
export declare class PlanningService {
    private bridgeClient;
    private logger;
    private responseHandlers;
    private readonly requestTimeout;
    constructor(bridgeClient: BridgeClient);
    /**
     * Create a new task using the Planning Agent
     */
    createTask(description: string, projectId?: string): Promise<Task>;
    /**
     * Analyze a project using the Planning Agent
     */
    analyzeProject(workspacePath: string): Promise<ProjectAnalysis>;
    /**
     * Analyze a file using the Planning Agent
     */
    analyzeFile(fileName: string, content: string): Promise<FileAnalysis>;
    /**
     * Get suggestions from the Planning Agent
     */
    getSuggestions(context: string): Promise<string[]>;
    /**
     * Get chat response from the Planning Agent with streaming support
     */
    getChatResponse(message: string, context?: ChatContext[], onStreamChunk?: (chunk: string) => void): Promise<ChatResponse>;
    /**
     * Get the connection status of the bridge client
     */
    isConnected(): boolean;
    /**
     * Get connection status details
     */
    getConnectionStatus(): import("../types/extension").ConnectionStatus;
    /**
     * Handle incoming platform messages
     */
    private handlePlatformMessage;
    /**
     * Handle Planning Agent responses
     */
    private handleAgentResponse;
    /**
     * Generate a unique request ID
     */
    private generateRequestId;
    /**
     * Dispose resources
     */
    dispose(): void;
}
//# sourceMappingURL=planningService.d.ts.map