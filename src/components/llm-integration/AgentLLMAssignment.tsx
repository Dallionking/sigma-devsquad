
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AgentType } from "@/types";
import { Bot, Settings, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AgentLLMConfig {
  agentType: AgentType;
  primaryModel: string;
  fallbackModel: string;
  temperature: number;
  maxTokens: number;
  useCustomPrompt: boolean;
  customPrompt?: string;
}

interface AgentLLMAssignmentProps {
  agents: { id: string; type: AgentType; name: string; status: string }[];
}

const DEFAULT_MODELS = [
  { value: "gpt-4o", label: "GPT-4o", provider: "OpenAI", cost: "High" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini", provider: "OpenAI", cost: "Low" },
  { value: "claude-3-opus", label: "Claude 3 Opus", provider: "Anthropic", cost: "High" },
  { value: "claude-3-sonnet", label: "Claude 3 Sonnet", provider: "Anthropic", cost: "Medium" },
  { value: "gemini-pro", label: "Gemini Pro", provider: "Google", cost: "Medium" }
];

const ROLE_BASED_DEFAULTS: Record<AgentType, Partial<AgentLLMConfig>> = {
  planning: { primaryModel: "gpt-4o", fallbackModel: "claude-3-sonnet", temperature: 0.3, maxTokens: 4000 },
  frontend: { primaryModel: "claude-3-sonnet", fallbackModel: "gpt-4o-mini", temperature: 0.2, maxTokens: 3000 },
  backend: { primaryModel: "gpt-4o", fallbackModel: "claude-3-sonnet", temperature: 0.1, maxTokens: 3000 },
  devops: { primaryModel: "claude-3-opus", fallbackModel: "gpt-4o", temperature: 0.1, maxTokens: 2000 },
  qa: { primaryModel: "gpt-4o-mini", fallbackModel: "claude-3-sonnet", temperature: 0.2, maxTokens: 2000 },
  data: { primaryModel: "gpt-4o", fallbackModel: "claude-3-opus", temperature: 0.1, maxTokens: 4000 },
  design: { primaryModel: "claude-3-sonnet", fallbackModel: "gpt-4o-mini", temperature: 0.4, maxTokens: 2000 },
  documentation: { primaryModel: "gpt-4o-mini", fallbackModel: "claude-3-sonnet", temperature: 0.3, maxTokens: 3000 }
};

export const AgentLLMAssignment = ({ agents }: AgentLLMAssignmentProps) => {
  const [configs, setConfigs] = useState<Record<string, AgentLLMConfig>>({});
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const { toast } = useToast();

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgent(agentId);
    const agent = agents.find(a => a.id === agentId);
    if (agent && !configs[agentId]) {
      const defaults = ROLE_BASED_DEFAULTS[agent.type] || {};
      setConfigs(prev => ({
        ...prev,
        [agentId]: {
          agentType: agent.type,
          primaryModel: "gpt-4o-mini",
          fallbackModel: "claude-3-sonnet",
          temperature: 0.3,
          maxTokens: 2000,
          useCustomPrompt: false,
          ...defaults
        }
      }));
    }
  };

  const updateConfig = (agentId: string, updates: Partial<AgentLLMConfig>) => {
    setConfigs(prev => ({
      ...prev,
      [agentId]: { ...prev[agentId], ...updates }
    }));
  };

  const saveConfiguration = () => {
    console.log("Saving LLM configurations:", configs);
    toast({
      title: "Configuration Saved",
      description: "Agent LLM assignments have been updated successfully.",
    });
  };

  const applyRoleDefaults = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      const defaults = ROLE_BASED_DEFAULTS[agent.type];
      updateConfig(agentId, defaults);
      toast({
        title: "Defaults Applied",
        description: `Role-based defaults applied for ${agent.type} agent.`,
      });
    }
  };

  const selectedAgentData = agents.find(a => a.id === selectedAgent);
  const currentConfig = configs[selectedAgent];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="w-5 h-5" />
          <span>Agent-Specific LLM Assignment</span>
        </CardTitle>
        <CardDescription>
          Configure LLM models and parameters for each agent based on their role and requirements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Select Agent</Label>
          <Select value={selectedAgent} onValueChange={handleAgentSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Choose an agent to configure" />
            </SelectTrigger>
            <SelectContent>
              {agents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  <div className="flex items-center space-x-2">
                    <span>{agent.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {agent.type}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedAgentData && currentConfig && (
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Configuration for {selectedAgentData.name}</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => applyRoleDefaults(selectedAgent)}
                className="flex items-center space-x-1"
              >
                <Settings className="w-4 h-4" />
                <span>Apply Role Defaults</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Primary Model</Label>
                <Select
                  value={currentConfig.primaryModel}
                  onValueChange={(value) => updateConfig(selectedAgent, { primaryModel: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEFAULT_MODELS.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{model.label}</span>
                          <div className="flex items-center space-x-2 ml-2">
                            <Badge variant="secondary" className="text-xs">
                              {model.provider}
                            </Badge>
                            <Badge 
                              variant={model.cost === "High" ? "destructive" : model.cost === "Medium" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {model.cost}
                            </Badge>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fallback Model</Label>
                <Select
                  value={currentConfig.fallbackModel}
                  onValueChange={(value) => updateConfig(selectedAgent, { fallbackModel: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEFAULT_MODELS.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{model.label}</span>
                          <Badge variant="secondary" className="text-xs">
                            {model.provider}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Use Custom System Prompt</Label>
                <p className="text-sm text-muted-foreground">Override default role-based prompts</p>
              </div>
              <Switch
                checked={currentConfig.useCustomPrompt}
                onCheckedChange={(checked) => updateConfig(selectedAgent, { useCustomPrompt: checked })}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={saveConfiguration} className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
