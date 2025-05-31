
import { 
  Target, 
  Bot, 
  Monitor, 
  Shield, 
  Rocket
} from 'lucide-react';
import { WorkflowStep } from './types';

export const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "Set Your Goals",
    description: "Define project objectives clearly",
    icon: Target,
    color: "text-blue-600",
    gradient: "from-blue-500/10 to-blue-600/10"
  },
  {
    id: 2,
    title: "AI Delegates Tasks", 
    description: "Vibe DevSquad intelligently assigns tasks across agents",
    icon: Bot,
    color: "text-purple-600",
    gradient: "from-purple-500/10 to-purple-600/10"
  },
  {
    id: 3,
    title: "Real-Time Execution",
    description: "Monitor progress with intuitive dashboards",
    icon: Monitor,
    color: "text-green-600", 
    gradient: "from-green-500/10 to-green-600/10"
  },
  {
    id: 4,
    title: "Continuous Quality",
    description: "QA agents validate work against requirements throughout",
    icon: Shield,
    color: "text-orange-600",
    gradient: "from-orange-500/10 to-orange-600/10"
  },
  {
    id: 5,
    title: "Delivery & Iteration",
    description: "Completed work integrates through existing pipelines",
    icon: Rocket,
    color: "text-cyan-600",
    gradient: "from-cyan-500/10 to-cyan-600/10"
  }
];
