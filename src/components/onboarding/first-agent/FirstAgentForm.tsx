
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { TooltipWrapper } from '../tooltips/TooltipWrapper';
import { AgentTemplateCard } from './AgentTemplateCard';
import { CustomAgentBuilder } from './CustomAgentBuilder';
import { AgentPreview } from './AgentPreview';
import { firstAgentSchema, type FirstAgentFormData } from './types';
import { AGENT_TEMPLATES } from './constants';

interface FirstAgentFormProps {
  onComplete: (data: FirstAgentFormData) => void;
  onSkip: () => void;
  initialData?: FirstAgentFormData | null;
}

export const FirstAgentForm = ({ onComplete, onSkip, initialData }: FirstAgentFormProps) => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);

  const form = useForm<FirstAgentFormData>({
    resolver: zodResolver(firstAgentSchema),
    defaultValues: {
      name: "",
      description: "",
      role: "general",
      specialization: "",
      capabilities: [],
      templateId: "",
    },
  });

  // Load initial data if available
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
      setSelectedTemplate(initialData.templateId || null);
    } else {
      const savedAgent = localStorage.getItem('first-agent-draft');
      if (savedAgent) {
        try {
          const parsedAgent = JSON.parse(savedAgent);
          form.reset(parsedAgent);
          setSelectedTemplate(parsedAgent.templateId || null);
        } catch (error) {
          console.error('Failed to parse agent data:', error);
        }
      }
    }
  }, [initialData, form]);

  // Auto-save form data
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem('first-agent-draft', JSON.stringify(value));
    });
    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, [form]);

  const onSubmit = (data: FirstAgentFormData) => {
    localStorage.removeItem('first-agent-draft');
    onComplete(data);
  };

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

  const handleCustomAgent = () => {
    setSelectedTemplate(null);
    setShowCustomBuilder(true);
    form.setValue("templateId", "");
  };

  const canSubmit = form.formState.isValid && (selectedTemplate || showCustomBuilder);

  return (
    <TooltipWrapper
      id="first-agent-section"
      title="Create Your First AI Agent"
      content="Choose from pre-built agent templates or create a custom agent tailored to your needs. Your first agent will be your primary assistant for project planning, code generation, and task management."
      position="top"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose an Agent Template</h3>
              <TooltipWrapper
                id="agent-templates-grid"
                title="Agent Templates"
                content="These are pre-configured agents with specific roles and capabilities. Each template is optimized for different types of development work and comes with specialized tools and knowledge."
                position="top"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {AGENT_TEMPLATES.map((template) => (
                    <TooltipWrapper
                      key={template.id}
                      id={`template-${template.id}`}
                      title={`${template.name} Agent`}
                      content={`${template.description} This agent specializes in ${template.specialization} and comes with capabilities like ${template.capabilities.slice(0, 2).join(', ')}.`}
                      position="top"
                      trigger="hover"
                      showIcon={false}
                    >
                      <AgentTemplateCard
                        template={template}
                        isSelected={selectedTemplate === template.id}
                        onSelect={handleTemplateSelect}
                      />
                    </TooltipWrapper>
                  ))}
                </div>
              </TooltipWrapper>
            </div>

            <div className="text-center">
              <TooltipWrapper
                id="custom-agent-option"
                title="Custom Agent Builder"
                content="Create a completely custom agent with your own specifications. You can define the agent's role, capabilities, and specialization to match your specific project needs."
                position="top"
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCustomAgent}
                  className={showCustomBuilder ? "bg-primary text-primary-foreground" : ""}
                >
                  Create Custom Agent
                </Button>
              </TooltipWrapper>
            </div>

            {showCustomBuilder && (
              <CustomAgentBuilder form={form} />
            )}

            {(selectedTemplate || showCustomBuilder) && (
              <AgentPreview
                agent={{
                  name: form.watch("name"),
                  description: form.watch("description"),
                  role: form.watch("role"),
                  specialization: form.watch("specialization"),
                  capabilities: form.watch("capabilities")
                }}
              />
            )}
          </div>

          <div className="flex justify-between pt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onSkip}
            >
              Skip for now
            </Button>

            <Button 
              type="submit" 
              disabled={!canSubmit}
            >
              Create Agent
            </Button>
          </div>
        </form>
      </Form>
    </TooltipWrapper>
  );
};
