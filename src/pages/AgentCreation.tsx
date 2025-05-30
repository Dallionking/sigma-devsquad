
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RoleSelectionStep } from "@/components/agent-creation/RoleSelectionStep";
import { SpecializationStep } from "@/components/agent-creation/SpecializationStep";
import { CapabilitySelectionStep } from "@/components/agent-creation/CapabilitySelectionStep";
import { BackgroundConfigStep } from "@/components/agent-creation/BackgroundConfigStep";
import { AgentNamingStep } from "@/components/agent-creation/AgentNamingStep";
import { CloneAgentStep } from "@/components/agent-creation/CloneAgentStep";
import { AgentType } from "@/types";
import { mockAgents } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const AgentCreation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [creationMethod, setCreationMethod] = useState<"new" | "clone">("new");
  
  // Agent configuration state
  const [selectedRole, setSelectedRole] = useState<AgentType | null>(null);
  const [specialization, setSpecialization] = useState("");
  const [capabilities, setCapabilities] = useState<Record<string, boolean>>({});
  const [background, setBackground] = useState("");
  const [agentName, setAgentName] = useState("");
  const [agentIcon, setAgentIcon] = useState("Bot");
  const [selectedCloneAgent, setSelectedCloneAgent] = useState<string | null>(null);

  const steps = [
    { 
      id: "method", 
      title: "Creation Method", 
      description: "Choose how to create your agent"
    },
    { 
      id: "role", 
      title: "Role Selection", 
      description: "Select agent role and responsibilities"
    },
    { 
      id: "specialization", 
      title: "Specialization", 
      description: "Define specific expertise area"
    },
    { 
      id: "capabilities", 
      title: "Capabilities", 
      description: "Configure agent capabilities"
    },
    { 
      id: "background", 
      title: "Background", 
      description: "Set context and knowledge"
    },
    { 
      id: "naming", 
      title: "Identity", 
      description: "Name and customize your agent"
    },
    { 
      id: "review", 
      title: "Review", 
      description: "Review and create agent"
    }
  ];

  const filteredSteps = creationMethod === "clone" 
    ? steps.filter(step => step.id !== "role" && step.id !== "specialization")
    : steps.filter(step => step.id !== "method" || currentStep === 0);

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true; // Method selection
      case 1: return creationMethod === "clone" ? selectedCloneAgent !== null : selectedRole !== null;
      case 2: return specialization !== "";
      case 3: return Object.keys(capabilities).length > 0;
      case 4: return true; // Background is optional
      case 5: return agentName.trim() !== "";
      case 6: return true; // Review step
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < filteredSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateAgent = () => {
    // Here you would typically send the agent configuration to your backend
    console.log("Creating agent with configuration:", {
      method: creationMethod,
      role: selectedRole,
      specialization,
      capabilities,
      background,
      name: agentName,
      icon: agentIcon,
      cloneFrom: selectedCloneAgent
    });

    toast({
      title: "Agent Created Successfully!",
      description: `${agentName} has been created and is ready to work.`,
    });

    navigate("/");
  };

  const renderStepContent = () => {
    const stepId = filteredSteps[currentStep]?.id;
    
    switch (stepId) {
      case "method":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">How would you like to create your agent?</h2>
              <p className="text-muted-foreground">Choose your preferred creation method</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  creationMethod === "new" ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setCreationMethod("new")}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold">Create New Agent</h3>
                  <p className="text-muted-foreground">Start from scratch and configure every aspect of your agent</p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  creationMethod === "clone" ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setCreationMethod("clone")}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold">Clone Existing Agent</h3>
                  <p className="text-muted-foreground">Use an existing agent as a template and customize it</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case "role":
        return (
          <RoleSelectionStep
            selectedRole={selectedRole}
            onRoleSelect={setSelectedRole}
          />
        );
      
      case "specialization":
        return (
          <SpecializationStep
            selectedRole={selectedRole}
            specialization={specialization}
            onSpecializationChange={setSpecialization}
          />
        );
      
      case "capabilities":
        return (
          <CapabilitySelectionStep
            selectedRole={selectedRole}
            capabilities={capabilities}
            onCapabilitiesChange={setCapabilities}
          />
        );
      
      case "background":
        return (
          <BackgroundConfigStep
            background={background}
            onBackgroundChange={setBackground}
          />
        );
      
      case "naming":
        return (
          <AgentNamingStep
            name={agentName}
            icon={agentIcon}
            onNameChange={setAgentName}
            onIconChange={setAgentIcon}
          />
        );
      
      default:
        if (creationMethod === "clone" && currentStep === 1) {
          return (
            <CloneAgentStep
              selectedAgent={selectedCloneAgent}
              onAgentSelect={setSelectedCloneAgent}
              availableAgents={mockAgents}
            />
          );
        }
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Review Your Agent</h2>
              <p className="text-muted-foreground">Review your agent configuration before creating</p>
            </div>
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Creation Method:</strong> {creationMethod}</div>
                  <div><strong>Name:</strong> {agentName}</div>
                  {creationMethod === "new" && (
                    <>
                      <div><strong>Role:</strong> {selectedRole}</div>
                      <div><strong>Specialization:</strong> {specialization}</div>
                    </>
                  )}
                  {creationMethod === "clone" && (
                    <div><strong>Clone From:</strong> {mockAgents.find(a => a.id === selectedCloneAgent)?.name}</div>
                  )}
                  <div><strong>Capabilities:</strong> {Object.keys(capabilities).filter(k => capabilities[k]).length} enabled</div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  const progress = ((currentStep + 1) / filteredSteps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Create New Agent</h1>
            <Progress value={progress} className="w-full max-w-md" />
            <p className="text-muted-foreground">
              Step {currentStep + 1} of {filteredSteps.length}: {filteredSteps[currentStep]?.description}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep === filteredSteps.length - 1 ? (
            <Button onClick={handleCreateAgent} disabled={!canProceed()}>
              Create Agent
              <Check className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!canProceed()}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentCreation;
