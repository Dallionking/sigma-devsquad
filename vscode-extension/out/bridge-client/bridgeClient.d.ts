import * as vscode from 'vscode';
import { MessageType, PlatformMessage } from './messageTypes';
import { ConnectionStatus } from '../types/extension';
export declare class BridgeClient {
    private serverUrl;
    private ws;
    private reconnectTimer;
    private pingTimer;
    private eventEmitter;
    private logger;
    private connectionStatus;
    private reconnectAttempts;
    private readonly maxReconnectAttempts;
    private readonly reconnectDelay;
    private readonly pingInterval;
    readonly onMessage: vscode.Event<PlatformMessage>;
    private readonly onConnectionStatusChanged;
    readonly onConnectionStatus: vscode.Event<ConnectionStatus>;
    constructor(serverUrl?: string);
    /**
     * Connect to the Vibe DevSquad platform
     */
    connect(): Promise<void>;
    /**
     * Send a message to the server
     */
    send(type: MessageType, payload?: any, requestId?: string): void;
    /**
     * Disconnect from the platform
     */
    disconnect(): void;
    /**
     * Get current connection status
     */
    getConnectionStatus(): ConnectionStatus;
    /**
     * Check if connected
     */
    isConnected(): boolean;
    /**
     * Update server URL and reconnect
     */
    updateServerUrl(url: string): Promise<void>;
    /**
     * Dispose resources
     */
    dispose(): void;
    /**
     * Authenticate with the platform
     */
    private authenticate;
    /**
     * Schedule a reconnect attempt
     */
    private scheduleReconnect;
    /**
     * Start ping interval to keep connection alive
     */
    private startPingInterval;
    /**
     * Stop ping interval
     */
    private stopPingInterval;
}
//# sourceMappingURL=bridgeClient.d.ts.map