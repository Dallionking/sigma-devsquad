
import React from 'react';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import { useAgents } from '@/contexts/AgentContext';
import { Agent } from '@/types';

const Analytics = () => {
  const { agents } = useAgents();

  const handleAgentSelect = (agent: Agent | null) => {
    console.log('Selected agent:', agent);
    // Handle agent selection logic here if needed
  };

  return (
    <div className="min-h-screen bg-background">
      <AnalyticsDashboard 
        agents={agents}
        onAgentSelect={handleAgentSelect}
      />
    </div>
  );
};

export default Analytics;
