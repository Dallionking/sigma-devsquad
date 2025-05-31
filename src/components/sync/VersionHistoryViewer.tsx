import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { History, GitBranch, User, Clock, Diff, Restore, Eye } from "lucide-react";

interface VersionEntry {
  id: string;
  timestamp: Date;
  author: string;
  message: string;
  changes: number;
  type: 'local' | 'remote' | 'merge';
  conflictResolution?: {
    method: 'local' | 'remote' | 'merge';
    conflictsCount: number;
  };
}

interface VersionHistoryViewerProps {
  file: string;
  onRestoreVersion: (versionId: string) => void;
  onCompareVersions: (versionA: string, versionB: string) => void;
}

export const VersionHistoryViewer = ({
  file,
  onRestoreVersion,
  onCompareVersions
}: VersionHistoryViewerProps) => {
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);

  // Mock version history data
  const versions: VersionEntry[] = [
    {
      id: 'v1.2.3',
      timestamp: new Date(Date.now() - 5 * 60000),
      author: 'Alice Smith',
      message: 'Resolved merge conflict in component structure',
      changes: 12,
      type: 'merge',
      conflictResolution: {
        method: 'merge',
        conflictsCount: 3
      }
    },
    {
      id: 'v1.2.2',
      timestamp: new Date(Date.now() - 15 * 60000),
      author: 'Bob Johnson',
      message: 'Updated styling and layout components',
      changes: 8,
      type: 'remote'
    },
    {
      id: 'v1.2.1',
      timestamp: new Date(Date.now() - 30 * 60000),
      author: 'Current User',
      message: 'Fixed responsive design issues',
      changes: 5,
      type: 'local'
    },
    {
      id: 'v1.2.0',
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      author: 'Alice Smith',
      message: 'Major refactoring of state management',
      changes: 24,
      type: 'merge',
      conflictResolution: {
        method: 'local',
        conflictsCount: 7
      }
    },
    {
      id: 'v1.1.9',
      timestamp: new Date(Date.now() - 4 * 60 * 60000),
      author: 'Charlie Brown',
      message: 'Added new collaboration features',
      changes: 15,
      type: 'remote'
    }
  ];

  const toggleVersionSelection = (versionId: string) => {
    setSelectedVersions(prev => {
      if (prev.includes(versionId)) {
        return prev.filter(id => id !== versionId);
      } else if (prev.length < 2) {
        return [...prev, versionId];
      } else {
        return [prev[1], versionId]; // Replace oldest selection
      }
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'merge': return <GitBranch className="w-4 h-4 text-purple-500" />;
      case 'remote': return <User className="w-4 h-4 text-blue-500" />;
      case 'local': return <User className="w-4 h-4 text-green-500" />;
      default: return <History className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      merge: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
      remote: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
      local: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <History className="w-5 h-5" />
            <span>Version History: {file}</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            {selectedVersions.length === 2 && (
              <Button 
                size="sm"
                onClick={() => onCompareVersions(selectedVersions[0], selectedVersions[1])}
              >
                <Diff className="w-4 h-4 mr-1" />
                Compare
              </Button>
            )}
            <Badge variant="outline">
              {versions.length} versions
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {versions.map((version, index) => (
              <div key={version.id}>
                <div 
                  className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                    selectedVersions.includes(version.id)
                      ? 'bg-primary/10 border-primary'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => toggleVersionSelection(version.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {version.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          {getTypeIcon(version.type)}
                          <span className="font-medium text-sm">{version.id}</span>
                          <Badge className={getTypeBadge(version.type)}>
                            {version.type}
                          </Badge>
                          {version.conflictResolution && (
                            <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-950">
                              {version.conflictResolution.conflictsCount} conflicts resolved
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-foreground mb-2">
                          {version.message}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{version.author}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimeAgo(version.timestamp)}</span>
                          </span>
                          <span>{version.changes} changes</span>
                        </div>

                        {version.conflictResolution && (
                          <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-950 rounded text-xs">
                            <span className="font-medium">Conflict Resolution:</span> 
                            Used {version.conflictResolution.method} version for {version.conflictResolution.conflictsCount} conflicts
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 ml-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle preview
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRestoreVersion(version.id);
                        }}
                      >
                        <Restore className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {index < versions.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </ScrollArea>

        {selectedVersions.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-sm">
              <span className="font-medium">Selected:</span> {selectedVersions.join(', ')}
              {selectedVersions.length === 2 && (
                <span className="ml-2 text-muted-foreground">
                  Ready to compare versions
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
