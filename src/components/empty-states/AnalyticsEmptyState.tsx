
import React from 'react';
import { BarChart3, TrendingUp, Target, Eye } from 'lucide-react';
import { EmptyStateCard } from './EmptyStateCard';
import { useNavigate } from 'react-router-dom';

interface AnalyticsEmptyStateProps {
  onEnableTracking?: () => void;
}

export const AnalyticsEmptyState = ({ onEnableTracking }: AnalyticsEmptyStateProps) => {
  const navigate = useNavigate();

  const handleViewSettings = () => {
    navigate('/settings?tab=performance');
  };

  const handleLearnMore = () => {
    window.open('/docs/analytics', '_blank');
  };

  const tips = [
    "Track agent performance and productivity",
    "Monitor task completion rates",
    "Analyze team communication patterns",
    "Identify bottlenecks and optimization opportunities"
  ];

  return (
    <EmptyStateCard
      icon={BarChart3}
      title="Insights & Analytics"
      description="Gain valuable insights into your AI team's performance. Track productivity, identify patterns, and optimize your development workflows with detailed analytics."
      tips={tips}
      action={onEnableTracking ? {
        label: "Enable Tracking",
        onClick: onEnableTracking
      } : undefined}
      secondaryAction={{
        label: "Analytics Settings",
        onClick: handleViewSettings
      }}
      tertiaryAction={{
        label: "Learn More",
        onClick: handleLearnMore
      }}
    />
  );
};
