# Environment Variables Setup

## Required Environment Variables for Redemption

Add these to your `.env.local` file:

### Supabase Configuration

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### Solana Configuration

```env
# Solana RPC endpoint (use devnet for testing)
SOLANA_RPC=https://api.devnet.solana.com

# Token mint address (your SPL token)
TOKEN_MINT=your_token_mint_address_here

# Treasury keypair as JSON array
TREASURY_KEY_JSON=["your","treasury","keypair","as","json","array"]
```

## How to Get TREASURY_KEY_JSON

1. Generate a Solana keypair using Solana CLI:

   ```bash
   solana-keygen new --outfile treasury.json
   ```

2. Read the keypair file and convert to JSON array:

   ```bash
   cat treasury.json
   ```

3. Copy the entire array and paste as a string in your .env.local:
   ```env
   TREASURY_KEY_JSON="[1,2,3,4,5...]"
   ```

## Security Notes

- **NEVER** commit your `.env.local` file to git
- **NEVER** expose your `SUPABASE_SERVICE_ROLE_KEY` on the client side
- **NEVER** expose your `TREASURY_KEY_JSON` on the client side
- These keys should only be used in server-side API routes
