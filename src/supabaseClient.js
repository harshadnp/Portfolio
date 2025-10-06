import { createClient } from '@supabase/supabase-js'

// --- ACTION REQUIRED ---
// Paste your Supabase Project URL and Anon Key here.
// You can find these in your Supabase project settings under "API".

const supabaseUrl = 'https://napghuinqwzpxtegqerc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hcGdodWlucXd6cHh0ZWdxZXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NDk5ODMsImV4cCI6MjA3NTMyNTk4M30.xSgwlVmOP8_8RKcMXUGCXm8Rh9EQVMdGQBNJoSH6AyY'


// This creates the connection to your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

