import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SettingsSection } from "./SettingsSection";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { DiscordNotificationSettings } from "./discord/DiscordNotificationSettings";
import { DiscordTestConnection } from "./discord/DiscordTestConnection";
import { ChannelSelector } from "./shared/ChannelSelector";
import { MessageFormatCustomizer } from "./shared/MessageFormatCustomizer";
import { WebhookConfiguration } from "./shared/WebhookConfiguration";
import { EnhancedConnectionStatus } from "./shared/EnhancedConnectionStatus";
import { ConfigurationStatusBadge } from "./shared/ConfigurationStatusBadge";
import { useConfigurationStatus } from "@/hooks/useConfigurationStatus";
import { WebhookConfig, ChannelConfig, MessageTemplate } from "@/types/webhook";

interface DiscordIntegrationProps {
  searchQuery?: string;
}

export const DiscordIntegration = ({ searchQuery = "" }: DiscordIntegrationProps) => {
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
      directMessaging,
      roleBasedNotifications
    },
    platform: 'discord'
  });

  const handleConnect = async (type: 'oauth' | 'webhook' | 'token') => {
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockData = {
      isConnected: true,
      connectionType: type,
      lastConnected: new Date(),
      userName: type === 'oauth' ? 'VibeDevSquad#1234' : undefined,
      serverName: 'Vibe Development',
      channelName: 'notifications',
      permissions: type === 'oauth' ? ['Send Messages', 'Embed Links', 'Manage Webhooks'] : ['Send Messages'],
      expiresAt: type === 'oauth' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined // 30 days
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
    
    if (connectionInfo.connectionType === 'oauth') {
      setConnectionInfo(prev => ({
        ...prev,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Extend by 30 days
      }));
    }
  };

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
      connectionInfo,
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
      headerElement={
        <ConfigurationStatusBadge 
          status={status} 
          details={details} 
          platform="Discord" 
        />
      }
    >
      <OptimizedStack gap="md">
        {/* Enhanced Connection Status */}
        <EnhancedConnectionStatus
          platform="discord"
          connectionInfo={connectionInfo}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          onRefresh={handleRefresh}
        />

        {/* Webhook Configuration */}
        <WebhookConfiguration
          config={webhookConfig}
          onConfigChange={setWebhookConfig}
          platform="discord"
          isConnected={connectionInfo.isConnected}
        />

        {/* Channel Configuration */}
        {connectionInfo.isConnected && (
          <ChannelSelector
            channels={availableChannels}
            selectedChannels={selectedChannels}
            onChannelChange={handleChannelChange}
            platform="discord"
          />
        )}

        {/* Message Format Customization */}
        {connectionInfo.isConnected && (
          <MessageFormatCustomizer
            templates={messageTemplates}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            onTemplateUpdate={handleTemplateUpdate}
            platform="discord"
          />
        )}

        {/* Notification Settings */}
        {connectionInfo.isConnected && (
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
        {connectionInfo.isConnected && <DiscordTestConnection />}
      </OptimizedStack>
    </SettingsSection>
  );
};
