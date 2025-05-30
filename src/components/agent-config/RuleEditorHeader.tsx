
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Sparkles, Download } from "lucide-react";

interface RuleEditorHeaderProps {
  enabledRulesCount: number;
  onAddRule: () => void;
  onOpenTemplates: () => void;
  onOpenImportExport: () => void;
}

export const RuleEditorHeader = ({ 
  enabledRulesCount, 
  onAddRule, 
  onOpenTemplates, 
  onOpenImportExport 
}: RuleEditorHeaderProps) => {
  return (
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
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenTemplates}
            className="flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Templates</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenImportExport}
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Import/Export</span>
          </Button>
          <Button onClick={onAddRule} size="sm" className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Rule</span>
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};
