
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, Download, CheckCircle, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const InstallationGuideTab = () => {
  const { toast } = useToast();
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(label);
    toast({
      title: "Copied to clipboard",
      description: `${label} command copied successfully`,
    });
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const CommandBlock = ({ command, label }: { command: string; label: string }) => (
    <div className="relative bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-xs">{label}</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => copyToClipboard(command, label)}
          className="h-6 px-2 text-gray-400 hover:text-white"
        >
          {copiedCommand === label ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </Button>
      </div>
      <code className="text-green-400">{command}</code>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Terminal className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="text-card-foreground">IDE Integration Setup</CardTitle>
              <CardDescription className="text-muted-foreground">
                Complete installation guide for connecting your IDE to Lovable
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">1</span>
              </div>
              <div>
                <p className="font-medium text-card-foreground">Install Extension</p>
                <p className="text-xs text-muted-foreground">Add Lovable extension</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 dark:text-yellow-400 font-semibold text-sm">2</span>
              </div>
              <div>
                <p className="font-medium text-card-foreground">Setup Bridge</p>
                <p className="text-xs text-muted-foreground">Install bridge app</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 font-semibold text-sm">3</span>
              </div>
              <div>
                <p className="font-medium text-card-foreground">Connect & Test</p>
                <p className="text-xs text-muted-foreground">Verify connection</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* IDE-Specific Instructions */}
      <Tabs defaultValue="vscode" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="vscode">VS Code</TabsTrigger>
            <TabsTrigger value="cursor">Cursor</TabsTrigger>
            <TabsTrigger value="windsurf">Windsurf</TabsTrigger>
          </TabsList>
          <Badge variant="outline" className="text-xs">
            All platforms supported
          </Badge>
        </div>

        <TabsContent value="vscode" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                VS Code Installation
                <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">Recommended</Badge>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Install the Lovable extension for Visual Studio Code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-card-foreground">Method 1: VS Code Marketplace</h4>
                <div className="flex gap-2">
                  <Button className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Open in Marketplace
                  </Button>
                  <Button variant="outline">
                    Search "Lovable" in Extensions
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-card-foreground">Method 2: Command Line</h4>
                <CommandBlock 
                  command="code --install-extension lovable.lovable-vscode"
                  label="VS Code Extension Install"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cursor" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Cursor Installation</CardTitle>
              <CardDescription className="text-muted-foreground">
                Install the Lovable extension for Cursor AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-card-foreground">Extension Installation</h4>
                <CommandBlock 
                  command="cursor --install-extension lovable.lovable-cursor"
                  label="Cursor Extension Install"
                />
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Note:</strong> Cursor uses VS Code extension compatibility, so some VS Code extensions may work directly.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="windsurf" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Windsurf Installation</CardTitle>
              <CardDescription className="text-muted-foreground">
                Install the Lovable extension for Windsurf IDE
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-card-foreground">Extension Installation</h4>
                <CommandBlock 
                  command="windsurf --install-extension lovable.lovable-windsurf"
                  label="Windsurf Extension Install"
                />
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-card-foreground">Alternative: Manual Installation</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download VSIX File
                  </Button>
                  <CommandBlock 
                    command="windsurf --install-extension lovable-windsurf.vsix"
                    label="Manual VSIX Install"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bridge Application Setup */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Bridge Application Setup</CardTitle>
          <CardDescription className="text-muted-foreground">
            Install the local bridge application for secure IDE communication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-card-foreground">macOS / Linux</h4>
              <CommandBlock 
                command="curl -fsSL https://install.lovable.dev | sh"
                label="Unix Install Script"
              />
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-card-foreground">Windows</h4>
              <CommandBlock 
                command="iwr -useb https://install.lovable.dev/windows | iex"
                label="Windows Install Script"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-card-foreground">Verify Installation</h4>
            <CommandBlock 
              command="lovable --version"
              label="Version Check"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
