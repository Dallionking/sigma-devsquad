
import { useState } from "react";
import { SettingsSection } from "./SettingsSection";
import { SettingItem } from "./SettingItem";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { useToast } from "@/hooks/use-toast";
import { Settings, Users, Database, Zap } from "lucide-react";

interface ConfigurationSettingsProps {
  searchQuery?: string;
}

export const ConfigurationSettings = ({ searchQuery = "" }: ConfigurationSettingsProps) => {
  // State Management Settings
  const [updateFrequency, setUpdateFrequency] = useState("medium");
  const [cachingStrategy, setCachingStrategy] = useState("smart");
  const [persistenceMode, setPersistenceMode] = useState("session");
  const [debugMode, setDebugMode] = useState(false);
  const [performanceLevel, setPerformanceLevel] = useState("balanced");
  const [compressionEnabled, setCompressionEnabled] = useState(false);

  // Collaboration Settings
  const [realtimeUpdates, setRealtimeUpdates] = useState(true);
  const [presenceVisibility, setPresenceVisibility] = useState("team");
  const [conflictResolution, setConflictResolution] = useState("merge");
  const [notificationLevel, setNotificationLevel] = useState("important");
  const [permissionLevel, setPermissionLevel] = useState("collaborator");
  const [activityBroadcast, setActivityBroadcast] = useState("selective");

  const { debugger: stateDebugger, performance } = useDataPersistence();
  const { toast } = useToast();

  const handleSaveStateSettings = () => {
    const settings = {
      updateFrequency,
      cachingStrategy,
      persistenceMode,
      debugMode,
      performanceLevel,
      compressionEnabled
    };
    
    // Apply debug mode setting
    stateDebugger.setIsCapturing(debugMode);
    
    console.log("Saving state management settings:", settings);
    toast({
      title: "State Settings Saved",
      description: "State management configuration has been updated"
    });
  };

  const handleSaveCollaborationSettings = () => {
    const settings = {
      realtimeUpdates,
      presenceVisibility,
      conflictResolution,
      notificationLevel,
      permissionLevel,
      activityBroadcast
    };
    
    console.log("Saving collaboration settings:", settings);
    toast({
      title: "Collaboration Settings Saved",
      description: "Collaboration preferences have been updated"
    });
  };

  const handleResetStateSettings = () => {
    setUpdateFrequency("medium");
    setCachingStrategy("smart");
    setPersistenceMode("session");
    setDebugMode(false);
    setPerformanceLevel("balanced");
    setCompressionEnabled(false);
    stateDebugger.setIsCapturing(false);
  };

  const handleResetCollaborationSettings = () => {
    setRealtimeUpdates(true);
    setPresenceVisibility("team");
    setConflictResolution("merge");
    setNotificationLevel("important");
    setPermissionLevel("collaborator");
    setActivityBroadcast("selective");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configuration Options
          </CardTitle>
          <CardDescription>
            Advanced settings for state management and collaboration features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="state" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="state" className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                State Management
              </TabsTrigger>
              <TabsTrigger value="collaboration" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Collaboration
              </TabsTrigger>
            </TabsList>

            <TabsContent value="state" className="space-y-6 mt-6">
              <SettingsSection
                title="State Management Settings"
                description="Configure how the application manages and persists state"
                onSave={handleSaveStateSettings}
                onReset={handleResetStateSettings}
                searchQuery={searchQuery}
              >
                <SettingItem
                  id="update-frequency"
                  type="select"
                  label="Update Frequency"
                  description="How often state updates are processed"
                  value={updateFrequency}
                  onValueChange={setUpdateFrequency}
                  options={[
                    { value: "high", label: "High (16ms)" },
                    { value: "medium", label: "Medium (50ms)" },
                    { value: "low", label: "Low (100ms)" },
                    { value: "minimal", label: "Minimal (500ms)" }
                  ]}
                />

                <SettingItem
                  id="caching-strategy"
                  type="select"
                  label="Caching Strategy"
                  description="How data is cached and retrieved"
                  value={cachingStrategy}
                  onValueChange={setCachingStrategy}
                  options={[
                    { value: "aggressive", label: "Aggressive - Cache everything" },
                    { value: "smart", label: "Smart - Cache frequently used" },
                    { value: "minimal", label: "Minimal - Cache essential only" },
                    { value: "disabled", label: "Disabled - No caching" }
                  ]}
                />

                <SettingItem
                  id="persistence-mode"
                  type="select"
                  label="Persistence Preferences"
                  description="Where and how state data is stored"
                  value={persistenceMode}
                  onValueChange={setPersistenceMode}
                  options={[
                    { value: "session", label: "Session Storage" },
                    { value: "local", label: "Local Storage" },
                    { value: "memory", label: "Memory Only" },
                    { value: "cloud", label: "Cloud Sync" }
                  ]}
                />

                <SettingItem
                  id="debug-mode"
                  type="switch"
                  label="Debug Mode"
                  description="Enable detailed state debugging and logging"
                  checked={debugMode}
                  onCheckedChange={setDebugMode}
                />

                <SettingItem
                  id="performance-level"
                  type="select"
                  label="Performance Optimization"
                  description="Level of performance optimizations applied"
                  value={performanceLevel}
                  onValueChange={setPerformanceLevel}
                  options={[
                    { value: "maximum", label: "Maximum - All optimizations" },
                    { value: "balanced", label: "Balanced - Smart optimizations" },
                    { value: "minimal", label: "Minimal - Basic optimizations" },
                    { value: "disabled", label: "Disabled - No optimizations" }
                  ]}
                />

                <SettingItem
                  id="compression-enabled"
                  type="switch"
                  label="Data Compression"
                  description="Compress large state objects to save memory"
                  checked={compressionEnabled}
                  onCheckedChange={setCompressionEnabled}
                />

                {/* Debug Stats Display */}
                {debugMode && (
                  <Card className="mt-4 bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-sm">Debug Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Debug Entries:</span>
                          <Badge variant="outline" className="ml-2">
                            {stateDebugger.debugEntries.length}
                          </Badge>
                        </div>
                        <div>
                          <span className="font-medium">Capturing:</span>
                          <Badge variant={stateDebugger.isCapturing ? "default" : "secondary"} className="ml-2">
                            {stateDebugger.isCapturing ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={stateDebugger.clearDebugEntries}
                        >
                          Clear Entries
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={stateDebugger.exportDebugData}
                        >
                          Export Debug Data
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </SettingsSection>
            </TabsContent>

            <TabsContent value="collaboration" className="space-y-6 mt-6">
              <SettingsSection
                title="Collaboration Settings"
                description="Configure real-time collaboration and team interaction features"
                onSave={handleSaveCollaborationSettings}
                onReset={handleResetCollaborationSettings}
                searchQuery={searchQuery}
              >
                <SettingItem
                  id="realtime-updates"
                  type="switch"
                  label="Real-time Update Preferences"
                  description="Enable live updates from other collaborators"
                  checked={realtimeUpdates}
                  onCheckedChange={setRealtimeUpdates}
                />

                <SettingItem
                  id="presence-visibility"
                  type="select"
                  label="Presence Visibility Controls"
                  description="Who can see your activity and presence"
                  value={presenceVisibility}
                  onValueChange={setPresenceVisibility}
                  options={[
                    { value: "everyone", label: "Everyone - All users" },
                    { value: "team", label: "Team - Team members only" },
                    { value: "project", label: "Project - Project collaborators" },
                    { value: "private", label: "Private - Hide from all" }
                  ]}
                />

                <SettingItem
                  id="conflict-resolution"
                  type="select"
                  label="Conflict Resolution Strategy"
                  description="How to handle conflicting changes"
                  value={conflictResolution}
                  onValueChange={setConflictResolution}
                  options={[
                    { value: "merge", label: "Auto-merge - Automatic resolution" },
                    { value: "prompt", label: "Prompt - Ask before resolving" },
                    { value: "latest", label: "Latest wins - Last change wins" },
                    { value: "manual", label: "Manual - Always require intervention" }
                  ]}
                />

                <SettingItem
                  id="notification-level"
                  type="select"
                  label="Notification Preferences"
                  description="Level of collaboration notifications to receive"
                  value={notificationLevel}
                  onValueChange={setNotificationLevel}
                  options={[
                    { value: "all", label: "All - Every activity" },
                    { value: "important", label: "Important - Key changes only" },
                    { value: "minimal", label: "Minimal - Critical only" },
                    { value: "disabled", label: "Disabled - No notifications" }
                  ]}
                />

                <SettingItem
                  id="permission-level"
                  type="select"
                  label="Collaboration Permission Level"
                  description="Your default permission level for new collaborations"
                  value={permissionLevel}
                  onValueChange={setPermissionLevel}
                  options={[
                    { value: "owner", label: "Owner - Full control" },
                    { value: "editor", label: "Editor - Edit and manage" },
                    { value: "collaborator", label: "Collaborator - Edit content" },
                    { value: "viewer", label: "Viewer - View only" }
                  ]}
                />

                <SettingItem
                  id="activity-broadcast"
                  type="select"
                  label="Activity Broadcast Options"
                  description="What activities to broadcast to other users"
                  value={activityBroadcast}
                  onValueChange={setActivityBroadcast}
                  options={[
                    { value: "all", label: "All - Broadcast everything" },
                    { value: "selective", label: "Selective - Important actions only" },
                    { value: "minimal", label: "Minimal - Major changes only" },
                    { value: "disabled", label: "Disabled - No broadcasting" }
                  ]}
                />

                {/* Collaboration Status Display */}
                <Card className="mt-4 bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Current Collaboration Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Real-time:</span>
                        <Badge variant={realtimeUpdates ? "default" : "secondary"} className="ml-2">
                          {realtimeUpdates ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium">Visibility:</span>
                        <Badge variant="outline" className="ml-2">
                          {presenceVisibility}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium">Conflicts:</span>
                        <Badge variant="outline" className="ml-2">
                          {conflictResolution}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium">Notifications:</span>
                        <Badge variant="outline" className="ml-2">
                          {notificationLevel}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SettingsSection>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
