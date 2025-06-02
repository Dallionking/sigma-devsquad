
import { useState, useCallback, useEffect } from 'react';
import { WorkflowTemplate } from '@/types/workflow-templates';

// Mock data for demonstration
const mockTemplates: WorkflowTemplate[] = [
  {
    id: 'agile-sprint',
    name: 'Agile Sprint Workflow',
    description: 'Complete 2-week sprint cycle with planning, development, testing, and review phases',
    category: 'Development',
    tags: ['agile', 'sprint', 'scrum', 'planning'],
    createdAt: '2024-01-15T08:00:00Z',
    lastModified: '2024-02-01T14:30:00Z',
    usage: 156,
    complexity: 'medium',
    isPublic: true,
    nodes: [
      {
        id: 'start',
        type: 'start',
        title: 'Sprint Planning',
        description: 'Plan the sprint backlog and define goals',
        position: { x: 100, y: 100 },
        config: { agentType: 'planning', estimatedDuration: 4, priority: 'high' }
      },
      {
        id: 'development',
        type: 'task',
        title: 'Development Phase',
        description: 'Implement features and fix bugs',
        position: { x: 300, y: 100 },
        config: { agentType: 'frontend', estimatedDuration: 60, priority: 'high' }
      },
      {
        id: 'testing',
        type: 'task',
        title: 'Testing & QA',
        description: 'Test features and ensure quality',
        position: { x: 500, y: 100 },
        config: { agentType: 'qa', estimatedDuration: 20, priority: 'high' }
      },
      {
        id: 'review',
        type: 'task',
        title: 'Sprint Review',
        description: 'Demo completed work and gather feedback',
        position: { x: 700, y: 100 },
        config: { agentType: 'planning', estimatedDuration: 2, priority: 'medium' }
      },
      {
        id: 'end',
        type: 'end',
        title: 'Sprint Complete',
        description: 'Sprint officially completed',
        position: { x: 900, y: 100 }
      }
    ],
    connections: [
      { id: 'start-dev', fromNodeId: 'start', toNodeId: 'development' },
      { id: 'dev-test', fromNodeId: 'development', toNodeId: 'testing' },
      { id: 'test-review', fromNodeId: 'testing', toNodeId: 'review' },
      { id: 'review-end', fromNodeId: 'review', toNodeId: 'end' }
    ],
    variables: {
      sprintDuration: {
        name: 'Sprint Duration',
        type: 'select',
        defaultValue: '2 weeks',
        options: ['1 week', '2 weeks', '3 weeks', '4 weeks'],
        description: 'Length of the sprint cycle'
      },
      teamSize: {
        name: 'Team Size',
        type: 'number',
        defaultValue: 5,
        description: 'Number of team members'
      }
    }
  },
  {
    id: 'ci-cd-pipeline',
    name: 'CI/CD Pipeline',
    description: 'Automated continuous integration and deployment workflow',
    category: 'DevOps',
    tags: ['ci-cd', 'automation', 'deployment', 'testing'],
    createdAt: '2024-01-10T10:00:00Z',
    lastModified: '2024-01-25T16:45:00Z',
    usage: 89,
    complexity: 'complex',
    isPublic: true,
    nodes: [
      {
        id: 'trigger',
        type: 'start',
        title: 'Code Commit',
        description: 'Triggered by code push to repository',
        position: { x: 100, y: 100 }
      },
      {
        id: 'build',
        type: 'task',
        title: 'Build & Compile',
        description: 'Compile code and create artifacts',
        position: { x: 300, y: 100 },
        config: { agentType: 'devops', estimatedDuration: 10, priority: 'high' }
      },
      {
        id: 'test',
        type: 'task',
        title: 'Automated Tests',
        description: 'Run unit, integration, and e2e tests',
        position: { x: 500, y: 100 },
        config: { agentType: 'qa', estimatedDuration: 15, priority: 'high' }
      },
      {
        id: 'security',
        type: 'task',
        title: 'Security Scan',
        description: 'Scan for vulnerabilities and security issues',
        position: { x: 700, y: 100 },
        config: { agentType: 'devops', estimatedDuration: 5, priority: 'medium' }
      },
      {
        id: 'deploy',
        type: 'task',
        title: 'Deploy to Production',
        description: 'Deploy the application to production environment',
        position: { x: 900, y: 100 },
        config: { agentType: 'devops', estimatedDuration: 8, priority: 'high' }
      },
      {
        id: 'complete',
        type: 'end',
        title: 'Pipeline Complete',
        description: 'Deployment successful',
        position: { x: 1100, y: 100 }
      }
    ],
    connections: [
      { id: 'trigger-build', fromNodeId: 'trigger', toNodeId: 'build' },
      { id: 'build-test', fromNodeId: 'build', toNodeId: 'test' },
      { id: 'test-security', fromNodeId: 'test', toNodeId: 'security' },
      { id: 'security-deploy', fromNodeId: 'security', toNodeId: 'deploy' },
      { id: 'deploy-complete', fromNodeId: 'deploy', toNodeId: 'complete' }
    ]
  },
  {
    id: 'bug-triage',
    name: 'Bug Triage Process',
    description: 'Systematic approach to bug identification, prioritization, and resolution',
    category: 'Quality Assurance',
    tags: ['bug', 'triage', 'quality', 'testing'],
    createdAt: '2024-01-20T09:00:00Z',
    lastModified: '2024-02-05T11:20:00Z',
    usage: 67,
    complexity: 'simple',
    isPublic: false,
    nodes: [
      {
        id: 'report',
        type: 'start',
        title: 'Bug Report',
        description: 'New bug reported by user or tester',
        position: { x: 100, y: 100 }
      },
      {
        id: 'triage',
        type: 'decision',
        title: 'Initial Triage',
        description: 'Assess bug severity and priority',
        position: { x: 300, y: 100 },
        config: { agentType: 'qa', estimatedDuration: 1, priority: 'high' }
      },
      {
        id: 'investigate',
        type: 'task',
        title: 'Investigation',
        description: 'Reproduce and analyze the bug',
        position: { x: 500, y: 100 },
        config: { agentType: 'qa', estimatedDuration: 4, priority: 'medium' }
      },
      {
        id: 'fix',
        type: 'task',
        title: 'Bug Fix',
        description: 'Implement solution for the bug',
        position: { x: 700, y: 100 },
        config: { agentType: 'backend', estimatedDuration: 8, priority: 'high' }
      },
      {
        id: 'verify',
        type: 'task',
        title: 'Verification',
        description: 'Test the fix and verify resolution',
        position: { x: 900, y: 100 },
        config: { agentType: 'qa', estimatedDuration: 2, priority: 'medium' }
      },
      {
        id: 'resolved',
        type: 'end',
        title: 'Bug Resolved',
        description: 'Bug has been fixed and verified',
        position: { x: 1100, y: 100 }
      }
    ],
    connections: [
      { id: 'report-triage', fromNodeId: 'report', toNodeId: 'triage' },
      { id: 'triage-investigate', fromNodeId: 'triage', toNodeId: 'investigate' },
      { id: 'investigate-fix', fromNodeId: 'investigate', toNodeId: 'fix' },
      { id: 'fix-verify', fromNodeId: 'fix', toNodeId: 'verify' },
      { id: 'verify-resolved', fromNodeId: 'verify', toNodeId: 'resolved' }
    ]
  }
];

export const useWorkflowTemplates = () => {
  const [templates, setTemplates] = useState<WorkflowTemplate[]>(mockTemplates);
  const [loading, setLoading] = useState(false);

  const createTemplate = useCallback(async (template: Omit<WorkflowTemplate, 'id'>) => {
    setLoading(true);
    try {
      const newTemplate: WorkflowTemplate = {
        ...template,
        id: `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        usage: 0
      };
      setTemplates(prev => [newTemplate, ...prev]);
      return newTemplate;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTemplate = useCallback(async (id: string, updates: Partial<WorkflowTemplate>) => {
    setLoading(true);
    try {
      setTemplates(prev => prev.map(template => 
        template.id === id 
          ? { ...template, ...updates, lastModified: new Date().toISOString() }
          : template
      ));
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTemplate = useCallback(async (id: string) => {
    setLoading(true);
    try {
      setTemplates(prev => prev.filter(template => template.id !== id));
    } finally {
      setLoading(false);
    }
  }, []);

  const duplicateTemplate = useCallback(async (id: string) => {
    const template = templates.find(t => t.id === id);
    if (template) {
      return createTemplate({
        ...template,
        name: `${template.name} (Copy)`,
        isPublic: false
      });
    }
  }, [templates, createTemplate]);

  const importTemplate = useCallback(async (template: WorkflowTemplate) => {
    return createTemplate(template);
  }, [createTemplate]);

  const exportTemplate = useCallback(async (id: string) => {
    const template = templates.find(t => t.id === id);
    if (template) {
      const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}-template.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [templates]);

  const shareTemplate = useCallback(async (id: string, shareSettings: any) => {
    await updateTemplate(id, { isPublic: shareSettings.isPublic });
  }, [updateTemplate]);

  const searchTemplates = useCallback((searchTerm: string, category: string) => {
    return templates.filter(template => {
      const matchesSearch = !searchTerm || 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = category === 'all' || template.category === category;
      
      return matchesSearch && matchesCategory;
    });
  }, [templates]);

  return {
    templates,
    loading,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    duplicateTemplate,
    importTemplate,
    exportTemplate,
    shareTemplate,
    searchTemplates
  };
};
