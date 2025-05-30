
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Bot, Layers, Code, Server, TestTube, FileText, Settings as SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
            agents.slice(0, 3).map((agent) => {
              const Icon = getAgentIcon(agent.type);
              const colorClass = getAgentColor(agent.type);
              const statusColorClass = getStatusColor(agent.status);
              
              return (
                <div
                  key={agent.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                  onClick={() => onAgentSelect(agent)}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className={`${colorClass} text-white`}>
                      <Icon className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium truncate">{agent.name}</h3>
                      <Badge className={`text-xs ${statusColorClass}`}>
                        {agent.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {agent.currentTask}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">
                      {agent.progress}%
                    </div>
                  </div>
                </div>
              );
            })
          )}
          
          {agents.length > 3 && (
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
