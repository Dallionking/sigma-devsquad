import { z } from 'zod';
import { BridgeClient } from '../services/bridgeClient.js';
import { CollaborationSession, WindsurfCommand } from '../types/index.js';

const CollaborateSchema = z.object({
  action: z.enum(['start', 'join', 'leave', 'share', 'sync']),
  sessionType: z.enum(['pair-programming', 'code-review', 'planning', 'debugging']).optional(),
  sessionId: z.string().optional(),
  context: z.object({
    files: z.array(z.string()).optional(),
    cursor: z.object({
      file: z.string(),
      line: z.number(),
      character: z.number()
    }).optional(),
    selection: z.any().optional()
  }).optional()
});

const WindsurfCommandSchema = z.object({
  command: z.string(),
  args: z.array(z.any()).optional(),
  context: z.object({
    workspaceFolder: z.string().optional(),
    activeFile: z.string().optional(),
    selection: z.any().optional()
  }).optional()
});

export const collaborationTools = {
  collaborateDefinition: {
    name: 'vibe_devsquad_collaborate',
    description: 'Start or manage collaborative coding sessions with AI agents',
    inputSchema: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          enum: ['start', 'join', 'leave', 'share', 'sync'],
          description: 'Collaboration action to perform'
        },
        sessionType: {
          type: 'string',
          enum: ['pair-programming', 'code-review', 'planning', 'debugging'],
          description: 'Type of collaboration session (for start action)'
        },
        sessionId: {
          type: 'string',
          description: 'Session ID (for join/leave/share/sync actions)'
        },
        context: {
          type: 'object',
          properties: {
            files: {
              type: 'array',
              items: { type: 'string' }
            },
            cursor: {
              type: 'object',
              properties: {
                file: { type: 'string' },
                line: { type: 'number' },
                character: { type: 'number' }
              }
            },
            selection: {
              type: 'object'
            }
          }
        }
      },
      required: ['action']
    }
  },

  windsurfCommandDefinition: {
    name: 'vibe_devsquad_windsurf_command',
    description: 'Execute Windsurf-specific commands and integrate with Windsurf features',
    inputSchema: {
      type: 'object',
      properties: {
        command: {
          type: 'string',
          description: 'Windsurf command to execute'
        },
        args: {
          type: 'array',
          items: { type: 'any' },
          description: 'Command arguments'
        },
        context: {
          type: 'object',
          properties: {
            workspaceFolder: { type: 'string' },
            activeFile: { type: 'string' },
            selection: { type: 'object' }
          }
        }
      },
      required: ['command']
    }
  },

  async collaborate(args: unknown, bridgeClient: BridgeClient) {
    const params = CollaborateSchema.parse(args);
    
    try {
      let response;
      
      switch (params.action) {
        case 'start':
          response = await bridgeClient.sendRequest('startCollaboration', {
            type: params.sessionType || 'pair-programming',
            context: params.context,
            initiator: 'windsurf-user'
          });
          break;
          
        case 'join':
          response = await bridgeClient.sendRequest('joinCollaboration', {
            sessionId: params.sessionId,
            context: params.context
          });
          break;
          
        case 'leave':
          response = await bridgeClient.sendRequest('leaveCollaboration', {
            sessionId: params.sessionId
          });
          break;
          
        case 'share':
          response = await bridgeClient.sendRequest('shareContext', {
            sessionId: params.sessionId,
            context: params.context
          });
          break;
          
        case 'sync':
          response = await bridgeClient.sendRequest('syncCollaboration', {
            sessionId: params.sessionId
          });
          break;
          
        default:
          throw new Error(`Unknown collaboration action: ${params.action}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: formatCollaborationResult(params.action, response)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error in collaboration: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        ]
      };
    }
  },

  async executeWindsurfCommand(args: unknown, bridgeClient: BridgeClient) {
    const params = WindsurfCommandSchema.parse(args);
    
    try {
      // Map common Windsurf commands to bridge actions
      const commandMappings: Record<string, string> = {
        'cascade.chat': 'openChat',
        'cascade.newConversation': 'newChat',
        'cascade.togglePanel': 'togglePanel',
        'windsurf.showAgents': 'showAgents',
        'windsurf.createTeam': 'createTeam',
        'windsurf.runWorkflow': 'runWorkflow',
        'windsurf.analyzeCode': 'analyzeCode',
        'windsurf.refactor': 'refactorCode',
        'windsurf.generateTests': 'generateTests',
        'windsurf.explainCode': 'explainCode'
      };
      
      const bridgeMethod = commandMappings[params.command] || 'executeCommand';
      
      const response = await bridgeClient.sendRequest(bridgeMethod, {
        command: params.command,
        args: params.args,
        context: {
          ...params.context,
          ide: 'windsurf'
        }
      });

      return {
        content: [
          {
            type: 'text',
            text: formatWindsurfCommandResult(params.command, response)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error executing Windsurf command: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        ]
      };
    }
  }
};

function formatCollaborationResult(action: string, result: any): string {
  if (!result) return `Failed to ${action} collaboration`;
  
  let formatted = `## Collaboration ${action.charAt(0).toUpperCase() + action.slice(1)} Successful\n\n`;
  
  if (result.session) {
    const session = result.session as CollaborationSession;
    formatted += `**Session ID:** ${session.id}\n`;
    formatted += `**Type:** ${session.type}\n`;
    formatted += `**Status:** ${session.status}\n`;
    formatted += `**Participants:** ${session.participants.join(', ')}\n\n`;
    
    if (session.sharedContext) {
      formatted += `### Shared Context\n`;
      if (session.sharedContext.files && session.sharedContext.files.length > 0) {
        formatted += `**Files:**\n`;
        session.sharedContext.files.forEach(file => {
          formatted += `- ${file.path}\n`;
        });
      }
      if (session.sharedContext.cursor) {
        formatted += `\n**Active Cursor:** ${session.sharedContext.cursor.file} (${session.sharedContext.cursor.line}:${session.sharedContext.cursor.character})\n`;
      }
    }
  }
  
  if (result.message) {
    formatted += `\n${result.message}\n`;
  }
  
  if (result.nextSteps && result.nextSteps.length > 0) {
    formatted += `\n### Next Steps\n`;
    result.nextSteps.forEach((step: string, index: number) => {
      formatted += `${index + 1}. ${step}\n`;
    });
  }
  
  return formatted;
}

function formatWindsurfCommandResult(command: string, result: any): string {
  if (!result) return `Failed to execute command: ${command}`;
  
  let formatted = `## Windsurf Command Executed\n\n`;
  formatted += `**Command:** ${command}\n`;
  
  if (result.success !== undefined) {
    formatted += `**Status:** ${result.success ? 'Success' : 'Failed'}\n`;
  }
  
  if (result.output) {
    formatted += `\n### Output\n${result.output}\n`;
  }
  
  if (result.data) {
    formatted += `\n### Result Data\n`;
    formatted += '```json\n';
    formatted += JSON.stringify(result.data, null, 2);
    formatted += '\n```\n';
  }
  
  if (result.error) {
    formatted += `\n### Error\n${result.error}\n`;
  }
  
  if (result.suggestions && result.suggestions.length > 0) {
    formatted += `\n### Suggestions\n`;
    result.suggestions.forEach((suggestion: string) => {
      formatted += `- ${suggestion}\n`;
    });
  }
  
  return formatted;
}
