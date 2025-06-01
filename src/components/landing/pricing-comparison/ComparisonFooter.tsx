
import React from 'react';
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Calculator } from "lucide-react";

export const ComparisonFooter = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth?tab=signup");
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-border/50">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            Ready to experience 99% cost savings with AI-powered development?
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-sm text-vibe-primary hover:text-vibe-secondary transition-colors inline-flex items-center">
            <Calculator className="w-4 h-4 mr-1" />
            Calculate Your Exact Savings
          </button>
          <EnhancedButton 
            variant="enhanced-primary" 
            onClick={handleGetStarted}
            className="px-6"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4 ml-2" />
          </EnhancedButton>
        </div>
      </div>
    </div>
  );
};
