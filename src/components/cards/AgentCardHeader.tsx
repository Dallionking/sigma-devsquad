
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bot, Settings, MessageSquare, MoreVertical, Activity, Clock, AlertCircle } from "lucide-react";
import { Agent } from "@/types";

interface AgentCardHeaderProps {
  agent: Agent;
  onConfigure?: () => void;
  onInteract?: () => void;
  onToggleDetails: () => void;
}

export const AgentCardHeader = ({ 
  agent, 
  onConfigure, 
  onInteract, 
  onToggleDetails 
}: AgentCardHeaderProps) => {
  const getStatusIcon = () => {
    switch (agent.status) {
      case "working": return <Activity className="w-4 h-4 text-green-600" />;
      case "idle": return <Clock className="w-4 h-4 text-slate-400" />;
      case "waiting": return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case "error": return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Bot className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-blue-100 text-blue-600">
            <Bot className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
        
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-sm">{agent.name}</h3>
            {getStatusIcon()}
          </div>
          <p className="text-xs text-muted-foreground capitalize">{agent.type}</p>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onInteract?.();
          }}
        >
          <MessageSquare className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onConfigure?.();
          }}
        >
          <Settings className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onToggleDetails();
          }}
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
