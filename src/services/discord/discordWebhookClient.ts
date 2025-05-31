
import { DiscordConfig } from '@/types/discord';

export class DiscordWebhookClient {
  private config: DiscordConfig | null = null;

  configure(config: DiscordConfig) {
    this.config = config;
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
      const response = await fetch(this.config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [embed],
        }),
      });

      if (!response.ok) {
        throw new Error(`Discord webhook error: ${response.status}`);
      }

      console.log('Discord message sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send Discord message:', error);
      return false;
    }
  }

  isConfigured(): boolean {
    return this.config?.isEnabled && !!this.config.webhookUrl;
  }
}
