
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Agent } from "@/types";
import { cn } from "@/lib/utils";
import { AgentCardHeader } from "./AgentCardHeader";
import { AgentCardContent } from "./AgentCardContent";
import { AgentCardMetrics } from "./AgentCardMetrics";
import { AgentCardDetails } from "./AgentCardDetails";

interface EnhancedAgentCardProps {
  agent: Agent;
  onConfigure?: () => void;
  onInteract?: () => void;
  onToggleStatus?: () => void;
  compact?: boolean;
}

export const EnhancedAgentCard = ({ 
  agent, 
  onConfigure, 
  onInteract, 
  onToggleStatus,
  compact = false 
}: EnhancedAgentCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = () => {
    switch (agent.status) {
      case "working": return "border-l-green-500 bg-green-50/50";
      case "idle": return "border-l-slate-300 bg-slate-50/50";
      case "waiting": return "border-l-yellow-500 bg-yellow-50/50";
      case "error": return "border-l-red-500 bg-red-50/50";
      default: return "border-l-border bg-background";
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md cursor-pointer border-l-4 shadow-sm",
      getStatusColor(),
      compact ? "p-3" : "p-4"
    )}>
      <CardHeader className={cn("pb-3 space-y-2", compact && "pb-2")}>
        <AgentCardHeader
          agent={agent}
          onConfigure={onConfigure}
          onInteract={onInteract}
          onToggleDetails={() => setShowDetails(!showDetails)}
        />
      </CardHeader>

      <CardContent className="space-y-4">
        <AgentCardContent agent={agent} compact={compact} />
        <AgentCardMetrics compact={compact} />
        <AgentCardDetails
          agent={agent}
          showDetails={showDetails}
          onToggleStatus={onToggleStatus}
        />
      </CardContent>
    </Card>
  );
};
