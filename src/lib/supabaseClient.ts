import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

console.log('🔑 Supabase client initializing:', {
    url: supabaseUrl ? 'SET' : 'MISSING',
    key: supabaseAnonKey ? `SET (${supabaseAnonKey.substring(0, 20)}...)` : 'MISSING'
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
