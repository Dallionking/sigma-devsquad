
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
  isFavorite?: boolean;
  lastAccessed?: string;
}

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  recentProjects: Project[];
  favoriteProjects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  removeProject: (id: string) => void;
  setCurrentProject: (id: string) => void;
  getProjectById: (id: string) => Project | undefined;
  toggleFavorite: (id: string) => void;
  searchProjects: (query: string) => Project[];
  markAsAccessed: (id: string) => void;
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
    updatedAt: "2024-05-30T10:00:00Z",
    isFavorite: true,
    lastAccessed: new Date().toISOString()
  },
  {
    id: "mobile-app",
    name: "Mobile Companion App",
    description: "Cross-platform mobile application for remote agent monitoring",
    status: "paused",
    progress: 30,
    startDate: "2024-04-15",
    targetDate: "2024-08-01",
    team: ["Mobile Agent", "Design Agent"],
    objectives: [
      "Develop React Native application",
      "Implement push notifications",
      "Create offline capabilities"
    ],
    createdAt: "2024-04-15T00:00:00Z",
    updatedAt: "2024-05-20T10:00:00Z",
    isFavorite: false,
    lastAccessed: "2024-05-28T10:00:00Z"
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    description: "Advanced analytics and reporting dashboard for agent performance",
    status: "completed",
    progress: 100,
    startDate: "2024-03-01",
    targetDate: "2024-05-01",
    team: ["Analytics Agent", "Visualization Agent"],
    objectives: [
      "Create real-time analytics views",
      "Implement custom reporting",
      "Build performance metrics"
    ],
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-05-01T10:00:00Z",
    isFavorite: true,
    lastAccessed: "2024-05-25T10:00:00Z"
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
      updatedAt: new Date().toISOString(),
      isFavorite: false,
      lastAccessed: new Date().toISOString()
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
    if (project) {
      setCurrentProjectState(project);
      markAsAccessed(id);
    }
  };

  const getProjectById = (id: string) => {
    return projects.find(project => project.id === id);
  };

  const toggleFavorite = (id: string) => {
    updateProject(id, { 
      isFavorite: !projects.find(p => p.id === id)?.isFavorite 
    });
  };

  const searchProjects = (query: string): Project[] => {
    if (!query.trim()) return projects;
    
    const lowercaseQuery = query.toLowerCase();
    return projects.filter(project =>
      project.name.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.objectives.some(obj => obj.toLowerCase().includes(lowercaseQuery))
    );
  };

  const markAsAccessed = (id: string) => {
    updateProject(id, { lastAccessed: new Date().toISOString() });
  };

  // Computed values for recent and favorite projects
  const recentProjects = [...projects]
    .filter(p => p.lastAccessed)
    .sort((a, b) => new Date(b.lastAccessed!).getTime() - new Date(a.lastAccessed!).getTime())
    .slice(0, 5);

  const favoriteProjects = projects.filter(p => p.isFavorite);

  return (
    <ProjectContext.Provider value={{
      projects,
      currentProject,
      recentProjects,
      favoriteProjects,
      addProject,
      updateProject,
      removeProject,
      setCurrentProject,
      getProjectById,
      toggleFavorite,
      searchProjects,
      markAsAccessed
    }}>
      {children}
    </ProjectContext.Provider>
  );
};
