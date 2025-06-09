
import React, { createContext, useContext, ReactNode } from 'react';
import { AgentProvider } from './AgentContext';
import { TaskProvider } from './TaskContext';
import { MessageProvider } from './MessageContext';
import { ProjectProvider } from './ProjectContext';

interface AppStateContextType {
  // This can be extended with global app state that doesn't fit into specific contexts
  isLoading: boolean;
  error: string | null;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  // Combine all state providers into a single provider tree
  return (
    <ProjectProvider>
      <AgentProvider>
        <TaskProvider>
          <MessageProvider>
            <AppStateContext.Provider value={{
              isLoading: false,
              error: null
            }}>
              {children}
            </AppStateContext.Provider>
          </MessageProvider>
        </TaskProvider>
      </AgentProvider>
    </ProjectProvider>
  );
};
