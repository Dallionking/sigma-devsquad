// Phase 11: Dashboard Components Index
// Central export file for all dashboard-related components

// Main dashboard components
export { default as AnalyticsDashboard } from './AnalyticsDashboard';
export { default as DashboardLayout } from './DashboardLayout';

// Component building blocks
export { default as MetricCard } from './MetricCard';
export { default as WidgetContainer } from './WidgetContainer';

// Re-export visualization components for convenience
export {
  LineChartComponent,
  BarChartComponent,
  PieChartComponent,
  AreaChartComponent,
  ChartContainer,
  useChartResponsive,
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatDate,
  defaultChartTheme,
  darkChartTheme
} from '../visualizations';

// Types
export interface DashboardConfig {
  id: string;
  title: string;
  description?: string;
  layout: 'grid' | 'masonry' | 'flex';
  widgets: WidgetConfig[];
  isPublic?: boolean;
  isShared?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WidgetConfig {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'text' | 'custom';
  title: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  config: Record<string, any>;
  dataSource?: string;
  refreshInterval?: number;
  isVisible?: boolean;
}

export interface MetricConfig {
  id: string;
  name: string;
  calculation: 'sum' | 'avg' | 'count' | 'min' | 'max' | 'custom';
  dataSource: string;
  formula?: string;
  filters?: Record<string, any>;
  format?: 'number' | 'currency' | 'percentage';
  target?: number;
}

// Dashboard hooks and utilities
export const useDashboard = (dashboardId: string) => {
  // This would typically fetch dashboard data from API
  // For now, returning mock structure
  return {
    dashboard: null,
    isLoading: false,
    error: null,
    refresh: () => {},
    updateWidget: (widgetId: string, config: Partial<WidgetConfig>) => {},
    addWidget: (widget: WidgetConfig) => {},
    removeWidget: (widgetId: string) => {},
    saveDashboard: () => {}
  };
};

export const useMetrics = () => {
  // This would typically fetch available metrics from API
  return {
    metrics: [],
    isLoading: false,
    error: null,
    createMetric: (metric: MetricConfig) => {},
    updateMetric: (metricId: string, updates: Partial<MetricConfig>) => {},
    deleteMetric: (metricId: string) => {},
    calculateMetric: (metricId: string, dateRange?: { from: Date; to: Date }) => {}
  };
};

// Utility functions for dashboard management
export const createDefaultDashboard = (): Partial<DashboardConfig> => ({
  title: 'New Dashboard',
  description: 'Custom analytics dashboard',
  layout: 'grid',
  widgets: [],
  isPublic: false,
  isShared: false
});

export const createDefaultWidget = (type: WidgetConfig['type']): Partial<WidgetConfig> => ({
  type,
  title: `New ${type} Widget`,
  position: { x: 0, y: 0, width: 2, height: 2 },
  config: {},
  isVisible: true,
  refreshInterval: 30
});

// Widget type definitions for different chart types
export const widgetTypes = {
  metric: {
    label: 'Metric Card',
    description: 'Display a key metric with trend and change indicators',
    icon: '📊',
    defaultConfig: {
      metricId: '',
      showTrend: true,
      showChange: true,
      format: 'number'
    }
  },
  chart: {
    label: 'Chart',
    description: 'Visualize data with various chart types',
    icon: '📈',
    defaultConfig: {
      chartType: 'line',
      dataSource: '',
      xAxis: '',
      yAxis: [],
      colors: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00']
    }
  },
  table: {
    label: 'Data Table',
    description: 'Display tabular data with sorting and filtering',
    icon: '📋',
    defaultConfig: {
      dataSource: '',
      columns: [],
      pageSize: 10,
      sortable: true,
      filterable: true
    }
  },
  text: {
    label: 'Text Widget',
    description: 'Display custom text content or markdown',
    icon: '📝',
    defaultConfig: {
      content: '',
      format: 'markdown',
      alignment: 'left'
    }
  },
  custom: {
    label: 'Custom Widget',
    description: 'Advanced widget with custom implementation',
    icon: '🔧',
    defaultConfig: {
      component: '',
      props: {}
    }
  }
} as const;
