import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface StateAction {
  type: string;
  payload?: any;
  timestamp?: number;
  source?: string;
}

interface StateStore {
  // Core state
  ui: {
    activeView: string;
    sidebarOpen: boolean;
    darkMode: boolean;
    notifications: any[];
    loading: Record<string, boolean>;
  };
  
  // Real-time state
  realtime: {
    connected: boolean;
    lastSync: number;
    presence: Record<string, any>;
    conflicts: any[];
    pendingActions: StateAction[];
  };
  
  // Performance state
  performance: {
    renderTimes: Record<string, number>;
    stateUpdates: number;
    networkRequests: any[];
    memoryUsage: number;
  };
  
  // Debug state
  debug: {
    enabled: boolean;
    actionHistory: StateAction[];
    stateSnapshots: any[];
    errorLog: any[];
  };
}

interface StateStoreContextType {
  state: StateStore;
  dispatch: (action: StateAction) => void;
  subscribe: (listener: (action: StateAction) => void) => () => void;
  getState: () => StateStore;
  replayActions: (actions: StateAction[]) => void;
  timeTravel: (timestamp: number) => void;
}

const StateStoreContext = createContext<StateStoreContextType | undefined>(undefined);

const initialState: StateStore = {
  ui: {
    activeView: 'dashboard',
    sidebarOpen: true,
    darkMode: false,
    notifications: [],
    loading: {}
  },
  realtime: {
    connected: false,
    lastSync: Date.now(),
    presence: {},
    conflicts: [],
    pendingActions: []
  },
  performance: {
    renderTimes: {},
    stateUpdates: 0,
    networkRequests: [],
    memoryUsage: 0
  },
  debug: {
    enabled: false,
    actionHistory: [],
    stateSnapshots: [],
    errorLog: []
  }
};

function stateReducer(state: StateStore, action: StateAction): StateStore {
  const newState = { ...state };
  
  // Track performance
  newState.performance.stateUpdates += 1;
  
  // Log action for debugging
  if (newState.debug.enabled) {
    newState.debug.actionHistory.push({
      ...action,
      timestamp: Date.now()
    });
    
    // Keep only last 100 actions
    if (newState.debug.actionHistory.length > 100) {
      newState.debug.actionHistory = newState.debug.actionHistory.slice(-100);
    }
  }
  
  switch (action.type) {
    case 'SET_ACTIVE_VIEW':
      newState.ui.activeView = action.payload;
      break;
      
    case 'TOGGLE_SIDEBAR':
      newState.ui.sidebarOpen = !newState.ui.sidebarOpen;
      break;
      
    case 'SET_LOADING':
      newState.ui.loading[action.payload.key] = action.payload.loading;
      break;
      
    case 'ADD_NOTIFICATION':
      newState.ui.notifications.push({
        id: Date.now(),
        ...action.payload
      });
      break;
      
    case 'REMOVE_NOTIFICATION':
      newState.ui.notifications = newState.ui.notifications.filter(
        n => n.id !== action.payload
      );
      break;
      
    case 'SET_REALTIME_CONNECTION':
      newState.realtime.connected = action.payload;
      newState.realtime.lastSync = Date.now();
      break;
      
    case 'UPDATE_PRESENCE':
      newState.realtime.presence = { ...newState.realtime.presence, ...action.payload };
      break;
      
    case 'ADD_CONFLICT':
      newState.realtime.conflicts.push(action.payload);
      break;
      
    case 'RESOLVE_CONFLICT':
      newState.realtime.conflicts = newState.realtime.conflicts.filter(
        c => c.id !== action.payload
      );
      break;
      
    case 'QUEUE_ACTION':
      newState.realtime.pendingActions.push(action.payload);
      break;
      
    case 'PROCESS_QUEUED_ACTIONS':
      newState.realtime.pendingActions = [];
      break;
      
    case 'LOG_RENDER_TIME':
      newState.performance.renderTimes[action.payload.component] = action.payload.time;
      break;
      
    case 'LOG_NETWORK_REQUEST':
      newState.performance.networkRequests.push({
        ...action.payload,
        timestamp: Date.now()
      });
      
      // Keep only last 50 requests
      if (newState.performance.networkRequests.length > 50) {
        newState.performance.networkRequests = newState.performance.networkRequests.slice(-50);
      }
      break;
      
    case 'UPDATE_MEMORY_USAGE':
      newState.performance.memoryUsage = action.payload;
      break;
      
    case 'TOGGLE_DEBUG':
      newState.debug.enabled = !newState.debug.enabled;
      break;
      
    case 'LOG_ERROR':
      newState.debug.errorLog.push({
        ...action.payload,
        timestamp: Date.now()
      });
      break;
      
    case 'TAKE_SNAPSHOT':
      if (newState.debug.enabled) {
        newState.debug.stateSnapshots.push({
          state: JSON.parse(JSON.stringify(state)),
          timestamp: Date.now()
        });
        
        // Keep only last 20 snapshots
        if (newState.debug.stateSnapshots.length > 20) {
          newState.debug.stateSnapshots = newState.debug.stateSnapshots.slice(-20);
        }
      }
      break;
      
    default:
      console.warn(`Unknown action type: ${action.type}`);
  }
  
  return newState;
}

export const StateStoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const listeners = React.useRef<Set<(action: StateAction) => void>>(new Set());
  
  // Enhanced dispatch with middleware
  const enhancedDispatch = (action: StateAction) => {
    // Add metadata
    const enhancedAction = {
      ...action,
      timestamp: Date.now(),
      source: action.source || 'unknown'
    };
    
    // Dispatch to reducer
    dispatch(enhancedAction);
    
    // Notify listeners
    listeners.current.forEach(listener => listener(enhancedAction));
    
    // Take snapshot for debug
    if (state.debug.enabled) {
      setTimeout(() => dispatch({ type: 'TAKE_SNAPSHOT' }), 0);
    }
  };
  
  const subscribe = (listener: (action: StateAction) => void) => {
    listeners.current.add(listener);
    return () => listeners.current.delete(listener);
  };
  
  const getState = () => state;
  
  const replayActions = (actions: StateAction[]) => {
    actions.forEach(action => enhancedDispatch(action));
  };
  
  const timeTravel = (timestamp: number) => {
    const snapshot = state.debug.stateSnapshots.find(s => s.timestamp <= timestamp);
    if (snapshot) {
      dispatch({ type: 'RESTORE_SNAPSHOT', payload: snapshot.state });
    }
  };
  
  // Performance monitoring
  useEffect(() => {
    const updateMemoryUsage = () => {
      if ('memory' in performance) {
        enhancedDispatch({
          type: 'UPDATE_MEMORY_USAGE',
          payload: (performance as any).memory.usedJSHeapSize
        });
      }
    };
    
    const interval = setInterval(updateMemoryUsage, 5000);
    return () => clearInterval(interval);
  }, []);
  
  // Mock WebSocket connection for real-time features
  useEffect(() => {
    const simulateConnection = () => {
      setTimeout(() => {
        enhancedDispatch({
          type: 'SET_REALTIME_CONNECTION',
          payload: true
        });
      }, 1000);
    };
    
    simulateConnection();
  }, []);
  
  return (
    <StateStoreContext.Provider value={{
      state,
      dispatch: enhancedDispatch,
      subscribe,
      getState,
      replayActions,
      timeTravel
    }}>
      {children}
    </StateStoreContext.Provider>
  );
};

export const useStateStore = () => {
  const context = useContext(StateStoreContext);
  if (context === undefined) {
    throw new Error('useStateStore must be used within a StateStoreProvider');
  }
  return context;
};
