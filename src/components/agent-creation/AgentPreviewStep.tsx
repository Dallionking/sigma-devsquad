
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bot, Settings, CheckCircle, AlertCircle, Eye } from "lucide-react";
import { AgentType } from "@/types";

interface AgentPreviewStepProps {
  config: {
    role: AgentType | null;
    customRole: string;
    specialization: string;
    background: string;
    capabilities: Record<string, boolean>;
    name: string;
    icon: string;
    description: string;
  };
  onConfigChange: (config: any) => void;
}

export const AgentPreviewStep = ({ config }: AgentPreviewStepProps) => {
  const enabledCapabilities = Object.keys(config.capabilities).filter(key => config.capabilities[key]);
  
  const getValidationStatus = () => {
    const issues = [];
    
    if (!config.name.trim()) issues.push("Agent name is required");
    if (!config.role && !config.customRole) issues.push("Role selection is required");
    if (!config.specialization) issues.push("Specialization is required");
    if (enabledCapabilities.length === 0) issues.push("At least one capability must be enabled");
    
    return {
      isValid: issues.length === 0,
      issues
    };
  };

  const validation = getValidationStatus();
  const displayRole = config.role || config.customRole;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Preview Your Agent</h2>
        <p className="text-muted-foreground">
          Review your agent configuration before creating
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Overview Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">{config.name || "Unnamed Agent"}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="capitalize">
                    {displayRole || "No Role"}
                  </Badge>
                  {config.specialization && (
                    <Badge variant="outline" className="text-xs">
                      {config.specialization}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {config.description && (
              <div>
                <h4 className="font-medium text-sm mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{config.description}</p>
              </div>
            )}
            
            <Separator />
            
            <div>
              <h4 className="font-medium text-sm mb-2">Configuration Summary</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Role:</span>
                  <p className="font-medium capitalize">{displayRole || "Not specified"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Specialization:</span>
                  <p className="font-medium">{config.specialization || "Not specified"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Capabilities:</span>
                  <p className="font-medium">{enabledCapabilities.length} enabled</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Background:</span>
                  <p className="font-medium">{config.background ? "Configured" : "Not specified"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Validation Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {validation.isValid ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-600" />
              )}
              Configuration Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {validation.isValid ? (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                  ✓ Configuration is complete and ready for creation
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-sm text-orange-700 dark:text-orange-400 font-medium mb-2">
                    Please address the following issues:
                  </p>
                  <ul className="text-sm text-orange-600 dark:text-orange-400 space-y-1">
                    {validation.issues.map((issue, index) => (
                      <li key={index}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <Separator />

            <div>
              <h4 className="font-medium text-sm mb-3">Agent Capabilities</h4>
              {enabledCapabilities.length > 0 ? (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {enabledCapabilities.map((capability) => (
                    <div key={capability} className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span className="text-sm">{capability}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No capabilities selected</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Background Configuration */}
      {config.background && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Background & Context</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{config.background}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mock Agent Interface Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Agent Interface Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-medium">{config.name || "Agent Name"}</h4>
                <p className="text-xs text-muted-foreground">{displayRole} • {config.specialization}</p>
              </div>
              <div className="ml-auto">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Active
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="bg-muted/30 rounded p-3">
                <p className="text-sm">
                  Hello! I'm {config.name || "your new agent"}, specialized in {config.specialization || "various tasks"}. 
                  I'm ready to help you with {enabledCapabilities.slice(0, 2).join(", ")}
                  {enabledCapabilities.length > 2 && ` and ${enabledCapabilities.length - 2} more capabilities`}.
                </p>
              </div>
              <div className="text-xs text-muted-foreground text-right">
                This is how your agent will appear in the interface
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
