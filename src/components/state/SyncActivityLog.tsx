
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  Download, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Filter,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SyncLogEntry {
  id: string;
  timestamp: Date;
  component: string;
  operation: 'upload' | 'download' | 'merge' | 'conflict';
  status: 'success' | 'failed' | 'in_progress';
  details: string;
  size?: number;
  duration?: number;
}

export const SyncActivityLog = () => {
  const [logEntries, setLogEntries] = useState<SyncLogEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<SyncLogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [operationFilter, setOperationFilter] = useState<string>('all');

  // Mock log data
  useEffect(() => {
    const mockEntries: SyncLogEntry[] = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        component: 'Agent Configurations',
        operation: 'upload',
        status: 'success',
        details: 'Successfully synced agent configuration changes',
        size: 1.2,
        duration: 850
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        component: 'Task Definitions',
        operation: 'download',
        status: 'success',
        details: 'Downloaded latest task definitions from server',
        size: 0.8,
        duration: 650
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        component: 'Message History',
        operation: 'merge',
        status: 'failed',
        details: 'Merge conflict detected in message history',
        size: 3.4,
        duration: 1200
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 12 * 60 * 1000),
        component: 'Team Structure',
        operation: 'upload',
        status: 'success',
        details: 'Team hierarchy changes synchronized',
        size: 0.5,
        duration: 400
      },
      {
        id: '5',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        component: 'Agent Configurations',
        operation: 'conflict',
        status: 'failed',
        details: 'Conflict resolution required for agent settings',
        size: 1.1,
        duration: 0
      }
    ];

    setLogEntries(mockEntries);
    setFilteredEntries(mockEntries);
  }, []);

  // Filter entries based on search and filters
  useEffect(() => {
    let filtered = logEntries;

    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.component.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(entry => entry.status === statusFilter);
    }

    if (operationFilter !== 'all') {
      filtered = filtered.filter(entry => entry.operation === operationFilter);
    }

    setFilteredEntries(filtered);
  }, [logEntries, searchTerm, statusFilter, operationFilter]);

  const getOperationIcon = (operation: SyncLogEntry['operation']) => {
    switch (operation) {
      case 'upload': return <Upload className="w-4 h-4 text-blue-500" />;
      case 'download': return <Download className="w-4 h-4 text-green-500" />;
      case 'merge': return <FileText className="w-4 h-4 text-purple-500" />;
      case 'conflict': return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusIcon = (status: SyncLogEntry['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: SyncLogEntry['status']) => {
    switch (status) {
      case 'success': return 'default';
      case 'failed': return 'destructive';
      case 'in_progress': return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Sync Activity Log
        </CardTitle>
        
        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={operationFilter} onValueChange={setOperationFilter}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Operation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Operations</SelectItem>
              <SelectItem value="upload">Upload</SelectItem>
              <SelectItem value="download">Download</SelectItem>
              <SelectItem value="merge">Merge</SelectItem>
              <SelectItem value="conflict">Conflict</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getOperationIcon(entry.operation)}
                    <span className="font-medium">{entry.component}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(entry.status)}
                    <Badge variant={getStatusColor(entry.status) as any}>
                      {entry.status}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">{entry.details}</p>
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{entry.timestamp.toLocaleString()}</span>
                  <div className="flex gap-4">
                    {entry.size && <span>{entry.size}MB</span>}
                    {entry.duration && <span>{entry.duration}ms</span>}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredEntries.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No sync activities match your filters
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
