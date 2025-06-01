
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Grid, List, Kanban, FolderPlus, Settings } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { ProjectCreationWizard } from './ProjectCreationWizard';
import { SampleProjectsModal } from '@/components/sample-projects/SampleProjectsModal';
import { ProjectFilters, SortOption, SortDirection } from './ProjectFilters';
import { ProjectKanbanView } from './ProjectKanbanView';
import { CategoryManager } from './CategoryManager';
import { useProjects } from '@/contexts/ProjectContext';
import { cn } from '@/lib/utils';

interface ProjectGridProps {
  onProjectSelect?: (project: any) => void;
  onProjectEdit?: (project: any) => void;
}

export const ProjectGrid = ({ onProjectSelect, onProjectEdit }: ProjectGridProps) => {
  const { projects, currentProject, setCurrentProject, categories } = useProjects();
  const [showCreationWizard, setShowCreationWizard] = useState(false);
  const [showSampleProjects, setShowSampleProjects] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'kanban'>('grid');

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('updated');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          project.name.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.objectives.some(obj => obj.toLowerCase().includes(query)) ||
          project.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== null) {
        if (project.category !== selectedCategory) return false;
      }

      // Tags filter
      if (selectedTags.length > 0) {
        if (!selectedTags.some(tag => project.tags.includes(tag))) return false;
      }

      // Status filter
      if (selectedStatuses.length > 0) {
        if (!selectedStatuses.includes(project.status)) return false;
      }

      // Priority filter
      if (selectedPriorities.length > 0) {
        if (!selectedPriorities.includes(project.priority)) return false;
      }

      // Favorites filter
      if (showFavoritesOnly && !project.isFavorite) return false;

      return true;
    });

    // Sort projects
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'created':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'updated':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'progress':
          comparison = a.progress - b.progress;
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'deadline':
          comparison = new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [projects, searchQuery, selectedCategory, selectedTags, selectedStatuses, selectedPriorities, sortBy, sortDirection, showFavoritesOnly]);

  const handleProjectSelect = (project: any) => {
    setCurrentProject(project.id);
    onProjectSelect?.(project);
  };

  const handleProjectEdit = (project: any) => {
    onProjectEdit?.(project);
  };

  const handleSortChange = (newSortBy: SortOption, newDirection: SortDirection) => {
    setSortBy(newSortBy);
    setSortDirection(newDirection);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage and organize your development projects
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowCategoryManager(true)}
            className="flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Categories</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowSampleProjects(true)}
            className="flex items-center space-x-2"
          >
            <FolderPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Templates</span>
          </Button>
          <Button
            onClick={() => setShowCreationWizard(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <ProjectFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        selectedStatuses={selectedStatuses}
        onStatusesChange={setSelectedStatuses}
        selectedPriorities={selectedPriorities}
        onPrioritiesChange={setSelectedPriorities}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        showFavoritesOnly={showFavoritesOnly}
        onFavoritesToggle={setShowFavoritesOnly}
      />

      {/* View Mode Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {filteredAndSortedProjects.length} project{filteredAndSortedProjects.length !== 1 ? 's' : ''}
          </span>
          {selectedCategory && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: categories.find(c => c.id === selectedCategory)?.color }}
              />
              {categories.find(c => c.id === selectedCategory)?.name}
            </Badge>
          )}
        </div>

        <div className="flex border rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="h-8 w-8 p-0"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="h-8 w-8 p-0"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'kanban' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('kanban')}
            className="h-8 w-8 p-0"
          >
            <Kanban className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Projects Display */}
      {viewMode === 'kanban' ? (
        <ProjectKanbanView
          projects={filteredAndSortedProjects}
          onProjectSelect={handleProjectSelect}
          onProjectEdit={handleProjectEdit}
          currentProjectId={currentProject?.id}
        />
      ) : (
        <ProjectGridContent 
          projects={filteredAndSortedProjects}
          viewMode={viewMode as 'grid' | 'list'}
          onProjectSelect={handleProjectSelect}
          onProjectEdit={handleProjectEdit}
          currentProjectId={currentProject?.id}
        />
      )}

      {/* Modals */}
      <ProjectCreationWizard
        open={showCreationWizard}
        onOpenChange={setShowCreationWizard}
      />
      
      <SampleProjectsModal
        open={showSampleProjects}
        onOpenChange={setShowSampleProjects}
      />

      {/* Category Manager Dialog */}
      {showCategoryManager && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Manage Categories</h2>
              <Button variant="ghost" onClick={() => setShowCategoryManager(false)}>
                ✕
              </Button>
            </div>
            <CategoryManager />
          </div>
        </div>
      )}
    </div>
  );
};

interface ProjectGridContentProps {
  projects: any[];
  viewMode: 'grid' | 'list';
  onProjectSelect: (project: any) => void;
  onProjectEdit: (project: any) => void;
  currentProjectId?: string;
}

const ProjectGridContent = ({ 
  projects, 
  viewMode, 
  onProjectSelect, 
  onProjectEdit,
  currentProjectId 
}: ProjectGridContentProps) => {
  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FolderPlus className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground text-center mb-4">
            No projects match your current filters. Try adjusting your search or filter criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn(
      viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "space-y-4"
    )}>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onSelect={onProjectSelect}
          onEdit={onProjectEdit}
          isSelected={project.id === currentProjectId}
        />
      ))}
    </div>
  );
};
