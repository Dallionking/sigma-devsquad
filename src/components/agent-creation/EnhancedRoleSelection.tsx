
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bot, Layers, Code, Server, TestTube, FileText, Settings as SettingsIcon, Plus, Star, Users } from "lucide-react";
import { AgentType } from "@/types";

interface CustomRole {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  category: string;
  icon: string;
  color: string;
}

interface EnhancedRoleSelectionProps {
  selectedRole: AgentType | null;
  customRole: string;
  onRoleSelect: (role: AgentType | null) => void;
  onCustomRoleChange: (role: string) => void;
  customRoles: CustomRole[];
  onAddCustomRole: (role: CustomRole) => void;
}

const standardRoles = [
  {
    type: "planning" as AgentType,
    name: "Planning Agent",
    icon: Layers,
    description: "Analyzes requirements and creates project roadmaps",
    capabilities: ["Requirement Analysis", "Task Prioritization", "Resource Estimation"],
    color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
    category: "Management"
  },
  {
    type: "frontend" as AgentType,
    name: "Frontend Agent",
    icon: Code,
    description: "Builds user interfaces and client-side functionality",
    capabilities: ["UI Development", "Responsive Design", "State Management"],
    color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
    category: "Development"
  },
  {
    type: "backend" as AgentType,
    name: "Backend Agent",
    icon: Server,
    description: "Develops server-side logic and API endpoints",
    capabilities: ["API Development", "Database Management", "Authentication"],
    color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
    category: "Development"
  },
  {
    type: "qa" as AgentType,
    name: "QA Agent",
    icon: TestTube,
    description: "Tests functionality and ensures quality standards",
    capabilities: ["Automated Testing", "Manual Testing", "Bug Reporting"],
    color: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400",
    category: "Quality"
  },
  {
    type: "documentation" as AgentType,
    name: "Documentation Agent",
    icon: FileText,
    description: "Creates and maintains project documentation",
    capabilities: ["API Documentation", "User Guides", "Code Comments"],
    color: "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400",
    category: "Documentation"
  },
  {
    type: "devops" as AgentType,
    name: "DevOps Agent",
    icon: SettingsIcon,
    description: "Manages deployment and infrastructure automation",
    capabilities: ["CI/CD Pipeline", "Infrastructure as Code", "Monitoring"],
    color: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400",
    category: "Operations"
  }
];

export const EnhancedRoleSelection = ({ 
  selectedRole, 
  customRole,
  onRoleSelect,
  onCustomRoleChange,
  customRoles,
  onAddCustomRole
}: EnhancedRoleSelectionProps) => {
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    capabilities: [] as string[],
    category: "Custom",
    capabilityInput: ""
  });

  const allCategories = ["All", "Management", "Development", "Quality", "Documentation", "Operations", "Custom"];
  
  const filteredStandardRoles = selectedCategory === "All" || selectedCategory === "Custom" 
    ? standardRoles 
    : standardRoles.filter(role => role.category === selectedCategory);

  const filteredCustomRoles = selectedCategory === "All" || selectedCategory === "Custom"
    ? customRoles
    : customRoles.filter(role => role.category === selectedCategory);

  const handleCreateRole = () => {
    const role: CustomRole = {
      id: `custom_${Date.now()}`,
      name: newRole.name,
      description: newRole.description,
      capabilities: newRole.capabilities,
      category: newRole.category,
      icon: "Bot",
      color: "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400"
    };
    onAddCustomRole(role);
    onCustomRoleChange(role.name);
    setShowCreateRole(false);
    setNewRole({ name: "", description: "", capabilities: [], category: "Custom", capabilityInput: "" });
  };

  const addCapability = () => {
    if (newRole.capabilityInput.trim() && !newRole.capabilities.includes(newRole.capabilityInput.trim())) {
      setNewRole(prev => ({
        ...prev,
        capabilities: [...prev.capabilities, prev.capabilityInput.trim()],
        capabilityInput: ""
      }));
    }
  };

  const removeCapability = (capToRemove: string) => {
    setNewRole(prev => ({
      ...prev,
      capabilities: prev.capabilities.filter(cap => cap !== capToRemove)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Define Agent Role</h2>
        <p className="text-muted-foreground">
          Choose from standard roles or create your own custom agent role
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {allCategories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Create Custom Role Button */}
      <div className="flex justify-center">
        <Dialog open={showCreateRole} onOpenChange={setShowCreateRole}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Custom Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Custom Agent Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input
                  id="role-name"
                  value={newRole.name}
                  onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Data Science Agent, Mobile App Agent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-description">Description</Label>
                <Textarea
                  id="role-description"
                  value={newRole.description}
                  onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this agent specializes in and its primary responsibilities"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-category">Category</Label>
                <Input
                  id="role-category"
                  value={newRole.category}
                  onChange={(e) => setNewRole(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Custom"
                />
              </div>
              <div className="space-y-2">
                <Label>Key Capabilities</Label>
                <div className="flex gap-2">
                  <Input
                    value={newRole.capabilityInput}
                    onChange={(e) => setNewRole(prev => ({ ...prev, capabilityInput: e.target.value }))}
                    placeholder="Add capability"
                    onKeyPress={(e) => e.key === 'Enter' && addCapability()}
                  />
                  <Button type="button" onClick={addCapability} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {newRole.capabilities.map(cap => (
                    <Badge key={cap} variant="secondary" className="cursor-pointer" onClick={() => removeCapability(cap)}>
                      {cap} ×
                    </Badge>
                  ))}
                </div>
              </div>
              <Button 
                onClick={handleCreateRole} 
                disabled={!newRole.name.trim() || !newRole.description.trim()} 
                className="w-full"
              >
                Create Role
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Standard Roles Grid */}
      {(selectedCategory === "All" || selectedCategory !== "Custom") && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold">Standard Roles</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStandardRoles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.type;
              
              return (
                <Card 
                  key={role.type}
                  className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                    isSelected ? 'ring-2 ring-primary shadow-lg' : ''
                  }`}
                  onClick={() => {
                    onRoleSelect(role.type);
                    onCustomRoleChange("");
                  }}
                >
                  <CardHeader className="text-center pb-3">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${role.color}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {role.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm text-center">{role.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Key Capabilities:</h4>
                      <div className="flex flex-wrap gap-1">
                        {role.capabilities.map((capability) => (
                          <Badge key={capability} variant="secondary" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="pt-2">
                        <Badge className="w-full justify-center">Selected</Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Custom Roles Grid */}
      {filteredCustomRoles.length > 0 && (selectedCategory === "All" || selectedCategory === "Custom") && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Custom Roles</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomRoles.map((role) => {
              const isSelected = customRole === role.name;
              
              return (
                <Card 
                  key={role.id}
                  className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                    isSelected ? 'ring-2 ring-primary shadow-lg' : ''
                  }`}
                  onClick={() => {
                    onRoleSelect(null);
                    onCustomRoleChange(role.name);
                  }}
                >
                  <CardHeader className="text-center pb-3">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${role.color}`}>
                      <Bot className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {role.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm text-center">{role.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Key Capabilities:</h4>
                      <div className="flex flex-wrap gap-1">
                        {role.capabilities.map((capability) => (
                          <Badge key={capability} variant="secondary" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="pt-2">
                        <Badge className="w-full justify-center">Selected</Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
