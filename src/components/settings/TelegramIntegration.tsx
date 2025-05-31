import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SettingsSection } from "./SettingsSection";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { TelegramNotificationSettings } from "./telegram/TelegramNotificationSettings";
import { TelegramTestConnection } from "./telegram/TelegramTestConnection";
import { ChannelSelector } from "./shared/ChannelSelector";
import { MessageFormatCustomizer } from "./shared/MessageFormatCustomizer";
import { WebhookConfiguration } from "./shared/WebhookConfiguration";
import { EnhancedConnectionStatus } from "./shared/EnhancedConnectionStatus";
import { ConfigurationStatusBadge } from "./shared/ConfigurationStatusBadge";
import { useConfigurationStatus } from "@/hooks/useConfigurationStatus";
import { WebhookConfig, ChannelConfig, MessageTemplate } from "@/types/webhook";

interface TelegramIntegrationProps {
  searchQuery?: string;
}

export const TelegramIntegration = ({ searchQuery = "" }: TelegramIntegrationProps) => {
  // Connection state
  const [connectionInfo, setConnectionInfo] = useState({
    isConnected: false,
    connectionType: undefined as 'oauth' | 'webhook' | 'token' | undefined,
    lastConnected: undefined as Date | undefined,
    userName: "",
    serverName: "",
    channelName: "",
    permissions: [] as string[],
    expiresAt: undefined as Date | undefined
  });
  
  // Webhook configuration
  const [webhookConfig, setWebhookConfig] = useState<WebhookConfig>({
    url: "",
    isEnabled: false,
    retryAttempts: 3,
    timeout: 30,
    useAuth: false,
    authToken: ""
  });

  // Channel configuration (for Telegram, these would be chats/groups)
  const [availableChannels] = useState<ChannelConfig[]>([
    { id: 'chat1', name: 'General Chat', type: 'dm' },
    { id: 'chat2', name: 'Notifications Group', type: 'dm' },
    { id: 'chat3', name: 'Alert Channel', type: 'dm' },
    { id: 'chat4', name: 'Team Updates', type: 'dm' }
  ]);
  
  const [selectedChannels, setSelectedChannels] = useState<Record<string, string>>({});

  // Message templates
  const [messageTemplates] = useState<MessageTemplate[]>([
    {
      id: 'agent_status',
      name: 'Agent Status Template',
      template: '🤖 *Agent Update*\n{{agent_name}} is now {{status}}\nTime: {{timestamp}}',
      variables: ['{{agent_name}}', '{{status}}', '{{timestamp}}']
    },
    {
      id: 'task_completion',
      name: 'Task Completion Template',
      template: '✅ *Task Completed*\nTask: {{task_title}} ({{task_id}})\nCompleted by: {{agent_name}}\nTime: {{timestamp}}',
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

  const { toast } = useToast();

  // Calculate configuration status
  const { status, details } = useConfigurationStatus({
    connectionInfo,
    webhookConfig,
    selectedChannels,
    notificationSettings: {
      agentStatus: agentStatusNotifications,
      taskCompletion: taskCompletionNotifications,
      systemError: systemErrorNotifications,
      planningAgent: planningAgentNotifications,
      directMessaging
    },
    platform: 'telegram'
  });

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
    console.log("Saving Telegram settings:", {
      connectionInfo,
      webhookConfig,
      selectedChannels,
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
    setSelectedChannels({});
    
    toast({
      title: "Settings Reset",
      description: "Telegram notification settings have been reset to defaults",
    });
  };

  const handleConnect = async (type: 'oauth' | 'webhook' | 'token') => {
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockData = {
      isConnected: true,
      connectionType: type,
      lastConnected: new Date(),
      userName: '@VibeDevSquadBot',
      serverName: undefined,
      channelName: undefined,
      permissions: ['Send Messages', 'Send Photos', 'Send Documents'],
      expiresAt: undefined // Telegram bot tokens don't expire
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
    // Simulate refresh process
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Telegram doesn't need token refresh, just validate connection
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
        {/* Enhanced Connection Status */}
        <EnhancedConnectionStatus
          platform="telegram"
          connectionInfo={connectionInfo}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          onRefresh={handleRefresh}
        />

        {/* Webhook Configuration */}
        <WebhookConfiguration
          config={webhookConfig}
          onConfigChange={setWebhookConfig}
          platform="telegram"
          isConnected={connectionInfo.isConnected}
        />

        {/* Channel Configuration */}
        {connectionInfo.isConnected && (
          <ChannelSelector
            channels={availableChannels}
            selectedChannels={selectedChannels}
            onChannelChange={handleChannelChange}
            platform="telegram"
          />
        )}

        {/* Message Format Customization */}
        {connectionInfo.isConnected && (
          <MessageFormatCustomizer
            templates={messageTemplates}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            onTemplateUpdate={handleTemplateUpdate}
            platform="telegram"
          />
        )}

        {/* Notification Settings */}
        {connectionInfo.isConnected && (
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
        {connectionInfo.isConnected && <TelegramTestConnection />}
      </OptimizedStack>
    </SettingsSection>
  );
};
