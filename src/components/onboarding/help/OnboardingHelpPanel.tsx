
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { HelpTooltip } from './HelpTooltip';
import { VideoTutorialManager } from '../video-tutorials/VideoTutorialManager';
import { getHelpContent } from './helpContentConfig';
import { ChevronLeft, ChevronRight, HelpCircle, Video, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingHelpPanelProps {
  currentStep: OnboardingStep;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  completedSteps?: OnboardingStep[];
}

export const OnboardingHelpPanel = ({ 
  currentStep, 
  isCollapsed, 
  onToggleCollapse,
  completedSteps = []
}: OnboardingHelpPanelProps) => {
  const [activeTab, setActiveTab] = useState('help');
  const helpContent = getHelpContent(currentStep);

  return (
    <div className={cn(
      "fixed right-0 top-0 h-screen bg-background border-l shadow-lg transition-all duration-300 z-40",
      isCollapsed ? "w-12" : "w-96"
    )}>
      {/* Toggle Button */}
      <div className="absolute -left-12 top-1/2 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleCollapse}
          className="rounded-l-md rounded-r-none h-16 w-12 bg-background border-r-0"
        >
          {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Help & Tutorials</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleCollapse}
                className="p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
              <TabsTrigger value="help" className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Help
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Videos
                <Badge variant="secondary" className="text-xs ml-1">
                  {completedSteps.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="help" className="p-4 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      {helpContent.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <p className="text-muted-foreground">{helpContent.overview}</p>
                    </div>

                    {/* Key Points */}
                    {helpContent.keyPoints && helpContent.keyPoints.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Key Points:</h4>
                        <ul className="space-y-1 text-sm">
                          {helpContent.keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tips */}
                    {helpContent.tips && helpContent.tips.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Tips:</h4>
                        <div className="space-y-2">
                          {helpContent.tips.map((tip, index) => (
                            <div key={index} className="bg-muted/50 p-3 rounded-lg">
                              <p className="text-sm">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Common Issues */}
                    {helpContent.commonIssues && helpContent.commonIssues.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Common Issues:</h4>
                        <div className="space-y-2">
                          {helpContent.commonIssues.map((issue, index) => (
                            <div key={index} className="border-l-2 border-orange-400 pl-3">
                              <p className="text-sm font-medium">{issue.problem}</p>
                              <p className="text-sm text-muted-foreground">{issue.solution}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="videos" className="p-4 mt-0">
                <VideoTutorialManager 
                  completedSteps={completedSteps}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      )}
    </div>
  );
};
