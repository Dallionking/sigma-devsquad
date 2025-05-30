import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Key, TestTube, BarChart3 } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { ProvidersTab } from "@/components/llm-integration/ProvidersTab";
import { ModelsTab } from "@/components/llm-integration/ModelsTab";
import { UsageTab } from "@/components/llm-integration/UsageTab";
import { TestingTab } from "@/components/llm-integration/TestingTab";
import { LLMActions } from "@/components/llm-integration/LLMActions";

export const LLMIntegration = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([2048]);
  const [selectedModel, setSelectedModel] = useState("gpt-4");

  // Mock data for header - in a real app this would come from props or context
  const mockAgents = [
    { 
      id: "1", 
      name: "Agent 1", 
      status: "working" as const,
      type: "frontend" as const,
      currentTask: "Developing new features",
      progress: 75,
      lastActive: new Date().toISOString(),
      capabilities: ["react-development", "ui-design"],
      specialization: "Frontend Development",
      background: "Expert in React and modern frontend technologies",
      description: "Builds user interfaces and client-side functionality"
    },
    { 
      id: "2", 
      name: "Agent 2", 
      status: "idle" as const,
      type: "qa" as const,
      currentTask: "Waiting for tasks",
      progress: 0,
      lastActive: new Date().toISOString(),
      capabilities: ["automated-testing", "manual-testing"],
      specialization: "Quality Assurance",
      background: "Expert in testing and quality assurance",
      description: "Tests functionality and ensures quality standards"
    },
    { 
      id: "3", 
      name: "Agent 3", 
      status: "working" as const,
      type: "backend" as const,
      currentTask: "Code review",
      progress: 50,
      lastActive: new Date().toISOString(),
      capabilities: ["api-development", "database-design"],
      specialization: "Backend Development",
      background: "Expert in server-side development and APIs",
      description: "Develops server-side logic and API endpoints"
    }
  ];

  const providers = [
    {
      name: "OpenAI",
      status: "connected",
      models: ["gpt-4", "gpt-4-turbo", "gpt-3.5-turbo"],
      usage: 75,
      limit: 100000,
      cost: "$45.20"
    },
    {
      name: "Anthropic",
      status: "disconnected",
      models: ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku"],
      usage: 0,
      limit: 50000,
      cost: "$0.00"
    },
    {
      name: "Google",
      status: "connected",
      models: ["gemini-pro", "gemini-pro-vision"],
      usage: 30,
      limit: 75000,
      cost: "$12.45"
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">LLM API Integration</h1>
              <p className="text-muted-foreground mt-2">Manage connections to AI language model providers</p>
            </div>
            <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
              <Brain className="w-3 h-3 mr-1" />
              3 Providers Connected
            </Badge>
          </div>

          <Tabs defaultValue="providers" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="providers" className="flex items-center space-x-2">
                <Key className="w-4 h-4" />
                <span>Providers</span>
              </TabsTrigger>
              <TabsTrigger value="models" className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>Models</span>
              </TabsTrigger>
              <TabsTrigger value="usage" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Usage</span>
              </TabsTrigger>
              <TabsTrigger value="testing" className="flex items-center space-x-2">
                <TestTube className="w-4 h-4" />
                <span>Testing</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="providers">
              <ProvidersTab 
                providers={providers} 
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

            <TabsContent value="usage">
              <UsageTab providers={providers} />
            </TabsContent>

            <TabsContent value="testing">
              <TestingTab />
            </TabsContent>
          </Tabs>

          <LLMActions />
        </div>
      </div>
    </div>
  );
};

export default LLMIntegration;
