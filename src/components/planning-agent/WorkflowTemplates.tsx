
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { WorkflowTemplate } from "@/types/workflow-templates";
import { TemplateCard } from "./TemplateCard";
import { CreateTemplateDialog } from "./CreateTemplateDialog";
import { TemplateFilters } from "./TemplateFilters";
import { TemplateEmptyState } from "./TemplateEmptyState";

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
          <CreateTemplateDialog 
            isOpen={isCreateDialogOpen} 
            onOpenChange={setIsCreateDialogOpen} 
          />
        </div>
      </div>

      {/* Filters */}
      <TemplateFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <TemplateEmptyState onCreateTemplate={() => setIsCreateDialogOpen(true)} />
      )}
    </div>
  );
};
