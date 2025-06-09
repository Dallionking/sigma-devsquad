
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { MessageSquare, CheckCircle, Info, Hash, Server } from "lucide-react";

interface DiscordConnectionStatusProps {
  isConnected: boolean;
  onConnectionChange: (connected: boolean) => void;
  serverName: string;
  channelName: string;
  onServerNameChange: (name: string) => void;
  onChannelNameChange: (name: string) => void;
}

export const DiscordConnectionStatus = ({ 
  isConnected, 
  onConnectionChange,
  serverName,
  channelName,
  onServerNameChange,
  onChannelNameChange
}: DiscordConnectionStatusProps) => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!webhookUrl) {
      toast({
        title: "Missing Information",
        description: "Please provide a Discord webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onConnectionChange(true);
      toast({
        title: "Discord Connected",
        description: "Successfully connected to Discord webhook",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Discord. Please check your webhook URL.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    onConnectionChange(false);
    setWebhookUrl("");
    onServerNameChange("");
    onChannelNameChange("");
    toast({
      title: "Discord Disconnected",
      description: "Successfully disconnected from Discord",
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageSquare className="w-5 h-5 text-indigo-500" />
          Connection Status
          {isConnected && <Badge variant="secondary" className="bg-green-100 text-green-800">Connected</Badge>}
          {!isConnected && <Badge variant="secondary" className="bg-gray-100 text-gray-800">Disconnected</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OptimizedStack gap="sm">
          {!isConnected ? (
            <>
              <Alert>
                <Info className="w-4 h-4" />
                <AlertDescription>
                  To connect Discord, you'll need to create a webhook in your Discord server. 
                  <a 
                    href="https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    Learn how to create a Discord webhook
                  </a>
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    type="url"
                    placeholder="https://discord.com/api/webhooks/..."
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="bg-background"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="server-name">Server Name (Optional)</Label>
                    <div className="relative">
                      <Server className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        id="server-name"
                        placeholder="My Discord Server"
                        value={serverName}
                        onChange={(e) => onServerNameChange(e.target.value)}
                        className="bg-background pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="channel-name">Channel Name (Optional)</Label>
                    <div className="relative">
                      <Hash className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        id="channel-name"
                        placeholder="notifications"
                        value={channelName}
                        onChange={(e) => onChannelNameChange(e.target.value)}
                        className="bg-background pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleConnect}
                disabled={isConnecting || !webhookUrl}
                className="w-full md:w-auto"
              >
                {isConnecting ? "Connecting..." : "Connect to Discord"}
              </Button>
            </>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Connected to Discord</span>
                </div>
                <Button variant="outline" onClick={handleDisconnect}>
                  Disconnect
                </Button>
              </div>
              
              {(serverName || channelName) && (
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {serverName && (
                    <div className="flex items-center gap-1">
                      <Server className="w-4 h-4" />
                      <span>{serverName}</span>
                    </div>
                  )}
                  {channelName && (
                    <div className="flex items-center gap-1">
                      <Hash className="w-4 h-4" />
                      <span>{channelName}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </OptimizedStack>
      </CardContent>
    </Card>
  );
};
