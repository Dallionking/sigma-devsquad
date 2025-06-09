
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
      complexity: "medium",
      nodes: [
        {
          id: "start-1",
          type: "start",
          title: "Sprint Planning",
          position: { x: 100, y: 100 }
        },
        {
          id: "task-1",
          type: "task",
          title: "Development Phase",
          position: { x: 300, y: 100 }
        },
        {
          id: "end-1",
          type: "end",
          title: "Sprint Review",
          position: { x: 500, y: 100 }
        }
      ],
      connections: [
        {
          id: "conn-1",
          fromNodeId: "start-1",
          toNodeId: "task-1"
        },
        {
          id: "conn-2",
          fromNodeId: "task-1",
          toNodeId: "end-1"
        }
      ]
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
      complexity: "complex",
      nodes: [
        {
          id: "start-2",
          type: "start",
          title: "Code Commit",
          position: { x: 100, y: 100 }
        },
        {
          id: "task-2",
          type: "task",
          title: "Build & Test",
          position: { x: 300, y: 100 }
        },
        {
          id: "decision-1",
          type: "decision",
          title: "Tests Pass?",
          position: { x: 500, y: 100 }
        },
        {
          id: "end-2",
          type: "end",
          title: "Deploy",
          position: { x: 700, y: 100 }
        }
      ],
      connections: [
        {
          id: "conn-3",
          fromNodeId: "start-2",
          toNodeId: "task-2"
        },
        {
          id: "conn-4",
          fromNodeId: "task-2",
          toNodeId: "decision-1"
        },
        {
          id: "conn-5",
          fromNodeId: "decision-1",
          toNodeId: "end-2"
        }
      ]
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
      complexity: "simple",
      nodes: [
        {
          id: "start-3",
          type: "start",
          title: "Bug Report",
          position: { x: 100, y: 100 }
        },
        {
          id: "task-3",
          type: "task",
          title: "Investigate",
          position: { x: 300, y: 100 }
        },
        {
          id: "end-3",
          type: "end",
          title: "Resolve",
          position: { x: 500, y: 100 }
        }
      ],
      connections: [
        {
          id: "conn-6",
          fromNodeId: "start-3",
          toNodeId: "task-3"
        },
        {
          id: "conn-7",
          fromNodeId: "task-3",
          toNodeId: "end-3"
        }
      ]
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
      complexity: "complex",
      nodes: [
        {
          id: "start-4",
          type: "start",
          title: "Requirements",
          position: { x: 100, y: 100 }
        },
        {
          id: "task-4",
          type: "task",
          title: "Design",
          position: { x: 300, y: 100 }
        },
        {
          id: "task-5",
          type: "task",
          title: "Development",
          position: { x: 500, y: 100 }
        },
        {
          id: "end-4",
          type: "end",
          title: "Deploy",
          position: { x: 700, y: 100 }
        }
      ],
      connections: [
        {
          id: "conn-8",
          fromNodeId: "start-4",
          toNodeId: "task-4"
        },
        {
          id: "conn-9",
          fromNodeId: "task-4",
          toNodeId: "task-5"
        },
        {
          id: "conn-10",
          fromNodeId: "task-5",
          toNodeId: "end-4"
        }
      ]
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
      complexity: "simple",
      nodes: [
        {
          id: "start-5",
          type: "start",
          title: "Submit PR",
          position: { x: 100, y: 100 }
        },
        {
          id: "task-6",
          type: "task",
          title: "Review Code",
          position: { x: 300, y: 100 }
        },
        {
          id: "end-5",
          type: "end",
          title: "Merge",
          position: { x: 500, y: 100 }
        }
      ],
      connections: [
        {
          id: "conn-11",
          fromNodeId: "start-5",
          toNodeId: "task-6"
        },
        {
          id: "conn-12",
          fromNodeId: "task-6",
          toNodeId: "end-5"
        }
      ]
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
