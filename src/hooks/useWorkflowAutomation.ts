
import { useState, useEffect, useCallback } from 'react';
import { WorkflowRule, AutomationExecution, WorkflowCondition, WorkflowAction, AssignmentStrategy } from '@/types/workflow-automation';
import { KanbanCard, KanbanBoardConfig } from '@/components/workflow/kanban/types';

export const useWorkflowAutomation = (config: KanbanBoardConfig) => {
  const [rules, setRules] = useState<WorkflowRule[]>([]);
  const [executions, setExecutions] = useState<AutomationExecution[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load rules from localStorage on mount
  useEffect(() => {
    const savedRules = localStorage.getItem('workflow-automation-rules');
    if (savedRules) {
      setRules(JSON.parse(savedRules));
    }
  }, []);

  // Save rules to localStorage when they change
  useEffect(() => {
    localStorage.setItem('workflow-automation-rules', JSON.stringify(rules));
  }, [rules]);

  const evaluateConditions = useCallback((conditions: WorkflowCondition[], card: KanbanCard, context: any = {}): boolean => {
    if (conditions.length === 0) return true;

    let result = true;
    let currentLogicalOperator = 'AND';

    for (const condition of conditions) {
      const conditionResult = evaluateCondition(condition, card, context);
      
      if (currentLogicalOperator === 'AND') {
        result = result && conditionResult;
      } else {
        result = result || conditionResult;
      }
      
      currentLogicalOperator = condition.logicalOperator || 'AND';
    }

    return result;
  }, []);

  const evaluateCondition = (condition: WorkflowCondition, card: KanbanCard, context: any): boolean => {
    let fieldValue: any;

    switch (condition.type) {
      case 'card_property':
        fieldValue = (card as any)[condition.field];
        break;
      case 'time_condition':
        const now = new Date();
        const cardDate = card.dueDate || new Date(card.id); // fallback to creation time
        fieldValue = Math.floor((now.getTime() - cardDate.getTime()) / (1000 * 60)); // minutes
        break;
      case 'column_state':
        const column = config.columns.find(col => col.id === card.status);
        fieldValue = column?.cards.length || 0;
        break;
      case 'assignee_workload':
        const assigneeCards = config.columns.flatMap(col => col.cards).filter(c => c.assignee === card.assignee);
        fieldValue = assigneeCards.length;
        break;
      default:
        return false;
    }

    switch (condition.operator) {
      case 'equals':
        return fieldValue === condition.value;
      case 'not_equals':
        return fieldValue !== condition.value;
      case 'contains':
        return String(fieldValue).toLowerCase().includes(String(condition.value).toLowerCase());
      case 'greater_than':
        return Number(fieldValue) > Number(condition.value);
      case 'less_than':
        return Number(fieldValue) < Number(condition.value);
      case 'in':
        return Array.isArray(condition.value) && condition.value.includes(fieldValue);
      case 'not_in':
        return Array.isArray(condition.value) && !condition.value.includes(fieldValue);
      default:
        return false;
    }
  };

  const executeActions = useCallback(async (actions: WorkflowAction[], card: KanbanCard, ruleId: string): Promise<any[]> => {
    const results = [];

    for (const action of actions) {
      try {
        const result = await executeAction(action, card, ruleId);
        results.push(result);
      } catch (error) {
        console.error('Action execution failed:', error);
        results.push({ error: error.message });
      }
    }

    return results;
  }, [config]);

  const executeAction = async (action: WorkflowAction, card: KanbanCard, ruleId: string): Promise<any> => {
    switch (action.type) {
      case 'move_card':
        return { type: 'move_card', cardId: card.id, targetColumn: action.config.targetColumnId };
        
      case 'assign_card':
        const assignee = await getAssignee(action.config.assignmentStrategy || 'round_robin', card);
        return { type: 'assign_card', cardId: card.id, assignee };
        
      case 'update_property':
        return { 
          type: 'update_property', 
          cardId: card.id, 
          property: action.config.propertyName, 
          value: action.config.propertyValue 
        };
        
      case 'send_notification':
        await sendNotification(action.config, card);
        return { type: 'send_notification', recipients: action.config.recipients };
        
      case 'webhook_call':
        const response = await callWebhook(action.config, card);
        return { type: 'webhook_call', response };
        
      case 'create_card':
        const newCard = createCardFromTemplate(action.config.cardTemplate!, card);
        return { type: 'create_card', newCard };
        
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };

  const getAssignee = async (strategy: string, card: KanbanCard): Promise<string> => {
    const allCards = config.columns.flatMap(col => col.cards);
    const assignees = [...new Set(allCards.map(c => c.assignee).filter(Boolean))];
    
    switch (strategy) {
      case 'round_robin':
        const cardCount = allCards.length;
        return assignees[cardCount % assignees.length] || 'Unassigned';
        
      case 'least_loaded':
        const workloadMap = assignees.reduce((acc, assignee) => {
          acc[assignee!] = allCards.filter(c => c.assignee === assignee && c.status !== 'done').length;
          return acc;
        }, {} as Record<string, number>);
        
        return Object.entries(workloadMap).sort(([,a], [,b]) => a - b)[0]?.[0] || 'Unassigned';
        
      case 'by_skill':
        // Simple skill matching based on card tags
        const matchingAssignee = assignees.find(assignee => 
          card.tags.some(tag => assignee?.toLowerCase().includes(tag.toLowerCase()))
        );
        return matchingAssignee || assignees[0] || 'Unassigned';
        
      default:
        return 'Unassigned';
    }
  };

  const sendNotification = async (config: any, card: KanbanCard): Promise<void> => {
    // In a real app, this would integrate with your notification system
    console.log('Notification sent:', {
      recipients: config.recipients,
      message: config.message?.replace('{{cardTitle}}', card.title),
      type: config.notificationType,
      card: card.id
    });
  };

  const callWebhook = async (config: any, card: KanbanCard): Promise<any> => {
    const payload = {
      ...config.payload,
      card: {
        id: card.id,
        title: card.title,
        status: card.status,
        assignee: card.assignee,
        priority: card.priority,
        tags: card.tags
      },
      timestamp: new Date().toISOString()
    };

    const response = await fetch(config.webhookUrl, {
      method: config.method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
      body: JSON.stringify(payload)
    });

    return response.json();
  };

  const createCardFromTemplate = (template: any, triggerCard: KanbanCard): KanbanCard => {
    return {
      id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: template.title.replace('{{triggerCard}}', triggerCard.title),
      description: template.description?.replace('{{triggerCard}}', triggerCard.title),
      status: template.columnId,
      priority: template.priority || 'medium',
      tags: template.tags || [],
      assignee: triggerCard.assignee,
      estimatedHours: 0,
      completedHours: 0,
      attachments: 0,
      comments: 0
    };
  };

  const processCardEvent = useCallback(async (eventType: string, card: KanbanCard, context: any = {}) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    const applicableRules = rules.filter(rule => 
      rule.isEnabled && 
      rule.trigger.type === eventType
    );

    const executions: AutomationExecution[] = [];

    for (const rule of applicableRules) {
      const startTime = Date.now();
      
      try {
        const conditionsMet = evaluateConditions(rule.conditions, card, context);
        
        if (conditionsMet) {
          const results = await executeActions(rule.actions, card, rule.id);
          
          executions.push({
            id: `exec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            ruleId: rule.id,
            cardId: card.id,
            status: 'success',
            executedAt: new Date().toISOString(),
            duration: Date.now() - startTime,
            result: results
          });
        } else {
          executions.push({
            id: `exec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            ruleId: rule.id,
            cardId: card.id,
            status: 'skipped',
            executedAt: new Date().toISOString(),
            duration: Date.now() - startTime
          });
        }
      } catch (error) {
        executions.push({
          id: `exec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          ruleId: rule.id,
          cardId: card.id,
          status: 'error',
          executedAt: new Date().toISOString(),
          duration: Date.now() - startTime,
          error: error.message
        });
      }
    }

    setExecutions(prev => [...prev, ...executions]);
    setIsProcessing(false);
    
    return executions;
  }, [rules, evaluateConditions, executeActions, isProcessing]);

  const addRule = useCallback((rule: Omit<WorkflowRule, 'id' | 'createdAt'>) => {
    const newRule: WorkflowRule = {
      ...rule,
      id: `rule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    setRules(prev => [...prev, newRule]);
    return newRule;
  }, []);

  const updateRule = useCallback((ruleId: string, updates: Partial<WorkflowRule>) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, ...updates } : rule
    ));
  }, []);

  const deleteRule = useCallback((ruleId: string) => {
    setRules(prev => prev.filter(rule => rule.id !== ruleId));
  }, []);

  const clearExecutions = useCallback(() => {
    setExecutions([]);
  }, []);

  return {
    rules,
    executions,
    isProcessing,
    processCardEvent,
    addRule,
    updateRule,
    deleteRule,
    clearExecutions
  };
};
