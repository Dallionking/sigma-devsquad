
import React from 'react';
import { CheckSquare, Plus, MapPin } from 'lucide-react';
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

  return (
    <EmptyStateCard
      icon={CheckSquare}
      title="No tasks assigned"
      description="Start by creating tasks for your agents or use the Planning Agent to automatically break down your project into manageable tasks."
      action={onCreateTask ? {
        label: "Create Task",
        onClick: onCreateTask
      } : undefined}
      secondaryAction={{
        label: "Use Planning Agent",
        onClick: handlePlanningAgent
      }}
    />
  );
};
