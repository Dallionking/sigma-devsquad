
import { useState, useCallback } from "react";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  config: any;
  createdAt: Date;
  downloads: number;
  official?: boolean;
}

export const useTemplateManager = () => {
  const [savedTemplates, setSavedTemplates] = useState<Template[]>(() => {
    // Load saved templates from localStorage
    const saved = localStorage.getItem('saved-agent-templates');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((template: any) => ({
          ...template,
          createdAt: new Date(template.createdAt)
        }));
      } catch (error) {
        console.error('Failed to parse saved templates:', error);
        return [];
      }
    }
    return [];
  });

  const saveAsTemplate = useCallback((template: Template) => {
    const newTemplate = {
      ...template,
      id: template.id || `template_${Date.now()}`,
      createdAt: template.createdAt || new Date(),
      downloads: template.downloads || 0
    };

    setSavedTemplates(prev => {
      const updated = [...prev, newTemplate];
      localStorage.setItem('saved-agent-templates', JSON.stringify(updated));
      return updated;
    });

    console.log('Template saved:', newTemplate);
  }, []);

  const deleteTemplate = useCallback((templateId: string) => {
    setSavedTemplates(prev => {
      const updated = prev.filter(template => template.id !== templateId);
      localStorage.setItem('saved-agent-templates', JSON.stringify(updated));
      return updated;
    });

    console.log('Template deleted:', templateId);
  }, []);

  const updateTemplate = useCallback((templateId: string, updates: Partial<Template>) => {
    setSavedTemplates(prev => {
      const updated = prev.map(template => 
        template.id === templateId 
          ? { ...template, ...updates }
          : template
      );
      localStorage.setItem('saved-agent-templates', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getTemplateById = useCallback((templateId: string) => {
    return savedTemplates.find(template => template.id === templateId);
  }, [savedTemplates]);

  const duplicateTemplate = useCallback((templateId: string) => {
    const template = getTemplateById(templateId);
    if (template) {
      const duplicate = {
        ...template,
        id: `template_${Date.now()}`,
        name: `${template.name} (Copy)`,
        createdAt: new Date(),
        downloads: 0
      };
      saveAsTemplate(duplicate);
      return duplicate;
    }
  }, [getTemplateById, saveAsTemplate]);

  return {
    savedTemplates,
    saveAsTemplate,
    deleteTemplate,
    updateTemplate,
    getTemplateById,
    duplicateTemplate
  };
};
