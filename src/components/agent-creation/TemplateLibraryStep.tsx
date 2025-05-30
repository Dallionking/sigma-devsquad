
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Bot, Star, Clock, Zap, Shield, Code, FileText } from "lucide-react";
import { AgentType } from "@/types";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  config: {
    role: AgentType;
    specialization: string;
    capabilities: Record<string, boolean>;
    background: string;
  };
  popular?: boolean;
  official?: boolean;
}

interface TemplateLibraryStepProps {
  onTemplateSelect: (template: Template | null) => void;
  savedTemplates: Template[];
}

const builtInTemplates: Template[] = [
  {
    id: "react-frontend",
    name: "React Frontend Specialist",
    description: "Optimized for React development with modern hooks and state management",
    category: "Frontend",
    popular: true,
    official: true,
    config: {
      role: "frontend" as AgentType,
      specialization: "React Development",
      capabilities: {
        "UI Component Development": true,
        "Responsive Design": true,
        "State Management": true,
        "Testing Integration": true,
        "Performance Optimization": false
      },
      background: "Expert in React ecosystem including hooks, context, and modern patterns. Familiar with TypeScript, CSS-in-JS, and testing frameworks."
    }
  },
  {
    id: "nodejs-backend",
    name: "Node.js API Developer", 
    description: "Backend specialist for REST API development with Node.js and Express",
    category: "Backend",
    popular: true,
    official: true,
    config: {
      role: "backend" as AgentType,
      specialization: "REST API Development",
      capabilities: {
        "API Development": true,
        "Database Management": true,
        "Authentication & Security": true,
        "Data Validation": true,
        "Monitoring & Logging": true
      },
      background: "Specialized in Node.js, Express.js, and database integration. Expert in REST API design, authentication, and security best practices."
    }
  },
  {
    id: "fullstack-rapid",
    name: "Rapid Prototyping Agent",
    description: "Full-stack agent optimized for quick MVP development",
    category: "Full-Stack",
    popular: true,
    official: true,
    config: {
      role: "planning" as AgentType,
      specialization: "Agile Project Management",
      capabilities: {
        "Requirement Analysis": true,
        "Task Prioritization": true,
        "Resource Estimation": true,
        "Stakeholder Communication": true
      },
      background: "Expert in rapid prototyping methodologies, MVP development, and agile practices. Focused on delivering value quickly."
    }
  },
  {
    id: "qa-automation",
    name: "Test Automation Specialist",
    description: "QA agent focused on automated testing and quality assurance",
    category: "QA",
    official: true,
    config: {
      role: "qa" as AgentType,
      specialization: "Automated Testing",
      capabilities: {
        "Automated Testing": true,
        "API Testing": true,
        "Performance Testing": true,
        "Security Testing": true,
        "Regression Testing": true
      },
      background: "Expert in test automation frameworks, CI/CD integration, and quality assurance best practices."
    }
  },
  {
    id: "devops-kubernetes",
    name: "Kubernetes DevOps Agent",
    description: "DevOps specialist for containerization and Kubernetes orchestration",
    category: "DevOps",
    official: true,
    config: {
      role: "devops" as AgentType,
      specialization: "Kubernetes",
      capabilities: {
        "CI/CD Pipeline": true,
        "Container Management": true,
        "Infrastructure as Code": true,
        "Monitoring & Alerting": true,
        "Security Hardening": true
      },
      background: "Specialized in Kubernetes, Docker, and cloud-native technologies. Expert in container orchestration and infrastructure automation."
    }
  },
  {
    id: "documentation-tech",
    name: "Technical Documentation Expert",
    description: "Documentation agent for technical writing and API docs",
    category: "Documentation",
    official: true,
    config: {
      role: "documentation" as AgentType,
      specialization: "Technical Writing",
      capabilities: {
        "API Documentation": true,
        "User Guides": true,
        "Code Comments": true,
        "Architecture Diagrams": true,
        "Troubleshooting Guides": true
      },
      background: "Expert in technical communication, API documentation tools, and creating clear, comprehensive documentation for developers and end-users."
    }
  }
];

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "frontend": return Code;
    case "backend": return Shield;
    case "full-stack": return Zap;
    case "qa": return FileText;
    case "devops": return Bot;
    case "documentation": return FileText;
    default: return Bot;
  }
};

export const TemplateLibraryStep = ({ onTemplateSelect, savedTemplates }: TemplateLibraryStepProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const allTemplates = [...builtInTemplates, ...savedTemplates];
  const categories = ["All", ...Array.from(new Set(allTemplates.map(t => t.category)))];

  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Choose Your Starting Point</h2>
        <p className="text-muted-foreground">
          Select a template to get started quickly, or start from scratch
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
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
              <Zap className="w-6 h-6" />
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
          const Icon = getCategoryIcon(template.category);
          const isSelected = selectedTemplate === template.id;
          
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
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-sm">{template.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
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
                    {!template.official && (
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                        <Clock className="w-3 h-3 mr-1" />
                        Custom
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">{template.description}</p>
                
                <div className="mt-3 space-y-2">
                  <div className="text-xs">
                    <span className="font-medium">Role:</span> {template.config.role}
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">Specialization:</span> {template.config.specialization}
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">Capabilities:</span> {Object.keys(template.config.capabilities).filter(k => template.config.capabilities[k]).length} enabled
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
        </div>
      )}
    </div>
  );
};
