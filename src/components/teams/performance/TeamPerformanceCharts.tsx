
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Team } from '@/types/teams';
import { TimeRange } from './TeamPerformanceDashboard';
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
  Cell
} from 'recharts';

interface TeamPerformanceChartsProps {
  team: Team;
  timeRange: TimeRange;
  customDateRange: { start: Date; end: Date } | null;
  chartType: 'overview' | 'productivity';
}

export const TeamPerformanceCharts = ({
  team,
  timeRange,
  customDateRange,
  chartType
}: TeamPerformanceChartsProps) => {
  // Mock chart data - in real implementation, this would be fetched based on team and timeRange
  const productivityData = [
    { name: 'Mon', tasks: 12, efficiency: 85, velocity: 24 },
    { name: 'Tue', tasks: 19, efficiency: 92, velocity: 28 },
    { name: 'Wed', tasks: 15, efficiency: 78, velocity: 22 },
    { name: 'Thu', tasks: 25, efficiency: 95, velocity: 32 },
    { name: 'Fri', tasks: 22, efficiency: 88, velocity: 30 },
    { name: 'Sat', tasks: 8, efficiency: 72, velocity: 15 },
    { name: 'Sun', tasks: 5, efficiency: 65, velocity: 12 }
  ];

  const taskDistributionData = [
    { name: 'Completed', value: 45, color: '#10b981' },
    { name: 'In Progress', value: 30, color: '#f59e0b' },
    { name: 'Pending', value: 20, color: '#6b7280' },
    { name: 'Blocked', value: 5, color: '#ef4444' }
  ];

  const memberPerformanceData = [
    { name: 'Alice', completed: 15, efficiency: 92 },
    { name: 'Bob', completed: 12, efficiency: 88 },
    { name: 'Charlie', completed: 18, efficiency: 95 },
    { name: 'Diana', completed: 14, efficiency: 85 }
  ];

  if (chartType === 'overview') {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Productivity Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Productivity Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Task Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Task Distribution</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Daily Tasks */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Daily Task Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {/* Team Velocity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Team Velocity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="velocity" 
                  stroke="#10b981" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Member Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Member Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={memberPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
