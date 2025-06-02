
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Compare, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { WorkflowVersion, WorkflowComparison as WorkflowComparisonType } from '@/types/workflow-history';
import { useWorkflowHistory } from '@/hooks/useWorkflowHistory';

interface WorkflowComparisonProps {
  versions: WorkflowVersion[];
  workflowId?: string;
}

export const WorkflowComparison: React.FC<WorkflowComparisonProps> = ({
  versions,
  workflowId
}) => {
  const [baseVersionId, setBaseVersionId] = useState<string>('');
  const [compareVersionId, setCompareVersionId] = useState<string>('');
  const [comparison, setComparison] = useState<WorkflowComparisonType | null>(null);
  
  const { compareVersions } = useWorkflowHistory();

  const handleCompare = () => {
    if (baseVersionId && compareVersionId) {
      const result = compareVersions(baseVersionId, compareVersionId);
      setComparison(result);
    }
  };

  const getChangeIcon = (oldValue: any, newValue: any) => {
    if (oldValue === newValue) return <Minus className="w-4 h-4 text-gray-500" />;
    
    // For boolean values
    if (typeof oldValue === 'boolean' && typeof newValue === 'boolean') {
      return newValue ? 
        <TrendingUp className="w-4 h-4 text-green-500" /> : 
        <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    
    // For numeric values
    if (typeof oldValue === 'number' && typeof newValue === 'number') {
      return newValue > oldValue ? 
        <TrendingUp className="w-4 h-4 text-green-500" /> : 
        <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    
    // For arrays (conditions, actions)
    if (Array.isArray(oldValue) && Array.isArray(newValue)) {
      return newValue.length > oldValue.length ? 
        <TrendingUp className="w-4 h-4 text-blue-500" /> : 
        newValue.length < oldValue.length ?
        <TrendingDown className="w-4 h-4 text-orange-500" /> :
        <Minus className="w-4 h-4 text-gray-500" />;
    }
    
    return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
  };

  const getMetricIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (value < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const formatMetricValue = (value: number, type: string) => {
    switch (type) {
      case 'successRate':
        return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
      case 'averageExecutionTime':
        return `${value > 0 ? '+' : ''}${value.toFixed(0)}ms`;
      default:
        return `${value > 0 ? '+' : ''}${value}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Comparison Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compare className="w-5 h-5" />
            Version Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Base Version</label>
              <Select value={baseVersionId} onValueChange={setBaseVersionId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select base version" />
                </SelectTrigger>
                <SelectContent>
                  {versions.map(version => (
                    <SelectItem key={version.id} value={version.id}>
                      v{version.version} - {version.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Compare Version</label>
              <Select value={compareVersionId} onValueChange={setCompareVersionId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select version to compare" />
                </SelectTrigger>
                <SelectContent>
                  {versions.filter(v => v.id !== baseVersionId).map(version => (
                    <SelectItem key={version.id} value={version.id}>
                      v{version.version} - {version.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={handleCompare} 
                disabled={!baseVersionId || !compareVersionId}
                className="w-full"
              >
                <Compare className="w-4 h-4 mr-2" />
                Compare Versions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {comparison && (
        <div className="space-y-6">
          {/* Performance Metrics Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Base Version Metrics */}
                <div>
                  <h4 className="font-medium mb-4">
                    {comparison.baseVersion.name} (v{comparison.baseVersion.version})
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-500" />
                        <span>Executions</span>
                      </div>
                      <span className="font-medium">{comparison.metricsComparison.base.executionCount}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Success Rate</span>
                      </div>
                      <span className="font-medium">{comparison.metricsComparison.base.successRate.toFixed(1)}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-500" />
                        <span>Avg Execution Time</span>
                      </div>
                      <span className="font-medium">{comparison.metricsComparison.base.averageExecutionTime.toFixed(0)}ms</span>
                    </div>
                  </div>
                </div>

                {/* Compare Version Metrics */}
                <div>
                  <h4 className="font-medium mb-4">
                    {comparison.compareVersion.name} (v{comparison.compareVersion.version})
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-500" />
                        <span>Executions</span>
                        {getMetricIcon(comparison.metricsComparison.improvement.executionCount)}
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{comparison.metricsComparison.compare.executionCount}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatMetricValue(comparison.metricsComparison.improvement.executionCount, 'executionCount')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Success Rate</span>
                        {getMetricIcon(comparison.metricsComparison.improvement.successRate)}
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{comparison.metricsComparison.compare.successRate.toFixed(1)}%</div>
                        <div className="text-sm text-muted-foreground">
                          {formatMetricValue(comparison.metricsComparison.improvement.successRate, 'successRate')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-500" />
                        <span>Avg Execution Time</span>
                        {getMetricIcon(-comparison.metricsComparison.improvement.averageExecutionTime)}
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{comparison.metricsComparison.compare.averageExecutionTime.toFixed(0)}ms</div>
                        <div className="text-sm text-muted-foreground">
                          {formatMetricValue(-comparison.metricsComparison.improvement.averageExecutionTime, 'averageExecutionTime')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Differences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compare className="w-5 h-5" />
                Configuration Differences ({comparison.differences.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {comparison.differences.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No Differences Found</h3>
                  <p>The selected versions have identical configurations.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {comparison.differences.map((diff, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        {getChangeIcon(diff.oldValue, diff.newValue)}
                        <h4 className="font-medium capitalize">{diff.field}</h4>
                        <Badge variant="outline" className="text-xs">
                          {diff.changeDescription}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium mb-2 text-red-700">
                            Before (v{comparison.baseVersion.version})
                          </h5>
                          <pre className="bg-red-50 p-3 rounded text-xs overflow-auto max-h-32">
                            {JSON.stringify(diff.oldValue, null, 2)}
                          </pre>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium mb-2 text-green-700">
                            After (v{comparison.compareVersion.version})
                          </h5>
                          <pre className="bg-green-50 p-3 rounded text-xs overflow-auto max-h-32">
                            {JSON.stringify(diff.newValue, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary and Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Comparison Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold text-blue-600">{comparison.differences.length}</div>
                    <div className="text-sm text-muted-foreground">Configuration Changes</div>
                  </div>
                  
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold text-green-600">
                      {comparison.metricsComparison.improvement.successRate > 0 ? '+' : ''}
                      {comparison.metricsComparison.improvement.successRate.toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Success Rate Change</div>
                  </div>
                  
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold text-purple-600">
                      {-comparison.metricsComparison.improvement.averageExecutionTime > 0 ? '-' : '+'}
                      {Math.abs(comparison.metricsComparison.improvement.averageExecutionTime).toFixed(0)}ms
                    </div>
                    <div className="text-sm text-muted-foreground">Execution Time Change</div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Recommendations</h4>
                  <ul className="text-sm space-y-1">
                    {comparison.metricsComparison.improvement.successRate > 5 && (
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Great improvement in success rate! Consider keeping these changes.
                      </li>
                    )}
                    {comparison.metricsComparison.improvement.averageExecutionTime < -100 && (
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Significant performance improvement detected.
                      </li>
                    )}
                    {comparison.differences.length > 5 && (
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        Many changes detected. Consider testing thoroughly before deployment.
                      </li>
                    )}
                    {comparison.metricsComparison.improvement.successRate < -10 && (
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        Success rate decreased significantly. Review changes carefully.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* No Versions Message */}
      {versions.length < 2 && (
        <Card>
          <CardContent className="text-center py-12">
            <Compare className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Not Enough Versions</h3>
            <p className="text-muted-foreground">
              You need at least 2 versions to perform a comparison.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
