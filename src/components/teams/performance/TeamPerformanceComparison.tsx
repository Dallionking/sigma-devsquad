
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Team } from '@/types/teams';
import { TimeRange, ComparisonType } from './TeamPerformanceDashboard';

interface TeamPerformanceComparisonProps {
  team: Team;
  timeRange: TimeRange;
  comparisonType: ComparisonType;
  customDateRange: { start: Date; end: Date } | null;
}

export const TeamPerformanceComparison = ({
  team,
  timeRange,
  comparisonType,
  customDateRange
}: TeamPerformanceComparisonProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Comparison analysis for {team.name} will be displayed here.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Comparing {comparisonType} over {timeRange} period.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
