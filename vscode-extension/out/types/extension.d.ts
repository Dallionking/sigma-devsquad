/**
 * Extension-specific type definitions
 */
export interface ExtensionConfig {
    serverUrl: string;
    autoConnect: boolean;
    apiKey: string;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
}
export interface ConnectionStatus {
    connected: boolean;
    lastConnected?: Date;
    error?: string;
}
export interface WebviewMessage {
    command: string;
    data?: any;
    requestId?: string;
}
export interface WebviewResponse {
    command: string;
    success: boolean;
    data?: any;
    error?: string;
    requestId?: string;
}
//# sourceMappingURL=extension.d.ts.map