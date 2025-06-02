
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Zap, 
  Calendar,
  User,
  Flag,
  Sparkles,
  Send
} from "lucide-react";
import { useAgents } from "@/contexts/AgentContext";
import { useTasks } from "@/contexts/TaskContext";
import { useToast } from "@/hooks/use-toast";

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

  // Natural language parsing keywords
  const priorityKeywords = {
    critical: ["urgent", "critical", "asap", "emergency"],
    high: ["high", "important", "priority"],
    medium: ["medium", "normal"],
    low: ["low", "whenever", "later"]
  };

  const parseQuickInput = (input: string) => {
    const parsed = {
      title: input,
      priority: "medium" as const,
      assignedAgent: "",
      dueDate: ""
    };

    // Extract priority
    for (const [priority, keywords] of Object.entries(priorityKeywords)) {
      if (keywords.some(keyword => input.toLowerCase().includes(keyword))) {
        parsed.priority = priority as any;
        break;
      }
    }

    // Extract agent mentions (e.g., "@backend" or "assign to frontend")
    const agentMatch = input.match(/@(\w+)|assign to (\w+)|for (\w+)/i);
    if (agentMatch) {
      const agentName = agentMatch[1] || agentMatch[2] || agentMatch[3];
      const agent = agents.find(a => 
        a.name.toLowerCase().includes(agentName.toLowerCase()) ||
        a.type.toLowerCase().includes(agentName.toLowerCase())
      );
      if (agent) {
        parsed.assignedAgent = agent.id;
      }
    }

    // Extract dates (basic parsing for "tomorrow", "next week", etc.)
    const dateMatch = input.match(/tomorrow|next week|monday|tuesday|wednesday|thursday|friday/i);
    if (dateMatch) {
      const today = new Date();
      switch (dateMatch[0].toLowerCase()) {
        case "tomorrow":
          today.setDate(today.getDate() + 1);
          parsed.dueDate = today.toISOString().split('T')[0];
          break;
        case "next week":
          today.setDate(today.getDate() + 7);
          parsed.dueDate = today.toISOString().split('T')[0];
          break;
      }
    }

    // Clean title by removing parsed elements
    parsed.title = input
      .replace(/@\w+/g, '')
      .replace(/assign to \w+/gi, '')
      .replace(/for \w+/gi, '')
      .replace(/urgent|critical|asap|emergency|high|important|priority|low|whenever|later/gi, '')
      .replace(/tomorrow|next week|monday|tuesday|wednesday|thursday|friday/gi, '')
      .trim();

    return parsed;
  };

  const handleQuickCreate = () => {
    if (!quickInput.trim()) return;

    const parsed = parseQuickInput(quickInput);
    const newTask = addTask({
      title: parsed.title,
      description: "",
      assignedAgent: parsed.assignedAgent,
      priority: parsed.priority,
      status: defaultStatus as any,
      dueDate: parsed.dueDate,
      deadline: parsed.dueDate,
      category: "quick-add"
    });

    toast({
      title: "Task Created",
      description: `"${parsed.title}" has been added to your tasks`,
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

  const getAgentName = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    return agent?.name || "Unassigned";
  };

  const templates = [
    { name: "Bug Fix", priority: "high", category: "development" },
    { name: "Feature Request", priority: "medium", category: "enhancement" },
    { name: "Research Task", priority: "low", category: "research" },
    { name: "Code Review", priority: "medium", category: "review" }
  ];

  if (!isExpanded) {
    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Quick add: 'Fix login bug @backend high priority tomorrow'"
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
              <span>Try: "@agent", "high priority", "tomorrow", "urgent"</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Create Task</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
              ×
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {templates.map((template) => (
              <Button
                key={template.name}
                variant="outline"
                size="sm"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  title: template.name,
                  priority: template.priority as any,
                  category: template.category
                }))}
                className="text-xs h-8"
              >
                {template.name}
              </Button>
            ))}
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
  );
};
