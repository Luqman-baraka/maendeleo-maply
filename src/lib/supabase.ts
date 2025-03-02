
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yxzzqzbbbozpsqxvfjud.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4enpxemJiYm96cHNxeHZmanVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NDYzMzYsImV4cCI6MjA1MTEyMjMzNn0.36ZQeCbOkOd8RwcPBjKRZZpPU5d5g4MEg3Xh-RrmuU0';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
