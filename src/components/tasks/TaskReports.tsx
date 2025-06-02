
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, TrendingUp, Calendar } from "lucide-react";
import { Task, Agent } from "@/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { TaskMetrics } from "./reports/TaskMetrics";
import { TaskErrorBoundary } from "./shared/ErrorBoundary";

interface TaskReportsProps {
  tasks: Task[];
  agents: Agent[];
}

export const TaskReports = ({ tasks, agents }: TaskReportsProps) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  // Task distribution by priority
  const priorityData = [
    { name: 'Critical', value: tasks.filter(t => t.priority === 'critical').length, color: '#dc2626' },
    { name: 'High', value: tasks.filter(t => t.priority === 'high').length, color: '#ea580c' },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length, color: '#ca8a04' },
    { name: 'Low', value: tasks.filter(t => t.priority === 'low').length, color: '#16a34a' }
  ];

  // Agent workload
  const agentWorkload = agents.map(agent => {
    const agentTasks = tasks.filter(t => t.assignedAgent === agent.id);
    return {
      name: agent.name,
      total: agentTasks.length,
      completed: agentTasks.filter(t => t.status === 'completed').length,
      inProgress: agentTasks.filter(t => t.status === 'in-progress').length,
      pending: agentTasks.filter(t => t.status === 'pending').length
    };
  });

  // Mock trend data
  const trendData = [
    { date: '2024-01-01', completed: 5, created: 8 },
    { date: '2024-01-02', completed: 7, created: 6 },
    { date: '2024-01-03', completed: 6, created: 9 },
    { date: '2024-01-04', completed: 8, created: 7 },
    { date: '2024-01-05', completed: 9, created: 5 },
    { date: '2024-01-06', completed: 4, created: 6 },
    { date: '2024-01-07', completed: 6, created: 8 }
  ];

  const exportReport = () => {
    const reportData = {
      generated: new Date().toISOString(),
      timeRange,
      agentWorkload,
      tasks: tasks.map(task => ({
        id: task.id,
        title: task.title,
        status: task.status,
        priority: task.priority,
        assignedAgent: task.assignedAgent,
        createdAt: task.createdAt,
        dueDate: task.dueDate
      }))
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `task-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <TaskErrorBoundary>
      <div className="h-full overflow-y-auto space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Task Reports</h2>
            <p className="text-muted-foreground">Analytics and insights for task management</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={exportReport}>
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <TaskMetrics tasks={tasks} />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Priority Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Priority Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priorityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Task Completion Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Task Completion Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    name="Completed"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="created" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Created"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </TaskErrorBoundary>
  );
};
