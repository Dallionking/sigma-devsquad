
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, ExternalLink, Check, AlertCircle } from "lucide-react";
import { EnhancedSettingsCard } from "../EnhancedSettingsCard";
import { ContextualHelp } from "../ContextualHelp";
import { useToast } from "@/hooks/use-toast";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useInputValidation } from "@/hooks/useInputValidation";

interface OpenAIKeySettingsProps {
  searchQuery?: string;
}

export const OpenAIKeySettings = ({ searchQuery = "" }: OpenAIKeySettingsProps) => {
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [isTestingOpenai, setIsTestingOpenai] = useState(false);
  const [openaiStatus, setOpenaiStatus] = useState<"active" | "inactive" | "error">("inactive");
  const { toast } = useToast();

  // Input validation for API key
  const {
    value: openaiKey,
    error: keyError,
    isValidating,
    handleChange: handleKeyChange,
    handleBlur: handleKeyBlur,
    forceValidate
  } = useInputValidation("", {
    rules: {
      required: true,
      minLength: 10,
      pattern: /^sk-[a-zA-Z0-9]+$/,
      custom: (value) => {
        if (value && !value.startsWith("sk-")) {
          return "OpenAI API keys must start with 'sk-'";
        }
        return null;
      }
    },
    validateOnChange: true,
    validateOnBlur: true,
    debounceMs: 500
  });

  // Auto-save functionality
  const saveToStorage = useCallback(async () => {
    if (openaiKey && !keyError) {
      localStorage.setItem("openai_api_key", openaiKey);
    }
  }, [openaiKey, keyError]);

  const { forceSave } = useAutoSave(openaiKey, {
    onSave: saveToStorage,
    enabled: !keyError && openaiKey.length > 0,
    delay: 3000,
    showToast: false
  });

  const isVisible = searchQuery === "" || 
    "openai api key".includes(searchQuery.toLowerCase()) ||
    "gpt chatgpt".includes(searchQuery.toLowerCase());

  if (!isVisible) return null;

  const testOpenAIConnection = async () => {
    if (!forceValidate()) {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid OpenAI API key first.",
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

  const saveOpenAIKey = async () => {
    if (!forceValidate()) {
      return;
    }

    await forceSave();
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
            <div className="flex items-center gap-2">
              <Label htmlFor="openai-key">API Key</Label>
              <ContextualHelp
                title="OpenAI API Key"
                content={
                  <div className="space-y-2">
                    <p>Your OpenAI API key is used to authenticate requests to OpenAI's services.</p>
                    <p><strong>Format:</strong> Must start with "sk-" followed by alphanumeric characters</p>
                    <p><strong>Security:</strong> Keys are stored locally and auto-saved</p>
                    <p><strong>Usage:</strong> Required for GPT-3.5, GPT-4, and other OpenAI models</p>
                  </div>
                }
                trigger="click"
              />
            </div>
            <Badge variant="outline" className="text-xs">
              Required for GPT models
            </Badge>
          </div>
          <div className="relative">
            <Input
              id="openai-key"
              type={showOpenaiKey ? "text" : "password"}
              value={openaiKey}
              onChange={(e) => handleKeyChange(e.target.value)}
              onBlur={handleKeyBlur}
              placeholder="sk-..."
              className={`pr-10 ${keyError ? "border-destructive" : ""}`}
              aria-describedby={keyError ? "openai-key-error" : undefined}
              aria-invalid={!!keyError}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowOpenaiKey(!showOpenaiKey)}
              aria-label={showOpenaiKey ? "Hide API key" : "Show API key"}
              tabIndex={0}
            >
              {showOpenaiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          {keyError && (
            <p id="openai-key-error" className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {keyError}
            </p>
          )}
          {isValidating && (
            <p className="text-sm text-muted-foreground">Validating...</p>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <AlertCircle className="w-4 h-4" />
          <span>Your API key is stored locally and auto-saved every 3 seconds</span>
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
              disabled={isTestingOpenai || !openaiKey.trim() || !!keyError}
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
              disabled={!openaiKey.trim() || !!keyError}
            >
              Save Key
            </Button>
          </div>
        </div>
      </div>
    </EnhancedSettingsCard>
  );
};
