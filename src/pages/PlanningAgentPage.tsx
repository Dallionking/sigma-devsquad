
import { useState } from 'react';
import { ResponsivePlanningLayout } from '@/components/planning-agent/ResponsivePlanningLayout';

export const PlanningAgentPage = () => {
  const [selectedProject] = useState("Default Project");

  const handleCreateTask = () => {
    console.log("Creating new task");
    // Here you would typically handle task creation logic
  };

  const handleTrackWorkflow = () => {
    console.log("Tracking workflow");
    // Here you would typically handle workflow tracking logic
  };

  return (
    <ResponsivePlanningLayout 
      selectedProject={selectedProject}
      onCreateTask={handleCreateTask}
      onTrackWorkflow={handleTrackWorkflow}
    />
  );
};
