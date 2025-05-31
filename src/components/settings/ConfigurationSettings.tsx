
import { SettingsSection } from "./SettingsSection";
import { SettingItem } from "./SettingItem";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useConfigurationSettings } from "@/hooks/useConfigurationSettings";
import { Settings, Users, Database, Zap } from "lucide-react";

interface ConfigurationSettingsProps {
  searchQuery?: string;
}

export const ConfigurationSettings = ({ searchQuery = "" }: ConfigurationSettingsProps) => {
  const {
    // State Management
    stateConfig,
    updateStateConfig,
    saveStateSettings,
    resetStateSettings,
    
    // Collaboration
    collaborationConfig,
    updateCollaborationConfig,
    saveCollaborationSettings,
    resetCollaborationSettings,
    
    // Utilities
    exportConfiguration
  } = useConfigurationSettings();

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
                onSave={saveStateSettings}
                onReset={resetStateSettings}
                searchQuery={searchQuery}
              >
                <SettingItem
                  id="update-frequency"
                  type="select"
                  label="Update Frequency"
                  description="How often state updates are processed"
                  value={stateConfig.updateFrequency}
                  onValueChange={(value) => updateStateConfig({ updateFrequency: value })}
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
                  value={stateConfig.cachingStrategy}
                  onValueChange={(value) => updateStateConfig({ cachingStrategy: value })}
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
                  value={stateConfig.persistenceMode}
                  onValueChange={(value) => updateStateConfig({ persistenceMode: value })}
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
                  checked={stateConfig.debugMode}
                  onCheckedChange={(checked) => updateStateConfig({ debugMode: checked })}
                />

                <SettingItem
                  id="performance-level"
                  type="select"
                  label="Performance Optimization"
                  description="Level of performance optimizations applied"
                  value={stateConfig.performanceLevel}
                  onValueChange={(value) => updateStateConfig({ performanceLevel: value })}
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
                  checked={stateConfig.compressionEnabled}
                  onCheckedChange={(checked) => updateStateConfig({ compressionEnabled: checked })}
                />
              </SettingsSection>
            </TabsContent>

            <TabsContent value="collaboration" className="space-y-6 mt-6">
              <SettingsSection
                title="Collaboration Settings"
                description="Configure real-time collaboration and team interaction features"
                onSave={saveCollaborationSettings}
                onReset={resetCollaborationSettings}
                searchQuery={searchQuery}
              >
                <SettingItem
                  id="realtime-updates"
                  type="switch"
                  label="Real-time Update Preferences"
                  description="Enable live updates from other collaborators"
                  checked={collaborationConfig.realtimeUpdates}
                  onCheckedChange={(checked) => updateCollaborationConfig({ realtimeUpdates: checked })}
                />

                <SettingItem
                  id="presence-visibility"
                  type="select"
                  label="Presence Visibility Controls"
                  description="Who can see your activity and presence"
                  value={collaborationConfig.presenceVisibility}
                  onValueChange={(value) => updateCollaborationConfig({ presenceVisibility: value })}
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
                  value={collaborationConfig.conflictResolution}
                  onValueChange={(value) => updateCollaborationConfig({ conflictResolution: value })}
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
                  value={collaborationConfig.notificationLevel}
                  onValueChange={(value) => updateCollaborationConfig({ notificationLevel: value })}
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
                  value={collaborationConfig.permissionLevel}
                  onValueChange={(value) => updateCollaborationConfig({ permissionLevel: value })}
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
                  value={collaborationConfig.activityBroadcast}
                  onValueChange={(value) => updateCollaborationConfig({ activityBroadcast: value })}
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
                        <Badge variant={collaborationConfig.realtimeUpdates ? "default" : "secondary"} className="ml-2">
                          {collaborationConfig.realtimeUpdates ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium">Visibility:</span>
                        <Badge variant="outline" className="ml-2">
                          {collaborationConfig.presenceVisibility}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium">Conflicts:</span>
                        <Badge variant="outline" className="ml-2">
                          {collaborationConfig.conflictResolution}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium">Notifications:</span>
                        <Badge variant="outline" className="ml-2">
                          {collaborationConfig.notificationLevel}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SettingsSection>
            </TabsContent>
          </Tabs>

          {/* Export Configuration */}
          <div className="mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={exportConfiguration}
              className="w-full"
            >
              Export Configuration Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
