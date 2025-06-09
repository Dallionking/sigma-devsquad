
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  RefreshCw,
  Activity,
  Zap
} from 'lucide-react';
import { AnalyticsTimeframe } from '@/types/workflow-analytics';
import { useWorkflowAnalytics } from '@/hooks/useWorkflowAnalytics';
import { CycleTimeAnalytics } from './CycleTimeAnalytics';
import { BottleneckAnalysis } from './BottleneckAnalysis';
import { FlowEfficiencyMetrics } from './FlowEfficiencyMetrics';
import { PredictabilityCharts } from './PredictabilityCharts';

export const WorkflowAnalytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState<AnalyticsTimeframe>('30d');
  const [activeTab, setActiveTab] = useState('overview');
  
  const { data, loading, error, refreshData } = useWorkflowAnalytics(timeframe);

  const getOverviewMetrics = () => {
    const avgCycleTime = data.cycleTime.reduce((sum, item) => sum + item.cycleTime, 0) / data.cycleTime.length;
    const avgLeadTime = data.leadTime.reduce((sum, item) => sum + item.leadTime, 0) / data.leadTime.length;
    const criticalBottlenecks = data.bottlenecks.filter(b => b.severity === 'critical').length;
    const totalThroughput = data.throughput.reduce((sum, item) => sum + item.completed, 0);

    return {
      avgCycleTime: Math.round(avgCycleTime),
      avgLeadTime: Math.round(avgLeadTime),
      criticalBottlenecks,
      totalThroughput,
      flowEfficiency: Math.round(data.flowEfficiency.totalEfficiency),
      predictabilityScore: Math.round(data.predictability.historicalAccuracy)
    };
  };

  const metrics = getOverviewMetrics();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Workflow Analytics
          </h2>
          <p className="text-muted-foreground mt-1">
            Comprehensive analysis of workflow performance and delivery metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeframe} onValueChange={(value: AnalyticsTimeframe) => setTimeframe(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
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

      {/* Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Avg Cycle Time</span>
            </div>
            <div className="text-2xl font-bold">{metrics.avgCycleTime}h</div>
            <div className="text-xs text-muted-foreground">Time to complete</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Avg Lead Time</span>
            </div>
            <div className="text-2xl font-bold">{metrics.avgLeadTime}h</div>
            <div className="text-xs text-muted-foreground">Request to delivery</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">Bottlenecks</span>
            </div>
            <div className="text-2xl font-bold">{metrics.criticalBottlenecks}</div>
            <div className="text-xs text-muted-foreground">Critical issues</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Throughput</span>
            </div>
            <div className="text-2xl font-bold">{metrics.totalThroughput}</div>
            <div className="text-xs text-muted-foreground">Tasks completed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Flow Efficiency</span>
            </div>
            <div className="text-2xl font-bold">{metrics.flowEfficiency}%</div>
            <div className="text-xs text-muted-foreground">Work vs wait time</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium">Predictability</span>
            </div>
            <div className="text-2xl font-bold">{metrics.predictabilityScore}%</div>
            <div className="text-xs text-muted-foreground">Forecast accuracy</div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cycle-time">Cycle & Lead Time</TabsTrigger>
          <TabsTrigger value="bottlenecks">Bottlenecks</TabsTrigger>
          <TabsTrigger value="efficiency">Flow Efficiency</TabsTrigger>
          <TabsTrigger value="predictability">Predictability</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CycleTimeAnalytics data={data.cycleTime} loading={loading} />
            <BottleneckAnalysis data={data.bottlenecks} loading={loading} />
          </div>
        </TabsContent>

        <TabsContent value="cycle-time" className="mt-6">
          <CycleTimeAnalytics 
            data={data.cycleTime} 
            leadTimeData={data.leadTime}
            loading={loading} 
            expanded 
          />
        </TabsContent>

        <TabsContent value="bottlenecks" className="mt-6">
          <BottleneckAnalysis data={data.bottlenecks} loading={loading} expanded />
        </TabsContent>

        <TabsContent value="efficiency" className="mt-6">
          <FlowEfficiencyMetrics data={data.flowEfficiency} loading={loading} />
        </TabsContent>

        <TabsContent value="predictability" className="mt-6">
          <PredictabilityCharts data={data.predictability} loading={loading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
