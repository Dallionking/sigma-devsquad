
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SettingsSection } from "./SettingsSection";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { TelegramConnectionStatus } from "./telegram/TelegramConnectionStatus";
import { TelegramNotificationSettings } from "./telegram/TelegramNotificationSettings";
import { TelegramTestConnection } from "./telegram/TelegramTestConnection";
import { ChannelSelector } from "./shared/ChannelSelector";
import { MessageFormatCustomizer } from "./shared/MessageFormatCustomizer";
import { WebhookConfig, ChannelConfig, MessageTemplate } from "@/types/webhook";

interface TelegramIntegrationProps {
  searchQuery?: string;
}

export const TelegramIntegration = ({ searchQuery = "" }: TelegramIntegrationProps) => {
  const [isConnected, setIsConnected] = useState(false);
  
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
      isConnected,
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

        {/* Channel Configuration */}
        {isConnected && (
          <ChannelSelector
            channels={availableChannels}
            selectedChannels={selectedChannels}
            onChannelChange={handleChannelChange}
            platform="telegram"
          />
        )}

        {/* Message Format Customization */}
        {isConnected && (
          <MessageFormatCustomizer
            templates={messageTemplates}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            onTemplateUpdate={handleTemplateUpdate}
            platform="telegram"
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
