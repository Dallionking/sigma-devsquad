
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Edit, 
  Trash2, 
  Play, 
  Clock, 
  Zap,
  GitBranch,
  Plus,
  ArrowRight,
  User,
  Webhook
} from 'lucide-react';
import { WorkflowRule } from '@/types/workflow-automation';

interface AutomationRulesListProps {
  rules: WorkflowRule[];
  onEdit: (rule: WorkflowRule) => void;
  onDelete: (ruleId: string) => void;
  onToggle: (ruleId: string, enabled: boolean) => void;
  onTest: (rule: WorkflowRule) => void;
}

export const AutomationRulesList: React.FC<AutomationRulesListProps> = ({
  rules,
  onEdit,
  onDelete,
  onToggle,
  onTest
}) => {
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

  const getTriggerLabel = (type: string) => {
    switch (type) {
      case 'card_created': return 'Card Created';
      case 'card_updated': return 'Card Updated';
      case 'card_moved': return 'Card Moved';
      case 'time_based': return 'Time Based';
      case 'webhook': return 'Webhook';
      default: return type;
    }
  };

  const getActionLabel = (type: string) => {
    switch (type) {
      case 'move_card': return 'Move Card';
      case 'assign_card': return 'Assign Card';
      case 'update_property': return 'Update Property';
      case 'send_notification': return 'Send Notification';
      case 'webhook_call': return 'Call Webhook';
      case 'create_card': return 'Create Card';
      default: return type;
    }
  };

  if (rules.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Zap className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Automation Rules</h3>
          <p className="text-muted-foreground mb-6">
            Create your first automation rule to streamline your workflow processes.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Automatically move cards based on conditions</p>
            <p>• Assign tasks to team members intelligently</p>
            <p>• Send notifications when deadlines approach</p>
            <p>• Integrate with external tools via webhooks</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {rules.map((rule) => (
        <Card key={rule.id} className={rule.isEnabled ? '' : 'opacity-60'}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Switch
                  checked={rule.isEnabled}
                  onCheckedChange={(checked) => onToggle(rule.id, checked)}
                />
                <div>
                  <CardTitle className="text-lg">{rule.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{rule.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  Priority {rule.priority}
                </Badge>
                <Button variant="outline" size="sm" onClick={() => onTest(rule)}>
                  <Play className="w-4 h-4 mr-2" />
                  Test
                </Button>
                <Button variant="outline" size="sm" onClick={() => onEdit(rule)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onDelete(rule.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Trigger */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  {getTriggerIcon(rule.trigger.type)}
                  Trigger
                </h4>
                <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                  {getTriggerLabel(rule.trigger.type)}
                </Badge>
              </div>

              {/* Conditions */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Conditions</h4>
                <div className="space-y-1">
                  {rule.conditions.length === 0 ? (
                    <span className="text-xs text-muted-foreground">Always trigger</span>
                  ) : (
                    rule.conditions.slice(0, 2).map((condition, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {condition.field} {condition.operator} {condition.value}
                      </Badge>
                    ))
                  )}
                  {rule.conditions.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{rule.conditions.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Actions</h4>
                <div className="space-y-1">
                  {rule.actions.slice(0, 2).map((action, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1 w-fit text-xs">
                      {getActionIcon(action.type)}
                      {getActionLabel(action.type)}
                    </Badge>
                  ))}
                  {rule.actions.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{rule.actions.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Last Executed */}
            {rule.lastExecuted && (
              <div className="mt-4 pt-4 border-t">
                <span className="text-xs text-muted-foreground">
                  Last executed: {new Date(rule.lastExecuted).toLocaleString()}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
