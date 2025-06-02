
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Trash2, 
  Save, 
  X, 
  Zap,
  Clock,
  GitBranch,
  Webhook,
  User,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { WorkflowRule, WorkflowCondition, WorkflowAction, WorkflowTrigger } from '@/types/workflow-automation';
import { KanbanBoardConfig } from '@/components/workflow/kanban/types';

interface AutomationRuleBuilderProps {
  rule?: WorkflowRule | null;
  config: KanbanBoardConfig;
  onSave: (rule: Omit<WorkflowRule, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export const AutomationRuleBuilder: React.FC<AutomationRuleBuilderProps> = ({
  rule,
  config,
  onSave,
  onCancel
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [priority, setPriority] = useState(1);
  const [trigger, setTrigger] = useState<WorkflowTrigger>({
    type: 'card_created',
    config: {}
  });
  const [conditions, setConditions] = useState<WorkflowCondition[]>([]);
  const [actions, setActions] = useState<WorkflowAction[]>([]);

  // Initialize form with existing rule data
  useEffect(() => {
    if (rule) {
      setName(rule.name);
      setDescription(rule.description);
      setIsEnabled(rule.isEnabled);
      setPriority(rule.priority);
      setTrigger(rule.trigger);
      setConditions(rule.conditions);
      setActions(rule.actions);
    }
  }, [rule]);

  const handleSave = () => {
    const ruleData: Omit<WorkflowRule, 'id' | 'createdAt'> = {
      name,
      description,
      isEnabled,
      priority,
      trigger,
      conditions,
      actions
    };
    onSave(ruleData);
  };

  const addCondition = () => {
    setConditions([...conditions, {
      type: 'card_property',
      field: 'status',
      operator: 'equals',
      value: '',
      logicalOperator: 'AND'
    }]);
  };

  const updateCondition = (index: number, updates: Partial<WorkflowCondition>) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], ...updates };
    setConditions(newConditions);
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const addAction = () => {
    setActions([...actions, {
      type: 'move_card',
      config: {}
    }]);
  };

  const updateAction = (index: number, updates: Partial<WorkflowAction>) => {
    const newActions = [...actions];
    newActions[index] = { ...newActions[index], ...updates };
    setActions(newActions);
  };

  const removeAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index));
  };

  const updateTriggerConfig = (key: string, value: any) => {
    setTrigger({
      ...trigger,
      config: {
        ...trigger.config,
        [key]: value
      }
    });
  };

  const renderTriggerConfig = () => {
    switch (trigger.type) {
      case 'time_based':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="schedule">Schedule (Cron Expression)</Label>
              <Input
                id="schedule"
                value={trigger.config.schedule || ''}
                onChange={(e) => updateTriggerConfig('schedule', e.target.value)}
                placeholder="0 9 * * 1-5 (9 AM weekdays)"
              />
            </div>
            <div>
              <Label htmlFor="interval">Interval (minutes)</Label>
              <Input
                id="interval"
                type="number"
                value={(trigger.config as any).interval || ''}
                onChange={(e) => updateTriggerConfig('interval', parseInt(e.target.value) || 0)}
                placeholder="60"
              />
            </div>
            <div>
              <Label htmlFor="timeUnit">Time Unit</Label>
              <Select 
                value={(trigger.config as any).timeUnit || 'minutes'} 
                onValueChange={(value) => updateTriggerConfig('timeUnit', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minutes</SelectItem>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 'webhook':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={trigger.config.webhookUrl || ''}
                onChange={(e) => updateTriggerConfig('webhookUrl', e.target.value)}
                placeholder="https://api.example.com/webhook"
              />
            </div>
            <div>
              <Label htmlFor="method">HTTP Method</Label>
              <Select 
                value={trigger.config.method || 'POST'} 
                onValueChange={(value) => updateTriggerConfig('method', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderConditionField = (condition: WorkflowCondition, index: number) => {
    return (
      <Card key={index} className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium">Condition {index + 1}</h4>
          <Button variant="ghost" size="sm" onClick={() => removeCondition(index)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>Type</Label>
            <Select 
              value={condition.type} 
              onValueChange={(value: any) => updateCondition(index, { type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card_property">Card Property</SelectItem>
                <SelectItem value="time_condition">Time Condition</SelectItem>
                <SelectItem value="column_state">Column State</SelectItem>
                <SelectItem value="assignee_workload">Assignee Workload</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Field</Label>
            <Select 
              value={condition.field} 
              onValueChange={(value) => updateCondition(index, { field: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="assignee">Assignee</SelectItem>
                <SelectItem value="tags">Tags</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="estimatedHours">Estimated Hours</SelectItem>
                <SelectItem value="completedHours">Completed Hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Operator</Label>
            <Select 
              value={condition.operator} 
              onValueChange={(value: any) => updateCondition(index, { operator: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equals">Equals</SelectItem>
                <SelectItem value="not_equals">Not Equals</SelectItem>
                <SelectItem value="contains">Contains</SelectItem>
                <SelectItem value="greater_than">Greater Than</SelectItem>
                <SelectItem value="less_than">Less Than</SelectItem>
                <SelectItem value="in">In</SelectItem>
                <SelectItem value="not_in">Not In</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Value</Label>
            <Input
              value={condition.value}
              onChange={(e) => updateCondition(index, { value: e.target.value })}
              placeholder="Enter value"
            />
          </div>
        </div>

        {index > 0 && (
          <div className="mt-4">
            <Label>Logical Operator</Label>
            <Select 
              value={condition.logicalOperator || 'AND'} 
              onValueChange={(value: any) => updateCondition(index, { logicalOperator: value })}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AND">AND</SelectItem>
                <SelectItem value="OR">OR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </Card>
    );
  };

  const renderActionField = (action: WorkflowAction, index: number) => {
    return (
      <Card key={index} className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium">Action {index + 1}</h4>
          <Button variant="ghost" size="sm" onClick={() => removeAction(index)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Action Type</Label>
            <Select 
              value={action.type} 
              onValueChange={(value: any) => updateAction(index, { type: value, config: {} })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="move_card">Move Card</SelectItem>
                <SelectItem value="assign_card">Assign Card</SelectItem>
                <SelectItem value="update_property">Update Property</SelectItem>
                <SelectItem value="send_notification">Send Notification</SelectItem>
                <SelectItem value="webhook_call">Call Webhook</SelectItem>
                <SelectItem value="create_card">Create Card</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {renderActionConfig(action, index)}
        </div>
      </Card>
    );
  };

  const renderActionConfig = (action: WorkflowAction, index: number) => {
    const updateActionConfig = (key: string, value: any) => {
      updateAction(index, {
        config: {
          ...action.config,
          [key]: value
        }
      });
    };

    switch (action.type) {
      case 'move_card':
        return (
          <div>
            <Label>Target Column</Label>
            <Select 
              value={action.config.targetColumnId || ''} 
              onValueChange={(value) => updateActionConfig('targetColumnId', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {config.columns.map(column => (
                  <SelectItem key={column.id} value={column.id}>
                    {column.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'assign_card':
        return (
          <div className="space-y-4">
            <div>
              <Label>Assignment Strategy</Label>
              <Select 
                value={action.config.assignmentStrategy as string || 'round_robin'} 
                onValueChange={(value) => updateActionConfig('assignmentStrategy', value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="round_robin">Round Robin</SelectItem>
                  <SelectItem value="least_loaded">Least Loaded</SelectItem>
                  <SelectItem value="by_skill">By Skill</SelectItem>
                  <SelectItem value="specific_user">Specific User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {action.config.assignmentStrategy === 'specific_user' && (
              <div>
                <Label>Specific User</Label>
                <Input
                  value={action.config.specificUser || ''}
                  onChange={(e) => updateActionConfig('specificUser', e.target.value)}
                  placeholder="Enter username"
                />
              </div>
            )}
          </div>
        );

      case 'update_property':
        return (
          <div className="space-y-4">
            <div>
              <Label>Property Name</Label>
              <Select 
                value={action.config.propertyName || ''} 
                onValueChange={(value) => updateActionConfig('propertyName', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="assignee">Assignee</SelectItem>
                  <SelectItem value="estimatedHours">Estimated Hours</SelectItem>
                  <SelectItem value="tags">Tags</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Property Value</Label>
              <Input
                value={action.config.propertyValue || ''}
                onChange={(e) => updateActionConfig('propertyValue', e.target.value)}
                placeholder="Enter new value"
              />
            </div>
          </div>
        );

      case 'send_notification':
        return (
          <div className="space-y-4">
            <div>
              <Label>Notification Type</Label>
              <Select 
                value={action.config.notificationType as string || 'in_app'} 
                onValueChange={(value) => updateActionConfig('notificationType', value as 'webhook' | 'email' | 'in_app')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in_app">In-App</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="webhook">Webhook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Recipients</Label>
              <Input
                value={action.config.recipients?.join(', ') || ''}
                onChange={(e) => updateActionConfig('recipients', e.target.value.split(', ').filter(Boolean))}
                placeholder="user1, user2, user3"
              />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                value={action.config.message || ''}
                onChange={(e) => updateActionConfig('message', e.target.value)}
                placeholder="Card {{cardTitle}} needs attention"
              />
            </div>
          </div>
        );

      case 'webhook_call':
        return (
          <div className="space-y-4">
            <div>
              <Label>Webhook URL</Label>
              <Input
                value={action.config.webhookUrl || ''}
                onChange={(e) => updateActionConfig('webhookUrl', e.target.value)}
                placeholder="https://api.example.com/webhook"
              />
            </div>
            <div>
              <Label>HTTP Method</Label>
              <Select 
                value={action.config.method as string || 'POST'} 
                onValueChange={(value) => updateActionConfig('method', value as 'POST' | 'PUT' | 'PATCH')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                </SelectContent>
              </SelectContent>
            </div>
            <div>
              <Label>Payload (JSON)</Label>
              <Textarea
                value={JSON.stringify(action.config.payload || {}, null, 2)}
                onChange={(e) => {
                  try {
                    const payload = JSON.parse(e.target.value);
                    updateActionConfig('payload', payload);
                  } catch (error) {
                    // Invalid JSON, don't update
                  }
                }}
                placeholder='{"key": "value"}'
              />
            </div>
          </div>
        );

      case 'create_card':
        return (
          <div className="space-y-4">
            <div>
              <Label>Card Title</Label>
              <Input
                value={action.config.cardTemplate?.title || ''}
                onChange={(e) => updateActionConfig('cardTemplate', {
                  ...action.config.cardTemplate,
                  title: e.target.value
                })}
                placeholder="Follow-up task for {{triggerCard}}"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={action.config.cardTemplate?.description || ''}
                onChange={(e) => updateActionConfig('cardTemplate', {
                  ...action.config.cardTemplate,
                  description: e.target.value
                })}
                placeholder="This card was created automatically..."
              />
            </div>
            <div>
              <Label>Target Column</Label>
              <Select 
                value={action.config.cardTemplate?.columnId || ''} 
                onValueChange={(value) => updateActionConfig('cardTemplate', {
                  ...action.config.cardTemplate,
                  columnId: value
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {config.columns.map(column => (
                    <SelectItem key={column.id} value={column.id}>
                      {column.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              {rule ? 'Edit Automation Rule' : 'Create Automation Rule'}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Rule
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Rule Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter rule name"
                />
              </div>
              
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Input
                  id="priority"
                  type="number"
                  min="1"
                  max="10"
                  value={priority}
                  onChange={(e) => setPriority(parseInt(e.target.value) || 1)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this rule does"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={isEnabled}
                onCheckedChange={setIsEnabled}
              />
              <Label>Enable this rule</Label>
            </div>
          </div>

          <Separator />

          {/* Trigger Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Trigger</h3>
            
            <div>
              <Label>Trigger Type</Label>
              <Select 
                value={trigger.type} 
                onValueChange={(value: any) => setTrigger({ type: value, config: {} })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card_created">Card Created</SelectItem>
                  <SelectItem value="card_updated">Card Updated</SelectItem>
                  <SelectItem value="card_moved">Card Moved</SelectItem>
                  <SelectItem value="time_based">Time Based</SelectItem>
                  <SelectItem value="webhook">Webhook</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {renderTriggerConfig()}
          </div>

          <Separator />

          {/* Conditions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Conditions</h3>
              <Button variant="outline" size="sm" onClick={addCondition}>
                <Plus className="w-4 h-4 mr-2" />
                Add Condition
              </Button>
            </div>

            {conditions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No conditions set. This rule will trigger for all events of the selected type.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {conditions.map((condition, index) => renderConditionField(condition, index))}
              </div>
            )}
          </div>

          <Separator />

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Actions</h3>
              <Button variant="outline" size="sm" onClick={addAction}>
                <Plus className="w-4 h-4 mr-2" />
                Add Action
              </Button>
            </div>

            {actions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No actions configured. Add actions to define what happens when this rule triggers.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {actions.map((action, index) => renderActionField(action, index))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
