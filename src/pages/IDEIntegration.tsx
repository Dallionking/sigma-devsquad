
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Monitor, 
  Settings, 
  FolderOpen, 
  Terminal, 
  Play, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  XCircle,
  Workflow
} from "lucide-react";
import { ConnectionStatusTab } from "@/components/ide-integration/ConnectionStatusTab";
import { ConfigurationTab } from "@/components/ide-integration/ConfigurationTab";
import { FileExplorerTab } from "@/components/ide-integration/FileExplorerTab";
import { TerminalTab } from "@/components/ide-integration/TerminalTab";
import { ExecutionTab } from "@/components/ide-integration/ExecutionTab";
import { SyncTab } from "@/components/ide-integration/SyncTab";
import { IDEIntegrationFlow } from "@/components/ide-integration/IDEIntegrationFlow";

const IDEIntegration = () => {
  const [connectionStatus, setConnectionStatus] = useState("connected");
  const [selectedIDE, setSelectedIDE] = useState("vscode");

  const connectionStatuses = {
    connected: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    connecting: { icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-50" },
    disconnected: { icon: XCircle, color: "text-red-600", bg: "bg-red-50" }
  };

  const StatusIcon = connectionStatuses[connectionStatus as keyof typeof connectionStatuses].icon;

  const mockIDEs = [
    {
      id: "vscode",
      name: "VS Code",
      status: "connected",
      version: "1.85.0",
      extensions: ["Lovable", "TypeScript", "React"],
      lastSync: "2 minutes ago"
    },
    {
      id: "webstorm",
      name: "WebStorm",
      status: "disconnected",
      version: "2023.3",
      extensions: ["Lovable Plugin"],
      lastSync: "1 hour ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">IDE Integration</h1>
          <p className="text-muted-foreground">
            Connect and synchronize with your development environment
          </p>
        </div>

        {/* Connection Status Banner */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${connectionStatuses[connectionStatus as keyof typeof connectionStatuses].bg}`}>
                  <StatusIcon className={`w-6 h-6 ${connectionStatuses[connectionStatus as keyof typeof connectionStatuses].color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">VS Code Integration</h3>
                  <p className="text-muted-foreground">
                    Status: <span className="capitalize font-medium">{connectionStatus}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={connectionStatus === "connected" ? "default" : "secondary"}>
                  {connectionStatus === "connected" ? "Active" : "Inactive"}
                </Badge>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="flow" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="flow">Flow</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="terminal">Terminal</TabsTrigger>
            <TabsTrigger value="execution">Execution</TabsTrigger>
            <TabsTrigger value="sync">Sync</TabsTrigger>
          </TabsList>

          <TabsContent value="flow">
            <IDEIntegrationFlow />
          </TabsContent>

          <TabsContent value="status">
            <ConnectionStatusTab 
              ides={mockIDEs}
              selectedIDE={selectedIDE}
              setSelectedIDE={setSelectedIDE}
            />
          </TabsContent>

          <TabsContent value="configuration">
            <ConfigurationTab 
              selectedIDE={selectedIDE}
              ides={mockIDEs}
            />
          </TabsContent>

          <TabsContent value="files">
            <FileExplorerTab />
          </TabsContent>

          <TabsContent value="terminal">
            <TerminalTab />
          </TabsContent>

          <TabsContent value="execution">
            <ExecutionTab />
          </TabsContent>

          <TabsContent value="sync">
            <SyncTab 
              ides={mockIDEs}
              selectedIDE={selectedIDE}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IDEIntegration;
