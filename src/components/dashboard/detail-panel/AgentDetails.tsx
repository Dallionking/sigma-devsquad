
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Agent } from "@/pages/Index";
import { 
  Bot, 
  Play, 
  Clock, 
  AlertCircle,
  Settings,
  Pause,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface AgentDetailsProps {
  agent: Agent;
}

export const AgentDetails = ({ agent }: AgentDetailsProps) => {
  const navigate = useNavigate();

  const statusConfig = {
    working: { icon: Play, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
    idle: { icon: Clock, color: "text-muted-foreground", bg: "bg-muted" },
    waiting: { icon: Clock, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
    error: { icon: AlertCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/20" }
  };

  const config = statusConfig[agent.status];
  const StatusIcon = config.icon;

  return (
    <div className="space-y-6">
      {/* Agent Header */}
      <div className="text-center">
        <div className={cn("w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center", config.bg)}>
          <Bot className={cn("w-8 h-8", config.color)} />
        </div>
        <h3 className="text-lg font-semibold text-card-foreground">{agent.name}</h3>
        <Badge 
          variant="secondary" 
          className={cn("mt-2", config.bg, config.color)}
        >
          <StatusIcon className="w-3 h-3 mr-1" />
          {agent.status}
        </Badge>
      </div>

      {/* Current Task */}
      <Card className="p-4">
        <h4 className="font-medium text-card-foreground mb-2">Current Task</h4>
        <p className="text-sm text-muted-foreground mb-3">{agent.currentTask}</p>
        
        {agent.status === "working" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-card-foreground font-medium">{agent.progress}%</span>
            </div>
            <Progress value={agent.progress} className="h-2" />
          </div>
        )}
      </Card>

      {/* Agent Stats */}
      <Card className="p-4">
        <h4 className="font-medium text-card-foreground mb-3">Statistics</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Last Active</span>
            <span className="text-sm text-card-foreground">
              {new Date(agent.lastActive).toLocaleTimeString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Status Duration</span>
            <span className="text-sm text-card-foreground">2h 15m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Tasks Completed</span>
            <span className="text-sm text-card-foreground">12</span>
          </div>
        </div>
      </Card>

      {/* Agent Controls */}
      <Card className="p-4">
        <h4 className="font-medium text-card-foreground mb-3">Controls</h4>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            disabled={agent.status === "error"}
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause Agent
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            disabled={agent.status !== "error"}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart Agent
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => navigate("/agent-configuration")}
          >
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </Card>
    </div>
  );
};
