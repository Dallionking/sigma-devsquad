
import React, { useState } from 'react';
import { Crown, Code, Palette, TestTube, Rocket, Database, Bot, Activity } from 'lucide-react';

interface AgentNode {
  id: string;
  name: string;
  role: string;
  icon: React.ComponentType<{ className?: string }>;
  level: number;
  status: 'active' | 'idle' | 'completing';
  position: { x: number; y: number };
  connections: string[];
  task?: string;
}

interface HierarchicalTeamVisualizationProps {
  animationPhase: number;
}

export const HierarchicalTeamVisualization = ({ animationPhase }: HierarchicalTeamVisualizationProps) => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  const agentNodes: AgentNode[] = [
    {
      id: 'orchestrator',
      name: 'DevSquad Lead',
      role: 'Project Orchestrator',
      icon: Crown,
      level: 0,
      status: 'active',
      position: { x: 50, y: 15 },
      connections: ['frontend', 'backend', 'devops'],
      task: 'Coordinating team workflow'
    },
    {
      id: 'frontend',
      name: 'UI Agent',
      role: 'Frontend Development',
      icon: Palette,
      level: 1,
      status: 'active',
      position: { x: 20, y: 45 },
      connections: ['testing'],
      task: 'Building responsive components'
    },
    {
      id: 'backend',
      name: 'API Agent',
      role: 'Backend Development',
      icon: Database,
      level: 1,
      status: 'completing',
      position: { x: 50, y: 45 },
      connections: ['testing', 'devops'],
      task: 'Optimizing database queries'
    },
    {
      id: 'devops',
      name: 'Deploy Agent',
      role: 'DevOps & Infrastructure',
      icon: Rocket,
      level: 1,
      status: 'idle',
      position: { x: 80, y: 45 },
      connections: ['testing'],
      task: 'Preparing deployment pipeline'
    },
    {
      id: 'testing',
      name: 'QA Agent',
      role: 'Quality Assurance',
      icon: TestTube,
      level: 2,
      status: 'active',
      position: { x: 35, y: 75 },
      connections: [],
      task: 'Running integration tests'
    },
    {
      id: 'code-review',
      name: 'Review Agent',
      role: 'Code Review',
      icon: Code,
      level: 2,
      status: 'active',
      position: { x: 65, y: 75 },
      connections: [],
      task: 'Analyzing code quality'
    }
  ];

  const getStatusColor = (status: string, isSelected: boolean = false) => {
    const baseColors = {
      active: isSelected ? 'bg-vibe-primary text-white' : 'bg-vibe-primary/20 text-vibe-primary border-vibe-primary',
      completing: isSelected ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700 border-green-400',
      idle: isSelected ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-600 border-gray-300'
    };
    return baseColors[status as keyof typeof baseColors] || baseColors.idle;
  };

  const getConnectionOpacity = (fromId: string, toId: string) => {
    if (hoveredAgent === fromId || hoveredAgent === toId) return 'opacity-100';
    if (selectedAgent === fromId || selectedAgent === toId) return 'opacity-80';
    return 'opacity-30';
  };

  return (
    <div className="relative">
      <div className="vibe-card p-6 bg-gradient-to-br from-background/90 to-background border-2 border-vibe-primary/20 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="vibe-heading-md text-foreground">Agent Team Hierarchy</h3>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-vibe-primary animate-pulse" />
            <span className="text-sm text-vibe-primary font-medium">Live Collaboration</span>
          </div>
        </div>

        {/* Team Visualization */}
        <div className="relative h-80 bg-gradient-to-br from-vibe-primary/5 to-vibe-secondary/5 rounded-lg border border-vibe-primary/10 overflow-hidden">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {agentNodes.map((agent) =>
              agent.connections.map((connectionId) => {
                const connectedAgent = agentNodes.find(a => a.id === connectionId);
                if (!connectedAgent) return null;
                
                return (
                  <line
                    key={`${agent.id}-${connectionId}`}
                    x1={agent.position.x}
                    y1={agent.position.y}
                    x2={connectedAgent.position.x}
                    y2={connectedAgent.position.y}
                    stroke="rgba(99, 102, 241, 0.4)"
                    strokeWidth="1"
                    className={`transition-all duration-300 ${getConnectionOpacity(agent.id, connectionId)}`}
                    strokeDasharray="2 2"
                  />
                );
              })
            )}
          </svg>

          {/* Agent Nodes */}
          {agentNodes.map((agent, index) => (
            <div
              key={agent.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer group`}
              style={{
                left: `${agent.position.x}%`,
                top: `${agent.position.y}%`,
                animationDelay: `${index * 150}ms`
              }}
              onMouseEnter={() => setHoveredAgent(agent.id)}
              onMouseLeave={() => setHoveredAgent(null)}
              onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
            >
              {/* Agent Avatar */}
              <div 
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-300 ${
                  getStatusColor(agent.status, selectedAgent === agent.id)
                } hover:scale-110 relative z-10`}
              >
                <agent.icon className="w-5 h-5" />
                
                {/* Status Indicator */}
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                  agent.status === 'active' ? 'bg-green-500 animate-pulse' :
                  agent.status === 'completing' ? 'bg-blue-500' : 'bg-gray-400'
                }`} />
              </div>

              {/* Agent Info Tooltip */}
              <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-background border border-border rounded-lg shadow-lg transition-all duration-200 whitespace-nowrap z-20 ${
                hoveredAgent === agent.id || selectedAgent === agent.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
              }`}>
                <div className="text-xs font-medium text-foreground">{agent.name}</div>
                <div className="text-xs text-muted-foreground">{agent.role}</div>
                {agent.task && (
                  <div className="text-xs text-vibe-primary mt-1">{agent.task}</div>
                )}
                
                {/* Tooltip Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border" />
              </div>

              {/* Level Indicator */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="text-xs text-muted-foreground font-medium">
                  L{agent.level}
                </div>
              </div>
            </div>
          ))}

          {/* Flow Animation */}
          <div className="absolute inset-0 pointer-events-none">
            {agentNodes.filter(agent => agent.status === 'active').map((agent) => (
              <div
                key={`flow-${agent.id}`}
                className="absolute w-8 h-8 border border-vibe-primary/40 rounded-full animate-ping"
                style={{
                  left: `calc(${agent.position.x}% - 16px)`,
                  top: `calc(${agent.position.y}% - 16px)`,
                  animationDelay: `${animationPhase * 500}ms`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xs text-muted-foreground">Completing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span className="text-xs text-muted-foreground">Idle</span>
          </div>
        </div>

        {/* Selected Agent Details */}
        {selectedAgent && (
          <div className="mt-4 p-4 bg-vibe-primary/5 rounded-lg border border-vibe-primary/20">
            {(() => {
              const agent = agentNodes.find(a => a.id === selectedAgent);
              return agent ? (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <agent.icon className="w-5 h-5 text-vibe-primary" />
                    <div>
                      <div className="font-medium text-foreground">{agent.name}</div>
                      <div className="text-sm text-muted-foreground">{agent.role}</div>
                    </div>
                  </div>
                  {agent.task && (
                    <div className="text-sm text-muted-foreground">
                      <strong>Current Task:</strong> {agent.task}
                    </div>
                  )}
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
