import { useEffect, useState } from 'react';

export const useSolPrice = () => {
  const [solPrice, setSolPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
        );
        const json = await res.json();
        if (json?.solana?.usd) setSolPrice(json.solana.usd);
      } catch (e) {
        console.error('Failed to fetch SOL price', e);
      }
    };
    fetchPrice();
  }, []);

  return solPrice;
};
