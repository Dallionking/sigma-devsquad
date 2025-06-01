
import React from 'react';
import { FolderOpen, Plus, Rocket, BookOpen } from 'lucide-react';
import { EmptyStateCard } from './EmptyStateCard';
import { useNavigate } from 'react-router-dom';

interface ProjectsEmptyStateProps {
  onCreateProject?: () => void;
}

export const ProjectsEmptyState = ({ onCreateProject }: ProjectsEmptyStateProps) => {
  const navigate = useNavigate();

  const handleImportProject = () => {
    // Handle project import
    console.log('Import project');
  };

  const handleViewSamples = () => {
    navigate('/dashboard?tab=samples');
  };

  const tips = [
    "Projects help organize related tasks and agents",
    "Import existing codebases to get started quickly",
    "Use project templates for common scenarios",
    "Set up project-specific configurations"
  ];

  return (
    <EmptyStateCard
      icon={FolderOpen}
      title="Create Your First Project"
      description="Projects provide structure for your AI development workflow. Organize tasks, agents, and resources around specific goals or applications."
      illustration="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop&crop=center"
      tips={tips}
      action={onCreateProject ? {
        label: "Create Project",
        onClick: onCreateProject
      } : undefined}
      secondaryAction={{
        label: "Import Project",
        onClick: handleImportProject
      }}
      tertiaryAction={{
        label: "Browse Samples",
        onClick: handleViewSamples
      }}
    />
  );
};
