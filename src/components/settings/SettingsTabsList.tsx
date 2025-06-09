
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Monitor, Shield, Bell, Database, Palette, Key } from "lucide-react";
import { cn } from "@/lib/utils";

export const SettingsTabsList = () => {
  const tabs = [
    { value: "general", icon: SettingsIcon, label: "General", shortLabel: "General" },
    { value: "api-keys", icon: Key, label: "API Keys", shortLabel: "API" },
    { value: "appearance", icon: Palette, label: "Appearance", shortLabel: "Theme" },
    { value: "performance", icon: Monitor, label: "Performance", shortLabel: "Perf" },
    { value: "security", icon: Shield, label: "Security", shortLabel: "Security" },
    { value: "notifications", icon: Bell, label: "Notifications", shortLabel: "Notify" },
    { value: "backup", icon: Database, label: "Backup", shortLabel: "Backup" }
  ];

  return (
    <div className="relative w-full">
      <TabsList className={cn(
        "grid w-full gap-1 bg-muted/50 p-1 rounded-xl h-auto min-h-[44px]",
        "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7",
        "overflow-x-auto scrollbar-thin scrollbar-thumb-muted-foreground/20"
      )}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <TabsTrigger 
              key={tab.value}
              value={tab.value} 
              className={cn(
                "min-h-[40px] px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg",
                "transition-all duration-200 whitespace-nowrap",
                "data-[state=active]:bg-background data-[state=active]:shadow-md",
                "data-[state=active]:scale-105 hover:scale-102",
                "flex items-center justify-center gap-1 sm:gap-2",
                "focus:ring-2 focus:ring-primary focus:ring-offset-2",
                "touch-manipulation min-w-0"
              )}
            >
              <IconComponent className="w-4 h-4 flex-shrink-0" />
              <span className="hidden xs:inline sm:hidden lg:inline truncate">
                {tab.label}
              </span>
              <span className="inline xs:hidden sm:inline lg:hidden truncate text-xs">
                {tab.shortLabel}
              </span>
            </TabsTrigger>
          );
        })}
      </TabsList>
      
      {/* Scroll indicators for mobile */}
      <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-background to-transparent pointer-events-none lg:hidden" />
      <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-background to-transparent pointer-events-none lg:hidden" />
    </div>
  );
};
