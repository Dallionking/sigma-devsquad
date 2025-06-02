
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  History, 
  GitBranch, 
  Download,
  RefreshCw,
  Compare,
  Timeline,
  Activity
} from 'lucide-react';
import { useWorkflowHistory } from '@/hooks/useWorkflowHistory';
import { WorkflowAuditTrail } from './WorkflowAuditTrail';
import { WorkflowTimeline } from './WorkflowTimeline';
import { WorkflowVersionControl } from './WorkflowVersionControl';
import { WorkflowComparison } from './WorkflowComparison';

interface WorkflowHistoryPanelProps {
  workflowId?: string;
}

export const WorkflowHistoryPanel: React.FC<WorkflowHistoryPanelProps> = ({
  workflowId
}) => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>(workflowId || 'all');
  const [activeTab, setActiveTab] = useState('audit-trail');
  
  const {
    history,
    versions,
    getWorkflowHistory,
    getWorkflowVersions,
    exportHistory
  } = useWorkflowHistory();

  const filteredHistory = selectedWorkflow === 'all' 
    ? history 
    : getWorkflowHistory(selectedWorkflow);

  const filteredVersions = selectedWorkflow === 'all'
    ? versions
    : getWorkflowVersions(selectedWorkflow);

  const uniqueWorkflows = [...new Set(history.map(h => h.workflowId))];

  const handleExport = () => {
    exportHistory(selectedWorkflow === 'all' ? undefined : selectedWorkflow);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-blue-500" />
                Workflow History & Analytics
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Track changes, analyze performance, and manage workflow versions
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedWorkflow} onValueChange={setSelectedWorkflow}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select workflow" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Workflows</SelectItem>
                  {uniqueWorkflows.map(workflowId => (
                    <SelectItem key={workflowId} value={workflowId}>
                      Workflow {workflowId.slice(-8)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{filteredHistory.length}</div>
              <div className="text-sm text-muted-foreground">History Entries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{filteredVersions.length}</div>
              <div className="text-sm text-muted-foreground">Versions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {filteredHistory.filter(h => h.changeType === 'executed').length}
              </div>
              <div className="text-sm text-muted-foreground">Executions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {filteredVersions.filter(v => v.isActive).length}
              </div>
              <div className="text-sm text-muted-foreground">Active Versions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="audit-trail" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Audit Trail
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Timeline className="w-4 h-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="versions" className="flex items-center gap-2">
            <GitBranch className="w-4 h-4" />
            Versions
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <Compare className="w-4 h-4" />
            Compare
          </TabsTrigger>
        </TabsList>

        <TabsContent value="audit-trail" className="mt-6">
          <WorkflowAuditTrail 
            history={filteredHistory}
            workflowId={selectedWorkflow === 'all' ? undefined : selectedWorkflow}
          />
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <WorkflowTimeline 
            history={filteredHistory}
            workflowId={selectedWorkflow === 'all' ? undefined : selectedWorkflow}
          />
        </TabsContent>

        <TabsContent value="versions" className="mt-6">
          <WorkflowVersionControl 
            versions={filteredVersions}
            workflowId={selectedWorkflow === 'all' ? undefined : selectedWorkflow}
          />
        </TabsContent>

        <TabsContent value="comparison" className="mt-6">
          <WorkflowComparison 
            versions={filteredVersions}
            workflowId={selectedWorkflow === 'all' ? undefined : selectedWorkflow}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
