
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Bot, Settings, Play, Pause, Activity, Clock, 
  CheckCircle, AlertCircle, MoreVertical, MessageSquare 
} from "lucide-react";
import { Agent } from "@/types";
import { cn } from "@/lib/utils";

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

  const capabilities = [
    "Code Generation", "Testing", "Documentation", "Debugging", "Optimization"
  ];

  const recentTasks = [
    "Implemented user authentication",
    "Fixed payment gateway bug", 
    "Updated API documentation"
  ];

  const getStatusIcon = () => {
    switch (agent.status) {
      case "working": return <Activity className="w-4 h-4 text-green-600" />;
      case "idle": return <Clock className="w-4 h-4 text-slate-400" />;
      case "waiting": return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case "error": return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Bot className="w-4 h-4" />;
    }
  };

  const getStatusColor = () => {
    switch (agent.status) {
      case "working": return "border-green-500 bg-green-50";
      case "idle": return "border-slate-300 bg-slate-50";
      case "waiting": return "border-yellow-500 bg-yellow-50";
      case "error": return "border-red-500 bg-red-50";
      default: return "border-border bg-background";
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-lg cursor-pointer",
      getStatusColor(),
      compact ? "p-3" : "p-4"
    )}>
      <CardHeader className={cn("pb-3", compact && "pb-2")}>
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
                setShowDetails(!showDetails);
              }}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Current Task */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Current Task</p>
          <p className="text-sm line-clamp-2">{agent.currentTask}</p>
        </div>

        {/* Progress */}
        {agent.status === "working" && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{agent.progress}%</span>
            </div>
            <Progress value={agent.progress} className="h-2" />
          </div>
        )}

        {/* Performance Metrics */}
        {!compact && (
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center p-2 bg-background rounded">
              <div className="font-semibold">94%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center p-2 bg-background rounded">
              <div className="font-semibold">2.3s</div>
              <div className="text-muted-foreground">Avg Response</div>
            </div>
            <div className="text-center p-2 bg-background rounded">
              <div className="font-semibold">15</div>
              <div className="text-muted-foreground">Tasks Today</div>
            </div>
          </div>
        )}

        {/* Capabilities */}
        {showDetails && (
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
        )}

        <div className="text-xs text-muted-foreground">
          Last active: {new Date(agent.lastActive).toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};
