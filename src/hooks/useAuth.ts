import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer role check with setTimeout
        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          checkAdminRole(session.user.id);
        }, 0);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .single();

      if (!error && data) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      setIsAdmin(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName
        }
      }
    });

    if (error) {
      toast.error(error.message);
      return { error };
    }

    toast.success('Registration successful! Please check your email to verify your account.');
    return { data, error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast.error(error.message);
      return { error };
    }

    toast.success('Login successful!');
    return { data, error: null };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error(error.message);
      return { error };
    }

    toast.success('Logged out successfully');
    return { error: null };
  };

  const resetPassword = async (email: string) => {
    const redirectUrl = `${window.location.origin}/reset-password`;
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl
    });

    if (error) {
      toast.error(error.message);
      return { error };
    }

    toast.success('Password reset email sent! Check your inbox.');
    return { error: null };
  };

  return {
    user,
    session,
    loading,
    isAdmin,
    signUp,
    signIn,
    signOut,
    resetPassword
  };
};
