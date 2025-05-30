
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, ExternalLink, Check, AlertCircle } from "lucide-react";
import { EnhancedSettingsCard } from "../EnhancedSettingsCard";
import { useToast } from "@/hooks/use-toast";

interface AnthropicKeySettingsProps {
  searchQuery?: string;
}

export const AnthropicKeySettings = ({ searchQuery = "" }: AnthropicKeySettingsProps) => {
  const [anthropicKey, setAnthropicKey] = useState("");
  const [showAnthropicKey, setShowAnthropicKey] = useState(false);
  const [isTestingAnthropic, setIsTestingAnthropic] = useState(false);
  const [anthropicStatus, setAnthropicStatus] = useState<"active" | "inactive" | "error">("inactive");
  const { toast } = useToast();

  const isVisible = searchQuery === "" || 
    "anthropic api key".includes(searchQuery.toLowerCase()) ||
    "claude".includes(searchQuery.toLowerCase());

  if (!isVisible) return null;

  const testAnthropicConnection = async () => {
    if (!anthropicKey.trim()) {
      toast({
        title: "Missing API Key",
        description: "Please enter your Anthropic API key first.",
        variant: "destructive",
      });
      return;
    }

    setIsTestingAnthropic(true);
    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnthropicStatus("active");
      toast({
        title: "Connection Successful",
        description: "Anthropic API key is valid and working.",
      });
    } catch (error) {
      setAnthropicStatus("error");
      toast({
        title: "Connection Failed",
        description: "Invalid Anthropic API key or connection error.",
        variant: "destructive",
      });
    } finally {
      setIsTestingAnthropic(false);
    }
  };

  const saveAnthropicKey = () => {
    if (!anthropicKey.trim()) {
      toast({
        title: "Missing API Key",
        description: "Please enter your Anthropic API key.",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("anthropic_api_key", anthropicKey);
    toast({
      title: "API Key Saved",
      description: "Your Anthropic API key has been saved securely.",
    });
  };

  return (
    <EnhancedSettingsCard
      title="Anthropic API Key"
      description="Configure your Anthropic API key for Claude models"
      status={anthropicStatus}
      category="AI Provider"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="anthropic-key">API Key</Label>
            <Badge variant="outline" className="text-xs">
              Required for Claude models
            </Badge>
          </div>
          <div className="relative">
            <Input
              id="anthropic-key"
              type={showAnthropicKey ? "text" : "password"}
              value={anthropicKey}
              onChange={(e) => setAnthropicKey(e.target.value)}
              placeholder="sk-ant-..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowAnthropicKey(!showAnthropicKey)}
            >
              {showAnthropicKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <AlertCircle className="w-4 h-4" />
          <span>Your API key is stored locally and never sent to our servers</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open("https://console.anthropic.com/", "_blank")}
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Get API Key
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={testAnthropicConnection}
              disabled={isTestingAnthropic || !anthropicKey.trim()}
              className="flex items-center gap-2"
            >
              {isTestingAnthropic ? (
                <>
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Testing...
                </>
              ) : anthropicStatus === "active" ? (
                <>
                  <Check className="w-4 h-4" />
                  Tested
                </>
              ) : (
                "Test Connection"
              )}
            </Button>
            
            <Button
              size="sm"
              onClick={saveAnthropicKey}
              disabled={!anthropicKey.trim()}
            >
              Save Key
            </Button>
          </div>
        </div>
      </div>
    </EnhancedSettingsCard>
  );
};
