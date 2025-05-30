
import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { ChatInterface } from "@/components/planning-agent/ChatInterface";
import { ContextPanel } from "@/components/planning-agent/ContextPanel";
import { ResearchPanel } from "@/components/planning-agent/ResearchPanel";
import { PRDGenerator } from "@/components/planning-agent/PRDGenerator";
import { FeatureBreakdown } from "@/components/planning-agent/FeatureBreakdown";
import { TaskMasterIntegration } from "@/components/planning-agent/TaskMasterIntegration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, FileText, Search, Layers, CheckSquare } from "lucide-react";
import { Agent } from "@/pages/Index";

export const PlanningAgent = () => {
  const [selectedProject, setSelectedProject] = useState("current-project");
  const [activeTab, setActiveTab] = useState("chat");

  // Mock agents data for header
  const mockAgents: Agent[] = [
    { 
      id: "1", 
      name: "Planning Agent", 
      status: "working" as const,
      type: "planning" as const,
      currentTask: "Analyzing project requirements",
      progress: 85,
      lastActive: new Date().toISOString()
    },
    { 
      id: "2", 
      name: "Research Agent", 
      status: "idle" as const,
      type: "documentation" as const,
      currentTask: "Ready for research tasks",
      progress: 0,
      lastActive: new Date().toISOString()
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        viewMode="workflow" 
        onViewModeChange={() => {}} 
        agents={mockAgents} 
      />
      
      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Chat and Interface Area */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Planning Agent Interface</h1>
                <p className="text-muted-foreground">Collaborate with AI to plan and structure your project</p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex">
            {/* Chat Interface */}
            <div className="flex-1 flex flex-col">
              <ChatInterface />
            </div>

            {/* Tabbed Side Panel */}
            <div className="w-96 border-l border-border bg-card">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-4 rounded-none border-b border-border">
                  <TabsTrigger value="chat" className="flex flex-col items-center space-y-1 p-2">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-xs">Context</span>
                  </TabsTrigger>
                  <TabsTrigger value="research" className="flex flex-col items-center space-y-1 p-2">
                    <Search className="w-4 h-4" />
                    <span className="text-xs">Research</span>
                  </TabsTrigger>
                  <TabsTrigger value="prd" className="flex flex-col items-center space-y-1 p-2">
                    <FileText className="w-4 h-4" />
                    <span className="text-xs">PRD</span>
                  </TabsTrigger>
                  <TabsTrigger value="tasks" className="flex flex-col items-center space-y-1 p-2">
                    <CheckSquare className="w-4 h-4" />
                    <span className="text-xs">Tasks</span>
                  </TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-hidden">
                  <TabsContent value="chat" className="h-full m-0">
                    <ContextPanel selectedProject={selectedProject} />
                  </TabsContent>

                  <TabsContent value="research" className="h-full m-0">
                    <ResearchPanel />
                  </TabsContent>

                  <TabsContent value="prd" className="h-full m-0">
                    <PRDGenerator />
                  </TabsContent>

                  <TabsContent value="tasks" className="h-full m-0">
                    <TaskMasterIntegration />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Breakdown Overlay */}
      <div className="fixed bottom-4 right-4 z-50">
        <FeatureBreakdown />
      </div>
    </div>
  );
};

export default PlanningAgent;
