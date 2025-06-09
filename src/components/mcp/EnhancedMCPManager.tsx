
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Shield, Users, Settings, Download, Search, Filter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface MCPPackage {
  id: string;
  name: string;
  description: string;
  version: string;
  status: "installed" | "available" | "updating";
  permissions: string[];
  dependencies: string[];
  teamAccess: string[];
  lastUpdated: string;
  size: string;
  category: string;
}

interface Team {
  id: string;
  name: string;
  type: string;
}

const mockMCPPackages: MCPPackage[] = [
  {
    id: "mcp-filesystem",
    name: "Filesystem MCP",
    description: "Secure filesystem operations with sandboxing",
    version: "2.1.0",
    status: "installed",
    permissions: ["file:read", "file:write", "file:delete"],
    dependencies: [],
    teamAccess: ["frontend", "backend"],
    lastUpdated: "2024-05-25",
    size: "2.4 MB",
    category: "System"
  },
  {
    id: "mcp-git",
    name: "Git Protocol",
    description: "Git repository management and operations",
    version: "1.3.2",
    status: "installed",
    permissions: ["git:read", "git:write", "git:branch"],
    dependencies: ["git"],
    teamAccess: ["devops", "backend"],
    lastUpdated: "2024-05-28",
    size: "1.8 MB",
    category: "Development"
  },
  {
    id: "mcp-database",
    name: "Database MCP",
    description: "Database connections and query operations",
    version: "1.5.0",
    status: "available",
    permissions: ["db:read", "db:write", "db:schema"],
    dependencies: ["postgresql", "sqlite3"],
    teamAccess: [],
    lastUpdated: "2024-05-30",
    size: "3.1 MB",
    category: "Data"
  }
];

const mockTeams: Team[] = [
  { id: "frontend", name: "Frontend Team", type: "frontend" },
  { id: "backend", name: "Backend Team", type: "backend" },
  { id: "devops", name: "DevOps Team", type: "devops" },
  { id: "qa", name: "QA Team", type: "qa" }
];

export const EnhancedMCPManager = () => {
  const [packages, setPackages] = useState<MCPPackage[]>(mockMCPPackages);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || pkg.category.toLowerCase() === categoryFilter;
    const matchesStatus = statusFilter === "all" || pkg.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleInstall = (packageId: string) => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === packageId ? { ...pkg, status: "updating" as const } : pkg
    ));

    setTimeout(() => {
      setPackages(prev => prev.map(pkg => 
        pkg.id === packageId ? { ...pkg, status: "installed" as const } : pkg
      ));
      toast({
        title: "Package Installed",
        description: `Successfully installed ${packages.find(p => p.id === packageId)?.name}`,
      });
    }, 2000);
  };

  const handleUninstall = (packageId: string) => {
    const pkg = packages.find(p => p.id === packageId);
    setPackages(prev => prev.map(p => 
      p.id === packageId ? { ...p, status: "available" as const, teamAccess: [] } : p
    ));
    toast({
      title: "Package Uninstalled",
      description: `Uninstalled ${pkg?.name}`,
    });
  };

  const handleTeamAccessChange = (packageId: string, teamId: string, hasAccess: boolean) => {
    setPackages(prev => prev.map(pkg => {
      if (pkg.id === packageId) {
        const teamAccess = hasAccess 
          ? [...pkg.teamAccess.filter(t => t !== teamId), teamId]
          : pkg.teamAccess.filter(t => t !== teamId);
        return { ...pkg, teamAccess };
      }
      return pkg;
    }));
  };

  const categories = Array.from(new Set(packages.map(pkg => pkg.category)));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>Enhanced MCP Manager</span>
          </CardTitle>
          <CardDescription>
            Manage Model Context Protocol packages with team access controls and advanced filtering
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search packages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="installed">Installed</SelectItem>
                <SelectItem value="available">Available</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="packages" className="space-y-4">
            <TabsList>
              <TabsTrigger value="packages">Packages</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="teams">Team Access</TabsTrigger>
            </TabsList>

            <TabsContent value="packages" className="space-y-4">
              {filteredPackages.map((pkg) => (
                <Card key={pkg.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{pkg.name}</h4>
                          <Badge variant="outline">v{pkg.version}</Badge>
                          <Badge 
                            variant={pkg.status === "installed" ? "default" : "secondary"}
                            className={pkg.status === "updating" ? "animate-pulse" : ""}
                          >
                            {pkg.status}
                          </Badge>
                          <Badge variant="secondary">{pkg.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{pkg.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Size: {pkg.size}</span>
                          <span>Updated: {pkg.lastUpdated}</span>
                          {pkg.teamAccess.length > 0 && (
                            <span>Teams: {pkg.teamAccess.join(", ")}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {pkg.status === "installed" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUninstall(pkg.id)}
                          >
                            Uninstall
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleInstall(pkg.id)}
                            disabled={pkg.status === "updating"}
                          >
                            {pkg.status === "updating" ? "Installing..." : "Install"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="teams" className="space-y-4">
              {packages.filter(pkg => pkg.status === "installed").map((pkg) => (
                <Card key={pkg.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{pkg.name}</CardTitle>
                    <CardDescription>Configure team access permissions</CardDescription>
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
                            checked={pkg.teamAccess.includes(team.id)}
                            onCheckedChange={(checked) => handleTeamAccessChange(pkg.id, team.id, checked)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4">
              {packages.filter(pkg => pkg.status === "installed").map((pkg) => (
                <Card key={pkg.id}>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>{pkg.name} Permissions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {pkg.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="flex items-center space-x-1">
                          <Shield className="w-3 h-3" />
                          <span>{permission}</span>
                        </Badge>
                      ))}
                    </div>
                    {pkg.dependencies.length > 0 && (
                      <div className="mt-4">
                        <Label className="text-sm font-medium">Dependencies</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {pkg.dependencies.map((dep) => (
                            <Badge key={dep} variant="secondary">
                              {dep}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
