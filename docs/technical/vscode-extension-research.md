# VS Code Extension Development Research

**Date:** 2025-06-09  
**Project:** Vibe DevSquad VS Code Extension  
**Phase:** 7.4.1 - IDE Extensions and Plugin Development  

## 📚 **Research Sources**

### Context7 Documentation
- **Source**: `/microsoft/vscode-docs` (4755 code snippets, trust score 9.9)
- **Samples**: `/microsoft/vscode-extension-samples` (74 code snippets, trust score 9.9)
- **Focus**: Extension development, debugging capabilities, testing frameworks

### Perplexity AI Research
- **Query**: VS Code extension development best practices for AI platform integration and WebSocket communication
- **Focus**: TypeScript structure, lifecycle management, UI components, marketplace publishing

## 🏗️ **Recommended Project Structure**

```
vibe-devsquad-vscode-extension/
├── src/
│   ├── extension.ts              # Main activation point
│   ├── bridge-client/            # WebSocket communication with Vibe DevSquad
│   │   ├── bridgeClient.ts       # Core WebSocket client
│   │   ├── messageTypes.ts       # Type definitions for messages
│   │   └── connectionManager.ts  # Connection lifecycle management
│   ├── planning-agent/           # Planning Agent integration
│   │   ├── planningService.ts    # Planning Agent API wrapper
│   │   ├── commands.ts           # VS Code commands for Planning Agent
│   │   └── statusProvider.ts     # Status bar integration
│   ├── webview/                  # Custom UI components
│   │   ├── planningPanel.ts      # Main Planning Agent panel
│   │   ├── chatView.ts           # Chat interface webview
│   │   └── assets/               # HTML, CSS, JS for webviews
│   ├── utils/                    # Helper functions
│   │   ├── logger.ts             # Logging utilities
│   │   ├── config.ts             # Configuration management
│   │   └── security.ts           # API key management
│   └── types/                    # TypeScript interfaces
│       ├── vibeDevSquad.ts       # Vibe DevSquad API types
│       └── extension.ts          # Extension-specific types
├── webpack.config.js             # Bundling configuration
├── package.json                  # Extension manifest
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Documentation
```

## 🔌 **Key Extension Capabilities**

### 1. **Extension Activation & Lifecycle**
Based on VS Code documentation, implement proper lifecycle management:

```typescript
// src/extension.ts
import * as vscode from 'vscode';
import { BridgeClient } from './bridge-client/bridgeClient';
import { PlanningService } from './planning-agent/planningService';

let bridgeClient: BridgeClient | undefined;
let planningService: PlanningService | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('Vibe DevSquad extension activated');
    
    // Initialize bridge client for WebSocket communication
    bridgeClient = new BridgeClient();
    planningService = new PlanningService(bridgeClient);
    
    // Register commands
    const commands = [
        vscode.commands.registerCommand('vibeDevSquad.openPlanningAgent', openPlanningAgent),
        vscode.commands.registerCommand('vibeDevSquad.createTask', createTask),
        vscode.commands.registerCommand('vibeDevSquad.analyzeProject', analyzeProject)
    ];
    
    context.subscriptions.push(...commands);
    
    // Register webview providers
    const planningProvider = new PlanningWebviewProvider(context.extensionUri, planningService);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('vibeDevSquad.planningView', planningProvider)
    );
}

export function deactivate() {
    // Clean up resources
    bridgeClient?.disconnect();
}
```

### 2. **WebSocket Bridge Client**
Critical for real-time communication with Vibe DevSquad platform:

```typescript
// src/bridge-client/bridgeClient.ts
import WebSocket from 'ws';
import { MessageType, PlatformMessage } from './messageTypes';

export class BridgeClient {
    private ws: WebSocket | null = null;
    private reconnectTimer: NodeJS.Timeout | null = null;
    private eventEmitter = new vscode.EventEmitter<PlatformMessage>();
    
    public readonly onMessage = this.eventEmitter.event;
    
    constructor(private serverUrl: string = 'ws://localhost:3006/api/bridge/websocket') {}
    
    async connect(): Promise<void> {
        try {
            this.ws = new WebSocket(this.serverUrl);
            
            this.ws.on('open', () => {
                console.log('Connected to Vibe DevSquad platform');
                this.authenticate();
            });
            
            this.ws.on('message', (data) => {
                const message: PlatformMessage = JSON.parse(data.toString());
                this.eventEmitter.fire(message);
            });
            
            this.ws.on('close', () => {
                console.log('Disconnected from platform');
                this.scheduleReconnect();
            });
            
            this.ws.on('error', (error) => {
                console.error('WebSocket error:', error);
            });
        } catch (error) {
            console.error('Failed to connect:', error);
            throw error;
        }
    }
    
    send(type: MessageType, payload: any): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ type, payload, timestamp: Date.now() }));
        }
    }
    
    private authenticate(): void {
        // Send authentication message
        this.send('auth', { 
            extensionId: 'vibe-devsquad-vscode',
            version: '1.0.0' 
        });
    }
    
    private scheduleReconnect(): void {
        if (this.reconnectTimer) return;
        
        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            this.connect();
        }, 5000);
    }
    
    disconnect(): void {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        this.ws?.close();
    }
}
```

### 3. **Planning Agent Integration**
Core service for interacting with the Planning Agent:

```typescript
// src/planning-agent/planningService.ts
import { BridgeClient } from '../bridge-client/bridgeClient';
import { Task, Project, AgentResponse } from '../types/vibeDevSquad';

export class PlanningService {
    constructor(private bridgeClient: BridgeClient) {
        // Listen for Planning Agent responses
        this.bridgeClient.onMessage(message => {
            if (message.type === 'planning_agent_response') {
                this.handleAgentResponse(message.payload);
            }
        });
    }
    
    async createTask(description: string, projectId?: string): Promise<Task> {
        return new Promise((resolve, reject) => {
            const requestId = this.generateRequestId();
            
            this.bridgeClient.send('planning_agent_request', {
                requestId,
                action: 'create_task',
                payload: { description, projectId }
            });
            
            // Set up response handler
            const timeout = setTimeout(() => {
                reject(new Error('Request timeout'));
            }, 30000);
            
            const handler = (response: AgentResponse) => {
                if (response.requestId === requestId) {
                    clearTimeout(timeout);
                    resolve(response.result);
                }
            };
            
            this.responseHandlers.set(requestId, handler);
        });
    }
    
    async analyzeProject(workspacePath: string): Promise<Project> {
        // Similar implementation for project analysis
    }
    
    private handleAgentResponse(response: AgentResponse): void {
        const handler = this.responseHandlers.get(response.requestId);
        if (handler) {
            handler(response);
            this.responseHandlers.delete(response.requestId);
        }
    }
    
    private generateRequestId(): string {
        return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    private responseHandlers = new Map<string, (response: AgentResponse) => void>();
}
```

### 4. **Custom Webview UI Components**
Rich UI for Planning Agent interaction:

```typescript
// src/webview/planningPanel.ts
import * as vscode from 'vscode';
import { PlanningService } from '../planning-agent/planningService';

export class PlanningWebviewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'vibeDevSquad.planningView';
    
    constructor(
        private readonly extensionUri: vscode.Uri,
        private readonly planningService: PlanningService
    ) {}
    
    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        token: vscode.CancellationToken
    ) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.extensionUri]
        };
        
        webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);
        
        // Handle messages from webview
        webviewView.webview.onDidReceiveMessage(async (message) => {
            switch (message.command) {
                case 'createTask':
                    try {
                        const task = await this.planningService.createTask(message.description);
                        webviewView.webview.postMessage({ 
                            command: 'taskCreated', 
                            task 
                        });
                    } catch (error) {
                        webviewView.webview.postMessage({ 
                            command: 'error', 
                            message: error.message 
                        });
                    }
                    break;
                    
                case 'analyzeProject':
                    const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
                    if (workspacePath) {
                        const analysis = await this.planningService.analyzeProject(workspacePath);
                        webviewView.webview.postMessage({ 
                            command: 'projectAnalyzed', 
                            analysis 
                        });
                    }
                    break;
            }
        });
    }
    
    private getHtmlForWebview(webview: vscode.Webview): string {
        // Return HTML with React/Vue app for Planning Agent UI
        return `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Vibe DevSquad Planning Agent</title>
        </head>
        <body>
            <div id="planning-agent-root"></div>
            <script>
                // Initialize Planning Agent UI
                const vscode = acquireVsCodeApi();
                // React app will be bundled here
            </script>
        </body>
        </html>`;
    }
}
```

## 🎯 **Key VS Code Extension Commands**

Based on the research, implement these essential commands:

```typescript
// src/planning-agent/commands.ts
import * as vscode from 'vscode';
import { PlanningService } from './planningService';

export function registerCommands(context: vscode.ExtensionContext, planningService: PlanningService) {
    const commands = [
        // Core Planning Agent commands
        vscode.commands.registerCommand('vibeDevSquad.openPlanningAgent', () => {
            vscode.commands.executeCommand('vibeDevSquad.planningView.focus');
        }),
        
        vscode.commands.registerCommand('vibeDevSquad.createTaskFromSelection', async () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const selection = editor.document.getText(editor.selection);
                if (selection) {
                    const task = await planningService.createTask(`Implement: ${selection}`);
                    vscode.window.showInformationMessage(`Task created: ${task.title}`);
                }
            }
        }),
        
        vscode.commands.registerCommand('vibeDevSquad.analyzeCurrentFile', async () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const document = editor.document;
                const analysis = await planningService.analyzeFile(document.fileName, document.getText());
                // Show analysis in Planning Agent panel
            }
        }),
        
        // Quick actions
        vscode.commands.registerCommand('vibeDevSquad.quickCreateTask', async () => {
            const description = await vscode.window.showInputBox({
                prompt: 'Enter task description',
                placeHolder: 'What needs to be done?'
            });
            
            if (description) {
                const task = await planningService.createTask(description);
                vscode.window.showInformationMessage(`Task created: ${task.title}`);
            }
        })
    ];
    
    context.subscriptions.push(...commands);
}
```

## 📦 **Package.json Configuration**

Essential configuration for marketplace publishing:

```json
{
    "name": "vibe-devsquad-vscode-extension",
    "displayName": "Vibe DevSquad",
    "description": "AI-powered project planning and task management for VS Code",
    "version": "1.0.0",
    "publisher": "vibedevsquad",
    "repository": {
        "type": "git",
        "url": "https://github.com/your-org/vibe-devsquad-vscode-extension"
    },
    "engines": {
        "vscode": "^1.74.0"
    },
    "categories": [
        "Other",
        "Machine Learning",
        "Productivity"
    ],
    "keywords": [
        "AI",
        "planning",
        "project management", 
        "tasks",
        "productivity"
    ],
    "activationEvents": [
        "onStartupFinished"
    ],
    "main": "./dist/extension.js",
    "contributes": {
        "commands": [
            {
                "command": "vibeDevSquad.openPlanningAgent",
                "title": "Open Planning Agent",
                "category": "Vibe DevSquad"
            },
            {
                "command": "vibeDevSquad.createTaskFromSelection",
                "title": "Create Task from Selection",
                "category": "Vibe DevSquad"
            }
        ],
        "views": {
            "explorer": [
                {
                    "type": "webview",
                    "id": "vibeDevSquad.planningView",
                    "name": "Planning Agent",
                    "when": "vibeDevSquad.enabled"
                }
            ]
        },
        "menus": {
            "editor/context": [
                {
                    "command": "vibeDevSquad.createTaskFromSelection",
                    "when": "editorHasSelection",
                    "group": "vibeDevSquad"
                }
            ]
        },
        "configuration": {
            "title": "Vibe DevSquad",
            "properties": {
                "vibeDevSquad.serverUrl": {
                    "type": "string",
                    "default": "ws://localhost:3006",
                    "description": "Vibe DevSquad platform server URL"
                },
                "vibeDevSquad.autoConnect": {
                    "type": "boolean",
                    "default": true,
                    "description": "Automatically connect to platform on startup"
                }
            }
        }
    },
    "scripts": {
        "vscode:prepublish": "npm run package",
        "compile": "webpack",
        "package": "webpack --mode production --devtool hidden-source-map",
        "compile-tests": "tsc -p . --outDir out",
        "watch": "webpack --watch",
        "pretest": "npm run compile-tests && npm run compile && npm run lint",
        "lint": "eslint src --ext ts",
        "test": "node ./out/test/runTest.js"
    },
    "devDependencies": {
        "@types/vscode": "^1.74.0",
        "@types/node": "16.x",
        "@typescript-eslint/eslint-plugin": "^5.45.0",
        "@typescript-eslint/parser": "^5.45.0",
        "eslint": "^8.28.0",
        "typescript": "^4.9.4",
        "webpack": "^5.75.0",
        "webpack-cli": "^5.0.0",
        "ts-loader": "^9.4.1"
    },
    "dependencies": {
        "ws": "^8.11.0"
    }
}
```

## 🚀 **Marketplace Publishing Requirements**

Based on research findings:

### **Pre-Publishing Checklist**
1. **Privacy Policy**: Document data handling for AI service integration
2. **Performance Optimization**: 
   - Bundle with webpack for smaller package size
   - Implement lazy loading for AI services
   - Use debouncing for user inputs to prevent excessive API calls
3. **Error Handling**: Robust error handling for WebSocket failures
4. **Authentication**: Secure API key/token management
5. **Testing**: Comprehensive test suite including integration tests
6. **Documentation**: Clear README with setup and usage instructions

### **Security Considerations**
- Store sensitive configuration in VS Code's secure storage
- Validate all incoming WebSocket messages
- Implement proper CORS policies
- Use HTTPS/WSS for production connections

## 🎯 **Next Implementation Steps**

1. **Project Setup**: Use Yeoman generator to scaffold TypeScript extension
2. **Bridge Client**: Implement WebSocket communication layer
3. **Planning Service**: Create Planning Agent integration service
4. **Webview UI**: Build React-based Planning Agent interface
5. **Commands & Menus**: Register VS Code commands and context menus
6. **Testing**: Set up testing framework and write tests
7. **Packaging**: Configure webpack bundling and marketplace publishing

## 📖 **Key Learning Resources**

- **VS Code Extension API**: https://code.visualstudio.com/api
- **Extension Samples**: https://github.com/microsoft/vscode-extension-samples
- **WebSocket Integration**: Focus on connection lifecycle and message handling
- **TypeScript Best Practices**: Strong typing for better development experience
- **Marketplace Publishing**: https://code.visualstudio.com/api/working-with-extensions/publishing-extension

---

**This research provides a comprehensive foundation for developing the Vibe DevSquad VS Code extension with proper AI platform integration and WebSocket communication.**
