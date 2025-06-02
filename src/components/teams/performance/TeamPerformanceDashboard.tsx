
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Team } from '@/types/teams';
import { BarChart3, TrendingUp, Clock, Target } from 'lucide-react';
import { TeamKPIOverview } from './TeamKPIOverview';
import { TeamPerformanceFilters } from './TeamPerformanceFilters';
import { TeamPerformanceCharts } from './TeamPerformanceCharts';
import { TeamPerformanceComparison } from './TeamPerformanceComparison';
import { TeamPerformanceExport } from './TeamPerformanceExport';

export type TimeRange = 'today' | 'week' | 'month' | 'custom';
export type ComparisonType = 'previous-period' | 'target' | 'none';

interface TeamPerformanceDashboardProps {
  team: Team;
}

export const TeamPerformanceDashboard = ({ team }: TeamPerformanceDashboardProps) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [comparisonType, setComparisonType] = useState<ComparisonType>('previous-period');
  const [customDateRange, setCustomDateRange] = useState<{ start: Date; end: Date } | null>(null);

  useEffect(() => {
    console.log('TeamPerformanceDashboard mounted for team:', team.name);
  }, [team.name]);

  return (
    <div className="w-full max-w-full px-3 py-4 space-y-4">
      {/* Header - More compact */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="truncate">Team Performance Dashboard</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor {team.name} productivity and performance metrics
          </p>
        </div>
        <div className="flex-shrink-0">
          <TeamPerformanceExport 
            team={team}
            timeRange={timeRange}
            customDateRange={customDateRange}
          />
        </div>
      </div>

      {/* Filters */}
      <TeamPerformanceFilters
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        comparisonType={comparisonType}
        onComparisonTypeChange={setComparisonType}
        customDateRange={customDateRange}
        onCustomDateRangeChange={setCustomDateRange}
      />

      {/* KPI Overview */}
      <TeamKPIOverview 
        team={team}
        timeRange={timeRange}
        comparisonType={comparisonType}
        customDateRange={customDateRange}
      />

      {/* Performance Tabs - More compact */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-sm">
          <TabsTrigger value="overview" className="flex items-center gap-1 text-xs">
            <TrendingUp className="w-3 h-3" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="productivity" className="flex items-center gap-1 text-xs">
            <Clock className="w-3 h-3" />
            <span>Productivity</span>
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-1 text-xs">
            <Target className="w-3 h-3" />
            <span>Comparison</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <TeamPerformanceCharts
            team={team}
            timeRange={timeRange}
            customDateRange={customDateRange}
            chartType="overview"
          />
        </TabsContent>

        <TabsContent value="productivity" className="mt-4">
          <TeamPerformanceCharts
            team={team}
            timeRange={timeRange}
            customDateRange={customDateRange}
            chartType="productivity"
          />
        </TabsContent>

        <TabsContent value="comparison" className="mt-4">
          <TeamPerformanceComparison
            team={team}
            timeRange={timeRange}
            comparisonType={comparisonType}
            customDateRange={customDateRange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
