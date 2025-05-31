
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingDown, Zap } from 'lucide-react';

interface BottleneckAnalyzerProps {
  performanceData: any;
}

interface Bottleneck {
  type: 'render' | 'memory' | 'state' | 'network';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact: string;
  recommendation: string;
  score: number;
}

export const BottleneckAnalyzer = ({ performanceData }: BottleneckAnalyzerProps) => {
  const analyzeBottlenecks = (): Bottleneck[] => {
    if (!performanceData) return [];

    const bottlenecks: Bottleneck[] = [];

    // Analyze render performance
    if (performanceData.renderTime > 32) {
      bottlenecks.push({
        type: 'render',
        severity: 'critical',
        description: 'Very slow render times detected',
        impact: 'Users will experience noticeable lag and poor responsiveness',
        recommendation: 'Implement React.memo, useMemo, and component splitting',
        score: 90
      });
    } else if (performanceData.renderTime > 16) {
      bottlenecks.push({
        type: 'render',
        severity: 'high',
        description: 'Render times exceeding 60fps target',
        impact: 'Animations may not be smooth, user interactions feel sluggish',
        recommendation: 'Optimize component re-renders and use virtualization for large lists',
        score: 70
      });
    }

    // Analyze memory usage
    const memoryUsageMB = (performanceData.memoryUsage || 0) / (1024 * 1024);
    if (memoryUsageMB > 100) {
      bottlenecks.push({
        type: 'memory',
        severity: 'critical',
        description: 'High memory consumption detected',
        impact: 'Risk of browser crashes and degraded performance on low-end devices',
        recommendation: 'Implement memory cleanup, reduce component state, and use lazy loading',
        score: 85
      });
    } else if (memoryUsageMB > 50) {
      bottlenecks.push({
        type: 'memory',
        severity: 'medium',
        description: 'Elevated memory usage',
        impact: 'Potential performance degradation on mobile devices',
        recommendation: 'Monitor memory leaks and optimize data structures',
        score: 50
      });
    }

    // Analyze state updates
    if (performanceData.stateUpdateTime > 10) {
      bottlenecks.push({
        type: 'state',
        severity: 'high',
        description: 'Slow state update operations',
        impact: 'UI updates feel unresponsive, blocking user interactions',
        recommendation: 'Use state normalization, batching, and selective subscriptions',
        score: 75
      });
    } else if (performanceData.stateUpdateTime > 5) {
      bottlenecks.push({
        type: 'state',
        severity: 'medium',
        description: 'State updates taking longer than optimal',
        impact: 'Minor delays in UI responsiveness',
        recommendation: 'Consider memoization and reducer optimization',
        score: 45
      });
    }

    // Analyze event processing
    if (performanceData.eventProcessingTime > 20) {
      bottlenecks.push({
        type: 'network',
        severity: 'high',
        description: 'Slow event processing detected',
        impact: 'Real-time features and user interactions are delayed',
        recommendation: 'Optimize event handlers and use debouncing/throttling',
        score: 65
      });
    }

    return bottlenecks.sort((a, b) => b.score - a.score);
  };

  const bottlenecks = analyzeBottlenecks();

  const getSeverityColor = (severity: Bottleneck['severity']) => {
    switch (severity) {
      case 'low': return 'secondary';
      case 'medium': return 'outline';
      case 'high': return 'destructive';
      case 'critical': return 'destructive';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: Bottleneck['type']) => {
    switch (type) {
      case 'render': return <Zap className="w-4 h-4" />;
      case 'memory': return <TrendingDown className="w-4 h-4" />;
      case 'state': return <AlertTriangle className="w-4 h-4" />;
      case 'network': return <TrendingDown className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const overallScore = bottlenecks.length > 0 
    ? Math.max(0, 100 - bottlenecks.reduce((sum, b) => sum + b.score, 0) / bottlenecks.length)
    : 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Bottleneck Analysis
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Performance Score:</span>
            <Badge variant={overallScore > 80 ? "default" : overallScore > 60 ? "outline" : "destructive"}>
              {overallScore.toFixed(0)}/100
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Overall Performance Score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Performance</span>
            <span className="text-sm text-muted-foreground">{overallScore.toFixed(0)}%</span>
          </div>
          <Progress value={overallScore} className="h-2" />
        </div>

        {/* Bottleneck List */}
        <div className="space-y-4">
          {bottlenecks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="font-medium">No performance bottlenecks detected</p>
              <p className="text-sm">Your application is performing well!</p>
            </div>
          ) : (
            bottlenecks.map((bottleneck, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(bottleneck.type)}
                    <h4 className="font-semibold">{bottleneck.description}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getSeverityColor(bottleneck.severity)}>
                      {bottleneck.severity}
                    </Badge>
                    <Badge variant="outline">
                      {bottleneck.type}
                    </Badge>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <strong>Impact:</strong> {bottleneck.impact}
                </div>
                
                <div className="text-sm">
                  <strong>Recommendation:</strong> {bottleneck.recommendation}
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Impact Score:</span>
                  <Progress value={bottleneck.score} className="h-1 flex-1" />
                  <span className="text-xs text-muted-foreground">{bottleneck.score}/100</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Performance Tips */}
        {bottlenecks.length > 0 && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Quick Performance Tips
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Use React.memo() for expensive components</li>
              <li>• Implement virtualization for large lists</li>
              <li>• Debounce user input and API calls</li>
              <li>• Monitor memory usage and clean up subscriptions</li>
              <li>• Use lazy loading for non-critical components</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
