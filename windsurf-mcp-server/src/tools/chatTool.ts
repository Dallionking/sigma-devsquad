import { z } from 'zod';
import { BridgeClient } from '../services/bridgeClient.js';
import { ChatMessage, StreamToken } from '../types/index.js';

const ChatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string()
  })),
  context: z.object({
    workspaceFolder: z.string().optional(),
    activeFile: z.string().optional(),
    selection: z.string().optional()
  }).optional(),
  stream: z.boolean().optional().default(true)
});

export const chatTool = {
  chatDefinition: {
    name: 'vibe_devsquad_chat',
    description: 'Chat with AI assistant for coding help, explanations, and guidance',
    inputSchema: {
      type: 'object',
      properties: {
        messages: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              role: {
                type: 'string',
                enum: ['user', 'assistant', 'system']
              },
              content: {
                type: 'string'
              }
            },
            required: ['role', 'content']
          }
        },
        context: {
          type: 'object',
          properties: {
            workspaceFolder: { type: 'string' },
            activeFile: { type: 'string' },
            selection: { type: 'string' }
          }
        },
        stream: {
          type: 'boolean',
          default: true
        }
      },
      required: ['messages']
    }
  },

  async chat(args: unknown, bridgeClient: BridgeClient) {
    const params = ChatSchema.parse(args);
    
    try {
      if (params.stream) {
        // Handle streaming response
        const streamingTokens: string[] = [];
        
        await bridgeClient.sendStreamRequest('chat', {
          messages: params.messages,
          context: params.context,
          model: 'claude-3-sonnet'
        }, (token: any) => {
          streamingTokens.push(token.content);
        });
        
        return {
          content: [
            {
              type: 'text',
              text: streamingTokens.join('')
            }
          ]
        };
      } else {
        // Handle non-streaming response
        const response = await bridgeClient.sendRequest('chat', {
          messages: params.messages,
          context: params.context,
          model: 'claude-3-sonnet'
        });
        
        return {
          content: [
            {
              type: 'text',
              text: response.content || 'No response received'
            }
          ]
        };
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`
          }
        ]
      };
    }
  }
};
