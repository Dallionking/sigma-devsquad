
import React from 'react';
import { Bot, Plus, BookOpen } from 'lucide-react';
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

  return (
    <EmptyStateCard
      icon={Bot}
      title="No agents yet"
      description="Create your first AI agent to start building your development team. Agents can help with coding, planning, documentation, and more."
      action={showCreateButton ? {
        label: "Create Agent",
        onClick: handleCreateAgent
      } : undefined}
      secondaryAction={{
        label: "Browse templates",
        onClick: handleViewTemplates
      }}
    />
  );
};
