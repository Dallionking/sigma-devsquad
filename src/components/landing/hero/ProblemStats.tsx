
import React from 'react';
import { TrendingUp } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export const ProblemStats = () => {
  const problemStats = [
    { metric: "47%", label: "Time Lost to Coordination", color: "text-red-500" },
    { metric: "68%", label: "Context Switching Overhead", color: "text-orange-500" },
    { metric: "85%", label: "Communication Inefficiency", color: "text-yellow-500" }
  ];

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-xl p-6 border border-red-200/50 dark:border-red-800/50">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-red-500" />
        <span className="text-sm font-semibold text-red-700 dark:text-red-300">Development Fragmentation Crisis</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {problemStats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-2xl font-bold ${stat.color}`}>
              <AnimatedCounter value={stat.metric} />
            </div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
