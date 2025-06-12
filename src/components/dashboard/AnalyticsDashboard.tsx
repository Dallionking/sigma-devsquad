"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Activity, 
  Eye,
  EyeOff,
  MoreVertical,
  Maximize2,
  Minimize2,
  X,
  GripVertical,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  ShoppingCart,
  Clock
} from "lucide-react";

// Utility function for class names
const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Types
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  trend?: number[];
  isLoading?: boolean;
  className?: string;
}

interface WidgetProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  isResizable?: boolean;
  onRemove?: (id: string) => void;
  onMaximize?: (id: string) => void;
  isMaximized?: boolean;
}

interface GridItem {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  component: React.ReactNode;
}

// Sparkline Chart Component
const SparklineChart = ({ data, color = "#3B82F6", width = 100, height = 30 }: { 
  data: number[], 
  color?: string, 
  width?: number, 
  height?: number 
}) => {
  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal;
  
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
        points={points}
      />
    </svg>
  );
};

// Metric Card Component
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  trend,
  isLoading = false,
  className
}) => {
  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }[changeType];
  
  const changeIcon = changeType === 'positive' ? ArrowUpRight : changeType === 'negative' ? ArrowDownRight : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-muted rounded-lg">
          {icon}
        </div>
        {trend && (
          <SparklineChart data={trend} />
        )}
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {isLoading ? (
          <div className="h-8 w-24 bg-muted animate-pulse rounded" />
        ) : (
          <p className="text-2xl font-bold">{value}</p>
        )}
        
        {change !== undefined && (
          <div className={cn("flex items-center gap-1 text-sm", changeColor)}>
            {changeIcon && React.createElement(changeIcon, { size: 16 })}
            <span>{change > 0 ? '+' : ''}{change}%</span>
            <span className="text-muted-foreground">vs last period</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Widget Container Component
const WidgetContainer: React.FC<WidgetProps> = ({
  id,
  title,
  children,
  className,
  isResizable = true,
  onRemove,
  onMaximize,
  isMaximized = false
}) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={cn(
            "bg-card border border-border rounded-xl overflow-hidden",
            isMaximized && "fixed inset-4 z-50",
            className
          )}
        >
          {/* Widget Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              {isResizable && <GripVertical size={16} className="text-muted-foreground cursor-move" />}
              <h3 className="font-semibold">{title}</h3>
            </div>
            
            <div className="flex items-center gap-1">
              <button className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground">
                <RefreshCw size={16} />
              </button>
              <button className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground">
                <Download size={16} />
              </button>
              {onMaximize && (
                <button 
                  onClick={() => onMaximize(id)}
                  className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                >
                  {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
              )}
              <button className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground">
                <MoreVertical size={16} />
              </button>
              {onRemove && (
                <button 
                  onClick={() => {
                    setIsVisible(false);
                    setTimeout(() => onRemove(id), 200);
                  }}
                  className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-red-500"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          
          {/* Widget Content */}
          <div className="p-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Dashboard Grid Component  
const DashboardGrid: React.FC<{ items: GridItem[], onItemChange?: (items: GridItem[]) => void }> = ({
  items,
  onItemChange
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div 
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          layout
          className={cn(
            "col-span-1 row-span-1",
            item.w > 1 && `lg:col-span-${Math.min(item.w, 4)}`,
            item.h > 1 && `row-span-${Math.min(item.h, 3)}`
          )}
        >
          {item.component}
        </motion.div>
      ))}
    </div>
  );
};

// Main Analytics Dashboard Component
const AnalyticsDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [maximizedWidget, setMaximizedWidget] = useState<string | null>(null);
  
  // Sample data
  const metrics = [
    {
      title: "Total Revenue",
      value: "$54,239",
      change: 12.5,
      changeType: 'positive' as const,
      icon: <DollarSign size={20} className="text-green-600" />,
      trend: [45, 52, 48, 61, 55, 67, 54]
    },
    {
      title: "Active Users",
      value: "2,847",
      change: -3.2,
      changeType: 'negative' as const,
      icon: <Users size={20} className="text-blue-600" />,
      trend: [28, 31, 29, 35, 32, 29, 28]
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: 8.1,
      changeType: 'positive' as const,
      icon: <Target size={20} className="text-purple-600" />,
      trend: [2.1, 2.8, 3.2, 2.9, 3.4, 3.1, 3.24]
    },
    {
      title: "Orders",
      value: "1,429",
      change: 0,
      changeType: 'neutral' as const,
      icon: <ShoppingCart size={20} className="text-orange-600" />,
      trend: [142, 156, 134, 148, 159, 143, 142]
    }
  ];

  const widgets: GridItem[] = [
    {
      id: 'revenue-chart',
      x: 0, y: 0, w: 2, h: 1,
      component: (
        <WidgetContainer
          id="revenue-chart"
          title="Revenue Over Time"
          onMaximize={setMaximizedWidget}
          isMaximized={maximizedWidget === 'revenue-chart'}
        >
          <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
            <div className="text-center">
              <BarChart3 size={48} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Revenue chart will be rendered here</p>
            </div>
          </div>
        </WidgetContainer>
      )
    },
    {
      id: 'user-activity',
      x: 2, y: 0, w: 2, h: 1,
      component: (
        <WidgetContainer
          id="user-activity"
          title="User Activity"
          onMaximize={setMaximizedWidget}
          isMaximized={maximizedWidget === 'user-activity'}
        >
          <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
            <div className="text-center">
              <Activity size={48} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Activity chart will be rendered here</p>
            </div>
          </div>
        </WidgetContainer>
      )
    },
    {
      id: 'top-products',
      x: 0, y: 1, w: 1, h: 1,
      component: (
        <WidgetContainer id="top-products" title="Top Products">
          <div className="space-y-3">
            {['MacBook Pro', 'iPhone 14', 'AirPods Pro'].map((product, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-sm">{product}</span>
                <span className="text-sm font-medium">${(Math.random() * 1000 + 500).toFixed(0)}</span>
              </div>
            ))}
          </div>
        </WidgetContainer>
      )
    }
  ];

  const timeRanges = [
    { label: '7 Days', value: '7d' },
    { label: '30 Days', value: '30d' },
    { label: '90 Days', value: '90d' },
    { label: '1 Year', value: '1y' }
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Monitor your key metrics and performance</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-sm"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
          
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2 text-sm"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
          
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted text-sm flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            {...metric}
            isLoading={isLoading}
          />
        ))}
      </div>

      {/* Widgets Grid */}
      <DashboardGrid items={widgets} />

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Zap className="text-blue-500" size={20} />
            </div>
            <div className="text-left">
              <div className="font-medium">Quick Setup</div>
              <div className="text-sm text-muted-foreground">Configure dashboard</div>
            </div>
          </button>
          
          <button className="p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <div className="text-left">
              <div className="font-medium">View Reports</div>
              <div className="text-sm text-muted-foreground">Detailed analytics</div>
            </div>
          </button>
          
          <button className="p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Calendar className="text-purple-500" size={20} />
            </div>
            <div className="text-left">
              <div className="font-medium">Schedule Report</div>
              <div className="text-sm text-muted-foreground">Automated insights</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
