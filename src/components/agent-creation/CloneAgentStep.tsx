
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Bot, Layers, Code, Server, TestTube, FileText, Settings as SettingsIcon } from "lucide-react";
import { Agent } from "@/types";

interface CloneAgentStepProps {
  selectedAgent: string | null;
  onAgentSelect: (agentId: string) => void;
  availableAgents: Agent[];
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

export const CloneAgentStep = ({ selectedAgent, onAgentSelect, availableAgents }: CloneAgentStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Clone Existing Agent</h2>
        <p className="text-muted-foreground">
          Select an existing agent to use as the foundation for your new agent
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedAgent || ""} onValueChange={onAgentSelect}>
            <div className="space-y-4">
              {availableAgents.map((agent) => {
                const Icon = getAgentIcon(agent.type);
                const colorClass = getAgentColor(agent.type);
                const statusColorClass = getStatusColor(agent.status);
                
                return (
                  <div key={agent.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={agent.id} id={agent.id} />
                    <Label htmlFor={agent.id} className="flex-1 cursor-pointer">
                      <Card className={`transition-all hover:shadow-md ${
                        selectedAgent === agent.id ? 'ring-2 ring-primary' : ''
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className={`${colorClass} text-white`}>
                                <Icon className="w-6 h-6" />
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="text-sm font-semibold truncate">{agent.name}</h3>
                                <Badge className={`text-xs ${statusColorClass}`}>
                                  {agent.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{agent.currentTask}</p>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <span>Type: {agent.type}</span>
                                <span>Progress: {agent.progress}%</span>
                                <span>
                                  Last Active: {new Date(agent.lastActive).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Label>
                  </div>
                );
              })}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {selectedAgent && (
        <Card>
          <CardHeader>
            <CardTitle>Clone Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium mb-2">What will be cloned:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Agent role and specialization settings</li>
                <li>• Configured capabilities and permissions</li>
                <li>• Background context and knowledge base</li>
                <li>• Performance and behavior settings</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">
                You'll be able to customize the cloned configuration in the following steps.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
