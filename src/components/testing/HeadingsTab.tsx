
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { DynamicHeading } from '@/components/ui/dynamic-text';
import { cn } from '@/lib/utils';

interface HeadingsTabProps {
  containerWidth: number[];
  showGridlines: boolean;
  highContrast: boolean;
  testResults: Record<string, boolean>;
  testContent: { medium: string };
}

const headingLevels = [1, 2, 3, 4, 5, 6] as const;

export const HeadingsTab = ({
  containerWidth,
  showGridlines,
  highContrast,
  testResults,
  testContent
}: HeadingsTabProps) => {
  const containerStyle = {
    width: `${containerWidth[0]}px`,
    maxWidth: '100%',
    margin: '0 auto',
    border: showGridlines ? '1px dashed hsl(var(--border))' : 'none',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyle} className={cn(
      "bg-card border rounded-lg p-6 space-y-4",
      highContrast && "text-contrast-high"
    )}>
      {headingLevels.map(level => (
        <div key={level} className="space-y-2">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono text-xs">
              H{level}
            </Badge>
            {testResults[`heading-${level}`] !== undefined && (
              <Badge variant={testResults[`heading-${level}`] ? "default" : "destructive"}>
                {testResults[`heading-${level}`] ? "✓ WCAG AA" : "✗ Fails"}
              </Badge>
            )}
          </div>
          <DynamicHeading
            id={`heading-${level}`}
            level={level}
            className="text-wrap-balanced"
          >
            Heading Level {level}: {testContent.medium}
          </DynamicHeading>
        </div>
      ))}
    </div>
  );
};
