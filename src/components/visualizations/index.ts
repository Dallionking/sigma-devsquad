// Phase 11: Visualization Components Index
// Central export file for all chart and visualization components

// Core chart components
export {
  LineChartComponent,
  SimpleLineChart,
  type LineChartProps,
  type DataPoint as LineDataPoint
} from './LineChart';

export {
  BarChartComponent,
  SimpleBarChart,
  StackedBarChart,
  type BarChartProps,
  type DataPoint as BarDataPoint
} from './BarChart';

export {
  PieChartComponent,
  SimplePieChart,
  DonutChart,
  type PieChartProps,
  type DataPoint as PieDataPoint
} from './PieChart';

export {
  AreaChartComponent,
  SimpleAreaChart,
  StackedAreaChart,
  type AreaChartProps,
  type DataPoint as AreaDataPoint
} from './AreaChart';

// Container and utilities
export {
  ChartContainer,
  useChartResponsive,
  type ChartContainerProps
} from './ChartContainer';

// Common types and interfaces
export interface BaseDataPoint {
  [key: string]: string | number | Date;
}

export interface ChartTheme {
  colors: string[];
  gridColor: string;
  textColor: string;
  backgroundColor: string;
  tooltipBackground: string;
  tooltipBorder: string;
}

// Default theme
export const defaultChartTheme: ChartTheme = {
  colors: [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00',
    '#0088fe', '#00c49f', '#ffbb28', '#ff8042', '#8dd1e1',
    '#d084d0', '#8dd1e1', '#82ca9d', '#a4de6c'
  ],
  gridColor: '#f0f0f0',
  textColor: '#6b7280',
  backgroundColor: '#ffffff',
  tooltipBackground: '#ffffff',
  tooltipBorder: '#e5e7eb'
};

// Dark theme
export const darkChartTheme: ChartTheme = {
  colors: [
    '#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa',
    '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'
  ],
  gridColor: '#374151',
  textColor: '#9ca3af',
  backgroundColor: '#1f2937',
  tooltipBackground: '#374151',
  tooltipBorder: '#4b5563'
};

// Utility functions
export const formatNumber = (value: number, decimals: number = 0): string => {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(decimals)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(decimals)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(decimals)}K`;
  }
  return value.toFixed(decimals);
};

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatDate = (value: string | Date, format: 'short' | 'medium' | 'long' = 'short'): string => {
  const date = typeof value === 'string' ? new Date(value) : value;
  
  switch (format) {
    case 'short':
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    case 'medium':
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    case 'long':
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    default:
      return date.toLocaleDateString();
  }
};

// Chart type definitions for API consumption
export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'area';
  data: BaseDataPoint[];
  xKey?: string;
  yKeys?: string[];
  title?: string;
  height?: number;
  colors?: string[];
  options?: Record<string, any>;
}
