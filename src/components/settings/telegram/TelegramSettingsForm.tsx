
import { useToast } from "@/hooks/use-toast";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { TelegramNotificationSettings } from "./TelegramNotificationSettings";
import { TelegramTestConnection } from "./TelegramTestConnection";
import { ChannelSelector } from "../shared/ChannelSelector";
import { MessageFormatCustomizer } from "../shared/MessageFormatCustomizer";
import { WebhookConfiguration } from "../shared/WebhookConfiguration";
import { EnhancedConnectionStatus } from "../shared/EnhancedConnectionStatus";
import { useTelegramSettingsContext } from "./TelegramSettingsProvider";
import { useTelegramConnectionManager } from "./TelegramConnectionManager";

export const TelegramSettingsForm = () => {
  const {
    webhookConfig,
    availableChannels,
    selectedChannels,
    messageTemplates,
    selectedTemplate,
    notificationSettings,
    setWebhookConfig,
    setSelectedChannels,
    setSelectedTemplate,
    setNotificationSettings
  } = useTelegramSettingsContext();

  const { toast } = useToast();
  const { connectionInfo, handleConnect, handleDisconnect, handleRefresh } = useTelegramConnectionManager();

  const handleChannelChange = (notificationType: string, channelId: string) => {
    const updatedChannels = {
      ...selectedChannels,
      [notificationType]: channelId
    };
    setSelectedChannels(updatedChannels);
  };

  const handleTemplateUpdate = (templateId: string, content: string) => {
    console.log(`Updating template ${templateId} with content:`, content);
    toast({
      title: "Template Updated",
      description: "Message template has been saved successfully",
    });
  };

  return (
    <OptimizedStack gap="md">
      <EnhancedConnectionStatus
        platform="telegram"
        connectionInfo={connectionInfo}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        onRefresh={handleRefresh}
      />

      <WebhookConfiguration
        config={webhookConfig}
        onConfigChange={setWebhookConfig}
        platform="telegram"
        isConnected={connectionInfo.isConnected}
      />

      {connectionInfo.isConnected && (
        <>
          <ChannelSelector
            channels={availableChannels}
            selectedChannels={selectedChannels}
            onChannelChange={handleChannelChange}
            platform="telegram"
          />

          <MessageFormatCustomizer
            templates={messageTemplates}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            onTemplateUpdate={handleTemplateUpdate}
            platform="telegram"
          />

          <TelegramNotificationSettings
            agentStatusNotifications={notificationSettings.agentStatus}
            taskCompletionNotifications={notificationSettings.taskCompletion}
            systemErrorNotifications={notificationSettings.systemError}
            planningAgentNotifications={notificationSettings.planningAgent}
            directMessaging={notificationSettings.directMessaging}
            onAgentStatusChange={(value) => {
              const updatedSettings = { ...notificationSettings, agentStatus: value };
              setNotificationSettings(updatedSettings);
            }}
            onTaskCompletionChange={(value) => {
              const updatedSettings = { ...notificationSettings, taskCompletion: value };
              setNotificationSettings(updatedSettings);
            }}
            onSystemErrorChange={(value) => {
              const updatedSettings = { ...notificationSettings, systemError: value };
              setNotificationSettings(updatedSettings);
            }}
            onPlanningAgentChange={(value) => {
              const updatedSettings = { ...notificationSettings, planningAgent: value };
              setNotificationSettings(updatedSettings);
            }}
            onDirectMessagingChange={(value) => {
              const updatedSettings = { ...notificationSettings, directMessaging: value };
              setNotificationSettings(updatedSettings);
            }}
          />

          <TelegramTestConnection />
        </>
      )}
    </OptimizedStack>
  );
};
