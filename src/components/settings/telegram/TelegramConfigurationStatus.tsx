
import { ConfigurationStatusBadge } from "../shared/ConfigurationStatusBadge";
import { useConfigurationStatus } from "@/hooks/useConfigurationStatus";
import { useTelegramSettingsContext } from "./TelegramSettingsProvider";

export const TelegramConfigurationStatus = () => {
  const {
    connectionInfo,
    webhookConfig,
    selectedChannels,
    notificationSettings
  } = useTelegramSettingsContext();

  // Calculate configuration status
  const notificationSettingsRecord: Record<string, boolean> = {
    agentStatus: notificationSettings.agentStatus,
    taskCompletion: notificationSettings.taskCompletion,
    systemError: notificationSettings.systemError,
    planningAgent: notificationSettings.planningAgent,
    directMessaging: notificationSettings.directMessaging
  };

  const { status, details } = useConfigurationStatus({
    connectionInfo,
    webhookConfig,
    selectedChannels,
    notificationSettings: notificationSettingsRecord,
    platform: 'telegram'
  });

  return (
    <ConfigurationStatusBadge 
      status={status} 
      details={details} 
      platform="Telegram" 
    />
  );
};
