
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, User, Target, Clock, ArrowRight, Plus } from "lucide-react";
import { format } from "date-fns";

interface Agent {
  id: string;
  name: string;
  type: string;
  availability: "available" | "busy" | "offline";
  workload: number; // 0-100
  expertise: string[];
}

interface TaskAssignmentData {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignedAgent: string;
  dueDate: Date | undefined;
  estimatedHours: number;
  tags: string[];
  dependencies: string[];
}

interface EnhancedTaskAssignmentProps {
  agents: Agent[];
  existingTasks: Array<{ id: string; title: string }>;
  onTaskCreate: (task: TaskAssignmentData) => void;
  onCancel: () => void;
}

export const EnhancedTaskAssignment = ({ 
  agents, 
  existingTasks, 
  onTaskCreate, 
  onCancel 
}: EnhancedTaskAssignmentProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [taskData, setTaskData] = useState<TaskAssignmentData>({
    title: "",
    description: "",
    priority: "medium",
    assignedAgent: "",
    dueDate: undefined,
    estimatedHours: 0,
    tags: [],
    dependencies: []
  });
  const [newTag, setNewTag] = useState("");

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !taskData.tags.includes(newTag.trim())) {
      setTaskData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTaskData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const getAgentStatusColor = (availability: string) => {
    switch (availability) {
      case "available": return "bg-green-100 text-green-800";
      case "busy": return "bg-yellow-100 text-yellow-800";
      case "offline": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Task Details</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Task Title</label>
              <Input
                value={taskData.title}
                onChange={(e) => setTaskData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter task title..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={taskData.description}
                onChange={(e) => setTaskData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the task requirements..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select 
                  value={taskData.priority} 
                  onValueChange={(value: "low" | "medium" | "high") => 
                    setTaskData(prev => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Estimated Hours</label>
                <Input
                  type="number"
                  value={taskData.estimatedHours}
                  onChange={(e) => setTaskData(prev => ({ 
                    ...prev, 
                    estimatedHours: Number(e.target.value) 
                  }))}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Agent Assignment</h3>
            
            <div className="space-y-3">
              {agents.map((agent) => (
                <div 
                  key={agent.id} 
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    taskData.assignedAgent === agent.id 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:bg-muted/50"
                  }`}
                  onClick={() => setTaskData(prev => ({ ...prev, assignedAgent: agent.id }))}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-sm text-muted-foreground">{agent.type} Agent</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getAgentStatusColor(agent.availability)}>
                        {agent.availability}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm">Workload</div>
                        <Progress value={agent.workload} className="w-16 h-2" />
                      </div>
                    </div>
                  </div>
                  
                  {agent.expertise.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {agent.expertise.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {agent.expertise.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{agent.expertise.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Scheduling & Dependencies</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {taskData.dueDate ? format(taskData.dueDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={taskData.dueDate}
                    onSelect={(date) => setTaskData(prev => ({ ...prev, dueDate: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Dependencies</label>
              <Select
                onValueChange={(value) => {
                  if (!taskData.dependencies.includes(value)) {
                    setTaskData(prev => ({
                      ...prev,
                      dependencies: [...prev.dependencies, value]
                    }));
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select dependent tasks..." />
                </SelectTrigger>
                <SelectContent>
                  {existingTasks
                    .filter(task => !taskData.dependencies.includes(task.id))
                    .map((task) => (
                      <SelectItem key={task.id} value={task.id}>
                        {task.title}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              
              {taskData.dependencies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {taskData.dependencies.map((depId) => {
                    const task = existingTasks.find(t => t.id === depId);
                    return task ? (
                      <Badge key={depId} variant="secondary">
                        {task.title}
                        <button
                          onClick={() => setTaskData(prev => ({
                            ...prev,
                            dependencies: prev.dependencies.filter(id => id !== depId)
                          }))}
                          className="ml-1 text-xs"
                        >
                          ×
                        </button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tags</label>
              <div className="flex space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag..."
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button onClick={addTag} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {taskData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {taskData.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-xs"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        const assignedAgent = agents.find(a => a.id === taskData.assignedAgent);
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review & Create</h3>
            
            <div className="bg-muted p-4 rounded space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Task:</span>
                <span className="text-right">{taskData.title}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">Assigned to:</span>
                <span className="text-right">{assignedAgent?.name}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">Priority:</span>
                <Badge variant="outline" className={
                  taskData.priority === "high" ? "bg-red-100 text-red-800" :
                  taskData.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                  "bg-green-100 text-green-800"
                }>
                  {taskData.priority}
                </Badge>
              </div>
              
              {taskData.dueDate && (
                <div className="flex justify-between">
                  <span className="font-medium">Due Date:</span>
                  <span className="text-right">{format(taskData.dueDate, "PPP")}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="font-medium">Estimated:</span>
                <span className="text-right">{taskData.estimatedHours}h</span>
              </div>
            </div>
            
            {taskData.description && (
              <div>
                <h4 className="font-medium mb-1">Description</h4>
                <p className="text-sm text-muted-foreground">{taskData.description}</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return taskData.title.trim() && taskData.description.trim();
      case 2: return taskData.assignedAgent;
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Create Task Assignment</span>
          <Badge variant="outline">Step {currentStep} of {totalSteps}</Badge>
        </CardTitle>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        {renderStepContent()}
        
        <div className="flex justify-between">
          <div>
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            {currentStep < totalSteps ? (
              <Button onClick={handleNext} disabled={!canProceed()}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={() => onTaskCreate(taskData)} disabled={!canProceed()}>
                <Target className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
