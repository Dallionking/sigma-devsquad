/**
 * File Analysis Tool for MCP Server
 * Analyzes files and provides AI insights through Vibe DevSquad Planning Agent
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BridgeClient } from '../services/bridgeClient.js';
import { ChatContext } from '../types/index.js';

export class FileAnalysisTool {
  private bridgeClient: BridgeClient;

  constructor(bridgeClient: BridgeClient) {
    this.bridgeClient = bridgeClient;
  }

  getToolDefinition(): Tool {
    return {
      name: 'vibe_devsquad_analyze_file',
      description: 'Analyze a file using the Vibe DevSquad Planning Agent to get insights, suggestions, and potential improvements.',
      inputSchema: {
        type: 'object',
        properties: {
          filePath: {
            type: 'string',
            description: 'Path to the file to analyze'
          },
          content: {
            type: 'string',
            description: 'Optional file content (if not provided, will attempt to read from path)'
          },
          analysisType: {
            type: 'string',
            enum: ['code_review', 'documentation', 'performance', 'security', 'general'],
            description: 'Type of analysis to perform',
            default: 'general'
          },
          context: {
            type: 'object',
            description: 'Additional context about the file and project',
            properties: {
              workspaceRoot: { type: 'string' },
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
          }
        },
        required: ['filePath']
      }
    };
  }

  async execute(args: any): Promise<any> {
    const { filePath, content, analysisType = 'general', context } = args;

    if (!filePath || typeof filePath !== 'string') {
      throw new Error('filePath is required and must be a string');
    }

    try {
      // Prepare analysis context
      const analysisContext: ChatContext = {
        currentFile: {
          path: filePath,
          content: content || '',
          language: this.getFileLanguage(filePath)
        },
        ...context
      };

      const response = await this.bridgeClient.analyzeFile(filePath, analysisContext);

      return {
        success: true,
        data: {
          filePath,
          analysisType,
          insights: response.insights || response.message || response,
          suggestions: response.suggestions || [],
          issues: response.issues || [],
          metrics: response.metrics || {},
          timestamp: Date.now()
        }
      };
    } catch (error) {
      console.error('[FileAnalysisTool] Error analyzing file:', error);
      return {
        success: false,
        error: {
          code: 'FILE_ANALYSIS_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          details: { filePath, analysisType }
        }
      };
    }
  }

  private getFileLanguage(filePath: string): string {
    const extension = filePath.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      'ts': 'typescript',
      'tsx': 'typescript',
      'js': 'javascript',
      'jsx': 'javascript',
      'py': 'python',
      'rs': 'rust',
      'go': 'go',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'cs': 'csharp',
      'php': 'php',
      'rb': 'ruby',
      'swift': 'swift',
      'kt': 'kotlin',
      'scala': 'scala',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'sass': 'sass',
      'less': 'less',
      'json': 'json',
      'yaml': 'yaml',
      'yml': 'yaml',
      'xml': 'xml',
      'md': 'markdown',
      'sh': 'bash',
      'dockerfile': 'dockerfile'
    };
    
    return languageMap[extension || ''] || 'text';
  }
}
