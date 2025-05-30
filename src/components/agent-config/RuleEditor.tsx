
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Copy, ArrowRight } from "lucide-react";
import { AgentType } from "@/pages/AgentConfiguration";

interface Rule {
  id: string;
  name: string;
  condition: string;
  action: string;
  priority: "low" | "medium" | "high";
  enabled: boolean;
}

interface RuleEditorProps {
  agentType: AgentType;
  onConfigChange: () => void;
}

const defaultRules: Record<AgentType, Rule[]> = {
  planning: [
    {
      id: "1",
      name: "High Priority Task Alert",
      condition: "task.priority === 'high' AND task.deadline < 3 days",
      action: "notify_team AND escalate_to_manager",
      priority: "high",
      enabled: true
    },
    {
      id: "2",
      name: "Dependency Blocker",
      condition: "task.dependencies.length > 0 AND all_dependencies_not_complete",
      action: "mark_as_blocked AND notify_dependency_owners",
      priority: "medium",
      enabled: true
    }
  ],
  frontend: [
    {
      id: "1",
      name: "Performance Warning",
      condition: "bundle_size > 500KB OR load_time > 3 seconds",
      action: "generate_performance_report AND suggest_optimizations",
      priority: "medium",
      enabled: true
    }
  ],
  backend: [
    {
      id: "1",
      name: "API Error Rate Alert",
      condition: "error_rate > 5% over 5 minutes",
      action: "send_alert AND auto_scale_resources",
      priority: "high",
      enabled: true
    }
  ],
  qa: [
    {
      id: "1",
      name: "Test Coverage Check",
      condition: "code_coverage < 80% AND pull_request_created",
      action: "block_merge AND request_additional_tests",
      priority: "high",
      enabled: true
    }
  ],
  documentation: [
    {
      id: "1",
      name: "Missing Documentation",
      condition: "new_api_endpoint_created AND no_documentation_exists",
      action: "create_documentation_task AND assign_to_developer",
      priority: "medium",
      enabled: true
    }
  ],
  devops: [
    {
      id: "1",
      name: "Deployment Failure",
      condition: "deployment_status === 'failed' AND environment === 'production'",
      action: "rollback_deployment AND notify_on_call_engineer",
      priority: "high",
      enabled: true
    }
  ]
};

export const RuleEditor = ({ agentType, onConfigChange }: RuleEditorProps) => {
  const [rules, setRules] = useState<Rule[]>(defaultRules[agentType] || []);

  const addNewRule = () => {
    const newRule: Rule = {
      id: Date.now().toString(),
      name: "New Rule",
      condition: "",
      action: "",
      priority: "medium",
      enabled: true
    };
    setRules([...rules, newRule]);
    onConfigChange();
  };

  const updateRule = (id: string, updates: Partial<Rule>) => {
    setRules(rules.map(rule => rule.id === id ? { ...rule, ...updates } : rule));
    onConfigChange();
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
    onConfigChange();
  };

  const duplicateRule = (rule: Rule) => {
    const newRule: Rule = {
      ...rule,
      id: Date.now().toString(),
      name: `${rule.name} (Copy)`
    };
    setRules([...rules, newRule]);
    onConfigChange();
  };

  const enabledRulesCount = rules.filter(rule => rule.enabled).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Automation Rules</CardTitle>
              <CardDescription>
                Define conditions and actions to automate agent behavior
              </CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                {enabledRulesCount} active rules
              </Badge>
              <Button onClick={addNewRule} size="sm" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Rule</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {rules.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p>No rules configured. Click "Add Rule" to create your first automation rule.</p>
            </div>
          ) : (
            rules.map((rule, index) => (
              <div key={rule.id}>
                <Card className={`border-2 ${rule.enabled ? 'border-green-200 bg-green-50/30' : 'border-slate-200 bg-slate-50/30'}`}>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Input
                            value={rule.name}
                            onChange={(e) => updateRule(rule.id, { name: e.target.value })}
                            className="font-medium text-slate-900 border-0 bg-transparent p-0 text-lg focus-visible:ring-0"
                            placeholder="Rule name"
                          />
                          <Badge 
                            variant="secondary" 
                            className={`
                              ${rule.priority === 'high' ? 'bg-red-100 text-red-700' : ''}
                              ${rule.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : ''}
                              ${rule.priority === 'low' ? 'bg-slate-100 text-slate-700' : ''}
                            `}
                          >
                            {rule.priority} priority
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => duplicateRule(rule)}
                            className="text-slate-500 hover:text-slate-700"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteRule(rule.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={rule.enabled}
                              onChange={(e) => updateRule(rule.id, { enabled: e.target.checked })}
                              className="rounded border-slate-300"
                            />
                            <span className="text-sm text-slate-600">Enabled</span>
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="space-y-2">
                          <Label htmlFor={`condition-${rule.id}`} className="text-sm font-medium text-slate-700">
                            Condition (When)
                          </Label>
                          <Textarea
                            id={`condition-${rule.id}`}
                            value={rule.condition}
                            onChange={(e) => updateRule(rule.id, { condition: e.target.value })}
                            placeholder="e.g., task.priority === 'high' AND task.deadline < 3 days"
                            rows={3}
                            className="text-sm font-mono"
                          />
                        </div>

                        <div className="flex justify-center">
                          <ArrowRight className="w-6 h-6 text-slate-400" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`action-${rule.id}`} className="text-sm font-medium text-slate-700">
                            Action (Then)
                          </Label>
                          <Textarea
                            id={`action-${rule.id}`}
                            value={rule.action}
                            onChange={(e) => updateRule(rule.id, { action: e.target.value })}
                            placeholder="e.g., notify_team AND escalate_to_manager"
                            rows={3}
                            className="text-sm font-mono"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="space-y-1">
                          <Label htmlFor={`priority-${rule.id}`} className="text-sm text-slate-600">Priority</Label>
                          <select
                            id={`priority-${rule.id}`}
                            value={rule.priority}
                            onChange={(e) => updateRule(rule.id, { priority: e.target.value as Rule['priority'] })}
                            className="flex h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {index < rules.length - 1 && <Separator className="my-4" />}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};
