
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { AgentTemplateCard } from './AgentTemplateCard';
import { AGENT_TEMPLATES } from './constants';
import { FirstAgentFormData } from './types';

interface TemplateSelectionSectionProps {
  selectedTemplate: string | null;
  setSelectedTemplate: (template: string | null) => void;
  setShowCustomBuilder: (show: boolean) => void;
  form: UseFormReturn<FirstAgentFormData>;
}

export const TemplateSelectionSection = ({
  selectedTemplate,
  setSelectedTemplate,
  setShowCustomBuilder,
  form
}: TemplateSelectionSectionProps) => {
  const handleTemplateSelect = (template: any) => {
    const templateId = typeof template === 'string' ? template : template.id;
    const templateData = AGENT_TEMPLATES.find(t => t.id === templateId);
    if (templateData) {
      setSelectedTemplate(templateId);
      setShowCustomBuilder(false);
      form.setValue("templateId", templateId);
      form.setValue("name", templateData.name);
      form.setValue("description", templateData.description);
      form.setValue("role", templateData.role);
      form.setValue("specialization", templateData.specialization);
      form.setValue("capabilities", templateData.capabilities);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Choose an Agent Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AGENT_TEMPLATES.map((template) => (
          <AgentTemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onSelect={handleTemplateSelect}
          />
        ))}
      </div>
    </div>
  );
};
