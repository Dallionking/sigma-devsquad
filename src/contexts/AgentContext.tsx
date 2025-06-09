
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Agent, AgentType } from '@/types';
import { mockAgents } from '@/data/mockData';

interface AgentConfig {
  templateId: string | null;
  role: AgentType | null;
  customRole: string;
  specialization: string;
  background: string;
  capabilities: Record<string, boolean>;
  name: string;
  icon: string;
  description: string;
}

interface AgentContextType {
  agents: Agent[];
  addAgent: (config: AgentConfig) => Agent;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  removeAgent: (id: string) => void;
  getAgentById: (id: string) => Agent | undefined;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const useAgents = () => {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgents must be used within an AgentProvider');
  }
  return context;
};

export const AgentProvider = ({ children }: { children: ReactNode }) => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);

  const addAgent = (config: AgentConfig): Agent => {
    const newAgent: Agent = {
      id: `agent_${Date.now()}`,
      name: config.name,
      type: config.role || 'planning',
      status: 'idle',
      currentTask: 'Ready for assignments',
      progress: 0,
      lastActive: new Date().toISOString(),
      capabilities: Object.keys(config.capabilities).filter(key => config.capabilities[key]),
      specialization: config.specialization,
      background: config.background,
      description: config.description
    };

    setAgents(prev => [...prev, newAgent]);
    console.log('New agent created:', newAgent);
    return newAgent;
  };

  const updateAgent = (id: string, updates: Partial<Agent>) => {
    setAgents(prev => prev.map(agent => 
      agent.id === id ? { ...agent, ...updates } : agent
    ));
  };

  const removeAgent = (id: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== id));
  };

  const getAgentById = (id: string) => {
    return agents.find(agent => agent.id === id);
  };

  return (
    <AgentContext.Provider value={{
      agents,
      addAgent,
      updateAgent,
      removeAgent,
      getAgentById
    }}>
      {children}
    </AgentContext.Provider>
  );
};
