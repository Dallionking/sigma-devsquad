
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CurrentUser {
  id: string;
  name: string;
  role: 'planning_agent' | 'agent' | 'admin';
  avatar?: string;
}

interface CurrentUserContextType {
  currentUser: CurrentUser;
  setCurrentUser: (user: CurrentUser) => void;
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (context === undefined) {
    throw new Error('useCurrentUser must be used within a CurrentUserProvider');
  }
  return context;
};

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    id: "planning_agent_001",
    name: "Planning Agent",
    role: "planning_agent",
    avatar: "/avatars/planning-agent.jpg"
  });

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
