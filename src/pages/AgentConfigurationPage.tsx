
import { useState } from 'react';
import { AgentConfigurationFlow } from '@/components/agent-config/AgentConfigurationFlow';
import { Agent } from '@/types';

export const AgentConfigurationPage = () => {
  // Mock agent data for the configuration flow
  const mockAgent: Agent = {
    id: "1",
    type: "planning",
    name: "Planning Agent",
    status: "idle",
    currentTask: "Ready for configuration",
    progress: 0,
    lastActive: new Date().toISOString(),
    capabilities: ["requirement-analysis", "project-planning"],
    specialization: "Project Planning",
    background: "Expert in project planning and requirements analysis",
    description: "Analyzes requirements and creates project roadmaps"
  };

  const handleSave = (config: any) => {
    console.log("Saving agent configuration:", config);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    console.log("Cancelling agent configuration");
    // Here you would typically navigate back or reset form
  };

  return (
    <AgentConfigurationFlow 
      agent={mockAgent}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};
