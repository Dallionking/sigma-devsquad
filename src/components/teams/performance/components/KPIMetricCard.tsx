
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { KPIMetric } from '../types/teamKPI';
import { ComparisonType } from '../TeamPerformanceDashboard';

interface KPIMetricCardProps {
  metric: KPIMetric;
  comparisonType: ComparisonType;
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

export const KPIMetricCard = ({ metric, comparisonType }: KPIMetricCardProps) => {
  const Icon = metric.icon;
  const progressValue = metric.target ? Math.min((metric.value / metric.target) * 100, 100) : 0;
  
  return (
    <Card className="relative overflow-hidden hover:shadow-md transition-shadow">
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
};
