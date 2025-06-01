
import React, { useState } from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Users } from "lucide-react";
import { ComparisonTriggerButton } from "./pricing-comparison/ComparisonTriggerButton";
import { ComparisonCard } from "./pricing-comparison/ComparisonCard";
import { AIToolsComparisonTable } from "./pricing-comparison/AIToolsComparisonTable";
import { DevTeamComparisonTable } from "./pricing-comparison/DevTeamComparisonTable";
import { ComparisonFooter } from "./pricing-comparison/ComparisonFooter";

export const PricingComparisonSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="py-8">
      <AnimatedSection animation="fade-up" delay={100}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ComparisonTriggerButton 
              isExpanded={isExpanded}
              onToggle={() => setIsExpanded(!isExpanded)}
            />

            {/* Expandable Content */}
            <div
              id="comparison-content"
              className={`overflow-hidden transition-all duration-500 ease-out ${
                isExpanded ? 'max-h-[800px] opacity-100 mt-6' : 'max-h-0 opacity-0'
              }`}
            >
              <ComparisonCard>
                <Tabs defaultValue="ai-tools" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="ai-tools" className="flex items-center space-x-2">
                      <Code className="w-4 h-4" />
                      <span>AI Tools Comparison</span>
                    </TabsTrigger>
                    <TabsTrigger value="dev-teams" className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Dev Team Cost Comparison</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="ai-tools" className="space-y-4">
                    <AIToolsComparisonTable />
                  </TabsContent>

                  <TabsContent value="dev-teams" className="space-y-4">
                    <DevTeamComparisonTable />
                  </TabsContent>
                </Tabs>

                <ComparisonFooter />
              </ComparisonCard>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};
