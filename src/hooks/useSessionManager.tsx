
import { useState, useEffect, useCallback } from 'react';
import { usePersistenceManager } from './usePersistenceManager';

interface SessionData {
  userId: string;
  sessionId: string;
  lastActivity: number;
  preferences: Record<string, any>;
  workspaceState: Record<string, any>;
  activeView: string;
  unsavedChanges: boolean;
}

interface SessionConfig {
  timeout: number; // Session timeout in milliseconds
  warningTime: number; // Show warning before timeout
}

const defaultSessionData: SessionData = {
  userId: 'default-user',
  sessionId: '',
  lastActivity: Date.now(),
  preferences: {},
  workspaceState: {},
  activeView: 'dashboard',
  unsavedChanges: false
};

export const useSessionManager = (config: SessionConfig = { timeout: 30 * 60 * 1000, warningTime: 5 * 60 * 1000 }) => {
  const [sessionExpired, setSessionExpired] = useState(false);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [timeUntilExpiry, setTimeUntilExpiry] = useState<number>(0);

  const {
    data: sessionData,
    setData: setSessionData,
    isLoading,
    forceSave
  } = usePersistenceManager<SessionData>(defaultSessionData, {
    key: 'app-session',
    storage: 'sessionStorage',
    syncToCloud: false
  });

  // Generate new session ID
  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Initialize session
  const initializeSession = useCallback((userId?: string) => {
    const newSessionData: SessionData = {
      ...sessionData,
      userId: userId || sessionData.userId,
      sessionId: generateSessionId(),
      lastActivity: Date.now(),
      unsavedChanges: false
    };
    setSessionData(newSessionData);
    setSessionExpired(false);
    setShowTimeoutWarning(false);
  }, [sessionData, setSessionData]);

  // Update last activity
  const updateActivity = useCallback(() => {
    setSessionData(prev => ({
      ...prev,
      lastActivity: Date.now()
    }));
    setShowTimeoutWarning(false);
  }, [setSessionData]);

  // Update workspace state
  const updateWorkspaceState = useCallback((key: string, value: any) => {
    setSessionData(prev => ({
      ...prev,
      workspaceState: {
        ...prev.workspaceState,
        [key]: value
      },
      lastActivity: Date.now()
    }));
  }, [setSessionData]);

  // Update preferences
  const updatePreferences = useCallback((key: string, value: any) => {
    setSessionData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      },
      lastActivity: Date.now()
    }));
  }, [setSessionData]);

  // Set active view
  const setActiveView = useCallback((view: string) => {
    setSessionData(prev => ({
      ...prev,
      activeView: view,
      lastActivity: Date.now()
    }));
  }, [setSessionData]);

  // Mark unsaved changes
  const setUnsavedChanges = useCallback((hasChanges: boolean) => {
    setSessionData(prev => ({
      ...prev,
      unsavedChanges: hasChanges,
      lastActivity: Date.now()
    }));
  }, [setSessionData]);

  // Check session validity
  useEffect(() => {
    if (isLoading) return;

    const checkSession = () => {
      const now = Date.now();
      const timeSinceActivity = now - sessionData.lastActivity;
      const timeUntilTimeout = config.timeout - timeSinceActivity;
      const timeUntilWarning = config.timeout - config.warningTime - timeSinceActivity;

      setTimeUntilExpiry(Math.max(0, timeUntilTimeout));

      if (timeUntilTimeout <= 0) {
        setSessionExpired(true);
        setShowTimeoutWarning(false);
      } else if (timeUntilWarning <= 0 && !showTimeoutWarning) {
        setShowTimeoutWarning(true);
      }
    };

    const interval = setInterval(checkSession, 1000);
    checkSession(); // Initial check

    return () => clearInterval(interval);
  }, [sessionData.lastActivity, config, isLoading, showTimeoutWarning]);

  // Initialize session on mount if no session exists
  useEffect(() => {
    if (!isLoading && !sessionData.sessionId) {
      initializeSession();
    }
  }, [isLoading, sessionData.sessionId, initializeSession]);

  return {
    sessionData,
    sessionExpired,
    showTimeoutWarning,
    timeUntilExpiry,
    isLoading,
    initializeSession,
    updateActivity,
    updateWorkspaceState,
    updatePreferences,
    setActiveView,
    setUnsavedChanges,
    forceSave
  };
};
