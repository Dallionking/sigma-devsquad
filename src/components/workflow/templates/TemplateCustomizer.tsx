
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { WorkflowTemplate, TemplateCustomization } from '@/types/workflow-templates';
import { Play, Save, Settings } from 'lucide-react';

interface TemplateCustomizerProps {
  template: WorkflowTemplate;
  onApply: (template: WorkflowTemplate) => void;
  onSaveAsNew: (template: Omit<WorkflowTemplate, 'id'>) => void;
}

export const TemplateCustomizer: React.FC<TemplateCustomizerProps> = ({
  template,
  onApply,
  onSaveAsNew
}) => {
  const [customization, setCustomization] = useState<TemplateCustomization>({
    templateId: template.id,
    variables: {},
    nodeCustomizations: {}
  });

  const [customName, setCustomName] = useState(`${template.name} (Custom)`);
  const [customDescription, setCustomDescription] = useState(template.description);

  const applyCustomization = () => {
    const customizedTemplate: WorkflowTemplate = {
      ...template,
      nodes: template.nodes.map(node => ({
        ...node,
        ...customization.nodeCustomizations[node.id]
      }))
    };
    onApply(customizedTemplate);
  };

  const saveAsNewTemplate = () => {
    const customizedTemplate: Omit<WorkflowTemplate, 'id'> = {
      ...template,
      name: customName,
      description: customDescription,
      nodes: template.nodes.map(node => ({
        ...node,
        ...customization.nodeCustomizations[node.id]
      })),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      usage: 0
    };
    onSaveAsNew(customizedTemplate);
  };

  const updateVariable = (name: string, value: any) => {
    setCustomization(prev => ({
      ...prev,
      variables: {
        ...prev.variables,
        [name]: value
      }
    }));
  };

  const updateNodeCustomization = (nodeId: string, updates: any) => {
    setCustomization(prev => ({
      ...prev,
      nodeCustomizations: {
        ...prev.nodeCustomizations,
        [nodeId]: {
          ...prev.nodeCustomizations[nodeId],
          ...updates
        }
      }
    }));
  };

  const renderVariableInput = (name: string, variable: any) => {
    switch (variable.type) {
      case 'string':
        return (
          <Input
            value={customization.variables[name] || variable.defaultValue || ''}
            onChange={(e) => updateVariable(name, e.target.value)}
            placeholder={variable.description}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={customization.variables[name] || variable.defaultValue || 0}
            onChange={(e) => updateVariable(name, Number(e.target.value))}
            placeholder={variable.description}
          />
        );
      case 'boolean':
        return (
          <Switch
            checked={customization.variables[name] ?? variable.defaultValue ?? false}
            onCheckedChange={(checked) => updateVariable(name, checked)}
          />
        );
      case 'select':
        return (
          <Select
            value={customization.variables[name] || variable.defaultValue}
            onValueChange={(value) => updateVariable(name, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              {variable.options?.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Customize Template</h2>
          <p className="text-muted-foreground">{template.name}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={applyCustomization}>
            <Play className="w-4 h-4 mr-2" />
            Apply & Use
          </Button>
          <Button variant="outline" onClick={saveAsNewTemplate}>
            <Save className="w-4 h-4 mr-2" />
            Save as New
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Template Variables */}
        {template.variables && Object.keys(template.variables).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Template Variables</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(template.variables).map(([name, variable]) => (
                <div key={name}>
                  <Label className="text-sm font-medium">
                    {name}
                    {variable.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <div className="mt-1">
                    {renderVariableInput(name, variable)}
                  </div>
                  {variable.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {variable.description}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Node Customizations */}
        <Card>
          <CardHeader>
            <CardTitle>Node Customizations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {template.nodes.map(node => (
              <div key={node.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-2">{node.title}</h4>
                <div className="space-y-2">
                  <div>
                    <Label className="text-xs">Agent Type</Label>
                    <Select
                      value={customization.nodeCustomizations[node.id]?.config?.agentType || node.config?.agentType || ''}
                      onValueChange={(value) => updateNodeCustomization(node.id, {
                        config: { ...node.config, agentType: value }
                      })}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select agent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend Agent</SelectItem>
                        <SelectItem value="backend">Backend Agent</SelectItem>
                        <SelectItem value="qa">QA Agent</SelectItem>
                        <SelectItem value="devops">DevOps Agent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-xs">Priority</Label>
                    <Select
                      value={customization.nodeCustomizations[node.id]?.config?.priority || node.config?.priority || 'medium'}
                      onValueChange={(value) => updateNodeCustomization(node.id, {
                        config: { ...node.config, priority: value }
                      })}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {node.config?.estimatedDuration && (
                    <div>
                      <Label className="text-xs">
                        Estimated Duration: {customization.nodeCustomizations[node.id]?.config?.estimatedDuration || node.config.estimatedDuration} hours
                      </Label>
                      <Slider
                        value={[customization.nodeCustomizations[node.id]?.config?.estimatedDuration || node.config.estimatedDuration]}
                        onValueChange={([value]) => updateNodeCustomization(node.id, {
                          config: { ...node.config, estimatedDuration: value }
                        })}
                        min={1}
                        max={24}
                        step={1}
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Save as New Template */}
        <Card>
          <CardHeader>
            <CardTitle>Save Customized Template</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="custom-name">Template Name</Label>
              <Input
                id="custom-name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="custom-description">Description</Label>
              <Input
                id="custom-description"
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
