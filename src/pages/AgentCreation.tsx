
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EnhancedAgentCreationFlow } from "@/components/agent-creation/EnhancedAgentCreationFlow";
import { useToast } from "@/hooks/use-toast";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { useIsMobile } from "@/hooks/use-mobile";

const AgentCreation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

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
      <ResponsiveContainer padding={isMobile ? "sm" : "lg"}>
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
            size={isMobile ? "sm" : "default"}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Command Center
          </Button>
          
          <div className="space-y-2">
            <h1 className={`font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent ${
              isMobile ? 'text-2xl' : 'text-3xl'
            }`}>
              Enhanced Agent Creation
            </h1>
            <p className={`text-muted-foreground ${isMobile ? 'text-sm' : 'text-base'}`}>
              Create powerful, customized agents with advanced configuration options
            </p>
          </div>
        </div>

        {/* Enhanced Creation Flow */}
        <EnhancedAgentCreationFlow
          onComplete={handleCreateAgent}
          onCancel={handleCancel}
        />
      </ResponsiveContainer>
    </div>
  );
};

export default AgentCreation;
