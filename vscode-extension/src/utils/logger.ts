import * as vscode from 'vscode';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class Logger {
    private outputChannel: vscode.OutputChannel;
    private logLevel: LogLevel = 'info';

    constructor(channelName: string) {
        this.outputChannel = vscode.window.createOutputChannel(channelName);
    }

    setLogLevel(level: LogLevel): void {
        this.logLevel = level;
    }

    debug(message: string, ...args: any[]): void {
        if (this.shouldLog('debug')) {
            this.log('DEBUG', message, ...args);
        }
    }

    info(message: string, ...args: any[]): void {
        if (this.shouldLog('info')) {
            this.log('INFO', message, ...args);
        }
    }

    warn(message: string, ...args: any[]): void {
        if (this.shouldLog('warn')) {
            this.log('WARN', message, ...args);
        }
    }

    error(message: string, error?: any): void {
        if (this.shouldLog('error')) {
            let errorMessage = message;
            if (error) {
                if (error instanceof Error) {
                    errorMessage += `: ${error.message}`;
                    if (error.stack) {
                        errorMessage += `\nStack: ${error.stack}`;
                    }
                } else {
                    errorMessage += `: ${JSON.stringify(error)}`;
                }
            }
            this.log('ERROR', errorMessage);
        }
    }

    show(): void {
        this.outputChannel.show();
    }

    dispose(): void {
        this.outputChannel.dispose();
    }

    private shouldLog(level: LogLevel): boolean {
        const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
        const currentLevelIndex = levels.indexOf(this.logLevel);
        const messageLevelIndex = levels.indexOf(level);
        return messageLevelIndex >= currentLevelIndex;
    }

    private log(level: string, message: string, ...args: any[]): void {
        const timestamp = new Date().toISOString();
        let logMessage = `[${timestamp}] [${level}] ${message}`;
        
        if (args.length > 0) {
            logMessage += ' ' + args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
            ).join(' ');
        }
        
        this.outputChannel.appendLine(logMessage);
        
        // Also log to console for debugging
        if (level === 'ERROR') {
            console.error(logMessage);
        } else if (level === 'WARN') {
            console.warn(logMessage);
        } else {
            console.log(logMessage);
        }
    }
}
