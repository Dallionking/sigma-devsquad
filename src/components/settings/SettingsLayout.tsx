
import { ReactNode } from "react";
import { Header } from "@/components/dashboard/Header";
import { SettingsHeader } from "./SettingsHeader";
import { AdvancedSearchBar } from "./AdvancedSearchBar";
import { Agent } from "@/types";

interface SettingsLayoutProps {
  children: ReactNode;
  searchQuery: string;
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
}

export const SettingsLayout = ({
  children,
  searchQuery,
  onSearch,
  onFilterChange,
}: SettingsLayoutProps) => {
  const mockAgents: Agent[] = [
    { 
      id: "1", 
      type: "planning", 
      name: "Planning Agent", 
      status: "working", 
      currentTask: "Active", 
      progress: 75, 
      lastActive: "2024-05-30T10:30:00Z",
      capabilities: ["requirement-analysis", "project-planning"],
      specialization: "Project Planning",
      background: "Expert in project planning and requirements analysis",
      description: "Analyzes requirements and creates project roadmaps"
    },
    { 
      id: "2", 
      type: "frontend", 
      name: "Frontend Agent", 
      status: "idle", 
      currentTask: "Idle", 
      progress: 0, 
      lastActive: "2024-05-30T10:25:00Z",
      capabilities: ["react-development", "ui-design"],
      specialization: "Frontend Development",
      background: "Expert in React and modern frontend technologies",
      description: "Builds user interfaces and client-side functionality"
    },
    { 
      id: "3", 
      type: "backend", 
      name: "Backend Agent", 
      status: "working", 
      currentTask: "Active", 
      progress: 45, 
      lastActive: "2024-05-30T10:32:00Z",
      capabilities: ["api-development", "database-design"],
      specialization: "Backend Development",
      background: "Expert in server-side development and APIs",
      description: "Develops server-side logic and API endpoints"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <Header 
        viewMode="workflow" 
        onViewModeChange={() => {}}
        agents={mockAgents}
      />
      
      <div className="bg-background text-foreground">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <main 
            id="main-content" 
            className="space-y-6 sm:space-y-8"
            role="main"
            aria-label="Settings Configuration"
          >
            <div className="fade-in">
              <SettingsHeader />
            </div>

            <div className="fade-in" style={{ animationDelay: "100ms" }}>
              <AdvancedSearchBar 
                onSearch={onSearch}
                onFilterChange={onFilterChange}
                placeholder="Search settings... (Press Escape to clear)"
                categories={["General", "Security", "API", "Performance", "Appearance", "Notifications", "Backup"]}
                className="max-w-2xl"
              />
            </div>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
