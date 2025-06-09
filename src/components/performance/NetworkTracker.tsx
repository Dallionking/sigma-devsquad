
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Globe, Clock, Download, Upload } from 'lucide-react';

interface NetworkRequest {
  id: string;
  url: string;
  method: string;
  status: number;
  duration: number;
  size: number;
  timestamp: number;
  type: 'fetch' | 'xhr' | 'websocket';
}

interface NetworkTrackerProps {
  isRecording: boolean;
}

export const NetworkTracker = ({ isRecording }: NetworkTrackerProps) => {
  const [requests, setRequests] = useState<NetworkRequest[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  // Mock network monitoring (in a real app, you'd intercept fetch/xhr)
  useEffect(() => {
    if (!isRecording) return;

    // Simulate network requests for demo
    const interval = setInterval(() => {
      const mockRequest: NetworkRequest = {
        id: Math.random().toString(36),
        url: ['/api/agents', '/api/tasks', '/api/messages', '/api/websocket'][Math.floor(Math.random() * 4)],
        method: ['GET', 'POST', 'PUT'][Math.floor(Math.random() * 3)],
        status: Math.random() > 0.1 ? 200 : 500,
        duration: Math.random() * 1000 + 50,
        size: Math.random() * 10000 + 1000,
        timestamp: Date.now(),
        type: 'fetch'
      };

      setRequests(prev => [...prev.slice(-49), mockRequest]);
    }, 3000);

    return () => clearInterval(interval);
  }, [isRecording]);

  // Update chart data
  useEffect(() => {
    const now = Date.now();
    const last60Seconds = requests.filter(r => now - r.timestamp < 60000);
    
    // Group by 5-second intervals
    const intervals = Array.from({ length: 12 }, (_, i) => {
      const intervalStart = now - (11 - i) * 5000;
      const intervalEnd = intervalStart + 5000;
      
      const intervalRequests = last60Seconds.filter(
        r => r.timestamp >= intervalStart && r.timestamp < intervalEnd
      );
      
      return {
        time: new Date(intervalStart).toLocaleTimeString(),
        requests: intervalRequests.length,
        avgDuration: intervalRequests.length > 0 
          ? intervalRequests.reduce((sum, r) => sum + r.duration, 0) / intervalRequests.length 
          : 0,
        totalSize: intervalRequests.reduce((sum, r) => sum + r.size, 0),
        errors: intervalRequests.filter(r => r.status >= 400).length
      };
    });
    
    setChartData(intervals);
  }, [requests]);

  const recentRequests = requests.slice(-10);
  const avgDuration = requests.length > 0 
    ? requests.reduce((sum, r) => sum + r.duration, 0) / requests.length 
    : 0;
  const errorRate = requests.length > 0 
    ? (requests.filter(r => r.status >= 400).length / requests.length) * 100 
    : 0;

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'success';
    if (status >= 300 && status < 400) return 'warning';
    return 'destructive';
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  return (
    <div className="space-y-4">
      {/* Network Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4" />
              <span className="font-medium">Total Requests</span>
            </div>
            <div className="text-2xl font-bold">{requests.length}</div>
            <div className="text-sm text-muted-foreground">Since recording</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Avg Response</span>
            </div>
            <div className="text-2xl font-bold">{avgDuration.toFixed(0)}ms</div>
            <Badge variant={avgDuration > 1000 ? "destructive" : "secondary"} className="mt-1">
              {avgDuration > 1000 ? "Slow" : "Fast"}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Download className="w-4 h-4" />
              <span className="font-medium">Data Transfer</span>
            </div>
            <div className="text-2xl font-bold">
              {formatSize(requests.reduce((sum, r) => sum + r.size, 0))}
            </div>
            <div className="text-sm text-muted-foreground">Total downloaded</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Upload className="w-4 h-4" />
              <span className="font-medium">Error Rate</span>
            </div>
            <div className="text-2xl font-bold">{errorRate.toFixed(1)}%</div>
            <Badge variant={errorRate > 5 ? "destructive" : "secondary"} className="mt-1">
              {errorRate > 5 ? "High" : "Low"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Network Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Network Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#8884d8" 
                  name="Requests"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="avgDuration" 
                  stroke="#82ca9d" 
                  name="Avg Duration (ms)"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="errors" 
                  stroke="#ff7300" 
                  name="Errors"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Network Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentRequests.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No network requests recorded yet
              </div>
            ) : (
              recentRequests.reverse().map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 border rounded hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{request.method}</Badge>
                    <Badge variant={getStatusColor(request.status) as any}>
                      {request.status}
                    </Badge>
                    <span className="font-mono text-sm">{request.url}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{request.duration.toFixed(0)}ms</span>
                    <span>{formatSize(request.size)}</span>
                    <span>{new Date(request.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
