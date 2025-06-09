
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Star, Clock, Download, Upload, Trash2, Edit, Copy } from "lucide-react";
import { AgentType } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  config: {
    role: AgentType;
    specialization: string;
    capabilities: Record<string, boolean>;
    background: string;
  };
  popular?: boolean;
  official?: boolean;
  createdAt: Date;
  downloads: number;
}

interface EnhancedTemplateLibraryProps {
  onTemplateSelect: (template: Template | null) => void;
  savedTemplates: Template[];
  onSaveTemplate: (template: Template) => void;
  onDeleteTemplate: (templateId: string) => void;
}

const communityTemplates: Template[] = [
  {
    id: "react-typescript-pro",
    name: "React TypeScript Pro",
    description: "Advanced React agent with TypeScript, testing, and performance optimization",
    category: "Frontend",
    tags: ["react", "typescript", "testing", "performance"],
    popular: true,
    official: true,
    createdAt: new Date('2024-01-15'),
    downloads: 1250,
    config: {
      role: "frontend" as AgentType,
      specialization: "React Development",
      capabilities: {
        "UI Component Development": true,
        "Responsive Design": true,
        "State Management": true,
        "Testing Integration": true,
        "Performance Optimization": true,
        "TypeScript Integration": true
      },
      background: "Expert React developer with deep TypeScript knowledge, testing best practices, and performance optimization techniques. Specialized in modern React patterns, hooks, and component architecture."
    }
  },
  {
    id: "nodejs-microservices",
    name: "Node.js Microservices Architect",
    description: "Backend specialist for microservices architecture with Node.js",
    category: "Backend",
    tags: ["nodejs", "microservices", "api", "docker"],
    popular: true,
    official: true,
    createdAt: new Date('2024-01-10'),
    downloads: 890,
    config: {
      role: "backend" as AgentType,
      specialization: "Microservices Architecture",
      capabilities: {
        "API Development": true,
        "Database Management": true,
        "Authentication & Security": true,
        "Message Queue Processing": true,
        "Microservices Architecture": true,
        "Container Management": true
      },
      background: "Experienced in designing and implementing microservices architectures using Node.js, with expertise in API gateways, service mesh, and distributed systems."
    }
  },
  {
    id: "qa-automation-selenium",
    name: "Selenium Test Automation",
    description: "QA agent specialized in Selenium-based test automation",
    category: "QA",
    tags: ["selenium", "automation", "testing", "ci/cd"],
    official: true,
    createdAt: new Date('2024-01-08'),
    downloads: 567,
    config: {
      role: "qa" as AgentType,
      specialization: "Automated Testing",
      capabilities: {
        "Automated Testing": true,
        "Cross-browser Testing": true,
        "API Testing": true,
        "Performance Testing": true,
        "Regression Testing": true
      },
      background: "Selenium automation expert with experience in building robust test frameworks, cross-browser testing, and CI/CD integration."
    }
  }
];

export const EnhancedTemplateLibrary = ({ onTemplateSelect, savedTemplates, onSaveTemplate, onDeleteTemplate }: EnhancedTemplateLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    category: "Custom",
    tags: [] as string[],
    tagInput: ""
  });

  const allTemplates = [...communityTemplates, ...savedTemplates];
  const categories = ["All", ...Array.from(new Set(allTemplates.map(t => t.category)))];

  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template.id);
    onTemplateSelect(template);
  };

  const handleStartFresh = () => {
    setSelectedTemplate(null);
    onTemplateSelect(null);
  };

  const handleCreateTemplate = () => {
    const template: Template = {
      id: `custom_${Date.now()}`,
      name: newTemplate.name,
      description: newTemplate.description,
      category: newTemplate.category,
      tags: newTemplate.tags,
      config: {
        role: "planning" as AgentType,
        specialization: "",
        capabilities: {},
        background: ""
      },
      createdAt: new Date(),
      downloads: 0
    };
    onSaveTemplate(template);
    setShowCreateTemplate(false);
    setNewTemplate({ name: "", description: "", category: "Custom", tags: [], tagInput: "" });
  };

  const addTag = () => {
    if (newTemplate.tagInput.trim() && !newTemplate.tags.includes(newTemplate.tagInput.trim())) {
      setNewTemplate(prev => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: ""
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewTemplate(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Template Library</h2>
        <p className="text-muted-foreground">
          Choose from community templates or create your own custom configuration
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search templates by name, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Dialog open={showCreateTemplate} onOpenChange={setShowCreateTemplate}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Custom Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input
                    id="template-name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter template name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-description">Description</Label>
                  <Textarea
                    id="template-description"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your template"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-category">Category</Label>
                  <Input
                    id="template-category"
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Custom"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newTemplate.tagInput}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, tagInput: e.target.value }))}
                      placeholder="Add tag"
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button type="button" onClick={addTag} size="sm">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {newTemplate.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button onClick={handleCreateTemplate} disabled={!newTemplate.name.trim()} className="w-full">
                  Create Template
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Start Fresh Option */}
      <Card 
        className={`cursor-pointer transition-all hover:shadow-md ${
          selectedTemplate === null ? 'ring-2 ring-primary' : ''
        }`}
        onClick={handleStartFresh}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
              <Edit className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Start from Scratch</h3>
              <p className="text-sm text-muted-foreground">
                Create a completely custom agent configuration
              </p>
            </div>
            {selectedTemplate === null && (
              <Badge className="bg-green-100 text-green-700">Selected</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          const isCustom = !template.official;
          
          return (
            <Card 
              key={template.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleTemplateSelect(template)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-sm">{template.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                      {template.popular && (
                        <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      {template.official && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          Official
                        </Badge>
                      )}
                    </div>
                  </div>
                  {isCustom && (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTemplate(template.id);
                      }}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground mb-3">{template.description}</p>
                
                <div className="space-y-2">
                  <div className="text-xs">
                    <span className="font-medium">Role:</span> {template.config.role}
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">Specialization:</span> {template.config.specialization || 'Not specified'}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {template.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {template.downloads}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {template.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                {isSelected && (
                  <div className="mt-3">
                    <Badge className="w-full justify-center bg-green-100 text-green-700">
                      Selected
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No templates found matching your criteria.</p>
          <Button variant="outline" className="mt-4" onClick={() => setShowCreateTemplate(true)}>
            Create Your First Template
          </Button>
        </div>
      )}
    </div>
  );
};
