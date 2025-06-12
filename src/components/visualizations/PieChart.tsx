// Phase 11: Pie Chart Visualization Component
// Responsive, interactive pie chart using Recharts

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LabelList
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface DataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface PieChartProps {
  data: DataPoint[];
  title?: string;
  subtitle?: string;
  height?: number;
  colors?: string[];
  showTooltip?: boolean;
  showLegend?: boolean;
  showLabels?: boolean;
  showValues?: boolean;
  innerRadius?: number; // For donut charts
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  formatTooltip?: (value: any, name: string, props: any) => [string, string];
  formatLabel?: (entry: DataPoint) => string;
  className?: string;
  onSliceClick?: (data: DataPoint, index: number) => void;
  activeIndex?: number;
}

const defaultColors = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00',
  '#0088fe', '#00c49f', '#ffbb28', '#ff8042', '#8dd1e1',
  '#d084d0', '#8dd1e1', '#82ca9d', '#a4de6c'
];

export const PieChartComponent: React.FC<PieChartProps> = ({
  data,
  title,
  subtitle,
  height = 400,
  colors = defaultColors,
  showTooltip = true,
  showLegend = true,
  showLabels = false,
  showValues = false,
  innerRadius = 0,
  outerRadius,
  startAngle = 0,
  endAngle = 360,
  formatTooltip,
  formatLabel,
  className = '',
  onSliceClick,
  activeIndex
}) => {
  const [localActiveIndex, setLocalActiveIndex] = useState<number | undefined>(activeIndex);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{data.name}</p>
          <p className="text-sm" style={{ color: data.color }}>
            {formatTooltip 
              ? formatTooltip(data.value, data.name, data)[0]
              : `Value: ${data.value}`
            }
          </p>
          <p className="text-xs text-gray-500">
            {`${((data.value / data.payload.total) * 100).toFixed(1)}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  const handleSliceClick = (data: any, index: number) => {
    setLocalActiveIndex(index);
    if (onSliceClick) {
      onSliceClick(data, index);
    }
  };

  const onPieEnter = (_: any, index: number) => {
    if (activeIndex === undefined) {
      setLocalActiveIndex(index);
    }
  };

  const onPieLeave = () => {
    if (activeIndex === undefined) {
      setLocalActiveIndex(undefined);
    }
  };

  // Calculate total for percentage calculations
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithTotal = data.map(item => ({ ...item, total }));

  const renderCustomLabel = (entry: any) => {
    if (formatLabel) {
      return formatLabel(entry);
    }
    
    if (showLabels && showValues) {
      return `${entry.name}: ${entry.value}`;
    } else if (showLabels) {
      return entry.name;
    } else if (showValues) {
      return entry.value;
    }
    
    return '';
  };

  const renderChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={dataWithTotal}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius || Math.min(height * 0.35, 120)}
          paddingAngle={2}
          startAngle={startAngle}
          endAngle={endAngle}
          dataKey="value"
          onClick={handleSliceClick}
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
          animationDuration={300}
        >
          {/* Individual slice colors */}
          {dataWithTotal.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors[index % colors.length]}
              stroke={localActiveIndex === index ? '#333' : 'none'}
              strokeWidth={localActiveIndex === index ? 2 : 0}
              className="hover:opacity-80 cursor-pointer transition-all"
            />
          ))}
          
          {/* Labels */}
          {(showLabels || showValues) && (
            <LabelList
              dataKey="name"
              position="outside"
              fill="#374151"
              fontSize={12}
              content={renderCustomLabel}
            />
          )}
        </Pie>
        
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        
        {showLegend && (
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '12px'
            }}
            formatter={(value, entry) => (
              <span style={{ color: entry.color }}>
                {value} ({((entry.payload?.value || 0) / total * 100).toFixed(1)}%)
              </span>
            )}
          />
        )}
      </PieChart>
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
export const SimplePieChart: React.FC<{
  data: DataPoint[];
  title?: string;
  height?: number;
  colors?: string[];
}> = ({ data, title, height = 400, colors }) => {
  return (
    <PieChartComponent
      data={data}
      title={title}
      height={height}
      colors={colors}
    />
  );
};

export const DonutChart: React.FC<{
  data: DataPoint[];
  title?: string;
  height?: number;
  colors?: string[];
  innerRadius?: number;
}> = ({ data, title, height = 400, colors, innerRadius = 60 }) => {
  return (
    <PieChartComponent
      data={data}
      title={title}
      height={height}
      colors={colors}
      innerRadius={innerRadius}
      showLabels={false}
      showValues={true}
    />
  );
};

export default PieChartComponent;
