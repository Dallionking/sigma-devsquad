
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Agent } from "@/types";
import { Bot, Activity, Clock } from "lucide-react";

interface AgentGridProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent | null) => void;
  selectedAgent?: Agent | null;
}

export const AgentGrid = ({ agents, onAgentSelect, selectedAgent }: AgentGridProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "working": return "bg-green-500";
      case "idle": return "bg-yellow-500";
      case "waiting": return "bg-blue-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="w-5 h-5" />
          <span>Active Agents</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <Card 
              key={agent.id} 
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                selectedAgent?.id === agent.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => onAgentSelect(agent)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                    <span className="font-medium">{agent.name}</span>
                  </div>
                  <Badge variant="outline">{agent.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{agent.currentTask}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{agent.progress}%</span>
                  </div>
                  <Progress value={agent.progress} className="h-2" />
                </div>
                <div className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Last active: {agent.lastActive}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
