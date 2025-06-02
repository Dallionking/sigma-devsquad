
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePerformanceAlerts } from '@/contexts/PerformanceAlertsContext';
import { Lightbulb, TrendingUp, Zap, Brain, Database, Globe, RefreshCw } from 'lucide-react';

const categoryIcons = {
  performance: TrendingUp,
  memory: Database,
  render: Zap,
  state: Brain,
  network: Globe
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'high': return 'bg-red-100 text-red-800 border-red-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getEffortColor = (effort: string) => {
  switch (effort) {
    case 'high': return 'bg-purple-100 text-purple-800';
    case 'medium': return 'bg-blue-100 text-blue-800';
    case 'low': return 'bg-emerald-100 text-emerald-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const ImprovementSuggestions = () => {
  const { suggestions, generateImprovementSuggestions } = usePerformanceAlerts();

  const sortedSuggestions = [...suggestions].sort((a, b) => a.priority - b.priority);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Performance Improvement Suggestions
          </h3>
          <p className="text-sm text-muted-foreground">
            AI-generated recommendations based on current performance metrics
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={generateImprovementSuggestions}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <ScrollArea className="h-96">
        <div className="space-y-4">
          {sortedSuggestions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Lightbulb className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
              <p>No suggestions available</p>
              <p className="text-sm">Performance is optimal or insufficient data</p>
            </div>
          ) : (
            sortedSuggestions.map((suggestion) => {
              const CategoryIcon = categoryIcons[suggestion.category];
              
              return (
                <Card key={suggestion.id} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="w-4 h-4" />
                        {suggestion.title}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className={getImpactColor(suggestion.impact)}>
                          {suggestion.impact} impact
                        </Badge>
                        <Badge variant="outline" className={getEffortColor(suggestion.effort)}>
                          {suggestion.effort} effort
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {suggestion.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        Related metrics:
                      </span>
                      <div className="flex gap-1">
                        {suggestion.relatedMetrics.map((metric) => (
                          <Badge key={metric} variant="secondary" className="text-xs">
                            {metric}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Priority:</span>
                        <Badge variant="outline">
                          #{suggestion.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Category:</span>
                        <Badge variant="secondary">
                          {suggestion.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
