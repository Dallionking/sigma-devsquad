
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WorkflowTemplate } from '@/types/workflow-templates';
import { 
  Upload, Download, FileText, AlertCircle, 
  CheckCircle, Package, Trash2, Eye
} from 'lucide-react';

interface TemplateImportExportProps {
  templates: WorkflowTemplate[];
  onImportTemplate: (template: WorkflowTemplate) => void;
  onExportTemplate: (templateId: string) => void;
}

export const TemplateImportExport: React.FC<TemplateImportExportProps> = ({
  templates,
  onImportTemplate,
  onExportTemplate
}) => {
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImportFile(file);
      setImportError(null);
      setImportSuccess(null);
    }
  };

  const handleImport = async () => {
    if (!importFile) return;

    try {
      const text = await importFile.text();
      const data = JSON.parse(text);

      // Validate the imported data
      if (Array.isArray(data)) {
        // Multiple templates
        for (const template of data) {
          if (validateTemplate(template)) {
            onImportTemplate({
              ...template,
              id: `imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              createdAt: new Date().toISOString(),
              lastModified: new Date().toISOString(),
              usage: 0
            });
          }
        }
        setImportSuccess(`Successfully imported ${data.length} templates`);
      } else if (validateTemplate(data)) {
        // Single template
        onImportTemplate({
          ...data,
          id: `imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          usage: 0
        });
        setImportSuccess('Successfully imported 1 template');
      } else {
        setImportError('Invalid template format');
      }
    } catch (error) {
      setImportError('Failed to parse template file');
    }

    setImportFile(null);
  };

  const validateTemplate = (template: any): boolean => {
    return (
      template &&
      typeof template.name === 'string' &&
      typeof template.description === 'string' &&
      typeof template.category === 'string' &&
      Array.isArray(template.tags) &&
      Array.isArray(template.nodes) &&
      Array.isArray(template.connections)
    );
  };

  const handleExportSelected = () => {
    if (selectedTemplates.length === 0) return;

    const templatesToExport = templates.filter(t => selectedTemplates.includes(t.id));
    const data = templatesToExport.length === 1 ? templatesToExport[0] : templatesToExport;
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workflow-templates-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportAll = () => {
    const blob = new Blob([JSON.stringify(templates, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all-workflow-templates-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleTemplateSelection = (templateId: string) => {
    setSelectedTemplates(prev => 
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const selectAllTemplates = () => {
    setSelectedTemplates(templates.map(t => t.id));
  };

  const clearSelection = () => {
    setSelectedTemplates([]);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Import & Export Templates</h2>
        <p className="text-muted-foreground">
          Share templates across teams or backup your workflow configurations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Import Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Import Templates</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="import-file">Select Template File</Label>
              <Input
                id="import-file"
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Supports JSON files with single or multiple templates
              </p>
            </div>

            {importFile && (
              <div className="p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">{importFile.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {(importFile.size / 1024).toFixed(1)} KB
                  </Badge>
                </div>
              </div>
            )}

            {importError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{importError}</AlertDescription>
              </Alert>
            )}

            {importSuccess && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{importSuccess}</AlertDescription>
              </Alert>
            )}

            <Button 
              onClick={handleImport} 
              disabled={!importFile}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Templates
            </Button>
          </CardContent>
        </Card>

        {/* Export Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Export Templates</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={selectAllTemplates}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={clearSelection}>
                Clear Selection
              </Button>
              <Badge variant="secondary">
                {selectedTemplates.length} selected
              </Badge>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {templates.map(template => (
                <div
                  key={template.id}
                  className={`flex items-center justify-between p-2 border rounded cursor-pointer transition-colors ${
                    selectedTemplates.includes(template.id) 
                      ? 'bg-primary/10 border-primary' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => toggleTemplateSelection(template.id)}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedTemplates.includes(template.id)}
                      onChange={() => toggleTemplateSelection(template.id)}
                      className="rounded"
                    />
                    <div>
                      <p className="text-sm font-medium">{template.name}</p>
                      <p className="text-xs text-muted-foreground">{template.category}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {template.nodes.length} nodes
                  </Badge>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Button 
                onClick={handleExportSelected}
                disabled={selectedTemplates.length === 0}
                className="w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Selected ({selectedTemplates.length})
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleExportAll}
                className="w-full"
              >
                <Package className="w-4 h-4 mr-2" />
                Export All Templates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Template Format Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Template Format Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>Templates are exported as JSON files containing:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Template metadata (name, description, category, tags)</li>
              <li>Workflow nodes with positions and configurations</li>
              <li>Node connections and relationships</li>
              <li>Template variables and customization options</li>
              <li>Sharing and permission settings</li>
            </ul>
            <p className="text-muted-foreground">
              Exported templates can be shared with other teams or imported into different environments.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
