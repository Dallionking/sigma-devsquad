
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Star, Clock, Download } from "lucide-react";

interface RuleTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  rules: number;
  popular: boolean;
  lastUsed?: string;
}

interface RuleTemplateSelectorProps {
  onTemplateSelect: (template: RuleTemplate) => void;
  onClose: () => void;
}

const mockTemplates: RuleTemplate[] = [
  {
    id: "1",
    name: "Performance Monitoring",
    description: "Common rules for monitoring application performance",
    category: "Performance",
    rules: 5,
    popular: true
  },
  {
    id: "2",
    name: "Security Alerts",
    description: "Rules for security incident detection and response",
    category: "Security",
    rules: 8,
    popular: true
  },
  {
    id: "3",
    name: "Code Quality",
    description: "Rules for maintaining code quality standards",
    category: "Quality",
    rules: 6,
    popular: false
  },
  {
    id: "4",
    name: "Deployment Pipeline",
    description: "Automated rules for CI/CD pipeline management",
    category: "DevOps",
    rules: 4,
    popular: true,
    lastUsed: "2024-05-29"
  }
];

export const RuleTemplateSelector = ({ onTemplateSelect, onClose }: RuleTemplateSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(mockTemplates.map(t => t.category))];
  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Rule Templates</h3>
          <p className="text-sm text-muted-foreground">Choose from pre-built rule templates</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.map(template => (
          <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    {template.popular && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  onClick={() => onTemplateSelect(template)}
                  className="flex items-center space-x-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Use</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm mb-3">
                {template.description}
              </CardDescription>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{template.rules} rules</span>
                {template.lastUsed && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Used {new Date(template.lastUsed).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
