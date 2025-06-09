
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { DynamicText } from '@/components/ui/dynamic-text';
import { cn } from '@/lib/utils';

interface TextVariantsTabProps {
  containerWidth: number[];
  showGridlines: boolean;
  highContrast: boolean;
  testResults: Record<string, boolean>;
  testContent: { medium: string };
}

const textVariants = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'] as const;

export const TextVariantsTab = ({
  containerWidth,
  showGridlines,
  highContrast,
  testResults,
  testContent
}: TextVariantsTabProps) => {
  const containerStyle = {
    width: `${containerWidth[0]}px`,
    maxWidth: '100%',
    margin: '0 auto',
    border: showGridlines ? '1px dashed hsl(var(--border))' : 'none',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyle} className={cn(
      "bg-card border rounded-lg p-6 space-y-6",
      highContrast && "text-contrast-high"
    )}>
      {textVariants.map(variant => (
        <div key={variant} className="space-y-2">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono text-xs">
              {variant}
            </Badge>
            {testResults[`test-${variant}`] !== undefined && (
              <Badge variant={testResults[`test-${variant}`] ? "default" : "destructive"}>
                {testResults[`test-${variant}`] ? "✓ WCAG AA" : "✗ Fails"}
              </Badge>
            )}
          </div>
          <DynamicText
            id={`test-${variant}`}
            variant={variant}
            className="text-wrap-responsive"
            accessible
            highContrast={highContrast}
          >
            {testContent.medium}
          </DynamicText>
        </div>
      ))}
    </div>
  );
};
