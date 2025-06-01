
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  ChevronDown, 
  Search, 
  Star, 
  Clock, 
  FolderOpen,
  Plus,
  Check
} from 'lucide-react';
import { useProjects } from '@/contexts/ProjectContext';
import { cn } from '@/lib/utils';

export const ProjectSwitcher = () => {
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] justify-between text-left font-normal"
        >
          <div className="flex items-center space-x-3 min-w-0">
            <FolderOpen className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="truncate">
                {currentProject ? currentProject.name : "Select project..."}
              </div>
              {currentProject && (
                <div className="text-xs text-muted-foreground truncate">
                  {currentProject.description}
                </div>
              )}
            </div>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0" align="start">
        <Command>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Search projects..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList className="max-h-[400px]">
            <CommandEmpty>No projects found.</CommandEmpty>
            
            {/* Current Project */}
            {currentProject && (
              <>
                <CommandGroup heading="Current Project">
                  <CommandItem
                    key={currentProject.id}
                    onSelect={() => handleProjectSelect(currentProject.id)}
                    className="flex items-center justify-between p-3"
                  >
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <Check className="w-4 h-4 text-primary" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{currentProject.name}</div>
                        <div className="text-sm text-muted-foreground truncate">
                          {currentProject.description}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className={getStatusColor(currentProject.status)}>
                            {currentProject.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {currentProject.progress}% complete
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => handleToggleFavorite(e, currentProject.id)}
                    >
                      <Star 
                        className={cn(
                          "w-3 h-3",
                          currentProject.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        )} 
                      />
                    </Button>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {/* Favorite Projects */}
            {favoriteProjects.length > 0 && !searchQuery && (
              <>
                <CommandGroup heading="Favorites">
                  {favoriteProjects
                    .filter(p => p.id !== currentProject?.id)
                    .map((project) => (
                    <CommandItem
                      key={project.id}
                      onSelect={() => handleProjectSelect(project.id)}
                      className="flex items-center justify-between p-3"
                    >
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium truncate">{project.name}</div>
                          <div className="text-sm text-muted-foreground truncate">
                            {project.description}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
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
                        className="h-6 w-6 p-0"
                        onClick={(e) => handleToggleFavorite(e, project.id)}
                      >
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      </Button>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {/* Recent Projects */}
            {recentProjects.length > 0 && !searchQuery && (
              <>
                <CommandGroup heading="Recent">
                  {recentProjects
                    .filter(p => p.id !== currentProject?.id && !favoriteProjects.some(fav => fav.id === p.id))
                    .slice(0, 3)
                    .map((project) => (
                    <CommandItem
                      key={project.id}
                      onSelect={() => handleProjectSelect(project.id)}
                      className="flex items-center justify-between p-3"
                    >
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium truncate">{project.name}</div>
                          <div className="text-sm text-muted-foreground truncate">
                            {project.description}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
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
                        className="h-6 w-6 p-0"
                        onClick={(e) => handleToggleFavorite(e, project.id)}
                      >
                        <Star 
                          className={cn(
                            "w-3 h-3",
                            project.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                          )} 
                        />
                      </Button>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {/* All Projects (when searching or as fallback) */}
            <CommandGroup heading={searchQuery ? "Search Results" : "All Projects"}>
              {filteredProjects
                .filter(p => {
                  // Hide current project and already shown favorites/recents when not searching
                  if (searchQuery) return true;
                  const isCurrentProject = p.id === currentProject?.id;
                  const isInFavorites = favoriteProjects.some(fav => fav.id === p.id);
                  const isInRecents = recentProjects.slice(0, 3).some(recent => recent.id === p.id);
                  return !isCurrentProject && !isInFavorites && !isInRecents;
                })
                .map((project) => (
                <CommandItem
                  key={project.id}
                  onSelect={() => handleProjectSelect(project.id)}
                  className="flex items-center justify-between p-3"
                >
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <FolderOpen className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium truncate">{project.name}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {project.description}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
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
                    className="h-6 w-6 p-0"
                    onClick={(e) => handleToggleFavorite(e, project.id)}
                  >
                    <Star 
                      className={cn(
                        "w-3 h-3",
                        project.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      )} 
                    />
                  </Button>
                </CommandItem>
              ))}
            </CommandGroup>

            {/* Create New Project Action */}
            <CommandSeparator />
            <CommandGroup>
              <CommandItem 
                onSelect={() => {
                  setOpen(false);
                  // Navigate to projects page or trigger creation modal
                  window.location.href = '/projects';
                }}
                className="p-3"
              >
                <div className="flex items-center space-x-3">
                  <Plus className="w-4 h-4 text-primary" />
                  <span className="font-medium text-primary">Create New Project</span>
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
