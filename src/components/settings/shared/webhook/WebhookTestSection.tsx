
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { TestTube, CheckCircle, AlertTriangle } from "lucide-react";

interface WebhookTestSectionProps {
  webhookUrl: string;
  platform: 'discord' | 'telegram';
  useAuth: boolean;
  authToken: string;
}

export const WebhookTestSection = ({ webhookUrl, platform, useAuth, authToken }: WebhookTestSectionProps) => {
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const { toast } = useToast();

  const validateWebhookUrl = (url: string): boolean => {
    if (platform === 'discord') {
      return url.includes('discord.com/api/webhooks/') && url.startsWith('https://');
    }
    if (platform === 'telegram') {
      return url.includes('api.telegram.org/bot') && url.startsWith('https://');
    }
    return false;
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl || !validateWebhookUrl(webhookUrl)) {
      toast({
        title: "Invalid Webhook URL",
        description: `Please provide a valid ${platform} webhook URL`,
        variant: "destructive",
      });
      return;
    }

    setIsTestingWebhook(true);
    setTestResult(null);

    try {
      const testPayload = platform === 'discord' 
        ? {
            embeds: [{
              title: "🧪 Webhook Test",
              description: "This is a test message from Vibe DevSquad",
              color: 0x00ff00,
              timestamp: new Date().toISOString()
            }]
          }
        : {
            text: "🧪 *Webhook Test*\nThis is a test message from Vibe DevSquad",
            parse_mode: "Markdown"
          };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(useAuth && authToken ? {
            'Authorization': `Bearer ${authToken}`
          } : {})
        },
        body: JSON.stringify(testPayload)
      });

      if (response.ok) {
        setTestResult({ success: true, message: "Webhook test successful!" });
        toast({
          title: "Test Successful",
          description: "Webhook is working correctly",
        });
      } else {
        setTestResult({ success: false, message: `HTTP ${response.status}: ${response.statusText}` });
        toast({
          title: "Test Failed",
          description: `Webhook test failed: ${response.statusText}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      setTestResult({ success: false, message: error instanceof Error ? error.message : "Unknown error" });
      toast({
        title: "Test Failed",
        description: "Failed to test webhook connection",
        variant: "destructive",
      });
    } finally {
      setIsTestingWebhook(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label>Test Webhook</Label>
          <p className="text-xs text-gray-500">Send a test message to verify configuration</p>
        </div>
        <Button
          onClick={handleTestWebhook}
          disabled={isTestingWebhook || !webhookUrl || !validateWebhookUrl(webhookUrl)}
          size="sm"
          className="flex items-center gap-1"
        >
          <TestTube className="w-4 h-4" />
          {isTestingWebhook ? "Testing..." : "Test Webhook"}
        </Button>
      </div>

      {testResult && (
        <Alert variant={testResult.success ? "default" : "destructive"}>
          {testResult.success ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <AlertTriangle className="w-4 h-4" />
          )}
          <AlertDescription>
            {testResult.message}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
