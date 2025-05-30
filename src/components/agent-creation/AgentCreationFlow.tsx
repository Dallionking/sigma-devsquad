
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Check, Bot, Settings, Play, TestTube } from "lucide-react";
import { StepIndicator } from "./StepIndicator";
import { AgentType } from "@/types";

interface AgentCreationFlowProps {
  onComplete: (config: any) => void;
  onCancel: () => void;
}

const steps = [
  { id: "role", title: "Role", description: "Select agent role" },
  { id: "specialization", title: "Specialization", description: "Define expertise" },
  { id: "context", title: "Context", description: "Set background knowledge" },
  { id: "capabilities", title: "Capabilities", description: "Configure abilities" },
  { id: "naming", title: "Identity", description: "Name and customize" },
  { id: "review", title: "Review", description: "Review and create" }
];

export const AgentCreationFlow = ({ onComplete, onCancel }: AgentCreationFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState({
    role: null as AgentType | null,
    specialization: "",
    context: "",
    capabilities: {} as Record<string, boolean>,
    name: "",
    icon: "Bot"
  });

  const canProceed = () => {
    const stepId = steps[currentStep].id;
    switch (stepId) {
      case "role": return config.role !== null;
      case "specialization": return config.specialization !== "";
      case "context": return true; // Optional
      case "capabilities": return Object.keys(config.capabilities).length > 0;
      case "naming": return config.name.trim() !== "";
      case "review": return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(config);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStepContent = () => {
    const stepId = steps[currentStep].id;
    
    switch (stepId) {
      case "role":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Select Agent Role</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(["planning", "frontend", "backend", "qa", "documentation", "devops"] as AgentType[]).map((role) => (
                  <Card
                    key={role}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      config.role === role ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setConfig({ ...config, role })}
                  >
                    <CardContent className="p-4 text-center">
                      <Bot className="w-8 h-8 mx-auto mb-2" />
                      <h3 className="font-medium capitalize">{role}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      
      case "specialization":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Define Specialization</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={config.specialization}
                onChange={(e) => setConfig({ ...config, specialization: e.target.value })}
                placeholder="Describe the agent's specific area of expertise..."
                className="w-full h-32 p-3 border rounded-md resize-none"
              />
            </CardContent>
          </Card>
        );
      
      case "context":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Background Knowledge</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={config.context}
                onChange={(e) => setConfig({ ...config, context: e.target.value })}
                placeholder="Provide background context and knowledge base..."
                className="w-full h-32 p-3 border rounded-md resize-none"
              />
            </CardContent>
          </Card>
        );
      
      case "capabilities":
        const capabilities = ["Code Generation", "Testing", "Documentation", "Debugging", "Optimization", "Performance Analysis"];
        return (
          <Card>
            <CardHeader>
              <CardTitle>Select Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {capabilities.map((capability) => (
                  <label key={capability} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.capabilities[capability] || false}
                      onChange={(e) => setConfig({
                        ...config,
                        capabilities: {
                          ...config.capabilities,
                          [capability]: e.target.checked
                        }
                      })}
                      className="rounded"
                    />
                    <span>{capability}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      
      case "naming":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Agent Identity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Agent Name</label>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  placeholder="Enter agent name..."
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Icon</label>
                <select
                  value={config.icon}
                  onChange={(e) => setConfig({ ...config, icon: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Bot">Bot</option>
                  <option value="Settings">Settings</option>
                  <option value="Play">Play</option>
                  <option value="TestTube">Test Tube</option>
                </select>
              </div>
            </CardContent>
          </Card>
        );
      
      case "review":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Review Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Role:</strong> {config.role}</div>
                <div><strong>Name:</strong> {config.name}</div>
                <div><strong>Specialization:</strong> {config.specialization}</div>
                <div><strong>Capabilities:</strong> {Object.keys(config.capabilities).filter(k => config.capabilities[k]).length} enabled</div>
              </div>
              {config.context && (
                <div>
                  <strong>Context:</strong>
                  <p className="text-sm text-muted-foreground mt-1">{config.context}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create New Agent</h2>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
        
        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
        
        <Progress value={progress} className="w-full" />
      </div>

      <div className="min-h-[400px]">
        {renderStepContent()}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {currentStep === steps.length - 1 ? (
          <Button onClick={handleComplete} disabled={!canProceed()}>
            Create Agent
            <Check className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={!canProceed()}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};
