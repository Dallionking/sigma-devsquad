
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  Legend,
  ReferenceLine
} from 'recharts';
import { 
  TrendingUp, 
  BarChart3, 
  Activity, 
  Target, 
  Calendar,
  Download
} from 'lucide-react';

interface ProductivityVisualizationsProps {
  timeRange?: '7d' | '14d' | '30d' | '90d';
  sprintId?: string;
}

export const ProductivityVisualizations = ({ 
  timeRange = '7d', 
  sprintId 
}: ProductivityVisualizationsProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);
  const [selectedSprint, setSelectedSprint] = useState(sprintId || 'current');

  // Mock data for task completion 7-day trend
  const taskCompletionData = [
    { day: 'Mon', completed: 12, started: 18, planned: 15 },
    { day: 'Tue', completed: 15, started: 20, planned: 18 },
    { day: 'Wed', completed: 8, started: 14, planned: 12 },
    { day: 'Thu', completed: 22, started: 25, planned: 20 },
    { day: 'Fri', completed: 18, started: 22, planned: 19 },
    { day: 'Sat', completed: 5, started: 8, planned: 6 },
    { day: 'Sun', completed: 3, started: 5, planned: 4 }
  ];

  // Mock data for workload distribution (stacked bar chart)
  const workloadData = [
    { 
      team: 'Frontend', 
      inProgress: 15, 
      pending: 8, 
      completed: 22, 
      blocked: 2 
    },
    { 
      team: 'Backend', 
      inProgress: 12, 
      pending: 6, 
      completed: 28, 
      blocked: 1 
    },
    { 
      team: 'QA', 
      inProgress: 8, 
      pending: 4, 
      completed: 18, 
      blocked: 3 
    },
    { 
      team: 'DevOps', 
      inProgress: 6, 
      pending: 3, 
      completed: 12, 
      blocked: 1 
    }
  ];

  // Mock data for velocity tracking with sprint comparison
  const velocityData = [
    { sprint: 'Sprint 1', planned: 45, completed: 42, velocity: 93 },
    { sprint: 'Sprint 2', planned: 48, completed: 46, velocity: 96 },
    { sprint: 'Sprint 3', planned: 52, completed: 38, velocity: 73 },
    { sprint: 'Sprint 4', planned: 50, completed: 51, velocity: 102 },
    { sprint: 'Sprint 5', planned: 55, completed: 53, velocity: 96 },
    { sprint: 'Current', planned: 58, completed: 35, velocity: 60 }
  ];

  // Mock data for burndown chart with projections
  const burndownData = [
    { day: 'Day 1', remaining: 120, ideal: 120, projected: 120 },
    { day: 'Day 2', remaining: 110, ideal: 108, projected: 118 },
    { day: 'Day 3', remaining: 98, ideal: 96, projected: 115 },
    { day: 'Day 4', remaining: 88, ideal: 84, projected: 110 },
    { day: 'Day 5', remaining: 82, ideal: 72, projected: 105 },
    { day: 'Day 6', remaining: 75, ideal: 60, projected: 98 },
    { day: 'Day 7', remaining: 68, ideal: 48, projected: 90 },
    { day: 'Day 8', remaining: null, ideal: 36, projected: 80 },
    { day: 'Day 9', remaining: null, ideal: 24, projected: 68 },
    { day: 'Day 10', remaining: null, ideal: 12, projected: 55 },
    { day: 'Day 11', remaining: null, ideal: 0, projected: 40 }
  ];

  const exportData = (chartType: string) => {
    console.log(`Exporting ${chartType} data...`);
    // Implementation for data export
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Productivity Visualizations
          </h2>
          <p className="text-muted-foreground mt-1">
            Comprehensive analytics for team productivity and sprint performance
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="14d">14 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedSprint} onValueChange={setSelectedSprint}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Sprint</SelectItem>
              <SelectItem value="sprint-5">Sprint 5</SelectItem>
              <SelectItem value="sprint-4">Sprint 4</SelectItem>
              <SelectItem value="sprint-3">Sprint 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="completion" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="completion" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Task Completion
          </TabsTrigger>
          <TabsTrigger value="workload" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Workload Distribution
          </TabsTrigger>
          <TabsTrigger value="velocity" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Velocity Tracking
          </TabsTrigger>
          <TabsTrigger value="burndown" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Burndown Analysis
          </TabsTrigger>
        </TabsList>

        {/* Task Completion Charts */}
        <TabsContent value="completion" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  7-Day Task Completion Trend
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Daily task completion vs planned targets
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportData('task-completion')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={taskCompletionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="planned" 
                      stroke="#94a3b8" 
                      strokeDasharray="5 5"
                      name="Planned"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="started" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      name="Started"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="completed" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      name="Completed"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Summary metrics */}
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">83</div>
                  <div className="text-sm text-muted-foreground">Total Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">112</div>
                  <div className="text-sm text-muted-foreground">Total Started</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">74%</div>
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workload Distribution */}
        <TabsContent value="workload" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Team Workload Distribution
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Task distribution across teams by status
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportData('workload-distribution')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={workloadData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="team" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
                    <Bar dataKey="inProgress" stackId="a" fill="#3b82f6" name="In Progress" />
                    <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending" />
                    <Bar dataKey="blocked" stackId="a" fill="#ef4444" name="Blocked" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legend with status indicators */}
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                  <span className="text-sm">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                  <span className="text-sm">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                  <span className="text-sm">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                  <span className="text-sm">Blocked</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Velocity Tracking */}
        <TabsContent value="velocity" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Sprint Velocity Comparison
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Sprint performance and velocity trends over time
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportData('velocity-tracking')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={velocityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sprint" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="planned" fill="#94a3b8" name="Planned Points" />
                    <Bar dataKey="completed" fill="#10b981" name="Completed Points" />
                    <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="2 2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Velocity metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">96%</div>
                  <div className="text-sm text-muted-foreground">Avg Velocity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">102%</div>
                  <div className="text-sm text-muted-foreground">Best Sprint</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">23</div>
                  <div className="text-sm text-muted-foreground">Velocity Trend</div>
                </div>
                <div className="text-center">
                  <Badge variant={velocityData[5].velocity >= 85 ? "default" : "destructive"}>
                    {velocityData[5].velocity >= 85 ? "On Track" : "At Risk"}
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">Current Status</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Burndown Analysis */}
        <TabsContent value="burndown" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Burndown Chart with Projections
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Sprint progress tracking with completion projections
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportData('burndown-analysis')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={burndownData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="ideal" 
                      stroke="#94a3b8" 
                      strokeDasharray="5 5"
                      name="Ideal Burndown"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="remaining" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      name="Actual Progress"
                      connectNulls={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="projected" 
                      stroke="#f59e0b" 
                      strokeDasharray="3 3"
                      name="Projected Completion"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Sprint summary */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">68</div>
                  <div className="text-sm text-muted-foreground">Tasks Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">43%</div>
                  <div className="text-sm text-muted-foreground">Sprint Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">4 days</div>
                  <div className="text-sm text-muted-foreground">Days Remaining</div>
                </div>
                <div className="text-center">
                  <Badge variant="destructive">
                    Behind Schedule
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">Sprint Status</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
