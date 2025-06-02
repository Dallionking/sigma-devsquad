
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { FirstAgentFormContent } from './FirstAgentFormContent';
import { firstAgentSchema, type FirstAgentFormData, type FirstAgentFormProps } from './types';

export const FirstAgentFormContainer = ({ onComplete, onSkip, initialData }: FirstAgentFormProps) => {
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

  const hasValidConfiguration = () => {
    const formData = form.watch();
    return formData.name?.trim() && 
           (selectedTemplate || (showCustomBuilder && formData.capabilities.length > 0));
  };

  return (
    <FirstAgentFormContent
      form={form}
      selectedTemplate={selectedTemplate}
      setSelectedTemplate={setSelectedTemplate}
      showCustomBuilder={showCustomBuilder}
      setShowCustomBuilder={setShowCustomBuilder}
      onSubmit={onSubmit}
      onSkip={onSkip}
      hasValidConfiguration={hasValidConfiguration}
    />
  );
};
