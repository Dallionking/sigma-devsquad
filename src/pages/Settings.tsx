
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
import { Header } from "@/components/dashboard/Header";
import { ViewMode, Agent } from "@/types";
import { useTheme } from "@/contexts/ThemeContext";

export const Settings = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [performanceMode, setPerformanceMode] = useState("balanced");

  // Mock agents data for header
  const mockAgents: Agent[] = [
    { id: "1", type: "planning", name: "Planning Agent", status: "working", currentTask: "Active", progress: 75, lastActive: "2024-05-30T10:30:00Z" },
    { id: "2", type: "frontend", name: "Frontend Agent", status: "idle", currentTask: "Idle", progress: 0, lastActive: "2024-05-30T10:25:00Z" },
    { id: "3", type: "backend", name: "Backend Agent", status: "working", currentTask: "Active", progress: 45, lastActive: "2024-05-30T10:32:00Z" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        viewMode="workflow" 
        onViewModeChange={() => {}}
        agents={mockAgents}
      />
      
      <div className="bg-background text-foreground p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground">Settings & Configuration</h1>
              <p className="text-muted-foreground mt-2">Manage system preferences and configuration</p>
            </div>
            <Badge variant="secondary" className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300">
              <Activity className="w-3 h-3 mr-1" />
              System Healthy
            </Badge>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-muted">
              <TabsTrigger value="general" className="flex items-center space-x-2">
                <SettingsIcon className="w-4 h-4" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center space-x-2">
                <Palette className="w-4 h-4" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center space-x-2">
                <Monitor className="w-4 h-4" />
                <span>Performance</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="backup" className="flex items-center space-x-2">
                <Database className="w-4 h-4" />
                <span>Backup</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <GeneralSettings />
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <AppearanceSettings darkMode={darkMode} setDarkMode={toggleDarkMode} />
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <PerformanceSettings performanceMode={performanceMode} setPerformanceMode={setPerformanceMode} />
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <SecuritySettings />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <NotificationSettings notifications={notifications} setNotifications={setNotifications} />
            </TabsContent>

            <TabsContent value="backup" className="space-y-6">
              <BackupSettings autoBackup={autoBackup} setAutoBackup={setAutoBackup} />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Reset to Defaults</Button>
            <Button>Save All Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
