
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SettingsSection } from "../SettingsSection";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { TelegramNotificationSettings } from "./TelegramNotificationSettings";
import { TelegramTestConnection } from "./TelegramTestConnection";
import { ChannelSelector } from "../shared/ChannelSelector";
import { MessageFormatCustomizer } from "../shared/MessageFormatCustomizer";
import { WebhookConfiguration } from "../shared/WebhookConfiguration";
import { EnhancedConnectionStatus } from "../shared/EnhancedConnectionStatus";
import { ConfigurationStatusBadge } from "../shared/ConfigurationStatusBadge";
import { useConfigurationStatus } from "@/hooks/useConfigurationStatus";
import { useTelegramSettings } from "./useTelegramSettings";

interface TelegramIntegrationContainerProps {
  searchQuery?: string;
}

export const TelegramIntegrationContainer = ({ searchQuery = "" }: TelegramIntegrationContainerProps) => {
  const {
    connectionInfo,
    webhookConfig,
    availableChannels,
    selectedChannels,
    messageTemplates,
    selectedTemplate,
    notificationSettings,
    setConnectionInfo,
    setWebhookConfig,
    setSelectedChannels,
    setSelectedTemplate,
    setNotificationSettings
  } = useTelegramSettings();

  const { toast } = useToast();

  // Calculate configuration status - convert notification settings to Record<string, boolean>
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

  const handleChannelChange = (notificationType: string, channelId: string) => {
    setSelectedChannels(prev => ({
      ...prev,
      [notificationType]: channelId
    }));
  };

  const handleTemplateUpdate = (templateId: string, content: string) => {
    console.log(`Updating template ${templateId} with content:`, content);
    toast({
      title: "Template Updated",
      description: "Message template has been saved successfully",
    });
  };

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
    setNotificationSettings({
      agentStatus: true,
      taskCompletion: true,
      systemError: true,
      planningAgent: true,
      directMessaging: true
    });
    setSelectedChannels({});
    
    toast({
      title: "Settings Reset",
      description: "Telegram notification settings have been reset to defaults",
    });
  };

  const handleConnect = async (type: 'oauth' | 'webhook' | 'token') => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockData = {
      isConnected: true,
      connectionType: type,
      lastConnected: new Date(),
      userName: '@VibeDevSquadBot',
      serverName: undefined,
      channelName: undefined,
      permissions: ['Send Messages', 'Send Photos', 'Send Documents'],
      expiresAt: undefined
    };
    
    setConnectionInfo(mockData);
  };

  const handleDisconnect = () => {
    setConnectionInfo({
      isConnected: false,
      connectionType: undefined,
      lastConnected: undefined,
      userName: "",
      serverName: "",
      channelName: "",
      permissions: [],
      expiresAt: undefined
    });
  };

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <SettingsSection
      title="Telegram Integration"
      description="Connect to Telegram for external notifications and messaging"
      onSave={handleSave}
      onReset={handleReset}
      searchQuery={searchQuery}
      headerElement={
        <ConfigurationStatusBadge 
          status={status} 
          details={details} 
          platform="Telegram" 
        />
      }
    >
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
          <ChannelSelector
            channels={availableChannels}
            selectedChannels={selectedChannels}
            onChannelChange={handleChannelChange}
            platform="telegram"
          />
        )}

        {connectionInfo.isConnected && (
          <MessageFormatCustomizer
            templates={messageTemplates}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            onTemplateUpdate={handleTemplateUpdate}
            platform="telegram"
          />
        )}

        {connectionInfo.isConnected && (
          <TelegramNotificationSettings
            agentStatusNotifications={notificationSettings.agentStatus}
            taskCompletionNotifications={notificationSettings.taskCompletion}
            systemErrorNotifications={notificationSettings.systemError}
            planningAgentNotifications={notificationSettings.planningAgent}
            directMessaging={notificationSettings.directMessaging}
            onAgentStatusChange={(value) => setNotificationSettings(prev => ({ ...prev, agentStatus: value }))}
            onTaskCompletionChange={(value) => setNotificationSettings(prev => ({ ...prev, taskCompletion: value }))}
            onSystemErrorChange={(value) => setNotificationSettings(prev => ({ ...prev, systemError: value }))}
            onPlanningAgentChange={(value) => setNotificationSettings(prev => ({ ...prev, planningAgent: value }))}
            onDirectMessagingChange={(value) => setNotificationSettings(prev => ({ ...prev, directMessaging: value }))}
          />
        )}

        {connectionInfo.isConnected && <TelegramTestConnection />}
      </OptimizedStack>
    </SettingsSection>
  );
};
