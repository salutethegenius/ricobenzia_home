import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { ContentItem, ContentUpdate } from '../lib/supabase';

interface CMSState {
  content: Record<string, Record<string, any>>;
  loading: boolean;
  error: string | null;
}

export function useCMS() {
  const [state, setState] = useState<CMSState>({
    content: {},
    loading: true,
    error: null,
  });

  // Fetch all content
  const fetchContent = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Organize content by section and field
      const organized: Record<string, Record<string, any>> = {};
      
      data?.forEach((item: ContentItem) => {
        if (!organized[item.section]) {
          organized[item.section] = {};
        }
        organized[item.section][item.field] = item.value;
      });

      setState({
        content: organized,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState({
        content: {},
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch content',
      });
    }
  }, []);

  // Fetch content for a specific section
  const getSectionContent = (section: string): Record<string, any> => {
    return state.content[section] || {};
  };

  // Update content
  const updateContent = async (updates: ContentUpdate[]) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Upsert each update
      const promises = updates.map((update) =>
        supabase
          .from('content')
          .upsert(
            {
              section: update.section,
              field: update.field,
              value: update.value,
              updated_by: user.id,
            },
            {
              onConflict: 'section,field',
            }
          )
      );

      const results = await Promise.all(promises);
      const hasError = results.some((result) => result.error);

      if (hasError) {
        throw new Error('Failed to update some content');
      }

      // Refresh content
      await fetchContent();

      return { error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to update content';
      setState((prev) => ({ ...prev, loading: false, error }));
      return { error };
    }
  };

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return {
    ...state,
    fetchContent,
    getSectionContent,
    updateContent,
  };
}
