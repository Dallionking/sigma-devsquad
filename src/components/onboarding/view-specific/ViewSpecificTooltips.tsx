
import React from 'react';
import { TooltipWrapper } from '../tooltips/TooltipWrapper';
import { ViewMode } from '@/types';

interface ViewSpecificTooltipsProps {
  showTeamView: boolean;
  viewMode: ViewMode;
  isTooltipVisible: (id: string) => boolean;
  onDismissTooltip: (id: string) => void;
}

export const ViewSpecificTooltips = ({
  showTeamView,
  viewMode,
  isTooltipVisible,
  onDismissTooltip
}: ViewSpecificTooltipsProps) => {
  const viewKey = showTeamView ? 'team' : 'individual';
  
  const tooltipConfigs = {
    team: {
      workflow: [
        {
          id: 'team-overview-tooltip',
          targetSelector: '[data-tour="team-overview"]',
          title: 'Team Dashboard',
          content: 'Monitor your collaborative teams, see active projects, and track team performance from this central hub.'
        },
        {
          id: 'team-collaboration-tooltip',
          targetSelector: '[data-tour="team-collaboration"]',
          title: 'Real-time Collaboration',
          content: 'See who\'s currently online, active collaborations, and real-time updates from your team members.'
        }
      ],
      communication: [
        {
          id: 'team-communication-tooltip',
          targetSelector: '[data-tour="team-communication"]',
          title: 'Team Communications',
          content: 'Access all team channels, direct messages, and collaborative discussions in one place.'
        }
      ],
      tasks: [
        {
          id: 'team-tasks-tooltip',
          targetSelector: '[data-tour="team-tasks"]',
          title: 'Team Task Management',
          content: 'Coordinate tasks across teams, assign work to members, and track collective progress.'
        }
      ],
      messages: [
        {
          id: 'team-messages-tooltip',
          targetSelector: '[data-tour="team-messages"]',
          title: 'Team Messages',
          content: 'View all team communications, announcements, and important updates.'
        }
      ]
    },
    individual: {
      workflow: [
        {
          id: 'individual-agents-tooltip',
          targetSelector: '[data-tour="individual-agents"]',
          title: 'Your AI Agents',
          content: 'Manage your personal AI agents. Each agent is specialized for different development tasks and can work independently or together.'
        },
        {
          id: 'individual-workflow-tooltip',
          targetSelector: '[data-tour="individual-workflow"]',
          title: 'Workflow Orchestration',
          content: 'Create complex workflows by connecting your agents. Define how they collaborate to complete larger projects.'
        }
      ],
      communication: [
        {
          id: 'individual-communication-tooltip',
          targetSelector: '[data-tour="individual-communication"]',
          title: 'Agent Communication',
          content: 'Chat directly with your AI agents, give them instructions, and review their work and responses.'
        }
      ],
      tasks: [
        {
          id: 'individual-tasks-tooltip',
          targetSelector: '[data-tour="individual-tasks"]',
          title: 'Personal Tasks',
          content: 'Manage your individual tasks, assign them to specific agents, and monitor progress.'
        }
      ],
      messages: [
        {
          id: 'individual-messages-tooltip',
          targetSelector: '[data-tour="individual-messages"]',
          title: 'Agent Messages',
          content: 'View all communications with your AI agents, their status updates, and completed work.'
        }
      ]
    }
  };

  const currentTooltips = tooltipConfigs[viewKey][viewMode] || [];

  return (
    <>
      {currentTooltips.map((tooltip) => {
        if (!isTooltipVisible(tooltip.id)) return null;
        
        const targetElement = document.querySelector(tooltip.targetSelector);
        if (!targetElement) return null;

        return (
          <TooltipWrapper
            key={tooltip.id}
            id={tooltip.id}
            title={tooltip.title}
            content={tooltip.content}
            trigger="hover"
            position="top"
            showIcon={true}
          >
            <div />
          </TooltipWrapper>
        );
      })}
    </>
  );
};
