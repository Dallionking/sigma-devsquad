
import React, { useState } from 'react';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Team Performance Dashboard
          </h2>
          <p className="text-muted-foreground">
            Monitor {team.name} productivity and performance metrics
          </p>
        </div>
        <TeamPerformanceExport 
          team={team}
          timeRange={timeRange}
          customDateRange={customDateRange}
        />
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

      {/* Performance Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="productivity" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Productivity
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Comparison
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <TeamPerformanceCharts
            team={team}
            timeRange={timeRange}
            customDateRange={customDateRange}
            chartType="overview"
          />
        </TabsContent>

        <TabsContent value="productivity" className="mt-6">
          <TeamPerformanceCharts
            team={team}
            timeRange={timeRange}
            customDateRange={customDateRange}
            chartType="productivity"
          />
        </TabsContent>

        <TabsContent value="comparison" className="mt-6">
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
