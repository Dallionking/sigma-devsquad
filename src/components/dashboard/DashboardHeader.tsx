
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, Users, Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const DashboardHeader = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="text-center lg:text-left">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
        <div className="w-full lg:w-auto space-y-3">
          {/* Enhanced main title with better gradient */}
          <div className="relative">
            <h1 className={cn(
              "font-bold leading-tight tracking-tight",
              "bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-slate-100 dark:via-blue-200 dark:to-indigo-200",
              "bg-clip-text text-transparent",
              isMobile ? "text-2xl" : "text-3xl sm:text-4xl lg:text-5xl"
            )}>
              AI Development Workforce
              <span className="block text-gradient-accent">Command Center</span>
            </h1>
            
            {/* Subtle glow effect for desktop */}
            {!isMobile && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20 blur-3xl opacity-30 -z-10 scale-150" />
            )}
          </div>
          
          <p className={cn(
            "text-muted-foreground/80 max-w-3xl mx-auto lg:mx-0 leading-relaxed font-medium",
            isMobile ? "text-sm" : "text-base lg:text-lg"
          )}>
            Monitor and orchestrate your AI agent ecosystem with real-time insights, 
            intelligent automation, and comprehensive performance analytics
          </p>
        </div>
        
        {/* Enhanced status indicators for desktop */}
        {!isMobile && (
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex items-center gap-3 p-4 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-75" />
                </div>
                <span className="text-sm font-medium text-foreground">System Optimal</span>
              </div>
              
              <div className="w-px h-6 bg-border/50" />
              
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs text-muted-foreground">All Systems Active</span>
              </div>
            </div>
            
            {/* Performance badge */}
            <Badge 
              variant="secondary" 
              className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 px-4 py-2 text-sm font-medium"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              High Performance
            </Badge>
          </div>
        )}
        
        {/* Mobile status indicator */}
        {isMobile && (
          <div className="w-full flex justify-center">
            <Badge 
              variant="secondary" 
              className="bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 px-3 py-1.5"
            >
              <Activity className="w-3 h-3 mr-1.5" />
              System Active
            </Badge>
          </div>
        )}
      </div>
    </header>
  );
};
