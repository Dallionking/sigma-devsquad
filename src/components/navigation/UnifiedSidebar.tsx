
import React from 'react';
import { EnhancedUnifiedSidebar } from './EnhancedUnifiedSidebar';

interface UnifiedSidebarProps {
  className?: string;
}

export const UnifiedSidebar = ({ className }: UnifiedSidebarProps) => {
  return <EnhancedUnifiedSidebar className={className} />;
};
