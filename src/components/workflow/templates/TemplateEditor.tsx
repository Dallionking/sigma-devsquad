
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { WorkflowTemplate, WorkflowTemplateNode, WorkflowTemplateConnection } from '@/types/workflow-templates';
import { WorkflowEditor } from '../WorkflowEditor';
import { Save, X, Plus, Trash2 } from 'lucide-react';

interface TemplateEditorProps {
  template: WorkflowTemplate | null;
  onSave: (template: Partial<WorkflowTemplate>) => void;
  onCancel: () => void;
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({
  template,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<WorkflowTemplate>>({
    name: '',
    description: '',
    category: 'Development',
    tags: [],
    complexity: 'simple',
    isPublic: false,
    nodes: [],
    connections: [],
    variables: {}
  });

  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (template) {
      setFormData(template);
    } else {
      setFormData({
        name: '',
        description: '',
        category: 'Development',
        tags: [],
        complexity: 'simple',
        isPublic: false,
        nodes: [],
        connections: [],
        variables: {}
      });
    }
  }, [template]);

  const handleSave = () => {
    const templateData = {
      ...formData,
      lastModified: new Date().toISOString(),
      ...(template ? {} : { 
        createdAt: new Date().toISOString(),
        usage: 0 
      })
    };
    onSave(templateData);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const handleWorkflowChange = (nodes: any[]) => {
    // Convert workflow editor nodes to template nodes
    const templateNodes: WorkflowTemplateNode[] = nodes.map(node => ({
      id: node.id,
      type: node.type,
      title: node.title,
      description: node.description,
      position: node.position,
      config: {
        agentType: node.config?.agentType,
        estimatedDuration: node.config?.estimatedDuration,
        priority: node.config?.priority,
        conditions: node.config?.conditions,
        variables: node.config?.variables
      }
    }));

    // Convert connections
    const templateConnections: WorkflowTemplateConnection[] = [];
    nodes.forEach(node => {
      node.connections?.forEach((targetId: string) => {
        templateConnections.push({
          id: `${node.id}-${targetId}`,
          fromNodeId: node.id,
          toNodeId: targetId
        });
      });
    });

    setFormData(prev => ({
      ...prev,
      nodes: templateNodes,
      connections: templateConnections
    }));
  };

  return (
    <div className="h-full flex">
      {/* Template Properties Panel */}
      <div className="w-80 border-r bg-card p-4 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Template Properties</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={handleSave} disabled={!formData.name?.trim()}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Template Name *</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter template name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what this template does"
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as any }))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="DevOps">DevOps</SelectItem>
                <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="complexity">Complexity</Label>
            <Select
              value={formData.complexity}
              onValueChange={(value) => setFormData(prev => ({ ...prev, complexity: value as any }))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Simple</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="complex">Complex</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="mt-1 space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button size="sm" onClick={addTag}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {formData.tags?.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="public">Make Public</Label>
            <Switch
              id="public"
              checked={formData.isPublic || false}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
            />
          </div>
        </div>
      </div>

      {/* Workflow Editor */}
      <div className="flex-1">
        <WorkflowEditor
          workflowId={template?.id}
          initialNodes={formData.nodes?.map(node => ({
            id: node.id,
            type: node.type,
            title: node.title,
            description: node.description,
            position: node.position,
            connections: formData.connections
              ?.filter(conn => conn.fromNodeId === node.id)
              .map(conn => conn.toNodeId) || [],
            config: node.config
          })) || []}
          onSave={handleWorkflowChange}
        />
      </div>
    </div>
  );
};
