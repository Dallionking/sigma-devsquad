
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface CreateTemplateDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateTemplateDialog = ({ isOpen, onOpenChange }: CreateTemplateDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="btn-primary-enhanced gap-2 hover-scale">
          <Plus className="w-4 h-4" />
          Create Template
        </Button>
      </DialogTrigger>
      <DialogContent className="card-enhanced">
        <DialogHeader>
          <DialogTitle className="heading-secondary text-xl">
            Create New Workflow Template
          </DialogTitle>
          <DialogDescription className="text-muted-enhanced">
            Design a new workflow template for your team
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-responsive">
          <div>
            <Label htmlFor="template-name" className="text-responsive-sm font-medium">
              Template Name
            </Label>
            <Input 
              id="template-name" 
              placeholder="Enter template name" 
              className="mt-2 transition-all duration-200 focus:scale-[1.01]"
            />
          </div>
          <div>
            <Label htmlFor="template-category" className="text-responsive-sm font-medium">
              Category
            </Label>
            <Select>
              <SelectTrigger className="mt-2 transition-all duration-200 focus:scale-[1.01]">
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
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="btn-secondary-enhanced"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => onOpenChange(false)}
              className="btn-primary-enhanced"
            >
              Create Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
