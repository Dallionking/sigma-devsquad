
import { LucideIcon } from 'lucide-react';
import { ComparisonType } from '../TeamPerformanceDashboard';
import { Team } from '@/types/teams';

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

export interface KPIMetric {
  id: string;
  title: string;
  value: number;
  target?: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  icon: LucideIcon;
  color: string;
  description?: string;
}

export interface TeamKPIOverviewProps {
  team: Team;
  timeRange: string;
  comparisonType: ComparisonType;
  customDateRange: { start: Date; end: Date } | null;
  metrics: TeamPerformanceMetrics;
}
