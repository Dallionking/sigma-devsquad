
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Copy, Edit, Download } from "lucide-react";
import { WorkflowTemplate } from "@/types/workflow-templates";

interface TemplateCardProps {
  template: WorkflowTemplate;
}

export const TemplateCard = ({ template }: TemplateCardProps) => {
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "simple": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "complex": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <FileText className="w-8 h-8 text-primary" />
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
  );
};
