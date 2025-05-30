
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Check, Save, Eye } from "lucide-react";
import { StepIndicator } from "./StepIndicator";
import { RoleSelectionStep } from "./RoleSelectionStep";
import { SpecializationStep } from "./SpecializationStep";
import { BackgroundConfigStep } from "./BackgroundConfigStep";
import { CapabilitySelectionStep } from "./CapabilitySelectionStep";
import { AgentNamingStep } from "./AgentNamingStep";
import { TemplateLibraryStep } from "./TemplateLibraryStep";
import { AgentPreviewStep } from "./AgentPreviewStep";
import { AgentType } from "@/types";

interface EnhancedAgentCreationFlowProps {
  onComplete: (config: any) => void;
  onCancel: () => void;
}

const steps = [
  { id: "template", title: "Template", description: "Choose from templates or start fresh" },
  { id: "role", title: "Role", description: "Select or define agent role" },
  { id: "specialization", title: "Specialization", description: "Define expertise area" },
  { id: "background", title: "Background", description: "Set context and knowledge" },
  { id: "capabilities", title: "Capabilities", description: "Configure abilities" },
  { id: "naming", title: "Identity", description: "Name and customize" },
  { id: "preview", title: "Preview", description: "Review configuration" }
];

export const EnhancedAgentCreationFlow = ({ onComplete, onCancel }: EnhancedAgentCreationFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState({
    templateId: null as string | null,
    role: null as AgentType | null,
    customRole: "",
    specialization: "",
    background: "",
    capabilities: {} as Record<string, boolean>,
    name: "",
    icon: "Bot",
    description: ""
  });

  const [savedTemplates, setSavedTemplates] = useState<any[]>([]);

  const canProceed = () => {
    const stepId = steps[currentStep].id;
    
    switch (stepId) {
      case "template": return true; // Optional step
      case "role": return config.role !== null || config.customRole !== "";
      case "specialization": return config.specialization !== "";
      case "background": return true; // Optional
      case "capabilities": return Object.keys(config.capabilities).length > 0;
      case "naming": return config.name.trim() !== "";
      case "preview": return true;
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

  const handleSaveAsTemplate = () => {
    const template = {
      id: Date.now().toString(),
      name: `${config.name} Template`,
      description: config.description || "Custom agent template",
      config: { ...config },
      createdAt: new Date()
    };
    setSavedTemplates(prev => [...prev, template]);
    console.log("Template saved:", template);
  };

  const handleStepClick = (stepIndex: number) => {
    // Allow jumping to previous steps only
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStepContent = () => {
    const stepId = steps[currentStep].id;
    
    switch (stepId) {
      case "template":
        return (
          <TemplateLibraryStep
            onTemplateSelect={(template) => {
              if (template) {
                setConfig(prev => ({ ...prev, ...template.config }));
              }
            }}
            savedTemplates={savedTemplates}
          />
        );
      
      case "role":
        return (
          <RoleSelectionStep
            selectedRole={config.role}
            onRoleSelect={(role) => setConfig(prev => ({ ...prev, role }))}
            customRole={config.customRole}
            onCustomRoleChange={(customRole) => setConfig(prev => ({ ...prev, customRole }))}
          />
        );
      
      case "specialization":
        return (
          <SpecializationStep
            selectedRole={config.role}
            specialization={config.specialization}
            onSpecializationChange={(specialization) => setConfig(prev => ({ ...prev, specialization }))}
          />
        );
      
      case "background":
        return (
          <BackgroundConfigStep
            background={config.background}
            onBackgroundChange={(background) => setConfig(prev => ({ ...prev, background }))}
          />
        );
      
      case "capabilities":
        return (
          <CapabilitySelectionStep
            selectedRole={config.role}
            capabilities={config.capabilities}
            onCapabilitiesChange={(capabilities) => setConfig(prev => ({ ...prev, capabilities }))}
          />
        );
      
      case "naming":
        return (
          <AgentNamingStep
            name={config.name}
            icon={config.icon}
            onNameChange={(name) => setConfig(prev => ({ ...prev, name }))}
            onIconChange={(icon) => setConfig(prev => ({ ...prev, icon }))}
            description={config.description}
            onDescriptionChange={(description) => setConfig(prev => ({ ...prev, description }))}
          />
        );
      
      case "preview":
        return (
          <AgentPreviewStep
            config={config}
            onConfigChange={setConfig}
          />
        );
      
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create Enhanced Agent</h2>
          <div className="flex items-center gap-2">
            {currentStep === steps.length - 1 && (
              <Button variant="outline" onClick={handleSaveAsTemplate}>
                <Save className="w-4 h-4 mr-2" />
                Save as Template
              </Button>
            )}
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </div>
        
        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
        
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]?.description}
        </p>
      </div>

      <div className="min-h-[500px]">
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
