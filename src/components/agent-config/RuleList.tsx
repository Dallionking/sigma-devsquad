
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RuleCard } from "./RuleCard";

interface Rule {
  id: string;
  name: string;
  condition: string;
  action: string;
  priority: "low" | "medium" | "high";
  enabled: boolean;
}

interface RuleListProps {
  rules: Rule[];
  onUpdateRule: (id: string, updates: Partial<Rule>) => void;
  onDeleteRule: (id: string) => void;
  onDuplicateRule: (rule: Rule) => void;
  onTestRule: (rule: Rule) => void;
}

export const RuleList = ({ 
  rules, 
  onUpdateRule, 
  onDeleteRule, 
  onDuplicateRule, 
  onTestRule 
}: RuleListProps) => {
  return (
    <CardContent className="space-y-6">
      {rules.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          <p>No rules configured. Click "Add Rule" to create your first automation rule.</p>
        </div>
      ) : (
        rules.map((rule, index) => (
          <div key={rule.id}>
            <RuleCard
              rule={rule}
              onUpdate={onUpdateRule}
              onDelete={onDeleteRule}
              onDuplicate={onDuplicateRule}
              onTest={onTestRule}
            />
            {index < rules.length - 1 && <Separator className="my-4" />}
          </div>
        ))
      )}
    </CardContent>
  );
};
