
import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Agent, Message } from "@/types";
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

interface OptimizationSuggestion {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: "performance" | "communication" | "workflow" | "efficiency";
  actionable: boolean;
  metrics?: {
    current: string;
    potential: string;
  };
}

interface OptimizationSuggestionsProps {
  messages: Message[];
  agents: Agent[];
}

export const OptimizationSuggestions = ({
  messages,
  agents
}: OptimizationSuggestionsProps) => {
  
  const suggestions = useMemo(() => {
    const suggestions: OptimizationSuggestion[] = [];
    
    // Analyze communication patterns for suggestions
    const messagesByAgent = agents.map(agent => ({
      agent,
      sent: messages.filter(m => m.from === agent.type).length,
      received: messages.filter(m => m.to === agent.type).length
    }));
    
    // Find agents with imbalanced communication
    const imbalancedAgents = messagesByAgent.filter(a => 
      Math.abs(a.sent - a.received) > 10
    );
    
    if (imbalancedAgents.length > 0) {
      suggestions.push({
        id: "comm-balance",
        title: "Balance Communication Load",
        description: `${imbalancedAgents.length} agents have significantly imbalanced send/receive ratios`,
        impact: "medium",
        category: "communication",
        actionable: true,
        metrics: {
          current: `${imbalancedAgents.length} imbalanced`,
          potential: "Balanced workflow"
        }
      });
    }
    
    // Analyze response times
    const slowResponders = agents.filter(agent => 
      agent.status === "waiting" || Math.random() > 0.7 // Mock slow response detection
    );
    
    if (slowResponders.length > 0) {
      suggestions.push({
        id: "response-time",
        title: "Optimize Response Times",
        description: "Some agents are showing slower than optimal response times",
        impact: "high",
        category: "performance",
        actionable: true,
        metrics: {
          current: "3.2s avg",
          potential: "1.8s avg"
        }
      });
    }
    
    // Check for communication bottlenecks
    const busyAgents = messagesByAgent
      .filter(a => a.sent + a.received > messages.length * 0.3)
      .map(a => a.agent.name);
    
    if (busyAgents.length > 0) {
      suggestions.push({
        id: "bottleneck",
        title: "Reduce Communication Bottlenecks",
        description: `${busyAgents.join(", ")} may be communication bottlenecks`,
        impact: "high",
        category: "workflow",
        actionable: true,
        metrics: {
          current: `${busyAgents.length} bottlenecks`,
          potential: "Distributed load"
        }
      });
    }
    
    // Suggest automation opportunities
    const repetitiveMessages = messages.filter(m => 
      messages.some(other => 
        other.id !== m.id && 
        other.content.toLowerCase().includes(m.content.toLowerCase().substring(0, 20))
      )
    );
    
    if (repetitiveMessages.length > 5) {
      suggestions.push({
        id: "automation",
        title: "Automate Repetitive Communications",
        description: "Detected repetitive message patterns that could be automated",
        impact: "medium",
        category: "efficiency",
        actionable: true,
        metrics: {
          current: `${repetitiveMessages.length} repetitive`,
          potential: "50% reduction"
        }
      });
    }
    
    // Message type optimization
    const messageTypes = messages.reduce((acc, m) => {
      acc[m.type] = (acc[m.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    if (messageTypes.direct && messageTypes.direct > messageTypes.broadcast * 3) {
      suggestions.push({
        id: "broadcast",
        title: "Increase Broadcast Usage",
        description: "Many direct messages could be optimized as broadcasts",
        impact: "low",
        category: "efficiency",
        actionable: true,
        metrics: {
          current: `${messageTypes.direct} direct`,
          potential: "30% as broadcasts"
        }
      });
    }
    
    return suggestions.sort((a, b) => {
      const impactOrder = { high: 3, medium: 2, low: 1 };
      return impactOrder[b.impact] - impactOrder[a.impact];
    });
  }, [messages, agents]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-red-600 bg-red-100 dark:bg-red-900/20";
      case "medium": return "text-orange-600 bg-orange-100 dark:bg-orange-900/20";
      case "low": return "text-blue-600 bg-blue-100 dark:bg-blue-900/20";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "performance": return <TrendingUp className="w-4 h-4" />;
      case "communication": return <AlertTriangle className="w-4 h-4" />;
      case "workflow": return <CheckCircle className="w-4 h-4" />;
      case "efficiency": return <Lightbulb className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium">Optimization Suggestions</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered recommendations to improve communication efficiency
            </p>
          </div>
          <Badge variant="secondary">
            {suggestions.length} suggestions
          </Badge>
        </div>

        {suggestions.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-3" />
            <h4 className="font-medium mb-2">All Systems Optimized!</h4>
            <p className="text-sm text-muted-foreground">
              No optimization opportunities detected at this time.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <Card key={suggestion.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getImpactColor(suggestion.impact)}`}>
                      {getCategoryIcon(suggestion.category)}
                    </div>
                    <div>
                      <h4 className="font-medium">{suggestion.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={suggestion.impact === "high" ? "destructive" : 
                               suggestion.impact === "medium" ? "default" : "secondary"}
                    >
                      {suggestion.impact} impact
                    </Badge>
                    <Badge variant="outline">
                      {suggestion.category}
                    </Badge>
                  </div>
                </div>

                {suggestion.metrics && (
                  <div className="flex items-center space-x-4 mb-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">Current:</span>
                      <span className="font-medium">{suggestion.metrics.current}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">Potential:</span>
                      <span className="font-medium text-green-600">
                        {suggestion.metrics.potential}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    {suggestion.actionable ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Actionable recommendation</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span>Requires manual review</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                    {suggestion.actionable && (
                      <Button size="sm">
                        Apply Optimization
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Summary */}
        {suggestions.length > 0 && (
          <div className="mt-6 p-4 bg-muted/10 rounded-lg">
            <h5 className="font-medium mb-2">Optimization Summary</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">High Impact:</span>
                <span className="ml-2 font-medium">
                  {suggestions.filter(s => s.impact === "high").length} suggestions
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Actionable:</span>
                <span className="ml-2 font-medium">
                  {suggestions.filter(s => s.actionable).length} ready to apply
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Categories:</span>
                <span className="ml-2 font-medium">
                  {[...new Set(suggestions.map(s => s.category))].length} areas
                </span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
