
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SettingsSection } from "./SettingsSection";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { TelegramConnectionStatus } from "./telegram/TelegramConnectionStatus";
import { TelegramNotificationSettings } from "./telegram/TelegramNotificationSettings";
import { TelegramTestConnection } from "./telegram/TelegramTestConnection";

interface TelegramIntegrationProps {
  searchQuery?: string;
}

export const TelegramIntegration = ({ searchQuery = "" }: TelegramIntegrationProps) => {
  const [isConnected, setIsConnected] = useState(false);
  
  // Notification settings
  const [agentStatusNotifications, setAgentStatusNotifications] = useState(true);
  const [taskCompletionNotifications, setTaskCompletionNotifications] = useState(true);
  const [systemErrorNotifications, setSystemErrorNotifications] = useState(true);
  const [planningAgentNotifications, setPlanningAgentNotifications] = useState(true);
  const [directMessaging, setDirectMessaging] = useState(true);

  const { toast } = useToast();

  const handleSave = () => {
    console.log("Saving Telegram settings:", {
      isConnected,
      agentStatusNotifications,
      taskCompletionNotifications,
      systemErrorNotifications,
      planningAgentNotifications,
      directMessaging
    });
    
    toast({
      title: "Settings Saved",
      description: "Telegram integration settings have been saved",
    });
  };

  const handleReset = () => {
    setAgentStatusNotifications(true);
    setTaskCompletionNotifications(true);
    setSystemErrorNotifications(true);
    setPlanningAgentNotifications(true);
    setDirectMessaging(true);
    
    toast({
      title: "Settings Reset",
      description: "Telegram notification settings have been reset to defaults",
    });
  };

  return (
    <SettingsSection
      title="Telegram Integration"
      description="Connect to Telegram for external notifications and messaging"
      onSave={handleSave}
      onReset={handleReset}
      searchQuery={searchQuery}
    >
      <OptimizedStack gap="md">
        {/* Connection Status */}
        <TelegramConnectionStatus 
          isConnected={isConnected}
          onConnectionChange={setIsConnected}
        />

        {/* Notification Settings */}
        {isConnected && (
          <TelegramNotificationSettings
            agentStatusNotifications={agentStatusNotifications}
            taskCompletionNotifications={taskCompletionNotifications}
            systemErrorNotifications={systemErrorNotifications}
            planningAgentNotifications={planningAgentNotifications}
            directMessaging={directMessaging}
            onAgentStatusChange={setAgentStatusNotifications}
            onTaskCompletionChange={setTaskCompletionNotifications}
            onSystemErrorChange={setSystemErrorNotifications}
            onPlanningAgentChange={setPlanningAgentNotifications}
            onDirectMessagingChange={setDirectMessaging}
          />
        )}

        {/* Test Connection */}
        {isConnected && <TelegramTestConnection />}
      </OptimizedStack>
    </SettingsSection>
  );
};
