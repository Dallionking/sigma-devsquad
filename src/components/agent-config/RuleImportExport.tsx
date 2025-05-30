
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Upload, FileText, CheckCircle, AlertTriangle } from "lucide-react";

interface RuleImportExportProps {
  rules: any[];
  onImport: (rules: any[]) => void;
  onClose: () => void;
}

export const RuleImportExport = ({ rules, onImport, onClose }: RuleImportExportProps) => {
  const [activeTab, setActiveTab] = useState<"export" | "import">("export");
  const [importData, setImportData] = useState("");
  const [importResult, setImportResult] = useState<{ success: boolean; message: string; count?: number } | null>(null);

  const exportRules = () => {
    const exportData = {
      version: "1.0",
      exportDate: new Date().toISOString(),
      rules: rules
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `agent-rules-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const validateAndImport = () => {
    try {
      const parsed = JSON.parse(importData);
      
      if (!parsed.rules || !Array.isArray(parsed.rules)) {
        setImportResult({
          success: false,
          message: "Invalid format: 'rules' array not found"
        });
        return;
      }

      // Validate rule structure
      const validRules = parsed.rules.filter((rule: any) => 
        rule.id && rule.name && rule.condition && rule.action
      );

      if (validRules.length !== parsed.rules.length) {
        setImportResult({
          success: false,
          message: `Invalid rules found. Expected ${parsed.rules.length}, got ${validRules.length} valid rules.`
        });
        return;
      }

      onImport(validRules);
      setImportResult({
        success: true,
        message: "Rules imported successfully",
        count: validRules.length
      });
    } catch (error) {
      setImportResult({
        success: false,
        message: "Invalid JSON format"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Import/Export Rules</h3>
          <p className="text-sm text-muted-foreground">Backup or share your rule configurations</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      <div className="flex space-x-2">
        <Button
          variant={activeTab === "export" ? "default" : "outline"}
          onClick={() => setActiveTab("export")}
          className="flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </Button>
        <Button
          variant={activeTab === "import" ? "default" : "outline"}
          onClick={() => setActiveTab("import")}
          className="flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>Import</span>
        </Button>
      </div>

      {activeTab === "export" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Rules</span>
            </CardTitle>
            <CardDescription>
              Download your current rule configuration as a JSON file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-muted rounded">
                <div className="font-semibold">{rules.length}</div>
                <div className="text-muted-foreground">Total Rules</div>
              </div>
              <div className="text-center p-3 bg-muted rounded">
                <div className="font-semibold">{rules.filter(r => r.enabled).length}</div>
                <div className="text-muted-foreground">Active Rules</div>
              </div>
              <div className="text-center p-3 bg-muted rounded">
                <div className="font-semibold">{new Date().toLocaleDateString()}</div>
                <div className="text-muted-foreground">Export Date</div>
              </div>
            </div>

            <Alert>
              <FileText className="w-4 h-4" />
              <AlertDescription>
                The exported file will include all rule configurations, priorities, and settings.
              </AlertDescription>
            </Alert>

            <Button onClick={exportRules} className="w-full flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download Rules ({rules.length} rules)</span>
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === "import" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Import Rules</span>
            </CardTitle>
            <CardDescription>
              Upload a previously exported rule configuration file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Paste JSON Configuration:</label>
              <Textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                rows={10}
                className="mt-1 font-mono text-sm"
                placeholder="Paste your exported rule configuration here..."
              />
            </div>

            {importResult && (
              <Alert className={importResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                <div className="flex items-center space-x-2">
                  {importResult.success ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  )}
                  <AlertDescription className={importResult.success ? "text-green-800" : "text-red-800"}>
                    {importResult.message}
                    {importResult.count && ` (${importResult.count} rules)`}
                  </AlertDescription>
                </div>
              </Alert>
            )}

            <div className="flex space-x-2">
              <Button 
                onClick={validateAndImport}
                disabled={!importData.trim()}
                className="flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Import Rules</span>
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setImportData("");
                  setImportResult(null);
                }}
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
