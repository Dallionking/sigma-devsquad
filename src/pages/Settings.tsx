import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { APIKeySettings } from "@/components/settings/APIKeySettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { PerformanceSettings } from "@/components/settings/PerformanceSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { BackupSettings } from "@/components/settings/BackupSettings";
import { SettingsSearchBar } from "@/components/settings/SettingsSearchBar";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsTabsList } from "@/components/settings/SettingsTabsList";
import { SettingsActions } from "@/components/settings/SettingsActions";
import { Header } from "@/components/dashboard/Header";
import { ViewMode, Agent } from "@/types";
import { useToast } from "@/hooks/use-toast";

export const Settings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [performanceMode, setPerformanceMode] = useState("balanced");
  const [searchQuery, setSearchQuery] = useState("");

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
          <SettingsHeader />

          <div className="w-full max-w-md">
            <SettingsSearchBar 
              onSearch={setSearchQuery}
              placeholder="Search settings..."
            />
          </div>

          <Tabs defaultValue="general" className="space-y-responsive">
            <SettingsTabsList />

            <div className="mt-8">
              <TabsContent value="general" className="space-y-6 fade-in">
                <GeneralSettings searchQuery={searchQuery} />
              </TabsContent>

              <TabsContent value="api-keys" className="space-y-6 fade-in">
                <APIKeySettings searchQuery={searchQuery} />
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

          <SettingsActions 
            onSaveAll={handleSaveAll}
            onResetAll={handleResetAll}
          />
        </main>
      </div>
    </div>
  );
};

export default Settings;
