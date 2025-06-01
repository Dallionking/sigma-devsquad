
import React from 'react';
import { BarChart3, ChevronDown, ChevronUp } from "lucide-react";

interface ComparisonTriggerButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export const ComparisonTriggerButton = ({ isExpanded, onToggle }: ComparisonTriggerButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="w-full h-16 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border border-purple-200/50 dark:border-purple-800/50 rounded-xl transition-all duration-300 hover:shadow-lg group"
      aria-expanded={isExpanded}
      aria-controls="comparison-content"
    >
      <div className="flex items-center justify-center space-x-3">
        <BarChart3 className="w-5 h-5 text-vibe-primary" />
        <span className="text-lg font-semibold text-vibe-primary">
          See How We Compare
        </span>
        <span className="text-sm text-muted-foreground">
          (Save up to 99.9% vs traditional teams)
        </span>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-vibe-primary group-hover:scale-110 transition-transform" />
        ) : (
          <ChevronDown className="w-5 h-5 text-vibe-primary group-hover:scale-110 transition-transform" />
        )}
      </div>
    </button>
  );
};
