
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";
import { ResponsiveText } from "./ResponsiveText";

interface TaskCreationViewProps {
  taskData: {
    title: string;
    description: string;
    priority: "low" | "medium" | "high" | "critical";
    dueDate: string;
  };
  setTaskData: (data: any) => void;
  onSubmitTask: () => void;
}

export const TaskCreationView = ({
  taskData,
  setTaskData,
  onSubmitTask
}: TaskCreationViewProps) => {
  return (
    <div className="p-3 sm:p-4 space-y-4 overflow-y-auto mobile-safe-area">
      <div className="space-y-4">
        <div>
          <ResponsiveText 
            variant="default" 
            className="font-weight-responsive mb-2 block contrast-enhanced"
          >
            Task Title
          </ResponsiveText>
          <Input
            placeholder="Enter task title"
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
            className="text-responsive-sm no-zoom min-h-[44px] touch-manipulation"
          />
        </div>

        <div>
          <ResponsiveText 
            variant="default" 
            className="font-weight-responsive mb-2 block contrast-enhanced"
          >
            Description
          </ResponsiveText>
          <Textarea
            placeholder="Describe the task..."
            value={taskData.description}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
            rows={3}
            className="text-responsive-sm no-zoom min-h-[60px] touch-manipulation"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <ResponsiveText 
              variant="default" 
              className="font-weight-responsive mb-2 block contrast-enhanced"
            >
              Priority
            </ResponsiveText>
            <Select value={taskData.priority} onValueChange={(value: any) => setTaskData({ ...taskData, priority: value })}>
              <SelectTrigger className="text-responsive-sm min-h-[44px] touch-manipulation">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-50 bg-background border shadow-lg">
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <ResponsiveText 
              variant="default" 
              className="font-weight-responsive mb-2 block contrast-enhanced"
            >
              Due Date
            </ResponsiveText>
            <Input
              type="datetime-local"
              value={taskData.dueDate}
              onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
              className="text-responsive-sm no-zoom min-h-[44px] touch-manipulation"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={onSubmitTask} 
            className="flex-1 text-responsive-sm btn-mobile min-h-[48px] touch-manipulation active:scale-95"
          >
            <Send className="w-4 h-4 mr-2" />
            Assign Task
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setTaskData({ title: "", description: "", priority: "medium", dueDate: "" })}
            className="text-responsive-sm btn-mobile min-h-[48px] touch-manipulation active:scale-95"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};
