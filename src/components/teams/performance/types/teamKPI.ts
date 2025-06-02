
import { Team } from '@/types/teams';
import { TimeRange, ComparisonType } from '../TeamPerformanceDashboard';

export interface TeamPerformanceMetrics {
  tasksCompleted: number;
  tasksInProgress: number;
  tasksPending: number;
  tasksBlocked: number;
  completionRate: number;
  velocityScore: number;
  averageResponseTime: number;
  activeMembers: number;
  productivityTrend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
}

export interface TeamKPIOverviewProps {
  team: Team;
  timeRange: TimeRange;
  comparisonType: ComparisonType;
  customDateRange: { start: Date; end: Date } | null;
  metrics: TeamPerformanceMetrics;
}

export interface KPIMetric {
  id: string;
  title: string;
  value: number;
  target?: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description?: string;
}
