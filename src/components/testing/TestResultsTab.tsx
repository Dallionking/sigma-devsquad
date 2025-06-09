
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TestResultsTabProps {
  testResults: Record<string, boolean>;
  containerWidth: number[];
  onRerunTests: () => void;
}

const textVariants = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'] as const;
const headingLevels = [1, 2, 3, 4, 5, 6] as const;

export const TestResultsTab = ({
  testResults,
  containerWidth,
  onRerunTests
}: TestResultsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Accessibility Compliance Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Text Variants</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {textVariants.map(variant => (
                <div key={variant} className="flex items-center gap-2">
                  <Badge 
                    variant={testResults[`test-${variant}`] ? "default" : "destructive"}
                    className="w-full justify-center"
                  >
                    {variant}: {testResults[`test-${variant}`] ? "Pass" : "Fail"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Heading Levels</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {headingLevels.map(level => (
                <div key={level} className="flex items-center gap-2">
                  <Badge 
                    variant={testResults[`heading-${level}`] ? "default" : "destructive"}
                    className="w-full justify-center"
                  >
                    H{level}: {testResults[`heading-${level}`] ? "Pass" : "Fail"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center gap-4">
              <Button onClick={onRerunTests}>
                Rerun Tests
              </Button>
              <span className="text-sm text-muted-foreground">
                Current viewport: {containerWidth[0]}px
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
