
import React from 'react';
import { CheckSquare, Plus, MapPin, Zap } from 'lucide-react';
import { EmptyStateCard } from './EmptyStateCard';
import { useNavigate } from 'react-router-dom';

interface TasksEmptyStateProps {
  onCreateTask?: () => void;
}

export const TasksEmptyState = ({ onCreateTask }: TasksEmptyStateProps) => {
  const navigate = useNavigate();

  const handlePlanningAgent = () => {
    navigate('/planning-agent');
  };

  const handleCreateTask = () => {
    if (onCreateTask) {
      onCreateTask();
    }
  };

  const handleViewWorkflows = () => {
    navigate('/dashboard?view=workflow');
  };

  const tips = [
    "Break down complex projects into smaller tasks",
    "Assign tasks to specific agents based on their skills",
    "Use the Planning Agent for automatic task generation",
    "Set clear priorities and deadlines"
  ];

  return (
    <EmptyStateCard
      icon={CheckSquare}
      title="Organize Your Work"
      description="Create and assign tasks to your AI agents. Use intelligent planning to break down complex projects into manageable pieces that your team can execute efficiently."
      illustration="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&crop=center"
      tips={tips}
      action={onCreateTask ? {
        label: "Create Task",
        onClick: handleCreateTask
      } : undefined}
      secondaryAction={{
        label: "Use Planning Agent",
        onClick: handlePlanningAgent
      }}
      tertiaryAction={{
        label: "View Workflows",
        onClick: handleViewWorkflows
      }}
    />
  );
};
