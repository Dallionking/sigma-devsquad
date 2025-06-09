
import React from 'react';
import { GitBranch, Play, Settings, Zap } from 'lucide-react';
import { EmptyStateCard } from './EmptyStateCard';
import { useNavigate } from 'react-router-dom';

interface WorkflowEmptyStateProps {
  onCreateWorkflow?: () => void;
}

export const WorkflowEmptyState = ({ onCreateWorkflow }: WorkflowEmptyStateProps) => {
  const navigate = useNavigate();

  const handleViewTemplates = () => {
    navigate('/planning-agent?tab=templates');
  };

  const handleLearnMore = () => {
    window.open('/docs/workflows', '_blank');
  };

  const tips = [
    "Automate repetitive development tasks",
    "Chain multiple agents for complex operations",
    "Set up triggers and conditions",
    "Monitor workflow performance and outcomes"
  ];

  return (
    <EmptyStateCard
      icon={GitBranch}
      title="Automate Your Processes"
      description="Create intelligent workflows that connect your agents and automate complex development processes. From code reviews to deployment pipelines."
      tips={tips}
      action={onCreateWorkflow ? {
        label: "Create Workflow",
        onClick: onCreateWorkflow
      } : undefined}
      secondaryAction={{
        label: "Browse Templates",
        onClick: handleViewTemplates
      }}
      tertiaryAction={{
        label: "Learn More",
        onClick: handleLearnMore
      }}
    />
  );
};
