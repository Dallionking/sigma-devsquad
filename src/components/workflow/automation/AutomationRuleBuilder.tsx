
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Trash2, 
  Save, 
  X, 
  Zap, 
  Settings,
  Clock,
  Webhook,
  GitBranch,
  User,
  ArrowRight,
  Filter
} from 'lucide-react';
import { WorkflowRule, WorkflowTrigger, WorkflowCondition, WorkflowAction } from '@/types/workflow-automation';
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
  const [ruleData, setRuleData] = useState<Omit<WorkflowRule, 'id' | 'createdAt'>>({
    name: '',
    description: '',
    trigger: {
      type: 'card_created',
      config: {}
    },
    conditions: [],
    actions: [],
    isEnabled: true,
    priority: 1
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (rule) {
      setRuleData({
        name: rule.name,
        description: rule.description,
        trigger: rule.trigger,
        conditions: rule.conditions,
        actions: rule.actions,
        isEnabled: rule.isEnabled,
        priority: rule.priority
      });
    }
  }, [rule]);

  const validateRule = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!ruleData.name.trim()) {
      newErrors.name = 'Rule name is required';
    }

    if (!ruleData.description.trim()) {
      newErrors.description = 'Rule description is required';
    }

    if (ruleData.actions.length === 0) {
      newErrors.actions = 'At least one action is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateRule()) {
      onSave(ruleData);
    }
  };

  const updateTrigger = (field: string, value: any) => {
    setRuleData(prev => ({
      ...prev,
      trigger: {
        ...prev.trigger,
        [field]: value
      }
    }));
  };

  const addCondition = () => {
    const newCondition: WorkflowCondition = {
      type: 'card_property',
      field: 'status',
      operator: 'equals',
      value: '',
      logicalOperator: 'AND'
    };

    setRuleData(prev => ({
      ...prev,
      conditions: [...prev.conditions, newCondition]
    }));
  };

  const updateCondition = (index: number, field: string, value: any) => {
    setRuleData(prev => ({
      ...prev,
      conditions: prev.conditions.map((condition, i) => 
        i === index ? { ...condition, [field]: value } : condition
      )
    }));
  };

  const removeCondition = (index: number) => {
    setRuleData(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }));
  };

  const addAction = () => {
    const newAction: WorkflowAction = {
      type: 'move_card',
      config: {
        targetColumnId: config.columns[0]?.id || ''
      }
    };

    setRuleData(prev => ({
      ...prev,
      actions: [...prev.actions, newAction]
    }));
  };

  const updateAction = (index: number, field: string, value: any) => {
    setRuleData(prev => ({
      ...prev,
      actions: prev.actions.map((action, i) => 
        i === index ? { ...action, [field]: value } : action
      )
    }));
  };

  const updateActionConfig = (index: number, configField: string, value: any) => {
    setRuleData(prev => ({
      ...prev,
      actions: prev.actions.map((action, i) => 
        i === index ? {
          ...action,
          config: {
            ...action.config,
            [configField]: value
          }
        } : action
      )
    }));
  };

  const removeAction = (index: number) => {
    setRuleData(prev => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index)
    }));
  };

  const renderTriggerConfig = () => {
    const triggerType = ruleData.trigger.type;

    switch (triggerType) {
      case 'time_based':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="schedule">Schedule</Label>
              <Select 
                value={ruleData.trigger.config.schedule || 'daily'} 
                onValueChange={(value) => updateTrigger('config', { ...ruleData.trigger.config, schedule: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={ruleData.trigger.config.time || '09:00'}
                onChange={(e) => updateTrigger('config', { ...ruleData.trigger.config, time: e.target.value })}
              />
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
                placeholder="https://example.com/webhook"
                value={ruleData.trigger.config.webhookUrl || ''}
                onChange={(e) => updateTrigger('config', { ...ruleData.trigger.config, webhookUrl: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="secret">Secret (optional)</Label>
              <Input
                id="secret"
                type="password"
                placeholder="Webhook secret"
                value={ruleData.trigger.config.secret || ''}
                onChange={(e) => updateTrigger('config', { ...ruleData.trigger.config, secret: e.target.value })}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-sm text-muted-foreground">
            No additional configuration required for this trigger type.
          </div>
        );
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
            <Select value={condition.type} onValueChange={(value) => updateCondition(index, 'type', value)}>
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
            {condition.type === 'card_property' ? (
              <Select value={condition.field} onValueChange={(value) => updateCondition(index, 'field', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="assignee">Assignee</SelectItem>
                  <SelectItem value="tags">Tags</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={condition.field}
                onChange={(e) => updateCondition(index, 'field', e.target.value)}
                placeholder="Field name"
              />
            )}
          </div>

          <div>
            <Label>Operator</Label>
            <Select value={condition.operator} onValueChange={(value) => updateCondition(index, 'operator', value)}>
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
            {condition.field === 'status' ? (
              <Select value={condition.value as string} onValueChange={(value) => updateCondition(index, 'value', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {config.columns.map(column => (
                    <SelectItem key={column.id} value={column.id}>{column.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : condition.field === 'priority' ? (
              <Select value={condition.value as string} onValueChange={(value) => updateCondition(index, 'value', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={condition.value as string}
                onChange={(e) => updateCondition(index, 'value', e.target.value)}
                placeholder="Value"
              />
            )}
          </div>
        </div>

        {index > 0 && (
          <div className="mt-4">
            <Label>Logical Operator</Label>
            <Select 
              value={condition.logicalOperator || 'AND'} 
              onValueChange={(value) => updateCondition(index, 'logicalOperator', value)}
            >
              <SelectTrigger className="w-24">
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
            <Select value={action.type} onValueChange={(value) => updateAction(index, 'type', value)}>
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

          {action.type === 'move_card' && (
            <div>
              <Label>Target Column</Label>
              <Select 
                value={action.config.targetColumnId} 
                onValueChange={(value) => updateActionConfig(index, 'targetColumnId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select column" />
                </SelectTrigger>
                <SelectContent>
                  {config.columns.map(column => (
                    <SelectItem key={column.id} value={column.id}>{column.title}</SelectItem>
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
                onValueChange={(value) => updateActionConfig(index, 'assignmentStrategy', value)}
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
          )}

          {action.type === 'update_property' && (
            <div className="space-y-4">
              <div>
                <Label>Property</Label>
                <Select 
                  value={action.config.propertyName} 
                  onValueChange={(value) => updateActionConfig(index, 'propertyName', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="tags">Tags</SelectItem>
                    <SelectItem value="description">Description</SelectItem>
                    <SelectItem value="estimatedHours">Estimated Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>New Value</Label>
                <Input
                  value={action.config.propertyValue || ''}
                  onChange={(e) => updateActionConfig(index, 'propertyValue', e.target.value)}
                  placeholder="New value"
                />
              </div>
            </div>
          )}

          {action.type === 'send_notification' && (
            <div className="space-y-4">
              <div>
                <Label>Recipients</Label>
                <Input
                  value={action.config.recipients?.join(', ') || ''}
                  onChange={(e) => updateActionConfig(index, 'recipients', e.target.value.split(', ').filter(Boolean))}
                  placeholder="user1@example.com, user2@example.com"
                />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea
                  value={action.config.message || ''}
                  onChange={(e) => updateActionConfig(index, 'message', e.target.value)}
                  placeholder="Notification message (use {{cardTitle}} for dynamic content)"
                />
              </div>
              <div>
                <Label>Notification Type</Label>
                <Select 
                  value={action.config.notificationType || 'email'} 
                  onValueChange={(value) => updateActionConfig(index, 'notificationType', value)}
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
            </div>
          )}

          {action.type === 'webhook_call' && (
            <div className="space-y-4">
              <div>
                <Label>Webhook URL</Label>
                <Input
                  value={action.config.webhookUrl || ''}
                  onChange={(e) => updateActionConfig(index, 'webhookUrl', e.target.value)}
                  placeholder="https://example.com/webhook"
                />
              </div>
              <div>
                <Label>HTTP Method</Label>
                <Select 
                  value={action.config.method || 'POST'} 
                  onValueChange={(value) => updateActionConfig(index, 'method', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Headers (JSON)</Label>
                <Textarea
                  value={JSON.stringify(action.config.headers || {}, null, 2)}
                  onChange={(e) => {
                    try {
                      const headers = JSON.parse(e.target.value);
                      updateActionConfig(index, 'headers', headers);
                    } catch (error) {
                      // Invalid JSON, ignore
                    }
                  }}
                  placeholder='{"Authorization": "Bearer token"}'
                />
              </div>
              <div>
                <Label>Payload (JSON)</Label>
                <Textarea
                  value={JSON.stringify(action.config.payload || {}, null, 2)}
                  onChange={(e) => {
                    try {
                      const payload = JSON.parse(e.target.value);
                      updateActionConfig(index, 'payload', payload);
                    } catch (error) {
                      // Invalid JSON, ignore
                    }
                  }}
                  placeholder='{"message": "Card updated"}'
                />
              </div>
            </div>
          )}

          {action.type === 'create_card' && (
            <div className="space-y-4">
              <div>
                <Label>Card Title</Label>
                <Input
                  value={action.config.cardTemplate?.title || ''}
                  onChange={(e) => updateActionConfig(index, 'cardTemplate', { 
                    ...action.config.cardTemplate, 
                    title: e.target.value 
                  })}
                  placeholder="New card title (use {{triggerCard}} for dynamic content)"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={action.config.cardTemplate?.description || ''}
                  onChange={(e) => updateActionConfig(index, 'cardTemplate', { 
                    ...action.config.cardTemplate, 
                    description: e.target.value 
                  })}
                  placeholder="Card description"
                />
              </div>
              <div>
                <Label>Target Column</Label>
                <Select 
                  value={action.config.cardTemplate?.columnId || ''} 
                  onValueChange={(value) => updateActionConfig(index, 'cardTemplate', { 
                    ...action.config.cardTemplate, 
                    columnId: value 
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent>
                    {config.columns.map(column => (
                      <SelectItem key={column.id} value={column.id}>{column.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                {rule ? 'Edit Automation Rule' : 'Create Automation Rule'}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Define when and how your workflow should be automated
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                {rule ? 'Update Rule' : 'Save Rule'}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="trigger">Trigger</TabsTrigger>
              <TabsTrigger value="conditions">Conditions</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Rule Name</Label>
                  <Input
                    id="name"
                    value={ruleData.name}
                    onChange={(e) => setRuleData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter rule name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={ruleData.priority.toString()} 
                    onValueChange={(value) => setRuleData(prev => ({ ...prev, priority: parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 (Highest)</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5 (Lowest)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={ruleData.description}
                  onChange={(e) => setRuleData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this rule does"
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isEnabled"
                  checked={ruleData.isEnabled}
                  onChange={(e) => setRuleData(prev => ({ ...prev, isEnabled: e.target.checked }))}
                />
                <Label htmlFor="isEnabled">Enable this rule</Label>
              </div>
            </TabsContent>

            <TabsContent value="trigger" className="mt-6 space-y-4">
              <div>
                <Label>Trigger Type</Label>
                <Select 
                  value={ruleData.trigger.type} 
                  onValueChange={(value) => updateTrigger('type', value)}
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

              <Separator />

              <div>
                <h3 className="font-medium mb-4">Trigger Configuration</h3>
                {renderTriggerConfig()}
              </div>
            </TabsContent>

            <TabsContent value="conditions" className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Conditions</h3>
                <Button onClick={addCondition} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Condition
                </Button>
              </div>

              {ruleData.conditions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No Conditions</h3>
                  <p>This rule will trigger for all events of the selected type.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {ruleData.conditions.map((condition, index) => renderConditionConfig(condition, index))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="actions" className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Actions</h3>
                <Button onClick={addAction} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Action
                </Button>
              </div>

              {errors.actions && <p className="text-sm text-red-500">{errors.actions}</p>}

              {ruleData.actions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No Actions</h3>
                  <p>Add at least one action to define what happens when this rule triggers.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {ruleData.actions.map((action, index) => renderActionConfig(action, index))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
