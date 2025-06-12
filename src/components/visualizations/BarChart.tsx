// Phase 11: Bar Chart Visualization Component
// Responsive, interactive bar chart using Recharts

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface DataPoint {
  [key: string]: string | number | Date;
}

export interface BarChartProps {
  data: DataPoint[];
  xKey: string;
  yKeys: string[]; // Support multiple bar series
  colors?: string[];
  title?: string;
  subtitle?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  barSize?: number;
  stackedBars?: boolean;
  horizontal?: boolean;
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
  onBarClick?: (data: any, index: number) => void;
}

const defaultColors = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00',
  '#0088fe', '#00c49f', '#ffbb28', '#ff8042', '#8dd1e1'
];

export const BarChartComponent: React.FC<BarChartProps> = ({
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
  barSize,
  stackedBars = false,
  horizontal = false,
  referenceLines = [],
  formatTooltip,
  formatXAxisLabel,
  formatYAxisLabel,
  className = '',
  onBarClick
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

  const handleBarClick = (data: any, index: number) => {
    if (onBarClick) {
      onBarClick(data, index);
    }
  };

  const renderChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        layout={horizontal ? 'horizontal' : 'vertical'}
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
        
        {horizontal ? (
          <>
            <XAxis
              type="number"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatXAxisLabel}
            />
            <YAxis
              type="category"
              dataKey={xKey}
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxisLabel}
            />
          </>
        ) : (
          <>
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
          </>
        )}
        
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        
        {showLegend && (
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '12px'
            }}
          />
        )}
        
        {/* Render multiple bar series */}
        {yKeys.map((yKey, index) => (
          <Bar
            key={yKey}
            dataKey={yKey}
            fill={colors[index % colors.length]}
            barSize={barSize}
            stackId={stackedBars ? 'stack' : undefined}
            onClick={handleBarClick}
            radius={[2, 2, 0, 0]}
            animationDuration={300}
          >
            {/* Individual bar colors (for gradient or conditional coloring) */}
            {data.map((entry, entryIndex) => (
              <Cell 
                key={`cell-${entryIndex}`} 
                fill={colors[index % colors.length]}
                className="hover:opacity-80 cursor-pointer transition-opacity"
              />
            ))}
          </Bar>
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
      </BarChart>
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

// Export simplified versions for common use cases
export const SimpleBarChart: React.FC<{
  data: DataPoint[];
  xKey: string;
  yKey: string;
  title?: string;
  color?: string;
  height?: number;
  horizontal?: boolean;
}> = ({ data, xKey, yKey, title, color = '#8884d8', height = 300, horizontal = false }) => {
  return (
    <BarChartComponent
      data={data}
      xKey={xKey}
      yKeys={[yKey]}
      colors={[color]}
      title={title}
      height={height}
      horizontal={horizontal}
    />
  );
};

export const StackedBarChart: React.FC<{
  data: DataPoint[];
  xKey: string;
  yKeys: string[];
  title?: string;
  colors?: string[];
  height?: number;
}> = ({ data, xKey, yKeys, title, colors, height = 300 }) => {
  return (
    <BarChartComponent
      data={data}
      xKey={xKey}
      yKeys={yKeys}
      colors={colors}
      title={title}
      height={height}
      stackedBars={true}
    />
  );
};

export default BarChartComponent;
