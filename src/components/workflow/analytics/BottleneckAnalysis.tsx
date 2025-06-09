
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  AlertTriangle, 
  Clock, 
  Users, 
  TrendingDown, 
  Lightbulb,
  ArrowRight,
  Zap
} from 'lucide-react';
import { BottleneckData } from '@/types/workflow-analytics';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface BottleneckAnalysisProps {
  data: BottleneckData[];
  loading?: boolean;
  expanded?: boolean;
}

export const BottleneckAnalysis: React.FC<BottleneckAnalysisProps> = ({
  data,
  loading,
  expanded = false
}) => {
  const [selectedBottleneck, setSelectedBottleneck] = useState<BottleneckData | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 border-red-200 bg-red-50';
      case 'high': return 'text-orange-600 border-orange-200 bg-orange-50';
      case 'medium': return 'text-yellow-600 border-yellow-200 bg-yellow-50';
      case 'low': return 'text-green-600 border-green-200 bg-green-50';
      default: return 'text-gray-600 border-gray-200 bg-gray-50';
    }
  };

  const getBarColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const chartData = data.map(bottleneck => ({
    name: bottleneck.stageName,
    waitTime: bottleneck.averageWaitTime,
    queueSize: bottleneck.tasksInQueue,
    utilization: bottleneck.capacityUtilization,
    throughput: bottleneck.throughputRate,
    severity: bottleneck.severity,
    color: getBarColor(bottleneck.severity)
  }));

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Bottleneck Analysis
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

  const criticalBottlenecks = data.filter(b => b.severity === 'critical' || b.severity === 'high');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Bottleneck Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Critical Alert */}
          {criticalBottlenecks.length > 0 && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>{criticalBottlenecks.length} critical bottleneck(s)</strong> detected that require immediate attention.
                Average wait time increased by 40% in the last week.
              </AlertDescription>
            </Alert>
          )}

          {/* Wait Time Chart */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Average Wait Time by Stage
            </h4>
            <ChartContainer
              config={{
                waitTime: { label: "Wait Time (hours)", color: "hsl(var(--chart-1))" }
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="waitTime" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Bottleneck Cards */}
          <div className="space-y-3">
            {data.map((bottleneck) => (
              <Card 
                key={bottleneck.id} 
                className={`border-l-4 ${getSeverityColor(bottleneck.severity)} cursor-pointer transition-all hover:shadow-md ${
                  selectedBottleneck?.id === bottleneck.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedBottleneck(selectedBottleneck?.id === bottleneck.id ? null : bottleneck)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium">{bottleneck.stageName}</h4>
                      <Badge className={getSeverityTextColor(bottleneck.severity)}>
                        {bottleneck.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {bottleneck.tasksInQueue} in queue
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {bottleneck.averageWaitTime}h avg wait
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Capacity Utilization</div>
                      <div className="flex items-center gap-2">
                        <Progress value={bottleneck.capacityUtilization} className="flex-1 h-2" />
                        <span className="text-sm font-medium">{bottleneck.capacityUtilization}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Throughput Rate</div>
                      <div className="text-sm font-medium">{bottleneck.throughputRate} tasks/day</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Queue Size</div>
                      <div className="text-sm font-medium">{bottleneck.tasksInQueue} tasks</div>
                    </div>
                  </div>

                  {selectedBottleneck?.id === bottleneck.id && (
                    <div className="mt-4 pt-4 border-t">
                      <h5 className="font-medium mb-3 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                        Suggested Actions
                      </h5>
                      <div className="space-y-2">
                        {bottleneck.suggestedActions.map((action, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <ArrowRight className="w-3 h-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                      {expanded && (
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">
                            Create Action Plan
                          </Button>
                          <Button size="sm" variant="outline">
                            Set Alert
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Impact Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Impact Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                  <h4 className="font-medium text-red-800 mb-2">Critical Impact</h4>
                  <p className="text-sm text-red-700 mb-3">
                    Code Review bottleneck is causing a 48-hour delay on average, 
                    blocking 15 tasks and reducing team velocity by 35%.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">High Priority</Badge>
                    <span className="text-xs text-red-600">Affects 60% of workflow</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <h4 className="font-medium text-orange-800 mb-2">Secondary Impact</h4>
                  <p className="text-sm text-orange-700 mb-3">
                    QA Testing queue building up due to upstream delays, 
                    creating a cascading bottleneck effect.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Medium Priority</Badge>
                    <span className="text-xs text-orange-600">Downstream effect</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Assign additional reviewers to Code Review
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  Set SLA alerts for 24h+ queue times
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Implement automated pre-review checks
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Create escalation process for critical tasks
                </Button>
              </div>

              <div className="mt-6 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-1">Optimization Potential</h5>
                <p className="text-sm text-blue-700">
                  Addressing current bottlenecks could improve overall flow efficiency by 
                  <strong> 28%</strong> and reduce average lead time by <strong>2.5 days</strong>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
