import { supabase } from '@/lib/supabase';

/**
 * Supabase edge function URL for redemption
 */
const REDEEM_FUNCTION_URL =
  'https://uvhydsbazjxqaaijmvhr.supabase.co/functions/v1/redeem';

/**
 * Request payload for redemption
 */
export interface RedeemRequest {
  user_id: string;
  item_id: string;
  user_wallet: string;
  idempotency_key?: string;
}

/**
 * Response from the redemption edge function
 */
export interface RedeemResponse {
  success?: boolean;
  tx?: string;
  pending_id?: string;
  result?: {
    id: string;
    status: string;
    tx_hash?: string;
    failure_reason?: string;
  };
  error?: string;
}

/**
 * Calls the Supabase edge function to redeem a store item
 *
 * @param params - Redemption parameters
 * @returns Response with transaction details or error
 */
export async function redeemStoreItem(
  params: RedeemRequest
): Promise<RedeemResponse> {
  try {
    // Get the current session for authentication
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return { error: 'Not authenticated' };
    }

    // Call the edge function directly via fetch
    const response = await fetch(REDEEM_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Edge function HTTP error:', response.status, errorText);
      return {
        error: `Request failed with status ${response.status}: ${errorText}`,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Redeem API error:', error);
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Generates a unique idempotency key for redemption
 */
export function generateIdempotencyKey(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
