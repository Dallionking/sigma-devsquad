import { z } from 'zod';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const FileContextSchema = z.object({
  filePath: z.string()
});

const WorkspaceContextSchema = z.object({
  workspacePath: z.string().optional(),
  includeHidden: z.boolean().optional().default(false),
  maxFiles: z.number().optional().default(100)
});

export const contextTools = {
  getFileContextDefinition: {
    name: 'vibe_devsquad_get_file_context',
    description: 'Get the content and metadata of a specific file',
    inputSchema: {
      type: 'object',
      properties: {
        filePath: {
          type: 'string',
          description: 'Path to the file'
        }
      },
      required: ['filePath']
    }
  },

  getWorkspaceContextDefinition: {
    name: 'vibe_devsquad_get_workspace_context',
    description: 'Get an overview of the workspace structure and key files',
    inputSchema: {
      type: 'object',
      properties: {
        workspacePath: {
          type: 'string',
          description: 'Path to the workspace (defaults to current directory)'
        },
        includeHidden: {
          type: 'boolean',
          default: false
        },
        maxFiles: {
          type: 'number',
          default: 100
        }
      }
    }
  },

  async getFileContext(args: unknown) {
    const params = FileContextSchema.parse(args);
    
    try {
      const content = readFileSync(params.filePath, 'utf-8');
      const stats = statSync(params.filePath);
      const fileName = params.filePath.split('/').pop() || 'unknown';
      const extension = fileName.split('.').pop() || '';
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              path: params.filePath,
              name: fileName,
              extension,
              language: getLanguageFromExtension(extension),
              size: stats.size,
              modified: stats.mtime.toISOString(),
              content,
              lines: content.split('\n').length
            }, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error reading file: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        ]
      };
    }
  },

  async getWorkspaceContext(args: unknown) {
    const params = WorkspaceContextSchema.parse(args);
    const workspacePath = params.workspacePath || process.cwd();
    
    try {
      const files = getAllFiles(workspacePath, params.includeHidden, params.maxFiles);
      const structure = buildFileTree(files, workspacePath);
      
      // Identify key files
      const keyFiles = identifyKeyFiles(files);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              workspacePath,
              totalFiles: files.length,
              structure,
              keyFiles,
              languages: getLanguageDistribution(files),
              projectType: detectProjectType(files)
            }, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error analyzing workspace: ${error instanceof Error ? error.message : 'Unknown error'}`
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

function getAllFiles(
  dirPath: string, 
  includeHidden: boolean, 
  maxFiles: number,
  currentFiles: string[] = []
): string[] {
  if (currentFiles.length >= maxFiles) return currentFiles;
  
  const ignoreDirs = ['.git', 'node_modules', '.next', 'dist', 'build', '.cache', 'coverage', '.vscode'];
  
  try {
    const items = readdirSync(dirPath);
    
    for (const item of items) {
      if (currentFiles.length >= maxFiles) break;
      
      if (!includeHidden && item.startsWith('.')) continue;
      if (ignoreDirs.includes(item)) continue;
      
      const fullPath = join(dirPath, item);
      const stats = statSync(fullPath);
      
      if (stats.isDirectory()) {
        getAllFiles(fullPath, includeHidden, maxFiles, currentFiles);
      } else {
        currentFiles.push(fullPath);
      }
    }
  } catch (error) {
    // Ignore permission errors
  }
  
  return currentFiles;
}

function buildFileTree(files: string[], rootPath: string): any {
  const tree: any = {};
  
  files.forEach(file => {
    const relativePath = relative(rootPath, file);
    const parts = relativePath.split('/');
    let current = tree;
    
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        // It's a file
        current[part] = 'file';
      } else {
        // It's a directory
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }
    });
  });
  
  return tree;
}

function identifyKeyFiles(files: string[]): string[] {
  const keyFilePatterns = [
    'package.json',
    'tsconfig.json',
    'webpack.config.js',
    'vite.config.js',
    'next.config.js',
    '.env',
    '.env.example',
    'README.md',
    'requirements.txt',
    'setup.py',
    'Cargo.toml',
    'go.mod',
    'pom.xml',
    'build.gradle',
    'composer.json',
    'Gemfile',
    'Dockerfile',
    'docker-compose.yml',
    '.gitignore'
  ];
  
  return files.filter(file => {
    const fileName = file.split('/').pop() || '';
    return keyFilePatterns.includes(fileName);
  });
}

function getLanguageDistribution(files: string[]): Record<string, number> {
  const distribution: Record<string, number> = {};
  
  files.forEach(file => {
    const extension = file.split('.').pop() || '';
    const language = getLanguageFromExtension(extension);
    
    if (language !== 'plaintext') {
      distribution[language] = (distribution[language] || 0) + 1;
    }
  });
  
  return distribution;
}

function detectProjectType(files: string[]): string {
  const fileNames = files.map(f => f.split('/').pop() || '');
  
  if (fileNames.includes('package.json')) {
    if (fileNames.includes('next.config.js')) return 'nextjs';
    if (fileNames.includes('vite.config.js')) return 'vite';
    if (fileNames.includes('webpack.config.js')) return 'webpack';
    return 'node';
  }
  
  if (fileNames.includes('requirements.txt') || fileNames.includes('setup.py')) {
    return 'python';
  }
  
  if (fileNames.includes('Cargo.toml')) return 'rust';
  if (fileNames.includes('go.mod')) return 'go';
  if (fileNames.includes('pom.xml')) return 'java-maven';
  if (fileNames.includes('build.gradle')) return 'java-gradle';
  if (fileNames.includes('composer.json')) return 'php';
  if (fileNames.includes('Gemfile')) return 'ruby';
  
  return 'unknown';
}
