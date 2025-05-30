
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, FolderOpen, Terminal, Play, RefreshCcw, Code } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { ConnectionStatusTab } from "@/components/ide-integration/ConnectionStatusTab";
import { ConfigurationTab } from "@/components/ide-integration/ConfigurationTab";
import { FileExplorerTab } from "@/components/ide-integration/FileExplorerTab";
import { TerminalTab } from "@/components/ide-integration/TerminalTab";
import { ExecutionTab } from "@/components/ide-integration/ExecutionTab";
import { SyncTab } from "@/components/ide-integration/SyncTab";

export const IDEIntegration = () => {
  const [selectedIDE, setSelectedIDE] = useState("vscode");
  const [connectionStatus, setConnectionStatus] = useState("connected");

  // Mock data for header - in a real app this would come from props or context
  const mockAgents = [
    { 
      id: "1", 
      name: "Agent 1", 
      status: "working" as const,
      type: "frontend" as const,
      currentTask: "Developing new features",
      progress: 75,
      lastActive: new Date().toISOString()
    },
    { 
      id: "2", 
      name: "Agent 2", 
      status: "idle" as const,
      type: "qa" as const,
      currentTask: "Waiting for tasks",
      progress: 0,
      lastActive: new Date().toISOString()
    },
    { 
      id: "3", 
      name: "Agent 3", 
      status: "working" as const,
      type: "backend" as const,
      currentTask: "Code review",
      progress: 50,
      lastActive: new Date().toISOString()
    }
  ];

  const ides = [
    {
      name: "VS Code",
      id: "vscode",
      status: "connected",
      version: "1.85.0",
      extensions: ["React", "TypeScript", "Prettier"],
      lastSync: "2 minutes ago"
    },
    {
      name: "WebStorm",
      id: "webstorm",
      status: "disconnected",
      version: "2023.3",
      extensions: ["Node.js", "React", "Git"],
      lastSync: "Never"
    },
    {
      name: "Sublime Text",
      id: "sublime",
      status: "connected",
      version: "4.0",
      extensions: ["Package Control", "TypeScript"],
      lastSync: "5 minutes ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        viewMode="workflow" 
        onViewModeChange={() => {}} 
        agents={mockAgents} 
      />
      
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">IDE Integration</h1>
              <p className="text-muted-foreground mt-2">Manage connections to development environments</p>
            </div>
            <Badge variant="secondary" className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300">
              <Monitor className="w-3 h-3 mr-1" />
              {ides.filter(ide => ide.status === "connected").length} Connected
            </Badge>
          </div>

          <Tabs defaultValue="status" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="status" className="flex items-center space-x-2">
                <Monitor className="w-4 h-4" />
                <span>Status</span>
              </TabsTrigger>
              <TabsTrigger value="config" className="flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span>Config</span>
              </TabsTrigger>
              <TabsTrigger value="explorer" className="flex items-center space-x-2">
                <FolderOpen className="w-4 h-4" />
                <span>Explorer</span>
              </TabsTrigger>
              <TabsTrigger value="terminal" className="flex items-center space-x-2">
                <Terminal className="w-4 h-4" />
                <span>Terminal</span>
              </TabsTrigger>
              <TabsTrigger value="execution" className="flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Execute</span>
              </TabsTrigger>
              <TabsTrigger value="sync" className="flex items-center space-x-2">
                <RefreshCcw className="w-4 h-4" />
                <span>Sync</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="status">
              <ConnectionStatusTab 
                ides={ides}
                selectedIDE={selectedIDE}
                setSelectedIDE={setSelectedIDE}
              />
            </TabsContent>

            <TabsContent value="config">
              <ConfigurationTab 
                selectedIDE={selectedIDE}
                ides={ides}
              />
            </TabsContent>

            <TabsContent value="explorer">
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
                ides={ides}
                selectedIDE={selectedIDE}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default IDEIntegration;
