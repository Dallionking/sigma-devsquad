
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Search, 
  Brain, 
  FileText, 
  Layers, 
  BarChart3,
  Plus,
  Target
} from "lucide-react";
import { ContextPanel } from "@/components/planning-agent/ContextPanel";
import { TaskMasterIntegration } from "@/components/planning-agent/TaskMasterIntegration";
import { ResearchPanel } from "@/components/planning-agent/ResearchPanel";
import { PlanningChatInterface } from "@/components/planning-agent/PlanningChatInterface";
import { 
  ResearchTabContent,
  PRDTabContent,
  BreakdownTabContent,
  WorkflowTabContent,
  AnalysisTabContent
} from "@/components/planning-agent/PlanningTabsContent";
import { PlanningDialogManager } from "@/components/planning-agent/PlanningDialogManager";

const PlanningAgent = () => {
  const [selectedProject, setSelectedProject] = useState("ai-workforce");
  const [showTaskAssignment, setShowTaskAssignment] = useState(false);
  const [showWorkflowTracker, setShowWorkflowTracker] = useState(false);

  const handleTaskCreate = (taskData: any) => {
    console.log("Creating task:", taskData);
    setShowTaskAssignment(false);
    // Here you would typically send the task data to your backend
  };

  const handleWorkflowAction = (action: string, ...args: any[]) => {
    console.log("Workflow action:", action, args);
    // Handle workflow state changes
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Planning Agent</h1>
              <p className="text-muted-foreground">
                Intelligent project planning and requirement analysis
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                onClick={() => setShowTaskAssignment(true)}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Task</span>
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowWorkflowTracker(true)}
                className="flex items-center space-x-2"
              >
                <Target className="w-4 h-4" />
                <span>Track Workflow</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Context Panel */}
          <div className="lg:col-span-1 order-2 lg:order-2 space-y-4">
            <ContextPanel selectedProject={selectedProject} />
            <TaskMasterIntegration />
            <ResearchPanel />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 order-1 lg:order-1">
            <Tabs defaultValue="chat" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="chat" className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat</span>
                </TabsTrigger>
                <TabsTrigger value="research" className="flex items-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Research</span>
                </TabsTrigger>
                <TabsTrigger value="prd" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>PRD</span>
                </TabsTrigger>
                <TabsTrigger value="breakdown" className="flex items-center space-x-2">
                  <Layers className="w-4 h-4" />
                  <span>Breakdown</span>
                </TabsTrigger>
                <TabsTrigger value="workflow" className="flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>Workflow</span>
                </TabsTrigger>
                <TabsTrigger value="analysis" className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Analysis</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="space-y-6">
                <PlanningChatInterface />
              </TabsContent>

              <TabsContent value="research" className="space-y-6">
                <ResearchTabContent />
              </TabsContent>

              <TabsContent value="prd" className="space-y-6">
                <PRDTabContent />
              </TabsContent>

              <TabsContent value="breakdown" className="space-y-6">
                <BreakdownTabContent />
              </TabsContent>

              <TabsContent value="workflow" className="space-y-6">
                <WorkflowTabContent onWorkflowAction={handleWorkflowAction} />
              </TabsContent>

              <TabsContent value="analysis" className="space-y-6">
                <AnalysisTabContent />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Dialog Manager */}
        <PlanningDialogManager
          showTaskAssignment={showTaskAssignment}
          showWorkflowTracker={showWorkflowTracker}
          onTaskAssignmentChange={setShowTaskAssignment}
          onWorkflowTrackerChange={setShowWorkflowTracker}
          onTaskCreate={handleTaskCreate}
          onWorkflowAction={handleWorkflowAction}
        />
      </div>
    </div>
  );
};

export default PlanningAgent;
