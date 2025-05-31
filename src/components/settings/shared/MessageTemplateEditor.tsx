
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { FileText, Eye, RotateCcw } from "lucide-react";

interface MessageTemplate {
  agentStatus: string;
  taskCompletion: string;
  systemError: string;
  planningAgent: string;
  directMessage: string;
}

interface MessageTemplateEditorProps {
  platform: 'discord' | 'telegram';
  templates: MessageTemplate;
  onTemplatesChange: (templates: MessageTemplate) => void;
}

const defaultTemplates: MessageTemplate = {
  agentStatus: "🤖 Agent **{agentName}** status changed from {oldStatus} to {newStatus}",
  taskCompletion: "✅ Task **{taskTitle}** completed{agentName ? ` by ${agentName}` : ''}",
  systemError: "🚨 {priority === 'critical' ? 'Critical' : 'High Priority'} Alert: {error}",
  planningAgent: "📋 Planning Agent Update: {message}",
  directMessage: "💬 Direct Message: {message}"
};

const templateVariables = {
  agentStatus: ['{agentName}', '{oldStatus}', '{newStatus}', '{userRole}'],
  taskCompletion: ['{taskTitle}', '{taskId}', '{agentName}', '{userRole}'],
  systemError: ['{error}', '{priority}'],
  planningAgent: ['{message}', '{userRole}'],
  directMessage: ['{message}', '{sender}']
};

export const MessageTemplateEditor = ({
  platform,
  templates,
  onTemplatesChange
}: MessageTemplateEditorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<keyof MessageTemplate>('agentStatus');
  const [previewData, setPreviewData] = useState({
    agentName: 'Development Agent',
    oldStatus: 'idle',
    newStatus: 'working',
    taskTitle: 'Implement user authentication',
    taskId: 'TASK-123',
    error: 'Database connection failed',
    priority: 'high',
    message: 'New sprint planning session started',
    userRole: 'developer',
    sender: 'John Doe'
  });
  
  const { toast } = useToast();

  const templateTypes = [
    { key: 'agentStatus', label: 'Agent Status' },
    { key: 'taskCompletion', label: 'Task Completion' },
    { key: 'systemError', label: 'System Error' },
    { key: 'planningAgent', label: 'Planning Agent' },
    { key: 'directMessage', label: 'Direct Message' }
  ];

  const handleTemplateChange = (templateType: keyof MessageTemplate, value: string) => {
    const updatedTemplates = {
      ...templates,
      [templateType]: value
    };
    onTemplatesChange(updatedTemplates);
  };

  const resetTemplate = (templateType: keyof MessageTemplate) => {
    handleTemplateChange(templateType, defaultTemplates[templateType]);
    toast({
      title: "Template Reset",
      description: "Template has been reset to default",
    });
  };

  const generatePreview = (template: string) => {
    let preview = template;
    Object.entries(previewData).forEach(([key, value]) => {
      const variable = `{${key}}`;
      preview = preview.replace(new RegExp(variable, 'g'), value);
    });
    
    // Handle conditional expressions
    preview = preview.replace(/\{([^}]*)\s*\?\s*`([^`]*)`\s*:\s*'([^']*)'\}/g, (match, condition, trueValue, falseValue) => {
      return condition.includes('agentName') ? trueValue : falseValue;
    });
    
    return preview;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="w-5 h-5" />
          Message Templates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OptimizedStack gap="md">
          <div className="flex flex-wrap gap-2">
            {templateTypes.map((type) => (
              <Button
                key={type.key}
                variant={selectedTemplate === type.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTemplate(type.key as keyof MessageTemplate)}
              >
                {type.label}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="template-editor" className="text-base font-medium">
                {templateTypes.find(t => t.key === selectedTemplate)?.label} Template
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => resetTemplate(selectedTemplate)}
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </Button>
            </div>

            <Textarea
              id="template-editor"
              value={templates[selectedTemplate]}
              onChange={(e) => handleTemplateChange(selectedTemplate, e.target.value)}
              placeholder="Enter your message template..."
              className="min-h-24 font-mono text-sm"
            />

            <div className="flex flex-wrap gap-1">
              <span className="text-xs text-muted-foreground mr-2">Available variables:</span>
              {templateVariables[selectedTemplate].map((variable) => (
                <Badge key={variable} variant="outline" className="text-xs">
                  {variable}
                </Badge>
              ))}
            </div>

            <div className="border rounded-lg p-3 bg-muted/20">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Preview</span>
              </div>
              <div className="text-sm bg-background p-2 rounded border">
                {generatePreview(templates[selectedTemplate])}
              </div>
            </div>
          </div>
        </OptimizedStack>
      </CardContent>
    </Card>
  );
};
