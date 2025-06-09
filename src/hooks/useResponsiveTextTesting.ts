
import { useState, useEffect, useCallback } from 'react';

interface TextMetrics {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  wordSpacing: number;
  isAccessible: boolean;
  contrastRatio: number;
}

interface BreakpointTestResult {
  breakpoint: string;
  width: number;
  passed: boolean;
  metrics: TextMetrics;
  issues: string[];
}

interface ResponsiveTextTestConfig {
  testAccessibility: boolean;
  testContrast: boolean;
  testReadability: boolean;
  wcagLevel: 'AA' | 'AAA';
  minFontSize: number;
  maxLineLength: number;
}

const defaultConfig: ResponsiveTextTestConfig = {
  testAccessibility: true,
  testContrast: true,
  testReadability: true,
  wcagLevel: 'AA',
  minFontSize: 16,
  maxLineLength: 75
};

export const useResponsiveTextTesting = (config: Partial<ResponsiveTextTestConfig> = {}) => {
  const [testResults, setTestResults] = useState<BreakpointTestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [overallScore, setOverallScore] = useState(0);

  const finalConfig = { ...defaultConfig, ...config };

  const getElementMetrics = useCallback((element: HTMLElement): TextMetrics => {
    const computedStyle = window.getComputedStyle(element);
    const fontSize = parseFloat(computedStyle.fontSize);
    const lineHeight = parseFloat(computedStyle.lineHeight);
    const letterSpacing = parseFloat(computedStyle.letterSpacing) || 0;
    const wordSpacing = parseFloat(computedStyle.wordSpacing) || 0;

    // Calculate accessibility compliance
    const isAccessible = fontSize >= finalConfig.minFontSize && 
                        lineHeight >= fontSize * 1.2;

    // Simple contrast ratio estimation (would need more sophisticated calculation in real app)
    const contrastRatio = 4.5; // Placeholder - would calculate from colors

    return {
      fontSize,
      lineHeight,
      letterSpacing,
      wordSpacing,
      isAccessible,
      contrastRatio
    };
  }, [finalConfig.minFontSize]);

  const testElementAtBreakpoint = useCallback((
    elementId: string, 
    breakpointName: string, 
    width: number
  ): BreakpointTestResult | null => {
    const element = document.getElementById(elementId);
    if (!element) return null;

    // Temporarily set viewport width for testing
    const originalWidth = document.documentElement.style.width;
    document.documentElement.style.width = `${width}px`;

    const metrics = getElementMetrics(element);
    const issues: string[] = [];

    // Check various criteria
    if (metrics.fontSize < finalConfig.minFontSize) {
      issues.push(`Font size ${metrics.fontSize}px below minimum ${finalConfig.minFontSize}px`);
    }

    if (metrics.lineHeight < metrics.fontSize * 1.2) {
      issues.push(`Line height ${metrics.lineHeight}px too small for font size ${metrics.fontSize}px`);
    }

    if (finalConfig.testContrast && metrics.contrastRatio < 4.5) {
      issues.push(`Contrast ratio ${metrics.contrastRatio} below WCAG AA standard`);
    }

    if (finalConfig.testReadability) {
      const lineLength = element.offsetWidth / (metrics.fontSize * 0.5); // Rough estimate
      if (lineLength > finalConfig.maxLineLength) {
        issues.push(`Line length ${lineLength} characters exceeds maximum ${finalConfig.maxLineLength}`);
      }
    }

    // Restore original width
    document.documentElement.style.width = originalWidth;

    return {
      breakpoint: breakpointName,
      width,
      passed: issues.length === 0,
      metrics,
      issues
    };
  }, [finalConfig, getElementMetrics]);

  const runComprehensiveTest = useCallback(async (elementIds: string[]) => {
    setIsRunning(true);
    setTestResults([]);

    const breakpoints = [
      { name: 'Mobile Small', width: 320 },
      { name: 'Mobile', width: 375 },
      { name: 'Mobile Large', width: 428 },
      { name: 'Tablet', width: 768 },
      { name: 'Laptop', width: 1024 },
      { name: 'Desktop', width: 1280 },
      { name: 'Large Desktop', width: 1920 }
    ];

    const allResults: BreakpointTestResult[] = [];

    for (const elementId of elementIds) {
      for (const breakpoint of breakpoints) {
        // Add small delay to ensure style recalculation
        await new Promise(resolve => setTimeout(resolve, 50));
        
        const result = testElementAtBreakpoint(elementId, breakpoint.name, breakpoint.width);
        if (result) {
          allResults.push({
            ...result,
            breakpoint: `${elementId} - ${result.breakpoint}`
          });
        }
      }
    }

    setTestResults(allResults);
    
    // Calculate overall score
    const passedTests = allResults.filter(r => r.passed).length;
    const totalTests = allResults.length;
    const score = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
    setOverallScore(score);

    setIsRunning(false);
  }, [testElementAtBreakpoint]);

  const runAccessibilityAudit = useCallback((elementIds: string[]) => {
    const auditResults = elementIds.map(id => {
      const element = document.getElementById(id);
      if (!element) return null;

      const metrics = getElementMetrics(element);
      const issues: string[] = [];

      // WCAG compliance checks
      if (!metrics.isAccessible) {
        issues.push('Does not meet WCAG accessibility requirements');
      }

      if (metrics.contrastRatio < (finalConfig.wcagLevel === 'AAA' ? 7 : 4.5)) {
        issues.push(`Contrast ratio insufficient for WCAG ${finalConfig.wcagLevel}`);
      }

      return {
        elementId: id,
        passed: issues.length === 0,
        issues,
        metrics
      };
    }).filter(Boolean);

    return auditResults;
  }, [finalConfig.wcagLevel, getElementMetrics]);

  const generateTestReport = useCallback(() => {
    const report = {
      timestamp: new Date().toISOString(),
      overallScore,
      totalTests: testResults.length,
      passedTests: testResults.filter(r => r.passed).length,
      failedTests: testResults.filter(r => !r.passed).length,
      breakdownByBreakpoint: testResults.reduce((acc, result) => {
        const breakpoint = result.breakpoint.split(' - ')[1] || result.breakpoint;
        if (!acc[breakpoint]) {
          acc[breakpoint] = { passed: 0, failed: 0, issues: [] };
        }
        if (result.passed) {
          acc[breakpoint].passed++;
        } else {
          acc[breakpoint].failed++;
          acc[breakpoint].issues.push(...result.issues);
        }
        return acc;
      }, {} as Record<string, { passed: number; failed: number; issues: string[] }>),
      detailedResults: testResults
    };

    return report;
  }, [testResults, overallScore]);

  const exportTestResults = useCallback((format: 'json' | 'csv' = 'json') => {
    const report = generateTestReport();
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `responsive-text-test-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // CSV export
      const csvData = testResults.map(result => ({
        Breakpoint: result.breakpoint,
        Width: result.width,
        Passed: result.passed,
        FontSize: result.metrics.fontSize,
        LineHeight: result.metrics.lineHeight,
        Issues: result.issues.join('; ')
      }));

      const csvContent = [
        Object.keys(csvData[0]).join(','),
        ...csvData.map(row => Object.values(row).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `responsive-text-test-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [generateTestReport, testResults]);

  return {
    testResults,
    isRunning,
    overallScore,
    runComprehensiveTest,
    runAccessibilityAudit,
    generateTestReport,
    exportTestResults,
    config: finalConfig
  };
};
