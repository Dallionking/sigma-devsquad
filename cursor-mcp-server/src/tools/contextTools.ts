/**
 * Context Tools for MCP Server
 * Provides file and workspace context to enhance AI interactions
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { promises as fs } from 'fs';
import { join, relative, basename } from 'path';

export class FileContextTool {
  getToolDefinition(): Tool {
    return {
      name: 'vibe_devsquad_get_file_context',
      description: 'Get the content and context of a specific file for AI analysis.',
      inputSchema: {
        type: 'object',
        properties: {
          filePath: {
            type: 'string',
            description: 'Path to the file to read'
          },
          includeMetadata: {
            type: 'boolean',
            description: 'Whether to include file metadata (size, modified date, etc.)',
            default: true
          },
          maxSize: {
            type: 'number',
            description: 'Maximum file size to read in bytes (default: 1MB)',
            default: 1024 * 1024
          }
        },
        required: ['filePath']
      }
    };
  }

  async execute(args: any): Promise<any> {
    const { filePath, includeMetadata = true, maxSize = 1024 * 1024 } = args;

    if (!filePath || typeof filePath !== 'string') {
      throw new Error('filePath is required and must be a string');
    }

    try {
      // Check if file exists and get stats
      const stats = await fs.stat(filePath);

      if (!stats.isFile()) {
        return {
          success: false,
          error: {
            code: 'NOT_A_FILE',
            message: 'The specified path is not a file'
          }
        };
      }

      if (stats.size > maxSize) {
        return {
          success: false,
          error: {
            code: 'FILE_TOO_LARGE',
            message: `File size (${stats.size} bytes) exceeds maximum (${maxSize} bytes)`
          }
        };
      }

      // Read file content
      const content = await fs.readFile(filePath, 'utf-8');
      const language = this.getFileLanguage(filePath);

      const result: any = {
        success: true,
        data: {
          path: filePath,
          name: basename(filePath),
          content,
          language,
          size: stats.size,
          lines: content.split('\n').length
        }
      };

      if (includeMetadata) {
        result.data.metadata = {
          created: stats.birthtime.toISOString(),
          modified: stats.mtime.toISOString(),
          accessed: stats.atime.toISOString(),
          permissions: stats.mode.toString(8),
          encoding: 'utf-8'
        };
      }

      return result;
    } catch (error) {
      console.error('[FileContextTool] Error reading file:', error);
      return {
        success: false,
        error: {
          code: 'FILE_READ_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          details: { filePath }
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

export class WorkspaceContextTool {
  getToolDefinition(): Tool {
    return {
      name: 'vibe_devsquad_get_workspace_context',
      description: 'Get comprehensive context about the current workspace including file structure, package.json, and project configuration.',
      inputSchema: {
        type: 'object',
        properties: {
          workspacePath: {
            type: 'string',
            description: 'Path to the workspace root directory'
          },
          includeFileTree: {
            type: 'boolean',
            description: 'Whether to include a file tree structure',
            default: true
          },
          maxDepth: {
            type: 'number',
            description: 'Maximum depth for file tree traversal',
            default: 3
          },
          excludePatterns: {
            type: 'array',
            items: { type: 'string' },
            description: 'Patterns to exclude from file tree',
            default: ['node_modules', '.git', 'dist', 'build', '.next', 'coverage']
          }
        },
        required: ['workspacePath']
      }
    };
  }

  async execute(args: any): Promise<any> {
    const { 
      workspacePath, 
      includeFileTree = true, 
      maxDepth = 3,
      excludePatterns = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage']
    } = args;

    if (!workspacePath || typeof workspacePath !== 'string') {
      throw new Error('workspacePath is required and must be a string');
    }

    try {
      const result: any = {
        success: true,
        data: {
          path: workspacePath,
          name: basename(workspacePath),
          type: 'workspace'
        }
      };

      // Try to read package.json
      try {
        const packageJsonPath = join(workspacePath, 'package.json');
        const packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8');
        const packageJson = JSON.parse(packageJsonContent);
        
        result.data.packageJson = packageJson;
        result.data.projectType = 'node';
        result.data.technologies = this.extractTechnologies(packageJson);
      } catch {
        // package.json doesn't exist or is invalid
      }

      // Try to detect other project types
      if (!result.data.projectType) {
        result.data.projectType = await this.detectProjectType(workspacePath);
      }

      // Get file tree if requested
      if (includeFileTree) {
        result.data.fileTree = await this.getFileTree(workspacePath, maxDepth, excludePatterns);
      }

      // Get project statistics
      result.data.statistics = await this.getProjectStatistics(workspacePath, excludePatterns);

      return result;
    } catch (error) {
      console.error('[WorkspaceContextTool] Error analyzing workspace:', error);
      return {
        success: false,
        error: {
          code: 'WORKSPACE_ANALYSIS_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          details: { workspacePath }
        }
      };
    }
  }

  private async getFileTree(dirPath: string, maxDepth: number, excludePatterns: string[], currentDepth = 0): Promise<any> {
    if (currentDepth >= maxDepth) {
      return null;
    }

    try {
      const items = await fs.readdir(dirPath);
      const tree: any = {};

      for (const item of items) {
        // Skip excluded patterns
        if (excludePatterns.some(pattern => item.includes(pattern))) {
          continue;
        }

        const itemPath = join(dirPath, item);
        const stats = await fs.stat(itemPath);

        if (stats.isDirectory()) {
          const subtree = await this.getFileTree(itemPath, maxDepth, excludePatterns, currentDepth + 1);
          if (subtree && Object.keys(subtree).length > 0) {
            tree[item] = subtree;
          } else if (currentDepth < maxDepth - 1) {
            tree[item] = {};
          }
        } else {
          tree[item] = {
            type: 'file',
            size: stats.size,
            extension: item.split('.').pop() || ''
          };
        }
      }

      return tree;
    } catch (error) {
      return null;
    }
  }

  private async detectProjectType(workspacePath: string): Promise<string> {
    const files = await fs.readdir(workspacePath);
    
    if (files.includes('Cargo.toml')) return 'rust';
    if (files.includes('go.mod')) return 'go';
    if (files.includes('requirements.txt') || files.includes('pyproject.toml')) return 'python';
    if (files.includes('Gemfile')) return 'ruby';
    if (files.includes('composer.json')) return 'php';
    if (files.includes('pom.xml') || files.includes('build.gradle')) return 'java';
    if (files.includes('Dockerfile')) return 'docker';
    
    return 'unknown';
  }

  private extractTechnologies(packageJson: any): string[] {
    const technologies = new Set<string>();
    
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    // Common framework detection
    if (dependencies.react) technologies.add('React');
    if (dependencies.vue) technologies.add('Vue');
    if (dependencies.angular) technologies.add('Angular');
    if (dependencies.next) technologies.add('Next.js');
    if (dependencies.nuxt) technologies.add('Nuxt.js');
    if (dependencies.express) technologies.add('Express');
    if (dependencies.fastify) technologies.add('Fastify');
    if (dependencies.typescript) technologies.add('TypeScript');
    if (dependencies.webpack) technologies.add('Webpack');
    if (dependencies.vite) technologies.add('Vite');
    if (dependencies.tailwindcss) technologies.add('Tailwind CSS');
    
    return Array.from(technologies);
  }

  private async getProjectStatistics(workspacePath: string, excludePatterns: string[]): Promise<any> {
    try {
      const stats = {
        totalFiles: 0,
        totalDirectories: 0,
        fileTypes: {} as Record<string, number>,
        totalSize: 0
      };

      const traverse = async (dirPath: string) => {
        const items = await fs.readdir(dirPath);
        
        for (const item of items) {
          if (excludePatterns.some(pattern => item.includes(pattern))) {
            continue;
          }

          const itemPath = join(dirPath, item);
          const itemStats = await fs.stat(itemPath);

          if (itemStats.isDirectory()) {
            stats.totalDirectories++;
            await traverse(itemPath);
          } else {
            stats.totalFiles++;
            stats.totalSize += itemStats.size;
            
            const extension = item.split('.').pop() || 'no-extension';
            stats.fileTypes[extension] = (stats.fileTypes[extension] || 0) + 1;
          }
        }
      };

      await traverse(workspacePath);
      return stats;
    } catch (error) {
      return {
        totalFiles: 0,
        totalDirectories: 0,
        fileTypes: {},
        totalSize: 0,
        error: 'Failed to calculate statistics'
      };
    }
  }
}
