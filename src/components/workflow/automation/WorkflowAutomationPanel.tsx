
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Settings, 
  Plus, 
  Play, 
  Pause, 
  Activity, 
  Zap,
  Clock,
  Webhook,
  GitBranch
} from 'lucide-react';
import { WorkflowRule, AutomationExecution } from '@/types/workflow-automation';
import { KanbanBoardConfig } from '@/components/workflow/kanban/types';
import { useWorkflowAutomation } from '@/hooks/useWorkflowAutomation';
import { AutomationRuleBuilder } from './AutomationRuleBuilder';
import { AutomationRulesList } from './AutomationRulesList';
import { AutomationExecutionLog } from './AutomationExecutionLog';
import { AutomationStats } from './AutomationStats';

interface WorkflowAutomationPanelProps {
  config: KanbanBoardConfig;
  onConfigChange?: (config: KanbanBoardConfig) => void;
}

export const WorkflowAutomationPanel: React.FC<WorkflowAutomationPanelProps> = ({
  config,
  onConfigChange
}) => {
  const [showRuleBuilder, setShowRuleBuilder] = useState(false);
  const [editingRule, setEditingRule] = useState<WorkflowRule | null>(null);
  
  const {
    rules,
    executions,
    isProcessing,
    processCardEvent,
    addRule,
    updateRule,
    deleteRule,
    clearExecutions
  } = useWorkflowAutomation(config);

  const enabledRulesCount = rules.filter(rule => rule.isEnabled).length;
  const recentExecutions = executions.slice(-10);
  const successRate = executions.length > 0 
    ? (executions.filter(exec => exec.status === 'success').length / executions.length) * 100 
    : 0;

  const handleCreateRule = () => {
    setEditingRule(null);
    setShowRuleBuilder(true);
  };

  const handleEditRule = (rule: WorkflowRule) => {
    setEditingRule(rule);
    setShowRuleBuilder(true);
  };

  const handleSaveRule = (ruleData: Omit<WorkflowRule, 'id' | 'createdAt'>) => {
    if (editingRule) {
      updateRule(editingRule.id, ruleData);
    } else {
      addRule(ruleData);
    }
    setShowRuleBuilder(false);
    setEditingRule(null);
  };

  const handleDeleteRule = (ruleId: string) => {
    deleteRule(ruleId);
  };

  const handleToggleRule = (ruleId: string, enabled: boolean) => {
    updateRule(ruleId, { isEnabled: enabled });
  };

  const testRule = async (rule: WorkflowRule) => {
    // Create a mock card for testing
    const mockCard = {
      id: 'test-card',
      title: 'Test Card',
      status: 'todo',
      priority: 'medium' as const,
      tags: ['test'],
      assignee: 'Test User',
      estimatedHours: 8,
      completedHours: 0,
      attachments: 0,
      comments: 0
    };

    await processCardEvent('card_created', mockCard, { isTest: true });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                Workflow Automation
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Automate card movements, assignments, and notifications
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isProcessing ? "default" : "secondary"} className="flex items-center gap-1">
                <Activity className="w-3 h-3" />
                {isProcessing ? 'Processing' : 'Idle'}
              </Badge>
              <Button onClick={handleCreateRule}>
                <Plus className="w-4 h-4 mr-2" />
                Create Rule
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{rules.length}</div>
              <div className="text-sm text-muted-foreground">Total Rules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{enabledRulesCount}</div>
              <div className="text-sm text-muted-foreground">Active Rules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{executions.length}</div>
              <div className="text-sm text-muted-foreground">Total Executions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{Math.round(successRate)}%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Alert */}
      {isProcessing && (
        <Alert>
          <Activity className="h-4 w-4 animate-spin" />
          <AlertDescription>
            Processing automation rules...
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <Tabs defaultValue="rules" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rules" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Rules
          </TabsTrigger>
          <TabsTrigger value="executions" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Execution Log
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <GitBranch className="w-4 h-4" />
            Statistics
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Webhook className="w-4 h-4" />
            Webhooks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="mt-6">
          {showRuleBuilder ? (
            <AutomationRuleBuilder
              rule={editingRule}
              config={config}
              onSave={handleSaveRule}
              onCancel={() => {
                setShowRuleBuilder(false);
                setEditingRule(null);
              }}
            />
          ) : (
            <AutomationRulesList
              rules={rules}
              onEdit={handleEditRule}
              onDelete={handleDeleteRule}
              onToggle={handleToggleRule}
              onTest={testRule}
            />
          )}
        </TabsContent>

        <TabsContent value="executions" className="mt-6">
          <AutomationExecutionLog
            executions={executions}
            rules={rules}
            onClear={clearExecutions}
          />
        </TabsContent>

        <TabsContent value="stats" className="mt-6">
          <AutomationStats
            rules={rules}
            executions={executions}
          />
        </TabsContent>

        <TabsContent value="webhooks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="w-5 h-5" />
                Webhook Integrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Webhook className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Webhook Configuration</h3>
                <p className="mb-4">Set up webhooks to integrate with external tools like Slack, Discord, or custom APIs.</p>
                <Button variant="outline">
                  Configure Webhooks
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
