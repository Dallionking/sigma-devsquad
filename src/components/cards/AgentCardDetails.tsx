
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, CheckCircle } from "lucide-react";
import { Agent } from "@/types";

interface AgentCardDetailsProps {
  agent: Agent;
  showDetails: boolean;
  onToggleStatus?: () => void;
}

export const AgentCardDetails = ({ agent, showDetails, onToggleStatus }: AgentCardDetailsProps) => {
  const capabilities = [
    "Code Generation", "Testing", "Documentation", "Debugging", "Optimization"
  ];

  const recentTasks = [
    "Implemented user authentication",
    "Fixed payment gateway bug", 
    "Updated API documentation"
  ];

  if (!showDetails) return null;

  return (
    <div className="space-y-3 pt-3 border-t">
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">Capabilities</p>
        <div className="flex flex-wrap gap-1">
          {capabilities.slice(0, 3).map((capability) => (
            <Badge key={capability} variant="secondary" className="text-xs">
              {capability}
            </Badge>
          ))}
          {capabilities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{capabilities.length - 3} more
            </Badge>
          )}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">Recent Tasks</p>
        <div className="space-y-1">
          {recentTasks.slice(0, 2).map((task, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span className="line-clamp-1">{task}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          variant={agent.status === "working" ? "secondary" : "default"}
          size="sm"
          className="flex-1"
          onClick={onToggleStatus}
        >
          {agent.status === "working" ? (
            <>
              <Pause className="w-3 h-3 mr-1" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-3 h-3 mr-1" />
              Start
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
