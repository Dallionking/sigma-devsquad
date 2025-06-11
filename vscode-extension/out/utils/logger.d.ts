export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export declare class Logger {
    private outputChannel;
    private logLevel;
    constructor(channelName: string);
    setLogLevel(level: LogLevel): void;
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, error?: any): void;
    show(): void;
    dispose(): void;
    private shouldLog;
    private log;
}
//# sourceMappingURL=logger.d.ts.map