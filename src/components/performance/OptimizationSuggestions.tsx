
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Lightbulb, ChevronDown, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface OptimizationSuggestionsProps {
  performanceData: any;
}

interface Suggestion {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'render' | 'memory' | 'state' | 'network' | 'general';
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  codeExample?: string;
  implemented: boolean;
}

export const OptimizationSuggestions = ({ performanceData }: OptimizationSuggestionsProps) => {
  const [implementedSuggestions, setImplementedSuggestions] = useState<Set<string>>(new Set());
  const [expandedSuggestions, setExpandedSuggestions] = useState<Set<string>>(new Set());

  const generateSuggestions = (): Suggestion[] => {
    const suggestions: Suggestion[] = [];

    if (!performanceData) {
      return [
        {
          id: 'enable-monitoring',
          title: 'Enable Performance Monitoring',
          description: 'Start recording performance metrics to get personalized optimization suggestions.',
          priority: 'high',
          category: 'general',
          effort: 'low',
          impact: 'high',
          implemented: false
        }
      ];
    }

    // Render optimizations
    if (performanceData.renderTime > 16) {
      suggestions.push({
        id: 'react-memo',
        title: 'Implement React.memo for Heavy Components',
        description: 'Wrap expensive components with React.memo to prevent unnecessary re-renders when props haven\'t changed.',
        priority: 'high',
        category: 'render',
        effort: 'low',
        impact: 'high',
        codeExample: `const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* expensive rendering logic */}</div>;
});`,
        implemented: implementedSuggestions.has('react-memo')
      });

      suggestions.push({
        id: 'usememo-callbacks',
        title: 'Optimize Callbacks with useMemo and useCallback',
        description: 'Memoize expensive calculations and callback functions to reduce render time.',
        priority: 'medium',
        category: 'render',
        effort: 'medium',
        impact: 'medium',
        codeExample: `const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

const handleClick = useCallback((id) => {
  // handle click logic
}, [dependency]);`,
        implemented: implementedSuggestions.has('usememo-callbacks')
      });
    }

    // Memory optimizations
    const memoryUsageMB = (performanceData.memoryUsage || 0) / (1024 * 1024);
    if (memoryUsageMB > 50) {
      suggestions.push({
        id: 'cleanup-effects',
        title: 'Clean Up useEffect Subscriptions',
        description: 'Ensure all event listeners and subscriptions are properly cleaned up to prevent memory leaks.',
        priority: 'high',
        category: 'memory',
        effort: 'low',
        impact: 'high',
        codeExample: `useEffect(() => {
  const subscription = subscribe(callback);
  return () => subscription.unsubscribe();
}, []);`,
        implemented: implementedSuggestions.has('cleanup-effects')
      });

      suggestions.push({
        id: 'lazy-loading',
        title: 'Implement Lazy Loading',
        description: 'Load components and data only when needed to reduce initial memory footprint.',
        priority: 'medium',
        category: 'memory',
        effort: 'medium',
        impact: 'high',
        codeExample: `const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}`,
        implemented: implementedSuggestions.has('lazy-loading')
      });
    }

    // State optimizations
    if (performanceData.stateUpdateTime > 5) {
      suggestions.push({
        id: 'state-batching',
        title: 'Batch State Updates',
        description: 'Group multiple state updates together to reduce the number of re-renders.',
        priority: 'medium',
        category: 'state',
        effort: 'medium',
        impact: 'medium',
        codeExample: `import { unstable_batchedUpdates } from 'react-dom';

unstable_batchedUpdates(() => {
  setState1(value1);
  setState2(value2);
  setState3(value3);
});`,
        implemented: implementedSuggestions.has('state-batching')
      });

      suggestions.push({
        id: 'state-normalization',
        title: 'Normalize State Structure',
        description: 'Flatten nested state structures to improve update performance and reduce complexity.',
        priority: 'medium',
        category: 'state',
        effort: 'high',
        impact: 'medium',
        codeExample: `// Instead of nested objects
const state = {
  users: {
    1: { id: 1, name: 'John', posts: [1, 2] },
    2: { id: 2, name: 'Jane', posts: [3] }
  },
  posts: {
    1: { id: 1, title: 'Post 1', userId: 1 },
    2: { id: 2, title: 'Post 2', userId: 1 }
  }
};`,
        implemented: implementedSuggestions.has('state-normalization')
      });
    }

    // General optimizations
    suggestions.push({
      id: 'virtualization',
      title: 'Implement Virtual Scrolling',
      description: 'Use virtualization for large lists to render only visible items and improve performance.',
      priority: 'medium',
      category: 'render',
      effort: 'high',
      impact: 'high',
      codeExample: `import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items }) => (
  <List
    height={400}
    itemCount={items.length}
    itemSize={50}
    itemData={items}
  >
    {Row}
  </List>
);`,
      implemented: implementedSuggestions.has('virtualization')
    });

    return suggestions.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const suggestions = generateSuggestions();

  const toggleImplemented = (suggestionId: string) => {
    const newImplemented = new Set(implementedSuggestions);
    if (newImplemented.has(suggestionId)) {
      newImplemented.delete(suggestionId);
    } else {
      newImplemented.add(suggestionId);
    }
    setImplementedSuggestions(newImplemented);
  };

  const toggleExpanded = (suggestionId: string) => {
    const newExpanded = new Set(expandedSuggestions);
    if (newExpanded.has(suggestionId)) {
      newExpanded.delete(suggestionId);
    } else {
      newExpanded.add(suggestionId);
    }
    setExpandedSuggestions(newExpanded);
  };

  const getPriorityColor = (priority: Suggestion['priority']) => {
    switch (priority) {
      case 'low': return 'secondary';
      case 'medium': return 'warning';
      case 'high': return 'destructive';
      case 'critical': return 'destructive';
      default: return 'secondary';
    }
  };

  const getEffortColor = (effort: Suggestion['effort']) => {
    switch (effort) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'destructive';
      default: return 'secondary';
    }
  };

  const implementedCount = suggestions.filter(s => implementedSuggestions.has(s.id)).length;
  const progressPercentage = suggestions.length > 0 ? (implementedCount / suggestions.length) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Optimization Suggestions
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {implementedCount}/{suggestions.length} completed
            </span>
            <Badge variant="outline">
              {progressPercentage.toFixed(0)}%
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className={`border rounded-lg p-4 transition-all ${
                implementedSuggestions.has(suggestion.id) 
                  ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' 
                  : 'hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <Button
                    variant={implementedSuggestions.has(suggestion.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleImplemented(suggestion.id)}
                    className="mt-1"
                  >
                    {implementedSuggestions.has(suggestion.id) ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                  </Button>
                  
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      implementedSuggestions.has(suggestion.id) ? 'line-through text-muted-foreground' : ''
                    }`}>
                      {suggestion.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {suggestion.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant={getPriorityColor(suggestion.priority) as any} className="text-xs">
                    {suggestion.priority}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {suggestion.category}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    Effort: 
                    <Badge variant={getEffortColor(suggestion.effort) as any} className="text-xs ml-1">
                      {suggestion.effort}
                    </Badge>
                  </span>
                  <span className="flex items-center gap-1">
                    Impact: 
                    <Badge variant={suggestion.impact === 'high' ? 'success' : 'secondary'} className="text-xs ml-1">
                      {suggestion.impact}
                    </Badge>
                  </span>
                </div>
                
                {suggestion.codeExample && (
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(suggestion.id)}
                        className="text-xs"
                      >
                        Code Example
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                        <code>{suggestion.codeExample}</code>
                      </pre>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {suggestions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No optimization suggestions at this time</p>
            <p className="text-sm">Keep monitoring to get personalized recommendations</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
