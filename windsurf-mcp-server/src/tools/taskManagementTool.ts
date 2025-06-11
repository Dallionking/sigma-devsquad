import { z } from 'zod';
import { BridgeClient } from '../services/bridgeClient.js';
import { Task } from '../types/index.js';

const CreateTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.enum(['low', 'medium', 'high']).optional().default('medium'),
  assignee: z.string().optional(),
  dueDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
  projectId: z.string().optional()
});

const QueryTasksSchema = z.object({
  status: z.enum(['pending', 'in-progress', 'completed', 'cancelled']).optional(),
  assignee: z.string().optional(),
  projectId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  limit: z.number().optional().default(20)
});

export const taskManagementTool = {
  createTaskDefinition: {
    name: 'vibe_devsquad_create_task',
    description: 'Create a new task with AI-enhanced description and automatic tagging',
    inputSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Task title'
        },
        description: {
          type: 'string',
          description: 'Task description (AI will enhance this)'
        },
        priority: {
          type: 'string',
          enum: ['low', 'medium', 'high'],
          default: 'medium'
        },
        assignee: {
          type: 'string',
          description: 'Username of the assignee'
        },
        dueDate: {
          type: 'string',
          description: 'Due date in ISO format'
        },
        tags: {
          type: 'array',
          items: { type: 'string' }
        },
        projectId: {
          type: 'string'
        }
      },
      required: ['title', 'description']
    }
  },

  queryTasksDefinition: {
    name: 'vibe_devsquad_query_tasks',
    description: 'Query and filter tasks with various criteria',
    inputSchema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['pending', 'in-progress', 'completed', 'cancelled']
        },
        assignee: {
          type: 'string'
        },
        projectId: {
          type: 'string'
        },
        tags: {
          type: 'array',
          items: { type: 'string' }
        },
        limit: {
          type: 'number',
          default: 20
        }
      }
    }
  },

  async createTask(args: unknown, bridgeClient: BridgeClient) {
    const params = CreateTaskSchema.parse(args);
    
    try {
      // Send task creation request to bridge
      const response = await bridgeClient.sendRequest('createTask', {
        ...params,
        context: {
          workspaceFolder: process.cwd()
        }
      });

      return {
        content: [
          {
            type: 'text',
            text: formatTaskCreationResult(response)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating task: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        ]
      };
    }
  },

  async queryTasks(args: unknown, bridgeClient: BridgeClient) {
    const params = QueryTasksSchema.parse(args);
    
    try {
      // Send task query request to bridge
      const response = await bridgeClient.sendRequest('queryTasks', params);

      return {
        content: [
          {
            type: 'text',
            text: formatTaskQueryResult(response)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error querying tasks: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        ]
      };
    }
  }
};

function formatTaskCreationResult(task: any): string {
  if (!task) return 'Failed to create task';
  
  return `## Task Created Successfully\n\n` +
    `**ID:** ${task.id}\n` +
    `**Title:** ${task.title}\n` +
    `**Status:** ${task.status}\n` +
    `**Priority:** ${task.priority}\n` +
    `${task.assignee ? `**Assignee:** ${task.assignee}\n` : ''}` +
    `${task.dueDate ? `**Due Date:** ${new Date(task.dueDate).toLocaleDateString()}\n` : ''}` +
    `${task.tags && task.tags.length > 0 ? `**Tags:** ${task.tags.join(', ')}\n` : ''}` +
    `\n### Description\n${task.description}\n` +
    `${task.enhancedDescription ? `\n### AI-Enhanced Description\n${task.enhancedDescription}\n` : ''}` +
    `${task.suggestedSteps ? `\n### Suggested Steps\n${task.suggestedSteps.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n')}\n` : ''}`;
}

function formatTaskQueryResult(result: any): string {
  if (!result || !result.tasks) return 'No tasks found';
  
  const tasks = result.tasks as Task[];
  
  if (tasks.length === 0) return 'No tasks found matching the criteria';
  
  let formatted = `## Tasks (${tasks.length} found)\n\n`;
  
  tasks.forEach((task, index) => {
    formatted += `### ${index + 1}. ${task.title}\n`;
    formatted += `**ID:** ${task.id} | **Status:** ${task.status} | **Priority:** ${task.priority}\n`;
    
    if (task.assignee) {
      formatted += `**Assignee:** ${task.assignee}\n`;
    }
    
    if (task.dueDate) {
      formatted += `**Due:** ${new Date(task.dueDate).toLocaleDateString()}\n`;
    }
    
    if (task.tags && task.tags.length > 0) {
      formatted += `**Tags:** ${task.tags.join(', ')}\n`;
    }
    
    formatted += `\n${task.description}\n\n---\n\n`;
  });
  
  return formatted;
}
