
import { useState, useEffect, useMemo } from 'react';
import { WorkflowAnalyticsData, AnalyticsTimeframe, CycleTimeData, BottleneckData, FlowEfficiencyData, PredictabilityData, ThroughputData } from '@/types/workflow-analytics';

export const useWorkflowAnalytics = (timeframe: AnalyticsTimeframe = '30d') => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data generation for demonstration
  const generateMockData = useMemo((): WorkflowAnalyticsData => {
    const now = new Date();
    const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : timeframe === '90d' ? 90 : 365;
    
    // Generate cycle time data
    const cycleTime: CycleTimeData[] = Array.from({ length: 50 }, (_, i) => {
      const endDate = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
      const cycleHours = Math.random() * 120 + 8; // 8-128 hours
      const leadHours = cycleHours + (Math.random() * 48); // additional wait time
      const startDate = new Date(endDate.getTime() - (cycleHours * 60 * 60 * 1000));
      
      return {
        id: `cycle-${i}`,
        taskId: `task-${i}`,
        taskTitle: `Task ${i + 1}`,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        cycleTime: cycleHours,
        leadTime: leadHours,
        category: ['Development', 'QA', 'Design', 'DevOps'][Math.floor(Math.random() * 4)],
        priority: (['low', 'medium', 'high'] as const)[Math.floor(Math.random() * 3)],
        assignee: ['Alice', 'Bob', 'Charlie', 'Diana'][Math.floor(Math.random() * 4)],
        workflowStage: ['Planning', 'Development', 'Review', 'Testing', 'Deployment'][Math.floor(Math.random() * 5)]
      };
    });

    // Generate bottleneck data
    const bottlenecks: BottleneckData[] = [
      {
        id: 'bottleneck-1',
        stageId: 'code-review',
        stageName: 'Code Review',
        tasksInQueue: 15,
        averageWaitTime: 48,
        severity: 'critical',
        throughputRate: 2.5,
        capacityUtilization: 95,
        suggestedActions: ['Add more reviewers', 'Implement automated checks', 'Split large PRs']
      },
      {
        id: 'bottleneck-2',
        stageId: 'qa-testing',
        stageName: 'QA Testing',
        tasksInQueue: 8,
        averageWaitTime: 24,
        severity: 'high',
        throughputRate: 3.2,
        capacityUtilization: 80,
        suggestedActions: ['Increase QA team capacity', 'Automate regression tests']
      },
      {
        id: 'bottleneck-3',
        stageId: 'deployment',
        stageName: 'Deployment',
        tasksInQueue: 3,
        averageWaitTime: 12,
        severity: 'medium',
        throughputRate: 5.0,
        capacityUtilization: 60,
        suggestedActions: ['Streamline deployment process', 'Add deployment slots']
      }
    ];

    // Generate flow efficiency data
    const flowEfficiency: FlowEfficiencyData = {
      totalEfficiency: 35, // 35% efficiency
      workTime: 168, // 1 week of work time
      waitTime: 312, // additional wait time
      stageEfficiency: [
        { stageId: 'planning', stageName: 'Planning', efficiency: 65, averageWorkTime: 16, averageWaitTime: 8, tasksProcessed: 25 },
        { stageId: 'development', stageName: 'Development', efficiency: 45, averageWorkTime: 72, averageWaitTime: 88, tasksProcessed: 20 },
        { stageId: 'review', stageName: 'Code Review', efficiency: 15, averageWorkTime: 8, averageWaitTime: 48, tasksProcessed: 18 },
        { stageId: 'testing', stageName: 'Testing', efficiency: 40, averageWorkTime: 32, averageWaitTime: 48, tasksProcessed: 15 },
        { stageId: 'deployment', stageName: 'Deployment', efficiency: 75, averageWorkTime: 4, averageWaitTime: 1, tasksProcessed: 12 }
      ],
      trends: Array.from({ length: days }, (_, i) => {
        const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
        return {
          date: date.toISOString().split('T')[0],
          efficiency: 30 + Math.random() * 20 + Math.sin(i / 7) * 5, // trending with weekly cycles
          workTime: 40 + Math.random() * 20,
          waitTime: 60 + Math.random() * 40
        };
      }).reverse()
    };

    // Generate predictability data
    const predictability: PredictabilityData = {
      deliveryForecast: Array.from({ length: 14 }, (_, i) => {
        const date = new Date(now.getTime() + (i * 24 * 60 * 60 * 1000));
        const baseCompletions = 5 + Math.sin(i / 7) * 2; // weekly pattern
        return {
          date: date.toISOString().split('T')[0],
          predictedCompletions: Math.round(baseCompletions + Math.random() * 3),
          actualCompletions: i < 7 ? Math.round(baseCompletions + (Math.random() - 0.5) * 2) : undefined,
          confidenceLevel: 0.8 - (i * 0.02) // decreasing confidence over time
        };
      }),
      confidenceIntervals: Array.from({ length: 14 }, (_, i) => {
        const date = new Date(now.getTime() + (i * 24 * 60 * 60 * 1000));
        const predicted = 5 + Math.sin(i / 7) * 2;
        const variance = 1 + (i * 0.1); // increasing variance over time
        return {
          date: date.toISOString().split('T')[0],
          lower: Math.max(0, Math.round(predicted - variance)),
          predicted: Math.round(predicted),
          upper: Math.round(predicted + variance)
        };
      }),
      historicalAccuracy: 82, // 82% accuracy
      riskFactors: [
        {
          factor: 'Holiday Season',
          impact: 'high',
          description: 'Reduced team capacity during holidays',
          mitigation: 'Plan buffer time and adjust expectations'
        },
        {
          factor: 'New Team Member Onboarding',
          impact: 'medium',
          description: 'Temporary reduction in team velocity',
          mitigation: 'Assign mentors and reduce initial workload'
        },
        {
          factor: 'Technical Debt',
          impact: 'medium',
          description: 'Increasing complexity slowing development',
          mitigation: 'Allocate time for refactoring sprints'
        }
      ]
    };

    // Generate throughput data
    const throughput: ThroughputData[] = Array.from({ length: days }, (_, i) => {
      const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
      return {
        date: date.toISOString().split('T')[0],
        completed: Math.round(3 + Math.random() * 5 + Math.sin(i / 7) * 2),
        started: Math.round(4 + Math.random() * 4 + Math.sin(i / 7) * 2),
        workInProgress: Math.round(15 + Math.random() * 10 + Math.sin(i / 14) * 5)
      };
    }).reverse();

    return {
      cycleTime,
      leadTime: cycleTime.map(ct => ({
        id: `lead-${ct.id}`,
        taskId: ct.taskId,
        taskTitle: ct.taskTitle,
        requestDate: new Date(new Date(ct.startDate).getTime() - (Math.random() * 48 * 60 * 60 * 1000)).toISOString(),
        startDate: ct.startDate,
        endDate: ct.endDate,
        leadTime: ct.leadTime,
        cycleTime: ct.cycleTime,
        queueTime: ct.leadTime - ct.cycleTime,
        category: ct.category
      })),
      bottlenecks,
      flowEfficiency,
      predictability,
      throughput
    };
  }, [timeframe]);

  const [data, setData] = useState<WorkflowAnalyticsData>(generateMockData);

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setData(generateMockData);
      setLoading(false);
    }, 1000);
  }, [timeframe, generateMockData]);

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API refresh
      await new Promise(resolve => setTimeout(resolve, 500));
      setData(generateMockData);
    } catch (err) {
      setError('Failed to refresh analytics data');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refreshData
  };
};
