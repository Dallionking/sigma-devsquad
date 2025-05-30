
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Upload, BookOpen, Database, Link } from "lucide-react";
import { AgentType } from "@/types";

interface KnowledgeSource {
  id: string;
  name: string;
  type: "document" | "database" | "api" | "manual";
  source: string;
  enabled: boolean;
  lastUpdated: string;
}

interface ContextManagementProps {
  agentType: AgentType;
  onConfigChange: () => void;
}

const defaultKnowledgeSources: Record<AgentType, KnowledgeSource[]> = {
  planning: [
    {
      id: "1",
      name: "Project Requirements Document",
      type: "document",
      source: "requirements.pdf",
      enabled: true,
      lastUpdated: "2024-05-30T10:00:00Z"
    },
    {
      id: "2",
      name: "Company Standards & Guidelines",
      type: "document",
      source: "company-standards.md",
      enabled: true,
      lastUpdated: "2024-05-29T15:30:00Z"
    }
  ],
  frontend: [
    {
      id: "1",
      name: "Design System Documentation",
      type: "document",
      source: "design-system.json",
      enabled: true,
      lastUpdated: "2024-05-30T09:00:00Z"
    },
    {
      id: "2",
      name: "Component Library API",
      type: "api",
      source: "https://api.components.company.com",
      enabled: true,
      lastUpdated: "2024-05-30T11:00:00Z"
    }
  ],
  backend: [
    {
      id: "1",
      name: "API Specifications",
      type: "document",
      source: "api-specs.yaml",
      enabled: true,
      lastUpdated: "2024-05-30T08:00:00Z"
    },
    {
      id: "2",
      name: "Database Schema",
      type: "database",
      source: "production-db",
      enabled: true,
      lastUpdated: "2024-05-30T07:00:00Z"
    }
  ],
  qa: [
    {
      id: "1",
      name: "Test Cases Database",
      type: "database",
      source: "test-cases-db",
      enabled: true,
      lastUpdated: "2024-05-30T12:00:00Z"
    },
    {
      id: "2",
      name: "Bug Reports History",
      type: "api",
      source: "https://api.bugtracker.company.com",
      enabled: true,
      lastUpdated: "2024-05-30T13:00:00Z"
    }
  ],
  documentation: [
    {
      id: "1",
      name: "Existing Documentation",
      type: "document",
      source: "current-docs/",
      enabled: true,
      lastUpdated: "2024-05-30T14:00:00Z"
    },
    {
      id: "2",
      name: "Code Comments & Annotations",
      type: "api",
      source: "https://api.codebase.company.com",
      enabled: true,
      lastUpdated: "2024-05-30T15:00:00Z"
    }
  ],
  devops: [
    {
      id: "1",
      name: "Infrastructure Configuration",
      type: "document",
      source: "infrastructure.yaml",
      enabled: true,
      lastUpdated: "2024-05-30T16:00:00Z"
    },
    {
      id: "2",
      name: "Deployment Scripts",
      type: "document",
      source: "deploy/",
      enabled: true,
      lastUpdated: "2024-05-30T17:00:00Z"
    }
  ]
};

export const ContextManagement = ({ agentType, onConfigChange }: ContextManagementProps) => {
  const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>(
    defaultKnowledgeSources[agentType] || []
  );
  const [contextInstructions, setContextInstructions] = useState("");
  const [memoryRetention, setMemoryRetention] = useState(7); // days
  const [autoUpdate, setAutoUpdate] = useState(true);

  const addKnowledgeSource = () => {
    const newSource: KnowledgeSource = {
      id: Date.now().toString(),
      name: "New Knowledge Source",
      type: "manual",
      source: "",
      enabled: true,
      lastUpdated: new Date().toISOString()
    };
    setKnowledgeSources([...knowledgeSources, newSource]);
    onConfigChange();
  };

  const updateKnowledgeSource = (id: string, updates: Partial<KnowledgeSource>) => {
    setKnowledgeSources(sources => 
      sources.map(source => source.id === id ? { ...source, ...updates } : source)
    );
    onConfigChange();
  };

  const deleteKnowledgeSource = (id: string) => {
    setKnowledgeSources(sources => sources.filter(source => source.id !== id));
    onConfigChange();
  };

  const getSourceIcon = (type: KnowledgeSource['type']) => {
    switch (type) {
      case 'document': return BookOpen;
      case 'database': return Database;
      case 'api': return Link;
      case 'manual': return Upload;
      default: return BookOpen;
    }
  };

  const enabledSourcesCount = knowledgeSources.filter(source => source.enabled).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Context Settings</CardTitle>
          <CardDescription>Configure how the agent processes and retains context information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="memory-retention">Memory Retention (days)</Label>
              <Input
                id="memory-retention"
                type="number"
                value={memoryRetention}
                onChange={(e) => {
                  setMemoryRetention(parseInt(e.target.value));
                  onConfigChange();
                }}
                min="1"
                max="365"
              />
              <p className="text-xs text-slate-500">How long should the agent retain conversation context</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Auto-update Knowledge</h4>
                <p className="text-sm text-slate-600">Automatically update knowledge sources when changes are detected</p>
              </div>
              <Switch
                checked={autoUpdate}
                onCheckedChange={(checked) => {
                  setAutoUpdate(checked);
                  onConfigChange();
                }}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="context-instructions">Context Instructions</Label>
            <Textarea
              id="context-instructions"
              value={contextInstructions}
              onChange={(e) => {
                setContextInstructions(e.target.value);
                onConfigChange();
              }}
              placeholder="Provide specific instructions on how this agent should interpret and use context information..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Knowledge Sources</CardTitle>
              <CardDescription>Manage the knowledge base sources for this agent</CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-green-50 text-green-700">
                {enabledSourcesCount} active sources
              </Badge>
              <Button onClick={addKnowledgeSource} size="sm" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Source</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {knowledgeSources.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p>No knowledge sources configured. Click "Add Source" to connect your first knowledge base.</p>
            </div>
          ) : (
            knowledgeSources.map((source, index) => {
              const SourceIcon = getSourceIcon(source.type);
              return (
                <div key={source.id}>
                  <Card className={`border-2 ${source.enabled ? 'border-blue-200 bg-blue-50/30' : 'border-slate-200 bg-slate-50/30'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <SourceIcon className="w-5 h-5 text-slate-600" />
                          <Input
                            value={source.name}
                            onChange={(e) => updateKnowledgeSource(source.id, { name: e.target.value })}
                            className="font-medium border-0 bg-transparent p-0 focus-visible:ring-0"
                          />
                          <Badge variant="secondary" className="text-xs">
                            {source.type}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteKnowledgeSource(source.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Switch
                            checked={source.enabled}
                            onCheckedChange={(checked) => updateKnowledgeSource(source.id, { enabled: checked })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Source Type</Label>
                          <select
                            value={source.type}
                            onChange={(e) => updateKnowledgeSource(source.id, { type: e.target.value as KnowledgeSource['type'] })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="document">Document</option>
                            <option value="database">Database</option>
                            <option value="api">API Endpoint</option>
                            <option value="manual">Manual Input</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label>Source Location</Label>
                          <Input
                            value={source.source}
                            onChange={(e) => updateKnowledgeSource(source.id, { source: e.target.value })}
                            placeholder={`Enter ${source.type} ${source.type === 'api' ? 'URL' : 'path'}`}
                          />
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-slate-500">
                        Last updated: {new Date(source.lastUpdated).toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                  {index < knowledgeSources.length - 1 && <Separator className="my-4" />}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
};
