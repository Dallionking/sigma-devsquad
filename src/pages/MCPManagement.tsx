import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Package, 
  Search, 
  Download, 
  Settings, 
  Activity, 
  Shield, 
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  GitBranch,
  Monitor,
  ChevronRight
} from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { Agent, ViewMode } from "@/types";

// Mock data for MCP protocols
const availableMCPs = [
  {
    id: "mcp-git",
    name: "Git Protocol",
    description: "Provides Git repository management capabilities",
    version: "1.2.3",
    author: "Anthropic",
    downloads: 15420,
    rating: 4.8,
    category: "Development",
    status: "stable"
  },
  {
    id: "mcp-filesystem",
    name: "Filesystem Protocol", 
    description: "Safe filesystem operations with sandboxing",
    version: "2.1.0",
    author: "Anthropic",
    downloads: 8930,
    rating: 4.9,
    category: "System",
    status: "stable"
  },
  {
    id: "mcp-web-scraper",
    name: "Web Scraper",
    description: "Extract data from web pages with respect for robots.txt",
    version: "0.8.1",
    author: "Community",
    downloads: 3240,
    rating: 4.2,
    category: "Data",
    status: "beta"
  }
];

const installedMCPs = [
  {
    id: "mcp-git",
    name: "Git Protocol",
    version: "1.2.3",
    status: "active",
    lastUpdated: "2024-01-15",
    usage: "High",
    errors: 0
  },
  {
    id: "mcp-filesystem", 
    name: "Filesystem Protocol",
    version: "2.1.0",
    status: "active",
    lastUpdated: "2024-01-14",
    usage: "Medium",
    errors: 2
  }
];

const MCPManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Mock data for header
  const mockAgents: Agent[] = [];
  const mockViewMode: ViewMode = "workflow";

  const filteredMCPs = availableMCPs.filter(mcp => 
    mcp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "all" || mcp.category.toLowerCase() === selectedCategory)
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "error": return <AlertCircle className="w-4 h-4 text-red-600" />;
      case "updating": return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getUsageBadge = (usage: string) => {
    const config = {
      "High": "bg-red-50 text-red-700",
      "Medium": "bg-yellow-50 text-yellow-700", 
      "Low": "bg-green-50 text-green-700"
    };
    return config[usage as keyof typeof config] || "bg-slate-50 text-slate-700";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header 
        viewMode={mockViewMode} 
        onViewModeChange={() => {}} 
        agents={mockAgents} 
      />
      
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">MCP Installation & Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage Model Context Protocols for enhanced AI capabilities</p>
        </div>

        <Tabs defaultValue="marketplace" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="marketplace" className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span>Marketplace</span>
            </TabsTrigger>
            <TabsTrigger value="installed" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Installed</span>
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center space-x-2">
              <Monitor className="w-4 h-4" />
              <span>Monitoring</span>
            </TabsTrigger>
            <TabsTrigger value="dependencies" className="flex items-center space-x-2">
              <GitBranch className="w-4 h-4" />
              <span>Dependencies</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>MCP Registry</CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Search protocols..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-slate-200 rounded-md text-sm"
                    >
                      <option value="all">All Categories</option>
                      <option value="development">Development</option>
                      <option value="system">System</option>
                      <option value="data">Data</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {filteredMCPs.map((mcp) => (
                    <Card key={mcp.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-slate-900">{mcp.name}</h3>
                            <Badge variant="secondary">{mcp.category}</Badge>
                            <Badge 
                              variant={mcp.status === "stable" ? "default" : "secondary"}
                              className={mcp.status === "stable" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                            >
                              {mcp.status}
                            </Badge>
                          </div>
                          <p className="text-slate-600 mb-3">{mcp.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-slate-500">
                            <span>v{mcp.version}</span>
                            <span>by {mcp.author}</span>
                            <span>{mcp.downloads.toLocaleString()} downloads</span>
                            <span>⭐ {mcp.rating}</span>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Install
                          </Button>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="installed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Installed Protocols</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {installedMCPs.map((mcp) => (
                    <Card key={mcp.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {getStatusIcon(mcp.status)}
                          <div>
                            <h3 className="font-semibold text-slate-900">{mcp.name}</h3>
                            <p className="text-sm text-slate-600">Version {mcp.version}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant="secondary" className={getUsageBadge(mcp.usage)}>
                            {mcp.usage} Usage
                          </Badge>
                          {mcp.errors > 0 && (
                            <Badge variant="destructive">{mcp.errors} Errors</Badge>
                          )}
                          <span className="text-sm text-slate-500">Updated {mcp.lastUpdated}</span>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Settings className="w-4 h-4 mr-2" />
                              Configure
                            </Button>
                            <Button variant="outline" size="sm">
                              Test
                            </Button>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Active Protocols</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">2</div>
                  <p className="text-sm text-slate-600">Currently running</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">1,247</div>
                  <p className="text-sm text-slate-600">Last 24 hours</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">0.8%</div>
                  <p className="text-sm text-slate-600">Last 24 hours</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {installedMCPs.map((mcp) => (
                    <div key={mcp.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Activity className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{mcp.name}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <span>423 requests</span>
                        <span>0.2s avg response</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dependencies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dependency Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold">MCP Core Runtime</h3>
                      <p className="text-sm text-slate-600">Required by all protocols</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">v1.0.2</Badge>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Security Sandbox</h3>
                      <p className="text-sm text-slate-600">Required by filesystem and system protocols</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">v2.1.0</Badge>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                    <div>
                      <h3 className="font-semibold">Web Request Library</h3>
                      <p className="text-sm text-slate-600">Update available for web scraper protocol</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">v1.8.3 → v1.9.0</Badge>
                      <Button size="sm" variant="outline">Update</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MCPManagement;
