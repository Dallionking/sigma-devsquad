import { z } from 'zod';
import { BridgeClient } from '../services/bridgeClient.js';
import { WorkflowDefinition } from '../types/index.js';

const StartWorkflowSchema = z.object({
  workflowType: z.enum(['research-to-development', 'quick-prototype', 'bug-fix', 'feature-development', 'code-review']),
  context: z.object({
    title: z.string(),
    description: z.string(),
    projectPath: z.string().optional(),
    targetBranch: z.string().optional(),
    assignees: z.array(z.string()).optional()
  })
});

export const workflowTools = {
  startWorkflowDefinition: {
    name: 'vibe_devsquad_start_workflow',
    description: 'Start a complete development workflow from idea to implementation',
    inputSchema: {
      type: 'object',
      properties: {
        workflowType: {
          type: 'string',
          enum: ['research-to-development', 'quick-prototype', 'bug-fix', 'feature-development', 'code-review'],
          description: 'Type of workflow to start'
        },
        context: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Title of the workflow'
            },
            description: {
              type: 'string',
              description: 'Detailed description of what needs to be done'
            },
            projectPath: {
              type: 'string',
              description: 'Path to the project (optional)'
            },
            targetBranch: {
              type: 'string',
              description: 'Target git branch (optional)'
            },
            assignees: {
              type: 'array',
              items: { type: 'string' },
              description: 'List of assignees (optional)'
            }
          },
          required: ['title', 'description']
        }
      },
      required: ['workflowType', 'context']
    }
  },

  async startWorkflow(args: unknown, bridgeClient: BridgeClient) {
    const params = StartWorkflowSchema.parse(args);
    
    try {
      // Get workflow definition based on type
      const workflowDef = getWorkflowDefinition(params.workflowType);
      
      // Send workflow start request to bridge
      const response = await bridgeClient.sendRequest('startWorkflow', {
        workflow: workflowDef,
        context: {
          ...params.context,
          workspaceFolder: params.context.projectPath || process.cwd()
        }
      });

      return {
        content: [
          {
            type: 'text',
            text: formatWorkflowStartResult(response, params.workflowType)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error starting workflow: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        ]
      };
    }
  }
};

function getWorkflowDefinition(type: string): WorkflowDefinition {
  const workflows: Record<string, WorkflowDefinition> = {
    'research-to-development': {
      id: 'research-to-dev',
      name: 'Research to Development',
      description: 'Complete workflow from research to implementation',
      steps: [
        {
          id: 'research',
          name: 'Research Phase',
          type: 'research',
          action: 'gatherInsights',
          parameters: {
            sources: ['technical-docs', 'best-practices', 'similar-projects'],
            depth: 'comprehensive'
          }
        },
        {
          id: 'prd',
          name: 'Create PRD',
          type: 'prd',
          action: 'generatePRD',
          parameters: {
            includeUserStories: true,
            includeTechnicalSpecs: true
          },
          dependencies: ['research']
        },
        {
          id: 'planning',
          name: 'Planning Phase',
          type: 'planning',
          action: 'createPlan',
          parameters: {
            breakdownTasks: true,
            estimateEffort: true,
            identifyRisks: true
          },
          dependencies: ['prd']
        },
        {
          id: 'team-creation',
          name: 'Create AI Team',
          type: 'planning',
          action: 'assembleTeam',
          parameters: {
            roles: ['architect', 'developer', 'tester', 'reviewer']
          },
          dependencies: ['planning']
        },
        {
          id: 'development',
          name: 'Development Phase',
          type: 'development',
          action: 'implement',
          parameters: {
            iterative: true,
            includeTests: true,
            codeReview: true
          },
          dependencies: ['team-creation']
        },
        {
          id: 'review',
          name: 'Final Review',
          type: 'review',
          action: 'conductReview',
          parameters: {
            checkQuality: true,
            validateRequirements: true,
            performanceTest: true
          },
          dependencies: ['development']
        }
      ]
    },
    'quick-prototype': {
      id: 'quick-proto',
      name: 'Quick Prototype',
      description: 'Rapid prototyping workflow',
      steps: [
        {
          id: 'concept',
          name: 'Conceptualize',
          type: 'planning',
          action: 'defineScope',
          parameters: {
            timeboxed: true,
            maxHours: 4
          }
        },
        {
          id: 'prototype',
          name: 'Build Prototype',
          type: 'development',
          action: 'rapidPrototype',
          parameters: {
            focusOnCore: true,
            skipTests: true
          },
          dependencies: ['concept']
        },
        {
          id: 'demo',
          name: 'Demo & Feedback',
          type: 'review',
          action: 'gatherFeedback',
          parameters: {
            interactive: true
          },
          dependencies: ['prototype']
        }
      ]
    },
    'bug-fix': {
      id: 'bug-fix',
      name: 'Bug Fix Workflow',
      description: 'Systematic bug fixing process',
      steps: [
        {
          id: 'reproduce',
          name: 'Reproduce Issue',
          type: 'research',
          action: 'reproduceIssue',
          parameters: {
            collectLogs: true,
            identifySteps: true
          }
        },
        {
          id: 'analyze',
          name: 'Root Cause Analysis',
          type: 'research',
          action: 'analyzeRootCause',
          parameters: {
            deepDive: true,
            checkRelated: true
          },
          dependencies: ['reproduce']
        },
        {
          id: 'fix',
          name: 'Implement Fix',
          type: 'development',
          action: 'implementFix',
          parameters: {
            minimal: true,
            addTests: true
          },
          dependencies: ['analyze']
        },
        {
          id: 'verify',
          name: 'Verify Fix',
          type: 'review',
          action: 'verifyFix',
          parameters: {
            regression: true,
            edgeCases: true
          },
          dependencies: ['fix']
        }
      ]
    },
    'feature-development': {
      id: 'feature-dev',
      name: 'Feature Development',
      description: 'Standard feature development workflow',
      steps: [
        {
          id: 'requirements',
          name: 'Gather Requirements',
          type: 'planning',
          action: 'defineRequirements',
          parameters: {
            userStories: true,
            acceptanceCriteria: true
          }
        },
        {
          id: 'design',
          name: 'Technical Design',
          type: 'planning',
          action: 'createDesign',
          parameters: {
            architecture: true,
            apiDesign: true
          },
          dependencies: ['requirements']
        },
        {
          id: 'implement',
          name: 'Implementation',
          type: 'development',
          action: 'implement',
          parameters: {
            tdd: true,
            documentation: true
          },
          dependencies: ['design']
        },
        {
          id: 'test',
          name: 'Testing',
          type: 'review',
          action: 'runTests',
          parameters: {
            unit: true,
            integration: true,
            e2e: true
          },
          dependencies: ['implement']
        }
      ]
    },
    'code-review': {
      id: 'code-review',
      name: 'Code Review',
      description: 'Comprehensive code review process',
      steps: [
        {
          id: 'static-analysis',
          name: 'Static Analysis',
          type: 'review',
          action: 'runStaticAnalysis',
          parameters: {
            linting: true,
            security: true,
            complexity: true
          }
        },
        {
          id: 'review',
          name: 'Manual Review',
          type: 'review',
          action: 'conductReview',
          parameters: {
            architecture: true,
            bestPractices: true,
            performance: true
          },
          dependencies: ['static-analysis']
        },
        {
          id: 'feedback',
          name: 'Provide Feedback',
          type: 'review',
          action: 'compileFeedback',
          parameters: {
            actionable: true,
            prioritized: true
          },
          dependencies: ['review']
        }
      ]
    }
  };
  
  return workflows[type] || workflows['feature-development'];
}

function formatWorkflowStartResult(result: any, workflowType: string): string {
  if (!result) return 'Failed to start workflow';
  
  let formatted = `## Workflow Started Successfully\n\n`;
  formatted += `**Type:** ${workflowType}\n`;
  formatted += `**ID:** ${result.workflowId}\n`;
  formatted += `**Status:** ${result.status}\n\n`;
  
  if (result.currentStep) {
    formatted += `### Current Step\n`;
    formatted += `**${result.currentStep.name}**\n`;
    formatted += `${result.currentStep.description || ''}\n\n`;
  }
  
  if (result.steps && result.steps.length > 0) {
    formatted += `### Workflow Steps\n`;
    result.steps.forEach((step: any, index: number) => {
      const status = step.completed ? '✅' : (step.active ? '🔄' : '⏳');
      formatted += `${index + 1}. ${status} ${step.name}\n`;
    });
    formatted += '\n';
  }
  
  if (result.estimatedTime) {
    formatted += `**Estimated Time:** ${result.estimatedTime}\n`;
  }
  
  if (result.nextAction) {
    formatted += `\n### Next Action\n${result.nextAction}\n`;
  }
  
  return formatted;
}
