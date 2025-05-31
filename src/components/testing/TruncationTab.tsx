
import React from 'react';
import { TruncatedText } from '@/components/ui/dynamic-text';
import { cn } from '@/lib/utils';

interface TruncationTabProps {
  containerWidth: number[];
  showGridlines: boolean;
  highContrast: boolean;
  testContent: Record<string, string>;
}

export const TruncationTab = ({
  containerWidth,
  showGridlines,
  highContrast,
  testContent
}: TruncationTabProps) => {
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
      {Object.entries(testContent).map(([key, content]) => (
        <div key={key} className="space-y-3">
          <h4 className="font-semibold capitalize text-sm text-muted-foreground">
            {key} Text ({content.length} chars)
          </h4>
          <div className="grid gap-2">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">1 line:</span>
              <TruncatedText lines={1} className="max-w-xs bg-muted p-2 rounded">
                {content}
              </TruncatedText>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">2 lines:</span>
              <TruncatedText lines={2} className="max-w-xs bg-muted p-2 rounded">
                {content}
              </TruncatedText>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">3 lines:</span>
              <TruncatedText lines={3} className="max-w-xs bg-muted p-2 rounded">
                {content}
              </TruncatedText>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
