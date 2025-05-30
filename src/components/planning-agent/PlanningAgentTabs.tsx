
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  Search, 
  Brain, 
  FileText, 
  Layers, 
  BarChart3
} from "lucide-react";
import { ChatInterface } from "@/components/planning-agent/ChatInterface";
import { 
  ResearchTabContent,
  PRDTabContent,
  BreakdownTabContent,
  WorkflowTabContent,
  AnalysisTabContent
} from "@/components/planning-agent/PlanningTabsContent";

interface PlanningAgentTabsProps {
  onWorkflowAction: (action: string, ...args: any[]) => void;
}

export const PlanningAgentTabs = ({ onWorkflowAction }: PlanningAgentTabsProps) => {
  return (
    <div className="lg:col-span-3 order-1 lg:order-1">
      <div className="card-enhanced">
        <Tabs defaultValue="chat" className="space-y-responsive">
          {/* Enhanced tab navigation with better mobile support */}
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 gap-1 bg-muted/50 p-1 rounded-xl h-auto">
            <TabsTrigger 
              value="chat" 
              className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Chat</span>
            </TabsTrigger>
            <TabsTrigger 
              value="research" 
              className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Research</span>
            </TabsTrigger>
            <TabsTrigger 
              value="prd" 
              className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">PRD</span>
            </TabsTrigger>
            <TabsTrigger 
              value="breakdown" 
              className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Breakdown</span>
            </TabsTrigger>
            <TabsTrigger 
              value="workflow" 
              className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Workflow</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analysis" 
              className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analysis</span>
            </TabsTrigger>
          </TabsList>

          {/* Enhanced tab content with consistent spacing and animations */}
          <div className="mt-responsive">
            <TabsContent value="chat" className="space-y-responsive fade-in">
              <div className="h-[600px]">
                <ChatInterface />
              </div>
            </TabsContent>

            <TabsContent value="research" className="space-y-responsive fade-in">
              <ResearchTabContent />
            </TabsContent>

            <TabsContent value="prd" className="space-y-responsive fade-in">
              <PRDTabContent />
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-responsive fade-in">
              <BreakdownTabContent />
            </TabsContent>

            <TabsContent value="workflow" className="space-y-responsive fade-in">
              <WorkflowTabContent onWorkflowAction={onWorkflowAction} />
            </TabsContent>

            <TabsContent value="analysis" className="space-y-responsive fade-in">
              <AnalysisTabContent />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
