
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Activity,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { WorkflowHistoryEntry } from '@/types/workflow-history';

interface WorkflowAuditTrailProps {
  history: WorkflowHistoryEntry[];
  workflowId?: string;
}

export const WorkflowAuditTrail: React.FC<WorkflowAuditTrailProps> = ({
  history,
  workflowId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());

  const filteredHistory = history.filter(entry => {
    const matchesSearch = entry.changes.some(change => 
      change.changeDescription.toLowerCase().includes(searchTerm.toLowerCase())
    ) || entry.changedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || entry.changeType === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const toggleExpanded = (entryId: string) => {
    const newExpanded = new Set(expandedEntries);
    if (newExpanded.has(entryId)) {
      newExpanded.delete(entryId);
    } else {
      newExpanded.add(entryId);
    }
    setExpandedEntries(newExpanded);
  };

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'created': return 'bg-green-100 text-green-800';
      case 'updated': return 'bg-blue-100 text-blue-800';
      case 'deleted': return 'bg-red-100 text-red-800';
      case 'enabled': return 'bg-green-100 text-green-800';
      case 'disabled': return 'bg-orange-100 text-orange-800';
      case 'executed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Audit Trail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search changes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Changes</SelectItem>
                <SelectItem value="created">Created</SelectItem>
                <SelectItem value="updated">Updated</SelectItem>
                <SelectItem value="deleted">Deleted</SelectItem>
                <SelectItem value="enabled">Enabled</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
                <SelectItem value="executed">Executed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* History Entries */}
      <div className="space-y-4">
        {filteredHistory.map((entry) => (
          <Card key={entry.id} className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(entry.id)}
                    className="h-6 w-6 p-0"
                  >
                    {expandedEntries.has(entry.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>
                  <Badge className={getChangeTypeColor(entry.changeType)}>
                    {entry.changeType}
                  </Badge>
                  <Badge variant="outline">v{entry.version}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {entry.changedBy}
                  <Calendar className="w-4 h-4 ml-2" />
                  {new Date(entry.timestamp).toLocaleString()}
                </div>
              </div>

              <div className="space-y-2">
                {entry.changes.slice(0, expandedEntries.has(entry.id) ? undefined : 2).map((change, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{change.field}:</span> {change.changeDescription}
                  </div>
                ))}
                {!expandedEntries.has(entry.id) && entry.changes.length > 2 && (
                  <div className="text-xs text-muted-foreground">
                    +{entry.changes.length - 2} more changes
                  </div>
                )}
              </div>

              {expandedEntries.has(entry.id) && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <h5 className="font-medium mb-2">Detailed Changes:</h5>
                  {entry.changes.map((change, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 mb-3 text-sm">
                      <div>
                        <strong>Field:</strong> {change.field}
                      </div>
                      <div>
                        <strong>From:</strong> 
                        <pre className="text-xs mt-1 p-1 bg-red-50 rounded">
                          {JSON.stringify(change.oldValue, null, 1)}
                        </pre>
                      </div>
                      <div>
                        <strong>To:</strong>
                        <pre className="text-xs mt-1 p-1 bg-green-50 rounded">
                          {JSON.stringify(change.newValue, null, 1)}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredHistory.length === 0 && (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No History Found</h3>
              <p>No workflow changes match your current filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
