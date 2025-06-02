
import { useState } from 'react';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { Agent } from '@/types';

export const DashboardPage = () => {
  // Mock agents data for the dashboard
  const mockAgents: Agent[] = [
    {
      id: "1",
      type: "planning",
      name: "Planning Agent",
      status: "working",
      currentTask: "Project Analysis",
      progress: 75,
      lastActive: new Date().toISOString(),
      capabilities: ["requirement-analysis", "project-planning"],
      specialization: "Project Planning",
      background: "Expert in project planning and requirements analysis",
      description: "Analyzes requirements and creates project roadmaps"
    },
    {
      id: "2", 
      type: "frontend",
      name: "Frontend Agent",
      status: "idle",
      currentTask: "Ready",
      progress: 0,
      lastActive: new Date().toISOString(),
      capabilities: ["react-development", "ui-design"],
      specialization: "Frontend Development", 
      background: "Expert in React and modern frontend technologies",
      description: "Builds user interfaces and client-side functionality"
    },
    {
      id: "3",
      type: "backend", 
      name: "Backend Agent",
      status: "working",
      currentTask: "API Development",
      progress: 60,
      lastActive: new Date().toISOString(),
      capabilities: ["api-development", "database-design"],
      specialization: "Backend Development",
      background: "Expert in server-side development and databases", 
      description: "Develops APIs and manages backend infrastructure"
    }
  ];

  const handleAgentSelect = (agent: Agent) => {
    console.log("Selected agent:", agent);
    // Here you would typically handle agent selection logic
  };

  return (
    <DashboardOverview 
      agents={mockAgents}
      onAgentSelect={handleAgentSelect}
    />
  );
};
