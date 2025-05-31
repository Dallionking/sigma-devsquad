
export interface DiscordConfig {
  webhookUrl: string;
  isEnabled: boolean;
  serverName?: string;
  channelName?: string;
}

export interface DiscordNotificationPayload {
  type: 'agent_status' | 'task_completion' | 'system_error' | 'planning_agent' | 'direct_message';
  title: string;
  message: string;
  agentName?: string;
  taskId?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  timestamp?: Date;
  userRole?: string;
}

export interface DiscordNotificationSettings {
  agentStatusNotifications: boolean;
  taskCompletionNotifications: boolean;
  systemErrorNotifications: boolean;
  planningAgentNotifications: boolean;
  directMessaging: boolean;
  roleBasedNotifications: boolean;
}
