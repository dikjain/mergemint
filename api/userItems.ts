import { supabase } from '@/lib/supabase';
import { BackendStoreItem } from '@/types/api.types';

/**
 * Fetches items owned by a user (just IDs)
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

/**
 * Fetches user's owned items with full store item details
 */
export async function fetchUserOwnedItems(
  userId: string
): Promise<BackendStoreItem[]> {
  try {
    const { data, error } = await supabase
      .from('user_items')
      .select('item_id, store_item(*)')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user owned items:', error);
      return [];
    }

    // Extract store_item data from the joined result
    return data?.map((item: any) => item.store_item).filter(Boolean) || [];
  } catch (error) {
    console.error('Error fetching user owned items:', error);
    return [];
  }
}
