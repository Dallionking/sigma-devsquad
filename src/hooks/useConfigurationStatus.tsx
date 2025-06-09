
import { useMemo } from 'react';
import { ConfigurationStatus } from '@/components/settings/shared/ConfigurationStatusBadge';

interface ConnectionInfo {
  isConnected: boolean;
  connectionType?: 'oauth' | 'webhook' | 'token';
  userName?: string;
  permissions?: string[];
}

interface WebhookConfig {
  url: string;
  isEnabled: boolean;
  useAuth: boolean;
  authToken: string;
}

interface IntegrationConfig {
  connectionInfo: ConnectionInfo;
  webhookConfig?: WebhookConfig;
  selectedChannels?: Record<string, string>;
  notificationSettings?: Record<string, boolean>;
  platform: 'discord' | 'telegram';
}

export const useConfigurationStatus = (config: IntegrationConfig) => {
  return useMemo(() => {
    const { connectionInfo, webhookConfig, selectedChannels, notificationSettings, platform } = config;
    
    const details: string[] = [];
    let status: ConfigurationStatus = 'unconfigured';
    
    // Check connection status
    if (!connectionInfo.isConnected) {
      details.push('Not connected to ' + platform);
      return { status, details };
    }
    
    // Connection is established
    details.push(`Connected via ${connectionInfo.connectionType || 'unknown method'}`);
    status = 'partial';
    
    // Check webhook configuration if enabled
    if (webhookConfig?.isEnabled) {
      if (webhookConfig.url) {
        details.push('Webhook URL configured');
        if (webhookConfig.useAuth && webhookConfig.authToken) {
          details.push('Authentication enabled');
        }
      } else {
        details.push('Webhook URL missing');
        return { status, details };
      }
    }
    
    // Check channel selection
    if (selectedChannels && Object.keys(selectedChannels).length > 0) {
      details.push(`${Object.keys(selectedChannels).length} notification channels configured`);
    } else {
      details.push('No notification channels selected');
    }
    
    // Check notification settings
    if (notificationSettings) {
      const enabledNotifications = Object.values(notificationSettings).filter(Boolean).length;
      const totalNotifications = Object.keys(notificationSettings).length;
      
      if (enabledNotifications > 0) {
        details.push(`${enabledNotifications}/${totalNotifications} notification types enabled`);
      } else {
        details.push('All notifications disabled');
      }
    }
    
    // Determine final status
    const hasChannels = selectedChannels && Object.keys(selectedChannels).length > 0;
    const hasNotifications = notificationSettings && Object.values(notificationSettings).some(Boolean);
    const hasValidWebhook = !webhookConfig?.isEnabled || (webhookConfig?.url && (!webhookConfig?.useAuth || webhookConfig?.authToken));
    
    if (connectionInfo.isConnected && hasValidWebhook && hasChannels && hasNotifications) {
      status = 'configured';
    } else if (connectionInfo.isConnected) {
      status = 'partial';
    }
    
    return { status, details };
  }, [config]);
};
