// Phase 11: Line Chart Visualization Component
// Responsive, interactive line chart using Recharts

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface DataPoint {
  [key: string]: string | number | Date;
}

export interface LineChartProps {
  data: DataPoint[];
  xKey: string;
  yKeys: string[]; // Support multiple lines
  colors?: string[];
  title?: string;
  subtitle?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  strokeWidth?: number;
  connectNulls?: boolean;
  referenceLines?: {
    x?: number | string;
    y?: number;
    stroke?: string;
    strokeDasharray?: string;
    label?: string;
  }[];
  formatTooltip?: (value: any, name: string, props: any) => [string, string];
  formatXAxisLabel?: (value: any) => string;
  formatYAxisLabel?: (value: any) => string;
  className?: string;
}

const defaultColors = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00',
  '#0088fe', '#00c49f', '#ffbb28', '#ff8042', '#8dd1e1'
];

export const LineChartComponent: React.FC<LineChartProps> = ({
  data,
  xKey,
  yKeys,
  colors = defaultColors,
  title,
  subtitle,
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  strokeWidth = 2,
  connectNulls = false,
  referenceLines = [],
  formatTooltip,
  formatXAxisLabel,
  formatYAxisLabel,
  className = ''
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{`${xKey}: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {formatTooltip 
                ? formatTooltip(entry.value, entry.dataKey, entry)[0]
                : `${entry.dataKey}: ${entry.value}`
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {showGrid && (
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#f0f0f0"
            className="opacity-50"
          />
        )}
        
        <XAxis
          dataKey={xKey}
          stroke="#6b7280"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatXAxisLabel}
        />
        
        <YAxis
          stroke="#6b7280"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatYAxisLabel}
        />
        
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        
        {showLegend && (
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '12px'
            }}
          />
        )}
        
        {/* Render multiple lines */}
        {yKeys.map((yKey, index) => (
          <Line
            key={yKey}
            type="monotone"
            dataKey={yKey}
            stroke={colors[index % colors.length]}
            strokeWidth={strokeWidth}
            connectNulls={connectNulls}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={300}
          />
        ))}
        
        {/* Reference lines */}
        {referenceLines.map((refLine, index) => (
          <ReferenceLine
            key={index}
            x={refLine.x}
            y={refLine.y}
            stroke={refLine.stroke || '#ef4444'}
            strokeDasharray={refLine.strokeDasharray || '4 4'}
            label={refLine.label}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );

  if (title || subtitle) {
    return (
      <Card className={className}>
        <CardHeader className="pb-2">
          {title && <CardTitle className="text-lg font-semibold">{title}</CardTitle>}
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          {renderChart()}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {renderChart()}
    </div>
  );
};

// Export a simplified version for common use cases
export const SimpleLineChart: React.FC<{
  data: DataPoint[];
  xKey: string;
  yKey: string;
  title?: string;
  color?: string;
  height?: number;
}> = ({ data, xKey, yKey, title, color = '#8884d8', height = 300 }) => {
  return (
    <LineChartComponent
      data={data}
      xKey={xKey}
      yKeys={[yKey]}
      colors={[color]}
      title={title}
      height={height}
    />
  );
};

export default LineChartComponent;
