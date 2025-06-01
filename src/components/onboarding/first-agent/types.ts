
export interface AgentTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  icon: string;
  skills: string[];
  capabilities: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  popular: boolean;
}

export interface CustomAgentSkill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'qa' | 'design' | 'data';
  level: 1 | 2 | 3 | 4 | 5;
}

export interface FirstAgentData {
  type: 'template' | 'custom';
  templateId?: string;
  name: string;
  description: string;
  skills: string[];
  capabilities: string[];
  customSkills?: CustomAgentSkill[];
}

export interface FirstAgentFormProps {
  onComplete: (data: FirstAgentData) => void;
  onSkip: () => void;
}
