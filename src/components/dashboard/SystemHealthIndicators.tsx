
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Cpu, Database, Globe, Shield, Zap } from "lucide-react";

export const SystemHealthIndicators = () => {
  const healthMetrics = [
    { 
      label: "CPU Usage", 
      value: "45%", 
      status: "healthy", 
      icon: Cpu,
      color: "text-green-500"
    },
    { 
      label: "Memory", 
      value: "2.1GB", 
      status: "healthy", 
      icon: Activity,
      color: "text-green-500"
    },
    { 
      label: "Database", 
      value: "Online", 
      status: "healthy", 
      icon: Database,
      color: "text-green-500"
    },
    { 
      label: "API", 
      value: "99.9%", 
      status: "healthy", 
      icon: Globe,
      color: "text-green-500"
    },
    { 
      label: "Security", 
      value: "Secure", 
      status: "healthy", 
      icon: Shield,
      color: "text-green-500"
    },
    { 
      label: "Performance", 
      value: "Fast", 
      status: "healthy", 
      icon: Zap,
      color: "text-green-500"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <Activity className="w-5 h-5" />
          <span>System Health</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {healthMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${metric.color}`} />
                <div>
                  <div className="text-sm font-medium">{metric.label}</div>
                  <div className="text-sm text-muted-foreground">{metric.value}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Badge variant="secondary" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1" />
            All Systems Operational
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
