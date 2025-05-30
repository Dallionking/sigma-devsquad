
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useTeams } from "@/contexts/TeamContext";
import { TeamRole, AgentSpecialization } from "@/types/teams";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AgentAdditionDialogProps {
  teamId: string;
  children: React.ReactNode;
}

export const AgentAdditionDialog = ({ teamId, children }: AgentAdditionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState<TeamRole | "">("");
  const [specialization, setSpecialization] = useState<AgentSpecialization | "">("");
  const [bio, setBio] = useState("");
  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [newFramework, setNewFramework] = useState("");
  const [experience, setExperience] = useState(1);
  
  const { createAgentProfile } = useTeams();
  const { toast } = useToast();

  const roles: { value: TeamRole; label: string }[] = [
    { value: "lead", label: "Lead" },
    { value: "senior", label: "Senior" },
    { value: "mid", label: "Mid-Level" },
    { value: "junior", label: "Junior" }
  ];

  const specializations: { value: AgentSpecialization; label: string }[] = [
    { value: "ui-ux-designer", label: "UI/UX Designer" },
    { value: "component-developer", label: "Component Developer" },
    { value: "react-specialist", label: "React Specialist" },
    { value: "api-developer", label: "API Developer" },
    { value: "database-engineer", label: "Database Engineer" },
    { value: "system-architect", label: "System Architect" },
    { value: "infrastructure-engineer", label: "Infrastructure Engineer" },
    { value: "security-expert", label: "Security Expert" },
    { value: "test-engineer", label: "Test Engineer" },
    { value: "automation-specialist", label: "Automation Specialist" },
    { value: "data-engineer", label: "Data Engineer" },
    { value: "ml-engineer", label: "ML Engineer" },
    { value: "product-designer", label: "Product Designer" },
    { value: "product-manager", label: "Product Manager" }
  ];

  const handleAddFramework = () => {
    if (newFramework.trim() && !frameworks.includes(newFramework.trim())) {
      setFrameworks([...frameworks, newFramework.trim()]);
      setNewFramework("");
    }
  };

  const handleRemoveFramework = (index: number) => {
    setFrameworks(frameworks.filter((_, i) => i !== index));
  };

  const handleRoleChange = (value: string) => {
    setRole(value as TeamRole);
  };

  const handleSpecializationChange = (value: string) => {
    setSpecialization(value as AgentSpecialization);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !role || !specialization || !bio.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      createAgentProfile({
        name: name.trim(),
        teamId,
        role: role as TeamRole,
        specialization: specialization as AgentSpecialization,
        skills: [], // Can be expanded later
        frameworks,
        experience,
        availability: "available",
        performanceRating: 4.0,
        communicationPreference: "direct",
        avatar: `/avatars/${name.toLowerCase().replace(/\s+/g, '')}.jpg`,
        bio: bio.trim()
      });

      toast({
        title: "Success",
        description: "Agent added to team successfully",
      });

      // Reset form
      setName("");
      setRole("");
      setSpecialization("");
      setBio("");
      setFrameworks([]);
      setNewFramework("");
      setExperience(1);
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add agent to team",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="agent-name">Name *</Label>
            <Input
              id="agent-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter agent name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agent-role">Role *</Label>
            <Select value={role} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="agent-specialization">Specialization *</Label>
            <Select value={specialization} onValueChange={handleSpecializationChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select specialization" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((spec) => (
                  <SelectItem key={spec.value} value={spec.value}>
                    {spec.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="agent-experience">Experience (years)</Label>
            <Input
              id="agent-experience"
              type="number"
              min="1"
              max="20"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agent-bio">Bio *</Label>
            <Textarea
              id="agent-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Describe the agent's background and expertise"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Frameworks & Technologies</Label>
            <div className="flex gap-2">
              <Input
                value={newFramework}
                onChange={(e) => setNewFramework(e.target.value)}
                placeholder="Add a framework"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFramework();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddFramework}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {frameworks.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {frameworks.map((framework, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {framework}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 w-4 h-4"
                      onClick={() => handleRemoveFramework(index)}
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
              Add Agent
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
