
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Wand2 } from "lucide-react";
import { TaskForm } from "./task-creator/TaskForm";
import { TaskTagSelector } from "./task-creator/TaskTagSelector";
import { TaskPreview } from "./task-creator/TaskPreview";

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
        <TaskForm
          title={title}
          description={description}
          priority={priority}
          assignedAgent={assignedAgent}
          estimatedHours={estimatedHours}
          agents={agents}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onPriorityChange={setPriority}
          onAgentChange={setAssignedAgent}
          onHoursChange={setEstimatedHours}
        />

        <TaskTagSelector
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
        />

        <TaskPreview
          title={title}
          priority={priority}
          estimatedHours={estimatedHours[0]}
          assignedAgent={assignedAgent}
        />

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
