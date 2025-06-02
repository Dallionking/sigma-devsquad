
import { ViewSpecificStep } from '@/hooks/useViewSpecificOnboarding';
import { ViewMode } from '@/types';
import { Users, Bot, MessageSquare, Workflow, UserCheck, Calendar, Settings } from 'lucide-react';

export interface TourStep {
  id: ViewSpecificStep;
  title: string;
  description: string;
  targetSelector: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  icon: any;
  action?: string;
}

export const teamViewTourSteps: Record<ViewMode, TourStep[]> = {
  workflow: [
    {
      id: 'team-overview',
      title: 'Team Overview',
      description: 'This is your team dashboard where you can see all your collaborative teams and their current status.',
      targetSelector: '[data-tour="team-overview"]',
      position: 'bottom',
      icon: Users
    },
    {
      id: 'team-collaboration',
      title: 'Real-time Collaboration',
      description: 'Monitor team activities, see who\'s online, and track collaborative work in real-time.',
      targetSelector: '[data-tour="team-collaboration"]',
      position: 'left',
      icon: UserCheck
    },
    {
      id: 'team-projects',
      title: 'Team Projects',
      description: 'Manage shared projects, assign tasks to team members, and track progress across your organization.',
      targetSelector: '[data-tour="team-projects"]',
      position: 'top',
      icon: Calendar
    }
  ],
  communication: [
    {
      id: 'team-overview',
      title: 'Team Communication Hub',
      description: 'Central communication center for all your teams and collaborative discussions.',
      targetSelector: '[data-tour="team-communication"]',
      position: 'bottom',
      icon: MessageSquare
    },
    {
      id: 'team-collaboration',
      title: 'Channel Management',
      description: 'Create channels, manage team discussions, and coordinate with team members.',
      targetSelector: '[data-tour="team-channels"]',
      position: 'right',
      icon: Users
    }
  ],
  tasks: [
    {
      id: 'team-overview',
      title: 'Team Task Management',
      description: 'Coordinate tasks across your teams, assign work, and track collective progress.',
      targetSelector: '[data-tour="team-tasks"]',
      position: 'bottom',
      icon: Calendar
    }
  ],
  messages: [
    {
      id: 'team-overview',
      title: 'Team Messages',
      description: 'View all team communications, announcements, and collaborative discussions.',
      targetSelector: '[data-tour="team-messages"]',
      position: 'bottom',
      icon: MessageSquare
    }
  ]
};

export const individualViewTourSteps: Record<ViewMode, TourStep[]> = {
  workflow: [
    {
      id: 'individual-agents',
      title: 'Your AI Agents',
      description: 'Manage your personal AI agents, each specialized for different development tasks.',
      targetSelector: '[data-tour="individual-agents"]',
      position: 'bottom',
      icon: Bot
    },
    {
      id: 'individual-workflow',
      title: 'Workflow Management',
      description: 'Orchestrate your agents to work together on complex development workflows.',
      targetSelector: '[data-tour="individual-workflow"]',
      position: 'left',
      icon: Workflow
    },
    {
      id: 'individual-tasks',
      title: 'Task Assignment',
      description: 'Assign specific tasks to your agents and monitor their progress in real-time.',
      targetSelector: '[data-tour="individual-tasks"]',
      position: 'top',
      icon: Calendar
    }
  ],
  communication: [
    {
      id: 'individual-communication',
      title: 'Agent Communication',
      description: 'Communicate directly with your AI agents and review their responses.',
      targetSelector: '[data-tour="individual-communication"]',
      position: 'bottom',
      icon: MessageSquare
    }
  ],
  tasks: [
    {
      id: 'individual-tasks',
      title: 'Personal Task Board',
      description: 'Manage your individual tasks and agent assignments from this central hub.',
      targetSelector: '[data-tour="individual-tasks"]',
      position: 'bottom',
      icon: Calendar
    }
  ],
  messages: [
    {
      id: 'individual-communication',
      title: 'Agent Messages',
      description: 'View all communications with your AI agents and their task updates.',
      targetSelector: '[data-tour="individual-messages"]',
      position: 'bottom',
      icon: MessageSquare
    }
  ]
};

export const getTourSteps = (showTeamView: boolean, viewMode: ViewMode): TourStep[] => {
  return showTeamView ? teamViewTourSteps[viewMode] : individualViewTourSteps[viewMode];
};
