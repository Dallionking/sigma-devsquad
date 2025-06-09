
import { z } from 'zod';

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
  role: string;
  specialization: string;
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

export const firstAgentSchema = z.object({
  name: z.string().min(1, "Agent name is required"),
  description: z.string().min(1, "Description is required"),
  role: z.string().default("general"),
  specialization: z.string().optional(),
  capabilities: z.array(z.string()).default([]),
  templateId: z.string().optional()
});

export type FirstAgentFormData = z.infer<typeof firstAgentSchema>;

export interface FirstAgentFormProps {
  onComplete: (data: FirstAgentFormData) => void;
  onSkip: () => void;
  initialData?: FirstAgentFormData | null;
}
