
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Package, AlertTriangle, CheckCircle, Settings, Download } from "lucide-react";

interface MCPPackage {
  id: string;
  name: string;
  description: string;
  version: string;
  dependencies: string[];
  permissions: string[];
  configuration?: { key: string; description: string; required: boolean }[];
}

interface MCPInstallationWizardProps {
  mcpPackage: MCPPackage;
  onInstall: (config: Record<string, any>) => void;
  onCancel: () => void;
}

export const MCPInstallationWizard = ({ mcpPackage, onInstall, onCancel }: MCPInstallationWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [acceptedPermissions, setAcceptedPermissions] = useState(false);
  const [configuration, setConfiguration] = useState<Record<string, string>>({});
  const [isInstalling, setIsInstalling] = useState(false);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInstall = async () => {
    setIsInstalling(true);
    // Simulate installation delay
    setTimeout(() => {
      onInstall(configuration);
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Package className="w-8 h-8 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">{mcpPackage.name}</h3>
                <p className="text-sm text-muted-foreground">Version {mcpPackage.version}</p>
              </div>
            </div>
            <p className="text-sm">{mcpPackage.description}</p>
            
            {mcpPackage.dependencies.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Dependencies</h4>
                <div className="space-y-1">
                  {mcpPackage.dependencies.map((dep) => (
                    <div key={dep} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{dep}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Permissions Review</h3>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                This MCP will request the following permissions. Please review carefully.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              {mcpPackage.permissions.map((permission) => (
                <div key={permission} className="flex items-center space-x-2 p-2 border rounded">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm">{permission}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="accept-permissions"
                checked={acceptedPermissions}
                onCheckedChange={(checked) => setAcceptedPermissions(!!checked)}
              />
              <label htmlFor="accept-permissions" className="text-sm">
                I understand and accept these permissions
              </label>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configuration</h3>
            {mcpPackage.configuration ? (
              <div className="space-y-3">
                {mcpPackage.configuration.map((config) => (
                  <div key={config.key} className="space-y-1">
                    <label className="text-sm font-medium">
                      {config.key} {config.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder={config.description}
                      value={configuration[config.key] || ""}
                      onChange={(e) => setConfiguration(prev => ({
                        ...prev,
                        [config.key]: e.target.value
                      }))}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No configuration required.</p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ready to Install</h3>
            <div className="bg-muted p-4 rounded space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Package:</span>
                <span>{mcpPackage.name} v{mcpPackage.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Dependencies:</span>
                <span>{mcpPackage.dependencies.length} packages</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Permissions:</span>
                <Badge variant="outline">{acceptedPermissions ? "Accepted" : "Pending"}</Badge>
              </div>
            </div>
            
            {isInstalling && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Installing...</span>
                </div>
                <Progress value={66} className="w-full" />
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Install MCP Package</span>
          <Badge variant="outline">Step {currentStep} of {totalSteps}</Badge>
        </CardTitle>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        {renderStepContent()}
        
        <div className="flex justify-between">
          <div>
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack} disabled={isInstalling}>
                Back
              </Button>
            )}
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={onCancel} disabled={isInstalling}>
              Cancel
            </Button>
            {currentStep < totalSteps ? (
              <Button 
                onClick={handleNext} 
                disabled={currentStep === 2 && !acceptedPermissions}
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleInstall} 
                disabled={!acceptedPermissions || isInstalling}
              >
                <Download className="w-4 h-4 mr-2" />
                Install
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
