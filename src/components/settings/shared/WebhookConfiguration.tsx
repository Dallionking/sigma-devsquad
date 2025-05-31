
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { Webhook, Shield, TestTube, Clock, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { WebhookConfig } from "@/types/webhook";

interface WebhookConfigurationProps {
  config: WebhookConfig;
  onConfigChange: (config: WebhookConfig) => void;
  platform: 'discord' | 'telegram';
  isConnected: boolean;
}

export const WebhookConfiguration = ({
  config,
  onConfigChange,
  platform,
  isConnected
}: WebhookConfigurationProps) => {
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const { toast } = useToast();

  const handleConfigUpdate = (updates: Partial<WebhookConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

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
    if (!config.url || !validateWebhookUrl(config.url)) {
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

      const response = await fetch(config.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(config.useAuth && config.authToken ? {
            'Authorization': `Bearer ${config.authToken}`
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

  if (!isConnected) {
    return (
      <Card className="opacity-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Webhook className="w-5 h-5" />
            Webhook Configuration
            <Badge variant="outline" className="text-xs">Disabled</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="w-4 h-4" />
            <AlertDescription>
              Connect to {platform} first to configure webhook settings
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Webhook className="w-5 h-5" />
          Webhook Configuration
          <Badge variant={config.isEnabled ? "default" : "secondary"} className="text-xs">
            {config.isEnabled ? "Enabled" : "Disabled"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OptimizedStack gap="sm">
          {/* Enable/Disable Webhook */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="webhook-enabled">Enable Webhook</Label>
              <p className="text-xs text-gray-500">Use webhook for sending notifications</p>
            </div>
            <Switch
              id="webhook-enabled"
              checked={config.isEnabled}
              onCheckedChange={(checked) => handleConfigUpdate({ isEnabled: checked })}
            />
          </div>

          {config.isEnabled && (
            <>
              {/* Webhook URL */}
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  type="url"
                  placeholder={platform === 'discord' 
                    ? "https://discord.com/api/webhooks/..." 
                    : "https://api.telegram.org/bot..."}
                  value={config.url}
                  onChange={(e) => handleConfigUpdate({ url: e.target.value })}
                  className={!config.url || validateWebhookUrl(config.url) ? "" : "border-red-500"}
                />
                {config.url && !validateWebhookUrl(config.url) && (
                  <p className="text-xs text-red-500">
                    Invalid {platform} webhook URL format
                  </p>
                )}
              </div>

              {/* Retry Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="retry-attempts">Retry Attempts</Label>
                  <Select
                    value={config.retryAttempts.toString()}
                    onValueChange={(value) => handleConfigUpdate({ retryAttempts: parseInt(value) })}
                  >
                    <SelectTrigger id="retry-attempts">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No retries</SelectItem>
                      <SelectItem value="1">1 retry</SelectItem>
                      <SelectItem value="3">3 retries</SelectItem>
                      <SelectItem value="5">5 retries</SelectItem>
                      <SelectItem value="10">10 retries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeout">Timeout (seconds)</Label>
                  <Select
                    value={config.timeout.toString()}
                    onValueChange={(value) => handleConfigUpdate({ timeout: parseInt(value) })}
                  >
                    <SelectTrigger id="timeout">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">60 seconds</SelectItem>
                      <SelectItem value="120">120 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Authentication Configuration */}
              <div className="space-y-3 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <Label className="text-sm font-medium">Security Configuration</Label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="use-auth">Use Authentication</Label>
                    <p className="text-xs text-gray-500">Add authorization header to requests</p>
                  </div>
                  <Switch
                    id="use-auth"
                    checked={config.useAuth}
                    onCheckedChange={(checked) => handleConfigUpdate({ useAuth: checked })}
                  />
                </div>

                {config.useAuth && (
                  <div className="space-y-2">
                    <Label htmlFor="auth-token">Authentication Token</Label>
                    <Input
                      id="auth-token"
                      type="password"
                      placeholder="Enter your authentication token"
                      value={config.authToken}
                      onChange={(e) => handleConfigUpdate({ authToken: e.target.value })}
                    />
                    <p className="text-xs text-gray-500">
                      This token will be sent as a Bearer token in the Authorization header
                    </p>
                  </div>
                )}
              </div>

              {/* Test Webhook */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Test Webhook</Label>
                    <p className="text-xs text-gray-500">Send a test message to verify configuration</p>
                  </div>
                  <Button
                    onClick={handleTestWebhook}
                    disabled={isTestingWebhook || !config.url || !validateWebhookUrl(config.url)}
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
            </>
          )}
        </OptimizedStack>
      </CardContent>
    </Card>
  );
};
