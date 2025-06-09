
import React, { useState } from 'react';
import { FolderOpen, Plus, Rocket, BookOpen, Star } from 'lucide-react';
import { EmptyStateCard } from './EmptyStateCard';
import { SampleProjectsModal } from '@/components/sample-projects/SampleProjectsModal';
import { ProjectCreationWizard } from '@/components/projects/ProjectCreationWizard';
import { useNavigate } from 'react-router-dom';

interface ProjectsEmptyStateProps {
  onCreateProject?: () => void;
}

export const ProjectsEmptyState = ({ onCreateProject }: ProjectsEmptyStateProps) => {
  const navigate = useNavigate();
  const [showTemplates, setShowTemplates] = useState(false);
  const [showCreationWizard, setShowCreationWizard] = useState(false);

  const handleImportProject = () => {
    // Handle project import
    console.log('Import project');
  };

  const handleViewSamples = () => {
    setShowTemplates(true);
  };

  const handleCreateProject = () => {
    if (onCreateProject) {
      onCreateProject();
    } else {
      setShowCreationWizard(true);
    }
  };

  const tips = [
    "Start with pre-built templates for common scenarios",
    "Projects help organize related tasks and agents",
    "Import existing codebases to get started quickly",
    "Set up project-specific configurations and goals"
  ];

  return (
    <>
      <EmptyStateCard
        icon={FolderOpen}
        title="Create Your First Project"
        description="Projects provide structure for your AI development workflow. Start with a template or create from scratch to organize tasks, agents, and resources around specific goals."
        illustration="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop&crop=center"
        tips={tips}
        action={{
          label: "Browse Templates",
          onClick: handleViewSamples
        }}
        secondaryAction={{
          label: "Create from Scratch",
          onClick: handleCreateProject
        }}
        tertiaryAction={{
          label: "Import Project",
          onClick: handleImportProject
        }}
      />
      
      <SampleProjectsModal
        open={showTemplates}
        onOpenChange={setShowTemplates}
      />
      
      <ProjectCreationWizard
        open={showCreationWizard}
        onOpenChange={setShowCreationWizard}
      />
    </>
  );
};
