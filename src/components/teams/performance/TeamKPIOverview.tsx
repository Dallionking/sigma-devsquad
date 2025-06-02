
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
  Minus
} from 'lucide-react';

interface TeamKPIOverviewProps {
  team: Team;
  timeRange: TimeRange;
  comparisonType: ComparisonType;
  customDateRange: { start: Date; end: Date } | null;
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
}

export const TeamKPIOverview = ({ 
  team, 
  timeRange, 
  comparisonType,
  customDateRange 
}: TeamKPIOverviewProps) => {
  // Mock KPI data - in real implementation, this would be calculated based on timeRange and team data
  const kpiMetrics: KPIMetric[] = [
    {
      id: 'tasks-completed',
      title: 'Tasks Completed',
      value: 23,
      target: 25,
      unit: '',
      trend: 'up',
      changePercent: 15.3,
      icon: CheckCircle,
      color: 'text-emerald-600'
    },
    {
      id: 'productivity-score',
      title: 'Productivity Score',
      value: 87,
      target: 85,
      unit: '%',
      trend: 'up',
      changePercent: 8.2,
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      id: 'avg-response-time',
      title: 'Avg Response Time',
      value: 2.3,
      target: 3.0,
      unit: 'h',
      trend: 'down',
      changePercent: -12.5,
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      id: 'active-members',
      title: 'Active Members',
      value: team.memberIds.length,
      unit: '',
      trend: 'stable',
      changePercent: 0,
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-yellow-500" />;
      default: return null;
    }
  };

  const getChangeColor = (trend: string, changePercent: number) => {
    if (changePercent === 0) return 'text-muted-foreground';
    if (trend === 'up' && changePercent > 0) return 'text-emerald-600';
    if (trend === 'down' && changePercent < 0) return 'text-emerald-600';
    return 'text-red-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiMetrics.map((metric) => {
        const Icon = metric.icon;
        const progressValue = metric.target ? (metric.value / metric.target) * 100 : 0;
        
        return (
          <Card key={metric.id} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">
                      {metric.value}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {metric.unit}
                    </span>
                  </div>
                  
                  {comparisonType !== 'none' && (
                    <div className="flex items-center gap-1">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-xs font-medium ${getChangeColor(metric.trend, metric.changePercent)}`}>
                        {metric.changePercent > 0 ? '+' : ''}{metric.changePercent}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        vs {comparisonType === 'previous-period' ? 'last period' : 'target'}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className={`p-2 rounded-lg bg-muted/50`}>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
              </div>
              
              {metric.target && (
                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress to target</span>
                    <span className="font-medium">
                      {metric.value}/{metric.target} {metric.unit}
                    </span>
                  </div>
                  <Progress value={progressValue} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
