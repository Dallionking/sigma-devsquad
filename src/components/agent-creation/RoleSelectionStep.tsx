
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Layers, Code, Server, TestTube, FileText, Settings as SettingsIcon } from "lucide-react";
import { AgentType } from "@/types";

interface RoleSelectionStepProps {
  selectedRole: AgentType | null;
  onRoleSelect: (role: AgentType) => void;
}

const roleOptions = [
  {
    type: "planning" as AgentType,
    name: "Planning Agent",
    icon: Layers,
    description: "Analyzes requirements and creates project roadmaps",
    capabilities: ["Requirement Analysis", "Task Prioritization", "Resource Estimation"],
    color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
  },
  {
    type: "frontend" as AgentType,
    name: "Frontend Agent",
    icon: Code,
    description: "Builds user interfaces and client-side functionality",
    capabilities: ["UI Development", "Responsive Design", "State Management"],
    color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
  },
  {
    type: "backend" as AgentType,
    name: "Backend Agent",
    icon: Server,
    description: "Develops server-side logic and API endpoints",
    capabilities: ["API Development", "Database Management", "Authentication"],
    color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400"
  },
  {
    type: "qa" as AgentType,
    name: "QA Agent",
    icon: TestTube,
    description: "Tests functionality and ensures quality standards",
    capabilities: ["Automated Testing", "Manual Testing", "Bug Reporting"],
    color: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400"
  },
  {
    type: "documentation" as AgentType,
    name: "Documentation Agent",
    icon: FileText,
    description: "Creates and maintains project documentation",
    capabilities: ["API Documentation", "User Guides", "Code Comments"],
    color: "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400"
  },
  {
    type: "devops" as AgentType,
    name: "DevOps Agent",
    icon: SettingsIcon,
    description: "Manages deployment and infrastructure automation",
    capabilities: ["CI/CD Pipeline", "Infrastructure as Code", "Monitoring"],
    color: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
  }
];

export const RoleSelectionStep = ({ selectedRole, onRoleSelect }: RoleSelectionStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Select Agent Role</h2>
        <p className="text-muted-foreground">Choose the primary role and responsibilities for your agent</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roleOptions.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.type;
          
          return (
            <Card 
              key={role.type}
              className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                isSelected ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => onRoleSelect(role.type)}
            >
              <CardHeader className="text-center pb-3">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${role.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-lg">{role.name}</CardTitle>
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
  );
};
