
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
      setShowCustomBuilder(!initialData.templateId);
    } else {
      const savedAgent = localStorage.getItem('first-agent-draft');
      if (savedAgent) {
        try {
          const parsedAgent = JSON.parse(savedAgent);
          form.reset(parsedAgent);
          setSelectedTemplate(parsedAgent.templateId || null);
          setShowCustomBuilder(!parsedAgent.templateId);
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
    // Validate that we have minimum required data
    if (!data.name.trim()) {
      toast({
        title: "Agent name required",
        description: "Please provide a name for your agent.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedTemplate && !showCustomBuilder) {
      toast({
        title: "Select an option",
        description: "Please select a template or choose to create a custom agent.",
        variant: "destructive"
      });
      return;
    }

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
    // Reset form to defaults for custom agent
    form.setValue("name", "");
    form.setValue("description", "");
    form.setValue("role", "general");
    form.setValue("specialization", "");
    form.setValue("capabilities", []);
  };

  const hasValidConfiguration = () => {
    const formData = form.watch();
    return formData.name?.trim() && 
           (selectedTemplate || (showCustomBuilder && formData.capabilities.length > 0));
  };

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
            {/* Template Selection */}
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

          <div className="flex justify-between pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onSkip}
              className="px-6"
            >
              Skip for now
            </Button>

            <Button 
              type="submit" 
              disabled={!hasValidConfiguration()}
              className="px-6"
            >
              Create Agent
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
