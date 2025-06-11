import * as vscode from 'vscode';
import { PlanningService } from '../planning-agent/planningService';
import { Logger } from '../utils/logger';
import { WebviewMessage, WebviewResponse } from '../types/extension';

export class PlanningWebviewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'vibeDevSquad.planningView';
    private view?: vscode.WebviewView;
    private logger: Logger;

    constructor(
        private readonly extensionUri: vscode.Uri,
        private readonly planningService: PlanningService
    ) {
        this.logger = new Logger('PlanningWebview');
    }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        token: vscode.CancellationToken
    ) {
        this.view = webviewView;

        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [
                this.extensionUri,
                vscode.Uri.joinPath(this.extensionUri, 'src', 'webview', 'assets')
            ]
        };

        webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(async (message: WebviewMessage) => {
            await this.handleMessage(message);
        });

        // Listen for connection status changes
        this.planningService.getConnectionStatus();
        this.updateConnectionStatus();

        this.logger.info('Planning Agent webview initialized');
    }

    /**
     * Handle messages from the webview
     */
    private async handleMessage(message: WebviewMessage): Promise<void> {
        try {
            switch (message.command) {
                // Legacy commands
                case 'createTask':
                    await this.handleCreateTask(message);
                    break;

                case 'analyzeProject':
                    await this.handleAnalyzeProject(message);
                    break;

                case 'analyzeFile':
                    await this.handleAnalyzeFile(message);
                    break;

                case 'getSuggestions':
                    await this.handleGetSuggestions(message);
                    break;

                case 'getConnectionStatus':
                case 'get_connection_status':
                    await this.handleGetConnectionStatus(message);
                    break;

                case 'refreshConnection':
                    await this.handleRefreshConnection(message);
                    break;

                // New chat interface commands
                case 'chat_message':
                    await this.handleChatMessage(message);
                    break;

                case 'get_current_file':
                    await this.handleGetCurrentFile(message);
                    break;

                case 'get_selection':
                    await this.handleGetSelection(message);
                    break;

                case 'open_file':
                    await this.handleOpenFile(message);
                    break;

                case 'regenerate_message':
                    await this.handleRegenerateMessage(message);
                    break;

                case 'apply_code_changes':
                    await this.handleApplyCodeChanges(message);
                    break;

                case 'run_terminal_command':
                    await this.handleRunTerminalCommand(message);
                    break;

                default:
                    this.logger.warn(`Unknown command: ${message.command}`);
                    this.sendResponse(message, false, null, 'Unknown command');
            }
        } catch (error) {
            this.logger.error(`Error handling message: ${message.command}`, error);
            this.sendResponse(
                message, 
                false, 
                null, 
                error instanceof Error ? error.message : 'Unknown error'
            );
        }
    }

    /**
     * Handle chat message - main AI conversation handler
     */
    private async handleChatMessage(message: WebviewMessage): Promise<void> {
        if (!this.planningService.isConnected()) {
            this.sendResponse(message, false, null, 'Not connected to platform');
            return;
        }

        const { message: userMessage, context, conversationHistory } = message.data;
        
        if (!userMessage?.trim()) {
            this.sendResponse(message, false, null, 'Message is required');
            return;
        }

        try {
            // Start streaming response
            this.sendStreamingStart(message);

            // Get AI response from planning service with full context
            const response = await this.planningService.getChatResponse(
                userMessage.trim(),
                context || [],
                conversationHistory || []
            );

            // Send streaming chunks
            if (response.streaming && response.chunks) {
                // Handle streaming response
                for (const chunk of response.chunks) {
                    this.sendStreamingChunk(message, chunk);
                }
                this.sendStreamingEnd(message, {
                    id: response.id,
                    model: response.model,
                    tokens: response.tokens
                });
            } else {
                // Handle non-streaming response
                this.sendStreamingChunk(message, response.message);
                this.sendStreamingEnd(message, {
                    id: response.id,
                    model: response.model,
                    tokens: response.tokens
                });
            }

            this.logger.info(`Chat response generated: ${response.id}`);
        } catch (error) {
            this.sendResponse(message, false, null, 
                error instanceof Error ? error.message : 'Failed to get AI response');
        }
    }

    /**
     * Get current file content and context
     */
    private async handleGetCurrentFile(message: WebviewMessage): Promise<void> {
        try {
            const activeEditor = vscode.window.activeTextEditor;
            if (!activeEditor) {
                this.sendFileContext(message, null, 'No active file');
                return;
            }

            const document = activeEditor.document;
            const fileName = document.fileName;
            const content = document.getText();

            this.sendFileContext(message, {
                type: 'file',
                name: fileName.split('/').pop() || fileName,
                path: fileName,
                content: content,
                language: document.languageId
            });
        } catch (error) {
            this.sendFileContext(message, null, 
                error instanceof Error ? error.message : 'Failed to get current file');
        }
    }

    /**
     * Get current selection
     */
    private async handleGetSelection(message: WebviewMessage): Promise<void> {
        try {
            const activeEditor = vscode.window.activeTextEditor;
            if (!activeEditor) {
                this.sendFileContext(message, null, 'No active editor');
                return;
            }

            const selection = activeEditor.selection;
            if (selection.isEmpty) {
                this.sendFileContext(message, null, 'No text selected');
                return;
            }

            const selectedText = activeEditor.document.getText(selection);
            const fileName = activeEditor.document.fileName;

            this.sendFileContext(message, {
                type: 'selection',
                text: selectedText,
                file: fileName,
                range: {
                    start: { line: selection.start.line, character: selection.start.character },
                    end: { line: selection.end.line, character: selection.end.character }
                }
            });
        } catch (error) {
            this.sendFileContext(message, null, 
                error instanceof Error ? error.message : 'Failed to get selection');
        }
    }

    /**
     * Open file in editor
     */
    private async handleOpenFile(message: WebviewMessage): Promise<void> {
        try {
            const { path } = message.data;
            if (!path) {
                this.sendResponse(message, false, null, 'File path is required');
                return;
            }

            const uri = vscode.Uri.file(path);
            await vscode.window.showTextDocument(uri);
            this.sendResponse(message, true, { opened: path });
        } catch (error) {
            this.sendResponse(message, false, null, 
                error instanceof Error ? error.message : 'Failed to open file');
        }
    }

    /**
     * Regenerate a message
     */
    private async handleRegenerateMessage(message: WebviewMessage): Promise<void> {
        try {
            const { messageId, originalMessage, context } = message.data;
            this.logger.info(`Regenerating message: ${messageId}`);
            
            if (!originalMessage) {
                this.sendResponse(message, false, null, 'Original message is required for regeneration');
                return;
            }

            // Send streaming start notification
            this.sendStreamingStart(message);

            // Get regenerated response from planning service
            const response = await this.planningService.getChatResponse(
                originalMessage,
                context,
                (chunk: string) => {
                    // Send each streaming chunk
                    this.sendStreamingChunk(message, chunk);
                }
            );

            // Send streaming chunks
            if (response.streaming && response.chunks) {
                // Handle streaming response
                for (const chunk of response.chunks) {
                    this.sendStreamingChunk(message, chunk);
                }
                this.sendStreamingEnd(message, {
                    id: response.id,
                    model: response.model,
                    tokens: response.tokens,
                    regenerated: true,
                    originalMessageId: messageId
                });
            } else {
                // Handle non-streaming response
                this.sendStreamingChunk(message, response.message);
                this.sendStreamingEnd(message, {
                    id: response.id,
                    model: response.model,
                    tokens: response.tokens,
                    regenerated: true,
                    originalMessageId: messageId
                });
            }

        } catch (error) {
            this.logger.error('Error regenerating message:', error);
            this.sendResponse(message, false, null, 
                error instanceof Error ? error.message : 'Failed to regenerate message');
        }
    }

    /**
     * Apply code changes to files
     */
    private async handleApplyCodeChanges(message: WebviewMessage): Promise<void> {
        try {
            const { changes } = message.data;
            if (!changes || !Array.isArray(changes)) {
                this.sendResponse(message, false, null, 'Invalid changes data');
                return;
            }

            for (const change of changes) {
                const { file, content, range } = change;
                const uri = vscode.Uri.file(file);
                
                // Open document and apply changes
                const document = await vscode.workspace.openTextDocument(uri);
                const edit = new vscode.WorkspaceEdit();
                
                if (range) {
                    // Replace specific range
                    const vscodeRange = new vscode.Range(
                        range.start.line, range.start.character,
                        range.end.line, range.end.character
                    );
                    edit.replace(uri, vscodeRange, content);
                } else {
                    // Replace entire file
                    const fullRange = new vscode.Range(
                        0, 0,
                        document.lineCount, 0
                    );
                    edit.replace(uri, fullRange, content);
                }
                
                await vscode.workspace.applyEdit(edit);
                
                // Send notification to webview
                this.sendCodeApplied(file);
            }

            this.sendResponse(message, true, { appliedFiles: changes.map(c => c.file) });
        } catch (error) {
            this.sendResponse(message, false, null, 
                error instanceof Error ? error.message : 'Failed to apply code changes');
        }
    }

    /**
     * Run terminal command
     */
    private async handleRunTerminalCommand(message: WebviewMessage): Promise<void> {
        try {
            const { command, cwd } = message.data;
            if (!command?.trim()) {
                this.sendResponse(message, false, null, 'Command is required');
                return;
            }

            // Get or create terminal
            const terminal = vscode.window.activeTerminal || vscode.window.createTerminal('Vibe DevSquad');
            
            // Change directory if specified
            if (cwd) {
                terminal.sendText(`cd "${cwd}"`);
            }
            
            // Run command
            terminal.sendText(command);
            terminal.show();

            // Send notification to webview
            this.sendTerminalOutput(command, `Command executed: ${command}`);
            this.sendResponse(message, true, { command: command });
        } catch (error) {
            this.sendResponse(message, false, null, 
                error instanceof Error ? error.message : 'Failed to run terminal command');
        }
    }

    /**
     * Send streaming start notification
     */
    private sendStreamingStart(request: WebviewMessage): void {
        this.view?.webview.postMessage({
            command: 'stream_response',
            data: { type: 'start' },
            requestId: request.requestId
        });
    }

    /**
     * Send streaming chunk
     */
    private sendStreamingChunk(request: WebviewMessage, content: string): void {
        this.view?.webview.postMessage({
            command: 'stream_response',
            data: { type: 'chunk', content },
            requestId: request.requestId
        });
    }

    /**
     * Send streaming end notification
     */
    private sendStreamingEnd(request: WebviewMessage, data: any): void {
        this.view?.webview.postMessage({
            command: 'stream_response',
            data: { type: 'end', ...data },
            requestId: request.requestId
        });
    }

    /**
     * Send file context data
     */
    private sendFileContext(request: WebviewMessage, data: any, error?: string): void {
        this.view?.webview.postMessage({
            command: 'file_context',
            data: data,
            error: error,
            requestId: request.requestId
        });
    }

    /**
     * Send code applied notification
     */
    private sendCodeApplied(file: string): void {
        this.view?.webview.postMessage({
            command: 'code_applied',
            data: { file }
        });
    }

    /**
     * Send terminal output notification
     */
    private sendTerminalOutput(command: string, output: string): void {
        this.view?.webview.postMessage({
            command: 'terminal_output',
            data: { command, output }
        });
    }

    /**
     * Handle create task request
     */
    private async handleCreateTask(message: WebviewMessage): Promise<void> {
        if (!this.planningService.isConnected()) {
            this.sendResponse(message, false, null, 'Not connected to platform');
            return;
        }

        const { description, projectId } = message.data;
        if (!description?.trim()) {
            this.sendResponse(message, false, null, 'Task description is required');
            return;
        }

        try {
            const task = await this.planningService.createTask(description.trim(), projectId);
            this.sendResponse(message, true, { task });
            this.logger.info(`Task created via webview: ${task.title}`);
        } catch (error) {
            this.sendResponse(message, false, null, error instanceof Error ? error.message : 'Failed to create task');
        }
    }

    /**
     * Handle analyze project request
     */
    private async handleAnalyzeProject(message: WebviewMessage): Promise<void> {
        if (!this.planningService.isConnected()) {
            this.sendResponse(message, false, null, 'Not connected to platform');
            return;
        }

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            this.sendResponse(message, false, null, 'No workspace folder found');
            return;
        }

        try {
            const workspacePath = workspaceFolders[0].uri.fsPath;
            const analysis = await this.planningService.analyzeProject(workspacePath);
            this.sendResponse(message, true, { analysis });
            this.logger.info('Project analyzed via webview');
        } catch (error) {
            this.sendResponse(message, false, null, error instanceof Error ? error.message : 'Failed to analyze project');
        }
    }

    /**
     * Handle analyze file request
     */
    private async handleAnalyzeFile(message: WebviewMessage): Promise<void> {
        if (!this.planningService.isConnected()) {
            this.sendResponse(message, false, null, 'Not connected to platform');
            return;
        }

        const { fileName, content } = message.data;
        if (!fileName || !content) {
            this.sendResponse(message, false, null, 'File name and content are required');
            return;
        }

        try {
            const analysis = await this.planningService.analyzeFile(fileName, content);
            this.sendResponse(message, true, { analysis });
            this.logger.info(`File analyzed via webview: ${fileName}`);
        } catch (error) {
            this.sendResponse(message, false, null, error instanceof Error ? error.message : 'Failed to analyze file');
        }
    }

    /**
     * Handle get suggestions request
     */
    private async handleGetSuggestions(message: WebviewMessage): Promise<void> {
        if (!this.planningService.isConnected()) {
            this.sendResponse(message, false, null, 'Not connected to platform');
            return;
        }

        const { context } = message.data;
        if (!context?.trim()) {
            this.sendResponse(message, false, null, 'Context is required for suggestions');
            return;
        }

        try {
            const suggestions = await this.planningService.getSuggestions(context.trim());
            this.sendResponse(message, true, { suggestions });
            this.logger.info('Suggestions retrieved via webview');
        } catch (error) {
            this.sendResponse(message, false, null, error instanceof Error ? error.message : 'Failed to get suggestions');
        }
    }

    /**
     * Handle get connection status request
     */
    private async handleGetConnectionStatus(message: WebviewMessage): Promise<void> {
        const status = this.planningService.getConnectionStatus();
        const isConnected = this.planningService.isConnected();
        
        this.sendResponse(message, true, {
            connected: isConnected,
            status: status
        });
    }

    /**
     * Handle refresh connection request
     */
    private async handleRefreshConnection(message: WebviewMessage): Promise<void> {
        try {
            // This would trigger a reconnection attempt
            this.updateConnectionStatus();
            this.sendResponse(message, true, { message: 'Connection status refreshed' });
        } catch (error) {
            this.sendResponse(message, false, null, 'Failed to refresh connection');
        }
    }

    /**
     * Send response back to webview
     */
    private sendResponse(request: WebviewMessage, success: boolean, data?: any, error?: string): void {
        if (this.view) {
            const response: WebviewResponse = {
                command: `${request.command}_response`,
                success,
                data,
                error,
                requestId: request.requestId
            };
            
            this.view.webview.postMessage(response);
        }
    }

    /**
     * Update connection status in the webview
     */
    private updateConnectionStatus(): void {
        if (this.view) {
            const status = this.planningService.getConnectionStatus();
            const isConnected = this.planningService.isConnected();
            
            this.view.webview.postMessage({
                command: 'connectionStatusUpdate',
                data: {
                    connected: isConnected,
                    status: status
                }
            });
        }
    }

    /**
     * Get HTML content for the webview
     */
    private getHtmlForWebview(webview: vscode.Webview): string {
        // Get the local path to main script and stylesheet
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'src', 'webview', 'assets', 'main.js'));
        const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'src', 'webview', 'assets', 'style.css'));

        // Use a nonce to only allow a specific script to be run
        const nonce = this.getNonce();

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
            <link href="${styleUri}" rel="stylesheet">
            <title>Vibe DevSquad AI Assistant</title>
        </head>
        <body>
            <div id="app">
                <!-- Header with connection status and quick actions -->
                <div class="header">
                    <div class="header-left">
                        <h1>🤖 AI Assistant</h1>
                        <div id="connection-status" class="status-indicator">
                            <span class="status-dot"></span>
                            <span class="status-text">Connecting...</span>
                        </div>
                    </div>
                    <div class="header-right">
                        <div class="quick-actions">
                            <button id="btn-create-task" class="quick-btn" title="Create Task">
                                <span class="icon">📝</span>
                            </button>
                            <button id="btn-analyze-file" class="quick-btn" title="Analyze Current File">
                                <span class="icon">🔍</span>
                            </button>
                            <button id="btn-analyze-project" class="quick-btn" title="Analyze Project">
                                <span class="icon">📊</span>
                            </button>
                            <button id="btn-terminal" class="quick-btn" title="Terminal Commands">
                                <span class="icon">💻</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Chat Interface -->
                <div class="chat-container">
                    <!-- Messages Area -->
                    <div id="messages-container" class="messages-area">
                        <div class="welcome-message">
                            <div class="message ai-message">
                                <div class="message-content">
                                    <div class="message-text">
                                        <p>👋 Hello! I'm your Vibe DevSquad AI Assistant. I can help you with:</p>
                                        <ul>
                                            <li>📝 Create and manage tasks</li>
                                            <li>🔍 Analyze your code and project</li>
                                            <li>✨ Generate and apply code changes</li>
                                            <li>💻 Run terminal commands</li>
                                            <li>📊 Access your dashboard and agents</li>
                                            <li>🚀 Everything Cursor, Claude Code, and Windsurf can do!</li>
                                        </ul>
                                        <p>What would you like to work on today?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Typing indicator -->
                        <div id="typing-indicator" class="typing-indicator hidden">
                            <div class="message ai-message">
                                <div class="message-content">
                                    <div class="typing-dots">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Chat Input Area -->
                    <div class="chat-input-container">
                        <div class="input-wrapper">
                            <div class="input-actions">
                                <button id="btn-attach-file" class="input-btn" title="Attach Current File">
                                    <span class="icon">📎</span>
                                </button>
                                <button id="btn-attach-selection" class="input-btn" title="Include Selection">
                                    <span class="icon">✂️</span>
                                </button>
                                <button id="btn-context-menu" class="input-btn" title="Context Menu">
                                    <span class="icon">⚙️</span>
                                </button>
                            </div>
                            <div class="input-area">
                                <textarea 
                                    id="chat-input" 
                                    placeholder="Ask me anything... (Shift+Enter for new line)"
                                    rows="1"
                                    maxlength="4000"
                                ></textarea>
                                <button id="btn-send" class="send-btn" disabled>
                                    <span class="icon">🚀</span>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Context bar -->
                        <div id="context-bar" class="context-bar hidden">
                            <div class="context-items">
                                <!-- Dynamic context items will be added here -->
                            </div>
                            <button id="btn-clear-context" class="clear-context-btn">Clear Context</button>
                        </div>
                        
                        <!-- Suggestions -->
                        <div id="suggestions-area" class="suggestions-area hidden">
                            <div class="suggestion-chips">
                                <button class="suggestion-chip">Explain this code</button>
                                <button class="suggestion-chip">Find bugs</button>
                                <button class="suggestion-chip">Optimize performance</button>
                                <button class="suggestion-chip">Add tests</button>
                                <button class="suggestion-chip">Create documentation</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar for tools/agents (collapsible) -->
                <div id="sidebar" class="sidebar collapsed">
                    <button id="sidebar-toggle" class="sidebar-toggle">
                        <span class="icon">🔧</span>
                    </button>
                    <div class="sidebar-content">
                        <h3>Available Tools</h3>
                        <div class="tool-list">
                            <div class="tool-item" data-tool="planning-agent">
                                <span class="tool-icon">🎯</span>
                                <span class="tool-name">Planning Agent</span>
                            </div>
                            <div class="tool-item" data-tool="code-review">
                                <span class="tool-icon">👁️</span>
                                <span class="tool-name">Code Review</span>
                            </div>
                            <div class="tool-item" data-tool="task-manager">
                                <span class="tool-icon">✅</span>
                                <span class="tool-name">Task Manager</span>
                            </div>
                            <div class="tool-item" data-tool="terminal">
                                <span class="tool-icon">💻</span>
                                <span class="tool-name">Terminal</span>
                            </div>
                            <div class="tool-item" data-tool="file-explorer">
                                <span class="tool-icon">📁</span>
                                <span class="tool-name">File Explorer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
        </html>`;
    }

    /**
     * Generate a nonce for Content Security Policy
     */
    private getNonce(): string {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
