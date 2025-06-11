import * as vscode from 'vscode';
import { PlanningService } from '../planning-agent/planningService';
export declare class PlanningWebviewProvider implements vscode.WebviewViewProvider {
    private readonly extensionUri;
    private readonly planningService;
    static readonly viewType = "vibeDevSquad.planningView";
    private view?;
    private logger;
    constructor(extensionUri: vscode.Uri, planningService: PlanningService);
    resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken): void;
    /**
     * Handle messages from the webview
     */
    private handleMessage;
    /**
     * Handle chat message - main AI conversation handler
     */
    private handleChatMessage;
    /**
     * Get current file content and context
     */
    private handleGetCurrentFile;
    /**
     * Get current selection
     */
    private handleGetSelection;
    /**
     * Open file in editor
     */
    private handleOpenFile;
    /**
     * Regenerate a message
     */
    private handleRegenerateMessage;
    /**
     * Apply code changes to files
     */
    private handleApplyCodeChanges;
    /**
     * Run terminal command
     */
    private handleRunTerminalCommand;
    /**
     * Send streaming start notification
     */
    private sendStreamingStart;
    /**
     * Send streaming chunk
     */
    private sendStreamingChunk;
    /**
     * Send streaming end notification
     */
    private sendStreamingEnd;
    /**
     * Send file context data
     */
    private sendFileContext;
    /**
     * Send code applied notification
     */
    private sendCodeApplied;
    /**
     * Send terminal output notification
     */
    private sendTerminalOutput;
    /**
     * Handle create task request
     */
    private handleCreateTask;
    /**
     * Handle analyze project request
     */
    private handleAnalyzeProject;
    /**
     * Handle analyze file request
     */
    private handleAnalyzeFile;
    /**
     * Handle get suggestions request
     */
    private handleGetSuggestions;
    /**
     * Handle get connection status request
     */
    private handleGetConnectionStatus;
    /**
     * Handle refresh connection request
     */
    private handleRefreshConnection;
    /**
     * Send response back to webview
     */
    private sendResponse;
    /**
     * Update connection status in the webview
     */
    private updateConnectionStatus;
    /**
     * Get HTML content for the webview
     */
    private getHtmlForWebview;
    /**
     * Generate a nonce for Content Security Policy
     */
    private getNonce;
}
//# sourceMappingURL=planningPanel.d.ts.map