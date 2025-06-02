
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";
import { Task, Agent } from "@/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";

interface TaskReportsProps {
  tasks: Task[];
  agents: Agent[];
}

export const TaskReports = ({ tasks, agents }: TaskReportsProps) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  // Calculate task statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    blocked: tasks.filter(t => t.status === 'blocked').length,
    overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed').length
  };

  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  // Task completion by status
  const statusData = [
    { name: 'Completed', value: stats.completed, color: '#22c55e' },
    { name: 'In Progress', value: stats.inProgress, color: '#3b82f6' },
    { name: 'Pending', value: stats.pending, color: '#f59e0b' },
    { name: 'Blocked', value: stats.blocked, color: '#ef4444' }
  ];

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

  // Task completion trend (mock data for demo)
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
      stats,
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">{completionRate.toFixed(1)}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <Progress value={completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Task Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
      </div>

      {/* Agent Workload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Agent Workload Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agentWorkload.map((agent) => (
              <div key={agent.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{agent.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{agent.total} total</Badge>
                    <Badge variant="secondary">{agent.completed} completed</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-1 h-2">
                  <div 
                    className="bg-green-500 rounded-sm" 
                    style={{ width: `${(agent.completed / Math.max(agent.total, 1)) * 100}%` }}
                  />
                  <div 
                    className="bg-blue-500 rounded-sm" 
                    style={{ width: `${(agent.inProgress / Math.max(agent.total, 1)) * 100}%` }}
                  />
                  <div 
                    className="bg-yellow-500 rounded-sm" 
                    style={{ width: `${(agent.pending / Math.max(agent.total, 1)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task Completion Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
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
  );
};
