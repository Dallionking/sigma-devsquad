
import React from 'react';
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { cn } from "@/lib/utils";

interface ComparisonCardProps {
  children: React.ReactNode;
  className?: string;
}

export const ComparisonCard = ({ children, className }: ComparisonCardProps) => {
  return (
    <EnhancedCard className={cn("p-6 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50", className)}>
      {children}
    </EnhancedCard>
  );
};
