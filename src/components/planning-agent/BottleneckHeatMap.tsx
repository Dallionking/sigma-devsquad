
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Agent, Message } from "@/types";
import { TrendingUp, AlertTriangle, Clock, Filter, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottleneckData {
  agentId: string;
  agentName: string;
  agentType: string;
  severity: "low" | "medium" | "high" | "critical";
  metrics: {
    avgResponseTime: number;
    queueLength: number;
    errorRate: number;
    throughput: number;
  };
  indicators: Array<{
    type: string;
    description: string;
    impact: string;
  }>;
}

interface BottleneckHeatMapProps {
  agents: Agent[];
  messages: Message[];
  timeRange: string;
}

export const BottleneckHeatMap = ({
  agents,
  messages,
  timeRange
}: BottleneckHeatMapProps) => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"heatmap" | "details">("heatmap");

  // Calculate bottleneck data for each agent
  const bottleneckData = useMemo(() => {
    return agents.map(agent => {
      const agentMessages = messages.filter(m => 
        m.from === agent.type || m.to === agent.type
      );
      
      // Calculate metrics
      const responseMessages = agentMessages.filter(m => m.type === "response");
      const avgResponseTime = responseMessages.length > 0 ? 
        responseMessages.reduce((acc, m) => acc + Math.random() * 5000, 0) / responseMessages.length : 0;
      
      const queueLength = agentMessages.filter(m => 
        m.type === "request" && new Date(m.timestamp).getTime() > Date.now() - 300000
      ).length;
      
      const errorRate = Math.random() * 0.1; // Mock error rate
      const throughput = agentMessages.length / 24; // Messages per hour

      // Determine severity based on metrics
      let severity: "low" | "medium" | "high" | "critical" = "low";
      if (avgResponseTime > 4000 || queueLength > 5 || errorRate > 0.05) severity = "critical";
      else if (avgResponseTime > 2000 || queueLength > 3 || errorRate > 0.03) severity = "high";
      else if (avgResponseTime > 1000 || queueLength > 1 || errorRate > 0.01) severity = "medium";

      // Generate indicators
      const indicators = [];
      if (avgResponseTime > 2000) {
        indicators.push({
          type: "High Response Time",
          description: `Average response time: ${(avgResponseTime / 1000).toFixed(1)}s`,
          impact: "Delays downstream agents"
        });
      }
      if (queueLength > 2) {
        indicators.push({
          type: "Queue Backlog",
          description: `${queueLength} pending requests`,
          impact: "Increasing wait times"
        });
      }
      if (errorRate > 0.02) {
        indicators.push({
          type: "High Error Rate",
          description: `${(errorRate * 100).toFixed(1)}% error rate`,
          impact: "Frequent retries and delays"
        });
      }

      return {
        agentId: agent.id,
        agentName: agent.name,
        agentType: agent.type,
        severity,
        metrics: {
          avgResponseTime: Math.round(avgResponseTime),
          queueLength,
          errorRate: Math.round(errorRate * 1000) / 10,
          throughput: Math.round(throughput * 10) / 10
        },
        indicators
      } as BottleneckData;
    });
  }, [agents, messages, timeRange]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-300";
    }
  };

  const getSeverityIntensity = (severity: string) => {
    switch (severity) {
      case "critical": return "opacity-100";
      case "high": return "opacity-80";
      case "medium": return "opacity-60";
      case "low": return "opacity-40";
      default: return "opacity-20";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium">Bottleneck Heat Map Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Identify workflow bottlenecks and performance issues across agents
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "heatmap" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("heatmap")}
            >
              Heat Map
            </Button>
            <Button
              variant={viewMode === "details" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("details")}
            >
              Details
            </Button>
          </div>
        </div>

        {/* Summary metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <div>
                <div className="text-lg font-bold">
                  {bottleneckData.filter(d => d.severity === "critical").length}
                </div>
                <div className="text-xs text-muted-foreground">Critical Issues</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <div>
                <div className="text-lg font-bold">
                  {Math.round(bottleneckData.reduce((acc, d) => acc + d.metrics.avgResponseTime, 0) / bottleneckData.length)}ms
                </div>
                <div className="text-xs text-muted-foreground">Avg Response</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-lg font-bold">
                  {bottleneckData.reduce((acc, d) => acc + d.metrics.queueLength, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Queued Items</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <div>
                <div className="text-lg font-bold">
                  {Math.round(bottleneckData.reduce((acc, d) => acc + d.metrics.throughput, 0) * 10) / 10}
                </div>
                <div className="text-xs text-muted-foreground">Throughput/h</div>
              </div>
            </div>
          </Card>
        </div>

        {viewMode === "heatmap" ? (
          /* Heat Map View */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bottleneckData.map(agent => (
              <div
                key={agent.agentId}
                className={cn(
                  "relative p-4 rounded-lg border-2 cursor-pointer transition-all",
                  getSeverityColor(agent.severity),
                  getSeverityIntensity(agent.severity),
                  selectedAgent === agent.agentId ? "ring-2 ring-blue-500" : "",
                  "hover:scale-105"
                )}
                onClick={() => setSelectedAgent(selectedAgent === agent.agentId ? null : agent.agentId)}
              >
                <div className="text-center text-white">
                  <h4 className="font-medium text-sm mb-1">{agent.agentName}</h4>
                  <Badge variant="secondary" className="text-xs mb-2">
                    {agent.severity.toUpperCase()}
                  </Badge>
                  
                  <div className="space-y-1 text-xs">
                    <div>{agent.metrics.avgResponseTime}ms response</div>
                    <div>{agent.metrics.queueLength} queued</div>
                    <div>{agent.metrics.errorRate}% errors</div>
                  </div>
                </div>
                
                {/* Severity pulse animation for critical issues */}
                {agent.severity === "critical" && (
                  <div className="absolute inset-0 rounded-lg bg-red-500 opacity-30 animate-ping" />
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Details View */
          <div className="space-y-4">
            {bottleneckData
              .sort((a, b) => {
                const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
                return severityOrder[b.severity] - severityOrder[a.severity];
              })
              .map(agent => (
                <Card
                  key={agent.agentId}
                  className={cn(
                    "p-4",
                    selectedAgent === agent.agentId && "ring-2 ring-blue-500"
                  )}
                  onClick={() => setSelectedAgent(selectedAgent === agent.agentId ? null : agent.agentId)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={cn("w-4 h-4 rounded-full", getSeverityColor(agent.severity))} />
                      <h4 className="font-medium">{agent.agentName}</h4>
                      <Badge variant="outline">{agent.agentType}</Badge>
                    </div>
                    
                    <Badge variant={agent.severity === "critical" ? "destructive" : "secondary"}>
                      {agent.severity.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <div className="text-lg font-bold">{agent.metrics.avgResponseTime}ms</div>
                      <div className="text-xs text-muted-foreground">Response Time</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <div className="text-lg font-bold">{agent.metrics.queueLength}</div>
                      <div className="text-xs text-muted-foreground">Queue Length</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <div className="text-lg font-bold">{agent.metrics.errorRate}%</div>
                      <div className="text-xs text-muted-foreground">Error Rate</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <div className="text-lg font-bold">{agent.metrics.throughput}</div>
                      <div className="text-xs text-muted-foreground">Throughput/h</div>
                    </div>
                  </div>
                  
                  {agent.indicators.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Performance Indicators:</h5>
                      {agent.indicators.map((indicator, index) => (
                        <div key={index} className="p-2 bg-muted/30 rounded text-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-orange-600">{indicator.type}</span>
                            <Badge variant="outline" className="text-xs">Impact</Badge>
                          </div>
                          <div className="text-muted-foreground text-xs mb-1">{indicator.description}</div>
                          <div className="text-xs">{indicator.impact}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 p-4 bg-muted/20 rounded-lg">
          <h5 className="font-medium text-sm mb-3">Severity Legend:</h5>
          <div className="flex items-center space-x-6">
            {[
              { level: "critical", label: "Critical", description: "Immediate attention required" },
              { level: "high", label: "High", description: "Significant performance impact" },
              { level: "medium", label: "Medium", description: "Moderate performance impact" },
              { level: "low", label: "Low", description: "Minor performance impact" }
            ].map(({ level, label, description }) => (
              <div key={level} className="flex items-center space-x-2">
                <div className={cn("w-3 h-3 rounded-full", getSeverityColor(level))} />
                <div>
                  <div className="text-sm font-medium">{label}</div>
                  <div className="text-xs text-muted-foreground">{description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
