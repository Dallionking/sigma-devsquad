import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { APIKeySettings } from "@/components/settings/APIKeySettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { PerformanceSettings } from "@/components/settings/PerformanceSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { BackupSettings } from "@/components/settings/BackupSettings";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsTabsList } from "@/components/settings/SettingsTabsList";
import { SettingsActions } from "@/components/settings/SettingsActions";
import { AdvancedSearchBar } from "@/components/settings/AdvancedSearchBar";
import { Header } from "@/components/dashboard/Header";
import { ViewMode, Agent } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { cn } from "@/lib/utils";

export const Settings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [performanceMode, setPerformanceMode] = useState("balanced");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState({});
  const [activeTab, setActiveTab] = useState("general");

  // Keyboard navigation setup
  const { focusNext, focusPrevious } = useKeyboardNavigation({
    onEscape: () => {
      // Clear search when pressing Escape
      if (searchQuery) {
        setSearchQuery("");
      }
    },
    enableArrowNavigation: true,
    onArrowDown: focusNext,
    onArrowUp: focusPrevious,
  });

  const mockAgents: Agent[] = [
    { 
      id: "1", 
      type: "planning", 
      name: "Planning Agent", 
      status: "working", 
      currentTask: "Active", 
      progress: 75, 
      lastActive: "2024-05-30T10:30:00Z",
      capabilities: ["requirement-analysis", "project-planning"],
      specialization: "Project Planning",
      background: "Expert in project planning and requirements analysis",
      description: "Analyzes requirements and creates project roadmaps"
    },
    { 
      id: "2", 
      type: "frontend", 
      name: "Frontend Agent", 
      status: "idle", 
      currentTask: "Idle", 
      progress: 0, 
      lastActive: "2024-05-30T10:25:00Z",
      capabilities: ["react-development", "ui-design"],
      specialization: "Frontend Development",
      background: "Expert in React and modern frontend technologies",
      description: "Builds user interfaces and client-side functionality"
    },
    { 
      id: "3", 
      type: "backend", 
      name: "Backend Agent", 
      status: "working", 
      currentTask: "Active", 
      progress: 45, 
      lastActive: "2024-05-30T10:32:00Z",
      capabilities: ["api-development", "database-design"],
      specialization: "Backend Development",
      background: "Expert in server-side development and APIs",
      description: "Develops server-side logic and API endpoints"
    }
  ];

  const handleSaveAll = () => {
    toast({
      title: "All Settings Saved",
      description: "All configuration changes have been saved successfully.",
    });
  };

  const handleResetAll = () => {
    setNotifications(true);
    setAutoBackup(true);
    setPerformanceMode("balanced");
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <Header 
        viewMode="workflow" 
        onViewModeChange={() => {}}
        agents={mockAgents}
      />
      
      <div className="bg-background text-foreground">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <main 
            id="main-content" 
            className="space-y-6 sm:space-y-8"
            role="main"
            aria-label="Settings Configuration"
          >
            <div className="fade-in">
              <SettingsHeader />
            </div>

            <div className="fade-in" style={{ animationDelay: "100ms" }}>
              <AdvancedSearchBar 
                onSearch={setSearchQuery}
                onFilterChange={setSearchFilters}
                placeholder="Search settings... (Press Escape to clear)"
                categories={["General", "Security", "API", "Performance", "Appearance", "Notifications", "Backup"]}
                className="max-w-2xl"
              />
            </div>

            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="space-y-6 fade-in" 
              style={{ animationDelay: "200ms" }}
            >
              <div className="overflow-x-auto" role="tablist">
                <SettingsTabsList />
              </div>

              <div className="min-h-[500px]">
                <TabsContent 
                  value="general" 
                  className={cn(
                    "space-y-6 mt-6 focus:outline-none",
                    "animate-in fade-in-0 duration-200"
                  )}
                  tabIndex={-1}
                  role="tabpanel"
                  aria-labelledby="general-tab"
                >
                  <GeneralSettings searchQuery={searchQuery} />
                </TabsContent>

                <TabsContent 
                  value="api-keys" 
                  className={cn(
                    "space-y-6 mt-6 focus:outline-none",
                    "animate-in fade-in-0 duration-200"
                  )}
                  tabIndex={-1}
                  role="tabpanel"
                  aria-labelledby="api-keys-tab"
                >
                  <APIKeySettings searchQuery={searchQuery} />
                </TabsContent>

                <TabsContent 
                  value="appearance" 
                  className={cn(
                    "space-y-6 mt-6 focus:outline-none",
                    "animate-in fade-in-0 duration-200"
                  )}
                  tabIndex={-1}
                  role="tabpanel"
                  aria-labelledby="appearance-tab"
                >
                  <AppearanceSettings searchQuery={searchQuery} />
                </TabsContent>

                <TabsContent 
                  value="performance" 
                  className={cn(
                    "space-y-6 mt-6 focus:outline-none",
                    "animate-in fade-in-0 duration-200"
                  )}
                  tabIndex={-1}
                  role="tabpanel"
                  aria-labelledby="performance-tab"
                >
                  <PerformanceSettings 
                    performanceMode={performanceMode} 
                    setPerformanceMode={setPerformanceMode}
                    searchQuery={searchQuery}
                  />
                </TabsContent>

                <TabsContent 
                  value="security" 
                  className={cn(
                    "space-y-6 mt-6 focus:outline-none",
                    "animate-in fade-in-0 duration-200"
                  )}
                  tabIndex={-1}
                  role="tabpanel"
                  aria-labelledby="security-tab"
                >
                  <SecuritySettings searchQuery={searchQuery} />
                </TabsContent>

                <TabsContent 
                  value="notifications" 
                  className={cn(
                    "space-y-6 mt-6 focus:outline-none",
                    "animate-in fade-in-0 duration-200"
                  )}
                  tabIndex={-1}
                  role="tabpanel"
                  aria-labelledby="notifications-tab"
                >
                  <NotificationSettings 
                    notifications={notifications} 
                    setNotifications={setNotifications}
                    searchQuery={searchQuery}
                  />
                </TabsContent>

                <TabsContent 
                  value="backup" 
                  className={cn(
                    "space-y-6 mt-6 focus:outline-none",
                    "animate-in fade-in-0 duration-200"
                  )}
                  tabIndex={-1}
                  role="tabpanel"
                  aria-labelledby="backup-tab"
                >
                  <BackupSettings 
                    autoBackup={autoBackup} 
                    setAutoBackup={setAutoBackup}
                    searchQuery={searchQuery}
                  />
                </TabsContent>
              </div>
            </Tabs>

            <div className="fade-in" style={{ animationDelay: "300ms" }}>
              <SettingsActions 
                onSaveAll={handleSaveAll}
                onResetAll={handleResetAll}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
