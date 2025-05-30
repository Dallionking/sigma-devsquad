
import { TemplateLibraryStep } from "./TemplateLibraryStep";
import { EnhancedTemplateLibrary } from "./EnhancedTemplateLibrary";
import { RoleSelectionStep } from "./RoleSelectionStep";
import { EnhancedRoleSelection } from "./EnhancedRoleSelection";
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
  customRoles?: any[];
  onSaveTemplate?: (template: any) => void;
  onDeleteTemplate?: (templateId: string) => void;
  onAddCustomRole?: (role: any) => void;
}

export const FlowStepRenderer = ({
  stepId,
  config,
  onConfigChange,
  savedTemplates,
  customRoles = [],
  onSaveTemplate = () => {},
  onDeleteTemplate = () => {},
  onAddCustomRole = () => {}
}: FlowStepRendererProps) => {
  const updateConfig = (updates: Partial<AgentConfig>) => {
    onConfigChange(updates);
  };

  switch (stepId) {
    case "template":
      return (
        <EnhancedTemplateLibrary
          onTemplateSelect={(template) => {
            if (template) {
              updateConfig({ 
                templateId: template.id,
                ...template.config 
              });
            } else {
              updateConfig({ templateId: null });
            }
          }}
          savedTemplates={savedTemplates}
          onSaveTemplate={onSaveTemplate}
          onDeleteTemplate={onDeleteTemplate}
        />
      );
    
    case "role":
      return (
        <EnhancedRoleSelection
          selectedRole={config.role}
          customRole={config.customRole}
          onRoleSelect={(role) => updateConfig({ role })}
          onCustomRoleChange={(customRole) => updateConfig({ customRole })}
          customRoles={customRoles}
          onAddCustomRole={onAddCustomRole}
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
