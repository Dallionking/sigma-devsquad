
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Task } from "@/types";
import { memo, useMemo } from "react";

interface TaskMetricsProps {
  tasks: Task[];
}

export const TaskMetrics = memo(({ tasks }: TaskMetricsProps) => {
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const overdue = tasks.filter(t => 
      t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed'
    ).length;
    
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    return { total, completed, inProgress, overdue, completionRate };
  }, [tasks]);

  const metricsCards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: BarChart3,
      color: "text-muted-foreground"
    },
    {
      title: "Completion Rate",
      value: `${stats.completionRate.toFixed(1)}%`,
      icon: CheckCircle,
      color: "text-green-500",
      progress: stats.completionRate
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: Clock,
      color: "text-blue-500"
    },
    {
      title: "Overdue",
      value: stats.overdue,
      icon: AlertTriangle,
      color: "text-red-500"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metricsCards.map((metric) => (
        <Card key={metric.title}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
              <metric.icon className={`w-8 h-8 ${metric.color}`} />
            </div>
            {metric.progress !== undefined && (
              <Progress value={metric.progress} className="mt-2" />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
});

TaskMetrics.displayName = 'TaskMetrics';
