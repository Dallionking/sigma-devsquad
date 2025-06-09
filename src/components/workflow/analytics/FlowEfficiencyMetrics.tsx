
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  Zap, 
  Clock, 
  TrendingUp, 
  Activity, 
  Target,
  BarChart3,
  PieChart
} from 'lucide-react';
import { FlowEfficiencyData } from '@/types/workflow-analytics';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Cell,
  BarChart,
  Bar
} from 'recharts';

interface FlowEfficiencyMetricsProps {
  data: FlowEfficiencyData;
  loading?: boolean;
}

export const FlowEfficiencyMetrics: React.FC<FlowEfficiencyMetricsProps> = ({
  data,
  loading
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const pieData = [
    { name: 'Work Time', value: data.workTime, color: '#22c55e' },
    { name: 'Wait Time', value: data.waitTime, color: '#ef4444' }
  ];

  const getEfficiencyLevel = (efficiency: number) => {
    if (efficiency >= 60) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (efficiency >= 40) return { level: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-50' };
    if (efficiency >= 25) return { level: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    return { level: 'Poor', color: 'text-red-600', bgColor: 'bg-red-50' };
  };

  const getStageEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 60) return 'text-green-600';
    if (efficiency >= 40) return 'text-blue-600';
    if (efficiency >= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Flow Efficiency Metrics
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

  const overallLevel = getEfficiencyLevel(data.totalEfficiency);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Flow Efficiency Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className={`text-center p-6 rounded-lg border-2 ${overallLevel.bgColor}`}>
              <div className={`text-3xl font-bold ${overallLevel.color} mb-2`}>
                {data.totalEfficiency}%
              </div>
              <div className="text-sm font-medium mb-1">Overall Efficiency</div>
              <Badge variant="outline" className={overallLevel.color}>
                {overallLevel.level}
              </Badge>
            </div>

            <div className="text-center p-6 rounded-lg bg-green-50 border-2 border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {data.workTime}h
              </div>
              <div className="text-sm font-medium text-green-700">Active Work Time</div>
              <div className="text-xs text-muted-foreground mt-1">
                {Math.round((data.workTime / (data.workTime + data.waitTime)) * 100)}% of total time
              </div>
            </div>

            <div className="text-center p-6 rounded-lg bg-red-50 border-2 border-red-200">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {data.waitTime}h
              </div>
              <div className="text-sm font-medium text-red-700">Wait Time</div>
              <div className="text-xs text-muted-foreground mt-1">
                {Math.round((data.waitTime / (data.workTime + data.waitTime)) * 100)}% of total time
              </div>
            </div>

            <div className="text-center p-6 rounded-lg bg-blue-50 border-2 border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Math.round((data.workTime + data.waitTime) / 24)}d
              </div>
              <div className="text-sm font-medium text-blue-700">Total Lead Time</div>
              <div className="text-xs text-muted-foreground mt-1">
                Average end-to-end time
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="stages">By Stage</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Work vs Wait Time Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <PieChart className="w-4 h-4" />
                      Time Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        workTime: { label: "Work Time", color: "#22c55e" },
                        waitTime: { label: "Wait Time", color: "#ef4444" }
                      }}
                      className="h-64"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <RechartsPieChart data={pieData}>
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </RechartsPieChart>
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                    <div className="flex justify-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span className="text-sm">Work Time ({data.workTime}h)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                        <span className="text-sm">Wait Time ({data.waitTime}h)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Efficiency Improvement Opportunities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Improvement Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                        <h4 className="font-medium text-red-800 mb-2">High Impact</h4>
                        <p className="text-sm text-red-700 mb-2">
                          Reduce Code Review wait time by 50% → +12% efficiency
                        </p>
                        <div className="text-xs text-red-600">Potential: 47% total efficiency</div>
                      </div>

                      <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                        <h4 className="font-medium text-orange-800 mb-2">Medium Impact</h4>
                        <p className="text-sm text-orange-700 mb-2">
                          Automate deployment process → +5% efficiency
                        </p>
                        <div className="text-xs text-orange-600">Potential: 40% total efficiency</div>
                      </div>

                      <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                        <h4 className="font-medium text-green-800 mb-2">Target Efficiency</h4>
                        <p className="text-sm text-green-700">
                          Industry benchmark: 40-60% for software development
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="stages" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Efficiency by Workflow Stage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      efficiency: { label: "Efficiency %", color: "hsl(var(--chart-1))" }
                    }}
                    className="h-64 mb-6"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.stageEfficiency}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="stageName" 
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="efficiency" radius={[4, 4, 0, 0]}>
                          {data.stageEfficiency.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={
                                entry.efficiency >= 60 ? '#22c55e' :
                                entry.efficiency >= 40 ? '#3b82f6' :
                                entry.efficiency >= 25 ? '#eab308' : '#ef4444'
                              } 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>

                  <div className="space-y-3">
                    {data.stageEfficiency.map((stage) => (
                      <div key={stage.stageId} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium">{stage.stageName}</h4>
                          <Badge variant="outline" className={getStageEfficiencyColor(stage.efficiency)}>
                            {stage.efficiency}%
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span>{stage.tasksProcessed} tasks</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {stage.averageWorkTime}h work
                          </span>
                          <span className="text-red-600">
                            {stage.averageWaitTime}h wait
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Efficiency Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      efficiency: { label: "Efficiency %", color: "hsl(var(--chart-1))" },
                      workTime: { label: "Work Time", color: "hsl(var(--chart-2))" },
                      waitTime: { label: "Wait Time", color: "hsl(var(--chart-3))" }
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.trends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => new Date(value).toLocaleDateString()}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="efficiency"
                          stroke="hsl(var(--chart-1))"
                          strokeWidth={3}
                          dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="workTime"
                          stroke="hsl(var(--chart-2))"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                        <Line
                          type="monotone"
                          dataKey="waitTime"
                          stroke="hsl(var(--chart-3))"
                          strokeWidth={2}
                          strokeDasharray="3 3"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>

                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">+8%</div>
                      <div className="text-sm text-muted-foreground">vs Last Week</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">↗ Trending</div>
                      <div className="text-sm text-muted-foreground">30-day trend</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">45%</div>
                      <div className="text-sm text-muted-foreground">Target by Q4</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Root Cause Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border-l-4 border-red-500 bg-red-50">
                        <h4 className="font-medium text-red-800 mb-2">Primary Issue</h4>
                        <p className="text-sm text-red-700 mb-2">
                          Manual code review process creates 65% of total wait time
                        </p>
                        <div className="text-xs text-red-600">
                          Impact: Reduces efficiency from potential 55% to 35%
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border-l-4 border-orange-500 bg-orange-50">
                        <h4 className="font-medium text-orange-800 mb-2">Secondary Issue</h4>
                        <p className="text-sm text-orange-700 mb-2">
                          Lack of parallel processing in QA stage
                        </p>
                        <div className="text-xs text-orange-600">
                          Impact: Additional 15% efficiency loss
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-50">
                        <h4 className="font-medium text-yellow-800 mb-2">Contributing Factor</h4>
                        <p className="text-sm text-yellow-700 mb-2">
                          Manual deployment process adds unnecessary wait time
                        </p>
                        <div className="text-xs text-yellow-600">
                          Impact: 5% efficiency reduction
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Optimization Roadmap
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-green-800">Phase 1: Quick Wins</h4>
                          <Badge variant="outline" className="text-green-600">2 weeks</Badge>
                        </div>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Implement automated linting and basic checks</li>
                          <li>• Parallel QA testing setup</li>
                          <li>• Expected improvement: +15% efficiency</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-blue-800">Phase 2: Process Improvement</h4>
                          <Badge variant="outline" className="text-blue-600">6 weeks</Badge>
                        </div>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Advanced automated review tools</li>
                          <li>• Continuous deployment pipeline</li>
                          <li>• Expected improvement: +20% efficiency</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-purple-800">Phase 3: Advanced Optimization</h4>
                          <Badge variant="outline" className="text-purple-600">12 weeks</Badge>
                        </div>
                        <ul className="text-sm text-purple-700 space-y-1">
                          <li>• AI-assisted code review</li>
                          <li>• Predictive quality gates</li>
                          <li>• Expected improvement: +10% efficiency</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
