
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Agent } from "@/types";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { TrendingUp, BarChart as BarChartIcon, PieChart as PieChartIcon, Activity } from "lucide-react";

interface ProductivityChartsProps {
  agents: Agent[];
}

export const ProductivityCharts = ({ agents }: ProductivityChartsProps) => {
  // Mock productivity data - in real app would come from analytics service
  const weeklyProductivity = [
    { week: 'Week 1', completed: 85, started: 100, efficiency: 85 },
    { week: 'Week 2', completed: 92, started: 105, efficiency: 87 },
    { week: 'Week 3', completed: 78, started: 95, efficiency: 82 },
    { week: 'Week 4', completed: 105, started: 115, efficiency: 91 },
    { week: 'Week 5', completed: 98, started: 108, efficiency: 91 }
  ];

  const agentTypeProductivity = agents.reduce((acc, agent) => {
    const existing = acc.find(item => item.type === agent.type);
    if (existing) {
      existing.count += 1;
      existing.avgProgress += agent.progress;
    } else {
      acc.push({
        type: agent.type,
        count: 1,
        avgProgress: agent.progress,
        color: getTypeColor(agent.type)
      });
    }
    return acc;
  }, [] as Array<{ type: string; count: number; avgProgress: number; color: string }>)
  .map(item => ({
    ...item,
    avgProgress: Math.round(item.avgProgress / item.count)
  }));

  const taskCompletionTrend = [
    { time: '00:00', completed: 12, inProgress: 8 },
    { time: '04:00', completed: 15, inProgress: 12 },
    { time: '08:00', completed: 28, inProgress: 18 },
    { time: '12:00', completed: 45, inProgress: 22 },
    { time: '16:00', completed: 52, inProgress: 15 },
    { time: '20:00', completed: 48, inProgress: 10 },
    { time: '23:59', completed: 38, inProgress: 8 }
  ];

  function getTypeColor(type: string): string {
    const colors = {
      planning: '#3B82F6',
      frontend: '#10B981',
      backend: '#F59E0B',
      qa: '#EF4444',
      documentation: '#8B5CF6',
      devops: '#06B6D4'
    };
    return colors[type as keyof typeof colors] || '#6B7280';
  }

  return (
    <div className="space-y-6">
      {/* Productivity Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Weekly Productivity Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyProductivity}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="completed" 
                  stackId="1"
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.6}
                  name="Completed Tasks"
                />
                <Area 
                  type="monotone" 
                  dataKey="started" 
                  stackId="2"
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.4}
                  name="Started Tasks"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Agent Type Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChartIcon className="w-5 h-5" />
              Performance by Agent Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agentTypeProductivity}>
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="avgProgress" name="Avg Progress %" radius={[4, 4, 0, 0]}>
                    {agentTypeProductivity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5" />
              Agent Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={agentTypeProductivity}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="count"
                    nameKey="type"
                  >
                    {agentTypeProductivity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Completion Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Daily Task Completion Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={taskCompletionTrend}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Completed"
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="inProgress" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  name="In Progress"
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
