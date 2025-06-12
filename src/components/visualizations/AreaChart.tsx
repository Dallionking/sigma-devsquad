// Phase 11: Area Chart Visualization Component
// Responsive, interactive area chart using Recharts

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
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

export interface AreaChartProps {
  data: DataPoint[];
  xKey: string;
  yKeys: string[]; // Support multiple areas
  colors?: string[];
  title?: string;
  subtitle?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  stackedAreas?: boolean;
  fillOpacity?: number;
  strokeWidth?: number;
  connectNulls?: boolean;
  type?: 'monotone' | 'linear' | 'step' | 'stepBefore' | 'stepAfter';
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

export const AreaChartComponent: React.FC<AreaChartProps> = ({
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
  stackedAreas = false,
  fillOpacity = 0.6,
  strokeWidth = 2,
  connectNulls = false,
  type = 'monotone',
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
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* Gradient definitions */}
        <defs>
          {yKeys.map((yKey, index) => {
            const color = colors[index % colors.length];
            return (
              <linearGradient key={`gradient-${yKey}`} id={`gradient-${yKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={fillOpacity} />
                <stop offset="95%" stopColor={color} stopOpacity={fillOpacity * 0.3} />
              </linearGradient>
            );
          })}
        </defs>
        
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
        
        {/* Render multiple areas */}
        {yKeys.map((yKey, index) => {
          const color = colors[index % colors.length];
          return (
            <Area
              key={yKey}
              type={type}
              dataKey={yKey}
              stackId={stackedAreas ? 'stack' : undefined}
              stroke={color}
              strokeWidth={strokeWidth}
              fill={`url(#gradient-${yKey})`}
              fillOpacity={fillOpacity}
              connectNulls={connectNulls}
              dot={{ r: 3, strokeWidth: 2 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
              animationDuration={300}
            />
          );
        })}
        
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
      </AreaChart>
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
export const SimpleAreaChart: React.FC<{
  data: DataPoint[];
  xKey: string;
  yKey: string;
  title?: string;
  color?: string;
  height?: number;
  fillOpacity?: number;
}> = ({ data, xKey, yKey, title, color = '#8884d8', height = 300, fillOpacity = 0.6 }) => {
  return (
    <AreaChartComponent
      data={data}
      xKey={xKey}
      yKeys={[yKey]}
      colors={[color]}
      title={title}
      height={height}
      fillOpacity={fillOpacity}
    />
  );
};

export const StackedAreaChart: React.FC<{
  data: DataPoint[];
  xKey: string;
  yKeys: string[];
  title?: string;
  colors?: string[];
  height?: number;
}> = ({ data, xKey, yKeys, title, colors, height = 300 }) => {
  return (
    <AreaChartComponent
      data={data}
      xKey={xKey}
      yKeys={yKeys}
      colors={colors}
      title={title}
      height={height}
      stackedAreas={true}
    />
  );
};

export default AreaChartComponent;
