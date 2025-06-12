// Phase 11: Metric Card Component
// Reusable component for displaying key metrics with trends and changes

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  trend?: number[];
  isLoading?: boolean;
  className?: string;
  subtitle?: string;
  format?: 'number' | 'currency' | 'percentage';
  period?: string;
  onClick?: () => void;
}

// Simple Sparkline Component
const Sparkline: React.FC<{ data: number[]; color?: string; width?: number; height?: number }> = ({
  data,
  color = "#3B82F6",
  width = 100,
  height = 30
}) => {
  if (!data.length) return null;

  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;
  
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - minVal) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <svg width={width} height={height} className="opacity-80">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      {/* Gradient fill */}
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <polygon
        fill={`url(#gradient-${color})`}
        points={`0,${height} ${points} ${width},${height}`}
      />
    </svg>
  );
};

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  trend,
  isLoading = false,
  className = '',
  subtitle,
  format = 'number',
  period = 'vs last period',
  onClick
}) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', { 
          style: 'currency', 
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        }).format(val);
      case 'percentage':
        return `${val.toFixed(2)}%`;
      case 'number':
      default:
        return new Intl.NumberFormat('en-US').format(val);
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600 bg-green-50 dark:bg-green-950/20';
      case 'negative':
        return 'text-red-600 bg-red-50 dark:bg-red-950/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-950/20';
    }
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return <ArrowUpRight size={14} />;
    if (changeType === 'negative') return <ArrowDownRight size={14} />;
    return null;
  };

  const getTrendColor = () => {
    switch (changeType) {
      case 'positive':
        return '#22c55e';
      case 'negative':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`
        group relative bg-card border border-border rounded-xl p-6 
        hover:shadow-lg hover:border-primary/20 transition-all duration-200
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-muted/50 rounded-lg group-hover:bg-primary/10 transition-colors duration-200">
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              {subtitle && (
                <p className="text-xs text-muted-foreground/70">{subtitle}</p>
              )}
            </div>
          </div>
          
          {trend && trend.length > 0 && (
            <div className="flex items-center">
              <Sparkline 
                data={trend} 
                color={getTrendColor()}
                width={80}
                height={24}
              />
            </div>
          )}
        </div>
        
        {/* Value */}
        <div className="mb-3">
          {isLoading ? (
            <div className="h-8 w-32 bg-muted animate-pulse rounded" />
          ) : (
            <p className="text-2xl font-bold text-foreground">
              {formatValue(value)}
            </p>
          )}
        </div>
        
        {/* Change Indicator */}
        {change !== undefined && !isLoading && (
          <div className="flex items-center justify-between">
            <div className={`
              flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
              ${getChangeColor()}
            `}>
              {getChangeIcon()}
              <span>{change > 0 ? '+' : ''}{change}%</span>
            </div>
            <span className="text-xs text-muted-foreground">{period}</span>
          </div>
        )}
        
        {/* Loading State for Change */}
        {change !== undefined && isLoading && (
          <div className="flex items-center justify-between">
            <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
            <div className="h-3 w-20 bg-muted animate-pulse rounded" />
          </div>
        )}
      </div>
      
      {/* Click Indicator */}
      {onClick && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowUpRight size={16} className="text-muted-foreground" />
        </div>
      )}
    </motion.div>
  );
};

export default MetricCard;
