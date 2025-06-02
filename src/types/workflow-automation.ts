
export interface WorkflowRule {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  trigger: WorkflowTrigger;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  priority: number;
  createdAt: string;
  lastExecuted?: string;
}

export interface WorkflowTrigger {
  type: 'card_created' | 'card_updated' | 'card_moved' | 'time_based' | 'webhook';
  config?: {
    // For time-based triggers
    schedule?: string; // cron expression
    delay?: number; // minutes
    
    // For webhook triggers
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
    // For move_card
    targetColumnId?: string;
    
    // For assign_card
    assignmentStrategy?: 'round_robin' | 'least_loaded' | 'by_skill' | 'specific_user';
    assigneeId?: string;
    
    // For update_property
    propertyName?: string;
    propertyValue?: any;
    
    // For send_notification
    recipients?: string[];
    message?: string;
    notificationType?: 'email' | 'in_app' | 'webhook';
    
    // For webhook_call
    webhookUrl?: string;
    method?: 'POST' | 'PUT' | 'PATCH';
    headers?: Record<string, string>;
    payload?: Record<string, any>;
    
    // For create_card
    cardTemplate?: {
      title: string;
      description?: string;
      columnId: string;
      priority?: 'low' | 'medium' | 'high';
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
  error?: string;
  result?: any;
}

export interface AssignmentStrategy {
  type: 'round_robin' | 'least_loaded' | 'by_skill' | 'specific_user';
  config: {
    users?: string[];
    skillMap?: Record<string, string[]>; // tag -> users with that skill
    excludeUsers?: string[];
  };
}
