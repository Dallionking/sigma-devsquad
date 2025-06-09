
import React from 'react';
import { Bot, Plus, BookOpen, Sparkles } from 'lucide-react';
import { EmptyStateCard } from './EmptyStateCard';
import { useNavigate } from 'react-router-dom';

interface AgentsEmptyStateProps {
  onCreateAgent?: () => void;
  showCreateButton?: boolean;
}

export const AgentsEmptyState = ({ 
  onCreateAgent, 
  showCreateButton = true 
}: AgentsEmptyStateProps) => {
  const navigate = useNavigate();

  const handleCreateAgent = () => {
    if (onCreateAgent) {
      onCreateAgent();
    } else {
      navigate('/agent-creation');
    }
  };

  const handleViewTemplates = () => {
    navigate('/agent-configuration');
  };

  const handleViewSamples = () => {
    // Navigate to sample projects or demo
    navigate('/dashboard?tab=samples');
  };

  const tips = [
    "Start with pre-built templates for common roles",
    "Define clear objectives and responsibilities",
    "Add specialized skills and frameworks",
    "Test agent capabilities before deployment"
  ];

  return (
    <EmptyStateCard
      icon={Bot}
      title="Build Your AI Team"
      description="Create intelligent agents to handle coding, planning, documentation, and more. Each agent can be specialized for specific tasks and work collaboratively with your team."
      illustration="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&crop=center"
      tips={tips}
      action={showCreateButton ? {
        label: "Create First Agent",
        onClick: handleCreateAgent
      } : undefined}
      secondaryAction={{
        label: "Browse Templates",
        onClick: handleViewTemplates
      }}
      tertiaryAction={{
        label: "View Examples",
        onClick: handleViewSamples
      }}
    />
  );
};
