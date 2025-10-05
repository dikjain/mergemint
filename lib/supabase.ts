/**
 * Supabase Client Configuration
 * 
 * This file initializes and exports Supabase clients for both
 * client-side and server-side operations.
 */

import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

// Supabase project configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);


export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);


export type PRRecord = {
  id: string;
  created_at: string;
  user_id: string;
  repo_name: string;
  pr_number: number;
  title: string;
  status: 'pending'  | 'rejected' | 'completed';
  repo_image?: string;
};

export type Database = {
  public: {
    Tables: {
      prs: {
        Row: PRRecord;
        Insert: Omit<PRRecord, 'id' | 'created_at'>;
        Update: Partial<Omit<PRRecord, 'id' | 'created_at'>>;
      };
    };
  };
};

