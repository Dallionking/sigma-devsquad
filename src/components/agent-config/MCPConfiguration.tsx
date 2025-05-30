
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, CheckCircle, AlertCircle, Settings } from "lucide-react";
import { AgentType } from "@/types";

interface MCPConfigurationProps {
  agentType: AgentType;
  onConfigChange: () => void;
}

// Mock data for available MCPs
const availableMCPs = [
  {
    id: "mcp-git",
    name: "Git Protocol",
    description: "Provides Git repository management capabilities",
    version: "1.2.3",
    status: "installed",
    recommended: ["planning", "frontend", "backend", "devops"]
  },
  {
    id: "mcp-filesystem",
    name: "Filesystem Protocol",
    description: "Safe filesystem operations with sandboxing",
    version: "2.1.0", 
    status: "installed",
    recommended: ["frontend", "backend", "devops", "documentation"]
  },
  {
    id: "mcp-web-scraper",
    name: "Web Scraper",
    description: "Extract data from web pages with respect for robots.txt",
    version: "0.8.1",
    status: "available",
    recommended: ["planning", "qa", "documentation"]
  },
  {
    id: "mcp-database",
    name: "Database Protocol",
    description: "Database operations and schema management",
    version: "1.5.2",
    status: "available",
    recommended: ["backend", "devops"]
  },
  {
    id: "mcp-api-client",
    name: "API Client",
    description: "HTTP client for API testing and integration",
    version: "1.1.0",
    status: "installed",
    recommended: ["backend", "qa", "frontend"]
  },
  {
    id: "mcp-documentation",
    name: "Documentation Generator",
    description: "Automatic documentation generation from code",
    version: "0.9.5",
    status: "available",
    recommended: ["documentation", "planning"]
  }
];

export const MCPConfiguration = ({ agentType, onConfigChange }: MCPConfigurationProps) => {
  const getDefaultEnabledState = (mcpId: string) => {
    const mcp = availableMCPs.find(m => m.id === mcpId);
    return mcp?.recommended.includes(agentType) && mcp?.status === "installed";
  };

  const handleMCPToggle = (mcpId: string, enabled: boolean) => {
    console.log(`${enabled ? 'Enabling' : 'Disabling'} ${mcpId} for ${agentType} agent`);
    onConfigChange();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "installed": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "available": return <Package className="w-4 h-4 text-slate-400" />;
      default: return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const installedMCPs = availableMCPs.filter(mcp => mcp.status === "installed");
  const availableForInstall = availableMCPs.filter(mcp => mcp.status === "available");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>MCP Access Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">
            Configure which Model Context Protocols (MCPs) this {agentType} agent can access. 
            Recommended protocols are pre-selected based on the agent's role.
          </p>
          
          <div className="space-y-4">
            <h4 className="font-medium text-slate-900">Installed MCPs</h4>
            {installedMCPs.map((mcp) => (
              <div key={mcp.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(mcp.status)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-slate-900">{mcp.name}</h4>
                      <Badge variant="secondary">v{mcp.version}</Badge>
                      {mcp.recommended.includes(agentType) && (
                        <Badge variant="default" className="bg-blue-100 text-blue-800">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{mcp.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Switch 
                    defaultChecked={getDefaultEnabledState(mcp.id)}
                    onCheckedChange={(enabled) => handleMCPToggle(mcp.id, enabled)}
                  />
                </div>
              </div>
            ))}
          </div>

          {availableForInstall.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-slate-900">Available for Installation</h4>
              {availableForInstall.map((mcp) => (
                <div key={mcp.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(mcp.status)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-slate-700">{mcp.name}</h4>
                        <Badge variant="outline">v{mcp.version}</Badge>
                        {mcp.recommended.includes(agentType) && (
                          <Badge variant="default" className="bg-blue-100 text-blue-800">
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-500">{mcp.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Install
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
