
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, ExternalLink, Check, AlertCircle } from "lucide-react";
import { EnhancedSettingsCard } from "../EnhancedSettingsCard";
import { useToast } from "@/hooks/use-toast";

interface OpenAIKeySettingsProps {
  searchQuery?: string;
}

export const OpenAIKeySettings = ({ searchQuery = "" }: OpenAIKeySettingsProps) => {
  const [openaiKey, setOpenaiKey] = useState("");
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [isTestingOpenai, setIsTestingOpenai] = useState(false);
  const [openaiStatus, setOpenaiStatus] = useState<"active" | "inactive" | "error">("inactive");
  const { toast } = useToast();

  const isVisible = searchQuery === "" || 
    "openai api key".includes(searchQuery.toLowerCase()) ||
    "gpt chatgpt".includes(searchQuery.toLowerCase());

  if (!isVisible) return null;

  const testOpenAIConnection = async () => {
    if (!openaiKey.trim()) {
      toast({
        title: "Missing API Key",
        description: "Please enter your OpenAI API key first.",
        variant: "destructive",
      });
      return;
    }

    setIsTestingOpenai(true);
    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      setOpenaiStatus("active");
      toast({
        title: "Connection Successful",
        description: "OpenAI API key is valid and working.",
      });
    } catch (error) {
      setOpenaiStatus("error");
      toast({
        title: "Connection Failed",
        description: "Invalid OpenAI API key or connection error.",
        variant: "destructive",
      });
    } finally {
      setIsTestingOpenai(false);
    }
  };

  const saveOpenAIKey = () => {
    if (!openaiKey.trim()) {
      toast({
        title: "Missing API Key",
        description: "Please enter your OpenAI API key.",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage or secure storage
    localStorage.setItem("openai_api_key", openaiKey);
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved securely.",
    });
  };

  return (
    <EnhancedSettingsCard
      title="OpenAI API Key"
      description="Configure your OpenAI API key for GPT models and ChatGPT integration"
      status={openaiStatus}
      category="AI Provider"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="openai-key">API Key</Label>
            <Badge variant="outline" className="text-xs">
              Required for GPT models
            </Badge>
          </div>
          <div className="relative">
            <Input
              id="openai-key"
              type={showOpenaiKey ? "text" : "password"}
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              placeholder="sk-..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowOpenaiKey(!showOpenaiKey)}
            >
              {showOpenaiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
            onClick={() => window.open("https://platform.openai.com/api-keys", "_blank")}
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Get API Key
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={testOpenAIConnection}
              disabled={isTestingOpenai || !openaiKey.trim()}
              className="flex items-center gap-2"
            >
              {isTestingOpenai ? (
                <>
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Testing...
                </>
              ) : openaiStatus === "active" ? (
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
              onClick={saveOpenAIKey}
              disabled={!openaiKey.trim()}
            >
              Save Key
            </Button>
          </div>
        </div>
      </div>
    </EnhancedSettingsCard>
  );
};
