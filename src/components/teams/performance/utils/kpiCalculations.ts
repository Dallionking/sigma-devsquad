
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Target,
  AlertCircle
} from 'lucide-react';
import { KPIMetric, TeamPerformanceMetrics } from '../types/teamKPI';

export const generateKPIMetrics = (metrics: TeamPerformanceMetrics): KPIMetric[] => {
  const kpiMetrics: KPIMetric[] = [
    {
      id: 'tasks-completed',
      title: 'Tasks Completed',
      value: metrics.tasksCompleted,
      target: Math.round(metrics.tasksCompleted * 1.2),
      unit: '',
      trend: metrics.productivityTrend,
      changePercent: metrics.productivityTrend === 'up' ? 15.3 : metrics.productivityTrend === 'down' ? -8.2 : 0,
      icon: CheckCircle,
      color: 'text-emerald-600',
      description: 'Total completed tasks in selected period'
    },
    {
      id: 'completion-rate',
      title: 'Completion Rate',
      value: metrics.completionRate,
      target: 85,
      unit: '%',
      trend: metrics.completionRate > 75 ? 'up' : metrics.completionRate < 50 ? 'down' : 'stable',
      changePercent: metrics.completionRate > 75 ? 8.2 : metrics.completionRate < 50 ? -12.5 : 0,
      icon: Target,
      color: 'text-blue-600',
      description: 'Percentage of tasks completed vs total'
    },
    {
      id: 'avg-response-time',
      title: 'Avg Response Time',
      value: metrics.averageResponseTime,
      target: 3.0,
      unit: 'h',
      trend: metrics.averageResponseTime < 2.5 ? 'up' : metrics.averageResponseTime > 4 ? 'down' : 'stable',
      changePercent: metrics.averageResponseTime < 2.5 ? -12.5 : metrics.averageResponseTime > 4 ? 15.2 : 0,
      icon: Clock,
      color: 'text-orange-600',
      description: 'Average time to respond to tasks'
    },
    {
      id: 'active-members',
      title: 'Active Members',
      value: metrics.activeMembers,
      unit: '',
      trend: 'stable',
      changePercent: 0,
      icon: Users,
      color: 'text-purple-600',
      description: 'Currently active team members'
    }
  ];

  // Add blocked tasks indicator if there are any
  if (metrics.tasksBlocked > 0) {
    kpiMetrics.push({
      id: 'blocked-tasks',
      title: 'Blocked Tasks',
      value: metrics.tasksBlocked,
      unit: '',
      trend: 'down',
      changePercent: 0,
      icon: AlertCircle,
      color: 'text-red-600',
      description: 'Tasks currently blocked'
    });
  }

  return kpiMetrics;
};
