
import { Header } from "@/components/dashboard/Header";
import { Agent } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProvidersTab } from "@/components/llm-integration/ProvidersTab";
import { ModelsTab } from "@/components/llm-integration/ModelsTab";
import { TestingTab } from "@/components/llm-integration/TestingTab";
import { UsageTab } from "@/components/llm-integration/UsageTab";

const LLMIntegration = () => {
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
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        viewMode="workflow" 
        onViewModeChange={() => {}}
        agents={mockAgents}
      />
      
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">LLM Integration</h1>
            <p className="text-muted-foreground mt-2">Configure language model providers and settings</p>
          </div>

          <Tabs defaultValue="providers" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="providers">Providers</TabsTrigger>
              <TabsTrigger value="models">Models</TabsTrigger>
              <TabsTrigger value="testing">Testing</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
            </TabsList>

            <TabsContent value="providers">
              <ProvidersTab />
            </TabsContent>

            <TabsContent value="models">
              <ModelsTab />
            </TabsContent>

            <TabsContent value="testing">
              <TestingTab />
            </TabsContent>

            <TabsContent value="usage">
              <UsageTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LLMIntegration;
