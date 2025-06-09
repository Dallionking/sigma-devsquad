
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { Webhook, Shield, Info } from "lucide-react";
import { WebhookConfig } from "@/types/webhook";
import { WebhookUrlInput } from "./webhook/WebhookUrlInput";
import { WebhookTestSection } from "./webhook/WebhookTestSection";
import { Input } from "@/components/ui/input";

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
  const handleConfigUpdate = (updates: Partial<WebhookConfig>) => {
    onConfigChange({ ...config, ...updates });
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
              <WebhookUrlInput
                url={config.url}
                platform={platform}
                onUrlChange={(url) => handleConfigUpdate({ url })}
              />

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

              <WebhookTestSection
                webhookUrl={config.url}
                platform={platform}
                useAuth={config.useAuth}
                authToken={config.authToken}
              />
            </>
          )}
        </OptimizedStack>
      </CardContent>
    </Card>
  );
};
