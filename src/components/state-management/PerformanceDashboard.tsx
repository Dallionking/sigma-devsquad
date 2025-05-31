
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useStateStore } from '@/contexts/StateStoreContext';
import { Activity, Zap, Clock, TrendingUp, AlertTriangle, Cpu } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, AreaChart, Area, BarChart, Bar } from 'recharts';

export const PerformanceDashboard = () => {
  const { state } = useStateStore();
  const [timeRange, setTimeRange] = useState('1h');
  
  // Mock performance data for charts
  const performanceData = [
    { time: '10:00', renderTime: 12, memory: 45, requests: 5 },
    { time: '10:15', renderTime: 15, memory: 48, requests: 8 },
    { time: '10:30', renderTime: 18, memory: 52, requests: 12 },
    { time: '10:45', renderTime: 14, memory: 49, requests: 6 },
    { time: '11:00', renderTime: 16, memory: 55, requests: 9 },
  ];
  
  const componentMetrics = Object.entries(state.performance.renderTimes).map(([name, time]) => ({
    name,
    time,
    status: time > 16 ? 'slow' : time > 10 ? 'medium' : 'fast'
  }));
  
  const networkRequests = state.performance.networkRequests.slice(-10);
  
  const getPerformanceScore = () => {
    const avgRenderTime = componentMetrics.length > 0 
      ? componentMetrics.reduce((sum, m) => sum + m.time, 0) / componentMetrics.length 
      : 0;
    
    if (avgRenderTime < 10) return { score: 95, grade: 'A', color: 'text-green-600' };
    if (avgRenderTime < 16) return { score: 80, grade: 'B', color: 'text-yellow-600' };
    if (avgRenderTime < 25) return { score: 65, grade: 'C', color: 'text-orange-600' };
    return { score: 40, grade: 'D', color: 'text-red-600' };
  };
  
  const performanceScore = getPerformanceScore();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Performance Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant={timeRange === '1h' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('1h')}
          >
            1H
          </Button>
          <Button
            variant={timeRange === '24h' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('24h')}
          >
            24H
          </Button>
          <Button
            variant={timeRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('7d')}
          >
            7D
          </Button>
        </div>
      </div>
      
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Performance Score</p>
                <p className={`text-2xl font-bold ${performanceScore.color}`}>
                  {performanceScore.grade}
                </p>
                <p className="text-sm text-muted-foreground">{performanceScore.score}/100</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <Progress value={performanceScore.score} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">State Updates</p>
                <p className="text-2xl font-bold">{state.performance.stateUpdates}</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Memory Usage</p>
                <p className="text-2xl font-bold">
                  {(state.performance.memoryUsage / 1024 / 1024).toFixed(1)}MB
                </p>
              </div>
              <Cpu className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Network Requests</p>
                <p className="text-2xl font-bold">{state.performance.networkRequests.length}</p>
              </div>
              <Zap className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Render Performance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="renderTime" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Memory Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="memory" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="components">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Component Render Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {componentMetrics.map((component) => (
                  <div key={component.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{component.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          component.status === 'fast' 
                            ? 'default' 
                            : component.status === 'medium' 
                            ? 'secondary' 
                            : 'destructive'
                        }
                      >
                        {component.time.toFixed(2)}ms
                      </Badge>
                      {component.status === 'slow' && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="network">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Network Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {networkRequests.map((request, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="text-sm font-medium">{request.method} {request.url}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(request.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={request.status < 400 ? 'default' : 'destructive'}>
                        {request.status}
                      </Badge>
                      <span className="text-xs">{request.duration}ms</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="memory">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Memory Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Current Usage</label>
                    <p className="text-2xl font-bold">
                      {(state.performance.memoryUsage / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">State Size</label>
                    <p className="text-2xl font-bold">
                      {(JSON.stringify(state).length / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="memory" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
