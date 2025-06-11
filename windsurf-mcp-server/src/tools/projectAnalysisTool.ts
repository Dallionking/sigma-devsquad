import { z } from 'zod';
import { BridgeClient } from '../services/bridgeClient.js';
import { readdirSync, statSync, readFileSync } from 'fs';
import { join } from 'path';

const ProjectAnalysisSchema = z.object({
  projectPath: z.string().optional(),
  includeGitInfo: z.boolean().optional().default(true),
  analyzeDependencies: z.boolean().optional().default(true),
  maxDepth: z.number().optional().default(5)
});

export const projectAnalysisTool = {
  analyzeProjectDefinition: {
    name: 'vibe_devsquad_analyze_project',
    description: 'Analyze an entire project structure, architecture, and dependencies',
    inputSchema: {
      type: 'object',
      properties: {
        projectPath: {
          type: 'string',
          description: 'Path to the project root directory'
        },
        includeGitInfo: {
          type: 'boolean',
          default: true
        },
        analyzeDependencies: {
          type: 'boolean',
          default: true
        },
        maxDepth: {
          type: 'number',
          default: 5
        }
      }
    }
  },

  async analyzeProject(args: unknown, bridgeClient: BridgeClient) {
    const params = ProjectAnalysisSchema.parse(args);
    const projectPath = params.projectPath || process.cwd();
    
    try {
      // Gather project structure
      const projectStructure = getProjectStructure(projectPath, params.maxDepth);
      
      // Get project metadata
      const metadata = getProjectMetadata(projectPath);
      
      // Get git information if requested
      let gitInfo = null;
      if (params.includeGitInfo) {
        gitInfo = await getGitInfo(projectPath);
      }
      
      // Analyze dependencies if requested
      let dependencies = null;
      if (params.analyzeDependencies) {
        dependencies = await analyzeDependencies(projectPath);
      }
      
      // Send analysis request to bridge
      const response = await bridgeClient.sendRequest('analyzeProject', {
        projectPath,
        structure: projectStructure,
        metadata,
        gitInfo,
        dependencies,
        context: {
          workspaceFolder: projectPath
        }
      });

      return {
        content: [
          {
            type: 'text',
            text: formatProjectAnalysis(response)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error analyzing project: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        ]
      };
    }
  }
};

function getProjectStructure(
  dirPath: string, 
  maxDepth: number, 
  currentDepth: number = 0
): any {
  if (currentDepth >= maxDepth) return null;
  
  const structure: any = {};
  const ignoreDirs = ['.git', 'node_modules', '.next', 'dist', 'build', '.cache'];
  
  try {
    const items = readdirSync(dirPath);
    
    for (const item of items) {
      if (ignoreDirs.includes(item)) continue;
      
      const fullPath = join(dirPath, item);
      const stats = statSync(fullPath);
      
      if (stats.isDirectory()) {
        structure[item] = getProjectStructure(fullPath, maxDepth, currentDepth + 1);
      } else {
        structure[item] = {
          type: 'file',
          size: stats.size,
          extension: item.split('.').pop() || ''
        };
      }
    }
  } catch (error) {
    // Ignore permission errors
  }
  
  return structure;
}

function getProjectMetadata(projectPath: string): any {
  const metadata: any = {
    type: 'unknown',
    name: projectPath.split('/').pop() || 'unknown'
  };
  
  // Check for package.json
  try {
    const packageJson = JSON.parse(
      readFileSync(join(projectPath, 'package.json'), 'utf-8')
    );
    metadata.type = 'node';
    metadata.name = packageJson.name || metadata.name;
    metadata.version = packageJson.version;
    metadata.description = packageJson.description;
    metadata.scripts = Object.keys(packageJson.scripts || {});
  } catch (error) {
    // Not a Node.js project
  }
  
  // Check for other project types
  const projectFiles = {
    'requirements.txt': 'python',
    'setup.py': 'python',
    'Cargo.toml': 'rust',
    'go.mod': 'go',
    'pom.xml': 'java-maven',
    'build.gradle': 'java-gradle',
    'composer.json': 'php',
    'Gemfile': 'ruby'
  };
  
  for (const [file, type] of Object.entries(projectFiles)) {
    try {
      statSync(join(projectPath, file));
      metadata.type = type;
      break;
    } catch (error) {
      // File doesn't exist
    }
  }
  
  return metadata;
}

async function getGitInfo(projectPath: string): Promise<any> {
  // This would normally use git commands, but for MCP we'll check basic info
  try {
    const gitDir = join(projectPath, '.git');
    statSync(gitDir);
    
    return {
      hasGit: true,
      // Additional git info would be fetched via exec commands
    };
  } catch (error) {
    return { hasGit: false };
  }
}

async function analyzeDependencies(projectPath: string): Promise<any> {
  const dependencies: any = {};
  
  // Check for Node.js dependencies
  try {
    const packageJson = JSON.parse(
      readFileSync(join(projectPath, 'package.json'), 'utf-8')
    );
    dependencies.node = {
      dependencies: Object.keys(packageJson.dependencies || {}),
      devDependencies: Object.keys(packageJson.devDependencies || {})
    };
  } catch (error) {
    // Not a Node.js project
  }
  
  // Check for Python dependencies
  try {
    const requirements = readFileSync(
      join(projectPath, 'requirements.txt'), 
      'utf-8'
    );
    dependencies.python = requirements
      .split('\n')
      .filter(line => line.trim() && !line.startsWith('#'))
      .map(line => line.split('==')[0].trim());
  } catch (error) {
    // No Python requirements
  }
  
  return dependencies;
}

function formatProjectAnalysis(result: any): string {
  if (!result) return 'No analysis results available';
  
  let formatted = `## Project Analysis Results\n\n`;
  
  if (result.summary) {
    formatted += `### Overview\n${result.summary}\n\n`;
  }
  
  if (result.architecture) {
    formatted += `### Architecture\n${result.architecture}\n\n`;
  }
  
  if (result.insights && result.insights.length > 0) {
    formatted += `### Key Insights\n`;
    result.insights.forEach((insight: string) => {
      formatted += `- ${insight}\n`;
    });
    formatted += '\n';
  }
  
  if (result.techStack && result.techStack.length > 0) {
    formatted += `### Technology Stack\n`;
    result.techStack.forEach((tech: string) => {
      formatted += `- ${tech}\n`;
    });
    formatted += '\n';
  }
  
  if (result.suggestions && result.suggestions.length > 0) {
    formatted += `### Recommendations\n`;
    result.suggestions.forEach((suggestion: string, index: number) => {
      formatted += `${index + 1}. ${suggestion}\n`;
    });
    formatted += '\n';
  }
  
  if (result.risks && result.risks.length > 0) {
    formatted += `### Potential Risks\n`;
    result.risks.forEach((risk: string) => {
      formatted += `- ⚠️ ${risk}\n`;
    });
  }
  
  return formatted;
}
