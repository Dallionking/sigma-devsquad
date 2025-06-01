import React, { useState } from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ChevronDown, 
  ChevronUp, 
  Calculator,
  Check,
  X,
  ArrowRight,
  BarChart3,
  DollarSign,
  Users,
  Code,
  Sparkles
} from "lucide-react";

export const PricingComparisonSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth?tab=signup");
    }
  };

  const aiToolsData = [
    {
      tool: "Vibe DevSquad",
      price: "$99",
      function: "Complete AI development team",
      target: "Teams & individuals",
      advantage: "All-in-one solution with team orchestration",
      isVibe: true
    },
    {
      tool: "Cursor",
      price: "$20",
      function: "AI-powered code editor",
      target: "Individual developers",
      advantage: "Limited to code editing only",
      isVibe: false
    },
    {
      tool: "Windsurf",
      price: "$15",
      function: "AI development assistant",
      target: "Individual developers",
      advantage: "No team orchestration or planning",
      isVibe: false
    },
    {
      tool: "ChatGPT Plus",
      price: "$20",
      function: "General AI assistant",
      target: "General users",
      advantage: "Not development-specific",
      isVibe: false
    },
    {
      tool: "GitHub Copilot",
      price: "$10",
      function: "Code completion",
      target: "Individual developers",
      advantage: "No planning, testing, or workflow",
      isVibe: false
    },
    {
      tool: "Anthropic Claude Pro",
      price: "$20",
      function: "General AI assistant",
      target: "General users",
      advantage: "Not development-focused",
      isVibe: false
    },
    {
      tool: "Perplexity Pro",
      price: "$20",
      function: "Research assistant",
      target: "Knowledge workers",
      advantage: "Limited to research tasks",
      isVibe: false
    }
  ];

  const devTeamData = [
    {
      resource: "Vibe DevSquad",
      monthly: "$99",
      annual: "$1,188",
      savings: "Base comparison",
      isVibe: true
    },
    {
      resource: "Junior Developer",
      monthly: "$5,000-$8,000",
      annual: "$60,000-$96,000",
      savings: "98% cost reduction",
      isVibe: false
    },
    {
      resource: "Mid-level Developer",
      monthly: "$8,000-$12,000",
      annual: "$96,000-$144,000",
      savings: "99% cost reduction",
      isVibe: false
    },
    {
      resource: "Senior Developer",
      monthly: "$12,000-$20,000",
      annual: "$144,000-$240,000",
      savings: "99.5% cost reduction",
      isVibe: false
    },
    {
      resource: "Small Dev Team (3-5 people)",
      monthly: "$20,000-$40,000",
      annual: "$240,000-$480,000",
      savings: "99.7% cost reduction",
      isVibe: false
    },
    {
      resource: "Mid-sized Dev Team (5-10 people)",
      monthly: "$40,000-$100,000",
      annual: "$480,000-$1,200,000",
      savings: "99.9% cost reduction",
      isVibe: false
    }
  ];

  return (
    <div className="py-8">
      <AnimatedSection animation="fade-up" delay={100}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Trigger Button */}
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full h-16 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border border-purple-200/50 dark:border-purple-800/50 rounded-xl transition-all duration-300 hover:shadow-lg group"
              aria-expanded={isExpanded}
              aria-controls="comparison-content"
            >
              <div className="flex items-center justify-center space-x-3">
                <BarChart3 className="w-5 h-5 text-vibe-primary" />
                <span className="text-lg font-semibold text-vibe-primary">
                  See How We Compare
                </span>
                <span className="text-sm text-muted-foreground">
                  (Save up to 99.9% vs traditional teams)
                </span>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-vibe-primary group-hover:scale-110 transition-transform" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-vibe-primary group-hover:scale-110 transition-transform" />
                )}
              </div>
            </button>

            {/* Expandable Content */}
            <div
              id="comparison-content"
              className={`overflow-hidden transition-all duration-500 ease-out ${
                isExpanded ? 'max-h-[800px] opacity-100 mt-6' : 'max-h-0 opacity-0'
              }`}
            >
              <EnhancedCard className="p-6 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
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

                  {/* AI Tools Comparison Tab */}
                  <TabsContent value="ai-tools" className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">AI Development Tools Market Comparison</h3>
                      <p className="text-muted-foreground">
                        See how Vibe DevSquad compares to popular AI development tools
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="font-semibold">Tool</TableHead>
                            <TableHead className="font-semibold">Price/Month</TableHead>
                            <TableHead className="font-semibold">Primary Function</TableHead>
                            <TableHead className="font-semibold">Target User</TableHead>
                            <TableHead className="font-semibold">Key Limitation</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {aiToolsData.map((item, index) => (
                            <TableRow 
                              key={index}
                              className={item.isVibe ? 'bg-vibe-primary/5 border-vibe-primary/20' : 'hover:bg-muted/30'}
                            >
                              <TableCell className="font-medium">
                                <div className="flex items-center space-x-2">
                                  {item.isVibe && <Sparkles className="w-4 h-4 text-vibe-primary" />}
                                  <span>{item.tool}</span>
                                  {item.isVibe && <Badge variant="secondary">Our Solution</Badge>}
                                </div>
                              </TableCell>
                              <TableCell className="font-semibold">
                                {item.price}/month
                              </TableCell>
                              <TableCell>{item.function}</TableCell>
                              <TableCell>{item.target}</TableCell>
                              <TableCell>
                                <span className={item.isVibe ? 'text-vibe-primary font-medium' : 'text-muted-foreground'}>
                                  {item.advantage}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center space-x-2 mb-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800 dark:text-green-200">
                          Vibe DevSquad Advantage
                        </span>
                      </div>
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        For just $99/month, you get the equivalent functionality of multiple tools, 
                        plus team orchestration, project planning, and workflow automation that none of the individual tools provide.
                      </p>
                    </div>
                  </TabsContent>

                  {/* Dev Team Comparison Tab */}
                  <TabsContent value="dev-teams" className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">Traditional Development Team Cost Comparison</h3>
                      <p className="text-muted-foreground">
                        See the massive cost savings compared to hiring human developers
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="font-semibold">Resource Type</TableHead>
                            <TableHead className="font-semibold">Monthly Cost</TableHead>
                            <TableHead className="font-semibold">Annual Cost</TableHead>
                            <TableHead className="font-semibold">Vibe DevSquad Savings</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {devTeamData.map((item, index) => (
                            <TableRow 
                              key={index}
                              className={item.isVibe ? 'bg-vibe-primary/5 border-vibe-primary/20' : 'hover:bg-muted/30'}
                            >
                              <TableCell className="font-medium">
                                <div className="flex items-center space-x-2">
                                  {item.isVibe && <Sparkles className="w-4 h-4 text-vibe-primary" />}
                                  <span>{item.resource}</span>
                                  {item.isVibe && <Badge variant="secondary">Our Solution</Badge>}
                                </div>
                              </TableCell>
                              <TableCell className="font-semibold">
                                {item.monthly}
                              </TableCell>
                              <TableCell className="font-semibold">
                                {item.annual}
                              </TableCell>
                              <TableCell>
                                <span className={item.isVibe ? 'text-vibe-primary font-medium' : 'text-green-600 font-semibold'}>
                                  {item.savings}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                        <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600">$240K+</div>
                        <div className="text-sm text-blue-700 dark:text-blue-300">Average annual savings vs small team</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                        <Calculator className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">2 Hours</div>
                        <div className="text-sm text-green-700 dark:text-green-300">Break-even time on your investment</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                        <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-purple-600">10x</div>
                        <div className="text-sm text-purple-700 dark:text-purple-300">Team equivalent productivity</div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Footer */}
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
              </EnhancedCard>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};
