
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, Trash2, TestTube, ArrowRight } from "lucide-react";

interface Rule {
  id: string;
  name: string;
  condition: string;
  action: string;
  priority: "low" | "medium" | "high";
  enabled: boolean;
}

interface RuleCardProps {
  rule: Rule;
  onUpdate: (id: string, updates: Partial<Rule>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (rule: Rule) => void;
  onTest: (rule: Rule) => void;
}

export const RuleCard = ({ rule, onUpdate, onDelete, onDuplicate, onTest }: RuleCardProps) => {
  return (
    <Card className={`border-2 ${rule.enabled ? 'border-green-200 bg-green-50/30' : 'border-slate-200 bg-slate-50/30'}`}>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Input
                value={rule.name}
                onChange={(e) => onUpdate(rule.id, { name: e.target.value })}
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
                onClick={() => onTest(rule)}
                className="text-blue-500 hover:text-blue-700"
              >
                <TestTube className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDuplicate(rule)}
                className="text-slate-500 hover:text-slate-700"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(rule.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rule.enabled}
                  onChange={(e) => onUpdate(rule.id, { enabled: e.target.checked })}
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
                onChange={(e) => onUpdate(rule.id, { condition: e.target.value })}
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
                onChange={(e) => onUpdate(rule.id, { action: e.target.value })}
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
                onChange={(e) => onUpdate(rule.id, { priority: e.target.value as Rule['priority'] })}
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
  );
};
