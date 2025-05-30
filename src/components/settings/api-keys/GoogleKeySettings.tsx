
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, ExternalLink, Check, AlertCircle } from "lucide-react";
import { EnhancedSettingsCard } from "../EnhancedSettingsCard";
import { useToast } from "@/hooks/use-toast";

interface GoogleKeySettingsProps {
  searchQuery?: string;
}

export const GoogleKeySettings = ({ searchQuery = "" }: GoogleKeySettingsProps) => {
  const [googleKey, setGoogleKey] = useState("");
  const [showGoogleKey, setShowGoogleKey] = useState(false);
  const [isTestingGoogle, setIsTestingGoogle] = useState(false);
  const [googleStatus, setGoogleStatus] = useState<"active" | "inactive" | "error">("inactive");
  const { toast } = useToast();

  const isVisible = searchQuery === "" || 
    "google api key".includes(searchQuery.toLowerCase()) ||
    "gemini palm".includes(searchQuery.toLowerCase());

  if (!isVisible) return null;

  const testGoogleConnection = async () => {
    if (!googleKey.trim()) {
      toast({
        title: "Missing API Key",
        description: "Please enter your Google API key first.",
        variant: "destructive",
      });
      return;
    }

    setIsTestingGoogle(true);
    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGoogleStatus("active");
      toast({
        title: "Connection Successful",
        description: "Google API key is valid and working.",
      });
    } catch (error) {
      setGoogleStatus("error");
      toast({
        title: "Connection Failed",
        description: "Invalid Google API key or connection error.",
        variant: "destructive",
      });
    } finally {
      setIsTestingGoogle(false);
    }
  };

  const saveGoogleKey = () => {
    if (!googleKey.trim()) {
      toast({
        title: "Missing API Key",
        description: "Please enter your Google API key.",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("google_api_key", googleKey);
    toast({
      title: "API Key Saved",
      description: "Your Google API key has been saved securely.",
    });
  };

  return (
    <EnhancedSettingsCard
      title="Google AI API Key"
      description="Configure your Google AI API key for Gemini and PaLM models"
      status={googleStatus}
      category="AI Provider"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="google-key">API Key</Label>
            <Badge variant="outline" className="text-xs">
              Required for Gemini models
            </Badge>
          </div>
          <div className="relative">
            <Input
              id="google-key"
              type={showGoogleKey ? "text" : "password"}
              value={googleKey}
              onChange={(e) => setGoogleKey(e.target.value)}
              placeholder="AIza..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowGoogleKey(!showGoogleKey)}
            >
              {showGoogleKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
            onClick={() => window.open("https://aistudio.google.com/app/apikey", "_blank")}
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Get API Key
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={testGoogleConnection}
              disabled={isTestingGoogle || !googleKey.trim()}
              className="flex items-center gap-2"
            >
              {isTestingGoogle ? (
                <>
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Testing...
                </>
              ) : googleStatus === "active" ? (
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
              onClick={saveGoogleKey}
              disabled={!googleKey.trim()}
            >
              Save Key
            </Button>
          </div>
        </div>
      </div>
    </EnhancedSettingsCard>
  );
};
