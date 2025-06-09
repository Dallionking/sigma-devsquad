
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Zap, 
  Send,
  Sparkles
} from "lucide-react";
import { useAgents } from "@/contexts/AgentContext";
import { useTasks } from "@/contexts/TaskContext";
import { useToast } from "@/hooks/use-toast";
import { TaskErrorBoundary } from "./shared/ErrorBoundary";

interface QuickTaskCreatorProps {
  onTaskCreated?: (task: any) => void;
  defaultStatus?: string;
  defaultDate?: Date;
}

export const QuickTaskCreator = ({ 
  onTaskCreated, 
  defaultStatus = "pending",
  defaultDate 
}: QuickTaskCreatorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quickInput, setQuickInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    assignedAgent: "",
    dueDate: defaultDate ? defaultDate.toISOString().split('T')[0] : "",
    category: ""
  });

  const { agents } = useAgents();
  const { addTask } = useTasks();
  const { toast } = useToast();

  const handleQuickCreate = () => {
    if (!quickInput.trim()) return;

    const newTask = addTask({
      title: quickInput,
      description: "",
      assignedAgent: "",
      priority: "medium",
      status: defaultStatus as any,
      dueDate: "",
      deadline: "",
      category: "quick-add"
    });

    toast({
      title: "Task Created",
      description: `"${quickInput}" has been added to your tasks`,
    });

    setQuickInput("");
    onTaskCreated?.(newTask);
  };

  const handleDetailedCreate = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a task title",
        variant: "destructive"
      });
      return;
    }

    const newTask = addTask({
      title: formData.title,
      description: formData.description,
      assignedAgent: formData.assignedAgent,
      priority: formData.priority,
      status: defaultStatus as any,
      dueDate: formData.dueDate,
      deadline: formData.dueDate,
      category: formData.category || "manual"
    });

    toast({
      title: "Task Created",
      description: `"${formData.title}" has been created successfully`,
    });

    setFormData({
      title: "",
      description: "",
      priority: "medium",
      assignedAgent: "",
      dueDate: defaultDate ? defaultDate.toISOString().split('T')[0] : "",
      category: ""
    });
    setIsExpanded(false);
    onTaskCreated?.(newTask);
  };

  if (!isExpanded) {
    return (
      <TaskErrorBoundary>
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Quick add task..."
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleQuickCreate()}
                  className="flex-1"
                />
                <Button onClick={handleQuickCreate} disabled={!quickInput.trim()}>
                  <Zap className="w-4 h-4 mr-1" />
                  Add
                </Button>
                <Button variant="outline" onClick={() => setIsExpanded(true)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="w-3 h-3" />
                <span>Click + for detailed task creation</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TaskErrorBoundary>
    );
  }

  return (
    <TaskErrorBoundary>
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Create Task</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
                ×
              </Button>
            </div>

            <div className="space-y-3">
              <Input
                placeholder="Task title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />

              <Textarea
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
              />

              <div className="grid grid-cols-2 gap-3">
                <Select value={formData.priority} onValueChange={(value: any) => setFormData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={formData.assignedAgent} onValueChange={(value) => setFormData(prev => ({ ...prev, assignedAgent: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Assign to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {agents.map(agent => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                />

                <Input
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsExpanded(false)}>
                  Cancel
                </Button>
                <Button onClick={handleDetailedCreate}>
                  <Send className="w-4 h-4 mr-1" />
                  Create Task
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TaskErrorBoundary>
  );
};
