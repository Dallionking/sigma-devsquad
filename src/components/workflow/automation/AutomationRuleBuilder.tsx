
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Minus, 
  Save, 
  X, 
  Zap, 
  GitBranch,
  Clock,
  Webhook,
  User,
  ArrowRight
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
  const [formData, setFormData] = useState<Omit<WorkflowRule, 'id' | 'createdAt'>>({
    name: '',
    description: '',
    isEnabled: true,
    priority: 1,
    trigger: { type: 'card_created' },
    conditions: [],
    actions: []
  });

  useEffect(() => {
    if (rule) {
      setFormData({
        name: rule.name,
        description: rule.description,
        isEnabled: rule.isEnabled,
        priority: rule.priority,
        trigger: rule.trigger,
        conditions: rule.conditions,
        actions: rule.actions
      });
    }
  }, [rule]);

  const addCondition = () => {
    setFormData(prev => ({
      ...prev,
      conditions: [
        ...prev.conditions,
        {
          type: 'card_property',
          field: 'priority',
          operator: 'equals',
          value: 'high'
        }
      ]
    }));
  };

  const updateCondition = (index: number, updates: Partial<WorkflowCondition>) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.map((condition, i) =>
        i === index ? { ...condition, ...updates } : condition
      )
    }));
  };

  const removeCondition = (index: number) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }));
  };

  const addAction = () => {
    setFormData(prev => ({
      ...prev,
      actions: [
        ...prev.actions,
        {
          type: 'move_card',
          config: { targetColumnId: config.columns[0]?.id || '' }
        }
      ]
    }));
  };

  const updateAction = (index: number, updates: Partial<WorkflowAction>) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.map((action, i) =>
        i === index ? { ...action, ...updates } : action
      )
    }));
  };

  const removeAction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;
    onSave(formData);
  };

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case 'card_created': return <Plus className="w-4 h-4" />;
      case 'card_updated': return <GitBranch className="w-4 h-4" />;
      case 'card_moved': return <ArrowRight className="w-4 h-4" />;
      case 'time_based': return <Clock className="w-4 h-4" />;
      case 'webhook': return <Webhook className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'move_card': return <ArrowRight className="w-4 h-4" />;
      case 'assign_card': return <User className="w-4 h-4" />;
      case 'webhook_call': return <Webhook className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            {rule ? 'Edit Rule' : 'Create Automation Rule'}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!formData.name.trim()}>
              <Save className="w-4 h-4 mr-2" />
              Save Rule
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rule-name">Rule Name</Label>
            <Input
              id="rule-name"
              placeholder="e.g., Auto-assign high priority cards"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rule-priority">Priority</Label>
            <Select
              value={formData.priority.toString()}
              onValueChange={(value) => setFormData(prev => ({ ...prev, priority: parseInt(value) }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">High (1)</SelectItem>
                <SelectItem value="5">Medium (5)</SelectItem>
                <SelectItem value="10">Low (10)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rule-description">Description</Label>
          <Textarea
            id="rule-description"
            placeholder="Describe what this rule does..."
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="rule-enabled"
            checked={formData.isEnabled}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isEnabled: checked }))}
          />
          <Label htmlFor="rule-enabled">Enable this rule</Label>
        </div>

        {/* Trigger */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              {getTriggerIcon(formData.trigger.type)}
              Trigger
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>When this happens</Label>
              <Select
                value={formData.trigger.type}
                onValueChange={(value) => setFormData(prev => ({
                  ...prev,
                  trigger: { ...prev.trigger, type: value as any }
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card_created">Card is created</SelectItem>
                  <SelectItem value="card_updated">Card is updated</SelectItem>
                  <SelectItem value="card_moved">Card is moved</SelectItem>
                  <SelectItem value="time_based">Time-based trigger</SelectItem>
                  <SelectItem value="webhook">Webhook received</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.trigger.type === 'time_based' && (
              <div className="space-y-2">
                <Label>Schedule (cron expression)</Label>
                <Input
                  placeholder="0 9 * * MON-FRI (9 AM on weekdays)"
                  value={formData.trigger.config?.schedule || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    trigger: {
                      ...prev.trigger,
                      config: { ...prev.trigger.config, schedule: e.target.value }
                    }
                  }))}
                />
              </div>
            )}

            {formData.trigger.type === 'webhook' && (
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <Input
                  placeholder="https://your-app.com/webhook"
                  value={formData.trigger.config?.webhookUrl || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    trigger: {
                      ...prev.trigger,
                      config: { ...prev.trigger.config, webhookUrl: e.target.value }
                    }
                  }))}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Conditions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Conditions</CardTitle>
              <Button variant="outline" size="sm" onClick={addCondition}>
                <Plus className="w-4 h-4 mr-2" />
                Add Condition
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {formData.conditions.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No conditions set. Rule will trigger for all events.
              </p>
            ) : (
              <div className="space-y-4">
                {formData.conditions.map((condition, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 border rounded">
                    <Select
                      value={condition.type}
                      onValueChange={(value) => updateCondition(index, { type: value as any })}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card_property">Card Property</SelectItem>
                        <SelectItem value="time_condition">Time Condition</SelectItem>
                        <SelectItem value="column_state">Column State</SelectItem>
                        <SelectItem value="assignee_workload">Assignee Workload</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={condition.field}
                      onValueChange={(value) => updateCondition(index, { field: value })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {condition.type === 'card_property' && (
                          <>
                            <SelectItem value="priority">Priority</SelectItem>
                            <SelectItem value="status">Status</SelectItem>
                            <SelectItem value="assignee">Assignee</SelectItem>
                            <SelectItem value="tags">Tags</SelectItem>
                          </>
                        )}
                        {condition.type === 'time_condition' && (
                          <>
                            <SelectItem value="age">Card Age</SelectItem>
                            <SelectItem value="due_date">Due Date</SelectItem>
                          </>
                        )}
                        {condition.type === 'column_state' && (
                          <SelectItem value="card_count">Card Count</SelectItem>
                        )}
                        {condition.type === 'assignee_workload' && (
                          <SelectItem value="card_count">Card Count</SelectItem>
                        )}
                      </SelectContent>
                    </Select>

                    <Select
                      value={condition.operator}
                      onValueChange={(value) => updateCondition(index, { operator: value as any })}
                    >
                      <SelectTrigger className="w-32">
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

                    <Input
                      placeholder="Value"
                      value={condition.value}
                      onChange={(e) => updateCondition(index, { value: e.target.value })}
                      className="flex-1"
                    />

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCondition(index)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Actions</CardTitle>
              <Button variant="outline" size="sm" onClick={addAction}>
                <Plus className="w-4 h-4 mr-2" />
                Add Action
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {formData.actions.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No actions configured. Add actions to execute when conditions are met.
              </p>
            ) : (
              <div className="space-y-4">
                {formData.actions.map((action, index) => (
                  <div key={index} className="p-4 border rounded space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getActionIcon(action.type)}
                        <Select
                          value={action.type}
                          onValueChange={(value) => updateAction(index, { type: value as any })}
                        >
                          <SelectTrigger className="w-48">
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeAction(index)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Action-specific configuration */}
                    {action.type === 'move_card' && (
                      <div className="space-y-2">
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
                      <div className="space-y-2">
                        <Label>Assignment Strategy</Label>
                        <Select
                          value={action.config.assignmentStrategy || 'round_robin'}
                          onValueChange={(value) => updateAction(index, {
                            config: { ...action.config, assignmentStrategy: value }
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
                      </div>
                    )}

                    {action.type === 'webhook_call' && (
                      <div className="space-y-2">
                        <Label>Webhook URL</Label>
                        <Input
                          placeholder="https://api.example.com/webhook"
                          value={action.config.webhookUrl || ''}
                          onChange={(e) => updateAction(index, {
                            config: { ...action.config, webhookUrl: e.target.value }
                          })}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
