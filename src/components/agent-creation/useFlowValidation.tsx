
import { AgentType } from "@/types";

interface AgentConfig {
  templateId: string | null;
  role: AgentType | null;
  customRole: string;
  specialization: string;
  background: string;
  capabilities: Record<string, boolean>;
  name: string;
  icon: string;
  description: string;
}

interface Step {
  id: string;
  title: string;
  description: string;
}

export const useFlowValidation = (config: AgentConfig, steps: Step[], currentStep: number) => {
  const canProceed = () => {
    const stepId = steps[currentStep]?.id;
    
    switch (stepId) {
      case "template": 
        return true; // Optional step
      case "role": 
        return config.role !== null || config.customRole !== "";
      case "specialization": 
        return config.specialization !== "";
      case "background": 
        return true; // Optional
      case "capabilities": 
        return Object.keys(config.capabilities).length > 0;
      case "naming": 
        return config.name.trim() !== "";
      case "preview": 
        return true;
      default: 
        return false;
    }
  };

  return { canProceed };
};
