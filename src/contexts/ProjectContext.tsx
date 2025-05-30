
import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  createdAt: string;
  updatedAt: string;
}

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  removeProject: (id: string) => void;
  setCurrentProject: (id: string) => void;
  getProjectById: (id: string) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

// Mock initial project data
const mockProjects: Project[] = [
  {
    id: "ai-workforce",
    name: "AI Development Workforce",
    description: "A comprehensive platform for managing AI agents in software development workflows",
    status: "active",
    progress: 65,
    startDate: "2024-05-01",
    targetDate: "2024-07-15",
    team: ["Planning Agent", "Frontend Agent", "Backend Agent", "QA Agent"],
    objectives: [
      "Create intuitive agent management interface",
      "Implement real-time workflow visualization",
      "Integrate multiple development tools",
      "Ensure scalable architecture"
    ],
    createdAt: "2024-05-01T00:00:00Z",
    updatedAt: "2024-05-30T10:00:00Z"
  }
];

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [currentProject, setCurrentProjectState] = useState<Project | null>(mockProjects[0]);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project => {
    const newProject: Project = {
      ...projectData,
      id: `project_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProjects(prev => [...prev, newProject]);
    console.log('New project created:', newProject);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id 
        ? { ...project, ...updates, updatedAt: new Date().toISOString() } 
        : project
    ));

    // Update current project if it's the one being updated
    if (currentProject?.id === id) {
      setCurrentProjectState(prev => prev ? { ...prev, ...updates, updatedAt: new Date().toISOString() } : prev);
    }
  };

  const removeProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    
    // Clear current project if it's the one being removed
    if (currentProject?.id === id) {
      setCurrentProjectState(null);
    }
  };

  const setCurrentProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    setCurrentProjectState(project || null);
  };

  const getProjectById = (id: string) => {
    return projects.find(project => project.id === id);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      currentProject,
      addProject,
      updateProject,
      removeProject,
      setCurrentProject,
      getProjectById
    }}>
      {children}
    </ProjectContext.Provider>
  );
};
