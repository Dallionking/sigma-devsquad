
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Team } from '@/types/teams';
import { TimeRange, ComparisonType } from './TeamPerformanceDashboard';
import { 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  Clock, 
  Users, 
  Target,
  Minus,
  AlertCircle
} from 'lucide-react';

interface TeamPerformanceMetrics {
  tasksCompleted: number;
  tasksInProgress: number;
  tasksPending: number;
  tasksBlocked: number;
  completionRate: number;
  velocityScore: number;
  averageResponseTime: number;
  activeMembers: number;
  productivityTrend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
}

interface TeamKPIOverviewProps {
  team: Team;
  timeRange: TimeRange;
  comparisonType: ComparisonType;
  customDateRange: { start: Date; end: Date } | null;
  metrics: TeamPerformanceMetrics;
}

interface KPIMetric {
  id: string;
  title: string;
  value: number;
  target?: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description?: string;
}

export const TeamKPIOverview = ({ 
  team, 
  timeRange, 
  comparisonType,
  customDateRange,
  metrics 
}: TeamKPIOverviewProps) => {
  
  const kpiMetrics: KPIMetric[] = [
    {
      id: 'tasks-completed',
      title: 'Tasks Completed',
      value: metrics.tasksCompleted,
      target: Math.round(metrics.tasksCompleted * 1.2),
      unit: '',
      trend: metrics.productivityTrend,
      changePercent: metrics.productivityTrend === 'up' ? 15.3 : metrics.productivityTrend === 'down' ? -8.2 : 0,
      icon: CheckCircle,
      color: 'text-emerald-600',
      description: 'Total completed tasks in selected period'
    },
    {
      id: 'completion-rate',
      title: 'Completion Rate',
      value: metrics.completionRate,
      target: 85,
      unit: '%',
      trend: metrics.completionRate > 75 ? 'up' : metrics.completionRate < 50 ? 'down' : 'stable',
      changePercent: metrics.completionRate > 75 ? 8.2 : metrics.completionRate < 50 ? -12.5 : 0,
      icon: Target,
      color: 'text-blue-600',
      description: 'Percentage of tasks completed vs total'
    },
    {
      id: 'avg-response-time',
      title: 'Avg Response Time',
      value: metrics.averageResponseTime,
      target: 3.0,
      unit: 'h',
      trend: metrics.averageResponseTime < 2.5 ? 'up' : metrics.averageResponseTime > 4 ? 'down' : 'stable',
      changePercent: metrics.averageResponseTime < 2.5 ? -12.5 : metrics.averageResponseTime > 4 ? 15.2 : 0,
      icon: Clock,
      color: 'text-orange-600',
      description: 'Average time to respond to tasks'
    },
    {
      id: 'active-members',
      title: 'Active Members',
      value: metrics.activeMembers,
      unit: '',
      trend: 'stable',
      changePercent: 0,
      icon: Users,
      color: 'text-purple-600',
      description: 'Currently active team members'
    }
  ];

  // Add blocked tasks indicator if there are any
  if (metrics.tasksBlocked > 0) {
    kpiMetrics.push({
      id: 'blocked-tasks',
      title: 'Blocked Tasks',
      value: metrics.tasksBlocked,
      unit: '',
      trend: 'down',
      changePercent: 0,
      icon: AlertCircle,
      color: 'text-red-600',
      description: 'Tasks currently blocked'
    });
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-emerald-500" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-500" />;
      case 'stable': return <Minus className="w-3 h-3 text-yellow-500" />;
      default: return null;
    }
  };

  const getChangeColor = (trend: string, changePercent: number, metricId: string) => {
    if (changePercent === 0) return 'text-muted-foreground';
    
    // For blocked tasks, red is always bad
    if (metricId === 'blocked-tasks') return 'text-red-600';
    
    if (trend === 'up' && changePercent > 0) return 'text-emerald-600';
    if (trend === 'down' && changePercent < 0) return 'text-emerald-600';
    return 'text-red-600';
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {kpiMetrics.map((metric) => {
        const Icon = metric.icon;
        const progressValue = metric.target ? Math.min((metric.value / metric.target) * 100, 100) : 0;
        
        return (
          <Card key={metric.id} className="relative overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-1">
              <CardTitle className="text-xs font-medium text-muted-foreground truncate">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <div className="flex items-center justify-between">
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold truncate">
                      {metric.value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {metric.unit}
                    </span>
                  </div>
                  
                  {comparisonType !== 'none' && metric.changePercent !== 0 && (
                    <div className="flex items-center gap-1">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-xs font-medium ${getChangeColor(metric.trend, metric.changePercent, metric.id)}`}>
                        {metric.changePercent > 0 ? '+' : ''}{metric.changePercent}%
                      </span>
                    </div>
                  )}
                </div>
                
                <div className={`p-1.5 rounded-lg bg-muted/50 flex-shrink-0`}>
                  <Icon className={`w-3 h-3 ${metric.color}`} />
                </div>
              </div>
              
              {metric.target && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Target</span>
                    <span className="font-medium">
                      {metric.value}/{metric.target} {metric.unit}
                    </span>
                  </div>
                  <Progress value={progressValue} className="h-1" />
                </div>
              )}

              {metric.description && (
                <p className="text-xs text-muted-foreground/80 leading-tight">
                  {metric.description}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
