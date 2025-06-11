import * as vscode from 'vscode';
import WebSocket from 'ws';
import { MessageType, PlatformMessage, PlanningAgentRequestMessage } from './messageTypes';
import { Logger } from '../utils/logger';
import { ConnectionStatus } from '../types/extension';

export class BridgeClient {
    private ws: WebSocket | null = null;
    private reconnectTimer: NodeJS.Timeout | null = null;
    private pingTimer: NodeJS.Timeout | null = null;
    private eventEmitter = new vscode.EventEmitter<PlatformMessage>();
    private logger: Logger;
    private connectionStatus: ConnectionStatus = { connected: false };
    private reconnectAttempts = 0;
    private readonly maxReconnectAttempts = 5;
    private readonly reconnectDelay = 5000; // 5 seconds
    private readonly pingInterval = 30000; // 30 seconds

    public readonly onMessage = this.eventEmitter.event;
    private readonly onConnectionStatusChanged = new vscode.EventEmitter<ConnectionStatus>();
    public readonly onConnectionStatus = this.onConnectionStatusChanged.event;

    constructor(private serverUrl: string = 'ws://localhost:3006/api/bridge/websocket') {
        this.logger = new Logger('BridgeClient');
    }

    /**
     * Connect to the Vibe DevSquad platform
     */
    async connect(): Promise<void> {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.logger.info('Already connected to platform');
            return;
        }

        return new Promise((resolve, reject) => {
            try {
                this.logger.info(`Connecting to ${this.serverUrl}...`);
                this.ws = new WebSocket(this.serverUrl);

                this.ws.on('open', () => {
                    this.logger.info('Connected to Vibe DevSquad platform');
                    this.connectionStatus = { connected: true, lastConnected: new Date() };
                    this.onConnectionStatusChanged.fire(this.connectionStatus);
                    this.reconnectAttempts = 0;
                    
                    // Start ping/pong to keep connection alive
                    this.startPingInterval();
                    
                    // Authenticate with the platform
                    this.authenticate();
                    
                    resolve();
                });

                this.ws.on('message', (data) => {
                    try {
                        const message: PlatformMessage = JSON.parse(data.toString());
                        this.logger.debug(`Received message: ${message.type}`);
                        
                        // Handle pong messages
                        if (message.type === 'pong') {
                            this.logger.debug('Received pong from server');
                            return;
                        }
                        
                        this.eventEmitter.fire(message);
                    } catch (error) {
                        this.logger.error('Failed to parse incoming message', error);
                    }
                });

                this.ws.on('close', (code, reason) => {
                    this.logger.warn(`Connection closed: ${code} - ${reason}`);
                    this.connectionStatus = { 
                        connected: false, 
                        error: `Connection closed: ${code} - ${reason}` 
                    };
                    this.onConnectionStatusChanged.fire(this.connectionStatus);
                    
                    this.stopPingInterval();
                    this.scheduleReconnect();
                });

                this.ws.on('error', (error) => {
                    this.logger.error('WebSocket error', error);
                    this.connectionStatus = { 
                        connected: false, 
                        error: error.message 
                    };
                    this.onConnectionStatusChanged.fire(this.connectionStatus);
                    
                    if (this.reconnectAttempts === 0) {
                        // First connection attempt failed
                        reject(error);
                    }
                });

            } catch (error) {
                this.logger.error('Failed to create WebSocket connection', error);
                reject(error);
            }
        });
    }

    /**
     * Send a message to the server
     */
    send(type: MessageType, payload?: any, requestId?: string): void {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            this.logger.warn('Cannot send message: WebSocket not connected');
            return;
        }

        const message: PlanningAgentRequestMessage = {
            type: type as 'planning_agent_request',
            timestamp: Date.now(),
            requestId,
            payload: {
                action: payload?.action || 'unknown',
                data: payload?.data || payload || {}
            }
        };

        try {
            this.ws.send(JSON.stringify(message));
            this.logger.debug(`Message sent: ${type}`, { requestId });
        } catch (error) {
            this.logger.error('Failed to send message', error);
        }
    }

    /**
     * Disconnect from the platform
     */
    disconnect(): void {
        this.logger.info('Disconnecting from platform...');
        
        // Clear timers
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        
        this.stopPingInterval();
        
        // Close WebSocket
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        
        this.connectionStatus = { connected: false };
        this.onConnectionStatusChanged.fire(this.connectionStatus);
        this.reconnectAttempts = 0;
    }

    /**
     * Get current connection status
     */
    getConnectionStatus(): ConnectionStatus {
        return this.connectionStatus;
    }

    /**
     * Check if connected
     */
    isConnected(): boolean {
        return this.ws?.readyState === WebSocket.OPEN;
    }

    /**
     * Update server URL and reconnect
     */
    async updateServerUrl(url: string): Promise<void> {
        this.serverUrl = url;
        if (this.isConnected()) {
            this.disconnect();
            await this.connect();
        }
    }

    /**
     * Dispose resources
     */
    dispose(): void {
        this.disconnect();
        this.eventEmitter.dispose();
        this.onConnectionStatusChanged.dispose();
    }

    /**
     * Authenticate with the platform
     */
    private authenticate(): void {
        this.send('auth', {
            extensionId: 'vibe-devsquad-vscode',
            version: '1.0.0'
        });
    }

    /**
     * Schedule a reconnect attempt
     */
    private scheduleReconnect(): void {
        if (this.reconnectTimer || this.reconnectAttempts >= this.maxReconnectAttempts) {
            if (this.reconnectAttempts >= this.maxReconnectAttempts) {
                this.logger.error('Max reconnection attempts reached');
                vscode.window.showErrorMessage(
                    'Failed to reconnect to Vibe DevSquad platform. Please check your connection and try again.'
                );
            }
            return;
        }

        this.reconnectAttempts++;
        this.logger.info(`Scheduling reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${this.reconnectDelay}ms`);
        
        this.reconnectTimer = setTimeout(async () => {
            this.reconnectTimer = null;
            try {
                await this.connect();
            } catch (error) {
                this.logger.error('Reconnection attempt failed', error);
                this.scheduleReconnect();
            }
        }, this.reconnectDelay);
    }

    /**
     * Start ping interval to keep connection alive
     */
    private startPingInterval(): void {
        this.stopPingInterval();
        
        this.pingTimer = setInterval(() => {
            if (this.isConnected()) {
                this.send('ping', {});
            }
        }, this.pingInterval);
    }

    /**
     * Stop ping interval
     */
    private stopPingInterval(): void {
        if (this.pingTimer) {
            clearInterval(this.pingTimer);
            this.pingTimer = null;
        }
    }
}
