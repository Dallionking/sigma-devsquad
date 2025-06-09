
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Team } from '@/types/teams';
import { TimeRange, ComparisonType } from './TeamPerformanceDashboard';
import { TrendingUp, TrendingDown, Target, Calendar, BarChart3 } from 'lucide-react';

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

interface TeamPerformanceComparisonProps {
  team: Team;
  timeRange: TimeRange;
  comparisonType: ComparisonType;
  customDateRange: { start: Date; end: Date } | null;
  metrics: TeamPerformanceMetrics;
}

interface ComparisonMetric {
  label: string;
  current: number;
  previous: number;
  target?: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

export const TeamPerformanceComparison = ({
  team,
  timeRange,
  comparisonType,
  customDateRange,
  metrics
}: TeamPerformanceComparisonProps) => {

  // Generate comparison data based on current metrics
  const comparisonMetrics: ComparisonMetric[] = [
    {
      label: 'Task Completion Rate',
      current: metrics.completionRate,
      previous: Math.max(0, metrics.completionRate - Math.floor(Math.random() * 20) + 5),
      target: 85,
      unit: '%',
      trend: metrics.productivityTrend
    },
    {
      label: 'Tasks Completed',
      current: metrics.tasksCompleted,
      previous: Math.max(0, metrics.tasksCompleted - Math.floor(Math.random() * 10) + 2),
      target: Math.round(metrics.tasksCompleted * 1.2),
      unit: '',
      trend: metrics.tasksCompleted > 20 ? 'up' : metrics.tasksCompleted < 10 ? 'down' : 'stable'
    },
    {
      label: 'Average Response Time',
      current: metrics.averageResponseTime,
      previous: metrics.averageResponseTime + (Math.random() * 2 - 1),
      target: 3.0,
      unit: 'h',
      trend: metrics.averageResponseTime < 2.5 ? 'up' : metrics.averageResponseTime > 4 ? 'down' : 'stable'
    },
    {
      label: 'Velocity Score',
      current: metrics.velocityScore,
      previous: Math.max(0, metrics.velocityScore - Math.floor(Math.random() * 15) + 5),
      target: Math.round(metrics.velocityScore * 1.15),
      unit: 'pts',
      trend: metrics.velocityScore > 25 ? 'up' : metrics.velocityScore < 15 ? 'down' : 'stable'
    }
  ];

  const getComparisonPeriod = () => {
    switch (timeRange) {
      case 'today': return 'yesterday';
      case 'week': return 'previous week';
      case 'month': return 'previous month';
      case 'custom': return 'previous period';
      default: return 'previous period';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <BarChart3 className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const getComparisonColor = (current: number, previous: number, isLowerBetter = false) => {
    const isImprovement = isLowerBetter ? current < previous : current > previous;
    return isImprovement ? 'text-emerald-600' : current === previous ? 'text-yellow-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Comparison Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance Comparison
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {comparisonType === 'previous-period' ? `vs ${getComparisonPeriod()}` : 'vs Target'}
              </Badge>
              <Badge variant="secondary">
                {team.name}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {comparisonType === 'previous-period' 
              ? `Comparing current ${timeRange} performance with ${getComparisonPeriod()}`
              : 'Comparing current performance against set targets'
            }
          </p>
        </CardContent>
      </Card>

      {/* Comparison Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comparisonMetrics.map((metric, index) => {
          const percentChange = getPercentageChange(metric.current, metric.previous);
          const isResponseTime = metric.label.includes('Response Time');
          const comparisonValue = comparisonType === 'target' ? metric.target : metric.previous;
          
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  <span>{metric.label}</span>
                  {getTrendIcon(metric.trend)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Current vs Comparison Value */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {metric.current}{metric.unit}
                    </p>
                    <p className="text-xs text-muted-foreground">Current</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-muted-foreground">
                      {comparisonValue?.toFixed(1)}{metric.unit}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {comparisonType === 'target' ? 'Target' : 'Previous'}
                    </p>
                  </div>
                </div>

                {/* Progress Bar for Target Comparison */}
                {comparisonType === 'target' && metric.target && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress to Target</span>
                      <span>{Math.round((metric.current / metric.target) * 100)}%</span>
                    </div>
                    <Progress 
                      value={Math.min((metric.current / metric.target) * 100, 100)} 
                      className="h-2"
                    />
                  </div>
                )}

                {/* Change Indicator */}
                {comparisonType === 'previous-period' && (
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-muted-foreground">Change</span>
                    <div className={`flex items-center gap-1 text-sm font-medium ${getComparisonColor(metric.current, metric.previous, isResponseTime)}`}>
                      <span>
                        {percentChange > 0 ? '+' : ''}{percentChange}%
                      </span>
                      {percentChange !== 0 && (
                        percentChange > 0 
                          ? <TrendingUp className="w-3 h-3" />
                          : <TrendingDown className="w-3 h-3" />
                      )}
                    </div>
                  </div>
                )}

                {/* Target Achievement Status */}
                {comparisonType === 'target' && metric.target && (
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-muted-foreground">Status</span>
                    <Badge 
                      variant={metric.current >= metric.target ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {metric.current >= metric.target ? (
                        <span className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          Target Met
                        </span>
                      ) : (
                        `${Math.round(((metric.target - metric.current) / metric.target) * 100)}% to target`
                      )}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
              <div>
                <p className="text-sm font-medium">
                  {metrics.productivityTrend === 'up' ? 'Strong Performance' : 
                   metrics.productivityTrend === 'down' ? 'Needs Attention' : 'Stable Performance'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Team {team.name} is {metrics.productivityTrend === 'up' ? 'exceeding' : 
                                      metrics.productivityTrend === 'down' ? 'below' : 'meeting'} expectations 
                  with a {metrics.completionRate}% completion rate.
                </p>
              </div>
            </div>
            
            {metrics.tasksBlocked > 0 && (
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
                <div>
                  <p className="text-sm font-medium">Blocked Tasks Alert</p>
                  <p className="text-xs text-muted-foreground">
                    {metrics.tasksBlocked} tasks are currently blocked and may impact team velocity.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
              <div>
                <p className="text-sm font-medium">Team Utilization</p>
                <p className="text-xs text-muted-foreground">
                  {metrics.activeMembers} active members with an average response time of {metrics.averageResponseTime}h.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
