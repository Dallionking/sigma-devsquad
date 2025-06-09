
import { useState, useEffect, useMemo } from 'react';
import { Task, Agent } from '@/types';

interface ProductivityMetrics {
  completionRate: number;
  averageVelocity: number;
  sprintProgress: number;
  blockedTasksCount: number;
  taskTrend: 'up' | 'down' | 'stable';
  velocityTrend: 'up' | 'down' | 'stable';
}

interface UseProductivityDataProps {
  tasks: Task[];
  agents: Agent[];
  timeRange: '7d' | '14d' | '30d' | '90d';
  sprintId?: string;
}

export const useProductivityData = ({ 
  tasks, 
  agents, 
  timeRange, 
  sprintId 
}: UseProductivityDataProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate productivity metrics
  const metrics = useMemo((): ProductivityMetrics => {
    try {
      const completedTasks = tasks.filter(task => task.status === 'completed');
      const blockedTasks = tasks.filter(task => task.status === 'blocked');
      const inProgressTasks = tasks.filter(task => task.status === 'in-progress');

      const completionRate = tasks.length > 0 
        ? (completedTasks.length / tasks.length) * 100 
        : 0;

      // Mock velocity calculation - in real app would be based on story points
      const averageVelocity = completedTasks.length > 0 
        ? Math.round(completedTasks.length * 1.2) 
        : 0;

      // Mock sprint progress calculation
      const sprintProgress = (completedTasks.length + inProgressTasks.length * 0.5) / tasks.length * 100;

      // Simple trend calculation (mock)
      const taskTrend: 'up' | 'down' | 'stable' = completionRate > 75 ? 'up' : 
                                                 completionRate < 50 ? 'down' : 'stable';
      
      const velocityTrend: 'up' | 'down' | 'stable' = averageVelocity > 20 ? 'up' : 
                                                      averageVelocity < 10 ? 'down' : 'stable';

      return {
        completionRate: Math.round(completionRate),
        averageVelocity,
        sprintProgress: Math.round(sprintProgress),
        blockedTasksCount: blockedTasks.length,
        taskTrend,
        velocityTrend
      };
    } catch (err) {
      console.error('Error calculating productivity metrics:', err);
      return {
        completionRate: 0,
        averageVelocity: 0,
        sprintProgress: 0,
        blockedTasksCount: 0,
        taskTrend: 'stable',
        velocityTrend: 'stable'
      };
    }
  }, [tasks]);

  // Generate task completion trend data
  const generateTaskCompletionTrend = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => {
      // Mock data generation based on real tasks
      const baseCompleted = Math.floor(Math.random() * 15) + 5;
      const baseStarted = baseCompleted + Math.floor(Math.random() * 8);
      const basePlanned = baseCompleted + Math.floor(Math.random() * 5);
      
      return {
        day,
        completed: baseCompleted,
        started: baseStarted,
        planned: basePlanned
      };
    });
  }, [timeRange]);

  // Generate workload distribution data
  const generateWorkloadDistribution = useMemo(() => {
    const teams = ['Frontend', 'Backend', 'QA', 'DevOps'];
    return teams.map(team => {
      const teamTasks = tasks.filter(task => 
        task.assignedAgent?.toLowerCase().includes(team.toLowerCase())
      );
      
      return {
        team,
        inProgress: teamTasks.filter(t => t.status === 'in-progress').length || Math.floor(Math.random() * 15) + 5,
        pending: teamTasks.filter(t => t.status === 'pending').length || Math.floor(Math.random() * 8) + 2,
        completed: teamTasks.filter(t => t.status === 'completed').length || Math.floor(Math.random() * 25) + 10,
        blocked: teamTasks.filter(t => t.status === 'blocked').length || Math.floor(Math.random() * 3)
      };
    });
  }, [tasks]);

  // Generate velocity tracking data
  const generateVelocityData = useMemo(() => {
    const sprints = ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Sprint 5', 'Current'];
    return sprints.map((sprint, index) => {
      const planned = 45 + Math.floor(Math.random() * 15);
      const completed = index === sprints.length - 1 
        ? Math.floor(planned * 0.6) // Current sprint is in progress
        : planned - Math.floor(Math.random() * 8);
      
      return {
        sprint,
        planned,
        completed,
        velocity: Math.round((completed / planned) * 100)
      };
    });
  }, [sprintId]);

  // Generate burndown data
  const generateBurndownData = useMemo(() => {
    const totalTasks = 120;
    const sprintLength = 11;
    const currentDay = 7;
    
    return Array.from({ length: sprintLength }, (_, index) => {
      const day = `Day ${index + 1}`;
      const idealRemaining = Math.max(0, totalTasks - (totalTasks / (sprintLength - 1)) * index);
      
      let actualRemaining = null;
      if (index < currentDay) {
        // Actual progress (slightly behind ideal)
        actualRemaining = Math.max(0, totalTasks - (totalTasks / sprintLength) * index * 0.85);
      }
      
      // Projected completion (linear projection from current progress)
      const projected = index >= currentDay ? 
        (totalTasks - (totalTasks / sprintLength) * index * 0.7) : null;
      
      return {
        day,
        remaining: Math.round(actualRemaining),
        ideal: Math.round(idealRemaining),
        projected: projected ? Math.round(projected) : null
      };
    });
  }, [sprintId]);

  const refreshData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // In real implementation, would fetch fresh data here
    } catch (err) {
      setError('Failed to refresh productivity data');
      console.error('Error refreshing productivity data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    metrics,
    taskCompletionTrend: generateTaskCompletionTrend,
    workloadDistribution: generateWorkloadDistribution,
    velocityData: generateVelocityData,
    burndownData: generateBurndownData,
    isLoading,
    error,
    refreshData
  };
};
