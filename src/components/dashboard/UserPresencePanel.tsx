
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Users, 
  ChevronDown, 
  ChevronUp,
  Activity,
  Bell,
  UserPlus,
  Zap,
  Filter,
  Search,
  Eye,
  Keyboard
} from 'lucide-react';
import { PresenceAwareness } from '@/components/collaboration/PresenceAwareness';
import { UserActivityTimeline } from '@/components/collaboration/UserActivityTimeline';
import { NotificationCenter } from '@/components/collaboration/NotificationCenter';
import { CollaborationInviteSystem } from '@/components/collaboration/CollaborationInviteSystem';
import { PerformanceDashboard } from '@/components/performance/PerformanceDashboard';
import { ViewMode } from '@/types';
import { useWebSocket } from '@/contexts/WebSocketContext';
import { useTeams } from '@/contexts/TeamContext';
import { cn } from '@/lib/utils';

interface UserPresencePanelProps {
  className?: string;
  viewMode: ViewMode;
  componentId?: string;
  projectId?: string;
  showPerformance?: boolean;
}

type FilterMode = 'all' | 'team' | 'project' | 'view';

export const UserPresencePanel = ({ 
  className, 
  viewMode,
  componentId = 'main-dashboard',
  projectId = 'current-project',
  showPerformance = false
}: UserPresencePanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'presence' | 'activity' | 'performance' | 'invite'>('presence');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');

  const { presenceUsers } = useWebSocket();
  const { teams } = useTeams();

  // Keyboard shortcuts for tab switching
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isExpanded || !event.ctrlKey) return;
      
      switch (event.key) {
        case '1':
          event.preventDefault();
          setActiveTab('presence');
          break;
        case '2':
          event.preventDefault();
          setActiveTab('activity');
          break;
        case '3':
          if (showPerformance) {
            event.preventDefault();
            setActiveTab('performance');
          }
          break;
        case '4':
          event.preventDefault();
          setActiveTab('invite');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, showPerformance]);

  const getViewModeLabel = (mode: ViewMode) => {
    switch (mode) {
      case 'workflow': return 'Workflow View';
      case 'communication': return 'Communication Hub';
      case 'tasks': return 'Task Management';
      case 'messages': return 'Messages';
      default: return 'Dashboard';
    }
  };

  const getContextualPresenceInfo = useCallback(() => {
    const totalUsers = presenceUsers.length;
    const currentViewUsers = presenceUsers.filter(user => user.activeComponent === componentId).length;
    const teamUsers = selectedTeam !== 'all' 
      ? presenceUsers.filter(user => user.activeComponent?.includes(selectedTeam)).length 
      : totalUsers;

    return {
      total: totalUsers,
      currentView: currentViewUsers,
      team: teamUsers,
      viewSpecific: presenceUsers.filter(user => 
        user.activeComponent?.includes(viewMode) || 
        user.activeComponent === componentId
      ).length
    };
  }, [presenceUsers, componentId, selectedTeam, viewMode]);

  const getFilteredUsers = useCallback(() => {
    let filtered = presenceUsers;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply team filter
    if (selectedTeam !== 'all') {
      filtered = filtered.filter(user => 
        user.activeComponent?.includes(selectedTeam)
      );
    }

    // Apply filter mode
    switch (filterMode) {
      case 'view':
        filtered = filtered.filter(user => 
          user.activeComponent === componentId ||
          user.activeComponent?.includes(viewMode)
        );
        break;
      case 'project':
        filtered = filtered.filter(user => 
          user.activeComponent?.includes(projectId)
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [presenceUsers, searchQuery, selectedTeam, filterMode, componentId, viewMode, projectId]);

  const contextInfo = getContextualPresenceInfo();
  const filteredUsers = getFilteredUsers();

  const tabs = [
    { key: 'presence' as const, label: 'Presence', icon: Users, shortcut: 'Ctrl+1' },
    { key: 'activity' as const, label: 'Activity', icon: Activity, shortcut: 'Ctrl+2' },
    ...(showPerformance ? [{ key: 'performance' as const, label: 'Performance', icon: Zap, shortcut: 'Ctrl+3' }] : []),
    { key: 'invite' as const, label: 'Invite', icon: UserPlus, shortcut: showPerformance ? 'Ctrl+4' : 'Ctrl+3' }
  ];

  return (
    <div className={cn("border-t border-border/30 bg-card/50 backdrop-blur-sm", className)}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <div className="w-full cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gradient-to-br from-[#10B981] via-[#8B5CF6] to-[#10B981] rounded-md flex items-center justify-center">
                  <Users className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold bg-gradient-to-r from-[#10B981] to-[#8B5CF6] bg-clip-text text-transparent">
                    User Presence & Collaboration
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{getViewModeLabel(viewMode)} • Real-time collaboration</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Eye className="w-2 h-2 mr-1" />
                        {contextInfo.currentView} in view
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {contextInfo.total} total
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <PresenceAwareness 
                  componentId={componentId}
                  showLabels={false}
                  maxVisible={3}
                />
                <NotificationCenter />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronUp className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="animate-accordion-down">
          <div className="border-t border-border/20">
            {/* Enhanced Tab Navigation with Shortcuts */}
            <div className="px-4 py-2 border-b border-border/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.key;
                    
                    return (
                      <Button
                        key={tab.key}
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setActiveTab(tab.key)}
                        className={cn(
                          "h-8 px-3 text-xs relative group",
                          isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                        )}
                        title={`${tab.label} (${tab.shortcut})`}
                      >
                        <Icon className="w-3 h-3 mr-1" />
                        {tab.label}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          {tab.shortcut}
                        </div>
                      </Button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Keyboard className="w-3 h-3" />
                  <span>Ctrl+1-4</span>
                </div>
              </div>
            </div>

            {/* Filtering Controls */}
            <div className="px-4 py-2 border-b border-border/20 bg-muted/20">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2 h-3 w-3 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-7 h-7 text-xs"
                  />
                </div>
                
                <Select value={filterMode} onValueChange={(value: FilterMode) => setFilterMode(value)}>
                  <SelectTrigger className="w-24 h-7 text-xs">
                    <Filter className="w-3 h-3 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="view">View</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                  <SelectTrigger className="w-32 h-7 text-xs">
                    <SelectValue placeholder="Team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teams</SelectItem>
                    {teams?.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-4 max-h-64 overflow-y-auto">
              {activeTab === 'presence' && (
                <div className="space-y-4">
                  {/* Context-Aware Presence Summary */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-muted/50 p-2 rounded">
                      <div className="font-medium text-[#10B981]">{contextInfo.currentView}</div>
                      <div className="text-muted-foreground">Current View</div>
                    </div>
                    <div className="bg-muted/50 p-2 rounded">
                      <div className="font-medium text-[#8B5CF6]">{contextInfo.viewSpecific}</div>
                      <div className="text-muted-foreground">{viewMode} Mode</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      Active Users
                      <Badge variant="secondary" className="text-xs">
                        {filteredUsers.length}
                      </Badge>
                    </h4>
                    <PresenceAwareness 
                      componentId={componentId}
                      showLabels={true}
                      className="justify-start"
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Component Activity</h4>
                    <div className="space-y-2">
                      {[componentId, 'agent-grid', 'task-management', 'workflow-canvas'].map((compId) => {
                        const componentUsers = presenceUsers.filter(u => u.activeComponent === compId);
                        return (
                          <div key={compId} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                            <span className="text-xs font-medium capitalize">
                              {compId.replace('-', ' ')}
                            </span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {componentUsers.length}
                              </Badge>
                              <PresenceAwareness 
                                componentId={compId}
                                showLabels={false}
                                maxVisible={2}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <UserActivityTimeline />
              )}

              {activeTab === 'performance' && showPerformance && (
                <PerformanceDashboard autoRefresh={true} refreshInterval={5000} />
              )}

              {activeTab === 'invite' && (
                <CollaborationInviteSystem projectId={projectId} />
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
