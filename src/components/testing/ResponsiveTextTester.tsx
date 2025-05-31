
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestingControls } from './TestingControls';
import { TextVariantsTab } from './TextVariantsTab';
import { HeadingsTab } from './HeadingsTab';
import { TruncationTab } from './TruncationTab';
import { TestResultsTab } from './TestResultsTab';

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

  const handleRerunTests = () => {
    textVariants.forEach(variant => runAccessibilityTest(`test-${variant}`));
    headingLevels.forEach(level => runAccessibilityTest(`heading-${level}`));
  };

  const handleBreakpointChange = (breakpoint: { name: string; width: number; class: string }) => {
    setCurrentBreakpoint(breakpoint);
    setContainerWidth([breakpoint.width]);
  };

  useEffect(() => {
    // Run accessibility tests on mount and when breakpoint changes
    const timer = setTimeout(() => {
      handleRerunTests();
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
          <TestingControls
            containerWidth={containerWidth}
            setContainerWidth={setContainerWidth}
            currentBreakpoint={currentBreakpoint}
            setCurrentBreakpoint={handleBreakpointChange}
            testLanguage={testLanguage}
            setTestLanguage={setTestLanguage}
            showGridlines={showGridlines}
            setShowGridlines={setShowGridlines}
            highContrast={highContrast}
            setHighContrast={setHighContrast}
            breakpoints={breakpoints}
          />

          <Tabs defaultValue="variants" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="variants">Text Variants</TabsTrigger>
              <TabsTrigger value="headings">Headings</TabsTrigger>
              <TabsTrigger value="truncation">Truncation</TabsTrigger>
              <TabsTrigger value="results">Test Results</TabsTrigger>
            </TabsList>

            <TabsContent value="variants" className="space-y-4">
              <TextVariantsTab
                containerWidth={containerWidth}
                showGridlines={showGridlines}
                highContrast={highContrast}
                testResults={testResults}
                testContent={testContent}
              />
            </TabsContent>

            <TabsContent value="headings" className="space-y-4">
              <HeadingsTab
                containerWidth={containerWidth}
                showGridlines={showGridlines}
                highContrast={highContrast}
                testResults={testResults}
                testContent={testContent}
              />
            </TabsContent>

            <TabsContent value="truncation" className="space-y-4">
              <TruncationTab
                containerWidth={containerWidth}
                showGridlines={showGridlines}
                highContrast={highContrast}
                testContent={testContent}
              />
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              <TestResultsTab
                testResults={testResults}
                containerWidth={containerWidth}
                onRerunTests={handleRerunTests}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
