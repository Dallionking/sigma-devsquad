// Phase 11: Analytics Page
// Main page for the Analytics Dashboard feature

import React from 'react';
import { DashboardLayout, AnalyticsDashboard } from '@/components/dashboard';

const Analytics: React.FC = () => {
  return (
    <DashboardLayout currentPath="/analytics">
      <AnalyticsDashboard />
    </DashboardLayout>
  );
};

export default Analytics;
