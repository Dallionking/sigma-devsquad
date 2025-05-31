
import React from 'react';
import { DynamicText, DynamicHeading, TruncatedText } from '@/components/ui/dynamic-text';
import { cn } from '@/lib/utils';
import { useResponsiveTypography } from '@/hooks/useResponsiveTypography';

interface AccessibleTypographyProps {
  children: React.ReactNode;
  className?: string;
  enforceAccessibility?: boolean;
  testMode?: boolean;
}

export const AccessibleTypography = ({
  children,
  className,
  enforceAccessibility = true,
  testMode = false
}: AccessibleTypographyProps) => {
  const { isTextSizeAccessible, getAccessibleFontSize, currentBreakpoint } = useResponsiveTypography();

  if (testMode) {
    return (
      <div className={cn('space-y-6 p-6', className)}>
        <div className="border-l-4 border-blue-500 pl-4">
          <DynamicHeading level={1}>Typography Accessibility Test</DynamicHeading>
          <DynamicText variant="body" className="text-muted-foreground mt-2">
            Current breakpoint: {currentBreakpoint}
          </DynamicText>
        </div>

        <div className="grid gap-4">
          <div className="space-y-2">
            <DynamicHeading level={2}>Dynamic Font Sizes</DynamicHeading>
            <DynamicText variant="xs">Extra Small Text (xs)</DynamicText>
            <DynamicText variant="sm">Small Text (sm)</DynamicText>
            <DynamicText variant="base">Base Text (base)</DynamicText>
            <DynamicText variant="lg">Large Text (lg)</DynamicText>
            <DynamicText variant="xl">Extra Large Text (xl)</DynamicText>
          </div>

          <div className="space-y-2">
            <DynamicHeading level={3}>Text Truncation Examples</DynamicHeading>
            <TruncatedText lines={1} className="max-w-xs bg-muted p-2 rounded">
              This is a very long text that should be truncated with ellipsis when it exceeds the container width
            </TruncatedText>
            <TruncatedText lines={2} className="max-w-xs bg-muted p-2 rounded">
              This is a longer text that should be truncated after two lines when it exceeds the container height and width constraints
            </TruncatedText>
            <TruncatedText lines={3} className="max-w-xs bg-muted p-2 rounded">
              This is an even longer text that should be truncated after three lines when it exceeds the container height and width constraints. This gives more context while still preventing overflow issues.
            </TruncatedText>
          </div>

          <div className="space-y-2">
            <DynamicHeading level={3}>High Contrast Text</DynamicHeading>
            <DynamicText variant="base" highContrast>
              High contrast text for better readability
            </DynamicText>
            <DynamicText variant="base" className="text-muted-foreground">
              Regular muted text for comparison
            </DynamicText>
          </div>

          <div className="space-y-2">
            <DynamicHeading level={3}>Accessibility Features</DynamicHeading>
            <DynamicText variant="body" accessible>
              Accessibility-enforced text that meets WCAG guidelines
            </DynamicText>
            <div className="text-sm text-muted-foreground">
              Font size compliance: {isTextSizeAccessible(16) ? '✅ Compliant' : '❌ Too small'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('responsive-typography-container', className)}>
      {children}
    </div>
  );
};

// Component for testing truncation behavior
export const TruncationTestGrid = () => {
  const testTexts = [
    "Short text",
    "This is a medium length text that might need truncation on smaller screens",
    "This is a very long text that will definitely need truncation on most screen sizes and will demonstrate the ellipsis behavior and tooltip functionality",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  ];

  return (
    <div className="grid gap-4 p-4">
      <DynamicHeading level={2}>Text Truncation Test Grid</DynamicHeading>
      
      {testTexts.map((text, index) => (
        <div key={index} className="border rounded p-3 space-y-2">
          <div className="text-sm font-medium text-muted-foreground">
            Test {index + 1}: {text.length} characters
          </div>
          
          <div className="grid gap-2">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Single line truncation:</div>
              <div className="max-w-xs border p-2 rounded bg-muted">
                <TruncatedText lines={1}>{text}</TruncatedText>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Two line truncation:</div>
              <div className="max-w-xs border p-2 rounded bg-muted">
                <TruncatedText lines={2}>{text}</TruncatedText>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Three line truncation:</div>
              <div className="max-w-xs border p-2 rounded bg-muted">
                <TruncatedText lines={3}>{text}</TruncatedText>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
