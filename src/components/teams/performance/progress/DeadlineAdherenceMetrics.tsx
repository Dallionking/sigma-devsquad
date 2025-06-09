
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';

interface DeadlineData {
  period: string;
  onTime: number;
  late: number;
  early: number;
  averageDelay: number;
  adherenceRate: number;
}

interface DeadlineAdherenceMetricsProps {
  teamId?: string;
  timeRange: string;
}

const generateDeadlineData = (): DeadlineData[] => {
  const periods = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
  
  return periods.map(period => {
    const onTime = Math.floor(Math.random() * 20) + 10;
    const late = Math.floor(Math.random() * 8) + 2;
    const early = Math.floor(Math.random() * 5) + 1;
    const total = onTime + late + early;
    
    return {
      period,
      onTime,
      late,
      early,
      averageDelay: Math.floor(Math.random() * 3) + 0.5,
      adherenceRate: Math.round((onTime / total) * 100)
    };
  });
};

const chartConfig = {
  onTime: {
    label: "On Time",
    color: "#10b981",
  },
  late: {
    label: "Late",
    color: "#ef4444",
  },
  early: {
    label: "Early", 
    color: "#3b82f6",
  },
};

export const DeadlineAdherenceMetrics = ({ 
  teamId, 
  timeRange 
}: DeadlineAdherenceMetricsProps) => {
  const deadlineData = generateDeadlineData();

  const currentWeekData = deadlineData[deadlineData.length - 1];
  const previousWeekData = deadlineData[deadlineData.length - 2];
  
  const adherenceTrend = currentWeekData.adherenceRate - previousWeekData.adherenceRate;
  const delayTrend = currentWeekData.averageDelay - previousWeekData.averageDelay;

  const overallStats = {
    totalTasks: deadlineData.reduce((sum, d) => sum + d.onTime + d.late + d.early, 0),
    averageAdherence: Math.round(deadlineData.reduce((sum, d) => sum + d.adherenceRate, 0) / deadlineData.length),
    totalLate: deadlineData.reduce((sum, d) => sum + d.late, 0),
    averageDelay: Math.round((deadlineData.reduce((sum, d) => sum + d.averageDelay, 0) / deadlineData.length) * 10) / 10
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-yellow-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Deadline Adherence Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{overallStats.averageAdherence}%</div>
              <div className="text-sm text-muted-foreground">Average Adherence</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                {getTrendIcon(adherenceTrend)}
                <span className={`text-xs ${getTrendColor(adherenceTrend)}`}>
                  {adherenceTrend > 0 ? '+' : ''}{adherenceTrend}%
                </span>
              </div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{overallStats.totalTasks}</div>
              <div className="text-sm text-muted-foreground">Total Tasks</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600">{overallStats.totalLate}</div>
              <div className="text-sm text-muted-foreground">Late Deliveries</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{overallStats.averageDelay}d</div>
              <div className="text-sm text-muted-foreground">Avg Delay</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                {getTrendIcon(-delayTrend)}
                <span className={`text-xs ${getTrendColor(-delayTrend)}`}>
                  {delayTrend > 0 ? '+' : ''}{delayTrend}d
                </span>
              </div>
            </div>
          </div>

          {/* Deadline Performance Chart */}
          <div className="space-y-3">
            <h4 className="font-medium">Deadline Performance Over Time</h4>
            <div className="h-64">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deadlineData}>
                    <XAxis dataKey="period" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="early" stackId="a" fill="var(--color-early)" />
                    <Bar dataKey="onTime" stackId="a" fill="var(--color-onTime)" />
                    <Bar dataKey="late" stackId="a" fill="var(--color-late)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          {/* Adherence Rate Trend */}
          <div className="space-y-3">
            <h4 className="font-medium">Adherence Rate Trend</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={deadlineData}>
                  <XAxis dataKey="period" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-lg shadow-lg p-3">
                            <p className="font-medium">{label}</p>
                            <p className="text-sm">
                              Adherence Rate: {payload[0].value}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="adherenceRate" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Performance Breakdown */}
          <div className="space-y-3">
            <h4 className="font-medium">Current Week Performance</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">On Time Delivery</span>
                  <Badge className="bg-green-100 text-green-800">
                    {currentWeekData.onTime} tasks
                  </Badge>
                </div>
                <Progress value={(currentWeekData.onTime / (currentWeekData.onTime + currentWeekData.late + currentWeekData.early)) * 100} className="h-2" />
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Late Delivery</span>
                  <Badge className="bg-red-100 text-red-800">
                    {currentWeekData.late} tasks
                  </Badge>
                </div>
                <Progress value={(currentWeekData.late / (currentWeekData.onTime + currentWeekData.late + currentWeekData.early)) * 100} className="h-2" />
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Early Delivery</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {currentWeekData.early} tasks
                  </Badge>
                </div>
                <Progress value={(currentWeekData.early / (currentWeekData.onTime + currentWeekData.late + currentWeekData.early)) * 100} className="h-2" />
              </div>
            </div>
          </div>

          {/* Actionable Insights */}
          <div className="space-y-3">
            <h4 className="font-medium">Performance Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {overallStats.averageAdherence >= 80 ? (
                <div className="p-3 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Strong Performance</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Team consistently meets deadlines with {overallStats.averageAdherence}% adherence rate
                  </p>
                </div>
              ) : (
                <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">Needs Improvement</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    Consider reviewing project planning and resource allocation
                  </p>
                </div>
              )}
              
              {adherenceTrend > 0 ? (
                <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">Improving Trend</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    Deadline adherence has improved by {adherenceTrend}% this week
                  </p>
                </div>
              ) : (
                <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 text-red-800">
                    <TrendingDown className="w-4 h-4" />
                    <span className="font-medium">Declining Trend</span>
                  </div>
                  <p className="text-sm text-red-700 mt-1">
                    Review current workload and identify potential blockers
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
