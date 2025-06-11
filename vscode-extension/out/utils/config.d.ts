import * as vscode from 'vscode';
import { ExtensionConfig } from '../types/extension';
export declare class ConfigManager {
    private readonly configSection;
    getConfig(): ExtensionConfig;
    getServerUrl(): string;
    getAutoConnect(): boolean;
    getApiKey(): string;
    getLogLevel(): 'debug' | 'info' | 'warn' | 'error';
    setServerUrl(url: string): Promise<void>;
    setAutoConnect(autoConnect: boolean): Promise<void>;
    setApiKey(apiKey: string): Promise<void>;
    setLogLevel(level: 'debug' | 'info' | 'warn' | 'error'): Promise<void>;
    /**
     * Watch for configuration changes
     */
    onConfigurationChanged(callback: (config: ExtensionConfig) => void): vscode.Disposable;
}
//# sourceMappingURL=config.d.ts.map