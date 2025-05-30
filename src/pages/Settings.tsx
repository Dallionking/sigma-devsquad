
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Monitor, Shield, Bell, Database, Palette, Activity } from "lucide-react";

import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { PerformanceSettings } from "@/components/settings/PerformanceSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { BackupSettings } from "@/components/settings/BackupSettings";
import { SettingsSearchBar } from "@/components/settings/SettingsSearchBar";
import { Header } from "@/components/dashboard/Header";
import { ViewMode, Agent } from "@/types";
import { useToast } from "@/hooks/use-toast";

export const Settings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [performanceMode, setPerformanceMode] = useState("balanced");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock agents data for header
  const mockAgents: Agent[] = [
    { id: "1", type: "planning", name: "Planning Agent", status: "working", currentTask: "Active", progress: 75, lastActive: "2024-05-30T10:30:00Z" },
    { id: "2", type: "frontend", name: "Frontend Agent", status: "idle", currentTask: "Idle", progress: 0, lastActive: "2024-05-30T10:25:00Z" },
    { id: "3", type: "backend", name: "Backend Agent", status: "working", currentTask: "Active", progress: 45, lastActive: "2024-05-30T10:32:00Z" }
  ];

  const handleSaveAll = () => {
    toast({
      title: "All Settings Saved",
      description: "All configuration changes have been saved successfully.",
    });
  };

  const handleResetAll = () => {
    // Reset all settings to defaults
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
      {/* Enhanced skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only-focusable"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <Header 
        viewMode="workflow" 
        onViewModeChange={() => {}}
        agents={mockAgents}
      />
      
      <div className="bg-background text-foreground container-responsive py-responsive fade-in">
        <main id="main-content" className="max-w-6xl mx-auto space-y-responsive">
          {/* Enhanced header section with better typography and spacing */}
          <header className="text-center lg:text-left">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="heading-primary mb-4">
                  Settings & Configuration
                </h1>
                <p className="text-muted-enhanced max-w-3xl">
                  Manage system preferences and configuration options
                </p>
              </div>
              <Badge variant="secondary" className="status-success flex items-center gap-2 self-start sm:self-center">
                <Activity className="w-3 h-3" />
                System Healthy
              </Badge>
            </div>
          </header>

          {/* Enhanced search bar with better responsive design */}
          <div className="w-full max-w-md">
            <SettingsSearchBar 
              onSearch={setSearchQuery}
              placeholder="Search settings..."
            />
          </div>

          {/* Enhanced tabs with better responsive design and animations */}
          <Tabs defaultValue="general" className="space-y-responsive">
            {/* Enhanced tab navigation with better mobile support */}
            <div className="relative">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 bg-muted/50 p-1 rounded-xl h-auto">
                <TabsTrigger 
                  value="general" 
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md flex items-center gap-2"
                >
                  <SettingsIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">General</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="appearance" 
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md flex items-center gap-2"
                >
                  <Palette className="w-4 h-4" />
                  <span className="hidden sm:inline">Appearance</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="performance" 
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md flex items-center gap-2"
                >
                  <Monitor className="w-4 h-4" />
                  <span className="hidden sm:inline">Performance</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md flex items-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="backup" 
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md flex items-center gap-2"
                >
                  <Database className="w-4 h-4" />
                  <span className="hidden sm:inline">Backup</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Enhanced tab content with consistent spacing and animations */}
            <div className="mt-8">
              <TabsContent value="general" className="space-y-6 fade-in">
                <GeneralSettings searchQuery={searchQuery} />
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6 fade-in">
                <AppearanceSettings searchQuery={searchQuery} />
              </TabsContent>

              <TabsContent value="performance" className="space-y-6 fade-in">
                <PerformanceSettings 
                  performanceMode={performanceMode} 
                  setPerformanceMode={setPerformanceMode}
                  searchQuery={searchQuery}
                />
              </TabsContent>

              <TabsContent value="security" className="space-y-6 fade-in">
                <SecuritySettings searchQuery={searchQuery} />
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6 fade-in">
                <NotificationSettings 
                  notifications={notifications} 
                  setNotifications={setNotifications}
                  searchQuery={searchQuery}
                />
              </TabsContent>

              <TabsContent value="backup" className="space-y-6 fade-in">
                <BackupSettings 
                  autoBackup={autoBackup} 
                  setAutoBackup={setAutoBackup}
                  searchQuery={searchQuery}
                />
              </TabsContent>
            </div>
          </Tabs>

          {/* Enhanced action buttons with better responsive design */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-border">
            <Button 
              variant="outline" 
              onClick={handleResetAll}
              className="btn-secondary-enhanced w-full sm:w-auto"
            >
              Reset to Defaults
            </Button>
            <Button 
              onClick={handleSaveAll}
              className="btn-primary-enhanced w-full sm:w-auto"
            >
              Save All Changes
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
