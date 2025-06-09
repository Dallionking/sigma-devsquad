
export interface WorkflowAnalyticsData {
  cycleTime: CycleTimeData[];
  leadTime: LeadTimeData[];
  bottlenecks: BottleneckData[];
  flowEfficiency: FlowEfficiencyData;
  predictability: PredictabilityData;
  throughput: ThroughputData[];
}

export interface CycleTimeData {
  id: string;
  taskId: string;
  taskTitle: string;
  startDate: string;
  endDate: string;
  cycleTime: number; // in hours
  leadTime: number; // in hours
  category: string;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  workflowStage: string;
}

export interface LeadTimeData {
  id: string;
  taskId: string;
  taskTitle: string;
  requestDate: string;
  startDate: string;
  endDate: string;
  leadTime: number; // in hours
  cycleTime: number; // in hours
  queueTime: number; // in hours
  category: string;
}

export interface BottleneckData {
  id: string;
  stageId: string;
  stageName: string;
  tasksInQueue: number;
  averageWaitTime: number; // in hours
  severity: 'low' | 'medium' | 'high' | 'critical';
  throughputRate: number; // tasks per day
  capacityUtilization: number; // percentage
  suggestedActions: string[];
}

export interface FlowEfficiencyData {
  totalEfficiency: number; // percentage
  workTime: number; // hours
  waitTime: number; // hours
  stageEfficiency: StageEfficiencyData[];
  trends: EfficiencyTrendData[];
}

export interface StageEfficiencyData {
  stageId: string;
  stageName: string;
  efficiency: number; // percentage
  averageWorkTime: number;
  averageWaitTime: number;
  tasksProcessed: number;
}

export interface EfficiencyTrendData {
  date: string;
  efficiency: number;
  workTime: number;
  waitTime: number;
}

export interface PredictabilityData {
  deliveryForecast: ForecastData[];
  confidenceIntervals: ConfidenceIntervalData[];
  historicalAccuracy: number; // percentage
  riskFactors: RiskFactorData[];
}

export interface ForecastData {
  date: string;
  predictedCompletions: number;
  actualCompletions?: number;
  confidenceLevel: number;
}

export interface ConfidenceIntervalData {
  date: string;
  lower: number;
  predicted: number;
  upper: number;
}

export interface RiskFactorData {
  factor: string;
  impact: 'low' | 'medium' | 'high';
  description: string;
  mitigation: string;
}

export interface ThroughputData {
  date: string;
  completed: number;
  started: number;
  workInProgress: number;
}

export type AnalyticsTimeframe = '7d' | '30d' | '90d' | '1y';
export type AnalyticsMetric = 'cycleTime' | 'leadTime' | 'throughput' | 'efficiency';
