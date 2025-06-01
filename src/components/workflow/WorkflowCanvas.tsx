
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Agent } from "@/types";
import { Workflow, Bot, ArrowRight } from "lucide-react";
import { EnhancedAgentCard } from "../cards/EnhancedAgentCard";

interface WorkflowCanvasProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent | null) => void;
  selectedAgent: Agent | null;
}

export const WorkflowCanvas = ({ agents, onAgentSelect, selectedAgent }: WorkflowCanvasProps) => {
  const workingAgents = agents.filter(agent => agent.status === 'working');
  const idleAgents = agents.filter(agent => agent.status === 'idle');

  return (
    <div className="h-full flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="w-5 h-5" />
            Workflow Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Active Workflow Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bot className="w-4 h-4" />
              Active Agents ({workingAgents.length})
            </h3>
            {workingAgents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workingAgents.map((agent) => (
                  <div 
                    key={agent.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedAgent?.id === agent.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => onAgentSelect(agent)}
                  >
                    <EnhancedAgentCard agent={agent} compact />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Bot className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No agents are currently working</p>
              </div>
            )}
          </div>

          {/* Workflow Pipeline */}
          {workingAgents.length > 1 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Workflow Pipeline</h3>
              <div className="flex items-center gap-4 overflow-x-auto pb-4">
                {workingAgents.map((agent, index) => (
                  <React.Fragment key={agent.id}>
                    <div className="flex flex-col items-center min-w-[200px]">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Bot className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-sm font-medium text-center">{agent.name}</p>
                      <p className="text-xs text-muted-foreground text-center">{agent.currentTask}</p>
                    </div>
                    {index < workingAgents.length - 1 && (
                      <ArrowRight className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Available Agents */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              Available Agents ({idleAgents.length})
            </h3>
            {idleAgents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {idleAgents.map((agent) => (
                  <div 
                    key={agent.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedAgent?.id === agent.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => onAgentSelect(agent)}
                  >
                    <EnhancedAgentCard agent={agent} compact />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <p>All agents are currently busy</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
