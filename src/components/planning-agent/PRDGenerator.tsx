
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Share, Edit3, CheckCircle } from "lucide-react";

export const PRDGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [prdContent, setPrdContent] = useState("");
  const [generationProgress, setGenerationProgress] = useState(0);

  const templates = [
    { id: "feature", name: "Feature PRD", description: "For new feature development" },
    { id: "product", name: "Product PRD", description: "For complete product planning" },
    { id: "integration", name: "Integration PRD", description: "For third-party integrations" },
    { id: "improvement", name: "Improvement PRD", description: "For existing feature enhancements" }
  ];

  const prdSections = [
    { name: "Executive Summary", status: "completed", progress: 100 },
    { name: "Problem Statement", status: "completed", progress: 100 },
    { name: "Goals & Objectives", status: "completed", progress: 100 },
    { name: "User Stories", status: "in-progress", progress: 75 },
    { name: "Technical Requirements", status: "pending", progress: 0 },
    { name: "Success Metrics", status: "pending", progress: 0 },
    { name: "Timeline & Milestones", status: "pending", progress: 0 }
  ];

  const handleGeneratePRD = async () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate PRD generation
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "in-progress":
        return <Edit3 className="w-4 h-4 text-blue-500" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            PRD Generator
          </CardTitle>
          <CardDescription>Create comprehensive Product Requirements Documents</CardDescription>
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

      {/* PRD Sections Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Section Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {prdSections.map((section, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(section.status)}
                  <span className="text-sm">{section.name}</span>
                </div>
                <Badge 
                  variant="outline" 
                  className={
                    section.status === "completed" 
                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                      : section.status === "in-progress"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                  }
                >
                  {section.progress}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generated PRD Content */}
      {prdContent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-sm">Generated PRD</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm">
                  <Download className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share className="w-3 h-3" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={prdContent}
              onChange={(e) => setPrdContent(e.target.value)}
              className="min-h-[300px] text-xs font-mono"
              placeholder="Generated PRD content will appear here..."
            />
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <FileText className="w-3 h-3 mr-2" />
              Export to Document
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Share className="w-3 h-3 mr-2" />
              Share with Team
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Edit3 className="w-3 h-3 mr-2" />
              Edit Template
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
