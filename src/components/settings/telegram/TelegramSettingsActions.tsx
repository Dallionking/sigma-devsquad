
import { useToast } from "@/hooks/use-toast";
import { useTelegramSettingsContext } from "./TelegramSettingsProvider";

export const useTelegramSettingsActions = () => {
  const {
    connectionInfo,
    webhookConfig,
    selectedChannels,
    notificationSettings,
    setNotificationSettings,
    setSelectedChannels
  } = useTelegramSettingsContext();

  const { toast } = useToast();

  const handleSave = () => {
    console.log("Saving Telegram settings:", {
      connectionInfo,
      webhookConfig,
      selectedChannels,
      ...notificationSettings
    });
    
    toast({
      title: "Settings Saved",
      description: "Telegram integration settings have been saved",
    });
  };

  const handleReset = () => {
    const resetNotificationSettings = {
      agentStatus: true,
      taskCompletion: true,
      systemError: true,
      planningAgent: true,
      directMessaging: true
    };
    setNotificationSettings(resetNotificationSettings);
    setSelectedChannels({});
    
    toast({
      title: "Settings Reset",
      description: "Telegram notification settings have been reset to defaults",
    });
  };

  return {
    handleSave,
    handleReset
  };
};
