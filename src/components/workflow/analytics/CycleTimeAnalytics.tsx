
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Clock, TrendingUp, Calendar, BarChart } from 'lucide-react';
import { CycleTimeData, LeadTimeData } from '@/types/workflow-analytics';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  BarChart as RechartsBarChart,
  Bar
} from 'recharts';

interface CycleTimeAnalyticsProps {
  data: CycleTimeData[];
  leadTimeData?: LeadTimeData[];
  loading?: boolean;
  expanded?: boolean;
}

export const CycleTimeAnalytics: React.FC<CycleTimeAnalyticsProps> = ({
  data,
  leadTimeData,
  loading,
  expanded = false
}) => {
  const [viewType, setViewType] = useState<'trend' | 'distribution' | 'comparison'>('trend');
  const [groupBy, setGroupBy] = useState<'category' | 'priority' | 'assignee'>('category');

  // Prepare chart data
  const trendData = React.useMemo(() => {
    const grouped = data.reduce((acc, item) => {
      const date = new Date(item.endDate).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, cycleTime: [], leadTime: [] };
      }
      acc[date].cycleTime.push(item.cycleTime);
      
      const leadItem = leadTimeData?.find(l => l.taskId === item.taskId);
      if (leadItem) {
        acc[date].leadTime.push(leadItem.leadTime);
      }
      
      return acc;
    }, {} as Record<string, { date: string; cycleTime: number[]; leadTime: number[] }>);

    return Object.values(grouped)
      .map(group => ({
        date: group.date,
        avgCycleTime: group.cycleTime.reduce((sum, time) => sum + time, 0) / group.cycleTime.length,
        avgLeadTime: group.leadTime.length > 0 
          ? group.leadTime.reduce((sum, time) => sum + time, 0) / group.leadTime.length 
          : 0,
        p50CycleTime: group.cycleTime.sort((a, b) => a - b)[Math.floor(group.cycleTime.length * 0.5)],
        p85CycleTime: group.cycleTime.sort((a, b) => a - b)[Math.floor(group.cycleTime.length * 0.85)],
        count: group.cycleTime.length
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [data, leadTimeData]);

  const distributionData = React.useMemo(() => {
    const grouped = data.reduce((acc, item) => {
      const key = item[groupBy];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item.cycleTime);
      return acc;
    }, {} as Record<string, number[]>);

    return Object.entries(grouped).map(([key, times]) => ({
      name: key,
      avg: times.reduce((sum, time) => sum + time, 0) / times.length,
      p50: times.sort((a, b) => a - b)[Math.floor(times.length * 0.5)],
      p85: times.sort((a, b) => a - b)[Math.floor(times.length * 0.85)],
      p95: times.sort((a, b) => a - b)[Math.floor(times.length * 0.95)],
      count: times.length,
      min: Math.min(...times),
      max: Math.max(...times)
    }));
  }, [data, groupBy]);

  const scatterData = React.useMemo(() => {
    return data.map(item => ({
      cycleTime: item.cycleTime,
      leadTime: leadTimeData?.find(l => l.taskId === item.taskId)?.leadTime || 0,
      category: item.category,
      priority: item.priority,
      title: item.taskTitle
    }));
  }, [data, leadTimeData]);

  const getMetrics = () => {
    const cycleTimes = data.map(d => d.cycleTime);
    const leadTimes = leadTimeData?.map(d => d.leadTime) || [];
    
    return {
      avgCycleTime: cycleTimes.reduce((sum, time) => sum + time, 0) / cycleTimes.length,
      p50CycleTime: cycleTimes.sort((a, b) => a - b)[Math.floor(cycleTimes.length * 0.5)],
      p85CycleTime: cycleTimes.sort((a, b) => a - b)[Math.floor(cycleTimes.length * 0.85)],
      avgLeadTime: leadTimes.length > 0 ? leadTimes.reduce((sum, time) => sum + time, 0) / leadTimes.length : 0,
      improvement: Math.random() > 0.5 ? 12 : -8 // Mock improvement percentage
    };
  };

  const metrics = getMetrics();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Cycle & Lead Time Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Cycle & Lead Time Analytics
            </CardTitle>
            {expanded && (
              <div className="flex items-center gap-2">
                <Select value={viewType} onValueChange={(value: any) => setViewType(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trend">Trend</SelectItem>
                    <SelectItem value="distribution">Distribution</SelectItem>
                    <SelectItem value="comparison">Comparison</SelectItem>
                  </SelectContent>
                </Select>
                {viewType === 'distribution' && (
                  <Select value={groupBy} onValueChange={(value: any) => setGroupBy(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="category">By Category</SelectItem>
                      <SelectItem value="priority">By Priority</SelectItem>
                      <SelectItem value="assignee">By Assignee</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Metrics Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{Math.round(metrics.avgCycleTime)}h</div>
              <div className="text-sm text-muted-foreground">Avg Cycle Time</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{Math.round(metrics.p50CycleTime)}h</div>
              <div className="text-sm text-muted-foreground">50th Percentile</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{Math.round(metrics.p85CycleTime)}h</div>
              <div className="text-sm text-muted-foreground">85th Percentile</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-1">
                <div className={`text-2xl font-bold ${metrics.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metrics.improvement > 0 ? '+' : ''}{metrics.improvement}%
                </div>
                <TrendingUp className={`w-4 h-4 ${metrics.improvement > 0 ? 'text-green-600' : 'text-red-600 rotate-180'}`} />
              </div>
              <div className="text-sm text-muted-foreground">vs Last Period</div>
            </div>
          </div>

          {/* Charts */}
          {viewType === 'trend' && (
            <ChartContainer
              config={{
                avgCycleTime: { label: "Avg Cycle Time", color: "hsl(var(--chart-1))" },
                avgLeadTime: { label: "Avg Lead Time", color: "hsl(var(--chart-2))" },
                p85CycleTime: { label: "85th Percentile", color: "hsl(var(--chart-3))" }
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="avgCycleTime"
                    stackId="1"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.6}
                  />
                  {leadTimeData && (
                    <Area
                      type="monotone"
                      dataKey="avgLeadTime"
                      stackId="2"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.4}
                    />
                  )}
                  <Area
                    type="monotone"
                    dataKey="p85CycleTime"
                    stackId="3"
                    stroke="hsl(var(--chart-3))"
                    fill="hsl(var(--chart-3))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}

          {viewType === 'distribution' && (
            <ChartContainer
              config={{
                avg: { label: "Average", color: "hsl(var(--chart-1))" },
                p50: { label: "50th Percentile", color: "hsl(var(--chart-2))" },
                p85: { label: "85th Percentile", color: "hsl(var(--chart-3))" }
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={distributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="avg" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="p50" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="p85" fill="hsl(var(--chart-3))" radius={[2, 2, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}

          {viewType === 'comparison' && leadTimeData && (
            <ChartContainer
              config={{
                leadTime: { label: "Lead Time", color: "hsl(var(--chart-1))" },
                cycleTime: { label: "Cycle Time", color: "hsl(var(--chart-2))" }
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={scatterData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="cycleTime" 
                    name="Cycle Time"
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Cycle Time (hours)', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    dataKey="leadTime" 
                    name="Lead Time"
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Lead Time (hours)', angle: -90, position: 'insideLeft' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Scatter dataKey="leadTime" fill="hsl(var(--chart-1))" />
                </ScatterChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Performance by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart className="w-4 h-4" />
                Performance by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {distributionData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{item.name}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {item.count} tasks
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{Math.round(item.avg)}h avg</div>
                      <div className="text-xs text-muted-foreground">
                        P85: {Math.round(item.p85)}h
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Recent Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendData.slice(-7).map((item) => (
                  <div key={item.date} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <div className="font-medium">
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.count} completed
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{Math.round(item.avgCycleTime)}h</div>
                      <div className="text-xs text-muted-foreground">
                        P50: {Math.round(item.p50CycleTime)}h
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
