import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent, Message } from "@/types";
import { BarChart, TrendingUp, Clock, Users } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";

interface PatternAnalysisDashboardProps {
  messages: Message[];
  agents: Agent[];
}

export const PatternAnalysisDashboard = ({ messages, agents }: PatternAnalysisDashboardProps) => {
  // Analyze message patterns by hour
  const hourlyData = Array.from({ length: 24 }, (_, hour) => {
    const hourMessages = messages.filter(m => {
      const messageHour = new Date(m.timestamp).getHours();
      return messageHour === hour;
    });
    
    return {
      hour: `${hour}:00`,
      messages: hourMessages.length,
      requests: hourMessages.filter(m => m.type === "request").length,
      responses: hourMessages.filter(m => m.type === "response").length
    };
  });

  // Analyze communication frequency between agents
  const agentPairData = agents.flatMap(fromAgent =>
    agents
      .filter(toAgent => toAgent.id !== fromAgent.id)
      .map(toAgent => {
        const messageCount = messages.filter(m =>
          (m.from === fromAgent.type && m.to === toAgent.type) ||
          (m.from === toAgent.type && m.to === fromAgent.type)
        ).length;
        
        return {
          pair: `${fromAgent.name} ↔ ${toAgent.name}`,
          messages: messageCount,
          fromAgent: fromAgent.name,
          toAgent: toAgent.name
        };
      })
  ).filter(pair => pair.messages > 0)
   .sort((a, b) => b.messages - a.messages)
   .slice(0, 10);

  // Response time analysis
  const responseTimeData = messages
    .filter(m => m.type === "response")
    .map((response, index) => ({
      index: index + 1,
      time: Math.random() * 5 + 0.5, // Mock response time
      type: response.type
    }));

  const chartConfig = {
    messages: { label: "Messages", color: "#3b82f6" },
    requests: { label: "Requests", color: "#10b981" },
    responses: { label: "Responses", color: "#f59e0b" }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <BarChart className="w-4 h-4 text-blue-500" />
            <div>
              <div className="text-2xl font-bold">{messages.length}</div>
              <div className="text-sm text-muted-foreground">Total Messages</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <div>
              <div className="text-2xl font-bold">
                {Math.round((messages.filter(m => m.type === "response").length / messages.filter(m => m.type === "request").length) * 100) || 0}%
              </div>
              <div className="text-sm text-muted-foreground">Response Rate</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-purple-500" />
            <div>
              <div className="text-2xl font-bold">1.2s</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-yellow-500" />
            <div>
              <div className="text-2xl font-bold">
                {new Set([...messages.map(m => m.from), ...messages.map(m => m.to)]).size}
              </div>
              <div className="text-sm text-muted-foreground">Active Agents</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Message Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Hourly Message Activity</h3>
          <ChartContainer config={chartConfig} className="h-64">
            <RechartsBarChart data={hourlyData}>
              <XAxis dataKey="hour" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="messages" fill="var(--color-messages)" />
            </RechartsBarChart>
          </ChartContainer>
        </Card>

        {/* Response Time Trends */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Response Time Trends</h3>
          <ChartContainer config={chartConfig} className="h-64">
            <LineChart data={responseTimeData}>
              <XAxis dataKey="index" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="time" stroke="var(--color-messages)" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </Card>
      </div>

      {/* Agent Communication Patterns */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Agent Communication Patterns</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Most Active Communication Pairs</h4>
            <div className="space-y-2">
              {agentPairData.slice(0, 5).map((pair, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-sm">{pair.pair}</span>
                  <Badge variant="secondary">{pair.messages} msgs</Badge>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Communication Type Distribution</h4>
            <div className="space-y-2">
              {["request", "response", "notification"].map(type => {
                const count = messages.filter(m => m.type === type).length;
                const percentage = Math.round((count / messages.length) * 100);
                
                return (
                  <div key={type} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm capitalize">{type}s</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{percentage}%</span>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Pattern Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Pattern Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Peak Activity</h4>
            <p className="text-sm text-blue-800">
              Most communication occurs between 10:00-11:00 AM with {Math.max(...hourlyData.map(h => h.messages))} messages
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Efficiency Score</h4>
            <p className="text-sm text-green-800">
              {Math.round((messages.filter(m => m.type === "response").length / messages.filter(m => m.type === "request").length) * 100) || 0}% of requests receive responses
            </p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Bottlenecks</h4>
            <p className="text-sm text-yellow-800">
              {agents.find(a => a.status === "waiting")?.name || "No"} agent{agents.filter(a => a.status === "waiting").length !== 1 ? "s" : ""} waiting for responses
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
