
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertTriangle, Activity } from 'lucide-react';
import { TrendAnalysis } from './types';

interface TrendsOverviewProps {
  trends: TrendAnalysis[];
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'improving': return <TrendingUp className="w-4 h-4 text-green-500" />;
    case 'declining': return <TrendingDown className="w-4 h-4 text-red-500" />;
    default: return <Activity className="w-4 h-4 text-gray-500" />;
  }
};

const getTrendColor = (prediction: string) => {
  switch (prediction) {
    case 'alert_likely': return 'bg-red-100 text-red-800 border-red-200';
    case 'improving': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const TrendsOverview: React.FC<TrendsOverviewProps> = ({ trends }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {trends.map((trend) => (
        <div key={trend.metricName} className="p-4 border rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium flex items-center gap-2">
              {getTrendIcon(trend.trend)}
              {trend.metricName}
            </h4>
            <Badge variant="outline" className={getTrendColor(trend.prediction)}>
              {trend.prediction.replace('_', ' ')}
            </Badge>
          </div>
          
          <div className="text-sm text-muted-foreground space-y-1">
            <div>Trend: <strong>{trend.trend}</strong></div>
            <div>Confidence: <strong>{trend.confidence.toFixed(1)}%</strong></div>
            {trend.timeToAlert && trend.timeToAlert < 60 && (
              <div className="flex items-center gap-1 text-orange-600">
                <AlertTriangle className="w-3 h-3" />
                Alert likely in {Math.round(trend.timeToAlert)}min
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
