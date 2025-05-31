
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { Link2, Send, Shield, CheckCircle, AlertTriangle } from "lucide-react";

interface WebhookConfig {
  url: string;
  isEnabled: boolean;
  retryAttempts: number;
  timeout: number;
  useAuth: boolean;
  authToken?: string;
}

interface WebhookConfigurationProps {
  platform: 'discord' | 'telegram';
  config: WebhookConfig;
  onConfigChange: (config: WebhookConfig) => void;
}

export const WebhookConfiguration = ({
  platform,
  config,
  onConfigChange
}: WebhookConfigurationProps) => {
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [lastTestResult, setLastTestResult] = useState<'success' | 'error' | null>(null);
  const { toast } = useToast();

  const handleConfigChange = (updates: Partial<WebhookConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  const validateWebhookUrl = (url: string): boolean => {
    if (platform === 'discord') {
      return url.includes('discord.com/api/webhooks/');
    }
    if (platform === 'telegram') {
      return url.includes('api.telegram.org/bot');
    }
    return false;
  };

  const testWebhook = async () => {
    if (!config.url) {
      toast({
        title: "Missing URL",
        description: "Please enter a webhook URL first",
        variant: "destructive",
      });
      return;
    }

    if (!validateWebhookUrl(config.url)) {
      toast({
        title: "Invalid URL",
        description: `Please enter a valid ${platform} webhook URL`,
        variant: "destructive",
      });
      return;
    }

    setIsTestingWebhook(true);
    setLastTestResult(null);

    try {
      // Simulate webhook test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure for demo
      const success = Math.random() > 0.3;
      
      if (success) {
        setLastTestResult('success');
        toast({
          title: "Webhook Test Successful",
          description: `Test message sent to ${platform} successfully`,
        });
      } else {
        setLastTestResult('error');
        toast({
          title: "Webhook Test Failed",
          description: `Failed to send test message to ${platform}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      setLastTestResult('error');
      toast({
        title: "Test Error",
        description: "An error occurred while testing the webhook",
        variant: "destructive",
      });
    } finally {
      setIsTestingWebhook(false);
    }
  };

  const isUrlValid = config.url ? validateWebhookUrl(config.url) : null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Link2 className="w-5 h-5" />
          Webhook Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OptimizedStack gap="sm">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <div className="relative">
              <Input
                id="webhook-url"
                type="url"
                placeholder={`Enter your ${platform} webhook URL`}
                value={config.url}
                onChange={(e) => handleConfigChange({ url: e.target.value })}
                className={`pr-10 ${
                  isUrlValid === false ? 'border-red-500 focus:border-red-500' :
                  isUrlValid === true ? 'border-green-500 focus:border-green-500' : ''
                }`}
              />
              {isUrlValid !== null && (
                <div className="absolute right-3 top-3">
                  {isUrlValid ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {config.url && !isUrlValid && (
              <p className="text-xs text-red-600">
                Invalid {platform} webhook URL format
              </p>
            )}
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label className="text-sm font-medium">Enable Webhook</Label>
              <p className="text-xs text-muted-foreground">
                Enable or disable webhook notifications
              </p>
            </div>
            <Switch
              checked={config.isEnabled}
              onCheckedChange={(checked) => handleConfigChange({ isEnabled: checked })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="retry-attempts">Retry Attempts</Label>
              <Input
                id="retry-attempts"
                type="number"
                min="0"
                max="5"
                value={config.retryAttempts}
                onChange={(e) => handleConfigChange({ retryAttempts: parseInt(e.target.value) || 0 })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeout">Timeout (seconds)</Label>
              <Input
                id="timeout"
                type="number"
                min="1"
                max="30"
                value={config.timeout}
                onChange={(e) => handleConfigChange({ timeout: parseInt(e.target.value) || 5 })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <div>
                <Label className="text-sm font-medium">Authentication</Label>
                <p className="text-xs text-muted-foreground">
                  Use authentication token for webhook
                </p>
              </div>
            </div>
            <Switch
              checked={config.useAuth}
              onCheckedChange={(checked) => handleConfigChange({ useAuth: checked })}
            />
          </div>

          {config.useAuth && (
            <div className="space-y-2">
              <Label htmlFor="auth-token">Authentication Token</Label>
              <Input
                id="auth-token"
                type="password"
                placeholder="Enter authentication token"
                value={config.authToken || ''}
                onChange={(e) => handleConfigChange({ authToken: e.target.value })}
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              {lastTestResult === 'success' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Last test: Success
                </Badge>
              )}
              {lastTestResult === 'error' && (
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  Last test: Failed
                </Badge>
              )}
            </div>
            
            <Button
              onClick={testWebhook}
              disabled={isTestingWebhook || !config.url || !isUrlValid}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Send className="w-4 h-4" />
              {isTestingWebhook ? "Testing..." : "Test Webhook"}
            </Button>
          </div>

          {platform === 'discord' && (
            <Alert>
              <AlertDescription>
                Create a webhook in your Discord server: Server Settings → Integrations → Webhooks
              </AlertDescription>
            </Alert>
          )}

          {platform === 'telegram' && (
            <Alert>
              <AlertDescription>
                Get your bot token from @BotFather and chat ID from @userinfobot
              </AlertDescription>
            </Alert>
          )}
        </OptimizedStack>
      </CardContent>
    </Card>
  );
};
