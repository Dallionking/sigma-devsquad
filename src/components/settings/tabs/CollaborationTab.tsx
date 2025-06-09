
import { SettingsSection } from "../SettingsSection";
import { SettingItem } from "../SettingItem";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface CollaborationConfig {
  realtimeUpdates: boolean;
  presenceVisibility: string;
  conflictResolution: string;
  notificationLevel: string;
  permissionLevel: string;
  activityBroadcast: string;
}

interface CollaborationTabProps {
  collaborationConfig: CollaborationConfig;
  updateCollaborationConfig: (updates: Partial<CollaborationConfig>) => void;
  saveCollaborationSettings: () => void;
  resetCollaborationSettings: () => void;
  searchQuery?: string;
}

export const CollaborationTab = ({
  collaborationConfig,
  updateCollaborationConfig,
  saveCollaborationSettings,
  resetCollaborationSettings,
  searchQuery = ""
}: CollaborationTabProps) => {
  return (
    <>
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
    </>
  );
};
