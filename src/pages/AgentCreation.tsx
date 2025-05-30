
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EnhancedAgentCreationFlow } from "@/components/agent-creation/EnhancedAgentCreationFlow";
import { useToast } from "@/hooks/use-toast";

const AgentCreation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateAgent = (config: any) => {
    // Here you would typically send the agent configuration to your backend
    console.log("Creating enhanced agent with configuration:", config);

    toast({
      title: "Agent Created Successfully!",
      description: `${config.name} has been created with enhanced capabilities and is ready to work.`,
    });

    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

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
            <h1 className="text-3xl font-bold">Enhanced Agent Creation</h1>
            <p className="text-muted-foreground">
              Create powerful, customized agents with advanced configuration options
            </p>
          </div>
        </div>

        {/* Enhanced Creation Flow */}
        <EnhancedAgentCreationFlow
          onComplete={handleCreateAgent}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default AgentCreation;
