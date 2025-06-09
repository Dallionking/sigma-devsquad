
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { HardDrive, TrendingUp } from 'lucide-react';
import { MemorySnapshot, createChartData, createPieData, formatBytes } from './memoryUtils';

interface MemoryChartsProps {
  memoryHistory: MemorySnapshot[];
  currentMemory: MemorySnapshot | null;
}

export const MemoryCharts = ({ memoryHistory, currentMemory }: MemoryChartsProps) => {
  const chartData = createChartData(memoryHistory);
  const pieData = createPieData(currentMemory);

  return (
    <div className="space-y-4">
      {/* Memory Usage Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5" />
            Memory Usage Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`${value.toFixed(1)} MB`, '']} />
                <Area
                  type="monotone"
                  dataKey="used"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                  name="Used Memory"
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stackId="2"
                  stroke="#82ca9d"
                  fill="transparent"
                  strokeDasharray="5 5"
                  name="Total Allocated"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Memory Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Memory Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${formatBytes(value)}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatBytes(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
