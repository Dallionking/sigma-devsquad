
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SettingsSection } from "./SettingsSection";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { TelegramConnectionStatus } from "./telegram/TelegramConnectionStatus";
import { TelegramNotificationSettings } from "./telegram/TelegramNotificationSettings";
import { TelegramTestConnection } from "./telegram/TelegramTestConnection";
import { ChannelSelector } from "./shared/ChannelSelector";
import { MessageTemplateEditor } from "./shared/MessageTemplateEditor";
import { WebhookConfiguration } from "./shared/WebhookConfiguration";

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

  // Channel mappings (for Telegram groups/channels)
  const [channelMappings, setChannelMappings] = useState({});
  
  // Message templates
  const [messageTemplates, setMessageTemplates] = useState({
    agentStatus: "🤖 Agent *{agentName}* status changed from {oldStatus} to {newStatus}",
    taskCompletion: "✅ Task *{taskTitle}* completed{agentName ? ` by ${agentName}` : ''}",
    systemError: "🚨 {priority === 'critical' ? 'Critical' : 'High Priority'} Alert: {error}",
    planningAgent: "📋 Planning Agent Update: {message}",
    directMessage: "💬 Direct Message: {message}"
  });

  // Webhook configuration
  const [webhookConfig, setWebhookConfig] = useState({
    url: "",
    isEnabled: true,
    retryAttempts: 3,
    timeout: 10,
    useAuth: false,
    authToken: ""
  });

  const { toast } = useToast();

  const handleSave = () => {
    console.log("Saving Telegram settings:", {
      isConnected,
      agentStatusNotifications,
      taskCompletionNotifications,
      systemErrorNotifications,
      planningAgentNotifications,
      directMessaging,
      channelMappings,
      messageTemplates,
      webhookConfig
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
    setChannelMappings({});
    setMessageTemplates({
      agentStatus: "🤖 Agent *{agentName}* status changed from {oldStatus} to {newStatus}",
      taskCompletion: "✅ Task *{taskTitle}* completed{agentName ? ` by ${agentName}` : ''}",
      systemError: "🚨 {priority === 'critical' ? 'Critical' : 'High Priority'} Alert: {error}",
      planningAgent: "📋 Planning Agent Update: {message}",
      directMessage: "💬 Direct Message: {message}"
    });
    setWebhookConfig({
      url: "",
      isEnabled: true,
      retryAttempts: 3,
      timeout: 10,
      useAuth: false,
      authToken: ""
    });
    
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

        {/* Webhook Configuration */}
        {isConnected && (
          <WebhookConfiguration
            platform="telegram"
            config={webhookConfig}
            onConfigChange={setWebhookConfig}
          />
        )}

        {/* Channel Selection */}
        {isConnected && (
          <ChannelSelector
            platform="telegram"
            isConnected={isConnected}
            channelMappings={channelMappings}
            onChannelMappingChange={setChannelMappings}
          />
        )}

        {/* Message Templates */}
        {isConnected && (
          <MessageTemplateEditor
            platform="telegram"
            templates={messageTemplates}
            onTemplatesChange={setMessageTemplates}
          />
        )}

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
