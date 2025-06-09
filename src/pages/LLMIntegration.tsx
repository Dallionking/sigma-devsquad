
import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Agent } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProvidersTab } from "@/components/llm-integration/ProvidersTab";
import { ModelsTab } from "@/components/llm-integration/ModelsTab";
import { TestingTab } from "@/components/llm-integration/TestingTab";
import { UsageTab } from "@/components/llm-integration/UsageTab";
import { AgentLLMAssignment } from "@/components/llm-integration/AgentLLMAssignment";
import { CostTrackingDashboard } from "@/components/llm-integration/CostTrackingDashboard";
import { GitHubIntegration } from "@/components/llm-integration/GitHubIntegration";

const LLMIntegration = () => {
  // Mock agents data for header and assignment
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
      currentTask: "API Development",
      progress: 60,
      lastActive: "2024-05-30T10:20:00Z",
      capabilities: ["api-development", "database-design"],
      specialization: "Backend Development",
      background: "Expert in server-side development and databases",
      description: "Develops APIs and manages backend infrastructure"
    }
  ];

  // Mock providers data
  const mockProviders = [
    {
      name: "OpenAI",
      status: "connected",
      models: ["GPT-4", "GPT-4 Turbo", "GPT-3.5"],
      usage: 75,
      limit: 1000,
      cost: "$45.60"
    },
    {
      name: "Anthropic",
      status: "connected",
      models: ["Claude 3 Opus", "Claude 3 Sonnet"],
      usage: 30,
      limit: 500,
      cost: "$12.05"
    }
  ];

  // State for model configuration
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([2048]);
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        viewMode="workflow" 
        onViewModeChange={() => {}}
        agents={mockAgents}
      />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">LLM Integration</h1>
            <p className="text-muted-foreground mt-2">Configure language model providers, assignments, and analytics</p>
          </div>

          <Tabs defaultValue="providers" className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="providers">Providers</TabsTrigger>
              <TabsTrigger value="models">Models</TabsTrigger>
              <TabsTrigger value="agents">Agent Assignment</TabsTrigger>
              <TabsTrigger value="testing">Testing</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="github">GitHub</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
            </TabsList>

            <TabsContent value="providers">
              <ProvidersTab 
                providers={mockProviders}
                showApiKey={showApiKey}
                setShowApiKey={setShowApiKey}
              />
            </TabsContent>

            <TabsContent value="models">
              <ModelsTab 
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                temperature={temperature}
                setTemperature={setTemperature}
                maxTokens={maxTokens}
                setMaxTokens={setMaxTokens}
              />
            </TabsContent>

            <TabsContent value="agents">
              <AgentLLMAssignment agents={mockAgents} />
            </TabsContent>

            <TabsContent value="testing">
              <TestingTab />
            </TabsContent>

            <TabsContent value="analytics">
              <CostTrackingDashboard />
            </TabsContent>

            <TabsContent value="github">
              <GitHubIntegration />
            </TabsContent>

            <TabsContent value="usage">
              <UsageTab providers={mockProviders} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LLMIntegration;
