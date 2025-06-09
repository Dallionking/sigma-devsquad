
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  TrendingUp, 
  Users, 
  CheckCircle,
  Clock,
  Zap,
  Target,
  BarChart3
} from "lucide-react";
import { Agent } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardOverviewProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent) => void;
}

export const DashboardOverview = ({ agents, onAgentSelect }: DashboardOverviewProps) => {
  const isMobile = useIsMobile();
  
  const activeAgents = agents.filter(agent => agent.status === "working").length;
  const idleAgents = agents.filter(agent => agent.status === "idle").length;
  const totalTasks = agents.reduce((sum, agent) => sum + (agent.progress || 0), 0);
  const avgProgress = agents.length > 0 ? totalTasks / agents.length : 0;

  const metrics = [
    {
      title: "Active Agents",
      value: activeAgents,
      total: agents.length,
      icon: Users,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950",
      progress: (activeAgents / agents.length) * 100
    },
    {
      title: "Squad Efficiency",
      value: Math.round(avgProgress),
      suffix: "%",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      progress: avgProgress
    },
    {
      title: "Tasks Completed",
      value: 47,
      suffix: " today",
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      progress: 78
    },
    {
      title: "Response Time",
      value: "2.3",
      suffix: "s avg",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      progress: 85
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`}>
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card 
              key={metric.title} 
              className="vibe-card transition-all duration-300 hover:shadow-xl group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">
                        {metric.value}
                      </span>
                      {metric.total && (
                        <span className="text-sm text-muted-foreground">
                          /{metric.total}
                        </span>
                      )}
                      {metric.suffix && (
                        <span className="text-sm text-muted-foreground">
                          {metric.suffix}
                        </span>
                      )}
                    </div>
                    <Progress 
                      value={metric.progress} 
                      className="h-2 vibe-flow"
                    />
                  </div>
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Squad Status */}
      <Card className="vibe-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Squad Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Active Agents */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Active Squad Members</span>
                <Badge className="vibe-status-active">
                  {activeAgents} online
                </Badge>
              </div>
              <div className="space-y-2">
                {agents.slice(0, 3).map((agent) => (
                  <div 
                    key={agent.id}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onAgentSelect(agent)}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      agent.status === 'working' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'
                    }`} />
                    <span className="text-sm font-medium">{agent.name}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      {agent.progress}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Trends */}
            <div className="space-y-3">
              <span className="text-sm font-medium">Performance Trends</span>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Productivity</span>
                  <div className="flex items-center gap-2">
                    <Progress value={92} className="w-16 h-2" />
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Collaboration</span>
                  <div className="flex items-center gap-2">
                    <Progress value={87} className="w-16 h-2" />
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Innovation</span>
                  <div className="flex items-center gap-2">
                    <Progress value={95} className="w-16 h-2" />
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <span className="text-sm font-medium">Quick Actions</span>
              <div className="space-y-2">
                <button className="w-full text-left p-2 rounded-lg hover:bg-primary/10 transition-colors group">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm">Assign New Task</span>
                  </div>
                </button>
                <button className="w-full text-left p-2 rounded-lg hover:bg-primary/10 transition-colors group">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm">View Analytics</span>
                  </div>
                </button>
                <button className="w-full text-left p-2 rounded-lg hover:bg-primary/10 transition-colors group">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm">Monitor Activity</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
