
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { useTrendDetector } from './trend-detector/useTrendDetector';
import { TrendsOverview } from './trend-detector/TrendsOverview';
import { MetricsChart } from './trend-detector/MetricsChart';

export const TrendDetector = () => {
  const { trends, metricsHistory } = useTrendDetector();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Trend Detection & Early Warning
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Trends Overview */}
        <TrendsOverview trends={trends} />

        {/* Metrics Chart */}
        <MetricsChart metricsHistory={metricsHistory} />
      </CardContent>
    </Card>
  );
};
