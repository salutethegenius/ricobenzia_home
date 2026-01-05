import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. CMS features will be disabled.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Content table types
export type ContentValue = string | number | boolean | Record<string, unknown> | unknown[] | null;

export interface ContentItem {
  id: string;
  section: string;
  field: string;
  value: ContentValue;
  updated_at: string;
  updated_by: string | null;
}

export interface ContentUpdate {
  section: string;
  field: string;
  value: ContentValue;
}
