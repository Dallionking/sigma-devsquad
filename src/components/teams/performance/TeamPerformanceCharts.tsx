
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Team } from '@/types/teams';
import { TimeRange } from './TeamPerformanceDashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ComposedChart
} from 'recharts';

interface ChartDataType {
  taskCompletion: Array<{
    date: string;
    completed: number;
    inProgress: number;
    pending: number;
  }>;
  velocity: Array<{
    sprint: string;
    planned: number;
    completed: number;
    velocity: number;
  }>;
  burndown: Array<{
    day: string;
    ideal: number;
    actual: number | null;
    projected: number | null;
  }>;
}

interface TeamPerformanceChartsProps {
  team: Team;
  timeRange: TimeRange;
  customDateRange: { start: Date; end: Date } | null;
  chartType: 'overview' | 'productivity' | 'velocity';
  chartData: ChartDataType;
  isLoading?: boolean;
}

const LoadingSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-[250px] w-full" />
  </div>
);

export const TeamPerformanceCharts = ({
  team,
  timeRange,
  customDateRange,
  chartType,
  chartData,
  isLoading = false
}: TeamPerformanceChartsProps) => {

  const taskDistributionData = [
    { name: 'Completed', value: 45, color: '#10b981' },
    { name: 'In Progress', value: 30, color: '#f59e0b' },
    { name: 'Pending', value: 20, color: '#6b7280' },
    { name: 'Blocked', value: 5, color: '#ef4444' }
  ];

  if (chartType === 'overview') {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Task Completion Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Task Completion Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <LoadingSkeleton /> : (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData.taskCompletion}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="completed" 
                      stackId="1"
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="inProgress" 
                      stackId="1"
                      stroke="#f59e0b" 
                      fill="#f59e0b" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="pending" 
                      stackId="1"
                      stroke="#6b7280" 
                      fill="#6b7280" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Task Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Current Task Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <LoadingSkeleton /> : (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {taskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Daily Task Volume */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Daily Task Volume</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <LoadingSkeleton /> : (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData.taskCompletion}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#10b981" />
                    <Bar dataKey="inProgress" fill="#f59e0b" />
                    <Line type="monotone" dataKey="pending" stroke="#6b7280" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (chartType === 'productivity') {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Task Completion Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Task Completion (7-day trend)</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <LoadingSkeleton /> : (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData.taskCompletion}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="completed" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Workload Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Workload Distribution (Stacked)</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <LoadingSkeleton /> : (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.taskCompletion}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" stackId="a" fill="#10b981" />
                    <Bar dataKey="inProgress" stackId="a" fill="#f59e0b" />
                    <Bar dataKey="pending" stackId="a" fill="#6b7280" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (chartType === 'velocity') {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Velocity Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sprint Velocity Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <LoadingSkeleton /> : (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.velocity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sprint" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="planned" fill="#94a3b8" name="Planned" />
                    <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Burndown Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Burndown Chart with Projections</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <LoadingSkeleton /> : (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData.burndown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="ideal" 
                      stroke="#94a3b8" 
                      strokeDasharray="5 5"
                      name="Ideal"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Actual"
                      connectNulls={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="projected" 
                      stroke="#f59e0b" 
                      strokeDasharray="3 3"
                      name="Projected"
                      connectNulls={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Velocity Trend */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Velocity Trend & Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <LoadingSkeleton /> : (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData.velocity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sprint" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="completed" fill="#3b82f6" />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="velocity" 
                      stroke="#10b981" 
                      strokeWidth={3}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};
