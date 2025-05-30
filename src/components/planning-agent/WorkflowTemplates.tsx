import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileTemplate, 
  Plus, 
  Copy, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  Search,
  Filter
} from "lucide-react";

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  createdAt: string;
  lastModified: string;
  usage: number;
  complexity: "simple" | "medium" | "complex";
}

export const WorkflowTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const templates: WorkflowTemplate[] = [
    {
      id: "1",
      name: "Agile Sprint Workflow",
      description: "Standard 2-week sprint cycle with planning, development, and review phases",
      category: "Development",
      tags: ["agile", "sprint", "scrum"],
      createdAt: "2024-05-15",
      lastModified: "2024-05-20",
      usage: 45,
      complexity: "medium"
    },
    {
      id: "2",
      name: "CI/CD Pipeline",
      description: "Continuous integration and deployment workflow with automated testing",
      category: "DevOps",
      tags: ["ci-cd", "automation", "deployment"],
      createdAt: "2024-05-10",
      lastModified: "2024-05-18",
      usage: 32,
      complexity: "complex"
    },
    {
      id: "3",
      name: "Bug Triage Process",
      description: "Systematic approach to bug identification, prioritization, and resolution",
      category: "Quality Assurance",
      tags: ["bugs", "triage", "qa"],
      createdAt: "2024-05-12",
      lastModified: "2024-05-19",
      usage: 28,
      complexity: "simple"
    },
    {
      id: "4",
      name: "Feature Development",
      description: "End-to-end feature development from design to deployment",
      category: "Development",
      tags: ["feature", "development", "full-stack"],
      createdAt: "2024-05-08",
      lastModified: "2024-05-17",
      usage: 38,
      complexity: "complex"
    },
    {
      id: "5",
      name: "Code Review Process",
      description: "Structured code review workflow ensuring quality and knowledge sharing",
      category: "Quality Assurance",
      tags: ["code-review", "quality", "collaboration"],
      createdAt: "2024-05-14",
      lastModified: "2024-05-21",
      usage: 22,
      complexity: "simple"
    }
  ];

  const categories = ["all", "Development", "DevOps", "Quality Assurance", "Planning"];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "simple": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "complex": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Workflow Templates</h3>
          <p className="text-sm text-muted-foreground">Manage and customize workflow templates</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Workflow Template</DialogTitle>
                <DialogDescription>
                  Design a new workflow template for your team
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input id="template-name" placeholder="Enter template name" />
                </div>
                <div>
                  <Label htmlFor="template-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="qa">Quality Assurance</SelectItem>
                      <SelectItem value="planning">Planning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>
                    Create Template
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <FileTemplate className="w-8 h-8 text-primary" />
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription className="mt-2">{template.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Category and Complexity */}
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{template.category}</Badge>
                  <Badge className={getComplexityColor(template.complexity)}>
                    {template.complexity}
                  </Badge>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {template.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Usage Stats */}
                <div className="text-sm text-muted-foreground">
                  <div>Used {template.usage} times</div>
                  <div>Modified {template.lastModified}</div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    Use Template
                  </Button>
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileTemplate className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or create a new template
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create First Template
          </Button>
        </div>
      )}
    </div>
  );
};
