import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import type { PRRecord, Database } from '@/types';

// Supabase project configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Re-export types for convenience
export type { PRRecord, Database };
