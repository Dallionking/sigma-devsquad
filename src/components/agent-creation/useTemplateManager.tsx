
import { useState } from "react";

interface AgentConfig {
  templateId: string | null;
  role: any;
  customRole: string;
  specialization: string;
  background: string;
  capabilities: Record<string, boolean>;
  name: string;
  icon: string;
  description: string;
}

export const useTemplateManager = () => {
  const [savedTemplates, setSavedTemplates] = useState<any[]>([]);

  const saveAsTemplate = (config: AgentConfig) => {
    const template = {
      id: Date.now().toString(),
      name: `${config.name} Template`,
      description: config.description || "Custom agent template",
      config: { ...config },
      createdAt: new Date()
    };
    setSavedTemplates(prev => [...prev, template]);
    console.log("Template saved:", template);
  };

  return {
    savedTemplates,
    saveAsTemplate
  };
};
