
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bot, Settings, TestTube, Save, RotateCcw, CheckCircle } from "lucide-react";
import { Agent, AgentType } from "@/types";
import { RuleEditor } from "./RuleEditor";

interface AgentConfigurationFlowProps {
  agent: Agent;
  onSave: (config: any) => void;
  onCancel: () => void;
}

export const AgentConfigurationFlow = ({ agent, onSave, onCancel }: AgentConfigurationFlowProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [config, setConfig] = useState({
    role: agent.type,
    capabilities: {} as Record<string, boolean>,
    context: "",
    rules: [] as any[]
  });

  const handleConfigChange = () => {
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    onSave(config);
    setHasUnsavedChanges(false);
  };

  const handleReset = () => {
    setConfig({
      role: agent.type,
      capabilities: {},
      context: "",
      rules: []
    });
    setHasUnsavedChanges(false);
  };

  const handleTest = () => {
    console.log("Testing agent configuration...");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bot className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Configure {agent.name}</h2>
            <p className="text-sm text-muted-foreground capitalize">{agent.type} Agent</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {hasUnsavedChanges && (
            <Badge variant="secondary" className="bg-orange-50 text-orange-700">
              Unsaved Changes
            </Badge>
          )}
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline" onClick={handleTest}>
            <TestTube className="w-4 h-4 mr-2" />
            Test
          </Button>
          <Button onClick={handleSave} disabled={!hasUnsavedChanges}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
          <TabsTrigger value="rules">Automation Rules</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Agent Type</label>
                  <select
                    value={config.role}
                    onChange={(e) => {
                      setConfig({ ...config, role: e.target.value as AgentType });
                      handleConfigChange();
                    }}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="planning">Planning</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="qa">QA</option>
                    <option value="documentation">Documentation</option>
                    <option value="devops">DevOps</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {agent.status}
                  </Badge>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Background Context</label>
                <textarea
                  value={config.context}
                  onChange={(e) => {
                    setConfig({ ...config, context: e.target.value });
                    handleConfigChange();
                  }}
                  placeholder="Define the agent's background knowledge and context..."
                  className="w-full h-24 p-3 border rounded-md resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capabilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Code Generation", "Testing", "Documentation", 
                  "Debugging", "Optimization", "Performance Analysis",
                  "Security Scanning", "Deployment", "Monitoring"
                ].map((capability) => (
                  <label key={capability} className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-muted/50">
                    <input
                      type="checkbox"
                      checked={config.capabilities[capability] || false}
                      onChange={(e) => {
                        setConfig({
                          ...config,
                          capabilities: {
                            ...config.capabilities,
                            [capability]: e.target.checked
                          }
                        });
                        handleConfigChange();
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{capability}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <RuleEditor
            agentType={agent.type}
            onConfigChange={handleConfigChange}
          />
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Testing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <CheckCircle className="w-4 h-4" />
                <AlertDescription>
                  Test your agent configuration to ensure it works as expected before saving.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-24 flex flex-col items-center space-y-2">
                  <TestTube className="w-6 h-6" />
                  <span>Test Capabilities</span>
                  <span className="text-xs text-muted-foreground">Validate selected capabilities</span>
                </Button>
                
                <Button variant="outline" className="h-24 flex flex-col items-center space-y-2">
                  <Settings className="w-6 h-6" />
                  <span>Test Rules</span>
                  <span className="text-xs text-muted-foreground">Run automation rules</span>
                </Button>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Test Results</h4>
                <p className="text-sm text-muted-foreground">
                  Run tests to see results here. This will validate your configuration before deployment.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
