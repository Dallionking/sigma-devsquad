
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  PlayCircle, 
  PauseCircle, 
  AlertTriangle, 
  Clock, 
  Activity,
  TrendingUp,
  MessageSquare,
  Settings
} from "lucide-react";
import { VisualizationToolsTooltip } from "./VisualizationToolsTooltip";

interface CommunicationMetrics {
  activeConnections: number;
  bottlenecks: number;
  decisionsPending: number;
  interventionsNeeded: number;
}

interface CommunicationToolsHeaderProps {
  isRealTimeActive: boolean;
  onToggleRealTime: () => void;
  metrics: CommunicationMetrics;
}

const visualizationTools = [
  {
    name: "Real-time Flow",
    description: "Live visualization of agent communication patterns and message flow",
    useCase: "Monitoring current system performance and identifying active communication paths",
    features: ["Live message tracking", "Connection strength indicators", "Real-time performance metrics"]
  },
  {
    name: "Decision Points",
    description: "Identifies critical decision moments and potential intervention opportunities",
    useCase: "Understanding where agents need guidance or manual intervention",
    features: ["Decision tree visualization", "Confidence scoring", "Intervention suggestions"]
  },
  {
    name: "Bottleneck Analysis",
    description: "Heat map showing communication bottlenecks and performance constraints",
    useCase: "Optimizing system performance and identifying workflow inefficiencies",
    features: ["Performance heat maps", "Throughput analysis", "Resource utilization tracking"]
  },
  {
    name: "Historical Timeline",
    description: "Time-based analysis of communication patterns and system evolution",
    useCase: "Understanding trends, patterns, and system behavior over time",
    features: ["Timeline visualization", "Pattern recognition", "Trend analysis"]
  }
];

export const CommunicationToolsHeader = ({ 
  isRealTimeActive, 
  onToggleRealTime, 
  metrics 
}: CommunicationToolsHeaderProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Communication Analysis Dashboard</h2>
            <VisualizationToolsTooltip tools={visualizationTools} />
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isRealTimeActive ? "default" : "outline"}
                  size="sm"
                  onClick={onToggleRealTime}
                  className="flex items-center gap-2"
                >
                  {isRealTimeActive ? (
                    <PauseCircle className="w-4 h-4" />
                  ) : (
                    <PlayCircle className="w-4 h-4" />
                  )}
                  {isRealTimeActive ? "Pause" : "Resume"} Live Analysis
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isRealTimeActive 
                  ? "Pause real-time updates to focus on current data"
                  : "Resume live monitoring of agent communications"
                }
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Real-time Status Indicators */}
          <TooltipProvider>
            <div className="flex items-center space-x-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">{metrics.activeConnections}</span>
                    <span className="text-xs text-muted-foreground">Active</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Active communication connections in the last 5 minutes
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3 text-yellow-500" />
                    <span className="text-sm font-medium">{metrics.bottlenecks}</span>
                    <span className="text-xs text-muted-foreground">Bottlenecks</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Communication bottlenecks requiring attention
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-blue-500" />
                    <span className="text-sm font-medium">{metrics.decisionsPending}</span>
                    <span className="text-xs text-muted-foreground">Pending</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Decisions awaiting agent or human intervention
                </TooltipContent>
              </Tooltip>
              
              {metrics.interventionsNeeded > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="destructive" className="animate-pulse">
                      {metrics.interventionsNeeded} Interventions Needed
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    Critical issues requiring immediate human intervention
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </TooltipProvider>
        </div>
      </div>
    </Card>
  );
};
