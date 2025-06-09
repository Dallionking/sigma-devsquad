
import React, { useState } from 'react';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { ProjectSettings } from '@/components/projects/ProjectSettings';
import { useProjects } from '@/contexts/ProjectContext';

const Projects = () => {
  const [selectedProjectForSettings, setSelectedProjectForSettings] = useState<any>(null);
  const { setCurrentProject } = useProjects();

  const handleProjectSelect = (project: any) => {
    setCurrentProject(project.id);
    // Could navigate to dashboard or project detail view
    console.log('Selected project:', project);
  };

  const handleProjectEdit = (project: any) => {
    setSelectedProjectForSettings(project);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-6 py-8">
        <ProjectGrid
          onProjectSelect={handleProjectSelect}
          onProjectEdit={handleProjectEdit}
        />
        
        {selectedProjectForSettings && (
          <ProjectSettings
            project={selectedProjectForSettings}
            open={!!selectedProjectForSettings}
            onOpenChange={(open) => !open && setSelectedProjectForSettings(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Projects;
