
import { useState } from "react";
import { AgentType } from "@/types";
import { useAgents } from "@/contexts/AgentContext";
import { FlowHeader } from "./FlowHeader";
import { FlowStepRenderer } from "./FlowStepRenderer";
import { FlowNavigation } from "./FlowNavigation";
import { useFlowValidation } from "./useFlowValidation";
import { useTemplateManager } from "./useTemplateManager";

interface CustomRole {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  category: string;
  icon: string;
  color: string;
}

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

  // Enhanced state for custom roles and templates
  const [customRoles, setCustomRoles] = useState<CustomRole[]>([]);

  const { addAgent } = useAgents();
  const { savedTemplates, saveAsTemplate, deleteTemplate } = useTemplateManager();
  const { canProceed } = useFlowValidation(config, steps, currentStep);

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
    // Create the agent in the global state
    const finalConfig = {
      ...config,
      // Use custom role name if no standard role is selected
      role: config.role || (config.customRole ? 'planning' : null)
    };
    
    const newAgent = addAgent(finalConfig);
    console.log("Enhanced agent created and added to global state:", newAgent);
    
    // Call the original completion handler
    onComplete(finalConfig);
  };

  const handleSaveAsTemplate = () => {
    const template = {
      id: `template_${Date.now()}`,
      name: config.name || "Custom Template",
      description: config.description || "Custom agent template",
      category: "Custom",
      tags: [config.role || config.customRole || "custom"],
      config: {
        role: config.role || 'planning',
        specialization: config.specialization,
        capabilities: config.capabilities,
        background: config.background
      },
      createdAt: new Date(),
      downloads: 0
    };
    saveAsTemplate(template);
  };

  const handleAddCustomRole = (role: CustomRole) => {
    setCustomRoles(prev => [...prev, role]);
  };

  const handleStepClick = (stepIndex: number) => {
    // Allow jumping to previous steps only
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const updateConfig = (updates: Partial<typeof config>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-6">
      <FlowHeader
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
        onCancel={onCancel}
        onSaveAsTemplate={handleSaveAsTemplate}
        showSaveTemplate={currentStep === steps.length - 1}
      />

      <div className="min-h-[500px]">
        <FlowStepRenderer
          stepId={steps[currentStep].id}
          config={config}
          onConfigChange={updateConfig}
          savedTemplates={savedTemplates}
          customRoles={customRoles}
          onSaveTemplate={saveAsTemplate}
          onDeleteTemplate={deleteTemplate}
          onAddCustomRole={handleAddCustomRole}
        />
      </div>

      <FlowNavigation
        currentStep={currentStep}
        totalSteps={steps.length}
        canProceed={canProceed()}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onComplete={handleComplete}
      />
    </div>
  );
};
