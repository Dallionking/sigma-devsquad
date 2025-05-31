
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const VibeBrandHeader = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="text-center lg:text-left">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
        <div className="w-full lg:w-auto space-y-3">
          {/* Vibe DevSquad Main Title */}
          <div className="relative">
            <h1 className={cn(
              "font-bold leading-tight tracking-tight vibe-gradient-text",
              isMobile ? "text-3xl" : "text-4xl sm:text-5xl lg:text-6xl"
            )}>
              Vibe DevSquad
              <span className="block text-gradient-accent vibe-heading-md">
                Command Center
              </span>
            </h1>
            
            {/* Enhanced glow effect */}
            {!isMobile && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-blue-500/30 to-purple-500/30 blur-3xl opacity-40 -z-10 scale-150 animate-pulse" />
            )}
          </div>
          
          <p className={cn(
            "text-muted-foreground/90 max-w-4xl mx-auto lg:mx-0 leading-relaxed font-medium",
            isMobile ? "text-sm" : "text-base lg:text-lg"
          )}>
            Orchestrate your AI development team with real-time collaboration, 
            intelligent automation, and comprehensive performance analytics
          </p>
        </div>
        
        {/* Enhanced status indicators for desktop */}
        {!isMobile && (
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="vibe-card p-4 bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-primary/20 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-75" />
                </div>
                <span className="text-sm font-semibold text-foreground">Squad Active</span>
              </div>
              
              <div className="w-full h-px bg-gradient-to-r from-primary/30 to-purple-500/30 my-2" />
              
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs text-muted-foreground font-medium">All Systems Vibing</span>
              </div>
            </div>
            
            {/* Performance badge with Vibe styling */}
            <Badge 
              variant="secondary" 
              className="vibe-status-active px-4 py-2 text-sm font-bold shadow-lg"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Peak Performance
            </Badge>
          </div>
        )}
        
        {/* Mobile status indicator */}
        {isMobile && (
          <div className="w-full flex justify-center">
            <Badge 
              variant="secondary" 
              className="vibe-status-active px-3 py-1.5"
            >
              <Zap className="w-3 h-3 mr-1.5" />
              Squad Active
            </Badge>
          </div>
        )}
      </div>
    </header>
  );
};
