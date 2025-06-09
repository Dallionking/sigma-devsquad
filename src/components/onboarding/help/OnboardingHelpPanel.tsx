
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  ChevronRight, 
  Lightbulb, 
  ExternalLink, 
  BookOpen,
  Zap,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { getHelpContent } from './helpContentConfig';
import { SimpleVideoTutorial } from '../video-tutorials/SimpleVideoTutorial';
import { HelpSection } from './HelpSection';
import { HelpTipsSection } from './HelpTipsSection';
import { HelpExamplesSection } from './HelpExamplesSection';
import { HelpQuickActionsSection } from './HelpQuickActionsSection';
import { HelpLearnMoreSection } from './HelpLearnMoreSection';

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
    learnMore: false,
    videoTutorial: false
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

        {/* Video Tutorial Section */}
        {helpContent.videoTutorial && (
          <HelpSection
            id="videoTutorial"
            title="Video Tutorial"
            icon={
              <div className="flex items-center space-x-2">
                <Play className="h-4 w-4 text-blue-500" />
                <Badge variant="secondary" className="text-xs">
                  {helpContent.videoTutorial.duration}
                </Badge>
              </div>
            }
            isExpanded={expandedSections.videoTutorial}
            onToggle={() => toggleSection('videoTutorial')}
          >
            <SimpleVideoTutorial currentStep={currentStep} />
          </HelpSection>
        )}

        {/* Tips Section */}
        <HelpSection
          id="tips"
          title="Tips & Best Practices"
          icon={<Lightbulb className="h-4 w-4 text-yellow-500" />}
          isExpanded={expandedSections.tips}
          onToggle={() => toggleSection('tips')}
        >
          <HelpTipsSection tips={helpContent.tips} />
        </HelpSection>

        {/* Examples Section */}
        {helpContent.examples && helpContent.examples.length > 0 && (
          <HelpSection
            id="examples"
            title="Examples"
            icon={<BookOpen className="h-4 w-4 text-blue-500" />}
            isExpanded={expandedSections.examples}
            onToggle={() => toggleSection('examples')}
          >
            <HelpExamplesSection examples={helpContent.examples} />
          </HelpSection>
        )}

        {/* Quick Actions Section */}
        {helpContent.quickActions && helpContent.quickActions.length > 0 && (
          <HelpSection
            id="quickActions"
            title="Quick Actions"
            icon={<Zap className="h-4 w-4 text-purple-500" />}
            isExpanded={expandedSections.quickActions}
            onToggle={() => toggleSection('quickActions')}
          >
            <HelpQuickActionsSection actions={helpContent.quickActions} />
          </HelpSection>
        )}

        {/* Learn More Section */}
        {helpContent.learnMoreLinks && helpContent.learnMoreLinks.length > 0 && (
          <HelpSection
            id="learnMore"
            title="Learn More"
            icon={<ExternalLink className="h-4 w-4 text-indigo-500" />}
            isExpanded={expandedSections.learnMore}
            onToggle={() => toggleSection('learnMore')}
          >
            <HelpLearnMoreSection links={helpContent.learnMoreLinks} />
          </HelpSection>
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
