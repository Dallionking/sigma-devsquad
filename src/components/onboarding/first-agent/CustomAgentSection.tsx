
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { CustomAgentBuilder } from './CustomAgentBuilder';
import { FirstAgentFormData } from './types';

interface CustomAgentSectionProps {
  showCustomBuilder: boolean;
  setSelectedTemplate: (template: string | null) => void;
  setShowCustomBuilder: (show: boolean) => void;
  form: UseFormReturn<FirstAgentFormData>;
}

export const CustomAgentSection = ({
  showCustomBuilder,
  setSelectedTemplate,
  setShowCustomBuilder,
  form
}: CustomAgentSectionProps) => {
  const handleCustomAgent = () => {
    setSelectedTemplate(null);
    setShowCustomBuilder(true);
    form.setValue("templateId", "");
    // Reset form to defaults for custom agent
    form.setValue("name", "");
    form.setValue("description", "");
    form.setValue("role", "general");
    form.setValue("specialization", "");
    form.setValue("capabilities", []);
  };

  return (
    <>
      {/* Custom Agent Option */}
      <div className="text-center border-t pt-6">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Don't see what you need? Create a custom agent
          </p>
          <Button
            type="button"
            variant={showCustomBuilder ? "default" : "outline"}
            onClick={handleCustomAgent}
            className="px-6"
          >
            Create Custom Agent
          </Button>
        </div>
      </div>

      {/* Custom Agent Builder */}
      {showCustomBuilder && (
        <div className="border-t pt-6">
          <CustomAgentBuilder form={form} />
        </div>
      )}
    </>
  );
};
