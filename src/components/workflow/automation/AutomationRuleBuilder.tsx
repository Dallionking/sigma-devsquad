
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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
  User,
  ArrowRight,
  Webhook,
  Bell,
  FileText,
  Settings
} from 'lucide-react';
import { WorkflowRule, WorkflowCondition, WorkflowAction, WorkflowTrigger, AssignmentStrategy } from '@/types/workflow-automation';
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
  const [ruleName, setRuleName] = useState('');
  const [ruleDescription, setRuleDescription] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [priority, setPriority] = useState(1);
  const [trigger, setTrigger] = useState<WorkflowTrigger>({
    type: 'card_created',
    config: {}
  });
  const [conditions, setConditions] = useState<WorkflowCondition[]>([]);
  const [actions, setActions] = useState<WorkflowAction[]>([]);

  // Load rule data when editing
  useEffect(() => {
    if (rule) {
      setRuleName(rule.name);
      setRuleDescription(rule.description);
      setIsEnabled(rule.isEnabled);
      setPriority(rule.priority);
      setTrigger(rule.trigger);
      setConditions(rule.conditions);
      setActions(rule.actions);
    }
  }, [rule]);

  const handleSave = () => {
    const ruleData: Omit<WorkflowRule, 'id' | 'createdAt'> = {
      name: ruleName,
      description: ruleDescription,
      isEnabled,
      priority,
      trigger,
      conditions,
      actions
    };
    onSave(ruleData);
  };

  const addCondition = () => {
    const newCondition: WorkflowCondition = {
      type: 'card_property',
      field: 'status',
      operator: 'equals',
      value: '',
      logicalOperator: 'AND'
    };
    setConditions([...conditions, newCondition]);
  };

  const updateCondition = (index: number, updates: Partial<WorkflowCondition>) => {
    const updatedConditions = conditions.map((condition, i) => 
      i === index ? { ...condition, ...updates } : condition
    );
    setConditions(updatedConditions);
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const addAction = () => {
    const newAction: WorkflowAction = {
      type: 'move_card',
      config: {
        targetColumnId: config.columns[0]?.id || ''
      }
    };
    setActions([...actions, newAction]);
  };

  const updateAction = (index: number, updates: Partial<WorkflowAction>) => {
    const updatedActions = actions.map((action, i) => 
      i === index ? { ...action, ...updates } : action
    );
    setActions(updatedActions);
  };

  const removeAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index));
  };

  const renderTriggerConfig = () => {
    switch (trigger.type) {
      case 'time_based':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="interval">Interval (minutes)</Label>
              <Input
                id="interval"
                type="number"
                value={trigger.config.interval || ''}
                onChange={(e) => setTrigger({
                  ...trigger,
                  config: { ...trigger.config, interval: parseInt(e.target.value) }
                })}
              />
            </div>
            <div>
              <Label htmlFor="timeUnit">Time Unit</Label>
              <Select
                value={trigger.config.timeUnit || 'minutes'}
                onValueChange={(value) => setTrigger({
                  ...trigger,
                  config: { ...trigger.config, timeUnit: value }
                })}
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
          <div>
            <Label htmlFor="webhookUrl">Webhook URL</Label>
            <Input
              id="webhookUrl"
              value={trigger.config.webhookUrl || ''}
              onChange={(e) => setTrigger({
                ...trigger,
                config: { ...trigger.config, webhookUrl: e.target.value }
              })}
              placeholder="https://example.com/webhook"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderConditionConfig = (condition: WorkflowCondition, index: number) => {
    return (
      <Card key={index} className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Condition {index + 1}</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => removeCondition(index)}
            className="text-red-600 hover:text-red-700"
          >
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
                {condition.type === 'card_property' && (
                  <>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="assignee">Assignee</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="tags">Tags</SelectItem>
                  </>
                )}
                {condition.type === 'time_condition' && (
                  <>
                    <SelectItem value="dueDate">Due Date</SelectItem>
                    <SelectItem value="createdAt">Created At</SelectItem>
                    <SelectItem value="updatedAt">Updated At</SelectItem>
                  </>
                )}
                {condition.type === 'column_state' && (
                  <SelectItem value="cardCount">Card Count</SelectItem>
                )}
                {condition.type === 'assignee_workload' && (
                  <SelectItem value="taskCount">Task Count</SelectItem>
                )}
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

  const renderActionConfig = (action: WorkflowAction, index: number) => {
    return (
      <Card key={index} className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Action {index + 1}</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => removeAction(index)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Action Type</Label>
            <Select
              value={action.type}
              onValueChange={(value: any) => updateAction(index, { 
                type: value,
                config: {} // Reset config when type changes
              })}
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

          {/* Action-specific configuration */}
          {action.type === 'move_card' && (
            <div>
              <Label>Target Column</Label>
              <Select
                value={action.config.targetColumnId || ''}
                onValueChange={(value) => updateAction(index, {
                  config: { ...action.config, targetColumnId: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select column" />
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
          )}

          {action.type === 'assign_card' && (
            <div>
              <Label>Assignment Strategy</Label>
              <Select
                value={action.config.assignmentStrategy || 'round_robin'}
                onValueChange={(value) => updateAction(index, {
                  config: { ...action.config, assignmentStrategy: value as AssignmentStrategy }
                })}
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
              
              {action.config.assignmentStrategy === 'specific_user' && (
                <div className="mt-2">
                  <Label>Assignee</Label>
                  <Input
                    value={action.config.assigneeId || ''}
                    onChange={(e) => updateAction(index, {
                      config: { ...action.config, assigneeId: e.target.value }
                    })}
                    placeholder="Enter user ID or email"
                  />
                </div>
              )}
            </div>
          )}

          {action.type === 'update_property' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Property Name</Label>
                <Select
                  value={action.config.propertyName || ''}
                  onValueChange={(value) => updateAction(index, {
                    config: { ...action.config, propertyName: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="tags">Tags</SelectItem>
                    <SelectItem value="dueDate">Due Date</SelectItem>
                    <SelectItem value="estimatedHours">Estimated Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Property Value</Label>
                <Input
                  value={action.config.propertyValue || ''}
                  onChange={(e) => updateAction(index, {
                    config: { ...action.config, propertyValue: e.target.value }
                  })}
                  placeholder="Enter new value"
                />
              </div>
            </div>
          )}

          {action.type === 'send_notification' && (
            <div className="space-y-4">
              <div>
                <Label>Notification Type</Label>
                <Select
                  value={action.config.notificationType || 'email'}
                  onValueChange={(value) => updateAction(index, {
                    config: { ...action.config, notificationType: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="slack">Slack</SelectItem>
                    <SelectItem value="discord">Discord</SelectItem>
                    <SelectItem value="in_app">In-App</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Recipients</Label>
                <Input
                  value={action.config.recipients?.join(', ') || ''}
                  onChange={(e) => updateAction(index, {
                    config: { 
                      ...action.config, 
                      recipients: e.target.value.split(',').map(r => r.trim()).filter(Boolean)
                    }
                  })}
                  placeholder="Enter email addresses separated by commas"
                />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea
                  value={action.config.message || ''}
                  onChange={(e) => updateAction(index, {
                    config: { ...action.config, message: e.target.value }
                  })}
                  placeholder="Enter notification message. Use {{cardTitle}} for dynamic values."
                />
              </div>
            </div>
          )}

          {action.type === 'webhook_call' && (
            <div className="space-y-4">
              <div>
                <Label>Webhook URL</Label>
                <Input
                  value={action.config.webhookUrl || ''}
                  onChange={(e) => updateAction(index, {
                    config: { ...action.config, webhookUrl: e.target.value }
                  })}
                  placeholder="https://example.com/webhook"
                />
              </div>
              <div>
                <Label>HTTP Method</Label>
                <Select
                  value={action.config.method || 'POST'}
                  onValueChange={(value) => updateAction(index, {
                    config: { ...action.config, method: value }
                  })}
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
              <div>
                <Label>Custom Payload (JSON)</Label>
                <Textarea
                  value={JSON.stringify(action.config.payload || {}, null, 2)}
                  onChange={(e) => {
                    try {
                      const payload = JSON.parse(e.target.value);
                      updateAction(index, {
                        config: { ...action.config, payload }
                      });
                    } catch (error) {
                      // Invalid JSON, don't update
                    }
                  }}
                  placeholder='{"key": "value"}'
                  className="font-mono"
                />
              </div>
            </div>
          )}

          {action.type === 'create_card' && (
            <div className="space-y-4">
              <div>
                <Label>Card Title Template</Label>
                <Input
                  value={action.config.cardTemplate?.title || ''}
                  onChange={(e) => updateAction(index, {
                    config: { 
                      ...action.config, 
                      cardTemplate: { 
                        ...action.config.cardTemplate,
                        title: e.target.value 
                      }
                    }
                  })}
                  placeholder="New task for {{triggerCard}}"
                />
              </div>
              <div>
                <Label>Target Column</Label>
                <Select
                  value={action.config.cardTemplate?.columnId || ''}
                  onValueChange={(value) => updateAction(index, {
                    config: { 
                      ...action.config, 
                      cardTemplate: { 
                        ...action.config.cardTemplate,
                        columnId: value 
                      }
                    }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select column" />
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
              <div>
                <Label>Description Template</Label>
                <Textarea
                  value={action.config.cardTemplate?.description || ''}
                  onChange={(e) => updateAction(index, {
                    config: { 
                      ...action.config, 
                      cardTemplate: { 
                        ...action.config.cardTemplate,
                        description: e.target.value 
                      }
                    }
                  })}
                  placeholder="Follow-up task for {{triggerCard}}"
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };

  const isValid = ruleName.trim() && actions.length > 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            {rule ? 'Edit Automation Rule' : 'Create Automation Rule'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ruleName">Rule Name</Label>
              <Input
                id="ruleName"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
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
            <Label htmlFor="ruleDescription">Description</Label>
            <Textarea
              id="ruleDescription"
              value={ruleDescription}
              onChange={(e) => setRuleDescription(e.target.value)}
              placeholder="Describe what this rule does"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={isEnabled}
              onCheckedChange={setIsEnabled}
            />
            <Label>Enable this rule</Label>
          </div>

          <Separator />

          {/* Trigger Configuration */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Trigger
            </h3>
            <div className="space-y-4">
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
          </div>

          <Separator />

          {/* Conditions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Conditions
              </h3>
              <Button variant="outline" onClick={addCondition}>
                <Plus className="w-4 h-4 mr-2" />
                Add Condition
              </Button>
            </div>
            
            {conditions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No conditions defined. The rule will trigger for all events of the specified type.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {conditions.map((condition, index) => renderConditionConfig(condition, index))}
              </div>
            )}
          </div>

          <Separator />

          {/* Actions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ArrowRight className="w-5 h-5" />
                Actions
              </h3>
              <Button variant="outline" onClick={addAction}>
                <Plus className="w-4 h-4 mr-2" />
                Add Action
              </Button>
            </div>
            
            {actions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                <ArrowRight className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No actions defined. Add at least one action to complete the rule.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {actions.map((action, index) => renderActionConfig(action, index))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!isValid}>
          <Save className="w-4 h-4 mr-2" />
          {rule ? 'Update Rule' : 'Create Rule'}
        </Button>
      </div>
    </div>
  );
};
