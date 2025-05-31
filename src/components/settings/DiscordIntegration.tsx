
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SettingsSection } from "./SettingsSection";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { DiscordConnectionStatus } from "./discord/DiscordConnectionStatus";
import { DiscordNotificationSettings } from "./discord/DiscordNotificationSettings";
import { DiscordTestConnection } from "./discord/DiscordTestConnection";
import { ChannelSelector } from "./shared/ChannelSelector";
import { MessageFormatCustomizer } from "./shared/MessageFormatCustomizer";
import { WebhookConfig, ChannelConfig, MessageTemplate } from "@/types/webhook";

interface DiscordIntegrationProps {
  searchQuery?: string;
}

export const DiscordIntegration = ({ searchQuery = "" }: DiscordIntegrationProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [serverName, setServerName] = useState("");
  const [channelName, setChannelName] = useState("");
  
  // Webhook configuration
  const [webhookConfig, setWebhookConfig] = useState<WebhookConfig>({
    url: "",
    isEnabled: false,
    retryAttempts: 3,
    timeout: 30,
    useAuth: false,
    authToken: ""
  });

  // Channel configuration
  const [availableChannels] = useState<ChannelConfig[]>([
    { id: 'ch1', name: 'general', type: 'text' },
    { id: 'ch2', name: 'notifications', type: 'text' },
    { id: 'ch3', name: 'alerts', type: 'text' },
    { id: 'ch4', name: 'team-chat', type: 'voice' }
  ]);
  
  const [selectedChannels, setSelectedChannels] = useState<Record<string, string>>({});

  // Message templates
  const [messageTemplates] = useState<MessageTemplate[]>([
    {
      id: 'agent_status',
      name: 'Agent Status Template',
      template: '🤖 **Agent Update**\n{{agent_name}} is now {{status}}\nTime: {{timestamp}}',
      variables: ['{{agent_name}}', '{{status}}', '{{timestamp}}']
    },
    {
      id: 'task_completion',
      name: 'Task Completion Template',
      template: '✅ **Task Completed**\nTask: {{task_title}} ({{task_id}})\nCompleted by: {{agent_name}}\nTime: {{timestamp}}',
      variables: ['{{task_title}}', '{{task_id}}', '{{agent_name}}', '{{timestamp}}']
    }
  ]);
  
  const [selectedTemplate, setSelectedTemplate] = useState('agent_status');
  
  // Notification settings
  const [agentStatusNotifications, setAgentStatusNotifications] = useState(true);
  const [taskCompletionNotifications, setTaskCompletionNotifications] = useState(true);
  const [systemErrorNotifications, setSystemErrorNotifications] = useState(true);
  const [planningAgentNotifications, setPlanningAgentNotifications] = useState(true);
  const [directMessaging, setDirectMessaging] = useState(true);
  const [roleBasedNotifications, setRoleBasedNotifications] = useState(true);

  const { toast } = useToast();

  const handleWebhookConfigChange = (config: WebhookConfig) => {
    setWebhookConfig(config);
  };

  const handleChannelChange = (notificationType: string, channelId: string) => {
    setSelectedChannels(prev => ({
      ...prev,
      [notificationType]: channelId
    }));
  };

  const handleTemplateUpdate = (templateId: string, content: string) => {
    // In a real implementation, this would update the template in the backend
    console.log(`Updating template ${templateId} with content:`, content);
    toast({
      title: "Template Updated",
      description: "Message template has been saved successfully",
    });
  };

  const handleSave = () => {
    console.log("Saving Discord settings:", {
      isConnected,
      serverName,
      channelName,
      webhookConfig,
      selectedChannels,
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

        {/* Channel Configuration */}
        {isConnected && (
          <ChannelSelector
            channels={availableChannels}
            selectedChannels={selectedChannels}
            onChannelChange={handleChannelChange}
            platform="discord"
          />
        )}

        {/* Message Format Customization */}
        {isConnected && (
          <MessageFormatCustomizer
            templates={messageTemplates}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            onTemplateUpdate={handleTemplateUpdate}
            platform="discord"
          />
        )}

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
