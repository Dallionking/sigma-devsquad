
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Plus, 
  Wand2, 
  Clock, 
  User, 
  Flag, 
  Target,
  GitBranch,
  Sparkles
} from "lucide-react";

interface EnhancedTaskCreatorProps {
  onCreateTask?: (taskData: any) => void;
}

export const EnhancedTaskCreator = ({ onCreateTask }: EnhancedTaskCreatorProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedAgent, setAssignedAgent] = useState("");
  const [estimatedHours, setEstimatedHours] = useState([8]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const agents = [
    "Planning Agent",
    "Frontend Agent", 
    "Backend Agent",
    "QA Agent",
    "Documentation Agent",
    "DevOps Agent"
  ];

  const suggestedTags = [
    "authentication", "ui", "api", "database", "testing", 
    "documentation", "security", "performance", "mobile", "integration"
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleAIAssist = () => {
    // Simulate AI assistance for task breakdown
    const aiSuggestions = {
      title: "User Authentication System",
      description: "Implement secure user authentication with login, registration, and password recovery features. Include OAuth integration for social login.",
      priority: "high",
      estimatedHours: [16],
      tags: ["authentication", "security", "api"]
    };

    setTitle(aiSuggestions.title);
    setDescription(aiSuggestions.description);
    setPriority(aiSuggestions.priority);
    setEstimatedHours(aiSuggestions.estimatedHours);
    setSelectedTags(aiSuggestions.tags);
  };

  const handleCreateTask = () => {
    if (!title.trim()) return;

    const taskData = {
      title,
      description,
      priority,
      assignedAgent,
      estimatedHours: estimatedHours[0],
      tags: selectedTags,
      createdAt: new Date().toISOString()
    };

    onCreateTask?.(taskData);
    
    // Reset form
    setTitle("");
    setDescription("");
    setPriority("");
    setAssignedAgent("");
    setEstimatedHours([8]);
    setSelectedTags([]);
  };

  return (
    <Card className="card-enhanced">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Enhanced Task Creator
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleAIAssist}
            className="flex items-center gap-2"
          >
            <Wand2 className="w-4 h-4" />
            AI Assist
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Task Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Target className="w-4 h-4" />
            Task Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
          />
        </div>

        {/* Task Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            <Select value={priority} onValueChange={setPriority}>
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
            <Select value={assignedAgent} onValueChange={setAssignedAgent}>
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
            onValueChange={setEstimatedHours}
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

        {/* Tags */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <GitBranch className="w-4 h-4" />
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Visual Feedback */}
        {title && priority && (
          <div className="p-3 bg-muted/50 rounded-lg border space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-medium">Task Preview</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <strong>{title}</strong> • {priority} priority • {estimatedHours[0]}h estimated
              {assignedAgent && ` • Assigned to ${assignedAgent}`}
            </div>
          </div>
        )}

        {/* Create Button */}
        <Button 
          onClick={handleCreateTask}
          disabled={!title.trim() || !priority}
          className="w-full"
          size="lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </Button>
      </CardContent>
    </Card>
  );
};
