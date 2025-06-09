
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Agent, Message } from "@/types";
import { AlertTriangle, CheckCircle, Clock, ArrowRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface DecisionPoint {
  id: string;
  timestamp: string;
  type: "approval" | "routing" | "escalation" | "resource_allocation";
  description: string;
  status: "pending" | "resolved" | "blocked";
  priority: "low" | "medium" | "high" | "critical";
  involvedAgents: string[];
  options: Array<{
    id: string;
    label: string;
    description: string;
    impact: string;
  }>;
  autoResolveIn?: number;
}

interface DecisionPointsVisualizerProps {
  agents: Agent[];
  messages: Message[];
  onIntervention: (type: string, agentId: string, data: any) => void;
}

export const DecisionPointsVisualizer = ({
  agents,
  messages,
  onIntervention
}: DecisionPointsVisualizerProps) => {
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);

  // Mock decision points based on agent states and messages
  const decisionPoints: DecisionPoint[] = [
    {
      id: "dp-1",
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      type: "approval",
      description: "Frontend Agent requesting approval for new component architecture",
      status: "pending",
      priority: "high",
      involvedAgents: ["frontend", "planning"],
      autoResolveIn: 300,
      options: [
        {
          id: "approve",
          label: "Approve Architecture",
          description: "Proceed with the proposed component structure",
          impact: "Medium development velocity increase"
        },
        {
          id: "modify",
          label: "Request Modifications",
          description: "Ask for changes to the architecture",
          impact: "Delay but potentially better outcome"
        },
        {
          id: "reject",
          label: "Reject and Restart",
          description: "Go back to drawing board",
          impact: "Significant delay but clean slate"
        }
      ]
    },
    {
      id: "dp-2",
      timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
      type: "routing",
      description: "Task routing decision: Backend optimization task",
      status: "pending",
      priority: "medium",
      involvedAgents: ["backend", "devops"],
      options: [
        {
          id: "backend",
          label: "Assign to Backend Agent",
          description: "Handle optimization in application layer",
          impact: "Faster implementation, may need DevOps support later"
        },
        {
          id: "devops",
          label: "Assign to DevOps Agent",
          description: "Infrastructure-level optimization",
          impact: "More comprehensive solution, longer timeline"
        }
      ]
    },
    {
      id: "dp-3",
      timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
      type: "escalation",
      description: "QA Agent detected critical security vulnerability",
      status: "blocked",
      priority: "critical",
      involvedAgents: ["qa", "backend", "devops"],
      options: [
        {
          id: "immediate",
          label: "Immediate Fix",
          description: "Stop all work and fix vulnerability now",
          impact: "Project delay but security maintained"
        },
        {
          id: "scheduled",
          label: "Schedule Fix",
          description: "Continue current work, fix in next iteration",
          impact: "Potential security risk"
        }
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4 text-yellow-600" />;
      case "resolved": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "blocked": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const handleDecisionAction = (decisionId: string, optionId: string) => {
    const decision = decisionPoints.find(d => d.id === decisionId);
    if (decision) {
      onIntervention("decision", decision.involvedAgents[0], {
        decisionId,
        optionId,
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium">Decision Points Visualization</h3>
            <p className="text-sm text-muted-foreground">
              Critical decision points requiring human intervention or agent coordination
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="destructive">
              {decisionPoints.filter(d => d.priority === "critical").length} Critical
            </Badge>
            <Badge variant="secondary">
              {decisionPoints.filter(d => d.status === "pending").length} Pending
            </Badge>
          </div>
        </div>

        {/* Decision Points Timeline */}
        <div className="space-y-4">
          {decisionPoints
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map((decision, index) => (
              <div
                key={decision.id}
                className={cn(
                  "relative p-4 border rounded-lg cursor-pointer transition-all",
                  selectedDecision === decision.id ? "border-blue-500 bg-blue-50" : "border-border hover:border-blue-300",
                  decision.priority === "critical" && "ring-2 ring-red-200 animate-pulse"
                )}
                onClick={() => setSelectedDecision(selectedDecision === decision.id ? null : decision.id)}
              >
                {/* Timeline connector */}
                {index < decisionPoints.length - 1 && (
                  <div className="absolute left-8 bottom-0 w-0.5 h-4 bg-border transform translate-y-full" />
                )}
                
                <div className="flex items-start space-x-4">
                  {/* Priority indicator */}
                  <div className="flex items-center space-x-2">
                    <div className={cn("w-3 h-3 rounded-full", getPriorityColor(decision.priority))} />
                    {getStatusIcon(decision.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{decision.description}</h4>
                        <Badge variant="outline" className="text-xs">
                          {decision.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        {decision.autoResolveIn && (
                          <Badge variant="secondary">
                            Auto-resolve in {Math.floor(decision.autoResolveIn / 60)}m
                          </Badge>
                        )}
                        <span>{new Date(decision.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                    
                    {/* Involved agents */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-muted-foreground">Agents:</span>
                      {decision.involvedAgents.map(agentType => {
                        const agent = agents.find(a => a.type === agentType);
                        return (
                          <Badge key={agentType} variant="secondary" className="text-xs">
                            {agent?.name || agentType}
                          </Badge>
                        );
                      })}
                    </div>
                    
                    {/* Decision options - show when selected */}
                    {selectedDecision === decision.id && (
                      <div className="space-y-3 mt-4 pt-4 border-t border-border">
                        <h5 className="font-medium text-sm">Available Options:</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {decision.options.map(option => (
                            <Card key={option.id} className="p-3 hover:shadow-md transition-shadow">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h6 className="font-medium text-sm">{option.label}</h6>
                                  <Button
                                    size="sm"
                                    onClick={() => handleDecisionAction(decision.id, option.id)}
                                    className="h-6 px-2 text-xs"
                                  >
                                    Select
                                  </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">{option.description}</p>
                                <div className="text-xs">
                                  <span className="font-medium">Impact:</span> {option.impact}
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                        
                        {/* Quick actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Pause className="w-3 h-3 mr-1" />
                              Defer Decision
                            </Button>
                            <Button variant="outline" size="sm">
                              Request More Info
                            </Button>
                          </div>
                          
                          {decision.autoResolveIn && (
                            <Button variant="ghost" size="sm">
                              Cancel Auto-resolve
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};
