import { z } from 'zod';
import { BridgeClient } from '../services/bridgeClient.js';
import { readFileSync } from 'fs';
import { join } from 'path';

const FileAnalysisSchema = z.object({
  filePath: z.string(),
  analysisType: z.enum(['quality', 'security', 'performance', 'all']).optional().default('all'),
  includeRecommendations: z.boolean().optional().default(true)
});

export const fileAnalysisTool = {
  analyzeFileDefinition: {
    name: 'vibe_devsquad_analyze_file',
    description: 'Analyze a file for code quality, security issues, and best practices',
    inputSchema: {
      type: 'object',
      properties: {
        filePath: {
          type: 'string',
          description: 'Path to the file to analyze'
        },
        analysisType: {
          type: 'string',
          enum: ['quality', 'security', 'performance', 'all'],
          default: 'all'
        },
        includeRecommendations: {
          type: 'boolean',
          default: true
        }
      },
      required: ['filePath']
    }
  },

  async analyzeFile(args: unknown, bridgeClient: BridgeClient) {
    const params = FileAnalysisSchema.parse(args);
    
    try {
      // Read file content
      const fileContent = readFileSync(params.filePath, 'utf-8');
      const fileName = params.filePath.split('/').pop() || 'unknown';
      
      // Determine file type
      const fileExtension = fileName.split('.').pop() || '';
      const language = getLanguageFromExtension(fileExtension);
      
      // Send analysis request to bridge
      const response = await bridgeClient.sendRequest('analyzeFile', {
        fileName,
        fileContent,
        language,
        analysisType: params.analysisType,
        includeRecommendations: params.includeRecommendations,
        context: {
          filePath: params.filePath,
          projectRoot: process.cwd()
        }
      });

      return {
        content: [
          {
            type: 'text',
            text: formatAnalysisResult(response)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error analyzing file: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        ]
      };
    }
  }
};

function getLanguageFromExtension(extension: string): string {
  const languageMap: Record<string, string> = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'py': 'python',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'c',
    'cs': 'csharp',
    'rb': 'ruby',
    'go': 'go',
    'rs': 'rust',
    'php': 'php',
    'swift': 'swift',
    'kt': 'kotlin',
    'scala': 'scala',
    'r': 'r',
    'sql': 'sql',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'less': 'less',
    'json': 'json',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',
    'md': 'markdown',
    'sh': 'bash',
    'bash': 'bash',
    'zsh': 'bash',
    'fish': 'bash',
    'ps1': 'powershell',
    'psm1': 'powershell'
  };
  
  return languageMap[extension.toLowerCase()] || 'plaintext';
}

function formatAnalysisResult(result: any): string {
  if (!result) return 'No analysis results available';
  
  let formatted = `## File Analysis Results\n\n`;
  
  if (result.summary) {
    formatted += `### Summary\n${result.summary}\n\n`;
  }
  
  if (result.insights && result.insights.length > 0) {
    formatted += `### Key Insights\n`;
    result.insights.forEach((insight: string) => {
      formatted += `- ${insight}\n`;
    });
    formatted += '\n';
  }
  
  if (result.codeQuality) {
    formatted += `### Code Quality\n`;
    formatted += `Score: ${result.codeQuality.score}/10\n\n`;
    
    if (result.codeQuality.issues && result.codeQuality.issues.length > 0) {
      formatted += `**Issues Found:**\n`;
      result.codeQuality.issues.forEach((issue: string) => {
        formatted += `- ${issue}\n`;
      });
      formatted += '\n';
    }
  }
  
  if (result.suggestions && result.suggestions.length > 0) {
    formatted += `### Recommendations\n`;
    result.suggestions.forEach((suggestion: string, index: number) => {
      formatted += `${index + 1}. ${suggestion}\n`;
    });
    formatted += '\n';
  }
  
  if (result.dependencies && result.dependencies.length > 0) {
    formatted += `### Dependencies\n`;
    result.dependencies.forEach((dep: string) => {
      formatted += `- ${dep}\n`;
    });
  }
  
  return formatted;
}
