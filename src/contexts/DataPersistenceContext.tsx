
import React, { createContext, useContext, ReactNode } from 'react';
import { usePersistenceManager } from '@/hooks/usePersistenceManager';

interface AppSessionData {
  lastActiveView: string;
  userPreferences: {
    theme: string;
    sidebarCollapsed: boolean;
    viewMode: string;
  };
  projectData: any;
}

interface DataPersistenceContextType {
  sessionData: AppSessionData;
  updateSessionData: (data: AppSessionData | ((prev: AppSessionData) => AppSessionData)) => void;
  clearSessionData: () => void;
}

const DataPersistenceContext = createContext<DataPersistenceContextType | undefined>(undefined);

const defaultSessionData: AppSessionData = {
  lastActiveView: 'workflow',
  userPreferences: {
    theme: 'system',
    sidebarCollapsed: false,
    viewMode: 'workflow'
  },
  projectData: null
};

export const DataPersistenceProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: sessionData,
    updateData: updateSessionData,
    clearData: clearSessionData
  } = usePersistenceManager(defaultSessionData, {
    key: 'app-session',
    storage: 'sessionStorage',
    debounceMs: 500
  });

  return (
    <DataPersistenceContext.Provider value={{
      sessionData,
      updateSessionData,
      clearSessionData
    }}>
      {children}
    </DataPersistenceContext.Provider>
  );
};

export const useDataPersistence = () => {
  const context = useContext(DataPersistenceContext);
  if (context === undefined) {
    throw new Error('useDataPersistence must be used within a DataPersistenceProvider');
  }
  return context;
};
