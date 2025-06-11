#!/usr/bin/env node

/**
 * Vibe DevSquad MCP Server for Cursor IDE
 * Main entry point that implements the Model Context Protocol for seamless integration
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

import { BridgeClient } from './services/bridgeClient.js';
import { ChatTool } from './tools/chatTool.js';
import { FileAnalysisTool } from './tools/fileAnalysisTool.js';
import { ProjectAnalysisTool } from './tools/projectAnalysisTool.js';
import { TaskManagementTool, TaskQueryTool } from './tools/taskManagementTool.js';
import { FileContextTool, WorkspaceContextTool } from './tools/contextTools.js';
import { VibeDevSquadConfig } from './types/index.js';

class VibeDevSquadMCPServer {
  private server: Server;
  private bridgeClient: BridgeClient;
  private tools: Map<string, any> = new Map();

  constructor() {
    this.server = new Server(
      {
        name: 'vibe-devsquad-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Initialize configuration
    const config: VibeDevSquadConfig = {
      bridgeUrl: process.env.VIBE_DEVSQUAD_BRIDGE_URL || 'ws://localhost:8080',
      apiKey: process.env.VIBE_DEVSQUAD_API_KEY,
      planningAgentId: process.env.VIBE_DEVSQUAD_PLANNING_AGENT_ID,
      enableStreaming: process.env.VIBE_DEVSQUAD_ENABLE_STREAMING !== 'false',
      maxTokens: parseInt(process.env.VIBE_DEVSQUAD_MAX_TOKENS || '4000')
    };

    this.bridgeClient = new BridgeClient(config);
    this.initializeTools();
    this.setupHandlers();
  }

  private initializeTools(): void {
    // Initialize all tools
    const chatTool = new ChatTool(this.bridgeClient);
    const fileAnalysisTool = new FileAnalysisTool(this.bridgeClient);
    const projectAnalysisTool = new ProjectAnalysisTool(this.bridgeClient);
    const taskManagementTool = new TaskManagementTool(this.bridgeClient);
    const taskQueryTool = new TaskQueryTool(this.bridgeClient);
    const fileContextTool = new FileContextTool();
    const workspaceContextTool = new WorkspaceContextTool();

    // Register tools
    this.tools.set('vibe_devsquad_chat', chatTool);
    this.tools.set('vibe_devsquad_analyze_file', fileAnalysisTool);
    this.tools.set('vibe_devsquad_analyze_project', projectAnalysisTool);
    this.tools.set('vibe_devsquad_create_task', taskManagementTool);
    this.tools.set('vibe_devsquad_query_tasks', taskQueryTool);
    this.tools.set('vibe_devsquad_get_file_context', fileContextTool);
    this.tools.set('vibe_devsquad_get_workspace_context', workspaceContextTool);
  }

  private setupHandlers(): void {
    // Handle tool listing
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const tools = Array.from(this.tools.values()).map(tool => tool.getToolDefinition());
      return { tools };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      const tool = this.tools.get(name);
      if (!tool) {
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Tool ${name} not found`
        );
      }

      try {
        const result = await tool.execute(args || {});
        
        if (result.success) {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result.data, null, 2)
              }
            ]
          };
        } else {
          throw new McpError(
            ErrorCode.InternalError,
            result.error?.message || 'Tool execution failed',
            result.error?.details
          );
        }
      } catch (error) {
        console.error(`[MCPServer] Error executing tool ${name}:`, error);
        throw new McpError(
          ErrorCode.InternalError,
          error instanceof Error ? error.message : 'Unknown error occurred'
        );
      }
    });

    // Handle bridge client events
    this.bridgeClient.on('connected', () => {
      console.log('[MCPServer] Connected to Vibe DevSquad platform');
    });

    this.bridgeClient.on('disconnected', () => {
      console.log('[MCPServer] Disconnected from Vibe DevSquad platform');
    });

    this.bridgeClient.on('error', (error) => {
      console.error('[MCPServer] Bridge client error:', error);
    });

    this.bridgeClient.on('max_reconnect_attempts_reached', () => {
      console.error('[MCPServer] Failed to reconnect to Vibe DevSquad platform after maximum attempts');
    });
  }

  async start(): Promise<void> {
    // Connect to Vibe DevSquad platform
    try {
      await this.bridgeClient.connect();
      console.log('[MCPServer] Successfully connected to Vibe DevSquad platform');
    } catch (error) {
      console.warn('[MCPServer] Failed to connect to Vibe DevSquad platform:', error);
      console.warn('[MCPServer] Server will start but tools requiring platform connection may not work');
    }

    // Start MCP server
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    
    console.log('[MCPServer] Vibe DevSquad MCP Server started successfully');
    console.log('[MCPServer] Available tools:');
    this.tools.forEach((tool, name) => {
      console.log(`  - ${name}: ${tool.getToolDefinition().description}`);
    });
  }

  async stop(): Promise<void> {
    console.log('[MCPServer] Shutting down...');
    this.bridgeClient.disconnect();
    await this.server.close();
    console.log('[MCPServer] Server stopped');
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n[MCPServer] Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n[MCPServer] Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

// Start the server
const mcpServer = new VibeDevSquadMCPServer();
mcpServer.start().catch((error) => {
  console.error('[MCPServer] Failed to start:', error);
  process.exit(1);
});

export default VibeDevSquadMCPServer;
