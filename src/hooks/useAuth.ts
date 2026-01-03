import { useState, useEffect, useRef } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations in React StrictMode
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      setAuthState((prev) => {
        // Only update if still loading to prevent race conditions
        if (prev.loading) {
          return {
            user: session?.user ?? null,
            session,
            loading: false,
            error: error?.message ?? null,
          };
        }
        return prev;
      });
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false,
        error: null,
      });
    });

    return () => {
      subscription.unsubscribe();
      isInitializedRef.current = false;
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
      return { error: error.message };
    }

    setAuthState({
      user: data.user,
      session: data.session,
      loading: false,
      error: null,
    });

    return { error: null };
  };

  const signOut = async () => {
    setAuthState((prev) => ({ ...prev, loading: true }));
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
      return { error: error.message };
    }

    setAuthState({
      user: null,
      session: null,
      loading: false,
      error: null,
    });

    return { error: null };
  };

  return {
    ...authState,
    signIn,
    signOut,
    isAuthenticated: !!authState.user,
  };
}
