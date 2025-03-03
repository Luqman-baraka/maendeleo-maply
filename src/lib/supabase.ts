
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://yxzzqzbbbozpsqxvfjud.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4enpxemJiYm96cHNxeHZmanVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NDYzMzYsImV4cCI6MjA1MTEyMjMzNn0.36ZQeCbOkOd8RwcPBjKRZZpPU5d5g4MEg3Xh-RrmuU0';

// Create a more robust Supabase client with better error handling
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Add a helper to check if the Supabase client is working
export const checkSupabaseConnection = async () => {
  try {
    // Try a simple query to check if the connection works
    const { error } = await supabase.from('staff_profiles').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Supabase connection failed:', error);
      return false;
    }
    
    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Supabase connection failed:', error);
    return false;
  }
};
