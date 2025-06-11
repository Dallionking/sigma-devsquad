/**
 * Project Analysis Tool for MCP Server
 * Analyzes entire projects and provides comprehensive insights through Vibe DevSquad Planning Agent
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BridgeClient } from '../services/bridgeClient.js';
import { ChatContext } from '../types/index.js';

export class ProjectAnalysisTool {
  private bridgeClient: BridgeClient;

  constructor(bridgeClient: BridgeClient) {
    this.bridgeClient = bridgeClient;
  }

  getToolDefinition(): Tool {
    return {
      name: 'vibe_devsquad_analyze_project',
      description: 'Analyze an entire project using the Vibe DevSquad Planning Agent to get comprehensive insights, architecture review, and recommendations.',
      inputSchema: {
        type: 'object',
        properties: {
          projectPath: {
            type: 'string',
            description: 'Path to the project root directory'
          },
          analysisDepth: {
            type: 'string',
            enum: ['basic', 'detailed', 'comprehensive'],
            description: 'Depth of analysis to perform',
            default: 'detailed'
          },
          focusAreas: {
            type: 'array',
            items: {
              type: 'string',
              enum: [
                'architecture',
                'code_quality',
                'performance',
                'security',
                'documentation',
                'testing',
                'dependencies',
                'deployment'
              ]
            },
            description: 'Specific areas to focus the analysis on'
          },
          excludePatterns: {
            type: 'array',
            items: { type: 'string' },
            description: 'File patterns to exclude from analysis (e.g., node_modules, dist)',
            default: ['node_modules', 'dist', 'build', '.git', '.next']
          },
          context: {
            type: 'object',
            description: 'Additional context about the project',
            properties: {
              projectType: {
                type: 'string',
                enum: ['web_app', 'mobile_app', 'api', 'library', 'cli_tool', 'other']
              },
              technologies: {
                type: 'array',
                items: { type: 'string' }
              },
              goals: {
                type: 'array',
                items: { type: 'string' }
              }
            }
          }
        },
        required: ['projectPath']
      }
    };
  }

  async execute(args: any): Promise<any> {
    const { 
      projectPath, 
      analysisDepth = 'detailed', 
      focusAreas = [], 
      excludePatterns = ['node_modules', 'dist', 'build', '.git', '.next'],
      context 
    } = args;

    if (!projectPath || typeof projectPath !== 'string') {
      throw new Error('projectPath is required and must be a string');
    }

    try {
      // Prepare analysis context
      const analysisContext: ChatContext = {
        workspaceRoot: projectPath,
        projectContext: {
          name: this.extractProjectName(projectPath),
          description: `Project analysis for ${projectPath}`,
          technologies: context?.technologies || []
        }
      };

      const response = await this.bridgeClient.analyzeProject(projectPath, analysisContext);

      return {
        success: true,
        data: {
          projectPath,
          analysisDepth,
          focusAreas,
          summary: response.summary || response.message || response,
          architecture: response.architecture || {},
          codeQuality: response.codeQuality || {},
          recommendations: response.recommendations || [],
          issues: response.issues || [],
          metrics: response.metrics || {},
          dependencies: response.dependencies || {},
          securityAnalysis: response.securityAnalysis || {},
          performanceInsights: response.performanceInsights || {},
          testCoverage: response.testCoverage || {},
          documentation: response.documentation || {},
          deployment: response.deployment || {},
          timestamp: Date.now()
        }
      };
    } catch (error) {
      console.error('[ProjectAnalysisTool] Error analyzing project:', error);
      return {
        success: false,
        error: {
          code: 'PROJECT_ANALYSIS_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          details: { projectPath, analysisDepth, focusAreas }
        }
      };
    }
  }

  private extractProjectName(projectPath: string): string {
    return projectPath.split('/').pop() || 'Unknown Project';
  }
}
