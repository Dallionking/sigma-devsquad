
import { LucideIcon } from 'lucide-react';

export interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
}
