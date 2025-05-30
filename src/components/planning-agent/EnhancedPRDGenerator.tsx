
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Share, Edit3, CheckCircle, Eye, Code, FileImage } from "lucide-react";

export const EnhancedPRDGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [prdContent, setPrdContent] = useState("");
  const [generationProgress, setGenerationProgress] = useState(0);
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");

  const templates = [
    { id: "feature", name: "Feature PRD", description: "For new feature development" },
    { id: "product", name: "Product PRD", description: "For complete product planning" },
    { id: "integration", name: "Integration PRD", description: "For third-party integrations" },
    { id: "improvement", name: "Improvement PRD", description: "For existing feature enhancements" }
  ];

  const handleGeneratePRD = async () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);
    
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setPrdContent(`# Product Requirements Document
## ${templates.find(t => t.id === selectedTemplate)?.name}

### Executive Summary
This PRD outlines the requirements for developing a comprehensive AI agent management system that enables efficient workflow automation and real-time collaboration.

### Problem Statement
Development teams struggle with coordinating multiple tasks and maintaining visibility into project progress. Current tools lack intelligent automation and seamless integration capabilities.

### Goals & Objectives
- Implement AI-powered task distribution
- Create intuitive workflow visualization
- Enable real-time agent communication
- Provide comprehensive project analytics

### User Stories
- As a project manager, I want to see all agent activities in real-time
- As a developer, I want automated task assignment based on expertise
- As a stakeholder, I want clear progress reporting and metrics

### Technical Requirements
- React-based frontend with TypeScript
- Real-time WebSocket connections
- RESTful API for agent management
- Responsive design for all screen sizes

### Success Metrics
- 50% reduction in manual task coordination
- 90% agent utilization rate
- <2s response time for all interactions
- 95% user satisfaction score`);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const renderPreview = () => {
    return (
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <div dangerouslySetInnerHTML={{ 
          __html: prdContent
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^\- (.*$)/gm, '<li>$1</li>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(?!<[h|l])/gm, '<p>')
            .replace(/(?![>])$/gm, '</p>')
        }} />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Enhanced PRD Generator
          </CardTitle>
          <CardDescription>Create and preview comprehensive Product Requirements Documents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Select Template</label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a PRD template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs text-muted-foreground">{template.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleGeneratePRD} 
            disabled={!selectedTemplate || isGenerating}
            className="w-full"
          >
            {isGenerating ? "Generating PRD..." : "Generate PRD"}
          </Button>

          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Generating sections...</span>
                <span>{generationProgress}%</span>
              </div>
              <Progress value={generationProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Document Editor/Preview */}
      {prdContent && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Document Editor</CardTitle>
              <div className="flex items-center gap-2">
                <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)} className="h-8">
                  <TabsList className="grid w-full grid-cols-2 h-8">
                    <TabsTrigger value="edit" className="text-xs">
                      <Edit3 className="w-3 h-3 mr-1" />
                      Edit
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      Preview
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === "edit" ? (
              <Textarea
                value={prdContent}
                onChange={(e) => setPrdContent(e.target.value)}
                className="min-h-[400px] text-xs font-mono"
                placeholder="Generated PRD content will appear here..."
              />
            ) : (
              <div className="min-h-[400px] p-4 border rounded-md bg-muted/30">
                {renderPreview()}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Export & Share</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              <FileText className="w-3 h-3 mr-2" />
              Export MD
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <FileImage className="w-3 h-3 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Share className="w-3 h-3 mr-2" />
              Share Link
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Code className="w-3 h-3 mr-2" />
              Export HTML
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
