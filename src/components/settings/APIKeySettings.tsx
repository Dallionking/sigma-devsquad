import { useState } from "react";
import { SettingsSection } from "./SettingsSection";
import { SettingItem } from "./SettingItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Plus, Trash2, TestTube, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface APIKeySettingsProps {
  searchQuery?: string;
}

interface APIKeyEntry {
  id: string;
  provider: string;
  name: string;
  key: string;
  status: "active" | "inactive" | "testing";
  lastUsed?: string;
}

export const APIKeySettings = ({ searchQuery = "" }: APIKeySettingsProps) => {
  const { toast } = useToast();
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [autoRotateKeys, setAutoRotateKeys] = useState(false);
  const [keyExpiryWarning, setKeyExpiryWarning] = useState("7");
  const [encryptionLevel, setEncryptionLevel] = useState("aes-256");
  
  const [apiKeys, setApiKeys] = useState<APIKeyEntry[]>([
    {
      id: "1",
      provider: "OpenAI",
      name: "Production Key",
      key: "sk-proj-abc123...xyz789",
      status: "active",
      lastUsed: "2024-05-30T10:30:00Z"
    },
    {
      id: "2", 
      provider: "Anthropic",
      name: "Development Key",
      key: "ant-api-def456...uvw012",
      status: "inactive",
      lastUsed: "2024-05-29T15:45:00Z"
    }
  ]);

  const [newKey, setNewKey] = useState({
    provider: "",
    name: "",
    key: ""
  });

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const testAPIKey = async (keyId: string) => {
    const key = apiKeys.find(k => k.id === keyId);
    if (!key) return;

    setApiKeys(prev => prev.map(k => 
      k.id === keyId ? { ...k, status: "testing" } : k
    ));

    // Simulate API test
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      setApiKeys(prev => prev.map(k => 
        k.id === keyId ? { ...k, status: success ? "active" : "inactive" } : k
      ));
      
      toast({
        title: success ? "API Key Valid" : "API Key Invalid",
        description: success 
          ? `${key.provider} API key is working correctly.`
          : `${key.provider} API key failed validation.`,
        variant: success ? "default" : "destructive",
      });
    }, 2000);
  };

  const deleteAPIKey = (keyId: string) => {
    const key = apiKeys.find(k => k.id === keyId);
    setApiKeys(prev => prev.filter(k => k.id !== keyId));
    toast({
      title: "API Key Deleted",
      description: `${key?.provider} key "${key?.name}" has been removed.`,
      variant: "destructive",
    });
  };

  const addAPIKey = () => {
    if (!newKey.provider || !newKey.name || !newKey.key) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to add an API key.",
        variant: "destructive",
      });
      return;
    }

    const id = Date.now().toString();
    setApiKeys(prev => [...prev, {
      id,
      provider: newKey.provider,
      name: newKey.name,
      key: newKey.key,
      status: "inactive"
    }]);

    setNewKey({ provider: "", name: "", key: "" });
    
    toast({
      title: "API Key Added",
      description: `${newKey.provider} key "${newKey.name}" has been added successfully.`,
    });
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 8) + "..." + key.substring(key.length - 6);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "inactive":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "testing":
        return <TestTube className="w-4 h-4 text-yellow-500 animate-pulse" />;
      default:
        return null;
    }
  };

  const handleSave = () => {
    console.log("Saving API key settings:", {
      autoRotateKeys,
      keyExpiryWarning,
      encryptionLevel,
      apiKeys
    });
  };

  const handleReset = () => {
    setAutoRotateKeys(false);
    setKeyExpiryWarning("7");
    setEncryptionLevel("aes-256");
    setShowKeys({});
  };

  return (
    <SettingsSection
      title="API Key Management"
      description="Securely manage your LLM provider API keys and access tokens"
      onSave={handleSave}
      onReset={handleReset}
      searchQuery={searchQuery}
    >
      <div className="space-y-6">
        {/* Security Settings */}
        <div className="space-y-4">
          <SettingItem
            id="auto-rotate-keys"
            type="switch"
            label="Auto-rotate API Keys"
            description="Automatically rotate keys based on usage patterns"
            checked={autoRotateKeys}
            onCheckedChange={setAutoRotateKeys}
          />

          <SettingItem
            id="key-expiry-warning"
            type="select"
            label="Expiry Warning Period"
            description="Days before expiry to show warnings"
            value={keyExpiryWarning}
            onValueChange={setKeyExpiryWarning}
            options={[
              { value: "3", label: "3 days" },
              { value: "7", label: "7 days" },
              { value: "14", label: "14 days" },
              { value: "30", label: "30 days" }
            ]}
          />

          <SettingItem
            id="encryption-level"
            type="select"
            label="Encryption Level"
            description="Encryption standard for stored API keys"
            value={encryptionLevel}
            onValueChange={setEncryptionLevel}
            options={[
              { value: "aes-128", label: "AES-128" },
              { value: "aes-256", label: "AES-256" },
              { value: "aes-512", label: "AES-512" }
            ]}
          />
        </div>

        {/* Add New API Key */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New API Key
            </CardTitle>
            <CardDescription>
              Add a new LLM provider API key to your collection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <Input
                  id="provider"
                  placeholder="e.g., OpenAI, Anthropic"
                  value={newKey.provider}
                  onChange={(e) => setNewKey(prev => ({ ...prev, provider: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="key-name">Key Name</Label>
                <Input
                  id="key-name"
                  placeholder="e.g., Production Key"
                  value={newKey.name}
                  onChange={(e) => setNewKey(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your API key"
                  value={newKey.key}
                  onChange={(e) => setNewKey(prev => ({ ...prev, key: e.target.value }))}
                />
              </div>
            </div>
            <Button onClick={addAPIKey} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add API Key
            </Button>
          </CardContent>
        </Card>

        {/* Existing API Keys */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stored API Keys</CardTitle>
            <CardDescription>
              Manage your existing LLM provider API keys
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div 
                  key={apiKey.id} 
                  className="flex items-center justify-between p-4 border rounded-lg bg-muted/20"
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(apiKey.status)}
                    <div>
                      <div className="font-medium">
                        {apiKey.provider} - {apiKey.name}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>
                          {showKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          className="h-auto p-1"
                        >
                          {showKeys[apiKey.id] ? (
                            <EyeOff className="w-3 h-3" />
                          ) : (
                            <Eye className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                      {apiKey.lastUsed && (
                        <div className="text-xs text-muted-foreground">
                          Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testAPIKey(apiKey.id)}
                      disabled={apiKey.status === "testing"}
                      className="flex items-center gap-2"
                    >
                      <TestTube className="w-4 h-4" />
                      {apiKey.status === "testing" ? "Testing..." : "Test"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteAPIKey(apiKey.id)}
                      className="flex items-center gap-2 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
              
              {apiKeys.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No API keys configured. Add your first key above.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </SettingsSection>
  );
};
