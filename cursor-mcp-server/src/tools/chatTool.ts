/**
 * Chat Tool for MCP Server
 * Handles Claude-style streaming chat interactions with Vibe DevSquad Planning Agent
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BridgeClient } from '../services/bridgeClient.js';
import { ChatContext, ChatResponse } from '../types/index.js';

export class ChatTool {
  private bridgeClient: BridgeClient;

  constructor(bridgeClient: BridgeClient) {
    this.bridgeClient = bridgeClient;
  }

  getToolDefinition(): Tool {
    return {
      name: 'vibe_devsquad_chat',
      description: 'Send a message to the Vibe DevSquad Planning Agent and receive a streaming AI response. Supports context-aware conversations with file and project context.',
      inputSchema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'The message to send to the Planning Agent'
          },
          context: {
            type: 'object',
            description: 'Optional context including current file, selection, and project information',
            properties: {
              currentFile: {
                type: 'object',
                properties: {
                  path: { type: 'string' },
                  content: { type: 'string' },
                  language: { type: 'string' },
                  selection: {
                    type: 'object',
                    properties: {
                      start: {
                        type: 'object',
                        properties: {
                          line: { type: 'number' },
                          character: { type: 'number' }
                        }
                      },
                      end: {
                        type: 'object',
                        properties: {
                          line: { type: 'number' },
                          character: { type: 'number' }
                        }
                      }
                    }
                  }
                }
              },
              workspaceRoot: { type: 'string' },
              openFiles: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    path: { type: 'string' },
                    language: { type: 'string' }
                  }
                }
              },
              projectContext: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  technologies: {
                    type: 'array',
                    items: { type: 'string' }
                  }
                }
              }
            }
          },
          streaming: {
            type: 'boolean',
            description: 'Whether to enable streaming response (default: true)',
            default: true
          }
        },
        required: ['message']
      }
    };
  }

  async execute(args: any): Promise<any> {
    const { message, context, streaming = true } = args;

    if (!message || typeof message !== 'string') {
      throw new Error('Message is required and must be a string');
    }

    try {
      let streamingContent = '';
      const chunks: string[] = [];

      const response = await this.bridgeClient.getChatResponse(
        message,
        context as ChatContext,
        streaming ? (chunk: string) => {
          streamingContent += chunk;
          chunks.push(chunk);
        } : undefined
      );

      return {
        success: true,
        data: {
          id: response.id,
          message: response.message || streamingContent,
          model: response.model,
          tokens: response.tokens,
          streaming: response.streaming,
          chunks: response.chunks || chunks,
          context: context
        }
      };
    } catch (error) {
      console.error('[ChatTool] Error executing chat:', error);
      return {
        success: false,
        error: {
          code: 'CHAT_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          details: { originalMessage: message, context }
        }
      };
    }
  }
}
