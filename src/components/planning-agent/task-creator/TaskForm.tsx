
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Target, Flag, User, Clock } from "lucide-react";

interface TaskFormProps {
  title: string;
  description: string;
  priority: string;
  assignedAgent: string;
  estimatedHours: number[];
  agents: string[];
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onPriorityChange: (priority: string) => void;
  onAgentChange: (agent: string) => void;
  onHoursChange: (hours: number[]) => void;
}

export const TaskForm = ({
  title,
  description,
  priority,
  assignedAgent,
  estimatedHours,
  agents,
  onTitleChange,
  onDescriptionChange,
  onPriorityChange,
  onAgentChange,
  onHoursChange
}: TaskFormProps) => {
  return (
    <div className="space-y-4">
      {/* Task Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Target className="w-4 h-4" />
          Task Title
        </label>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter task title..."
        />
      </div>

      {/* Task Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Describe the task requirements and acceptance criteria..."
          rows={3}
        />
      </div>

      {/* Priority and Agent Assignment */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Flag className="w-4 h-4" />
            Priority
          </label>
          <Select value={priority} onValueChange={onPriorityChange}>
            <SelectTrigger>
              <SelectValue placeholder="Set priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4" />
            Assign to Agent
          </label>
          <Select value={assignedAgent} onValueChange={onAgentChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select agent" />
            </SelectTrigger>
            <SelectContent>
              {agents.map((agent) => (
                <SelectItem key={agent} value={agent}>
                  {agent}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Estimated Hours */}
      <div className="space-y-3">
        <label className="text-sm font-medium flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Estimated Hours: {estimatedHours[0]}h
        </label>
        <Slider
          value={estimatedHours}
          onValueChange={onHoursChange}
          max={80}
          min={1}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1h</span>
          <span>40h</span>
          <span>80h</span>
        </div>
      </div>
    </div>
  );
};
