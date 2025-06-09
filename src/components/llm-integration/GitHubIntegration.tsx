
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, GitBranch, GitPullRequest, Settings, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface GitHubRepo {
  id: string;
  name: string;
  fullName: string;
  private: boolean;
  defaultBranch: string;
  lastUpdated: string;
}

interface GitHubIntegrationState {
  connected: boolean;
  user: string;
  repos: GitHubRepo[];
  selectedRepo: string;
  autoSync: boolean;
  syncBranch: string;
  webhookUrl: string;
}

const mockRepos: GitHubRepo[] = [
  {
    id: "1",
    name: "agent-workspace",
    fullName: "user/agent-workspace",
    private: true,
    defaultBranch: "main",
    lastUpdated: "2024-05-30T10:30:00Z"
  },
  {
    id: "2", 
    name: "llm-configs",
    fullName: "user/llm-configs",
    private: false,
    defaultBranch: "main",
    lastUpdated: "2024-05-29T15:45:00Z"
  }
];

export const GitHubIntegration = () => {
  const [integration, setIntegration] = useState<GitHubIntegrationState>({
    connected: false,
    user: "",
    repos: [],
    selectedRepo: "",
    autoSync: false,
    syncBranch: "main",
    webhookUrl: ""
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate OAuth flow
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIntegration(prev => ({
        ...prev,
        connected: true,
        user: "developer-user",
        repos: mockRepos
      }));
      
      toast({
        title: "GitHub Connected",
        description: "Successfully connected to GitHub account",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to GitHub. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIntegration({
      connected: false,
      user: "",
      repos: [],
      selectedRepo: "",
      autoSync: false,
      syncBranch: "main",
      webhookUrl: ""
    });
    
    toast({
      title: "GitHub Disconnected",
      description: "GitHub integration has been disabled",
    });
  };

  const handleRepoSelect = (repoId: string) => {
    const repo = integration.repos.find(r => r.id === repoId);
    setIntegration(prev => ({
      ...prev,
      selectedRepo: repoId,
      syncBranch: repo?.defaultBranch || "main"
    }));
  };

  const handleSyncSettings = () => {
    console.log("Saving sync settings:", {
      repo: integration.selectedRepo,
      branch: integration.syncBranch,
      autoSync: integration.autoSync
    });
    
    toast({
      title: "Settings Saved",
      description: "GitHub sync settings have been updated",
    });
  };

  const selectedRepo = integration.repos.find(r => r.id === integration.selectedRepo);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Github className="w-5 h-5" />
          <span>GitHub Integration</span>
          {integration.connected && (
            <Badge variant="default" className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Connected
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Sync LLM configurations and agent settings with GitHub repositories
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!integration.connected ? (
          <div className="text-center py-8">
            <Github className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Connect to GitHub</h3>
            <p className="text-muted-foreground mb-6">
              Connect your GitHub account to sync configurations and enable version control
            </p>
            <Button 
              onClick={handleConnect} 
              disabled={isConnecting}
              className="flex items-center space-x-2"
            >
              {isConnecting ? (
                <>
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Github className="w-4 h-4" />
                  <span>Connect GitHub</span>
                </>
              )}
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="repositories" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="repositories">Repositories</TabsTrigger>
              <TabsTrigger value="sync">Sync Settings</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            </TabsList>

            <TabsContent value="repositories" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Connected Account</h4>
                  <p className="text-sm text-muted-foreground">@{integration.user}</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleDisconnect}>
                  Disconnect
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Select Repository</Label>
                <Select value={integration.selectedRepo} onValueChange={handleRepoSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a repository" />
                  </SelectTrigger>
                  <SelectContent>
                    {integration.repos.map((repo) => (
                      <SelectItem key={repo.id} value={repo.id}>
                        <div className="flex items-center space-x-2">
                          <span>{repo.name}</span>
                          {repo.private && (
                            <Badge variant="secondary" className="text-xs">Private</Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedRepo && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">{selectedRepo.fullName}</h5>
                        <p className="text-sm text-muted-foreground">
                          Default branch: {selectedRepo.defaultBranch}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last updated: {new Date(selectedRepo.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`https://github.com/${selectedRepo.fullName}`, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="sync" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-sync configurations</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically sync changes to GitHub
                    </p>
                  </div>
                  <Switch
                    checked={integration.autoSync}
                    onCheckedChange={(checked) => 
                      setIntegration(prev => ({ ...prev, autoSync: checked }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Sync Branch</Label>
                  <Input
                    value={integration.syncBranch}
                    onChange={(e) => 
                      setIntegration(prev => ({ ...prev, syncBranch: e.target.value }))
                    }
                    placeholder="main"
                  />
                </div>

                <div className="pt-4">
                  <Button onClick={handleSyncSettings} className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Save Sync Settings
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="webhooks" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Webhook URL</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Configure GitHub webhooks to trigger sync events
                  </p>
                  <Input
                    value={integration.webhookUrl}
                    onChange={(e) => 
                      setIntegration(prev => ({ ...prev, webhookUrl: e.target.value }))
                    }
                    placeholder="https://your-webhook-endpoint.com/github"
                  />
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h5 className="font-medium mb-2">Webhook Events</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Push events</span>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pull request events</span>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Branch events</span>
                      <Badge variant="secondary">Disabled</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};
