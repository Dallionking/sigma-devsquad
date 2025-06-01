
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Filter, Grid, List, FolderPlus } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { ProjectCreationWizard } from './ProjectCreationWizard';
import { SampleProjectsModal } from '@/components/sample-projects/SampleProjectsModal';
import { useProjects } from '@/contexts/ProjectContext';
import { cn } from '@/lib/utils';

interface ProjectGridProps {
  onProjectSelect?: (project: any) => void;
  onProjectEdit?: (project: any) => void;
}

export const ProjectGrid = ({ onProjectSelect, onProjectEdit }: ProjectGridProps) => {
  const { projects, currentProject, setCurrentProject } = useProjects();
  const [showCreationWizard, setShowCreationWizard] = useState(false);
  const [showSampleProjects, setShowSampleProjects] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused' | 'completed' | 'archived'>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const projectsByStatus = {
    active: filteredProjects.filter(p => p.status === 'active'),
    paused: filteredProjects.filter(p => p.status === 'paused'),
    completed: filteredProjects.filter(p => p.status === 'completed'),
    archived: filteredProjects.filter(p => p.status === 'archived')
  };

  const handleProjectSelect = (project: any) => {
    setCurrentProject(project.id);
    onProjectSelect?.(project);
  };

  const handleProjectEdit = (project: any) => {
    onProjectEdit?.(project);
  };

  const getStatusCount = (status: string) => {
    return projects.filter(p => p.status === status).length;
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
            onClick={() => setShowSampleProjects(true)}
            className="flex items-center space-x-2"
          >
            <FolderPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Browse Templates</span>
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

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
                {statusFilter !== 'all' && (
                  <Badge variant="secondary" className="ml-2">
                    {statusFilter}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                All Projects ({projects.length})
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter('active')}>
                Active ({getStatusCount('active')})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('paused')}>
                Paused ({getStatusCount('paused')})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('completed')}>
                Completed ({getStatusCount('completed')})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('archived')}>
                Archived ({getStatusCount('archived')})
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
          </div>
        </div>
      </div>

      {/* Project Status Tabs */}
      <Tabs value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({projects.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({getStatusCount('active')})</TabsTrigger>
          <TabsTrigger value="paused">Paused ({getStatusCount('paused')})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({getStatusCount('completed')})</TabsTrigger>
          <TabsTrigger value="archived">Archived ({getStatusCount('archived')})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <ProjectGridContent 
            projects={filteredProjects}
            viewMode={viewMode}
            onProjectSelect={handleProjectSelect}
            onProjectEdit={handleProjectEdit}
            currentProjectId={currentProject?.id}
          />
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <ProjectGridContent 
            projects={projectsByStatus.active}
            viewMode={viewMode}
            onProjectSelect={handleProjectSelect}
            onProjectEdit={handleProjectEdit}
            currentProjectId={currentProject?.id}
          />
        </TabsContent>

        <TabsContent value="paused" className="mt-6">
          <ProjectGridContent 
            projects={projectsByStatus.paused}
            viewMode={viewMode}
            onProjectSelect={handleProjectSelect}
            onProjectEdit={handleProjectEdit}
            currentProjectId={currentProject?.id}
          />
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <ProjectGridContent 
            projects={projectsByStatus.completed}
            viewMode={viewMode}
            onProjectSelect={handleProjectSelect}
            onProjectEdit={handleProjectEdit}
            currentProjectId={currentProject?.id}
          />
        </TabsContent>

        <TabsContent value="archived" className="mt-6">
          <ProjectGridContent 
            projects={projectsByStatus.archived}
            viewMode={viewMode}
            onProjectSelect={handleProjectSelect}
            onProjectEdit={handleProjectEdit}
            currentProjectId={currentProject?.id}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <ProjectCreationWizard
        open={showCreationWizard}
        onOpenChange={setShowCreationWizard}
      />
      
      <SampleProjectsModal
        open={showSampleProjects}
        onOpenChange={setShowSampleProjects}
      />
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
