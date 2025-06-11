import * as vscode from 'vscode';
import { ExtensionConfig } from '../types/extension';

export class ConfigManager {
    private readonly configSection = 'vibeDevSquad';

    getConfig(): ExtensionConfig {
        const config = vscode.workspace.getConfiguration(this.configSection);
        
        return {
            serverUrl: config.get<string>('serverUrl', 'ws://localhost:3006'),
            autoConnect: config.get<boolean>('autoConnect', true),
            apiKey: config.get<string>('apiKey', ''),
            logLevel: config.get<'debug' | 'info' | 'warn' | 'error'>('logLevel', 'info')
        };
    }

    getServerUrl(): string {
        const config = vscode.workspace.getConfiguration(this.configSection);
        return config.get<string>('serverUrl', 'ws://localhost:3006');
    }

    getAutoConnect(): boolean {
        const config = vscode.workspace.getConfiguration(this.configSection);
        return config.get<boolean>('autoConnect', true);
    }

    getApiKey(): string {
        const config = vscode.workspace.getConfiguration(this.configSection);
        return config.get<string>('apiKey', '');
    }

    getLogLevel(): 'debug' | 'info' | 'warn' | 'error' {
        const config = vscode.workspace.getConfiguration(this.configSection);
        return config.get<'debug' | 'info' | 'warn' | 'error'>('logLevel', 'info');
    }

    async setServerUrl(url: string): Promise<void> {
        const config = vscode.workspace.getConfiguration(this.configSection);
        await config.update('serverUrl', url, vscode.ConfigurationTarget.Global);
    }

    async setAutoConnect(autoConnect: boolean): Promise<void> {
        const config = vscode.workspace.getConfiguration(this.configSection);
        await config.update('autoConnect', autoConnect, vscode.ConfigurationTarget.Global);
    }

    async setApiKey(apiKey: string): Promise<void> {
        const config = vscode.workspace.getConfiguration(this.configSection);
        await config.update('apiKey', apiKey, vscode.ConfigurationTarget.Global);
    }

    async setLogLevel(level: 'debug' | 'info' | 'warn' | 'error'): Promise<void> {
        const config = vscode.workspace.getConfiguration(this.configSection);
        await config.update('logLevel', level, vscode.ConfigurationTarget.Global);
    }

    /**
     * Watch for configuration changes
     */
    onConfigurationChanged(callback: (config: ExtensionConfig) => void): vscode.Disposable {
        return vscode.workspace.onDidChangeConfiguration(event => {
            if (event.affectsConfiguration(this.configSection)) {
                callback(this.getConfig());
            }
        });
    }
}
