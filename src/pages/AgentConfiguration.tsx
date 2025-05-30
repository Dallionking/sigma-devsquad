
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Layers, Code, Server, TestTube, FileText, Settings as SettingsIcon, Save, RotateCcw } from "lucide-react";
import { AgentConfigCard } from "@/components/agent-config/AgentConfigCard";

export type AgentType = "planning" | "frontend" | "backend" | "qa" | "documentation" | "devops";

const agentTypes: { type: AgentType; name: string; icon: any; description: string }[] = [
  {
    type: "planning",
    name: "Planning Agent",
    icon: Layers,
    description: "Analyzes requirements and creates project roadmaps"
  },
  {
    type: "frontend",
    name: "Frontend Agent",
    icon: Code,
    description: "Builds user interfaces and client-side functionality"
  },
  {
    type: "backend",
    name: "Backend Agent",
    icon: Server,
    description: "Develops server-side logic and API endpoints"
  },
  {
    type: "qa",
    name: "QA Agent",
    icon: TestTube,
    description: "Tests functionality and ensures quality standards"
  },
  {
    type: "documentation",
    name: "Documentation Agent",
    icon: FileText,
    description: "Creates and maintains project documentation"
  },
  {
    type: "devops",
    name: "DevOps Agent",
    icon: SettingsIcon,
    description: "Manages deployment and infrastructure automation"
  }
];

export const AgentConfiguration = () => {
  const [activeAgent, setActiveAgent] = useState<AgentType>("planning");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSaveAll = () => {
    // Save all configurations
    setHasUnsavedChanges(false);
    console.log("Saving all agent configurations...");
  };

  const handleResetAgent = () => {
    // Reset current agent to defaults
    console.log(`Resetting ${activeAgent} agent configuration...`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Agent Configuration</h1>
            <p className="text-slate-600 mt-2">Configure roles, rules, and performance settings for each agent type</p>
          </div>
          <div className="flex items-center space-x-3">
            {hasUnsavedChanges && (
              <Badge variant="secondary" className="bg-orange-50 text-orange-700">
                Unsaved Changes
              </Badge>
            )}
            <Button variant="outline" onClick={handleResetAgent} className="flex items-center space-x-2">
              <RotateCcw className="w-4 h-4" />
              <span>Reset Agent</span>
            </Button>
            <Button onClick={handleSaveAll} className="flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save All</span>
            </Button>
          </div>
        </div>

        <Tabs value={activeAgent} onValueChange={(value) => setActiveAgent(value as AgentType)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            {agentTypes.map((agent) => {
              const Icon = agent.icon;
              return (
                <TabsTrigger key={agent.type} value={agent.type} className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{agent.name.split(' ')[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {agentTypes.map((agent) => (
            <TabsContent key={agent.type} value={agent.type} className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <agent.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{agent.name}</h2>
                  <p className="text-slate-600">{agent.description}</p>
                </div>
              </div>

              <AgentConfigCard 
                agentType={agent.type}
                onConfigChange={() => setHasUnsavedChanges(true)}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default AgentConfiguration;
