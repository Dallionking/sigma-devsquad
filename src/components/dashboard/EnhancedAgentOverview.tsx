
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Bot, Layers, Code, Server, TestTube, FileText, Settings as SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EnhancedAgentCard } from "@/components/cards/EnhancedAgentCard";
import { Agent } from "@/types";

interface EnhancedAgentOverviewProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent | null) => void;
}

const getAgentIcon = (type: string) => {
  switch (type) {
    case 'planning': return Layers;
    case 'frontend': return Code;
    case 'backend': return Server;
    case 'qa': return TestTube;
    case 'documentation': return FileText;
    case 'devops': return SettingsIcon;
    default: return Bot;
  }
};

const getAgentColor = (type: string) => {
  switch (type) {
    case 'planning': return 'bg-blue-500';
    case 'frontend': return 'bg-green-500';
    case 'backend': return 'bg-purple-500';
    case 'qa': return 'bg-orange-500';
    case 'documentation': return 'bg-yellow-500';
    case 'devops': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'working': return 'bg-green-100 text-green-800';
    case 'idle': return 'bg-gray-100 text-gray-800';
    case 'waiting': return 'bg-yellow-100 text-yellow-800';
    case 'error': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const EnhancedAgentOverview = ({ agents, onAgentSelect }: EnhancedAgentOverviewProps) => {
  const navigate = useNavigate();

  const handleAddAgent = () => {
    console.log("Add Agent button clicked");
    navigate("/agent-creation");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Agent Overview
        </CardTitle>
        <Button 
          size="sm" 
          onClick={handleAddAgent}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Agent
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {agents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">No agents configured yet</p>
              <p className="text-xs">Create your first agent to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {agents.slice(0, 2).map((agent) => (
                <EnhancedAgentCard
                  key={agent.id}
                  agent={agent}
                  compact={true}
                  onInteract={() => console.log("Interact with agent:", agent.name)}
                  onConfigure={() => console.log("Configure agent:", agent.name)}
                  onToggleStatus={() => console.log("Toggle agent status:", agent.name)}
                />
              ))}
            </div>
          )}
          
          {agents.length > 2 && (
            <div className="pt-2 text-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/agent-configuration")}
              >
                View All Agents ({agents.length})
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
