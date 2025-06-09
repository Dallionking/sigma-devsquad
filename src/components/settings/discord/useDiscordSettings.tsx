
import { useState } from "react";
import { WebhookConfig, ChannelConfig, MessageTemplate } from "@/types/webhook";

interface ConnectionInfo {
  isConnected: boolean;
  connectionType?: 'oauth' | 'webhook' | 'token';
  lastConnected?: Date;
  userName: string;
  serverName: string;
  channelName: string;
  permissions: string[];
  expiresAt?: Date;
}

interface NotificationSettings {
  agentStatus: boolean;
  taskCompletion: boolean;
  systemError: boolean;
  planningAgent: boolean;
  directMessaging: boolean;
  roleBasedNotifications: boolean;
}

export const useDiscordSettings = () => {
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo>({
    isConnected: false,
    connectionType: undefined,
    lastConnected: undefined,
    userName: "",
    serverName: "",
    channelName: "",
    permissions: [],
    expiresAt: undefined
  });
  
  const [webhookConfig, setWebhookConfig] = useState<WebhookConfig>({
    url: "",
    isEnabled: false,
    retryAttempts: 3,
    timeout: 30,
    useAuth: false,
    authToken: ""
  });

  const [availableChannels] = useState<ChannelConfig[]>([
    { id: 'ch1', name: 'general', type: 'text' },
    { id: 'ch2', name: 'notifications', type: 'text' },
    { id: 'ch3', name: 'alerts', type: 'text' },
    { id: 'ch4', name: 'team-chat', type: 'voice' }
  ]);
  
  const [selectedChannels, setSelectedChannels] = useState<Record<string, string>>({});

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
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    agentStatus: true,
    taskCompletion: true,
    systemError: true,
    planningAgent: true,
    directMessaging: true,
    roleBasedNotifications: true
  });

  return {
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
  };
};
