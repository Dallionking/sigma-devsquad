import WebSocket from 'ws';
import { EventEmitter } from 'events';
import { BridgeMessage, StreamToken } from '../types/index.js';

export class BridgeClient extends EventEmitter {
  private ws: WebSocket | null = null;
  private reconnectInterval: number = 5000;
  private maxReconnectAttempts: number = 10;
  private reconnectAttempts: number = 0;
  private messageHandlers: Map<string, (result: any) => void> = new Map();
  private streamHandlers: Map<string, (token: StreamToken) => void> = new Map();
  
  constructor(
    private url: string = process.env.VIBE_DEVSQUAD_BRIDGE_URL || 'ws://localhost:8765',
    private apiKey: string = process.env.VIBE_DEVSQUAD_API_KEY || ''
  ) {
    super();
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url, {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'X-Client-Type': 'windsurf-mcp',
            'X-Client-Version': '1.0.0'
          }
        });

        this.ws.on('open', () => {
          console.error('Connected to Vibe DevSquad Bridge');
          this.reconnectAttempts = 0;
          this.emit('connected');
          resolve();
        });

        this.ws.on('message', (data: WebSocket.Data) => {
          try {
            const message: BridgeMessage = JSON.parse(data.toString());
            this.handleMessage(message);
          } catch (error) {
            console.error('Failed to parse message:', error);
          }
        });

        this.ws.on('error', (error) => {
          console.error('WebSocket error:', error);
          this.emit('error', error);
        });

        this.ws.on('close', () => {
          console.error('Disconnected from Vibe DevSquad Bridge');
          this.emit('disconnected');
          this.attemptReconnect();
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  private handleMessage(message: BridgeMessage): void {
    if (message.type === 'response' && message.id) {
      const handler = this.messageHandlers.get(message.id);
      if (handler) {
        handler(message.result);
        this.messageHandlers.delete(message.id);
      }
    } else if (message.type === 'stream' && message.id) {
      const handler = this.streamHandlers.get(message.id);
      if (handler && message.result) {
        handler(message.result as StreamToken);
      }
    } else if (message.type === 'error' && message.id) {
      const handler = this.messageHandlers.get(message.id);
      if (handler) {
        handler(message.error);
        this.messageHandlers.delete(message.id);
      }
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    console.error(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);

    setTimeout(() => {
      this.connect().catch((error) => {
        console.error('Reconnection failed:', error);
      });
    }, this.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1));
  }

  async sendRequest(method: string, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        reject(new Error('Not connected to bridge'));
        return;
      }

      const id = this.generateId();
      const message: BridgeMessage = {
        type: 'request',
        id,
        method,
        params
      };

      this.messageHandlers.set(id, (result) => {
        if (result && result.code) {
          reject(new Error(result.message || 'Request failed'));
        } else {
          resolve(result);
        }
      });

      this.ws.send(JSON.stringify(message));
    });
  }

  async sendStreamRequest(
    method: string, 
    params: any, 
    onToken: (token: StreamToken) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        reject(new Error('Not connected to bridge'));
        return;
      }

      const id = this.generateId();
      const message: BridgeMessage = {
        type: 'request',
        id,
        method,
        params: { ...params, stream: true }
      };

      this.streamHandlers.set(id, onToken);
      
      this.messageHandlers.set(id, (result) => {
        this.streamHandlers.delete(id);
        if (result && result.code) {
          reject(new Error(result.message || 'Stream request failed'));
        } else {
          resolve();
        }
      });

      this.ws.send(JSON.stringify(message));
    });
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  async disconnect(): Promise<void> {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
