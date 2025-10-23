import { supabase } from '@/lib/supabase';

/**
 * Fetches items owned by a user
 */
export async function fetchUserItems(userId: string): Promise<number[]> {
  try {
    const { data, error } = await supabase
      .from('user_items')
      .select('item_id')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user items:', error);
      return [];
    }

    return data?.map((item) => item.item_id) || [];
  } catch (error) {
    console.error('Error fetching user items:', error);
    return [];
  }
}
