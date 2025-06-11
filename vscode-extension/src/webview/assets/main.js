/**
 * =============================================================================
 * VIBE DEVSQUAD AI ASSISTANT - CHAT INTERFACE
 * Full-featured chat interface with streaming, code integration, and MCP support
 * =============================================================================
 */

class VibeDevSquadAI {
    constructor() {
        this.vscode = acquireVsCodeApi();
        this.isConnected = false;
        this.conversationHistory = [];
        this.currentStreamingMessage = null;
        this.contextItems = new Set();
        this.isTyping = false;
        this.messageIdCounter = 0;
        
        // Initialize the interface
        this.init();
    }

    /**
     * Initialize the chat interface
     */
    init() {
        this.setupEventListeners();
        this.setupMessageHandlers();
        this.updateConnectionStatus();
        this.autoResizeTextarea();
        this.showSuggestions();
        
        // Send initial connection request
        this.requestConnectionStatus();
        
        console.log('🤖 Vibe DevSquad AI Assistant initialized');
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Chat input handling
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('btn-send');
        
        chatInput.addEventListener('input', () => this.handleInputChange());
        chatInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
        sendBtn.addEventListener('click', () => this.sendMessage());

        // Quick action buttons
        document.getElementById('btn-create-task').addEventListener('click', () => 
            this.triggerQuickAction('create-task'));
        document.getElementById('btn-analyze-file').addEventListener('click', () => 
            this.triggerQuickAction('analyze-file'));
        document.getElementById('btn-analyze-project').addEventListener('click', () => 
            this.triggerQuickAction('analyze-project'));
        document.getElementById('btn-terminal').addEventListener('click', () => 
            this.triggerQuickAction('terminal'));

        // Input action buttons
        document.getElementById('btn-attach-file').addEventListener('click', () => 
            this.attachCurrentFile());
        document.getElementById('btn-attach-selection').addEventListener('click', () => 
            this.attachSelection());
        document.getElementById('btn-context-menu').addEventListener('click', () => 
            this.toggleContextMenu());

        // Sidebar toggle
        document.getElementById('sidebar-toggle').addEventListener('click', () => 
            this.toggleSidebar());

        // Context management
        document.getElementById('btn-clear-context').addEventListener('click', () => 
            this.clearContext());

        // Suggestion chips
        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', (e) => 
                this.applySuggestion(e.target.textContent));
        });

        // Tool items in sidebar
        document.querySelectorAll('.tool-item').forEach(tool => {
            tool.addEventListener('click', (e) => 
                this.selectTool(e.currentTarget.dataset.tool));
        });
    }

    /**
     * Setup message handlers from VS Code
     */
    setupMessageHandlers() {
        window.addEventListener('message', (event) => {
            const message = event.data;
            console.log('📨 Received message:', message);

            switch (message.command) {
                case 'connectionStatusUpdate':
                    this.handleConnectionStatus(message.data);
                    break;
                case 'chat_response':
                    this.handleChatResponse(message);
                    break;
                case 'stream_response':
                    this.handleStreamResponse(message);
                    break;
                case 'file_context':
                    this.handleFileContext(message.data);
                    break;
                case 'terminal_output':
                    this.handleTerminalOutput(message.data);
                    break;
                case 'code_applied':
                    this.handleCodeApplied(message.data);
                    break;
                case 'error':
                    this.handleError(message.data);
                    break;
                default:
                    console.log('🔄 Unknown message type:', message.command);
            }
        });
    }

    /**
     * Handle input changes
     */
    handleInputChange() {
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('btn-send');
        
        // Enable/disable send button
        sendBtn.disabled = !chatInput.value.trim();
        
        // Auto-resize textarea
        this.autoResizeTextarea();
    }

    /**
     * Handle keyboard input
     */
    handleKeyDown(event) {
        if (event.key === 'Enter') {
            if (event.shiftKey) {
                // Allow new line with Shift+Enter
                return;
            } else {
                // Send message with Enter
                event.preventDefault();
                this.sendMessage();
            }
        }
    }

    /**
     * Auto-resize textarea based on content
     */
    autoResizeTextarea() {
        const chatInput = document.getElementById('chat-input');
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
    }

    /**
     * Send a chat message
     */
    async sendMessage() {
        const chatInput = document.getElementById('chat-input');
        const message = chatInput.value.trim();
        
        if (!message || this.isTyping) return;

        // Add user message to chat
        this.addMessage({
            type: 'user',
            content: message,
            timestamp: Date.now(),
            context: Array.from(this.contextItems)
        });

        // Clear input
        chatInput.value = '';
        this.handleInputChange();
        
        // Show typing indicator
        this.showTypingIndicator();

        // Send to VS Code extension
        this.vscode.postMessage({
            command: 'chat_message',
            data: {
                message: message,
                context: Array.from(this.contextItems),
                conversationHistory: this.conversationHistory.slice(-10) // Last 10 messages
            },
            requestId: this.generateRequestId()
        });

        // Hide suggestions
        this.hideSuggestions();
    }

    /**
     * Add a message to the chat
     */
    addMessage(messageData) {
        const messagesContainer = document.getElementById('messages-container');
        const messageElement = this.createMessageElement(messageData);
        
        // Insert before typing indicator
        const typingIndicator = document.getElementById('typing-indicator');
        messagesContainer.insertBefore(messageElement, typingIndicator);
        
        // Add to conversation history
        this.conversationHistory.push(messageData);
        
        // Scroll to bottom
        this.scrollToBottom();
    }

    /**
     * Create a message element
     */
    createMessageElement(messageData) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${messageData.type}-message fade-in`;
        messageDiv.dataset.messageId = messageData.id || this.messageIdCounter++;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';

        if (messageData.type === 'user') {
            textDiv.textContent = messageData.content;
        } else {
            // AI message - handle rich content
            this.renderMessageContent(textDiv, messageData.content);
        }

        contentDiv.appendChild(textDiv);

        // Add context indicators for user messages
        if (messageData.type === 'user' && messageData.context && messageData.context.length > 0) {
            const contextDiv = document.createElement('div');
            contextDiv.className = 'message-context';
            contextDiv.innerHTML = `<small>📎 Context: ${messageData.context.length} items</small>`;
            contentDiv.appendChild(contextDiv);
        }

        // Add message actions for AI messages
        if (messageData.type === 'ai') {
            const actionsDiv = this.createMessageActions(messageData);
            contentDiv.appendChild(actionsDiv);
        }

        messageDiv.appendChild(contentDiv);
        return messageDiv;
    }

    /**
     * Render message content with code blocks, file references, etc.
     */
    renderMessageContent(container, content) {
        if (typeof content === 'string') {
            // Parse markdown-like content
            const parts = content.split(/```(\w+)?\n([\s\S]*?)\n```/);
            
            for (let i = 0; i < parts.length; i++) {
                if (i % 3 === 0) {
                    // Regular text
                    if (parts[i].trim()) {
                        const textSpan = document.createElement('div');
                        textSpan.innerHTML = this.parseInlineMarkdown(parts[i]);
                        container.appendChild(textSpan);
                    }
                } else if (i % 3 === 2) {
                    // Code block
                    const language = parts[i - 1] || 'text';
                    const code = parts[i];
                    const codeBlock = this.createCodeBlock(code, language);
                    container.appendChild(codeBlock);
                }
            }
        } else if (Array.isArray(content)) {
            // Handle structured content
            content.forEach(item => {
                if (item.type === 'text') {
                    const textDiv = document.createElement('div');
                    textDiv.innerHTML = this.parseInlineMarkdown(item.content);
                    container.appendChild(textDiv);
                } else if (item.type === 'code') {
                    const codeBlock = this.createCodeBlock(item.content, item.language);
                    container.appendChild(codeBlock);
                } else if (item.type === 'file') {
                    const fileRef = this.createFileReference(item);
                    container.appendChild(fileRef);
                }
            });
        }
    }

    /**
     * Parse inline markdown (bold, italic, code)
     */
    parseInlineMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    /**
     * Create a code block element
     */
    createCodeBlock(code, language = 'text') {
        const codeBlockDiv = document.createElement('div');
        codeBlockDiv.className = 'code-block';

        const headerDiv = document.createElement('div');
        headerDiv.className = 'code-header';
        headerDiv.innerHTML = `
            <span>${language}</span>
            <button class="copy-btn" onclick="window.vibeAI.copyCode(this)">Copy</button>
        `;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'code-content';
        contentDiv.textContent = code;

        // Store code for copying
        contentDiv.dataset.code = code;

        codeBlockDiv.appendChild(headerDiv);
        codeBlockDiv.appendChild(contentDiv);

        return codeBlockDiv;
    }

    /**
     * Create file reference element
     */
    createFileReference(fileData) {
        const fileDiv = document.createElement('div');
        fileDiv.className = 'file-reference';
        fileDiv.innerHTML = `
            <div class="file-icon">📄</div>
            <div class="file-info">
                <div class="file-name">${fileData.name}</div>
                <div class="file-path">${fileData.path}</div>
            </div>
            <button class="file-action" onclick="window.vibeAI.openFile('${fileData.path}')">Open</button>
        `;
        return fileDiv;
    }

    /**
     * Create message actions
     */
    createMessageActions(messageData) {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'message-actions';
        actionsDiv.innerHTML = `
            <button class="action-btn" onclick="window.vibeAI.copyMessage('${messageData.id}')">Copy</button>
            <button class="action-btn" onclick="window.vibeAI.regenerateMessage('${messageData.id}')">Regenerate</button>
            <button class="action-btn" onclick="window.vibeAI.editMessage('${messageData.id}')">Edit</button>
        `;
        return actionsDiv;
    }

    /**
     * Handle chat response from extension
     */
    handleChatResponse(response) {
        this.hideTypingIndicator();
        
        if (response.success) {
            this.addMessage({
                type: 'ai',
                content: response.data.message,
                timestamp: Date.now(),
                id: response.data.id,
                model: response.data.model,
                tokens: response.data.tokens
            });
        } else {
            this.showError(response.error || 'Failed to get response');
        }
    }

    /**
     * Handle streaming response
     */
    handleStreamResponse(response) {
        if (response.data.type === 'start') {
            this.hideTypingIndicator();
            this.currentStreamingMessage = this.createStreamingMessage();
        } else if (response.data.type === 'chunk') {
            this.appendToStreamingMessage(response.data.content);
        } else if (response.data.type === 'end') {
            this.finalizeStreamingMessage(response.data);
        }
    }

    /**
     * Create streaming message placeholder
     */
    createStreamingMessage() {
        const messageData = {
            type: 'ai',
            content: '',
            timestamp: Date.now(),
            id: 'streaming-' + Date.now(),
            streaming: true
        };

        const messageElement = this.createMessageElement(messageData);
        const messagesContainer = document.getElementById('messages-container');
        const typingIndicator = document.getElementById('typing-indicator');
        messagesContainer.insertBefore(messageElement, typingIndicator);
        
        return {
            element: messageElement,
            data: messageData
        };
    }

    /**
     * Append content to streaming message
     */
    appendToStreamingMessage(content) {
        if (!this.currentStreamingMessage) return;

        this.currentStreamingMessage.data.content += content;
        const textDiv = this.currentStreamingMessage.element.querySelector('.message-text');
        this.renderMessageContent(textDiv, this.currentStreamingMessage.data.content);
        this.scrollToBottom();
    }

    /**
     * Finalize streaming message
     */
    finalizeStreamingMessage(data) {
        if (!this.currentStreamingMessage) return;

        this.currentStreamingMessage.data.streaming = false;
        this.currentStreamingMessage.data.tokens = data.tokens;
        this.currentStreamingMessage.data.model = data.model;
        
        this.conversationHistory.push(this.currentStreamingMessage.data);
        this.currentStreamingMessage = null;
    }

    /**
     * Show typing indicator
     */
    showTypingIndicator() {
        this.isTyping = true;
        const indicator = document.getElementById('typing-indicator');
        indicator.classList.remove('hidden');
        this.scrollToBottom();
    }

    /**
     * Hide typing indicator
     */
    hideTypingIndicator() {
        this.isTyping = false;
        const indicator = document.getElementById('typing-indicator');
        indicator.classList.add('hidden');
    }

    /**
     * Quick action handlers
     */
    triggerQuickAction(action) {
        const chatInput = document.getElementById('chat-input');
        
        switch (action) {
            case 'create-task':
                chatInput.value = 'Create a new task based on the current file/selection';
                break;
            case 'analyze-file':
                chatInput.value = 'Analyze the current file for improvements and issues';
                break;
            case 'analyze-project':
                chatInput.value = 'Analyze the entire project structure and provide insights';
                break;
            case 'terminal':
                chatInput.value = 'Run a terminal command: ';
                break;
        }
        
        chatInput.focus();
        this.handleInputChange();
    }

    /**
     * Attach current file to context
     */
    attachCurrentFile() {
        this.vscode.postMessage({
            command: 'get_current_file',
            requestId: this.generateRequestId()
        });
    }

    /**
     * Attach current selection to context
     */
    attachSelection() {
        this.vscode.postMessage({
            command: 'get_selection',
            requestId: this.generateRequestId()
        });
    }

    /**
     * Handle file context
     */
    handleFileContext(data) {
        if (data.type === 'file') {
            this.addContextItem({
                type: 'file',
                name: data.name,
                path: data.path,
                content: data.content
            });
        } else if (data.type === 'selection') {
            this.addContextItem({
                type: 'selection',
                text: data.text,
                file: data.file,
                range: data.range
            });
        }
    }

    /**
     * Add context item
     */
    addContextItem(item) {
        this.contextItems.add(item);
        this.updateContextBar();
    }

    /**
     * Update context bar
     */
    updateContextBar() {
        const contextBar = document.getElementById('context-bar');
        const contextItems = document.querySelector('.context-items');
        
        if (this.contextItems.size > 0) {
            contextBar.classList.remove('hidden');
            contextItems.innerHTML = '';
            
            this.contextItems.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'context-item';
                
                if (item.type === 'file') {
                    itemDiv.innerHTML = `📄 ${item.name}`;
                } else if (item.type === 'selection') {
                    itemDiv.innerHTML = `✂️ Selection (${item.text.length} chars)`;
                }
                
                contextItems.appendChild(itemDiv);
            });
        } else {
            contextBar.classList.add('hidden');
        }
    }

    /**
     * Clear context
     */
    clearContext() {
        this.contextItems.clear();
        this.updateContextBar();
    }

    /**
     * Toggle sidebar
     */
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
    }

    /**
     * Show suggestions
     */
    showSuggestions() {
        const suggestionsArea = document.getElementById('suggestions-area');
        if (this.conversationHistory.length === 0) {
            suggestionsArea.classList.remove('hidden');
        }
    }

    /**
     * Hide suggestions
     */
    hideSuggestions() {
        const suggestionsArea = document.getElementById('suggestions-area');
        suggestionsArea.classList.add('hidden');
    }

    /**
     * Apply suggestion
     */
    applySuggestion(suggestion) {
        const chatInput = document.getElementById('chat-input');
        chatInput.value = suggestion;
        chatInput.focus();
        this.handleInputChange();
    }

    /**
     * Handle connection status updates
     */
    handleConnectionStatus(data) {
        this.isConnected = data.connected;
        this.updateConnectionStatus();
    }

    /**
     * Update connection status UI
     */
    updateConnectionStatus() {
        const statusIndicator = document.getElementById('connection-status');
        const statusDot = statusIndicator.querySelector('.status-dot');
        const statusText = statusIndicator.querySelector('.status-text');
        
        if (this.isConnected) {
            statusIndicator.className = 'status-indicator connected';
            statusText.textContent = 'Connected';
        } else {
            statusIndicator.className = 'status-indicator disconnected';
            statusText.textContent = 'Disconnected';
        }
    }

    /**
     * Request connection status
     */
    requestConnectionStatus() {
        this.vscode.postMessage({
            command: 'get_connection_status',
            requestId: this.generateRequestId()
        });
    }

    /**
     * Scroll to bottom of messages
     */
    scrollToBottom() {
        const messagesArea = document.getElementById('messages-container');
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    /**
     * Generate request ID
     */
    generateRequestId() {
        return 'req-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Handle errors
     */
    handleError(error) {
        this.hideTypingIndicator();
        this.showError(error.message || 'An error occurred');
    }

    /**
     * Show error message
     */
    showError(message) {
        this.addMessage({
            type: 'error',
            content: `❌ Error: ${message}`,
            timestamp: Date.now()
        });
    }

    /**
     * Terminal output handler
     */
    handleTerminalOutput(data) {
        this.addMessage({
            type: 'ai',
            content: [
                { type: 'text', content: '💻 Terminal Output:' },
                { type: 'code', content: data.output, language: 'bash' }
            ],
            timestamp: Date.now()
        });
    }

    /**
     * Code applied handler
     */
    handleCodeApplied(data) {
        this.addMessage({
            type: 'ai',
            content: `✅ Applied changes to ${data.file}`,
            timestamp: Date.now()
        });
    }

    /**
     * Utility functions for global access
     */
    copyCode(button) {
        const codeContent = button.closest('.code-block').querySelector('.code-content');
        const code = codeContent.dataset.code || codeContent.textContent;
        
        navigator.clipboard.writeText(code).then(() => {
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        });
    }

    copyMessage(messageId) {
        const message = this.conversationHistory.find(m => m.id === messageId);
        if (message) {
            navigator.clipboard.writeText(message.content);
        }
    }

    regenerateMessage(messageId) {
        // Send regeneration request
        this.vscode.postMessage({
            command: 'regenerate_message',
            data: { messageId },
            requestId: this.generateRequestId()
        });
    }

    editMessage(messageId) {
        // Implementation for editing messages
        console.log('Edit message:', messageId);
    }

    openFile(path) {
        this.vscode.postMessage({
            command: 'open_file',
            data: { path },
            requestId: this.generateRequestId()
        });
    }

    selectTool(toolName) {
        console.log('Selected tool:', toolName);
        // Implement tool selection logic
    }

    toggleContextMenu() {
        // Toggle context menu
        console.log('Context menu toggled');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.vibeAI = new VibeDevSquadAI();
});

// Legacy support for existing functionality
window.addEventListener('load', () => {
    console.log('🚀 Vibe DevSquad AI Assistant loaded successfully');
});
