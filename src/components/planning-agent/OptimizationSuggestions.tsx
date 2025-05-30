import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Agent, Message } from "@/types";
import { Lightbulb, AlertTriangle, CheckCircle, TrendingUp, Clock, Users } from "lucide-react";

interface OptimizationSuggestionsProps {
  messages: Message[];
  agents: Agent[];
}

export const OptimizationSuggestions = ({ messages, agents }: OptimizationSuggestionsProps) => {
  // Analyze communication patterns for optimization opportunities
  const analyzePatterns = () => {
    const suggestions = [];
    
    // Check response rate
    const requests = messages.filter(m => m.type === "request").length;
    const responses = messages.filter(m => m.type === "response").length;
    const responseRate = requests > 0 ? (responses / requests) * 100 : 100;
    
    if (responseRate < 80) {
      suggestions.push({
        type: "warning",
        category: "Response Rate",
        title: "Low Response Rate Detected",
        description: `Only ${responseRate.toFixed(1)}% of requests are getting responses. Consider improving agent responsiveness.`,
        impact: "High",
        effort: "Medium",
        actions: ["Review agent workload distribution", "Implement response time monitoring", "Add automated reminders"]
      });
    }
    
    // Check for idle agents
    const idleAgents = agents.filter(a => a.status === "idle").length;
    if (idleAgents > 0) {
      suggestions.push({
        type: "info",
        category: "Resource Utilization",
        title: "Underutilized Agents",
        description: `${idleAgents} agent${idleAgents !== 1 ? "s are" : " is"} currently idle. Consider redistributing workload.`,
        impact: "Medium",
        effort: "Low",
        actions: ["Redistribute pending tasks", "Implement dynamic task assignment", "Review agent capabilities"]
      });
    }
    
    // Check for communication bottlenecks
    const waitingAgents = agents.filter(a => a.status === "waiting").length;
    if (waitingAgents > 1) {
      suggestions.push({
        type: "warning",
        category: "Workflow Efficiency",
        title: "Communication Bottleneck",
        description: `${waitingAgents} agents are waiting for responses, indicating potential workflow bottlenecks.`,
        impact: "High",
        effort: "Medium",
        actions: ["Identify blocking dependencies", "Implement parallel processing", "Add escalation procedures"]
      });
    }
    
    // Check message distribution
    const agentMessageCounts = agents.map(agent => ({
      agent,
      count: messages.filter(m => m.from === agent.type || m.to === agent.type).length
    }));
    
    const maxMessages = Math.max(...agentMessageCounts.map(a => a.count));
    const minMessages = Math.min(...agentMessageCounts.map(a => a.count));
    
    if (maxMessages > 0 && (maxMessages - minMessages) / maxMessages > 0.7) {
      suggestions.push({
        type: "info",
        category: "Load Balancing",
        title: "Uneven Communication Load",
        description: "Communication load is unevenly distributed across agents. Consider load balancing.",
        impact: "Medium",
        effort: "Medium",
        actions: ["Implement load balancing algorithms", "Monitor agent capacity", "Adjust task routing"]
      });
    }
    
    // Check for error states
    const errorAgents = agents.filter(a => a.status === "error").length;
    if (errorAgents > 0) {
      suggestions.push({
        type: "error",
        category: "System Health",
        title: "Agent Errors Detected",
        description: `${errorAgents} agent${errorAgents !== 1 ? "s have" : " has"} encountered errors and need attention.`,
        impact: "High",
        effort: "High",
        actions: ["Investigate error causes", "Implement error recovery", "Add health monitoring"]
      });
    }
    
    // Positive feedback for good performance
    if (responseRate >= 90 && waitingAgents === 0 && errorAgents === 0) {
      suggestions.push({
        type: "success",
        category: "Performance",
        title: "Excellent Communication Flow",
        description: "Your agent communication is performing optimally with high response rates and no bottlenecks.",
        impact: "Positive",
        effort: "None",
        actions: ["Maintain current practices", "Document successful patterns", "Share best practices"]
      });
    }
    
    return suggestions;
  };

  const suggestions = analyzePatterns();

  const getIconForType = (type: string) => {
    switch (type) {
      case "error": return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "warning": return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "success": return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Lightbulb className="w-5 h-5 text-blue-500" />;
    }
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case "error": return "border-red-200 bg-red-50";
      case "warning": return "border-yellow-200 bg-yellow-50";
      case "success": return "border-green-200 bg-green-50";
      default: return "border-blue-200 bg-blue-50";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      case "Positive": return "bg-green-100 text-green-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-2 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2" />
          Communication Optimization Suggestions
        </h3>
        <p className="text-muted-foreground">
          AI-powered recommendations to improve your agent communication efficiency
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <div>
              <div className="text-2xl font-bold">{suggestions.length}</div>
              <div className="text-sm text-muted-foreground">Suggestions</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <div>
              <div className="text-2xl font-bold">
                {suggestions.filter(s => s.impact === "High").length}
              </div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-yellow-500" />
            <div>
              <div className="text-2xl font-bold">
                {suggestions.filter(s => s.effort === "Low").length}
              </div>
              <div className="text-sm text-muted-foreground">Quick Fixes</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-green-500" />
            <div>
              <div className="text-2xl font-bold">
                {Math.round(((messages.filter(m => m.type === "response").length / messages.filter(m => m.type === "request").length) || 0) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Efficiency Score</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Optimization Suggestions */}
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <Card key={index} className={`p-6 border-l-4 ${getColorForType(suggestion.type)}`}>
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getIconForType(suggestion.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground">{suggestion.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {suggestion.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={getImpactColor(suggestion.impact)}>
                    {suggestion.impact} Impact
                  </Badge>
                  <Badge variant="outline">
                    {suggestion.effort} Effort
                  </Badge>
                </div>
              </div>

              {/* Actions */}
              <div>
                <h5 className="font-medium text-sm mb-2">Recommended Actions:</h5>
                <div className="space-y-2">
                  {suggestion.actions.map((action, actionIndex) => (
                    <div key={actionIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-2">
                <Button size="sm" variant="default">
                  Implement
                </Button>
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
                <Button size="sm" variant="ghost">
                  Dismiss
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Performance Metrics */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Communication Performance Metrics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium mb-3">Response Efficiency</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Response Rate</span>
                <span className="font-medium">
                  {Math.round(((messages.filter(m => m.type === "response").length / messages.filter(m => m.type === "request").length) || 0) * 100)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Average Response Time</span>
                <span className="font-medium">1.2s</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Unresolved Requests</span>
                <span className="font-medium">
                  {messages.filter(m => m.type === "request").length - messages.filter(m => m.type === "response").length}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Agent Utilization</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Active Agents</span>
                <span className="font-medium">
                  {agents.filter(a => a.status === "working").length}/{agents.length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Idle Agents</span>
                <span className="font-medium">{agents.filter(a => a.status === "idle").length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Error States</span>
                <span className="font-medium">{agents.filter(a => a.status === "error").length}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Communication Health</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Messages</span>
                <span className="font-medium">{messages.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Peak Hour Volume</span>
                <span className="font-medium">{Math.round(messages.length / 24)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Communication Score</span>
                <span className="font-medium text-green-600">85/100</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
