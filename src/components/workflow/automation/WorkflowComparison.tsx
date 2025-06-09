
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GitCompare, 
  ArrowLeftRight, 
  TrendingUp, 
  TrendingDown,
  Minus,
  Plus,
  Clock,
  CheckCircle,
  XCircle
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
  const [activeTab, setActiveTab] = useState('differences');
  
  const { compareVersions } = useWorkflowHistory();

  const comparison = useMemo(() => {
    if (!baseVersionId || !compareVersionId) return null;
    return compareVersions(baseVersionId, compareVersionId);
  }, [baseVersionId, compareVersionId, compareVersions]);

  const handleSwapVersions = () => {
    const temp = baseVersionId;
    setBaseVersionId(compareVersionId);
    setCompareVersionId(temp);
  };

  const renderDifferenceIcon = (type: 'added' | 'removed' | 'modified') => {
    switch (type) {
      case 'added': return <Plus className="w-4 h-4 text-green-500" />;
      case 'removed': return <Minus className="w-4 h-4 text-red-500" />;
      case 'modified': return <ArrowLeftRight className="w-4 h-4 text-blue-500" />;
      default: return <ArrowLeftRight className="w-4 h-4 text-gray-500" />;
    }
  };

  const renderMetricComparison = (base: number, compare: number, label: string, unit: string = '') => {
    const difference = compare - base;
    const isImprovement = difference > 0;
    const icon = isImprovement ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />;
    
    return (
      <div className="p-4 border rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">{label}</span>
          {icon}
        </div>
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">
            Base: {base.toFixed(1)}{unit}
          </div>
          <div className="text-sm text-muted-foreground">
            Compare: {compare.toFixed(1)}{unit}
          </div>
          <div className={`text-sm font-medium ${isImprovement ? 'text-green-600' : 'text-red-600'}`}>
            {isImprovement ? '+' : ''}{difference.toFixed(1)}{unit}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Version Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="w-5 h-5" />
            Version Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
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

            <div className="flex justify-center">
              <Button variant="outline" size="sm" onClick={handleSwapVersions}>
                <ArrowLeftRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Compare Version</label>
              <Select value={compareVersionId} onValueChange={setCompareVersionId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select compare version" />
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
          </div>
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {comparison && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="differences">Differences</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="differences" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration Differences</CardTitle>
              </CardHeader>
              <CardContent>
                {comparison.differences.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No Differences Found</h3>
                    <p>These versions have identical configurations.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comparison.differences.map((change, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          {renderDifferenceIcon('modified')}
                          <div>
                            <h4 className="font-medium capitalize">{change.field}</h4>
                            <p className="text-sm text-muted-foreground">{change.changeDescription}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>Base Version:</strong>
                            <pre className="mt-1 p-2 bg-red-50 rounded text-xs overflow-auto">
                              {JSON.stringify(change.oldValue, null, 2)}
                            </pre>
                          </div>
                          <div>
                            <strong>Compare Version:</strong>
                            <pre className="mt-1 p-2 bg-green-50 rounded text-xs overflow-auto">
                              {JSON.stringify(change.newValue, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderMetricComparison(
                    comparison.metricsComparison.base.executionCount,
                    comparison.metricsComparison.compare.executionCount,
                    'Execution Count'
                  )}
                  {renderMetricComparison(
                    comparison.metricsComparison.base.successRate,
                    comparison.metricsComparison.compare.successRate,
                    'Success Rate',
                    '%'
                  )}
                  {renderMetricComparison(
                    comparison.metricsComparison.base.averageExecutionTime,
                    comparison.metricsComparison.compare.averageExecutionTime,
                    'Avg Execution Time',
                    'ms'
                  )}
                  {renderMetricComparison(
                    comparison.metricsComparison.base.errorCount,
                    comparison.metricsComparison.compare.errorCount,
                    'Error Count'
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Version Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-blue-500 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4" />
                      <h4 className="font-medium">{comparison.compareVersion.name}</h4>
                      <Badge>v{comparison.compareVersion.version}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {comparison.compareVersion.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Created {new Date(comparison.compareVersion.createdAt).toLocaleString()} by {comparison.compareVersion.createdBy}
                    </p>
                  </div>

                  <div className="border-l-2 border-gray-300 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4" />
                      <h4 className="font-medium">{comparison.baseVersion.name}</h4>
                      <Badge variant="outline">v{comparison.baseVersion.version}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {comparison.baseVersion.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Created {new Date(comparison.baseVersion.createdAt).toLocaleString()} by {comparison.baseVersion.createdBy}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Empty State */}
      {!comparison && (
        <Card>
          <CardContent className="text-center py-12">
            <GitCompare className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">Select Versions to Compare</h3>
            <p className="text-muted-foreground">
              Choose two workflow versions to see their differences and performance metrics.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
