
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AgentType } from "@/types";

interface SpecializationStepProps {
  selectedRole: AgentType | null;
  specialization: string;
  onSpecializationChange: (specialization: string) => void;
}

const specializationOptions: Record<AgentType, string[]> = {
  planning: [
    "Agile Project Management",
    "Waterfall Project Management",
    "Product Strategy",
    "Technical Architecture",
    "Risk Management",
    "Resource Planning"
  ],
  frontend: [
    "React Development",
    "Vue.js Development",
    "Angular Development",
    "Mobile App Development",
    "UI/UX Design",
    "Performance Optimization"
  ],
  backend: [
    "REST API Development",
    "GraphQL Development",
    "Microservices Architecture",
    "Database Optimization",
    "Cloud Infrastructure",
    "Security Implementation"
  ],
  qa: [
    "Automated Testing",
    "Performance Testing",
    "Security Testing",
    "Mobile App Testing",
    "API Testing",
    "Accessibility Testing"
  ],
  documentation: [
    "Technical Writing",
    "API Documentation",
    "User Manual Creation",
    "Video Tutorials",
    "Interactive Guides",
    "Knowledge Base Management"
  ],
  devops: [
    "AWS Cloud",
    "Azure Cloud",
    "Google Cloud",
    "Kubernetes",
    "Docker Containerization",
    "CI/CD Automation"
  ]
};

export const SpecializationStep = ({ selectedRole, specialization, onSpecializationChange }: SpecializationStepProps) => {
  const options = selectedRole ? specializationOptions[selectedRole] : [];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Define Specialization</h2>
        <p className="text-muted-foreground">
          Choose a specific area of expertise for your {selectedRole} agent
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Specialization Area</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="specialization">Select Specialization</Label>
            <Select value={specialization} onValueChange={onSpecializationChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a specialization area..." />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {specialization && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Selected Specialization:</h4>
              <p className="text-sm text-muted-foreground">
                Your agent will be optimized for <strong>{specialization}</strong> within the {selectedRole} domain.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
