
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Team } from '@/types/teams';
import { BarChart3, TrendingUp, Clock, Target, RefreshCw, AlertTriangle, Users, Brain, GitBranch, Bug } from 'lucide-react';
import { TeamKPIOverview } from './TeamKPIOverview';
import { TeamPerformanceFilters } from './TeamPerformanceFilters';
import { TeamPerformanceCharts } from './TeamPerformanceCharts';
import { TeamPerformanceComparison } from './TeamPerformanceComparison';
import { TeamPerformanceExport } from './TeamPerformanceExport';
import { IndividualContributionMetrics } from './analytics/IndividualContributionMetrics';
import { ActivityHeatmap } from './analytics/ActivityHeatmap';
import { SkillUtilizationTracking } from './analytics/SkillUtilizationTracking';
import { CollaborationNetworkVisualization } from './analytics/CollaborationNetworkVisualization';
import { MilestoneCompletionVisualization } from './progress/MilestoneCompletionVisualization';
import { DeadlineAdherenceMetrics } from './progress/DeadlineAdherenceMetrics';
import { ScopeChangeTracking } from './progress/ScopeChangeTracking';
import { QualityMetricsDashboard } from './progress/QualityMetricsDashboard';
import { useTeamPerformanceData } from '@/hooks/useTeamPerformanceData';
import { useTeams } from '@/contexts/TeamContext';
import { useToast } from '@/hooks/use-toast';

export type TimeRange = 'today' | 'week' | 'month' | 'custom';
export type ComparisonType = 'previous-period' | 'target' | 'none';

interface TeamPerformanceDashboardProps {
  team: Team;
}

export const TeamPerformanceDashboard = ({ team }: TeamPerformanceDashboardProps) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [comparisonType, setComparisonType] = useState<ComparisonType>('previous-period');
  const [customDateRange, setCustomDateRange] = useState<{ start: Date; end: Date } | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const { toast } = useToast();
  const { getTeamMembers } = useTeams();

  const { 
    metrics, 
    chartData, 
    isLoading, 
    error, 
    refreshData 
  } = useTeamPerformanceData({ 
    team, 
    timeRange, 
    customDateRange 
  });

  const teamMembers = getTeamMembers(team.id);

  useEffect(() => {
    console.log('TeamPerformanceDashboard mounted for team:', team.name);
  }, [team.name]);

  const handleRefresh = async () => {
    try {
      await refreshData();
      toast({
        title: "Data refreshed",
        description: `Performance data updated for ${team.name}`,
      });
    } catch (err) {
      toast({
        title: "Refresh failed",
        description: "Unable to refresh performance data",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full max-w-full px-3 py-4 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="truncate">Team Performance Dashboard</span>
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-muted-foreground">
              Monitor {team.name} productivity and performance metrics
            </p>
            {metrics.lastUpdated && (
              <Badge variant="outline" className="text-xs">
                Updated {metrics.lastUpdated.toLocaleTimeString()}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <TeamPerformanceExport 
            team={team}
            timeRange={timeRange}
            customDateRange={customDateRange}
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

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
        metrics={metrics}
      />

      {/* Performance Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-8 max-w-4xl">
          <TabsTrigger value="overview" className="flex items-center gap-1 text-xs">
            <TrendingUp className="w-3 h-3" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="productivity" className="flex items-center gap-1 text-xs">
            <Clock className="w-3 h-3" />
            <span>Tasks</span>
          </TabsTrigger>
          <TabsTrigger value="velocity" className="flex items-center gap-1 text-xs">
            <Target className="w-3 h-3" />
            <span>Velocity</span>
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-1 text-xs">
            <BarChart3 className="w-3 h-3" />
            <span>Compare</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1 text-xs">
            <Users className="w-3 h-3" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-1 text-xs">
            <Brain className="w-3 h-3" />
            <span>Skills</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-1 text-xs">
            <GitBranch className="w-3 h-3" />
            <span>Progress</span>
          </TabsTrigger>
          <TabsTrigger value="quality" className="flex items-center gap-1 text-xs">
            <Bug className="w-3 h-3" />
            <span>Quality</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <TeamPerformanceCharts
            team={team}
            timeRange={timeRange}
            customDateRange={customDateRange}
            chartType="overview"
            chartData={chartData}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="productivity" className="mt-4">
          <TeamPerformanceCharts
            team={team}
            timeRange={timeRange}
            customDateRange={customDateRange}
            chartType="productivity"
            chartData={chartData}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="velocity" className="mt-4">
          <TeamPerformanceCharts
            team={team}
            timeRange={timeRange}
            customDateRange={customDateRange}
            chartType="velocity"
            chartData={chartData}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="comparison" className="mt-4">
          <TeamPerformanceComparison
            team={team}
            timeRange={timeRange}
            comparisonType={comparisonType}
            customDateRange={customDateRange}
            metrics={metrics}
          />
        </TabsContent>

        <TabsContent value="analytics" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <IndividualContributionMetrics 
              teamMembers={teamMembers}
              timeRange={timeRange}
            />
            <ActivityHeatmap 
              teamId={team.id}
              timeRange={timeRange}
            />
          </div>
          <CollaborationNetworkVisualization 
            teamMembers={teamMembers}
            timeRange={timeRange}
          />
        </TabsContent>

        <TabsContent value="skills" className="mt-4">
          <SkillUtilizationTracking 
            teamMembers={teamMembers}
            timeRange={timeRange}
          />
        </TabsContent>

        <TabsContent value="progress" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <MilestoneCompletionVisualization 
              timeRange={timeRange}
            />
            <DeadlineAdherenceMetrics 
              teamId={team.id}
              timeRange={timeRange}
            />
          </div>
          <ScopeChangeTracking 
            timeRange={timeRange}
          />
        </TabsContent>

        <TabsContent value="quality" className="mt-4">
          <QualityMetricsDashboard 
            teamId={team.id}
            timeRange={timeRange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
