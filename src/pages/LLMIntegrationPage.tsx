
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProvidersTab } from '@/components/llm-integration/ProvidersTab';
import { ModelsTab } from '@/components/llm-integration/ModelsTab';
import { UsageTab } from '@/components/llm-integration/UsageTab';
import { TestingTab } from '@/components/llm-integration/TestingTab';

export const LLMIntegrationPage = () => {
  // State for various LLM integration settings
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([2048]);
  const [showApiKey, setShowApiKey] = useState(false);

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
    },
    {
      name: "Google",
      status: "disconnected", 
      models: ["Gemini Pro", "Gemini Ultra"],
      usage: 0,
      limit: 1000,
      cost: "$0.00"
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">LLM Integration</h1>
      <Tabs defaultValue="providers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
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
        
        <TabsContent value="usage">
          <UsageTab providers={mockProviders} />
        </TabsContent>
        
        <TabsContent value="testing">
          <TestingTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
