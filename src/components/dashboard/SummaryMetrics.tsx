
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CheckSquare, 
  Clock, 
  AlertCircle 
} from "lucide-react";

export const SummaryMetrics = () => {
  const metrics = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2",
      trend: "up",
      icon: CheckSquare,
      description: "Projects in progress"
    },
    {
      title: "Agent Efficiency",
      value: "94%",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      description: "Average task completion rate"
    },
    {
      title: "Response Time",
      value: "1.2s",
      change: "-0.3s",
      trend: "up",
      icon: Clock,
      description: "Average agent response time"
    },
    {
      title: "Error Rate",
      value: "0.8%",
      change: "-0.2%",
      trend: "up",
      icon: AlertCircle,
      description: "System error percentage"
    }
  ];

  const projectProgress = [
    { name: "E-commerce Platform", progress: 75, status: "On Track" },
    { name: "Mobile App Backend", progress: 45, status: "In Progress" },
    { name: "Analytics Dashboard", progress: 90, status: "Nearly Complete" }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
              return (
                <div key={metric.title} className="text-center p-4 border rounded-lg">
                  <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.title}</div>
                  <div className="flex items-center justify-center mt-2 space-x-1">
                    <TrendIcon className={`w-3 h-3 ${
                      metric.trend === "up" ? "text-green-500" : "text-red-500"
                    }`} />
                    <span className={`text-xs ${
                      metric.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Project Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Active Project Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectProgress.map((project) => (
              <div key={project.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-muted-foreground">{project.status}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <Progress value={project.progress} className="flex-1" />
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
