
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { DynamicText, DynamicHeading, TruncatedText } from '@/components/ui/dynamic-text';
import { cn } from '@/lib/utils';

interface TestContent {
  short: string;
  medium: string;
  long: string;
  veryLong: string;
  multiline: string;
  specialChars: string;
  numbers: string;
  mixed: string;
}

const testContent: TestContent = {
  short: "Quick test",
  medium: "This is a medium length text for testing responsive behavior",
  long: "This is a significantly longer piece of text that will help us test how well our responsive typography handles content that spans multiple lines and requires wrapping at various breakpoints",
  veryLong: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  multiline: "Line 1: Testing multiline content\nLine 2: With line breaks and formatting\nLine 3: To ensure proper spacing",
  specialChars: "Testing special chars: @#$%^&*()_+-=[]{}|;':\",./<>? and émojis 🚀🎨📊",
  numbers: "Testing numbers: 1234567890 and mixed content like v2.1.3 or $99.99",
  mixed: "Mixed content with UPPERCASE, lowercase, Numbers123, and symbols!@#"
};

const breakpoints = [
  { name: 'Ultra Small', width: 320, class: 'ultra-small' },
  { name: 'Mobile', width: 375, class: 'mobile' },
  { name: 'Large Mobile', width: 428, class: 'lg-mobile' },
  { name: 'Tablet', width: 768, class: 'tablet' },
  { name: 'Laptop', width: 1024, class: 'laptop' },
  { name: 'Desktop', width: 1280, class: 'desktop' },
  { name: 'Large Desktop', width: 1920, class: 'xl-desktop' }
];

const textVariants = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'] as const;
const headingLevels = [1, 2, 3, 4, 5, 6] as const;

export const ResponsiveTextTester = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState(breakpoints[3]);
  const [containerWidth, setContainerWidth] = useState([768]);
  const [showGridlines, setShowGridlines] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [testLanguage, setTestLanguage] = useState('en');

  const [testResults, setTestResults] = useState<Record<string, boolean>>({});

  // Simulate different viewport sizes
  const containerStyle = {
    width: `${containerWidth[0]}px`,
    maxWidth: '100%',
    margin: '0 auto',
    border: showGridlines ? '1px dashed hsl(var(--border))' : 'none',
    transition: 'all 0.3s ease'
  };

  const runAccessibilityTest = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return false;

    const computedStyle = window.getComputedStyle(element);
    const fontSize = parseFloat(computedStyle.fontSize);
    const lineHeight = parseFloat(computedStyle.lineHeight);
    
    // WCAG AA compliance checks
    const isAccessible = fontSize >= 16 && lineHeight >= fontSize * 1.2;
    setTestResults(prev => ({ ...prev, [elementId]: isAccessible }));
    return isAccessible;
  };

  useEffect(() => {
    // Run accessibility tests on mount and when breakpoint changes
    const timer = setTimeout(() => {
      textVariants.forEach(variant => runAccessibilityTest(`test-${variant}`));
      headingLevels.forEach(level => runAccessibilityTest(`heading-${level}`));
    }, 100);

    return () => clearTimeout(timer);
  }, [currentBreakpoint, containerWidth]);

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className="text-2xl">🧪</span>
            Responsive Typography Testing Suite
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Testing Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Viewport Width</label>
              <Slider
                value={containerWidth}
                onValueChange={setContainerWidth}
                min={320}
                max={1920}
                step={1}
                className="w-full"
              />
              <span className="text-xs text-muted-foreground">{containerWidth[0]}px</span>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Breakpoint Preset</label>
              <Select value={currentBreakpoint.name} onValueChange={(value) => {
                const bp = breakpoints.find(b => b.name === value)!;
                setCurrentBreakpoint(bp);
                setContainerWidth([bp.width]);
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {breakpoints.map(bp => (
                    <SelectItem key={bp.name} value={bp.name}>
                      {bp.name} ({bp.width}px)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Test Language</label>
              <Select value={testLanguage} onValueChange={setTestLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="gridlines"
                  checked={showGridlines}
                  onCheckedChange={setShowGridlines}
                />
                <label htmlFor="gridlines" className="text-sm font-medium">
                  Show Gridlines
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={setHighContrast}
                />
                <label htmlFor="high-contrast" className="text-sm font-medium">
                  High Contrast
                </label>
              </div>
            </div>
          </div>

          <Tabs defaultValue="variants" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="variants">Text Variants</TabsTrigger>
              <TabsTrigger value="headings">Headings</TabsTrigger>
              <TabsTrigger value="truncation">Truncation</TabsTrigger>
              <TabsTrigger value="results">Test Results</TabsTrigger>
            </TabsList>

            <TabsContent value="variants" className="space-y-4">
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
            </TabsContent>

            <TabsContent value="headings" className="space-y-4">
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
            </TabsContent>

            <TabsContent value="truncation" className="space-y-4">
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
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
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
                        <Button onClick={() => {
                          textVariants.forEach(variant => runAccessibilityTest(`test-${variant}`));
                          headingLevels.forEach(level => runAccessibilityTest(`heading-${level}`));
                        }}>
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
