
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SettingsSection } from "./SettingsSection";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { DiscordConnectionStatus } from "./discord/DiscordConnectionStatus";
import { DiscordNotificationSettings } from "./discord/DiscordNotificationSettings";
import { DiscordTestConnection } from "./discord/DiscordTestConnection";

interface DiscordIntegrationProps {
  searchQuery?: string;
}

export const DiscordIntegration = ({ searchQuery = "" }: DiscordIntegrationProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [serverName, setServerName] = useState("");
  const [channelName, setChannelName] = useState("");
  
  // Notification settings
  const [agentStatusNotifications, setAgentStatusNotifications] = useState(true);
  const [taskCompletionNotifications, setTaskCompletionNotifications] = useState(true);
  const [systemErrorNotifications, setSystemErrorNotifications] = useState(true);
  const [planningAgentNotifications, setPlanningAgentNotifications] = useState(true);
  const [directMessaging, setDirectMessaging] = useState(true);
  const [roleBasedNotifications, setRoleBasedNotifications] = useState(true);

  const { toast } = useToast();

  const handleSave = () => {
    console.log("Saving Discord settings:", {
      isConnected,
      serverName,
      channelName,
      agentStatusNotifications,
      taskCompletionNotifications,
      systemErrorNotifications,
      planningAgentNotifications,
      directMessaging,
      roleBasedNotifications
    });
    
    toast({
      title: "Settings Saved",
      description: "Discord integration settings have been saved",
    });
  };

  const handleReset = () => {
    setAgentStatusNotifications(true);
    setTaskCompletionNotifications(true);
    setSystemErrorNotifications(true);
    setPlanningAgentNotifications(true);
    setDirectMessaging(true);
    setRoleBasedNotifications(true);
    
    toast({
      title: "Settings Reset",
      description: "Discord notification settings have been reset to defaults",
    });
  };

  return (
    <SettingsSection
      title="Discord Integration"
      description="Connect to Discord for webhook-based notifications and team communication"
      onSave={handleSave}
      onReset={handleReset}
      searchQuery={searchQuery}
    >
      <OptimizedStack gap="md">
        {/* Connection Status */}
        <DiscordConnectionStatus 
          isConnected={isConnected}
          onConnectionChange={setIsConnected}
          serverName={serverName}
          channelName={channelName}
          onServerNameChange={setServerName}
          onChannelNameChange={setChannelName}
        />

        {/* Notification Settings */}
        {isConnected && (
          <DiscordNotificationSettings
            agentStatusNotifications={agentStatusNotifications}
            taskCompletionNotifications={taskCompletionNotifications}
            systemErrorNotifications={systemErrorNotifications}
            planningAgentNotifications={planningAgentNotifications}
            directMessaging={directMessaging}
            roleBasedNotifications={roleBasedNotifications}
            onAgentStatusChange={setAgentStatusNotifications}
            onTaskCompletionChange={setTaskCompletionNotifications}
            onSystemErrorChange={setSystemErrorNotifications}
            onPlanningAgentChange={setPlanningAgentNotifications}
            onDirectMessagingChange={setDirectMessaging}
            onRoleBasedNotificationsChange={setRoleBasedNotifications}
          />
        )}

        {/* Test Connection */}
        {isConnected && <DiscordTestConnection />}
      </OptimizedStack>
    </SettingsSection>
  );
};
