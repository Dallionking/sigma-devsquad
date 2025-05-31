
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Send, Settings, Bell, ExternalLink } from "lucide-react";

export const ExternalCommunicationIntegration = () => {
  const [telegramEnabled, setTelegramEnabled] = useState(false);
  const [discordEnabled, setDiscordEnabled] = useState(false);
  const [telegramBotToken, setTelegramBotToken] = useState("");
  const [discordWebhook, setDiscordWebhook] = useState("");
  const [notificationPreferences, setNotificationPreferences] = useState({
    taskAssignments: true,
    planningUpdates: true,
    agentResponses: false,
    systemAlerts: true
  });
  
  const { toast } = useToast();

  const handleTelegramTest = () => {
    if (!telegramBotToken) {
      toast({
        title: "Missing Token",
        description: "Please enter your Telegram bot token",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate test message
    toast({
      title: "Test Sent",
      description: "Test message sent to Telegram bot",
    });
  };

  const handleDiscordTest = () => {
    if (!discordWebhook) {
      toast({
        title: "Missing Webhook",
        description: "Please enter your Discord webhook URL",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate test message
    toast({
      title: "Test Sent",
      description: "Test message sent to Discord channel",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            External Communication Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Telegram Integration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <div>
                  <h3 className="font-medium">Telegram Bot</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive planning updates via Telegram
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={telegramEnabled ? "default" : "secondary"}>
                  {telegramEnabled ? "Connected" : "Disconnected"}
                </Badge>
                <Switch
                  checked={telegramEnabled}
                  onCheckedChange={setTelegramEnabled}
                />
              </div>
            </div>
            
            {telegramEnabled && (
              <div className="pl-8 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    placeholder="Bot Token"
                    value={telegramBotToken}
                    onChange={(e) => setTelegramBotToken(e.target.value)}
                    className="md:col-span-2"
                  />
                  <Button variant="outline" onClick={handleTelegramTest}>
                    <Send className="w-4 h-4 mr-2" />
                    Test
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Create a bot with @BotFather and paste the token here
                </p>
              </div>
            )}
          </div>

          {/* Discord Integration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-indigo-500" />
                <div>
                  <h3 className="font-medium">Discord Webhook</h3>
                  <p className="text-sm text-muted-foreground">
                    Send planning updates to Discord channel
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={discordEnabled ? "default" : "secondary"}>
                  {discordEnabled ? "Connected" : "Disconnected"}
                </Badge>
                <Switch
                  checked={discordEnabled}
                  onCheckedChange={setDiscordEnabled}
                />
              </div>
            </div>
            
            {discordEnabled && (
              <div className="pl-8 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    placeholder="Webhook URL"
                    value={discordWebhook}
                    onChange={(e) => setDiscordWebhook(e.target.value)}
                    className="md:col-span-2"
                  />
                  <Button variant="outline" onClick={handleDiscordTest}>
                    <Send className="w-4 h-4 mr-2" />
                    Test
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Create a webhook in your Discord server settings
                </p>
              </div>
            )}
          </div>

          {/* Notification Preferences */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              <h3 className="font-medium">Notification Preferences</h3>
            </div>
            
            <div className="pl-7 space-y-3">
              {Object.entries(notificationPreferences).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </span>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => 
                      setNotificationPreferences(prev => ({
                        ...prev,
                        [key]: checked
                      }))
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
