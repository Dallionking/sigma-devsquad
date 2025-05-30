
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const DashboardHeader = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="mb-6 sm:mb-8 lg:mb-12 text-center lg:text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full lg:w-auto">
          <h1 className={`font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent ${
            isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl lg:text-5xl'
          }`}>
            AI Development Workforce Command Center
          </h1>
          <p className={`text-muted-foreground max-w-3xl mx-auto lg:mx-0 leading-relaxed ${
            isMobile ? 'text-sm' : 'text-base sm:text-lg'
          }`}>
            Monitor and manage your AI agent ecosystem in real-time with comprehensive insights and controls
          </p>
        </div>
        {!isMobile && (
          <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 flex items-center gap-2 self-start sm:self-center px-4 py-2">
            <Activity className="w-3 h-3" />
            System Healthy
          </Badge>
        )}
      </div>
    </header>
  );
};
