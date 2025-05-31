
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Agent } from "@/types";
import { 
  Users, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Target,
  Zap
} from "lucide-react";

interface MetricsOverviewProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent | null) => void;
}

export const MetricsOverview = ({ agents, onAgentSelect }: MetricsOverviewProps) => {
  // Calculate key metrics
  const totalAgents = agents.length;
  const activeAgents = agents.filter(agent => agent.status === "working").length;
  const idleAgents = agents.filter(agent => agent.status === "idle").length;
  const errorAgents = agents.filter(agent => agent.status === "error").length;
  
  const avgProgress = totalAgents > 0 
    ? agents.reduce((sum, agent) => sum + agent.progress, 0) / totalAgents 
    : 0;
  
  const productivityScore = Math.round((activeAgents / totalAgents) * 100);
  const efficiencyTrend = "+12%"; // Mock data - would come from real analytics
  
  const keyMetrics = [
    {
      title: "Active Agents",
      value: activeAgents,
      total: totalAgents,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      trend: "+5%",
      trendUp: true
    },
    {
      title: "Completion Rate",
      value: `${avgProgress.toFixed(0)}%`,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      trend: "+8%",
      trendUp: true
    },
    {
      title: "Productivity Score",
      value: `${productivityScore}%`,
      icon: Target,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      trend: efficiencyTrend,
      trendUp: true
    },
    {
      title: "Response Time",
      value: "1.2s",
      icon: Zap,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      trend: "-0.3s",
      trendUp: true
    }
  ];

  const agentStatusBreakdown = [
    { status: "Working", count: activeAgents, color: "bg-green-500", percentage: (activeAgents / totalAgents) * 100 },
    { status: "Idle", count: idleAgents, color: "bg-gray-400", percentage: (idleAgents / totalAgents) * 100 },
    { status: "Error", count: errorAgents, color: "bg-red-500", percentage: (errorAgents / totalAgents) * 100 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trendUp ? TrendingUp : TrendingDown;
          
          return (
            <Card key={metric.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${metric.bgColor}`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendIcon className={`w-4 h-4 ${metric.trendUp ? 'text-green-500' : 'text-red-500'}`} />
                    <span className={`text-sm font-medium ${metric.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.trend}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">
                    {metric.value}
                    {metric.total && <span className="text-muted-foreground">/{metric.total}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Agent Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Agent Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {agentStatusBreakdown.map((status) => (
              <div key={status.status} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${status.color}`} />
                    <span className="font-medium">{status.status}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {status.count} ({status.percentage.toFixed(0)}%)
                  </span>
                </div>
                <Progress value={status.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Performing Agents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Top Performing Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {agents
                .filter(agent => agent.status === "working")
                .sort((a, b) => b.progress - a.progress)
                .slice(0, 5)
                .map((agent, index) => (
                  <div 
                    key={agent.id} 
                    className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => onAgentSelect(agent)}
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="w-6 h-6 p-0 flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-muted-foreground">{agent.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{agent.progress}%</div>
                      <div className="text-xs text-muted-foreground">completion</div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
