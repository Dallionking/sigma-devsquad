
export interface WorkflowRule {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  priority: number;
  trigger: WorkflowTrigger;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  createdAt: string;
  lastExecuted?: string;
}

export interface WorkflowTrigger {
  type: 'card_created' | 'card_updated' | 'card_moved' | 'time_based' | 'webhook';
  config: {
    schedule?: string;
    delay?: number;
    time?: string;
    secret?: string;
    webhookUrl?: string;
    method?: 'POST' | 'PUT' | 'PATCH';
    headers?: Record<string, string>;
  };
}

export interface WorkflowCondition {
  type: 'card_property' | 'time_condition' | 'column_state' | 'assignee_workload';
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'in' | 'not_in';
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

export interface WorkflowAction {
  type: 'move_card' | 'assign_card' | 'update_property' | 'send_notification' | 'webhook_call' | 'create_card';
  config: {
    targetColumnId?: string;
    assignmentStrategy?: AssignmentStrategy;
    assignee?: string;
    propertyName?: string;
    propertyValue?: any;
    notificationType?: string;
    recipients?: string[];
    message?: string;
    webhookUrl?: string;
    method?: string;
    headers?: Record<string, string>;
    payload?: Record<string, any>;
    cardTemplate?: {
      title: string;
      description?: string;
      columnId: string;
      priority?: 'low' | 'medium' | 'high' | 'urgent';
      tags?: string[];
    };
  };
}

export interface AutomationExecution {
  id: string;
  ruleId: string;
  cardId: string;
  status: 'success' | 'error' | 'skipped';
  executedAt: string;
  duration: number;
  result?: any;
  error?: string;
}

export type AssignmentStrategy = 'round_robin' | 'least_loaded' | 'by_skill' | 'manual';
