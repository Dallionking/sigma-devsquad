
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Calendar, Users, Target, Settings, Archive, Play, Pause, Star, Tag, TrendingUp } from 'lucide-react';
import { useProjects } from '@/contexts/ProjectContext';
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

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  onEdit: (project: Project) => void;
  isSelected?: boolean;
}

export const ProjectCard = ({ project, onSelect, onEdit, isSelected = false }: ProjectCardProps) => {
  const { updateProject, toggleFavorite, categories } = useProjects();

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: Project['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'active': return <Play className="w-3 h-3" />;
      case 'paused': return <Pause className="w-3 h-3" />;
      case 'completed': return <Target className="w-3 h-3" />;
      case 'archived': return <Archive className="w-3 h-3" />;
      default: return null;
    }
  };

  const handleStatusChange = (newStatus: Project['status']) => {
    updateProject(project.id, { status: newStatus });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(project.id);
  };

  const calculateDaysRemaining = () => {
    const today = new Date();
    const target = new Date(project.targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining();
  const category = categories.find(c => c.id === project.category);

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group relative",
        isSelected && "ring-2 ring-primary ring-offset-2"
      )}
      onClick={() => onSelect(project)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Category indicator */}
            {category && (
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-xs text-muted-foreground">{category.name}</span>
              </div>
            )}

            <CardTitle className="text-lg flex items-center space-x-2">
              <span>{project.name}</span>
              <div className="flex items-center gap-1">
                <Badge variant="secondary" className={getStatusColor(project.status)}>
                  {getStatusIcon(project.status)}
                  <span className="ml-1 capitalize">{project.status}</span>
                </Badge>
                <Badge variant="secondary" className={getPriorityColor(project.priority)}>
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {project.priority}
                </Badge>
              </div>
            </CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {project.description}
            </CardDescription>
          </div>
          
          <div className="flex items-center space-x-1">
            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
              onClick={handleToggleFavorite}
            >
              <Star 
                className={cn(
                  "w-4 h-4",
                  project.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                )} 
              />
            </Button>

            {/* Menu Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(project); }}>
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Project
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleToggleFavorite(e); }}>
                  <Star className={cn(
                    "w-4 h-4 mr-2",
                    project.isFavorite ? "fill-yellow-400 text-yellow-400" : ""
                  )} />
                  {project.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </DropdownMenuItem>
                {project.status === 'active' && (
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleStatusChange('paused'); }}>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Project
                  </DropdownMenuItem>
                )}
                {project.status === 'paused' && (
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleStatusChange('active'); }}>
                    <Play className="w-4 h-4 mr-2" />
                    Resume Project
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleStatusChange('archived'); }}>
                  <Archive className="w-4 h-4 mr-2" />
                  Archive Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.tags.length - 4} more
              </Badge>
            )}
          </div>
        )}

        {/* Timeline */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>
              {daysRemaining > 0 ? `${daysRemaining} days left` : 
               daysRemaining === 0 ? 'Due today' : 
               `${Math.abs(daysRemaining)} days overdue`}
            </span>
          </div>
          <span className="text-muted-foreground">
            Due {new Date(project.targetDate).toLocaleDateString()}
          </span>
        </div>

        {/* Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>{project.team.length} team members</span>
          </div>
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map((member, index) => (
              <Avatar key={index} className="w-6 h-6 border-2 border-background">
                <AvatarFallback className="text-xs">
                  {member.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.team.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                +{project.team.length - 3}
              </div>
            )}
          </div>
        </div>

        {/* Objectives Preview */}
        <div>
          <p className="text-sm text-muted-foreground mb-1">Key Objectives:</p>
          <div className="space-y-1">
            {project.objectives.slice(0, 2).map((objective, index) => (
              <div key={index} className="text-xs bg-accent/50 px-2 py-1 rounded">
                {objective}
              </div>
            ))}
            {project.objectives.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{project.objectives.length - 2} more objectives
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
