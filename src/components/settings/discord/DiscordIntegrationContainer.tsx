
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SettingsSection } from "../SettingsSection";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { DiscordNotificationSettings } from "./DiscordNotificationSettings";
import { DiscordTestConnection } from "./DiscordTestConnection";
import { ChannelSelector } from "../shared/ChannelSelector";
import { MessageFormatCustomizer } from "../shared/MessageFormatCustomizer";
import { WebhookConfiguration } from "../shared/WebhookConfiguration";
import { EnhancedConnectionStatus } from "../shared/EnhancedConnectionStatus";
import { ConfigurationStatusBadge } from "../shared/ConfigurationStatusBadge";
import { useConfigurationStatus } from "@/hooks/useConfigurationStatus";
import { useDiscordSettings } from "./useDiscordSettings";

interface DiscordIntegrationContainerProps {
  searchQuery?: string;
}

export const DiscordIntegrationContainer = ({ searchQuery = "" }: DiscordIntegrationContainerProps) => {
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
  } = useDiscordSettings();

  const { toast } = useToast();

  // Calculate configuration status - convert notification settings to Record<string, boolean>
  const notificationSettingsRecord: Record<string, boolean> = {
    agentStatus: notificationSettings.agentStatus,
    taskCompletion: notificationSettings.taskCompletion,
    systemError: notificationSettings.systemError,
    planningAgent: notificationSettings.planningAgent,
    directMessaging: notificationSettings.directMessaging,
    roleBasedNotifications: notificationSettings.roleBasedNotifications
  };

  const { status, details } = useConfigurationStatus({
    connectionInfo,
    webhookConfig,
    selectedChannels,
    notificationSettings: notificationSettingsRecord,
    platform: 'discord'
  });

  const handleConnect = async (type: 'oauth' | 'webhook' | 'token') => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockData = {
      isConnected: true,
      connectionType: type,
      lastConnected: new Date(),
      userName: type === 'oauth' ? 'VibeDevSquad#1234' : undefined,
      serverName: 'Vibe Development',
      channelName: 'notifications',
      permissions: type === 'oauth' ? ['Send Messages', 'Embed Links', 'Manage Webhooks'] : ['Send Messages'],
      expiresAt: type === 'oauth' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined
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
    
    if (connectionInfo.connectionType === 'oauth') {
      setConnectionInfo(prev => ({
        ...prev,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }));
    }
  };

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
    console.log("Saving Discord settings:", {
      connectionInfo,
      webhookConfig,
      selectedChannels,
      ...notificationSettings
    });
    
    toast({
      title: "Settings Saved",
      description: "Discord integration settings have been saved",
    });
  };

  const handleReset = () => {
    setNotificationSettings({
      agentStatus: true,
      taskCompletion: true,
      systemError: true,
      planningAgent: true,
      directMessaging: true,
      roleBasedNotifications: true
    });
    setSelectedChannels({});
    
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
      headerElement={
        <ConfigurationStatusBadge 
          status={status} 
          details={details} 
          platform="Discord" 
        />
      }
    >
      <OptimizedStack gap="md">
        <EnhancedConnectionStatus
          platform="discord"
          connectionInfo={connectionInfo}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          onRefresh={handleRefresh}
        />

        <WebhookConfiguration
          config={webhookConfig}
          onConfigChange={setWebhookConfig}
          platform="discord"
          isConnected={connectionInfo.isConnected}
        />

        {connectionInfo.isConnected && (
          <ChannelSelector
            channels={availableChannels}
            selectedChannels={selectedChannels}
            onChannelChange={handleChannelChange}
            platform="discord"
          />
        )}

        {connectionInfo.isConnected && (
          <MessageFormatCustomizer
            templates={messageTemplates}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            onTemplateUpdate={handleTemplateUpdate}
            platform="discord"
          />
        )}

        {connectionInfo.isConnected && (
          <DiscordNotificationSettings
            agentStatusNotifications={notificationSettings.agentStatus}
            taskCompletionNotifications={notificationSettings.taskCompletion}
            systemErrorNotifications={notificationSettings.systemError}
            planningAgentNotifications={notificationSettings.planningAgent}
            directMessaging={notificationSettings.directMessaging}
            roleBasedNotifications={notificationSettings.roleBasedNotifications}
            onAgentStatusChange={(value) => setNotificationSettings(prev => ({ ...prev, agentStatus: value }))}
            onTaskCompletionChange={(value) => setNotificationSettings(prev => ({ ...prev, taskCompletion: value }))}
            onSystemErrorChange={(value) => setNotificationSettings(prev => ({ ...prev, systemError: value }))}
            onPlanningAgentChange={(value) => setNotificationSettings(prev => ({ ...prev, planningAgent: value }))}
            onDirectMessagingChange={(value) => setNotificationSettings(prev => ({ ...prev, directMessaging: value }))}
            onRoleBasedNotificationsChange={(value) => setNotificationSettings(prev => ({ ...prev, roleBasedNotifications: value }))}
          />
        )}

        {connectionInfo.isConnected && <DiscordTestConnection />}
      </OptimizedStack>
    </SettingsSection>
  );
};
