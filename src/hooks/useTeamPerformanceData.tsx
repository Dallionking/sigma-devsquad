
import { useState, useEffect, useMemo } from 'react';
import { Team } from '@/types/teams';
import { TimeRange } from '@/components/teams/performance/TeamPerformanceDashboard';
import { useTeams } from '@/contexts/TeamContext';

interface TeamPerformanceMetrics {
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

interface UseTeamPerformanceDataProps {
  team: Team;
  timeRange: TimeRange;
  customDateRange: { start: Date; end: Date } | null;
}

export const useTeamPerformanceData = ({ 
  team, 
  timeRange, 
  customDateRange 
}: UseTeamPerformanceDataProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getTeamTasks, getTeamMembers } = useTeams();

  // Calculate real team metrics
  const metrics = useMemo((): TeamPerformanceMetrics => {
    try {
      const tasks = getTeamTasks(team.id);
      const members = getTeamMembers(team.id);

      const completedTasks = tasks.filter(t => t.status === 'completed').length;
      const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
      const pendingTasks = tasks.filter(t => t.status === 'pending').length;
      const blockedTasks = tasks.filter(t => t.status === 'blocked').length;

      const completionRate = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
      const velocityScore = Math.round(completedTasks * 1.2 + inProgressTasks * 0.5);
      const activeMembers = members.filter(m => m.availability === 'available').length;

      // Simple trend calculation based on completion rate
      const productivityTrend: 'up' | 'down' | 'stable' = 
        completionRate > 75 ? 'up' : 
        completionRate < 50 ? 'down' : 'stable';

      return {
        tasksCompleted: completedTasks,
        tasksInProgress: inProgressTasks,
        tasksPending: pendingTasks,
        tasksBlocked: blockedTasks,
        completionRate: Math.round(completionRate),
        velocityScore,
        averageResponseTime: Math.round((Math.random() * 3 + 1) * 10) / 10, // Mock data
        activeMembers,
        productivityTrend,
        lastUpdated: new Date()
      };
    } catch (err) {
      console.error('Error calculating team performance metrics:', err);
      setError('Failed to calculate team metrics');
      return {
        tasksCompleted: 0,
        tasksInProgress: 0,
        tasksPending: 0,
        tasksBlocked: 0,
        completionRate: 0,
        velocityScore: 0,
        averageResponseTime: 0,
        activeMembers: 0,
        productivityTrend: 'stable',
        lastUpdated: new Date()
      };
    }
  }, [team.id, getTeamTasks, getTeamMembers]);

  // Generate time-based chart data
  const chartData = useMemo(() => {
    const getDaysForRange = () => {
      switch (timeRange) {
        case 'today': return 1;
        case 'week': return 7;
        case 'month': return 30;
        case 'custom': 
          if (customDateRange) {
            const diffTime = Math.abs(customDateRange.end.getTime() - customDateRange.start.getTime());
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          }
          return 7;
        default: return 7;
      }
    };

    const days = getDaysForRange();
    const taskCompletionData = Array.from({ length: days }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - index));
      
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        completed: Math.floor(Math.random() * 15) + 5,
        inProgress: Math.floor(Math.random() * 10) + 3,
        pending: Math.floor(Math.random() * 8) + 2
      };
    });

    const velocityData = Array.from({ length: Math.min(days, 10) }, (_, index) => {
      return {
        sprint: `Sprint ${index + 1}`,
        planned: 45 + Math.floor(Math.random() * 15),
        completed: 35 + Math.floor(Math.random() * 20),
        velocity: 75 + Math.floor(Math.random() * 25)
      };
    });

    const burndownData = Array.from({ length: Math.min(days, 14) }, (_, index) => {
      const totalTasks = 120;
      const ideal = Math.max(0, totalTasks - (totalTasks / 13) * index);
      const actual = index < days - 2 ? Math.max(0, totalTasks - (totalTasks / 15) * index * 0.9) : null;
      
      return {
        day: `Day ${index + 1}`,
        ideal: Math.round(ideal),
        actual: actual ? Math.round(actual) : null,
        projected: actual === null ? Math.round(ideal * 0.8) : null
      };
    });

    return {
      taskCompletion: taskCompletionData,
      velocity: velocityData,
      burndown: burndownData
    };
  }, [timeRange, customDateRange]);

  const refreshData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log('Team performance data refreshed for:', team.name);
    } catch (err) {
      setError('Failed to refresh performance data');
      console.error('Error refreshing team performance data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    metrics,
    chartData,
    isLoading,
    error,
    refreshData
  };
};
