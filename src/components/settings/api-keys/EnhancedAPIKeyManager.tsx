
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Shield, Key, Users, AlertTriangle, Check, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface APIKey {
  id: string;
  name: string;
  provider: string;
  masked: string;
  status: "active" | "inactive" | "expired";
  permissions: string[];
  teamAccess: string[];
  lastUsed: string;
  expiresAt?: string;
  monthlyUsage: number;
  monthlyLimit: number;
}

interface Team {
  id: string;
  name: string;
  type: string;
}

const mockAPIKeys: APIKey[] = [
  {
    id: "1",
    name: "Production OpenAI",
    provider: "OpenAI",
    masked: "sk-...abc123",
    status: "active",
    permissions: ["gpt-4", "gpt-4o", "embeddings"],
    teamAccess: ["frontend", "backend"],
    lastUsed: "2024-05-30T10:30:00Z",
    expiresAt: "2024-12-31T23:59:59Z",
    monthlyUsage: 145.60,
    monthlyLimit: 500
  },
  {
    id: "2",
    name: "Development Anthropic",
    provider: "Anthropic",
    masked: "sk-ant-...xyz789",
    status: "active",
    permissions: ["claude-3-opus", "claude-3-sonnet"],
    teamAccess: ["planning", "qa"],
    lastUsed: "2024-05-29T14:20:00Z",
    monthlyUsage: 67.30,
    monthlyLimit: 200
  }
];

const mockTeams: Team[] = [
  { id: "frontend", name: "Frontend Team", type: "frontend" },
  { id: "backend", name: "Backend Team", type: "backend" },
  { id: "planning", name: "Planning Team", type: "planning" },
  { id: "qa", name: "QA Team", type: "qa" }
];

export const EnhancedAPIKeyManager = () => {
  const [apiKeys, setAPIKeys] = useState<APIKey[]>(mockAPIKeys);
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});
  const [selectedProvider, setSelectedProvider] = useState("OpenAI");
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyValue, setNewKeyValue] = useState("");
  const { toast } = useToast();

  const toggleShowKey = (keyId: string) => {
    setShowValues(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const handleAddKey = () => {
    if (!newKeyName.trim() || !newKeyValue.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both a name and API key value.",
        variant: "destructive",
      });
      return;
    }

    const newKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyName,
      provider: selectedProvider,
      masked: `${newKeyValue.substring(0, 8)}...${newKeyValue.slice(-6)}`,
      status: "active",
      permissions: [],
      teamAccess: [],
      lastUsed: new Date().toISOString(),
      monthlyUsage: 0,
      monthlyLimit: 100
    };

    setAPIKeys(prev => [...prev, newKey]);
    setNewKeyName("");
    setNewKeyValue("");
    
    toast({
      title: "API Key Added",
      description: `Successfully added ${newKeyName} for ${selectedProvider}`,
    });
  };

  const handleDeleteKey = (keyId: string) => {
    setAPIKeys(prev => prev.filter(key => key.id !== keyId));
    toast({
      title: "API Key Deleted",
      description: "API key has been removed from the system",
    });
  };

  const handleTeamAccessChange = (keyId: string, teamId: string, hasAccess: boolean) => {
    setAPIKeys(prev => prev.map(key => {
      if (key.id === keyId) {
        const teamAccess = hasAccess 
          ? [...key.teamAccess.filter(t => t !== teamId), teamId]
          : key.teamAccess.filter(t => t !== teamId);
        return { ...key, teamAccess };
      }
      return key;
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "API key copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>Enhanced API Key Management</span>
          </CardTitle>
          <CardDescription>
            Manage API keys with role-based access, usage tracking, and security controls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="keys" className="space-y-4">
            <TabsList>
              <TabsTrigger value="keys">API Keys</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
              <TabsTrigger value="add">Add New Key</TabsTrigger>
            </TabsList>

            <TabsContent value="keys" className="space-y-4">
              {apiKeys.map((key) => (
                <Card key={key.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{key.name}</h4>
                          <Badge variant="outline">{key.provider}</Badge>
                          <Badge 
                            variant={key.status === "active" ? "default" : "secondary"}
                            className={key.status === "active" ? "bg-green-100 text-green-800" : ""}
                          >
                            {key.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <Input
                            type={showValues[key.id] ? "text" : "password"}
                            value={showValues[key.id] ? `sk-...${key.id}` : key.masked}
                            readOnly
                            className="font-mono text-sm flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleShowKey(key.id)}
                          >
                            {showValues[key.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(key.masked)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Usage: ${key.monthlyUsage.toFixed(2)} / ${key.monthlyLimit}</span>
                          <span>Last used: {new Date(key.lastUsed).toLocaleDateString()}</span>
                          {key.teamAccess.length > 0 && (
                            <span>Teams: {key.teamAccess.join(", ")}</span>
                          )}
                        </div>

                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(key.monthlyUsage / key.monthlyLimit) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteKey(key.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4">
              {apiKeys.map((key) => (
                <Card key={key.id}>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>{key.name} - Team Access</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockTeams.map((team) => (
                        <div key={team.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{team.name}</div>
                              <div className="text-sm text-muted-foreground">{team.type}</div>
                            </div>
                          </div>
                          <Switch
                            checked={key.teamAccess.includes(team.id)}
                            onCheckedChange={(checked) => handleTeamAccessChange(key.id, team.id, checked)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="usage" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">High Usage Alert</p>
                        <p className="text-lg font-bold">2 Keys</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Active Keys</p>
                        <p className="text-lg font-bold">{apiKeys.filter(k => k.status === "active").length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Key className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Keys</p>
                        <p className="text-lg font-bold">{apiKeys.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="add" className="space-y-4">
              <div className="max-w-md space-y-4">
                <div className="space-y-2">
                  <Label>Provider</Label>
                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OpenAI">OpenAI</SelectItem>
                      <SelectItem value="Anthropic">Anthropic</SelectItem>
                      <SelectItem value="Google">Google AI</SelectItem>
                      <SelectItem value="Cohere">Cohere</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Key Name</Label>
                  <Input
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g., Production OpenAI Key"
                  />
                </div>

                <div className="space-y-2">
                  <Label>API Key</Label>
                  <Input
                    type="password"
                    value={newKeyValue}
                    onChange={(e) => setNewKeyValue(e.target.value)}
                    placeholder="Enter your API key"
                  />
                </div>

                <Button onClick={handleAddKey} className="w-full">
                  Add API Key
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
