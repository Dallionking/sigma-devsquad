
import { DiscordConfig } from '@/types/discord';
import { securityConfig } from '@/utils/securityConfig';
import { InputValidator } from '@/utils/inputValidation';

export class DiscordWebhookClient {
  private config: DiscordConfig | null = null;

  configure(config: DiscordConfig) {
    // Validate webhook URL
    const urlValidation = InputValidator.validateWebhookUrl(config.webhookUrl || '');
    if (!urlValidation.isValid) {
      console.error('Invalid Discord webhook URL:', urlValidation.errors);
      return;
    }

    // Validate webhook source
    if (config.webhookUrl && !securityConfig.validateWebhookSource(config.webhookUrl)) {
      console.error('Webhook URL is not from an allowed source');
      return;
    }

    this.config = {
      ...config,
      webhookUrl: urlValidation.sanitized
    };
    
    console.log('Discord webhook client configured:', { 
      isEnabled: config.isEnabled,
      hasWebhook: !!config.webhookUrl,
      server: config.serverName,
      channel: config.channelName
    });
  }

  async sendMessage(embed: any): Promise<boolean> {
    if (!this.config || !this.config.isEnabled || !this.config.webhookUrl) {
      console.log('Discord webhook client not configured or disabled');
      return false;
    }

    try {
      // Validate payload size
      const payload = JSON.stringify({ embeds: [embed] });
      if (!securityConfig.validatePayloadSize(payload)) {
        console.error('Discord webhook payload too large');
        return false;
      }

      const response = await fetch(this.config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error(`Discord webhook error: ${response.status} - ${response.statusText}`);
      }

      console.log('Discord message sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send Discord message:', error);
      return false;
    }
  }

  isConfigured(): boolean {
    return !!(this.config?.isEnabled && this.config.webhookUrl);
  }

  validateConfiguration(): { isValid: boolean; errors: string[] } {
    if (!this.config) {
      return { isValid: false, errors: ['Client not configured'] };
    }

    const errors: string[] = [];

    if (!this.config.webhookUrl) {
      errors.push('Webhook URL is required');
    } else {
      const urlValidation = InputValidator.validateWebhookUrl(this.config.webhookUrl);
      if (!urlValidation.isValid) {
        errors.push(...urlValidation.errors);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
