
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

interface TemplateEmptyStateProps {
  onCreateTemplate: () => void;
}

export const TemplateEmptyState = ({ onCreateTemplate }: TemplateEmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium text-foreground mb-2">No templates found</h3>
      <p className="text-muted-foreground mb-4">
        Try adjusting your search criteria or create a new template
      </p>
      <Button onClick={onCreateTemplate}>
        <Plus className="w-4 h-4 mr-2" />
        Create First Template
      </Button>
    </div>
  );
};
