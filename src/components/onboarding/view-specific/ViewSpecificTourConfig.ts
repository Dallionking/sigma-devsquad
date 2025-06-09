
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
      title: 'Team Dashboard Overview',
      description: 'Welcome to your team dashboard! This is where you can see all your collaborative teams, their current status, and manage team-wide activities.',
      targetSelector: '[data-tour="team-overview"], .team-overview, [data-testid="team-overview"], .team-dashboard',
      position: 'bottom',
      icon: Users
    },
    {
      id: 'team-projects',
      title: 'Team Projects',
      description: 'Manage shared projects, assign tasks to team members, and track progress across your organization. Click here to view and create new team projects.',
      targetSelector: '[data-tour="team-projects"], .team-projects, [data-testid="team-projects"], .project-grid',
      position: 'bottom',
      icon: Calendar
    },
    {
      id: 'team-collaboration',
      title: 'Real-time Collaboration',
      description: 'Monitor team activities, see who\'s online, and track collaborative work in real-time. This panel shows active team members and ongoing collaborations.',
      targetSelector: '[data-tour="team-collaboration"], .team-collaboration, [data-testid="team-collaboration"], .collaboration-panel',
      position: 'left',
      icon: UserCheck
    }
  ],
  communication: [
    {
      id: 'team-overview',
      title: 'Team Communication Hub',
      description: 'This is your central communication center for all team discussions, announcements, and collaborative messaging.',
      targetSelector: '[data-tour="team-communication"], .communication-hub, [data-testid="communication-hub"], .unified-communication-hub',
      position: 'bottom',
      icon: MessageSquare
    },
    {
      id: 'team-collaboration',
      title: 'Communication Tools',
      description: 'Access advanced communication features including chat, video calls, file sharing, and team coordination tools.',
      targetSelector: '[data-tour="team-communication-tools"], .communication-tools, [data-testid="communication-tools"], .chat-interface',
      position: 'right',
      icon: Users
    }
  ],
  tasks: [
    {
      id: 'team-overview',
      title: 'Team Task Management',
      description: 'Coordinate tasks across your teams, assign work to team members, and track collective progress from this central task hub.',
      targetSelector: '[data-tour="team-tasks"], .team-tasks, [data-testid="team-tasks"], .task-management',
      position: 'bottom',
      icon: Calendar
    }
  ],
  messages: [
    {
      id: 'team-overview',
      title: 'Team Messages',
      description: 'View all team communications, announcements, and collaborative discussions. Stay updated with your team\'s latest activities.',
      targetSelector: '[data-tour="team-messages"], .team-messages, [data-testid="team-messages"], .message-inspector',
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
      description: 'Manage your personal AI agents, each specialized for different development tasks. Create, configure, and deploy agents for your workflow.',
      targetSelector: '[data-tour="individual-agents"], .individual-agents, [data-testid="individual-agents"], .agent-grid',
      position: 'bottom',
      icon: Bot
    },
    {
      id: 'individual-workflow',
      title: 'Workflow Management',
      description: 'Orchestrate your agents to work together on complex development workflows. Design and monitor automated processes.',
      targetSelector: '[data-tour="individual-workflow"], .individual-workflow, [data-testid="individual-workflow"], .workflow-visualization',
      position: 'left',
      icon: Workflow
    },
    {
      id: 'individual-tasks',
      title: 'Task Assignment',
      description: 'Assign specific tasks to your agents and monitor their progress in real-time. Track completion and manage priorities.',
      targetSelector: '[data-tour="individual-tasks"], .individual-tasks, [data-testid="individual-tasks"], .task-management',
      position: 'top',
      icon: Calendar
    }
  ],
  communication: [
    {
      id: 'individual-communication',
      title: 'Agent Communication',
      description: 'Communicate directly with your AI agents, review their responses, and coordinate their activities through this interface.',
      targetSelector: '[data-tour="individual-communication"], .individual-communication, [data-testid="individual-communication"], .communication-panel',
      position: 'bottom',
      icon: MessageSquare
    }
  ],
  tasks: [
    {
      id: 'individual-tasks',
      title: 'Personal Task Board',
      description: 'Manage your individual tasks and agent assignments from this central hub. Organize work and track progress.',
      targetSelector: '[data-tour="individual-tasks"], .individual-tasks, [data-testid="individual-tasks"], .task-management',
      position: 'bottom',
      icon: Calendar
    }
  ],
  messages: [
    {
      id: 'individual-communication',
      title: 'Agent Messages',
      description: 'View all communications with your AI agents, their task updates, and status reports in one convenient location.',
      targetSelector: '[data-tour="individual-messages"], .individual-messages, [data-testid="individual-messages"], .message-inspector',
      position: 'bottom',
      icon: MessageSquare
    }
  ]
};

export const getTourSteps = (showTeamView: boolean, viewMode: ViewMode): TourStep[] => {
  return showTeamView ? teamViewTourSteps[viewMode] : individualViewTourSteps[viewMode];
};
