
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AgentType } from "@/pages/AgentConfiguration";
import { RuleTemplateSelector } from "./RuleTemplateSelector";
import { RuleTester } from "./RuleTester";
import { RuleImportExport } from "./RuleImportExport";
import { RuleEditorHeader } from "./RuleEditorHeader";
import { RuleList } from "./RuleList";

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
  const [activeDialog, setActiveDialog] = useState<"template" | "test" | "import-export" | null>(null);
  const [testingRule, setTestingRule] = useState<Rule | null>(null);

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

  const handleTemplateSelect = (template: any) => {
    // In a real implementation, you would fetch the template rules
    const templateRules: Rule[] = [
      {
        id: Date.now().toString(),
        name: `${template.name} - Example Rule`,
        condition: "template.condition === 'example'",
        action: "execute_template_action",
        priority: "medium",
        enabled: true
      }
    ];
    setRules([...rules, ...templateRules]);
    setActiveDialog(null);
    onConfigChange();
  };

  const handleRuleImport = (importedRules: Rule[]) => {
    setRules([...rules, ...importedRules]);
    onConfigChange();
  };

  const handleTestRule = (rule: Rule) => {
    setTestingRule(rule);
    setActiveDialog("test");
  };

  const enabledRulesCount = rules.filter(rule => rule.enabled).length;

  return (
    <div className="space-y-6">
      <Card>
        <RuleEditorHeader
          enabledRulesCount={enabledRulesCount}
          onAddRule={addNewRule}
          onOpenTemplates={() => setActiveDialog("template")}
          onOpenImportExport={() => setActiveDialog("import-export")}
        />
        <RuleList
          rules={rules}
          onUpdateRule={updateRule}
          onDeleteRule={deleteRule}
          onDuplicateRule={duplicateRule}
          onTestRule={handleTestRule}
        />
      </Card>

      {/* Dialogs */}
      <Dialog open={activeDialog === "template"} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Rule Templates</DialogTitle>
          </DialogHeader>
          <RuleTemplateSelector
            onTemplateSelect={handleTemplateSelect}
            onClose={() => setActiveDialog(null)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "test"} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Test Rule</DialogTitle>
          </DialogHeader>
          {testingRule && (
            <RuleTester
              ruleName={testingRule.name}
              condition={testingRule.condition}
              action={testingRule.action}
              onClose={() => setActiveDialog(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "import-export"} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Import/Export Rules</DialogTitle>
          </DialogHeader>
          <RuleImportExport
            rules={rules}
            onImport={handleRuleImport}
            onClose={() => setActiveDialog(null)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
