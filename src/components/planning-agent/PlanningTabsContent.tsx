
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  FileText,
  Layers,
  Brain,
  BarChart3
} from "lucide-react";
import { FeatureBreakdown } from "./FeatureBreakdown";
import { PatternAnalysisDashboard } from "./PatternAnalysisDashboard";
import { WorkflowStateManager } from "@/components/workflow/WorkflowStateManager";
import { mockMessages, mockAgents } from "@/data/mockData";

interface PlanningTabsContentProps {
  onWorkflowAction: (action: string, ...args: any[]) => void;
}

export const ResearchTabContent = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Search className="w-5 h-5" />
        Research Integration
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <Input placeholder="Search for market trends, competitors, best practices..." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-medium mb-2">Market Research</h4>
            <p className="text-sm text-muted-foreground">
              Latest trends in AI development workflows
            </p>
          </Card>
          <Card className="p-4">
            <h4 className="font-medium mb-2">Competitor Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Similar tools and their feature sets
            </p>
          </Card>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const PRDTabContent = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <FileText className="w-5 h-5" />
        PRD Generation
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Technical Spec", "User Stories", "Feature Requirements"].map((template) => (
            <Card key={template} className="p-4 hover:shadow-md cursor-pointer transition-shadow">
              <h4 className="font-medium">{template}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Generate {template.toLowerCase()} document
              </p>
            </Card>
          ))}
        </div>
        <Button>Generate PRD</Button>
      </div>
    </CardContent>
  </Card>
);

export const BreakdownTabContent = () => (
  <div className="relative">
    <FeatureBreakdown />
  </div>
);

export const WorkflowTabContent = ({ onWorkflowAction }: PlanningTabsContentProps) => (
  <WorkflowStateManager 
    onSave={(name) => onWorkflowAction("save", name)}
    onLoad={(state) => onWorkflowAction("load", state)}
    onDelete={(id) => onWorkflowAction("delete", id)}
    onExport={(state) => onWorkflowAction("export", state)}
    onImport={(file) => onWorkflowAction("import", file)}
  />
);

export const AnalysisTabContent = () => (
  <PatternAnalysisDashboard messages={mockMessages} agents={mockAgents} />
);
