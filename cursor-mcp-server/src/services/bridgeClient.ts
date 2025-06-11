/**
 * WebSocket Bridge Client for MCP Server
 * Adapted from VS Code extension BridgeClient to work with MCP protocol
 */

import WebSocket from 'ws';
import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { 
  VibeDevSquadConfig, 
  ChatContext, 
  ChatResponse, 
  PlanningAgentRequest, 
  BridgeMessage, 
  StreamingChunk,
  PendingRequest
} from '../types/index.js';

export class BridgeClient extends EventEmitter {
  private ws: WebSocket | null = null;
  private config: VibeDevSquadConfig;
  private isReconnecting = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private pendingRequests = new Map<string, PendingRequest>();
  private requestTimeout = 30000;

  constructor(config: VibeDevSquadConfig) {
    super();
    this.config = config;
  }

  async connect(): Promise<void> {
    if (this.isReconnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
      return;
    }

    this.isReconnecting = true;

    try {
      this.ws = new WebSocket(this.config.bridgeUrl);
      
      this.ws.on('open', () => {
        console.log('[BridgeClient] Connected to Vibe DevSquad platform');
        this.isReconnecting = false;
        this.reconnectAttempts = 0;
        this.emit('connected');
      });

      this.ws.on('message', (data) => {
        try {
          const message: BridgeMessage = JSON.parse(data.toString());
          this.handleMessage(message);
        } catch (error) {
          console.error('[BridgeClient] Error parsing message:', error);
        }
      });

      this.ws.on('close', () => {
        console.log('[BridgeClient] Connection closed');
        this.isReconnecting = false;
        this.emit('disconnected');
        this.handleReconnect();
      });

      this.ws.on('error', (error) => {
        console.error('[BridgeClient] WebSocket error:', error);
        this.isReconnecting = false;
        this.emit('error', error);
      });

    } catch (error) {
      this.isReconnecting = false;
      throw error;
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    // Clear pending requests
    this.pendingRequests.forEach(({ reject, timeout }) => {
      clearTimeout(timeout);
      reject(new Error('Connection closed'));
    });
    this.pendingRequests.clear();
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  async getChatResponse(
    message: string,
    context?: ChatContext,
    onChunk?: (chunk: string) => void
  ): Promise<ChatResponse> {
    const request: PlanningAgentRequest = {
      type: 'chat',
      content: message,
      context,
      streaming: this.config.enableStreaming && !!onChunk
    };

    return this.sendRequest('planning_agent_chat', request, onChunk);
  }

  async analyzeFile(filePath: string, context?: ChatContext): Promise<any> {
    const message = `Please analyze the file at ${filePath} and provide insights, suggestions, and potential improvements.`;
    return this.getChatResponse(message, context);
  }

  async analyzeProject(projectPath: string, context?: ChatContext): Promise<any> {
    const message = `Please analyze the project at ${projectPath} and provide comprehensive insights about architecture, code quality, and recommendations.`;
    return this.getChatResponse(message, context);
  }

  async createTask(taskData: any, context?: ChatContext): Promise<any> {
    return this.sendGenericRequest('planning_agent_create_task', { taskData, context });
  }

  private async sendRequest(
    type: string,
    data: any,
    onChunk?: (chunk: string) => void
  ): Promise<ChatResponse> {
    return new Promise((resolve, reject) => {
      if (!this.isConnected()) {
        reject(new Error('Not connected to bridge server'));
        return;
      }

      const requestId = this.generateRequestId();
      const message: BridgeMessage = {
        id: requestId,
        type: 'request',
        action: type,
        data,
        timestamp: Date.now()
      };

      // Store promise resolver
      this.pendingRequests.set(requestId, { 
        resolve, 
        reject, 
        timeout: setTimeout(() => {
          if (this.pendingRequests.has(requestId)) {
            this.pendingRequests.delete(requestId);
            reject(new Error(`Request timeout: ${type}`));
          }
        }, this.requestTimeout),
        onChunk 
      });

      // Send message
      this.ws!.send(JSON.stringify(message));

    });
  }

  async sendGenericRequest(action: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.isConnected()) {
        reject(new Error('Not connected to bridge server'));
        return;
      }

      const requestId = this.generateRequestId();
      const message: BridgeMessage = {
        id: requestId,
        type: 'request',
        action,
        data,
        timestamp: Date.now()
      };

      // Store promise resolver
      this.pendingRequests.set(requestId, { 
        resolve, 
        reject, 
        timeout: setTimeout(() => {
          if (this.pendingRequests.has(requestId)) {
            this.pendingRequests.delete(requestId);
            reject(new Error(`Request timeout: ${action}`));
          }
        }, this.requestTimeout)
      });

      // Send message
      this.ws!.send(JSON.stringify(message));

    });
  }

  private generateRequestId(): string {
    return uuidv4();
  }

  private handleMessage(message: BridgeMessage): void {
    const { id, type, data } = message;

    // Handle streaming chunks
    if (type === 'streaming_chunk') {
      const chunk = data as StreamingChunk;
      this.emit(`chunk_${id}`, chunk.chunk);
      return;
    }

    // Handle responses
    if (type === 'response' || type.endsWith('_response')) {
      const pendingRequest = this.pendingRequests.get(id);
      if (pendingRequest) {
        this.pendingRequests.delete(id);
        
        if (data.error) {
          pendingRequest.reject(new Error(data.error.message || 'Request failed'));
        } else {
          pendingRequest.resolve(data);
        }
      }
    }

    // Emit the message for other handlers
    this.emit('message', message);
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      console.log(`[BridgeClient] Attempting reconnection ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms`);
      
      setTimeout(() => {
        this.connect().catch(error => {
          console.error('[BridgeClient] Reconnection failed:', error);
        });
      }, delay);
    } else {
      console.error('[BridgeClient] Max reconnection attempts reached');
      this.emit('max_reconnect_attempts_reached');
    }
  }
}
