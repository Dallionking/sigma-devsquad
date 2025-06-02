
export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'Development' | 'DevOps' | 'Quality Assurance' | 'Planning' | 'Design';
  tags: string[];
  createdAt: string;
  lastModified: string;
  usage: number;
  complexity: 'simple' | 'medium' | 'complex';
  author?: string;
  isPublic?: boolean;
  nodes: WorkflowTemplateNode[];
  connections: WorkflowTemplateConnection[];
  variables?: Record<string, WorkflowTemplateVariable>;
}

export interface WorkflowTemplateNode {
  id: string;
  type: 'start' | 'task' | 'decision' | 'end' | 'parallel' | 'merge';
  title: string;
  description?: string;
  position: { x: number; y: number };
  config?: {
    agentType?: string;
    estimatedDuration?: number;
    priority?: 'low' | 'medium' | 'high';
    conditions?: string;
    variables?: string[];
  };
}

export interface WorkflowTemplateConnection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  condition?: string;
  label?: string;
}

export interface WorkflowTemplateVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'select';
  defaultValue?: any;
  options?: string[];
  description?: string;
  required?: boolean;
}

export interface TemplateCustomization {
  templateId: string;
  variables: Record<string, any>;
  nodeCustomizations: Record<string, Partial<WorkflowTemplateNode>>;
  name?: string;
  description?: string;
}
