/**
 * Next.js API route for redemption
 */
const REDEEM_API_URL = '/api/redeem';

/**
 * Request payload for redemption
 */
export interface RedeemRequest {
  user_id: string;
  item_id: number;
  user_wallet: string;
  idempotency_key?: string;
}

/**
 * Response from the redemption API
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
 * Calls the Next.js API route to redeem a store item
 *
 * @param params - Redemption parameters
 * @returns Response with transaction details or error
 */
export async function redeemStoreItem(
  params: RedeemRequest
): Promise<RedeemResponse> {
  console.log('🚀 Starting redemption process...');
  console.log('📦 Request params:', {
    user_id: params.user_id,
    item_id: params.item_id,
    item_id_type: typeof params.item_id,
    user_wallet: params.user_wallet,
    idempotency_key: params.idempotency_key,
  });

  try {
    // Call Next.js API route
    console.log('📤 Sending request to:', REDEEM_API_URL);
    const response = await fetch(REDEEM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    console.log('📥 Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API HTTP error:');
      console.error('  Status:', response.status);
      console.error('  Status Text:', response.statusText);
      console.error('  Response body:', errorText);

      // Try to parse error as JSON
      try {
        const errorJson = JSON.parse(errorText);
        console.error('  Parsed error:', errorJson);
        return {
          error:
            errorJson.error ||
            errorJson.message ||
            `Request failed with status ${response.status}`,
        };
      } catch (e) {
        return {
          error: `Request failed with status ${response.status}: ${errorText}`,
        };
      }
    }

    const data: RedeemResponse = await response.json();
    console.log('✅ Parsed response:', data);

    // Log success or error
    if (data.success) {
      console.log('🎉 Redemption successful!');
      console.log('  Transaction hash:', data.tx);
      console.log('  Pending ID:', data.pending_id);
    } else if (data.error) {
      console.error('❌ Redemption failed:', data.error);
    } else if (data.result) {
      console.log('ℹ️ Idempotent response:', data.result.status);
    }

    return data;
  } catch (error) {
    console.error('❌ Unexpected error during redemption:');
    console.error('  Error type:', error?.constructor?.name);
    console.error(
      '  Error message:',
      error instanceof Error ? error.message : String(error)
    );
    console.error(
      '  Error stack:',
      error instanceof Error ? error.stack : 'No stack trace'
    );
    console.error('  Full error object:', error);

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
