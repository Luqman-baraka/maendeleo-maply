
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

type StaffRole = 'project_manager' | 'government_official' | 'admin';

interface StaffProfile {
  id: string;
  user_id: string;
  role: StaffRole;
  department: string;
  position: string;
  phone?: string;
  created_at: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: StaffProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: StaffRole, department: string, position: string, phone?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StaffProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      setIsLoading(true);
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile
          await fetchUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        toast({
          title: 'Error',
          description: 'Failed to initialize your session.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('staff_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        throw error;
      }
      
      setProfile(data as StaffProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setProfile(null);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      });
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast({
        title: 'Sign in failed',
        description: error.message || 'An error occurred during sign in.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, role: StaffRole, department: string, position: string, phone?: string) => {
    try {
      // 1. Create the user in auth
      const { data: authData, error: authError } = await supabase.auth.signUp({ 
        email, 
        password,
      });
      
      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create user account.');
      
      // 2. Create the staff profile
      const { error: profileError } = await supabase
        .from('staff_profiles')
        .insert({
          user_id: authData.user.id,
          role,
          department,
          position,
          phone
        });
      
      if (profileError) throw profileError;
      
      toast({
        title: 'Account created',
        description: 'Your account has been created successfully.',
      });
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast({
        title: 'Sign up failed',
        description: error.message || 'An error occurred during registration.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
      });
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        title: 'Sign out failed',
        description: error.message || 'An error occurred during sign out.',
        variant: 'destructive',
      });
    }
  };

  const value = {
    session,
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
