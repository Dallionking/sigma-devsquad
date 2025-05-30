
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
  XCircle
} from "lucide-react";

const IDEIntegration = () => {
  const [connectionStatus, setConnectionStatus] = useState("connected");
  const [syncStatus, setSyncStatus] = useState("synced");

  const connectionStatuses = {
    connected: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    connecting: { icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-50" },
    disconnected: { icon: XCircle, color: "text-red-600", bg: "bg-red-50" }
  };

  const StatusIcon = connectionStatuses[connectionStatus as keyof typeof connectionStatuses].icon;

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

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="files">File Explorer</TabsTrigger>
            <TabsTrigger value="terminal">Terminal</TabsTrigger>
            <TabsTrigger value="execution">Execution</TabsTrigger>
            <TabsTrigger value="sync">Sync</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Monitor className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold">Active</div>
                      <div className="text-sm text-muted-foreground">Connection</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <FolderOpen className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold">247</div>
                      <div className="text-sm text-muted-foreground">Files Synced</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-sm text-muted-foreground">Commands Run</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="text-2xl font-bold">2m ago</div>
                      <div className="text-sm text-muted-foreground">Last Sync</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "File synchronized", file: "src/components/Dashboard.tsx", time: "2 minutes ago" },
                    { action: "Command executed", file: "npm run build", time: "5 minutes ago" },
                    { action: "File created", file: "src/types/agent.ts", time: "8 minutes ago" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.file}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connection Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">IDE Type</label>
                    <select className="w-full p-2 border border-border rounded-md">
                      <option>VS Code</option>
                      <option>IntelliJ IDEA</option>
                      <option>WebStorm</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Port</label>
                    <Input type="number" defaultValue="3001" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Workspace Path</label>
                  <Input defaultValue="/home/user/projects/ai-workforce" />
                </div>
                <Button>Save Configuration</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5" />
                  File Explorer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Browse and manage files with real-time synchronization status
                </p>
                <div className="space-y-2">
                  {[
                    { name: "src/", type: "folder", status: "synced" },
                    { name: "components/", type: "folder", status: "synced" },
                    { name: "Dashboard.tsx", type: "file", status: "modified" },
                    { name: "AgentCard.tsx", type: "file", status: "synced" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded">
                      <span>{item.name}</span>
                      <Badge variant={item.status === "synced" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terminal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  Terminal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div>$ npm run dev</div>
                  <div>Starting development server...</div>
                  <div>Server running on http://localhost:3000</div>
                  <div className="text-white">$ <span className="animate-pulse">|</span></div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="execution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Code Execution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Execute code and view output directly from the integrated environment
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sync" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Synchronization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Auto-sync enabled</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <Button>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Force Sync Now
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IDEIntegration;
