
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Activity, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trash2,
  Filter,
  RefreshCw
} from 'lucide-react';
import { AutomationExecution, WorkflowRule } from '@/types/workflow-automation';

interface AutomationExecutionLogProps {
  executions: AutomationExecution[];
  rules: WorkflowRule[];
  onClear: () => void;
}

export const AutomationExecutionLog: React.FC<AutomationExecutionLogProps> = ({
  executions,
  rules,
  onClear
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRule, setFilterRule] = useState<string>('all');

  const filteredExecutions = executions.filter(execution => {
    if (filterStatus !== 'all' && execution.status !== filterStatus) return false;
    if (filterRule !== 'all' && execution.ruleId !== filterRule) return false;
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'skipped': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-50 text-green-700 border-green-200';
      case 'error': return 'bg-red-50 text-red-700 border-red-200';
      case 'skipped': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getRuleName = (ruleId: string) => {
    const rule = rules.find(r => r.id === ruleId);
    return rule?.name || 'Unknown Rule';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Execution Log
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="skipped">Skipped</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterRule} onValueChange={setFilterRule}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rules</SelectItem>
                {rules.map(rule => (
                  <SelectItem key={rule.id} value={rule.id}>
                    {rule.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" onClick={onClear}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Log
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {filteredExecutions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No Executions Found</h3>
            <p>
              {executions.length === 0 
                ? 'No automation rules have been executed yet.'
                : 'No executions match the current filters.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredExecutions
              .sort((a, b) => new Date(b.executedAt).getTime() - new Date(a.executedAt).getTime())
              .map((execution) => (
                <div key={execution.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(execution.status)}
                      <div>
                        <h4 className="font-medium">{getRuleName(execution.ruleId)}</h4>
                        <p className="text-sm text-muted-foreground">
                          Card: {execution.cardId}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(execution.status)}>
                        {execution.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {execution.duration}ms
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground mb-2">
                    Executed at: {new Date(execution.executedAt).toLocaleString()}
                  </div>

                  {execution.error && (
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                      <h5 className="font-medium text-red-800 mb-1">Error Details</h5>
                      <p className="text-sm text-red-700">{execution.error}</p>
                    </div>
                  )}

                  {execution.result && execution.status === 'success' && (
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <h5 className="font-medium text-green-800 mb-1">Results</h5>
                      <div className="text-sm text-green-700">
                        {Array.isArray(execution.result) && execution.result.map((result, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="font-medium">{result.type}:</span>
                            <span>{JSON.stringify(result, null, 2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
