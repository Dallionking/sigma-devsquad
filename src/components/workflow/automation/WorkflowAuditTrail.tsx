
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  User, 
  Clock, 
  FileText,
  AlertCircle,
  CheckCircle,
  Play,
  Pause,
  Edit,
  Trash2
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
  const [searchQuery, setSearchQuery] = useState('');
  const [filterChangeType, setFilterChangeType] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState<WorkflowHistoryEntry | null>(null);

  const filteredHistory = history.filter(entry => {
    const matchesSearch = entry.changes.some(change => 
      change.changeDescription.toLowerCase().includes(searchQuery.toLowerCase())
    ) || entry.changedBy.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesChangeType = filterChangeType === 'all' || entry.changeType === filterChangeType;
    const matchesUser = filterUser === 'all' || entry.changedBy === filterUser;
    
    return matchesSearch && matchesChangeType && matchesUser;
  });

  const uniqueUsers = [...new Set(history.map(h => h.changedBy))];

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case 'created': return <FileText className="w-4 h-4 text-green-500" />;
      case 'updated': return <Edit className="w-4 h-4 text-blue-500" />;
      case 'deleted': return <Trash2 className="w-4 h-4 text-red-500" />;
      case 'enabled': return <Play className="w-4 h-4 text-green-500" />;
      case 'disabled': return <Pause className="w-4 h-4 text-orange-500" />;
      case 'executed': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'created': return 'bg-green-50 text-green-700 border-green-200';
      case 'updated': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'deleted': return 'bg-red-50 text-red-700 border-red-200';
      case 'enabled': return 'bg-green-50 text-green-700 border-green-200';
      case 'disabled': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'executed': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search changes..."
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Change Type</label>
              <Select value={filterChangeType} onValueChange={setFilterChangeType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="updated">Updated</SelectItem>
                  <SelectItem value="deleted">Deleted</SelectItem>
                  <SelectItem value="enabled">Enabled</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                  <SelectItem value="executed">Executed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">User</label>
              <Select value={filterUser} onValueChange={setFilterUser}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {uniqueUsers.map(user => (
                    <SelectItem key={user} value={user}>
                      {user}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setFilterChangeType('all');
                  setFilterUser('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Trail */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Trail ({filteredHistory.length} entries)</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredHistory.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No History Found</h3>
              <p>No workflow changes match the current filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((entry) => (
                <div 
                  key={entry.id} 
                  className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getChangeTypeIcon(entry.changeType)}
                      <div>
                        <h4 className="font-medium capitalize">{entry.changeType}</h4>
                        <p className="text-sm text-muted-foreground">
                          Version {entry.version}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={getChangeTypeColor(entry.changeType)}>
                        {entry.changeType}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Changed by:</span>
                      <span>{entry.changedBy}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Changes:</span>
                      <span>{entry.changes.length} modification{entry.changes.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  {entry.changes.slice(0, 2).map((change, index) => (
                    <div key={index} className="mt-2 p-2 bg-muted/30 rounded text-sm">
                      <span className="font-medium">{change.field}:</span> {change.changeDescription}
                    </div>
                  ))}

                  {entry.changes.length > 2 && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      +{entry.changes.length - 2} more changes
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {selectedEntry && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {getChangeTypeIcon(selectedEntry.changeType)}
                Change Details - Version {selectedEntry.version}
              </CardTitle>
              <Button variant="outline" onClick={() => setSelectedEntry(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Metadata</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Timestamp:</strong> {new Date(selectedEntry.timestamp).toLocaleString()}</div>
                    <div><strong>Changed by:</strong> {selectedEntry.changedBy}</div>
                    <div><strong>Change type:</strong> {selectedEntry.changeType}</div>
                    <div><strong>Session ID:</strong> {selectedEntry.metadata.sessionId}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Browser Info</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>User Agent:</strong> {selectedEntry.metadata.userAgent?.slice(0, 50)}...</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Changes ({selectedEntry.changes.length})</h4>
                <div className="space-y-2">
                  {selectedEntry.changes.map((change, index) => (
                    <div key={index} className="border rounded p-3">
                      <div className="font-medium mb-1">{change.field}</div>
                      <div className="text-sm text-muted-foreground mb-2">{change.changeDescription}</div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Old Value:</strong>
                          <pre className="mt-1 p-2 bg-red-50 rounded text-xs overflow-auto">
                            {JSON.stringify(change.oldValue, null, 2)}
                          </pre>
                        </div>
                        <div>
                          <strong>New Value:</strong>
                          <pre className="mt-1 p-2 bg-green-50 rounded text-xs overflow-auto">
                            {JSON.stringify(change.newValue, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
