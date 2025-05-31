
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTelegramIntegration } from "@/hooks/useTelegramIntegration";
import { useDiscordIntegration } from "@/hooks/useDiscordIntegration";
import { MessageSquare, Send, Settings, Bell, ExternalLink } from "lucide-react";

export const ExternalCommunicationIntegration = () => {
  const [telegramEnabled, setTelegramEnabled] = useState(false);
  const [discordEnabled, setDiscordEnabled] = useState(false);
  const [telegramBotToken, setTelegramBotToken] = useState("");
  const [telegramChatId, setTelegramChatId] = useState("");
  const [discordWebhook, setDiscordWebhook] = useState("");
  const [notificationPreferences, setNotificationPreferences] = useState({
    taskAssignments: true,
    planningUpdates: true,
    agentResponses: false,
    systemAlerts: true
  });
  
  const { toast } = useToast();
  const telegram = useTelegramIntegration();
  const discord = useDiscordIntegration();

  const handleTelegramTest = async () => {
    if (!telegramBotToken || !telegramChatId) {
      toast({
        title: "Missing Configuration",
        description: "Please enter both bot token and chat ID",
        variant: "destructive"
      });
      return;
    }
    
    // Configure and test
    telegram.configure({
      botToken: telegramBotToken,
      chatId: telegramChatId,
      isEnabled: true
    });
    
    const success = await telegram.sendTestMessage("Hello from Vibe DevSquad! 🚀");
    
    toast({
      title: success ? "Test Successful" : "Test Failed",
      description: success 
        ? "Test message sent to Telegram successfully" 
        : "Failed to send test message. Please check your configuration.",
      variant: success ? "default" : "destructive"
    });
  };

  const handleDiscordTest = async () => {
    if (!discordWebhook) {
      toast({
        title: "Missing Webhook",
        description: "Please enter your Discord webhook URL",
        variant: "destructive"
      });
      return;
    }
    
    // Configure and test
    discord.configure({
      webhookUrl: discordWebhook,
      isEnabled: true
    });
    
    const success = await discord.sendTestMessage("Hello from Vibe DevSquad! 🚀");
    
    toast({
      title: success ? "Test Successful" : "Test Failed",
      description: success 
        ? "Test message sent to Discord successfully" 
        : "Failed to send test message. Please check your webhook URL.",
      variant: success ? "default" : "destructive"
    });
  };

  const handleTelegramToggle = (enabled: boolean) => {
    setTelegramEnabled(enabled);
    if (enabled && telegramBotToken && telegramChatId) {
      telegram.configure({
        botToken: telegramBotToken,
        chatId: telegramChatId,
        isEnabled: true
      });
    }
  };

  const handleDiscordToggle = (enabled: boolean) => {
    setDiscordEnabled(enabled);
    if (enabled && discordWebhook) {
      discord.configure({
        webhookUrl: discordWebhook,
        isEnabled: true
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-[#3B82F6]/20 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm">
        <CardHeader className="border-b border-border/20 bg-gradient-to-r from-[#0A0E1A]/20 to-transparent">
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-[#3B82F6]" />
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
              External Communication Integration
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Telegram Integration */}
          <div className="space-y-4 p-4 rounded-xl border border-[#3B82F6]/20 bg-[#3B82F6]/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#3B82F6]/80 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#3B82F6]">Telegram Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive planning updates and notifications via Telegram
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={telegramEnabled ? "default" : "secondary"} 
                       className={telegramEnabled ? "bg-[#10B981] text-white" : ""}>
                  {telegramEnabled ? "Connected" : "Disconnected"}
                </Badge>
                <Switch
                  checked={telegramEnabled}
                  onCheckedChange={handleTelegramToggle}
                />
              </div>
            </div>
            
            {telegramEnabled && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    placeholder="Bot Token (from @BotFather)"
                    value={telegramBotToken}
                    onChange={(e) => setTelegramBotToken(e.target.value)}
                    type="password"
                    className="border-[#3B82F6]/30 focus:border-[#3B82F6]"
                  />
                  <Input
                    placeholder="Chat ID"
                    value={telegramChatId}
                    onChange={(e) => setTelegramChatId(e.target.value)}
                    className="border-[#3B82F6]/30 focus:border-[#3B82F6]"
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleTelegramTest}
                  className="w-full border-[#3B82F6]/30 hover:bg-[#3B82F6]/10 hover:border-[#3B82F6]"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Test Message
                </Button>
                <p className="text-xs text-muted-foreground">
                  Create a bot with @BotFather, get your chat ID from @userinfobot
                </p>
              </div>
            )}
          </div>

          {/* Discord Integration */}
          <div className="space-y-4 p-4 rounded-xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#8B5CF6]/80 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#8B5CF6]">Discord Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Send planning updates and alerts to Discord channels
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={discordEnabled ? "default" : "secondary"}
                       className={discordEnabled ? "bg-[#10B981] text-white" : ""}>
                  {discordEnabled ? "Connected" : "Disconnected"}
                </Badge>
                <Switch
                  checked={discordEnabled}
                  onCheckedChange={handleDiscordToggle}
                />
              </div>
            </div>
            
            {discordEnabled && (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Input
                    placeholder="Discord Webhook URL"
                    value={discordWebhook}
                    onChange={(e) => setDiscordWebhook(e.target.value)}
                    type="password"
                    className="flex-1 border-[#8B5CF6]/30 focus:border-[#8B5CF6]"
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleDiscordTest}
                    className="border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6]"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Test
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Create a webhook in your Discord server settings → Integrations
                </p>
              </div>
            )}
          </div>

          {/* Notification Preferences */}
          <div className="space-y-4 p-4 rounded-xl border border-border/20 bg-muted/5">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#10B981]" />
              <h3 className="font-semibold">Notification Preferences</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(notificationPreferences).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg border border-border/20">
                  <span className="text-sm font-medium capitalize">
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
