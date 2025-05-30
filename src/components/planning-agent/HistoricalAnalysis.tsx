import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent, Message } from "@/types";
import { TrendingUp, Calendar, Clock, BarChart } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from "recharts";

interface HistoricalAnalysisProps {
  messages: Message[];
  agents: Agent[];
  timeRange: string;
}

export const HistoricalAnalysis = ({ messages, agents, timeRange }: HistoricalAnalysisProps) => {
  // Generate historical data based on time range
  const generateHistoricalData = () => {
    const periods = timeRange === "1h" ? 12 : timeRange === "6h" ? 12 : timeRange === "24h" ? 24 : 30;
    const intervalMinutes = timeRange === "1h" ? 5 : timeRange === "6h" ? 30 : timeRange === "24h" ? 60 : 1440;
    
    return Array.from({ length: periods }, (_, i) => {
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - (periods - i) * intervalMinutes * 60 * 1000);
      const periodEnd = new Date(endTime.getTime() - (periods - i - 1) * intervalMinutes * 60 * 1000);
      
      const periodMessages = messages.filter(m => {
        const msgTime = new Date(m.timestamp);
        return msgTime >= startTime && msgTime < periodEnd;
      });
      
      return {
        period: timeRange === "24h" ? `${startTime.getHours()}:00` : 
                timeRange === "1h" ? startTime.toLocaleTimeString().slice(0, 5) :
                timeRange === "6h" ? startTime.toLocaleTimeString().slice(0, 5) :
                startTime.toLocaleDateString().slice(0, 5),
        total: periodMessages.length,
        requests: periodMessages.filter(m => m.type === "request").length,
        responses: periodMessages.filter(m => m.type === "response").length,
        notifications: periodMessages.filter(m => m.type === "notification").length,
        avgResponseTime: Math.random() * 3 + 0.5 // Mock response time
      };
    });
  };

  const historicalData = generateHistoricalData();

  // Calculate trends
  const calculateTrend = (data: number[]) => {
    if (data.length < 2) return 0;
    const recent = data.slice(-3).reduce((a, b) => a + b, 0) / 3;
    const previous = data.slice(0, -3).reduce((a, b) => a + b, 0) / (data.length - 3);
    return ((recent - previous) / previous) * 100;
  };

  const messageTrend = calculateTrend(historicalData.map(d => d.total));
  const responseTrend = calculateTrend(historicalData.map(d => d.avgResponseTime));

  const chartConfig = {
    total: { label: "Total Messages", color: "#3b82f6" },
    requests: { label: "Requests", color: "#10b981" },
    responses: { label: "Responses", color: "#f59e0b" },
    notifications: { label: "Notifications", color: "#8b5cf6" },
    avgResponseTime: { label: "Response Time", color: "#ef4444" }
  };

  return (
    <div className="space-y-6">
      {/* Historical Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{messages.length}</div>
              <div className="text-sm text-muted-foreground">Total Messages</div>
            </div>
            <div className={`flex items-center text-sm ${messageTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {Math.abs(messageTrend).toFixed(1)}%
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">1.2s</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
            <div className={`flex items-center text-sm ${responseTrend <= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <Clock className="w-4 h-4 mr-1" />
              {Math.abs(responseTrend).toFixed(1)}%
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {Math.round((messages.filter(m => m.type === "response").length / messages.filter(m => m.type === "request").length) * 100) || 0}%
              </div>
              <div className="text-sm text-muted-foreground">Response Rate</div>
            </div>
            <Badge variant="secondary">
              {timeRange}
            </Badge>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {Math.round(messages.length / (timeRange === "1h" ? 1 : timeRange === "6h" ? 6 : timeRange === "24h" ? 24 : 720))}
              </div>
              <div className="text-sm text-muted-foreground">Messages/Hour</div>
            </div>
            <BarChart className="w-4 h-4 text-blue-500" />
          </div>
        </Card>
      </div>

      {/* Message Volume Trends */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Message Volume Trends
        </h3>
        
        <ChartContainer config={chartConfig} className="h-64">
          <AreaChart data={historicalData}>
            <XAxis dataKey="period" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area type="monotone" dataKey="total" stackId="1" stroke="var(--color-total)" fill="var(--color-total)" fillOpacity={0.6} />
            <Area type="monotone" dataKey="requests" stackId="2" stroke="var(--color-requests)" fill="var(--color-requests)" fillOpacity={0.6} />
            <Area type="monotone" dataKey="responses" stackId="2" stroke="var(--color-responses)" fill="var(--color-responses)" fillOpacity={0.6} />
          </AreaChart>
        </ChartContainer>
      </Card>

      {/* Response Time Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Response Time Analysis
        </h3>
        
        <ChartContainer config={chartConfig} className="h-64">
          <LineChart data={historicalData}>
            <XAxis dataKey="period" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="avgResponseTime" stroke="var(--color-avgResponseTime)" strokeWidth={2} />
          </LineChart>
        </ChartContainer>
      </Card>

      {/* Historical Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Time Period Analysis
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Peak Activity Period</h4>
              <p className="text-sm text-blue-800">
                Highest message volume: {Math.max(...historicalData.map(d => d.total))} messages
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Best Response Time</h4>
              <p className="text-sm text-green-800">
                Fastest average response: {Math.min(...historicalData.map(d => d.avgResponseTime)).toFixed(2)}s
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Activity Pattern</h4>
              <p className="text-sm text-yellow-800">
                {messageTrend >= 0 ? "Increasing" : "Decreasing"} communication trend over selected period
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Agent Activity Timeline</h3>
          
          <div className="space-y-3">
            {agents.slice(0, 4).map((agent) => {
              const agentMessages = messages.filter(m => m.from === agent.type || m.to === agent.type);
              const activityLevel = agentMessages.length;
              const maxActivity = Math.max(...agents.map(a => 
                messages.filter(m => m.from === a.type || m.to === a.type).length
              ));
              const percentage = maxActivity > 0 ? (activityLevel / maxActivity) * 100 : 0;
              
              return (
                <div key={agent.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{agent.name}</span>
                    <Badge variant="secondary">{activityLevel} msgs</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};
