
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Bug, AlertTriangle, RefreshCw, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface QualityMetrics {
  period: string;
  bugsReported: number;
  bugsFixed: number;
  issuesCreated: number;
  issuesResolved: number;
  reworkTasks: number;
  codeQualityScore: number;
  testCoverage: number;
  defectRate: number;
}

interface BugData {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignee: string;
  dateReported: Date;
  dateResolved?: Date;
  component: string;
  timeToResolve?: number;
}

interface QualityMetricsDashboardProps {
  teamId?: string;
  timeRange: string;
}

const generateQualityMetrics = (): QualityMetrics[] => {
  const periods = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
  
  return periods.map(period => ({
    period,
    bugsReported: Math.floor(Math.random() * 15) + 5,
    bugsFixed: Math.floor(Math.random() * 12) + 8,
    issuesCreated: Math.floor(Math.random() * 20) + 10,
    issuesResolved: Math.floor(Math.random() * 18) + 12,
    reworkTasks: Math.floor(Math.random() * 8) + 2,
    codeQualityScore: Math.floor(Math.random() * 20) + 80,
    testCoverage: Math.floor(Math.random() * 15) + 85,
    defectRate: Math.floor(Math.random() * 5) + 1
  }));
};

const generateBugData = (): BugData[] => {
  const bugs = [
    'Login form validation error',
    'Dashboard data loading issue',
    'Navigation menu not responsive',
    'API timeout on large datasets',
    'File upload progress not showing',
    'Search functionality returning wrong results',
    'User profile image not displaying',
    'Email notification not sending'
  ];

  return bugs.map((title, index) => {
    const dateReported = new Date();
    dateReported.setDate(dateReported.getDate() - Math.floor(Math.random() * 14));
    
    const status: BugData['status'][] = ['open', 'in_progress', 'resolved', 'closed'];
    const severity: BugData['severity'][] = ['critical', 'high', 'medium', 'low'];
    const currentStatus = status[Math.floor(Math.random() * status.length)];
    
    const timeToResolve = currentStatus === 'resolved' || currentStatus === 'closed' 
      ? Math.floor(Math.random() * 10) + 1 
      : undefined;

    return {
      id: `bug-${index}`,
      title,
      severity: severity[Math.floor(Math.random() * severity.length)],
      status: currentStatus,
      assignee: ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson'][Math.floor(Math.random() * 4)],
      dateReported,
      dateResolved: timeToResolve ? new Date(dateReported.getTime() + timeToResolve * 24 * 60 * 60 * 1000) : undefined,
      component: ['Frontend', 'Backend', 'Database', 'API'][Math.floor(Math.random() * 4)],
      timeToResolve
    };
  });
};

const chartConfig = {
  bugsReported: { label: "Bugs Reported", color: "#ef4444" },
  bugsFixed: { label: "Bugs Fixed", color: "#10b981" },
  issuesCreated: { label: "Issues Created", color: "#f59e0b" },
  issuesResolved: { label: "Issues Resolved", color: "#3b82f6" },
};

export const QualityMetricsDashboard = ({ 
  teamId, 
  timeRange 
}: QualityMetricsDashboardProps) => {
  const qualityMetrics = generateQualityMetrics();
  const bugData = generateBugData();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentWeek = qualityMetrics[qualityMetrics.length - 1];
  const previousWeek = qualityMetrics[qualityMetrics.length - 2];

  const stats = {
    totalBugs: bugData.length,
    openBugs: bugData.filter(b => b.status === 'open' || b.status === 'in_progress').length,
    resolvedBugs: bugData.filter(b => b.status === 'resolved' || b.status === 'closed').length,
    criticalBugs: bugData.filter(b => b.severity === 'critical').length,
    averageResolutionTime: Math.round(
      bugData.filter(b => b.timeToResolve).reduce((sum, b) => sum + (b.timeToResolve || 0), 0) / 
      bugData.filter(b => b.timeToResolve).length
    ),
    codeQualityTrend: currentWeek.codeQualityScore - previousWeek.codeQualityScore,
    defectRateTrend: currentWeek.defectRate - previousWeek.defectRate
  };

  const severityDistribution = [
    { name: 'Critical', value: bugData.filter(b => b.severity === 'critical').length, color: '#ef4444' },
    { name: 'High', value: bugData.filter(b => b.severity === 'high').length, color: '#f97316' },
    { name: 'Medium', value: bugData.filter(b => b.severity === 'medium').length, color: '#eab308' },
    { name: 'Low', value: bugData.filter(b => b.severity === 'low').length, color: '#22c55e' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bug className="w-5 h-5" />
          Quality Metrics Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-3 border rounded-lg text-center">
              <div className="text-lg font-bold text-red-600">{stats.totalBugs}</div>
              <div className="text-sm text-muted-foreground">Total Bugs</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <div className="text-lg font-bold text-orange-600">{stats.openBugs}</div>
              <div className="text-sm text-muted-foreground">Open Issues</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <div className="text-lg font-bold text-green-600">{stats.resolvedBugs}</div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <div className="text-lg font-bold text-purple-600">{stats.averageResolutionTime}d</div>
              <div className="text-sm text-muted-foreground">Avg Resolution</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <div className="text-lg font-bold text-blue-600">{currentWeek.codeQualityScore}%</div>
              <div className="text-sm text-muted-foreground">Code Quality</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                {stats.codeQualityTrend > 0 ? 
                  <TrendingUp className="w-3 h-3 text-green-500" /> : 
                  <TrendingDown className="w-3 h-3 text-red-500" />
                }
                <span className={`text-xs ${stats.codeQualityTrend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.codeQualityTrend > 0 ? '+' : ''}{stats.codeQualityTrend}%
                </span>
              </div>
            </div>
          </div>

          {/* Quality Trends */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Bug Trends</h4>
              <div className="h-64">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={qualityMetrics}>
                      <XAxis dataKey="period" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="bugsReported" stroke="var(--color-bugsReported)" strokeWidth={2} />
                      <Line type="monotone" dataKey="bugsFixed" stroke="var(--color-bugsFixed)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Bug Severity Distribution</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={severityDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {severityDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Quality Metrics Over Time */}
          <div className="space-y-3">
            <h4 className="font-medium">Quality Metrics Trends</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={qualityMetrics}>
                  <XAxis dataKey="period" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-lg shadow-lg p-3">
                            <p className="font-medium">{label}</p>
                            {payload.map((entry, index) => (
                              <p key={index} className="text-sm">
                                {entry.name}: {entry.value}%
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line type="monotone" dataKey="codeQualityScore" stroke="#10b981" strokeWidth={2} name="Code Quality" />
                  <Line type="monotone" dataKey="testCoverage" stroke="#3b82f6" strokeWidth={2} name="Test Coverage" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Critical Issues */}
          {stats.criticalBugs > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Critical Issues Requiring Attention
              </h4>
              <div className="space-y-2">
                {bugData.filter(b => b.severity === 'critical' && (b.status === 'open' || b.status === 'in_progress')).map((bug) => (
                  <div key={bug.id} className="p-3 border border-red-200 bg-red-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-medium text-red-900">{bug.title}</h5>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getSeverityColor(bug.severity)}>{bug.severity}</Badge>
                          <Badge className={getStatusColor(bug.status)}>{bug.status.replace('_', ' ')}</Badge>
                          <span className="text-sm text-muted-foreground">Assigned to: {bug.assignee}</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.floor((new Date().getTime() - bug.dateReported.getTime()) / (1000 * 60 * 60 * 24))} days ago
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Bug Activity */}
          <div className="space-y-3">
            <h4 className="font-medium">Recent Bug Activity</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {bugData.slice(0, 6).map((bug) => (
                <div key={bug.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium">{bug.title}</h5>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getSeverityColor(bug.severity)}>{bug.severity}</Badge>
                        <Badge className={getStatusColor(bug.status)}>{bug.status.replace('_', ' ')}</Badge>
                        <span className="text-sm text-muted-foreground">{bug.component}</span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>Assigned to: {bug.assignee}</div>
                      <div>{bug.dateReported.toLocaleDateString()}</div>
                      {bug.timeToResolve && (
                        <div className="text-green-600">Resolved in {bug.timeToResolve}d</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quality Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h5 className="font-medium mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Quality Achievements
              </h5>
              <ul className="text-sm space-y-1">
                <li>• Test coverage increased to {currentWeek.testCoverage}%</li>
                <li>• Code quality score: {currentWeek.codeQualityScore}%</li>
                <li>• {stats.resolvedBugs} bugs resolved this period</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h5 className="font-medium mb-2 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-blue-500" />
                Improvement Areas
              </h5>
              <ul className="text-sm space-y-1">
                <li>• {stats.openBugs} open issues need attention</li>
                <li>• Average resolution time: {stats.averageResolutionTime} days</li>
                <li>• {currentWeek.reworkTasks} tasks required rework</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
