
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Download, Settings, Activity, Search, Filter } from "lucide-react";

const MCPManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock MCP data
  const mcpPackages = [
    {
      id: "git-protocol",
      name: "Git Protocol",
      description: "Comprehensive Git repository management with branch operations, commits, and remote sync",
      version: "1.2.3",
      status: "installed",
      category: "development",
      downloads: 15420,
      rating: 4.8
    },
    {
      id: "database-connector",
      name: "Database Connector",
      description: "Multi-database support for MySQL, PostgreSQL, MongoDB with query optimization",
      version: "2.1.0",
      status: "available",
      category: "database",
      downloads: 8930,
      rating: 4.6
    },
    {
      id: "api-client",
      name: "API Client",
      description: "RESTful API client with authentication, rate limiting, and response caching",
      version: "1.5.2",
      status: "installed",
      category: "networking",
      downloads: 12340,
      rating: 4.7
    }
  ];

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "development", label: "Development" },
    { id: "database", label: "Database" },
    { id: "networking", label: "Networking" },
    { id: "ai", label: "AI & ML" }
  ];

  const filteredPackages = mcpPackages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || pkg.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">MCP Management</h1>
          <p className="text-muted-foreground">
            Install and manage Model Context Protocols for enhanced agent capabilities
          </p>
        </div>

        <Tabs defaultValue="marketplace" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="installed">Installed</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search MCPs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* MCP Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((mcp) => (
                <Card key={mcp.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Package className="w-8 h-8 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{mcp.name}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary">v{mcp.version}</Badge>
                            <Badge 
                              variant={mcp.status === "installed" ? "default" : "outline"}
                              className={mcp.status === "installed" ? "bg-green-100 text-green-800" : ""}
                            >
                              {mcp.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{mcp.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>{mcp.downloads.toLocaleString()} downloads</span>
                      <span>★ {mcp.rating}</span>
                    </div>

                    <div className="flex gap-2">
                      {mcp.status === "installed" ? (
                        <>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Settings className="w-4 h-4 mr-2" />
                            Configure
                          </Button>
                          <Button variant="destructive" size="sm">
                            Uninstall
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Install
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="installed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Installed MCPs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mcpPackages.filter(mcp => mcp.status === "installed").map((mcp) => (
                    <div key={mcp.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Package className="w-6 h-6 text-primary" />
                        <div>
                          <h3 className="font-medium">{mcp.name}</h3>
                          <p className="text-sm text-muted-foreground">Version {mcp.version}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">Update</Button>
                        <Button variant="destructive" size="sm">Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>MCP Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Configure individual MCP settings and global preferences.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Usage Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Monitor MCP usage, performance metrics, and resource consumption.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MCPManagement;
