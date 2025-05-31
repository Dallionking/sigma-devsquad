
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { MessageSquare, Code, Eye, Save } from "lucide-react";
import { MessageTemplate } from "@/types/webhook";

interface MessageFormatCustomizerProps {
  templates: MessageTemplate[];
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
  onTemplateUpdate: (templateId: string, content: string) => void;
  platform: 'discord' | 'telegram';
}

export const MessageFormatCustomizer = ({
  templates,
  selectedTemplate,
  onTemplateChange,
  onTemplateUpdate,
  platform
}: MessageFormatCustomizerProps) => {
  const [customTemplate, setCustomTemplate] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const currentTemplate = templates.find(t => t.id === selectedTemplate);
  
  const availableVariables = [
    '{{agent_name}}', '{{task_id}}', '{{task_title}}', '{{status}}',
    '{{timestamp}}', '{{user_name}}', '{{error_message}}', '{{priority}}'
  ];

  const generatePreview = (template: string) => {
    const sampleData = {
      '{{agent_name}}': 'Data Processing Agent',
      '{{task_id}}': 'TASK-001',
      '{{task_title}}': 'Process customer data',
      '{{status}}': 'Completed',
      '{{timestamp}}': new Date().toLocaleString(),
      '{{user_name}}': 'John Doe',
      '{{error_message}}': 'Connection timeout',
      '{{priority}}': 'High'
    };

    let preview = template;
    Object.entries(sampleData).forEach(([variable, value]) => {
      preview = preview.replace(new RegExp(variable.replace(/[{}]/g, '\\$&'), 'g'), value);
    });
    return preview;
  };

  const handleSaveTemplate = () => {
    if (currentTemplate && customTemplate) {
      onTemplateUpdate(currentTemplate.id, customTemplate);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageSquare className="w-5 h-5" />
          Message Format Customization
          <Badge variant="outline" className="text-xs">
            {platform === 'discord' ? 'Discord' : 'Telegram'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OptimizedStack gap="sm">
          <div className="space-y-2">
            <Label htmlFor="template-select">Message Template</Label>
            <Select value={selectedTemplate} onValueChange={onTemplateChange}>
              <SelectTrigger id="template-select">
                <SelectValue placeholder="Select a template..." />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentTemplate && (
            <>
              <div className="space-y-2">
                <Label htmlFor="template-editor">Template Content</Label>
                <Textarea
                  id="template-editor"
                  value={customTemplate || currentTemplate.template}
                  onChange={(e) => setCustomTemplate(e.target.value)}
                  placeholder="Enter your message template..."
                  rows={6}
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label>Available Variables</Label>
                <div className="flex flex-wrap gap-1">
                  {availableVariables.map((variable) => (
                    <Badge
                      key={variable}
                      variant="secondary"
                      className="cursor-pointer text-xs"
                      onClick={() => {
                        const textarea = document.getElementById('template-editor') as HTMLTextAreaElement;
                        if (textarea) {
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const currentValue = customTemplate || currentTemplate.template;
                          const newValue = currentValue.substring(0, start) + variable + currentValue.substring(end);
                          setCustomTemplate(newValue);
                        }
                      }}
                    >
                      <Code className="w-3 h-3 mr-1" />
                      {variable}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  {showPreview ? 'Hide' : 'Show'} Preview
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveTemplate}
                  disabled={!customTemplate}
                  className="flex items-center gap-1"
                >
                  <Save className="w-4 h-4" />
                  Save Template
                </Button>
              </div>

              {showPreview && (
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="p-3 bg-gray-50 rounded-md border text-sm">
                    {generatePreview(customTemplate || currentTemplate.template)}
                  </div>
                </div>
              )}
            </>
          )}
        </OptimizedStack>
      </CardContent>
    </Card>
  );
};
