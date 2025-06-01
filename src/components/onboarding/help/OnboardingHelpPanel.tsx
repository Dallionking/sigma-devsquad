
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  Lightbulb, 
  ExternalLink, 
  CheckCircle,
  BookOpen,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { getHelpContent } from './helpContentConfig';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface OnboardingHelpPanelProps {
  currentStep: OnboardingStep;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  className?: string;
}

export const OnboardingHelpPanel = ({
  currentStep,
  isCollapsed,
  onToggleCollapse,
  className
}: OnboardingHelpPanelProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    tips: true,
    examples: false,
    quickActions: false,
    learnMore: false
  });

  const helpContent = getHelpContent(currentStep);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (isCollapsed) {
    return (
      <div className={cn("fixed right-4 top-1/2 transform -translate-y-1/2 z-50", className)}>
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleCollapse}
          className="h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
          title="Show help panel"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(
      "fixed right-0 top-0 h-full w-96 bg-background border-l shadow-lg z-40 overflow-y-auto",
      className
    )}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Help & Guidance</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-8 w-8"
            title="Hide help panel"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{helpContent.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {helpContent.description}
            </p>
          </CardHeader>
        </Card>

        {/* Tips Section */}
        <Collapsible 
          open={expandedSections.tips} 
          onOpenChange={() => toggleSection('tips')}
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0">
              <div className="flex items-center space-x-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">Tips & Best Practices</span>
              </div>
              <ChevronRight className={cn(
                "h-4 w-4 transition-transform",
                expandedSections.tips && "rotate-90"
              )} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <Card>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {helpContent.tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Examples Section */}
        {helpContent.examples && helpContent.examples.length > 0 && (
          <Collapsible 
            open={expandedSections.examples} 
            onOpenChange={() => toggleSection('examples')}
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Examples</span>
                </div>
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform",
                  expandedSections.examples && "rotate-90"
                )} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="space-y-3">
                {helpContent.examples.map((example, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <h4 className="font-medium text-sm mb-2">{example.title}</h4>
                      <p className="text-sm text-muted-foreground">{example.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Quick Actions Section */}
        {helpContent.quickActions && helpContent.quickActions.length > 0 && (
          <Collapsible 
            open={expandedSections.quickActions} 
            onOpenChange={() => toggleSection('quickActions')}
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">Quick Actions</span>
                </div>
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform",
                  expandedSections.quickActions && "rotate-90"
                )} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="space-y-2">
                {helpContent.quickActions.map((action, index) => (
                  <Card key={index} className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardContent className="pt-4">
                      <h4 className="font-medium text-sm mb-1">{action.title}</h4>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Learn More Section */}
        {helpContent.learnMoreLinks && helpContent.learnMoreLinks.length > 0 && (
          <Collapsible 
            open={expandedSections.learnMore} 
            onOpenChange={() => toggleSection('learnMore')}
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0">
                <div className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4 text-indigo-500" />
                  <span className="font-medium">Learn More</span>
                </div>
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform",
                  expandedSections.learnMore && "rotate-90"
                )} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="space-y-2">
                {helpContent.learnMoreLinks.map((link, index) => (
                  <Card key={index} className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">{link.title}</h4>
                          <p className="text-xs text-muted-foreground">{link.description}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Step Progress Indicator */}
        <Card className="bg-accent/30">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2 text-sm">
              <Badge variant="outline">
                Step {currentStep === 'completion' ? 5 : ['welcome', 'profile-setup', 'team-creation', 'first-agent', 'planning-tour'].indexOf(currentStep) + 1} of 5
              </Badge>
              <span className="text-muted-foreground">
                {currentStep === 'completion' ? 'Complete!' : 'In Progress'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
