
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('Attempting to sign in with:', email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Sign in error:', error);
    } else {
      console.log('Sign in successful:', data);
    }
    
    return { error };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    console.log('Attempting to sign up with:', email);
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName || '',
        }
      }
    });
    
    if (error) {
      console.error('Sign up error:', error);
    } else {
      console.log('Sign up response:', data);
    }
    
    return { error };
  };

  const signOut = async () => {
    console.log('Attempting to sign out');
    
    try {
      // Clear any local storage items related to authentication and app state
      const keysToRemove = [
        'supabase.auth.token',
        'skipSignOutConfirmation',
        'alwaysConfirmSignOut'
      ];
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });
      
      // Sign out from Supabase with global scope to invalidate all sessions
      const { error } = await supabase.auth.signOut({
        scope: 'global' // This invalidates all sessions across all devices
      });
      
      if (error) {
        console.error('Sign out error:', error);
        return { error };
      }
      
      // Clear local state immediately for better UX
      setSession(null);
      setUser(null);
      
      // Additional cleanup: clear any remaining auth-related items
      try {
        // Clear any cached data that might contain sensitive information
        sessionStorage.clear();
        
        // Clear specific localStorage keys that might contain user data
        const userDataKeys = Object.keys(localStorage).filter(key => 
          key.includes('user') || 
          key.includes('auth') || 
          key.includes('token') ||
          key.includes('session')
        );
        
        userDataKeys.forEach(key => localStorage.removeItem(key));
      } catch (storageError) {
        console.warn('Error clearing storage:', storageError);
        // Continue with sign out even if storage clearing fails
      }
      
      console.log('Sign out successful - all sessions invalidated');
      return { error: null };
    } catch (error) {
      console.error('Unexpected sign out error:', error);
      return { error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
