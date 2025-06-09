
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, GitBranch, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface ScopeChange {
  id: string;
  type: 'addition' | 'removal' | 'modification';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  timeImpact: number; // in days
  costImpact: number; // percentage
  date: Date;
  requestedBy: string;
  status: 'pending' | 'approved' | 'rejected' | 'implemented';
  reason: string;
}

interface ScopeMetrics {
  period: string;
  additions: number;
  removals: number;
  modifications: number;
  totalChanges: number;
  scopeCreep: number;
  approvalRate: number;
}

interface ScopeChangeTrackingProps {
  projectId?: string;
  timeRange: string;
}

const generateScopeChanges = (): ScopeChange[] => {
  const changes = [
    'Add user authentication system',
    'Modify dashboard layout',
    'Remove deprecated API endpoints',
    'Add real-time notifications',
    'Modify database schema',
    'Add mobile responsiveness',
    'Remove unused components',
    'Add advanced analytics',
    'Modify user permissions',
    'Add export functionality'
  ];

  return changes.map((title, index) => {
    const types: ScopeChange['type'][] = ['addition', 'removal', 'modification'];
    const type = types[Math.floor(Math.random() * types.length)];
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));

    return {
      id: `change-${index}`,
      type,
      title,
      description: `${type} request for ${title.toLowerCase()}`,
      impact: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as ScopeChange['impact'],
      timeImpact: Math.floor(Math.random() * 10) + 1,
      costImpact: Math.floor(Math.random() * 25) + 5,
      date,
      requestedBy: ['Product Owner', 'Client', 'Developer', 'Designer'][Math.floor(Math.random() * 4)],
      status: ['pending', 'approved', 'rejected', 'implemented'][Math.floor(Math.random() * 4)] as ScopeChange['status'],
      reason: 'Business requirement change'
    };
  });
};

const generateScopeMetrics = (): ScopeMetrics[] => {
  const periods = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
  
  return periods.map(period => {
    const additions = Math.floor(Math.random() * 5) + 1;
    const removals = Math.floor(Math.random() * 3);
    const modifications = Math.floor(Math.random() * 4) + 1;
    const totalChanges = additions + removals + modifications;
    
    return {
      period,
      additions,
      removals,
      modifications,
      totalChanges,
      scopeCreep: Math.floor(Math.random() * 20) + 5,
      approvalRate: Math.floor(Math.random() * 30) + 70
    };
  });
};

const chartConfig = {
  additions: { label: "Additions", color: "#10b981" },
  modifications: { label: "Modifications", color: "#f59e0b" },
  removals: { label: "Removals", color: "#ef4444" },
};

export const ScopeChangeTracking = ({ 
  projectId, 
  timeRange 
}: ScopeChangeTrackingProps) => {
  const scopeChanges = generateScopeChanges();
  const scopeMetrics = generateScopeMetrics();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'addition': return 'bg-green-100 text-green-800';
      case 'removal': return 'bg-red-100 text-red-800';
      case 'modification': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    totalChanges: scopeChanges.length,
    approved: scopeChanges.filter(c => c.status === 'approved' || c.status === 'implemented').length,
    pending: scopeChanges.filter(c => c.status === 'pending').length,
    averageTimeImpact: Math.round(scopeChanges.reduce((sum, c) => sum + c.timeImpact, 0) / scopeChanges.length),
    averageCostImpact: Math.round(scopeChanges.reduce((sum, c) => sum + c.costImpact, 0) / scopeChanges.length),
    scopeCreep: Math.round(scopeMetrics.reduce((sum, m) => sum + m.scopeCreep, 0) / scopeMetrics.length)
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="w-5 h-5" />
          Scope Change Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-3 border rounded-lg text-center">
              <div className="text-lg font-bold text-blue-600">{stats.totalChanges}</div>
              <div className="text-sm text-muted-foreground">Total Changes</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <div className="text-lg font-bold text-green-600">{stats.approved}</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <div className="text-lg font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <div className="text-lg font-bold text-orange-600">{stats.averageTimeImpact}d</div>
              <div className="text-sm text-muted-foreground">Avg Time Impact</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <div className="text-lg font-bold text-red-600">{stats.scopeCreep}%</div>
              <div className="text-sm text-muted-foreground">Scope Creep</div>
            </div>
          </div>

          {/* Scope Changes Over Time */}
          <div className="space-y-3">
            <h4 className="font-medium">Scope Changes Over Time</h4>
            <div className="h-64">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={scopeMetrics}>
                    <XAxis dataKey="period" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="additions" stackId="1" stroke="var(--color-additions)" fill="var(--color-additions)" />
                    <Area type="monotone" dataKey="modifications" stackId="1" stroke="var(--color-modifications)" fill="var(--color-modifications)" />
                    <Area type="monotone" dataKey="removals" stackId="1" stroke="var(--color-removals)" fill="var(--color-removals)" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          {/* Scope Creep Trend */}
          <div className="space-y-3">
            <h4 className="font-medium">Scope Creep Trend</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scopeMetrics}>
                  <XAxis dataKey="period" />
                  <YAxis />
                  <ChartTooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-lg shadow-lg p-3">
                            <p className="font-medium">{label}</p>
                            <p className="text-sm">Scope Creep: {payload[0].value}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="scopeCreep" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Scope Changes */}
          <div className="space-y-3">
            <h4 className="font-medium">Recent Scope Changes</h4>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {scopeChanges.slice(0, 8).map((change) => (
                <div key={change.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium">{change.title}</h5>
                    <div className="flex gap-2">
                      <Badge className={getTypeColor(change.type)}>
                        {change.type}
                      </Badge>
                      <Badge className={getStatusColor(change.status)}>
                        {change.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{change.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Impact Level</div>
                      <Badge className={getImpactColor(change.impact)}>
                        {change.impact}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Time Impact</div>
                      <div className="font-medium">{change.timeImpact} days</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Cost Impact</div>
                      <div className="font-medium">{change.costImpact}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Requested By</div>
                      <div className="font-medium">{change.requestedBy}</div>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-muted-foreground">
                    Requested on {change.date.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Analysis */}
          <div className="space-y-3">
            <h4 className="font-medium">Impact Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium mb-2">Time Impact Distribution</h5>
                <div className="space-y-2">
                  {['low', 'medium', 'high'].map(impact => {
                    const count = scopeChanges.filter(c => c.impact === impact).length;
                    const percentage = (count / scopeChanges.length) * 100;
                    return (
                      <div key={impact} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{impact} Impact</span>
                        <div className="flex items-center gap-2">
                          <Progress value={percentage} className="w-24 h-2" />
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium mb-2">Change Type Distribution</h5>
                <div className="space-y-2">
                  {['addition', 'modification', 'removal'].map(type => {
                    const count = scopeChanges.filter(c => c.type === type).length;
                    const percentage = (count / scopeChanges.length) * 100;
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{type}s</span>
                        <div className="flex items-center gap-2">
                          <Progress value={percentage} className="w-24 h-2" />
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
