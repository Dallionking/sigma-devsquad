#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema, 
  ListToolsRequestSchema,
  ErrorCode,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { BridgeClient } from './services/bridgeClient.js';
import { chatTool } from './tools/chatTool.js';
import { fileAnalysisTool } from './tools/fileAnalysisTool.js';
import { projectAnalysisTool } from './tools/projectAnalysisTool.js';
import { taskManagementTool } from './tools/taskManagementTool.js';
import { contextTools } from './tools/contextTools.js';
import { workflowTools } from './tools/workflowTools.js';
import { collaborationTools } from './tools/collaborationTools.js';

// Initialize bridge client
const bridgeClient = new BridgeClient(
  process.env.VIBE_DEVSQUAD_BRIDGE_URL || 'ws://localhost:8765',
  process.env.VIBE_DEVSQUAD_API_KEY || ''
);

// Create MCP server
const server = new Server(
  {
    name: 'vibe-devsquad-windsurf',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define all available tools
const tools = [
  chatTool.chatDefinition,
  fileAnalysisTool.analyzeFileDefinition,
  projectAnalysisTool.analyzeProjectDefinition,
  taskManagementTool.createTaskDefinition,
  taskManagementTool.queryTasksDefinition,
  contextTools.getFileContextDefinition,
  contextTools.getWorkspaceContextDefinition,
  workflowTools.startWorkflowDefinition,
  collaborationTools.collaborateDefinition,
  collaborationTools.windsurfCommandDefinition
];

// Handle list tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  try {
    // Connect bridge client if not connected
    if (!bridgeClient.isConnected()) {
      await bridgeClient.connect();
    }
    
    switch (name) {
      case 'vibe_devsquad_chat':
        return await chatTool.chat(args, bridgeClient);
        
      case 'vibe_devsquad_analyze_file':
        return await fileAnalysisTool.analyzeFile(args, bridgeClient);
        
      case 'vibe_devsquad_analyze_project':
        return await projectAnalysisTool.analyzeProject(args, bridgeClient);
        
      case 'vibe_devsquad_create_task':
        return await taskManagementTool.createTask(args, bridgeClient);
        
      case 'vibe_devsquad_query_tasks':
        return await taskManagementTool.queryTasks(args, bridgeClient);
        
      case 'vibe_devsquad_get_file_context':
        return await contextTools.getFileContext(args);
        
      case 'vibe_devsquad_get_workspace_context':
        return await contextTools.getWorkspaceContext(args);
        
      case 'vibe_devsquad_start_workflow':
        return await workflowTools.startWorkflow(args, bridgeClient);
        
      case 'vibe_devsquad_collaborate':
        return await collaborationTools.collaborate(args, bridgeClient);
        
      case 'vibe_devsquad_windsurf_command':
        return await collaborationTools.executeWindsurfCommand(args, bridgeClient);
        
      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${name}`
        );
    }
  } catch (error) {
    if (error instanceof McpError) throw error;
    
    throw new McpError(
      ErrorCode.InternalError,
      `Tool execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error('Vibe DevSquad Windsurf MCP Server started');
  
  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.error('Shutting down...');
    await bridgeClient.disconnect();
    await server.close();
    process.exit(0);
  });
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
