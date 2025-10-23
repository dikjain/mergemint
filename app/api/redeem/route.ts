import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
} from '@solana/web3.js';
import {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

// Initialize Supabase with service role (has elevated permissions)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRole, {
  auth: {
    persistSession: false,
  },
});

// Solana configuration
const SOLANA_RPC = process.env.SOLANA_RPC || 'https://api.devnet.solana.com';
const TOKEN_MINT = process.env.TOKEN_MINT!;
const TREASURY_KEY_JSON = process.env.TREASURY_KEY_JSON!;

const connection = new Connection(SOLANA_RPC, 'confirmed');
const treasury = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(TREASURY_KEY_JSON))
);
const TOKEN_MINT_PUB = new PublicKey(TOKEN_MINT);

/**
 * Helper function for JSON responses
 */
function jsonResponse(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

export async function POST(request: NextRequest) {
  console.log('🔵 [API] Redemption request received');

  try {
    // Parse request body
    const body = await request.json();
    console.log('📦 [API] Request body:', body);

    const { user_id, item_id, user_wallet, idempotency_key } = body;

    // Validate required parameters
    if (!user_id || !item_id || !user_wallet) {
      console.error('❌ [API] Missing required parameters');
      return jsonResponse(
        {
          error: 'missing parameters (user_id, item_id, user_wallet required)',
        },
        400
      );
    }

    // Generate idempotency key if not provided
    const finalIdempotencyKey =
      idempotency_key || `${Date.now()}-${crypto.randomUUID()}`;

    console.log('🔑 [API] Idempotency key:', finalIdempotencyKey);

    // 1) Check if redemption already exists (idempotency)
    console.log('🔍 [API] Checking for existing redemption...');
    const { data: existing, error: existingError } = await supabase
      .from('redemptions')
      .select('*')
      .eq('idempotency_key', finalIdempotencyKey)
      .maybeSingle();

    if (existingError) {
      console.error(
        '❌ [API] Database error checking existing:',
        existingError
      );
      return jsonResponse({ error: 'DB error' }, 500);
    }

    if (existing) {
      console.log('ℹ️ [API] Redemption already exists:', existing.status);
      return jsonResponse({ result: existing });
    }

    // 2) Fetch item and user from database
    console.log('📥 [API] Fetching item and user data...');
    const [itemResult, userResult] = await Promise.all([
      supabase.from('store_item').select('*').eq('id', item_id).maybeSingle(),
      supabase.from('users').select('*').eq('id', user_id).maybeSingle(),
    ]);

    if (itemResult.error || userResult.error) {
      console.error(
        '❌ [API] Fetch error:',
        itemResult.error || userResult.error
      );
      return jsonResponse({ error: 'DB fetch error' }, 500);
    }

    const item = itemResult.data;
    const user = userResult.data;

    if (!item) {
      console.error('❌ [API] Item not found:', item_id);
      return jsonResponse({ error: 'item not found' }, 404);
    }

    if (!user) {
      console.error('❌ [API] User not found:', user_id);
      return jsonResponse({ error: 'user not found' }, 404);
    }

    console.log('✅ [API] Item found:', item.name);
    console.log('✅ [API] User found:', user.github_username);

    // Parse numeric fields
    const costPoints = Number(item.cost);
    const worthUsdc = Number(item.worth);

    console.log('💰 [API] Cost:', costPoints, 'MM points');
    console.log('💰 [API] Worth:', worthUsdc, 'USDC');

    if (!Number.isFinite(costPoints) || costPoints <= 0) {
      return jsonResponse({ error: 'invalid item cost' }, 400);
    }

    if (!Number.isFinite(worthUsdc) || worthUsdc <= 0) {
      return jsonResponse({ error: 'invalid item worth' }, 400);
    }

    // 3) Deduct points using stored procedure
    console.log('💳 [API] Deducting points...');
    const { data: deductResult, error: deductError } = await supabase.rpc(
      'deduct_ipr',
      {
        p_user: user_id,
        p_amount: Math.floor(costPoints),
      }
    );

    if (deductError) {
      console.error('❌ [API] Deduction error:', deductError);
      return jsonResponse({ error: 'DB deduction error' }, 500);
    }

    if (!deductResult && deductResult !== 0) {
      console.error('❌ [API] Insufficient points');
      return jsonResponse({ error: 'insufficient points' }, 400);
    }

    console.log('✅ [API] Points deducted, remaining:', deductResult);

    // 4) Create pending redemption record
    console.log('📝 [API] Creating pending redemption record...');
    const { data: pending, error: pendingError } = await supabase
      .from('redemptions')
      .insert({
        idempotency_key: finalIdempotencyKey,
        user_id,
        item_id,
        amount_points: costPoints,
        usdc_amount: worthUsdc,
        status: 'pending',
      })
      .select('*')
      .single();

    if (pendingError || !pending) {
      console.error('❌ [API] Failed to create pending record:', pendingError);

      // Refund points
      console.log('🔄 [API] Refunding points...');
      await supabase.rpc('refund_ipr', {
        p_user: user_id,
        p_amount: Math.floor(costPoints),
      });

      return jsonResponse({ error: 'failed to create pending record' }, 500);
    }

    console.log('✅ [API] Pending record created:', pending.id);

    // 5) Perform on-chain transfer
    console.log('⛓️ [API] Starting on-chain transfer...');
    try {
      const toPublicKey = new PublicKey(user_wallet);
      console.log('📍 [API] Recipient wallet:', toPublicKey.toString());

      // Get or create associated token accounts
      console.log('🔗 [API] Getting token accounts...');
      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        treasury,
        TOKEN_MINT_PUB,
        treasury.publicKey
      );

      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        treasury,
        TOKEN_MINT_PUB,
        toPublicKey
      );

      console.log(
        '✅ [API] From account:',
        fromTokenAccount.address.toString()
      );
      console.log('✅ [API] To account:', toTokenAccount.address.toString());

      // Calculate amount in smallest units (assuming 6 decimals)
      const amountUnits = Math.round(worthUsdc * 10 ** 6);
      console.log('💵 [API] Transfer amount:', amountUnits, 'units');

      // Create and send transaction
      const transaction = new Transaction().add(
        createTransferInstruction(
          fromTokenAccount.address,
          toTokenAccount.address,
          treasury.publicKey,
          amountUnits,
          [],
          TOKEN_PROGRAM_ID
        )
      );

      console.log('📤 [API] Sending transaction...');
      const txSignature = await connection.sendTransaction(transaction, [
        treasury,
      ]);

      console.log('⏳ [API] Confirming transaction...');
      await connection.confirmTransaction(txSignature, 'confirmed');

      console.log('✅ [API] Transaction confirmed:', txSignature);

      // 6) Update redemption status and create user_items record
      console.log('📝 [API] Updating records...');

      const [userItemResult, updateResult] = await Promise.all([
        supabase.from('user_items').insert({
          user_id,
          item_id,
        }),
        supabase
          .from('redemptions')
          .update({
            status: 'success',
            tx_hash: txSignature,
          })
          .eq('id', pending.id),
      ]);

      if (userItemResult.error) {
        console.error(
          '⚠️ [API] Failed to create user_items:',
          userItemResult.error
        );
      }

      if (updateResult.error) {
        console.error(
          '⚠️ [API] Failed to update redemption:',
          updateResult.error
        );
      }

      console.log('🎉 [API] Redemption successful!');
      return jsonResponse({
        success: true,
        tx: txSignature,
        pending_id: pending.id,
      });
    } catch (onchainError) {
      console.error('❌ [API] On-chain transfer failed:', onchainError);

      // Mark redemption as failed
      await supabase
        .from('redemptions')
        .update({
          status: 'failed',
          failure_reason: String(onchainError),
        })
        .eq('id', pending.id);

      // Refund points
      console.log('🔄 [API] Refunding points due to transfer failure...');
      const { error: refundError } = await supabase.rpc('refund_ipr', {
        p_user: user_id,
        p_amount: Math.floor(costPoints),
      });

      if (refundError) {
        console.error('❌ [API] Refund failed:', refundError);
        await supabase
          .from('redemptions')
          .update({
            failure_reason: 'transfer failed, refund failed: manual review',
          })
          .eq('id', pending.id);
      }

      return jsonResponse(
        {
          error:
            'on-chain transfer failed, points refunded (if refund succeeded)',
        },
        500
      );
    }
  } catch (error) {
    console.error('❌ [API] Unexpected error:', error);
    return jsonResponse({ error: 'internal error' }, 500);
  }
}

export async function GET() {
  return jsonResponse({ error: 'Method not allowed' }, 405);
}
