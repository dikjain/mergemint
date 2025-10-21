import { supabase } from '@/lib/supabase';
import type { BackendStoreItem } from '@/types/api.types';
import type { ApiResponse } from '@/types/api.types';

export const fetchStoreItems = async (): Promise<
  ApiResponse<BackendStoreItem[]>
> => {
  try {
    const { data, error } = await supabase
      .from('store_item')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching store items:', error);
      return {
        data: null,
        error: error.message,
        success: false,
      };
    }

    return {
      data: data as BackendStoreItem[],
      error: null,
      success: true,
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Unexpected error fetching store items:', err);
    return {
      data: null,
      error: errorMessage,
      success: false,
    };
  }
};
