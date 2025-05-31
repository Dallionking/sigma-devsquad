
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip,
  AreaChart,
  Area
} from "recharts";
import { 
  Cpu, 
  HardDrive, 
  Wifi, 
  Database, 
  Server, 
  Activity,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export const SystemPerformanceMetrics = () => {
  // Mock system performance data
  const systemMetrics = [
    { name: 'CPU Usage', value: 45, status: 'healthy', icon: Cpu, color: 'text-green-500' },
    { name: 'Memory Usage', value: 62, status: 'warning', icon: HardDrive, color: 'text-yellow-500' },
    { name: 'Network', value: 89, status: 'healthy', icon: Wifi, color: 'text-green-500' },
    { name: 'Database', value: 34, status: 'healthy', icon: Database, color: 'text-green-500' },
    { name: 'API Response', value: 98, status: 'excellent', icon: Server, color: 'text-blue-500' }
  ];

  const performanceTrend = [
    { time: '00:00', cpu: 35, memory: 55, network: 85 },
    { time: '04:00', cpu: 42, memory: 58, network: 88 },
    { time: '08:00', cpu: 55, memory: 65, network: 92 },
    { time: '12:00', cpu: 48, memory: 62, network: 89 },
    { time: '16:00', cpu: 52, memory: 68, network: 85 },
    { time: '20:00', cpu: 45, memory: 60, network: 87 }
  ];

  const uptimeData = [
    { period: 'Last 24h', uptime: 99.9 },
    { period: 'Last 7d', uptime: 99.8 },
    { period: 'Last 30d', uptime: 99.5 },
    { period: 'Last 90d', uptime: 99.2 }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      healthy: { label: 'Healthy', variant: 'secondary', className: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' },
      warning: { label: 'Warning', variant: 'secondary', className: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' },
      excellent: { label: 'Excellent', variant: 'secondary', className: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.healthy;
    return (
      <Badge variant={config.variant as any} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Status</p>
                <p className="text-2xl font-bold text-green-600">Healthy</p>
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">All systems operational</span>
                </div>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Uptime</p>
                <p className="text-2xl font-bold">99.9%</p>
                <Badge variant="secondary" className="mt-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                  24/7 availability
                </Badge>
              </div>
              <Server className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold">2</p>
                <div className="flex items-center gap-1 mt-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-yellow-600">Minor warnings</span>
                </div>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Resource Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${metric.color}`} />
                      <span className="font-medium">{metric.name}</span>
                    </div>
                    {getStatusBadge(metric.status)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Usage</span>
                      <span className="font-medium">{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            Performance Trends (Last 24 Hours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceTrend}>
                <XAxis dataKey="time" />
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
                  dataKey="cpu" 
                  stackId="1"
                  stroke="#EF4444" 
                  fill="#EF4444" 
                  fillOpacity={0.3}
                  name="CPU %"
                />
                <Area 
                  type="monotone" 
                  dataKey="memory" 
                  stackId="2"
                  stroke="#F59E0B" 
                  fill="#F59E0B" 
                  fillOpacity={0.3}
                  name="Memory %"
                />
                <Area 
                  type="monotone" 
                  dataKey="network" 
                  stackId="3"
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.3}
                  name="Network %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Uptime Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            Uptime Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {uptimeData.map((item) => (
              <div key={item.period} className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{item.uptime}%</div>
                <div className="text-sm text-muted-foreground">{item.period}</div>
                <Progress value={item.uptime} className="mt-2 h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
