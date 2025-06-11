/**
 * Task Management Tool for MCP Server
 * Creates and manages tasks through Vibe DevSquad Planning Agent
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BridgeClient } from '../services/bridgeClient.js';
import { ChatContext, Task } from '../types/index.js';

export class TaskManagementTool {
  private bridgeClient: BridgeClient;

  constructor(bridgeClient: BridgeClient) {
    this.bridgeClient = bridgeClient;
  }

  getToolDefinition(): Tool {
    return {
      name: 'vibe_devsquad_create_task',
      description: 'Create a new task in the Vibe DevSquad project management system with AI-powered suggestions and context.',
      inputSchema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Title of the task'
          },
          description: {
            type: 'string',
            description: 'Detailed description of the task'
          },
          priority: {
            type: 'string',
            enum: ['low', 'medium', 'high'],
            description: 'Priority level of the task',
            default: 'medium'
          },
          type: {
            type: 'string',
            enum: ['feature', 'bug', 'improvement', 'documentation', 'test', 'refactor'],
            description: 'Type of task',
            default: 'feature'
          },
          estimatedHours: {
            type: 'number',
            description: 'Estimated hours to complete the task'
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
            description: 'Tags to categorize the task'
          },
          dependencies: {
            type: 'array',
            items: { type: 'string' },
            description: 'IDs of tasks that this task depends on'
          },
          assignee: {
            type: 'string',
            description: 'Person assigned to the task'
          },
          dueDate: {
            type: 'string',
            format: 'date-time',
            description: 'Due date for the task (ISO string)'
          },
          context: {
            type: 'object',
            description: 'Context information for AI-powered task creation',
            properties: {
              currentFile: {
                type: 'object',
                properties: {
                  path: { type: 'string' },
                  content: { type: 'string' },
                  language: { type: 'string' }
                }
              },
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
        required: ['title', 'description']
      }
    };
  }

  async execute(args: any): Promise<any> {
    const { 
      title, 
      description, 
      priority = 'medium',
      type = 'feature',
      estimatedHours,
      tags = [],
      dependencies = [],
      assignee,
      dueDate,
      context 
    } = args;

    if (!title || typeof title !== 'string') {
      throw new Error('title is required and must be a string');
    }

    if (!description || typeof description !== 'string') {
      throw new Error('description is required and must be a string');
    }

    try {
      // Prepare task data
      const taskData: Partial<Task> = {
        title,
        description,
        priority: priority as 'low' | 'medium' | 'high',
        status: 'pending',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        tags,
        dependencies,
        assignee,
        dueDate: dueDate ? new Date(dueDate).getTime() : undefined
      };

      // Add estimated hours and type as metadata
      const enhancedTaskData = {
        ...taskData,
        metadata: {
          type,
          estimatedHours,
          createdVia: 'cursor_mcp'
        }
      };

      const response = await this.bridgeClient.createTask(enhancedTaskData, context as ChatContext);

      return {
        success: true,
        data: {
          task: response.task || response,
          aiSuggestions: response.suggestions || [],
          relatedTasks: response.relatedTasks || [],
          estimatedComplexity: response.complexity || 'medium',
          breakdownSuggestion: response.breakdown || null,
          timestamp: Date.now()
        }
      };
    } catch (error) {
      console.error('[TaskManagementTool] Error creating task:', error);
      return {
        success: false,
        error: {
          code: 'TASK_CREATION_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          details: { title, description, priority, type }
        }
      };
    }
  }
}

export class TaskQueryTool {
  private bridgeClient: BridgeClient;

  constructor(bridgeClient: BridgeClient) {
    this.bridgeClient = bridgeClient;
  }

  getToolDefinition(): Tool {
    return {
      name: 'vibe_devsquad_query_tasks',
      description: 'Query and retrieve tasks from the Vibe DevSquad project management system.',
      inputSchema: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'ID of the project to query tasks from'
          },
          status: {
            type: 'string',
            enum: ['pending', 'in-progress', 'completed', 'cancelled', 'all'],
            description: 'Filter tasks by status',
            default: 'all'
          },
          assignee: {
            type: 'string',
            description: 'Filter tasks by assignee'
          },
          priority: {
            type: 'string',
            enum: ['low', 'medium', 'high'],
            description: 'Filter tasks by priority'
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
            description: 'Filter tasks by tags'
          },
          limit: {
            type: 'number',
            description: 'Maximum number of tasks to return',
            default: 50
          }
        }
      }
    };
  }

  async execute(args: any): Promise<any> {
    const { 
      projectId, 
      status = 'all', 
      assignee, 
      priority, 
      tags = [], 
      limit = 50 
    } = args;

    try {
      // Create query context
      const queryData = {
        projectId,
        filters: {
          status: status !== 'all' ? status : undefined,
          assignee,
          priority,
          tags: tags.length > 0 ? tags : undefined
        },
        limit
      };

      const response = await this.bridgeClient.sendGenericRequest('planning_agent_query_tasks', queryData);

      return {
        success: true,
        data: {
          tasks: response.tasks || response.data?.tasks || [],
          totalCount: response.totalCount || response.data?.totalCount || 0,
          filters: queryData.filters,
          timestamp: Date.now()
        }
      };
    } catch (error) {
      console.error('[TaskQueryTool] Error querying tasks:', error);
      return {
        success: false,
        error: {
          code: 'TASK_QUERY_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          details: { projectId, status, assignee, priority, tags, limit }
        }
      };
    }
  }
}
