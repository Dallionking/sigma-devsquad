
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MoreHorizontal, 
  Calendar, 
  Users, 
  Target, 
  Star,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed' | 'archived';
  progress: number;
  startDate: string;
  targetDate: string;
  team: string[];
  objectives: string[];
  isFavorite?: boolean;
  category?: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
}

interface ProjectKanbanViewProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
  onProjectEdit: (project: Project) => void;
  currentProjectId?: string;
}

export const ProjectKanbanView = ({ 
  projects, 
  onProjectSelect, 
  onProjectEdit,
  currentProjectId 
}: ProjectKanbanViewProps) => {
  const columns = [
    { 
      id: 'active', 
      title: 'Active', 
      projects: projects.filter(p => p.status === 'active'),
      color: 'border-green-200 bg-green-50'
    },
    { 
      id: 'paused', 
      title: 'Paused', 
      projects: projects.filter(p => p.status === 'paused'),
      color: 'border-yellow-200 bg-yellow-50'
    },
    { 
      id: 'completed', 
      title: 'Completed', 
      projects: projects.filter(p => p.status === 'completed'),
      color: 'border-blue-200 bg-blue-50'
    },
    { 
      id: 'archived', 
      title: 'Archived', 
      projects: projects.filter(p => p.status === 'archived'),
      color: 'border-gray-200 bg-gray-50'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const calculateDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {columns.map((column) => (
        <div key={column.id} className="flex-shrink-0 w-80">
          <div className={cn("border rounded-lg p-4 min-h-[600px]", column.color)}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{column.title}</h3>
                <Badge variant="secondary">
                  {column.projects.length}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {column.projects.map((project) => {
                const daysRemaining = calculateDaysRemaining(project.targetDate);
                const isSelected = project.id === currentProjectId;

                return (
                  <Card 
                    key={project.id} 
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:shadow-md border-l-4",
                      getPriorityColor(project.priority),
                      isSelected && "ring-2 ring-primary ring-offset-2"
                    )}
                    onClick={() => onProjectSelect(project)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base flex items-center gap-2">
                            <span className="truncate">{project.name}</span>
                            {project.isFavorite && (
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                            )}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            onProjectEdit(project);
                          }}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      {/* Progress */}
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-1.5" />
                      </div>

                      {/* Tags */}
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                              #{tag}
                            </Badge>
                          ))}
                          {project.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs px-2 py-0">
                              +{project.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Timeline */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {daysRemaining > 0 ? `${daysRemaining}d left` : 
                             daysRemaining === 0 ? 'Due today' : 
                             `${Math.abs(daysRemaining)}d overdue`}
                          </span>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "text-xs",
                            project.priority === 'high' && "bg-red-100 text-red-700",
                            project.priority === 'medium' && "bg-yellow-100 text-yellow-700",
                            project.priority === 'low' && "bg-green-100 text-green-700"
                          )}
                        >
                          {project.priority}
                        </Badge>
                      </div>

                      {/* Team */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          <span>{project.team.length} members</span>
                        </div>
                        <div className="flex -space-x-1">
                          {project.team.slice(0, 3).map((member, index) => (
                            <Avatar key={index} className="w-5 h-5 border border-background">
                              <AvatarFallback className="text-xs">
                                {member.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.team.length > 3 && (
                            <div className="w-5 h-5 rounded-full bg-muted border border-background flex items-center justify-center text-xs font-medium">
                              +{project.team.length - 3}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Key Objective */}
                      {project.objectives.length > 0 && (
                        <div className="text-xs">
                          <div className="flex items-center gap-1 text-muted-foreground mb-1">
                            <Target className="w-3 h-3" />
                            <span>Next objective:</span>
                          </div>
                          <p className="text-foreground line-clamp-2 bg-accent/30 px-2 py-1 rounded text-xs">
                            {project.objectives[0]}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}

              {column.projects.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                    <Plus className="w-6 h-6" />
                  </div>
                  <p className="text-sm">No {column.title.toLowerCase()} projects</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
