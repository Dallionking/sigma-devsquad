
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Monitor, Shield, Bell, Database, Palette, Key } from "lucide-react";

export const SettingsTabsList = () => {
  return (
    <div className="relative">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-1 bg-muted/50 p-1 rounded-xl h-auto">
        <TabsTrigger 
          value="general" 
          className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md flex items-center gap-2"
        >
          <SettingsIcon className="w-4 h-4" />
          <span className="hidden sm:inline">General</span>
        </TabsTrigger>
        <TabsTrigger 
          value="api-keys" 
          className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md flex items-center gap-2"
        >
          <Key className="w-4 h-4" />
          <span className="hidden sm:inline">API Keys</span>
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
  );
};
