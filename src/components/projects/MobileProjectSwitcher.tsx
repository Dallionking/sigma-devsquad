
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FolderOpen, 
  Star, 
  Clock, 
  Search,
  Plus,
  ChevronDown,
  Check
} from 'lucide-react';
import { useProjects } from '@/contexts/ProjectContext';
import { cn } from '@/lib/utils';

export const MobileProjectSwitcher = () => {
  const { 
    projects, 
    currentProject, 
    recentProjects, 
    favoriteProjects,
    setCurrentProject, 
    toggleFavorite 
  } = useProjects();
  
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = searchQuery 
    ? projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : projects;

  const handleProjectSelect = (projectId: string) => {
    setCurrentProject(projectId);
    setOpen(false);
    setSearchQuery('');
  };

  const handleToggleFavorite = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    toggleFavorite(projectId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'paused': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'completed': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'archived': return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const ProjectItem = ({ project, showIcon }: { project: any, showIcon: React.ReactNode }) => (
    <div
      onClick={() => handleProjectSelect(project.id)}
      className="flex items-center justify-between p-4 border-b cursor-pointer hover:bg-accent/50 transition-colors"
    >
      <div className="flex items-center space-x-3 min-w-0 flex-1">
        {showIcon}
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-2">
            <div className="font-medium truncate">{project.name}</div>
            {project.id === currentProject?.id && (
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
            )}
          </div>
          <div className="text-sm text-muted-foreground truncate">
            {project.description}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {project.progress}% complete
            </span>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 flex-shrink-0"
        onClick={(e) => handleToggleFavorite(e, project.id)}
      >
        <Star 
          className={cn(
            "w-4 h-4",
            project.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
          )} 
        />
      </Button>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between text-left font-normal"
        >
          <div className="flex items-center space-x-2 min-w-0">
            <FolderOpen className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div className="truncate">
              {currentProject ? currentProject.name : "Select project..."}
            </div>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-80">
        <SheetHeader>
          <SheetTitle>Switch Project</SheetTitle>
          <SheetDescription>
            Select a project or search for one below
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-6">
              {/* Current Project */}
              {currentProject && !searchQuery && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2 px-4">
                    Current Project
                  </h4>
                  <ProjectItem 
                    project={currentProject} 
                    showIcon={<Check className="w-4 h-4 text-primary flex-shrink-0" />}
                  />
                </div>
              )}

              {/* Favorites */}
              {favoriteProjects.length > 0 && !searchQuery && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2 px-4">
                    Favorites
                  </h4>
                  <div className="space-y-0">
                    {favoriteProjects
                      .filter(p => p.id !== currentProject?.id)
                      .map((project) => (
                      <ProjectItem 
                        key={project.id}
                        project={project} 
                        showIcon={<Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Recent */}
              {recentProjects.length > 0 && !searchQuery && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2 px-4">
                    Recent
                  </h4>
                  <div className="space-y-0">
                    {recentProjects
                      .filter(p => p.id !== currentProject?.id && !favoriteProjects.some(fav => fav.id === p.id))
                      .slice(0, 3)
                      .map((project) => (
                      <ProjectItem 
                        key={project.id}
                        project={project} 
                        showIcon={<Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* All Projects */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 px-4">
                  {searchQuery ? "Search Results" : "All Projects"}
                </h4>
                <div className="space-y-0">
                  {filteredProjects
                    .filter(p => {
                      if (searchQuery) return true;
                      const isCurrentProject = p.id === currentProject?.id;
                      const isInFavorites = favoriteProjects.some(fav => fav.id === p.id);
                      const isInRecents = recentProjects.slice(0, 3).some(recent => recent.id === p.id);
                      return !isCurrentProject && !isInFavorites && !isInRecents;
                    })
                    .map((project) => (
                    <ProjectItem 
                      key={project.id}
                      project={project} 
                      showIcon={<FolderOpen className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                    />
                  ))}
                </div>
              </div>

              {/* Create New Project */}
              <div className="border-t pt-4">
                <div
                  onClick={() => {
                    setOpen(false);
                    window.location.href = '/projects';
                  }}
                  className="flex items-center space-x-3 p-4 cursor-pointer hover:bg-accent/50 transition-colors rounded-lg mx-4"
                >
                  <Plus className="w-4 h-4 text-primary" />
                  <span className="font-medium text-primary">Create New Project</span>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
