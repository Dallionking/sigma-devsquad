
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WebhookUrlInputProps {
  url: string;
  platform: 'discord' | 'telegram';
  onUrlChange: (url: string) => void;
}

export const WebhookUrlInput = ({ url, platform, onUrlChange }: WebhookUrlInputProps) => {
  const validateWebhookUrl = (url: string): boolean => {
    if (platform === 'discord') {
      return url.includes('discord.com/api/webhooks/') && url.startsWith('https://');
    }
    if (platform === 'telegram') {
      return url.includes('api.telegram.org/bot') && url.startsWith('https://');
    }
    return false;
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="webhook-url">Webhook URL</Label>
      <Input
        id="webhook-url"
        type="url"
        placeholder={platform === 'discord' 
          ? "https://discord.com/api/webhooks/..." 
          : "https://api.telegram.org/bot..."}
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        className={!url || validateWebhookUrl(url) ? "" : "border-red-500"}
      />
      {url && !validateWebhookUrl(url) && (
        <p className="text-xs text-red-500">
          Invalid {platform} webhook URL format
        </p>
      )}
    </div>
  );
};
