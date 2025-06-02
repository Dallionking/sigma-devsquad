
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { TemplateSelectionSection } from './TemplateSelectionSection';
import { CustomAgentSection } from './CustomAgentSection';
import { AgentPreview } from './AgentPreview';
import { FirstAgentFormActions } from './FirstAgentFormActions';
import { FirstAgentFormData } from './types';

interface FirstAgentFormContentProps {
  form: UseFormReturn<FirstAgentFormData>;
  selectedTemplate: string | null;
  setSelectedTemplate: (template: string | null) => void;
  showCustomBuilder: boolean;
  setShowCustomBuilder: (show: boolean) => void;
  onSubmit: (data: FirstAgentFormData) => void;
  onSkip: () => void;
  hasValidConfiguration: () => boolean;
}

export const FirstAgentFormContent = ({
  form,
  selectedTemplate,
  setSelectedTemplate,
  showCustomBuilder,
  setShowCustomBuilder,
  onSubmit,
  onSkip,
  hasValidConfiguration
}: FirstAgentFormContentProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Create Your First AI Agent</h2>
        <p className="text-muted-foreground">
          Choose from our pre-built templates or create a custom agent tailored to your needs
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <TemplateSelectionSection
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              setShowCustomBuilder={setShowCustomBuilder}
              form={form}
            />

            <CustomAgentSection
              showCustomBuilder={showCustomBuilder}
              setSelectedTemplate={setSelectedTemplate}
              setShowCustomBuilder={setShowCustomBuilder}
              form={form}
            />

            {/* Agent Preview */}
            {(selectedTemplate || showCustomBuilder) && form.watch("name") && (
              <div className="border-t pt-6">
                <AgentPreview
                  agentData={{
                    name: form.watch("name"),
                    description: form.watch("description"),
                    role: form.watch("role"),
                    specialization: form.watch("specialization"),
                    capabilities: form.watch("capabilities"),
                    templateId: form.watch("templateId")
                  }}
                />
              </div>
            )}
          </div>

          <FirstAgentFormActions
            onSkip={onSkip}
            hasValidConfiguration={hasValidConfiguration}
          />
        </form>
      </Form>
    </div>
  );
};
