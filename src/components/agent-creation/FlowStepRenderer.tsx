
import { TemplateLibraryStep } from "./TemplateLibraryStep";
import { RoleSelectionStep } from "./RoleSelectionStep";
import { SpecializationStep } from "./SpecializationStep";
import { BackgroundConfigStep } from "./BackgroundConfigStep";
import { CapabilitySelectionStep } from "./CapabilitySelectionStep";
import { AgentNamingStep } from "./AgentNamingStep";
import { AgentPreviewStep } from "./AgentPreviewStep";
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

interface FlowStepRendererProps {
  stepId: string;
  config: AgentConfig;
  onConfigChange: (updates: Partial<AgentConfig>) => void;
  savedTemplates: any[];
}

export const FlowStepRenderer = ({
  stepId,
  config,
  onConfigChange,
  savedTemplates
}: FlowStepRendererProps) => {
  const updateConfig = (updates: Partial<AgentConfig>) => {
    onConfigChange(updates);
  };

  switch (stepId) {
    case "template":
      return (
        <TemplateLibraryStep
          onTemplateSelect={(template) => {
            if (template) {
              updateConfig({ ...template.config });
            }
          }}
          savedTemplates={savedTemplates}
        />
      );
    
    case "role":
      return (
        <RoleSelectionStep
          selectedRole={config.role}
          onRoleSelect={(role) => updateConfig({ role })}
          customRole={config.customRole}
          onCustomRoleChange={(customRole) => updateConfig({ customRole })}
        />
      );
    
    case "specialization":
      return (
        <SpecializationStep
          selectedRole={config.role}
          specialization={config.specialization}
          onSpecializationChange={(specialization) => updateConfig({ specialization })}
        />
      );
    
    case "background":
      return (
        <BackgroundConfigStep
          background={config.background}
          onBackgroundChange={(background) => updateConfig({ background })}
        />
      );
    
    case "capabilities":
      return (
        <CapabilitySelectionStep
          selectedRole={config.role}
          capabilities={config.capabilities}
          onCapabilitiesChange={(capabilities) => updateConfig({ capabilities })}
        />
      );
    
    case "naming":
      return (
        <AgentNamingStep
          name={config.name}
          icon={config.icon}
          onNameChange={(name) => updateConfig({ name })}
          onIconChange={(icon) => updateConfig({ icon })}
          description={config.description}
          onDescriptionChange={(description) => updateConfig({ description })}
        />
      );
    
    case "preview":
      return (
        <AgentPreviewStep
          config={config}
          onConfigChange={(newConfig) => onConfigChange(newConfig)}
        />
      );
    
    default:
      return <div>Step not found</div>;
  }
};
