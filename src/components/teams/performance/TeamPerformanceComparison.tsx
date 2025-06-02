
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Team } from '@/types/teams';
import { TimeRange, ComparisonType } from './TeamPerformanceDashboard';
import { TrendingUp, TrendingDown, Target, Calendar } from 'lucide-react';

interface TeamPerformanceComparisonProps {
  team: Team;
  timeRange: TimeRange;
  comparisonType: ComparisonType;
  customDateRange: { start: Date; end: Date } | null;
}

interface ComparisonMetric {
  metric: string;
  current: number;
  previous: number;
  target?: number;
  unit: string;
  isHigherBetter: boolean;
}

export const TeamPerformanceComparison = ({
  team,
  timeRange,
  comparisonType,
  customDateRange
}: TeamPerformanceComparisonProps) => {
  // Mock comparison data
  const comparisonMetrics: ComparisonMetric[] = [
    {
      metric: 'Tasks Completed',
      current: 23,
      previous: 20,
      target: 25,
      unit: '',
      isHigherBetter: true
    },
    {
      metric: 'Productivity Score',
      current: 87,
      previous: 82,
      target: 85,
      unit: '%',
      isHigherBetter: true
    },
    {
      metric: 'Average Response Time',
      current: 2.3,
      previous: 2.8,
      target: 3.0,
      unit: 'hours',
      isHigherBetter: false
    },
    {
      metric: 'Code Review Turnaround',
      current: 4.2,
      previous: 5.1,
      target: 4.0,
      unit: 'hours',
      isHigherBetter: false
    },
    {
      metric: 'Bug Resolution Rate',
      current: 95,
      previous: 89,
      target: 90,
      unit: '%',
      isHigherBetter: true
    },
    {
      metric: 'Sprint Velocity',
      current: 32,
      previous: 28,
      target: 30,
      unit: 'points',
      isHigherBetter: true
    }
  ];

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const getComparisonIcon = (current: number, previous: number, isHigherBetter: boolean) => {
    const isImproved = isHigherBetter ? current > previous : current < previous;
    return isImproved ? 
      <TrendingUp className="w-4 h-4 text-emerald-500" /> : 
      <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const getComparisonColor = (current: number, previous: number, isHigherBetter: boolean) => {
    const isImproved = isHigherBetter ? current > previous : current < previous;
    return isImproved ? 'text-emerald-600' : 'text-red-600';
  };

  const getTargetStatus = (current: number, target: number, isHigherBetter: boolean) => {
    const isMeetingTarget = isHigherBetter ? current >= target : current <= target;
    return isMeetingTarget ? 'success' : 'warning';
  };

  return (
    <div className="space-y-6">
      {/* Comparison Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {comparisonType === 'previous-period' ? (
              <Calendar className="w-5 h-5" />
            ) : (
              <Target className="w-5 h-5" />
            )}
            Performance Comparison
            <Badge variant="outline" className="ml-2">
              {comparisonType === 'previous-period' ? 'vs Previous Period' : 'vs Target'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Comparing {team.name} performance for the selected {timeRange} period
            {comparisonType === 'previous-period' ? ' against the previous period' : ' against set targets'}.
          </p>
        </CardContent>
      </Card>

      {/* Comparison Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comparisonMetrics.map((metric) => {
          const changePercent = calculateChange(metric.current, metric.previous);
          const comparisonValue = comparisonType === 'previous-period' ? metric.previous : metric.target;
          const displayChange = comparisonType === 'previous-period' ? changePercent : 
            metric.target ? calculateChange(metric.current, metric.target) : 0;

          return (
            <Card key={metric.metric}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{metric.metric}</h4>
                    {comparisonType === 'previous-period' ? 
                      getComparisonIcon(metric.current, metric.previous, metric.isHigherBetter) :
                      metric.target && (
                        <Badge 
                          variant={getTargetStatus(metric.current, metric.target, metric.isHigherBetter) === 'success' ? 'default' : 'secondary'}
                        >
                          {getTargetStatus(metric.current, metric.target, metric.isHigherBetter) === 'success' ? 'On Target' : 'Below Target'}
                        </Badge>
                      )
                    }
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Current</span>
                      <span className="font-bold">
                        {metric.current} {metric.unit}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {comparisonType === 'previous-period' ? 'Previous' : 'Target'}
                      </span>
                      <span className="text-sm">
                        {comparisonValue} {metric.unit}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Change</span>
                      <span className={`text-xs font-medium ${getComparisonColor(metric.current, comparisonValue || 0, metric.isHigherBetter)}`}>
                        {displayChange > 0 ? '+' : ''}{displayChange.toFixed(1)}%
                      </span>
                    </div>
                    
                    {metric.target && comparisonType === 'target' && (
                      <Progress 
                        value={(metric.current / metric.target) * 100} 
                        className="h-2"
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {comparisonMetrics.filter(m => {
                  const comparison = comparisonType === 'previous-period' ? m.previous : m.target || 0;
                  return m.isHigherBetter ? m.current > comparison : m.current < comparison;
                }).length}
              </div>
              <div className="text-sm text-muted-foreground">
                {comparisonType === 'previous-period' ? 'Improved Metrics' : 'Targets Met'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {comparisonMetrics.filter(m => {
                  const comparison = comparisonType === 'previous-period' ? m.previous : m.target || 0;
                  return m.isHigherBetter ? m.current < comparison : m.current > comparison;
                }).length}
              </div>
              <div className="text-sm text-muted-foreground">
                {comparisonType === 'previous-period' ? 'Declined Metrics' : 'Targets Missed'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {(comparisonMetrics.reduce((sum, m) => {
                  const comparison = comparisonType === 'previous-period' ? m.previous : m.target || 0;
                  return sum + calculateChange(m.current, comparison);
                }, 0) / comparisonMetrics.length).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">
                Average Change
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
