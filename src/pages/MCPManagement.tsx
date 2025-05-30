
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Download, Settings, Activity } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { MCPInstallationWizard } from "@/components/mcp/MCPInstallationWizard";
import { Agent } from "@/types";

const MCPManagement = () => {
  const [showInstallWizard, setShowInstallWizard] = useState(false);

  // Mock agents data for header
  const mockAgents: Agent[] = [
    { 
      id: "1", 
      type: "planning", 
      name: "Planning Agent", 
      status: "working", 
      currentTask: "Active", 
      progress: 75, 
      lastActive: "2024-05-30T10:30:00Z",
      capabilities: ["requirement-analysis", "project-planning"],
      specialization: "Project Planning",
      background: "Expert in project planning and requirements analysis",
      description: "Analyzes requirements and creates project roadmaps"
    },
    { 
      id: "2", 
      type: "frontend", 
      name: "Frontend Agent", 
      status: "idle", 
      currentTask: "Idle", 
      progress: 0, 
      lastActive: "2024-05-30T10:25:00Z",
      capabilities: ["react-development", "ui-design"],
      specialization: "Frontend Development",
      background: "Expert in React and modern frontend technologies",
      description: "Builds user interfaces and client-side functionality"
    }
  ];

  const mockMCPPackages = [
    {
      id: "filesystem",
      name: "Filesystem MCP",
      description: "Provides file system access capabilities",
      status: "installed",
      version: "1.0.0",
      dependencies: [],
      permissions: ["file:read", "file:write"]
    },
    {
      id: "database",
      name: "Database MCP", 
      description: "Database connection and query capabilities",
      status: "available",
      version: "1.2.0",
      dependencies: ["sqlite3"],
      permissions: ["db:read", "db:write"]
    }
  ];

  const handleInstall = (packageData: any) => {
    console.log("Installing MCP package:", packageData);
    setShowInstallWizard(false);
  };

  const handleCancel = () => {
    setShowInstallWizard(false);
  };

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
              <h1 className="text-3xl font-bold text-foreground">MCP Management</h1>
              <p className="text-muted-foreground mt-2">Manage Model Context Protocol packages and extensions</p>
            </div>
            <Badge variant="secondary" className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300">
              <Activity className="w-3 h-3 mr-1" />
              2 Packages Active
            </Badge>
          </div>

          <Tabs defaultValue="packages" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="packages" className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Packages</span>
              </TabsTrigger>
              <TabsTrigger value="install" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Install</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="packages">
              <div className="grid gap-4">
                {mockMCPPackages.map((pkg) => (
                  <div key={pkg.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{pkg.name}</h3>
                        <p className="text-sm text-muted-foreground">{pkg.description}</p>
                      </div>
                      <Badge variant={pkg.status === "installed" ? "default" : "secondary"}>
                        {pkg.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="install">
              <div className="space-y-4">
                <Button onClick={() => setShowInstallWizard(true)}>
                  Install New Package
                </Button>
                {showInstallWizard && (
                  <MCPInstallationWizard
                    mcpPackage={mockMCPPackages[0]}
                    onInstall={handleInstall}
                    onCancel={handleCancel}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">MCP Configuration</h3>
                <p className="text-muted-foreground">Configure global MCP settings and preferences.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MCPManagement;
