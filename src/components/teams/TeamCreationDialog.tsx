
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useTeams } from "@/contexts/TeamContext";
import { TeamType } from "@/types/teams";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeamCreationDialogProps {
  children: React.ReactNode;
}

export const TeamCreationDialog = ({ children }: TeamCreationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<TeamType | "">("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#3B82F6");
  const [objectives, setObjectives] = useState<string[]>([]);
  const [newObjective, setNewObjective] = useState("");
  
  const { createTeam } = useTeams();
  const { toast } = useToast();

  const teamTypes: { value: TeamType; label: string }[] = [
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "devops", label: "DevOps" },
    { value: "qa", label: "QA" },
    { value: "data", label: "Data" },
    { value: "design", label: "Design" },
    { value: "product", label: "Product" }
  ];

  const handleAddObjective = () => {
    if (newObjective.trim() && !objectives.includes(newObjective.trim())) {
      setObjectives([...objectives, newObjective.trim()]);
      setNewObjective("");
    }
  };

  const handleRemoveObjective = (index: number) => {
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  const handleTeamTypeChange = (value: string) => {
    setType(value as TeamType);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !type || !description.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      createTeam({
        name: name.trim(),
        type: type as TeamType,
        description: description.trim(),
        memberIds: [],
        color,
        status: "active",
        objectives,
        kpis: []
      });

      toast({
        title: "Success",
        description: "Team created successfully",
      });

      // Reset form
      setName("");
      setType("");
      setDescription("");
      setColor("#3B82F6");
      setObjectives([]);
      setNewObjective("");
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create team",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="team-name">Team Name *</Label>
            <Input
              id="team-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter team name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team-type">Team Type *</Label>
            <Select value={type} onValueChange={handleTeamTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select team type" />
              </SelectTrigger>
              <SelectContent>
                {teamTypes.map((teamType) => (
                  <SelectItem key={teamType.value} value={teamType.value}>
                    {teamType.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="team-description">Description *</Label>
            <Textarea
              id="team-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the team's purpose and responsibilities"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team-color">Team Color</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                id="team-color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-8 rounded border"
              />
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#3B82F6"
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Team Objectives</Label>
            <div className="flex gap-2">
              <Input
                value={newObjective}
                onChange={(e) => setNewObjective(e.target.value)}
                placeholder="Add an objective"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddObjective();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddObjective}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {objectives.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {objectives.map((objective, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {objective}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 w-4 h-4"
                      onClick={() => handleRemoveObjective(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Team
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
