
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Activity,
  CheckCircle,
  XCircle,
  Pause
} from 'lucide-react';
import { WorkflowRule, AutomationExecution } from '@/types/workflow-automation';

interface AutomationStatsProps {
  rules: WorkflowRule[];
  executions: AutomationExecution[];
}

export const AutomationStats: React.FC<AutomationStatsProps> = ({
  rules,
  executions
}) => {
  // Calculate statistics
  const totalRules = rules.length;
  const enabledRules = rules.filter(rule => rule.isEnabled).length;
  const totalExecutions = executions.length;
  const successfulExecutions = executions.filter(exec => exec.status === 'success').length;
  const errorExecutions = executions.filter(exec => exec.status === 'error').length;
  const skippedExecutions = executions.filter(exec => exec.status === 'skipped').length;
  
  const successRate = totalExecutions > 0 ? (successfulExecutions / totalExecutions) * 100 : 0;
  const avgExecutionTime = executions.length > 0 
    ? executions.reduce((sum, exec) => sum + exec.duration, 0) / executions.length 
    : 0;

  // Execution status data for pie chart
  const statusData = [
    { name: 'Success', value: successfulExecutions, color: '#10b981' },
    { name: 'Error', value: errorExecutions, color: '#ef4444' },
    { name: 'Skipped', value: skippedExecutions, color: '#f59e0b' }
  ].filter(item => item.value > 0);

  // Rules by trigger type
  const triggerTypeData = rules.reduce((acc, rule) => {
    const type = rule.trigger.type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const triggerChartData = Object.entries(triggerTypeData).map(([type, count]) => ({
    trigger: type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    count
  }));

  // Executions over time (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const dailyExecutions = last7Days.map(date => {
    const dayExecutions = executions.filter(exec => 
      exec.executedAt.split('T')[0] === date
    );
    return {
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' }),
      total: dayExecutions.length,
      success: dayExecutions.filter(exec => exec.status === 'success').length,
      error: dayExecutions.filter(exec => exec.status === 'error').length
    };
  });

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Active Rules</span>
            </div>
            <div className="text-2xl font-bold">{enabledRules}/{totalRules}</div>
            <div className="text-xs text-muted-foreground">
              {totalRules - enabledRules} disabled
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Success Rate</span>
            </div>
            <div className="text-2xl font-bold">{Math.round(successRate)}%</div>
            <div className="text-xs text-muted-foreground">
              {successfulExecutions}/{totalExecutions} executions
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Avg Duration</span>
            </div>
            <div className="text-2xl font-bold">{Math.round(avgExecutionTime)}ms</div>
            <div className="text-xs text-muted-foreground">Per execution</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Total Runs</span>
            </div>
            <div className="text-2xl font-bold">{totalExecutions}</div>
            <div className="text-xs text-muted-foreground">All time</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Execution Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Execution Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statusData.length > 0 ? (
              <ChartContainer
                config={{
                  success: { label: "Success", color: "#10b981" },
                  error: { label: "Error", color: "#ef4444" },
                  skipped: { label: "Skipped", color: "#f59e0b" }
                }}
                className="h-64"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No execution data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Rules by Trigger Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Rules by Trigger Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            {triggerChartData.length > 0 ? (
              <ChartContainer
                config={{
                  count: { label: "Rule Count", color: "hsl(var(--chart-1))" }
                }}
                className="h-64"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={triggerChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="trigger" 
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No rules configured yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Daily Executions Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Daily Execution Trend (Last 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              total: { label: "Total", color: "hsl(var(--chart-1))" },
              success: { label: "Success", color: "hsl(var(--chart-2))" },
              error: { label: "Error", color: "hsl(var(--chart-3))" }
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyExecutions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="success" stackId="a" fill="hsl(var(--chart-2))" name="Success" />
                <Bar dataKey="error" stackId="a" fill="hsl(var(--chart-3))" name="Error" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Rule Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rule Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rules.map(rule => {
              const ruleExecutions = executions.filter(exec => exec.ruleId === rule.id);
              const ruleSuccessRate = ruleExecutions.length > 0 
                ? (ruleExecutions.filter(exec => exec.status === 'success').length / ruleExecutions.length) * 100 
                : 0;
              
              return (
                <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${rule.isEnabled ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <div>
                      <h4 className="font-medium">{rule.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {rule.trigger.type.replace('_', ' ')} trigger
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-sm font-medium">{ruleExecutions.length}</div>
                      <div className="text-xs text-muted-foreground">Executions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">{Math.round(ruleSuccessRate)}%</div>
                      <div className="text-xs text-muted-foreground">Success</div>
                    </div>
                    <Badge variant={rule.isEnabled ? "default" : "secondary"}>
                      {rule.isEnabled ? "Active" : "Disabled"}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
