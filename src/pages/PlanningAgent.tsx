
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Search, 
  Brain, 
  FileText, 
  Layers, 
  BarChart3,
  Plus,
  Target,
  Activity
} from "lucide-react";
import { ContextPanel } from "@/components/planning-agent/ContextPanel";
import { TaskMasterIntegration } from "@/components/planning-agent/TaskMasterIntegration";
import { ResearchPanel } from "@/components/planning-agent/ResearchPanel";
import { ChatInterface } from "@/components/planning-agent/ChatInterface";
import { 
  ResearchTabContent,
  PRDTabContent,
  BreakdownTabContent,
  WorkflowTabContent,
  AnalysisTabContent
} from "@/components/planning-agent/PlanningTabsContent";
import { PlanningDialogManager } from "@/components/planning-agent/PlanningDialogManager";
import { Header } from "@/components/dashboard/Header";
import { ViewMode, Agent } from "@/types";

const PlanningAgent = () => {
  const [selectedProject, setSelectedProject] = useState("ai-workforce");
  const [showTaskAssignment, setShowTaskAssignment] = useState(false);
  const [showWorkflowTracker, setShowWorkflowTracker] = useState(false);

  // Mock agents data for header
  const mockAgents: Agent[] = [
    { 
      id: "1", 
      type: "planning", 
      name: "Planning Agent", 
      status: "working", 
      currentTask: "Active", 
      progress: 75, 
      lastActive: "2024-05-30T10:30:00Z",
      capabilities: ["requirement-analysis", "project-planning"],
      specialization: "Project Planning",
      background: "Expert in project planning and requirements analysis",
      description: "Analyzes requirements and creates project roadmaps"
    },
    { 
      id: "2", 
      type: "frontend", 
      name: "Frontend Agent", 
      status: "idle", 
      currentTask: "Idle", 
      progress: 0, 
      lastActive: "2024-05-30T10:25:00Z",
      capabilities: ["react-development", "ui-design"],
      specialization: "Frontend Development",
      background: "Expert in React and modern frontend technologies",
      description: "Builds user interfaces and client-side functionality"
    },
    { 
      id: "3", 
      type: "backend", 
      name: "Backend Agent", 
      status: "working", 
      currentTask: "Active", 
      progress: 45, 
      lastActive: "2024-05-30T10:32:00Z",
      capabilities: ["api-development", "database-design"],
      specialization: "Backend Development",
      background: "Expert in server-side development and APIs",
      description: "Develops server-side logic and API endpoints"
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only-focusable"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <Header 
        viewMode="workflow" 
        onViewModeChange={() => {}}
        agents={mockAgents}
      />

      <main id="main-content" className="container-responsive py-responsive fade-in">
        {/* Enhanced header section with better typography and spacing */}
        <header className="mb-responsive">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="heading-primary mb-4">
                Planning Agent
              </h1>
              <p className="text-muted-enhanced max-w-3xl">
                Intelligent project planning and requirement analysis
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Badge variant="secondary" className="status-success flex items-center gap-2 self-start sm:self-center">
                <Activity className="w-3 h-3" />
                Agent Active
              </Badge>
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={() => setShowTaskAssignment(true)}
                  className="btn-primary-enhanced gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Task</span>
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowWorkflowTracker(true)}
                  className="btn-secondary-enhanced gap-2"
                >
                  <Target className="w-4 h-4" />
                  <span className="hidden sm:inline">Track Workflow</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced grid layout with better responsive design */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-responsive">
          {/* Enhanced Context Panel */}
          <div className="lg:col-span-1 order-2 lg:order-2 space-y-responsive">
            <div className="card-enhanced">
              <ContextPanel selectedProject={selectedProject} />
            </div>
            <div className="card-enhanced">
              <TaskMasterIntegration />
            </div>
            <div className="card-enhanced">
              <ResearchPanel />
            </div>
          </div>

          {/* Enhanced Main Content Area */}
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
                    <WorkflowTabContent onWorkflowAction={handleWorkflowAction} />
                  </TabsContent>

                  <TabsContent value="analysis" className="space-y-responsive fade-in">
                    <AnalysisTabContent />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Enhanced Dialog Manager */}
        <PlanningDialogManager
          showTaskAssignment={showTaskAssignment}
          showWorkflowTracker={showWorkflowTracker}
          onTaskAssignmentChange={setShowTaskAssignment}
          onWorkflowTrackerChange={setShowWorkflowTracker}
          onTaskCreate={handleTaskCreate}
          onWorkflowAction={handleWorkflowAction}
        />
      </main>
    </div>
  );
};

export default PlanningAgent;
