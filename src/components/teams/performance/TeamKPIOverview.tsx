
import React from 'react';
import { TeamKPIOverviewProps } from './types/teamKPI';
import { generateKPIMetrics } from './utils/kpiCalculations';
import { KPIMetricCard } from './components/KPIMetricCard';

export const TeamKPIOverview = ({ 
  team, 
  timeRange, 
  comparisonType,
  customDateRange,
  metrics 
}: TeamKPIOverviewProps) => {
  
  const kpiMetrics = generateKPIMetrics(metrics);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {kpiMetrics.map((metric) => (
        <KPIMetricCard 
          key={metric.id} 
          metric={metric} 
          comparisonType={comparisonType}
        />
      ))}
    </div>
  );
};
