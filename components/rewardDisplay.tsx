import { useMarkStore } from '@/app/store/store';
import { fetchStoreItems } from '@/api/apiExporter';
import { transformBackendStoreItems } from '@/utils/storeTransformers';
import PixelBlast from './PixelBlast';
import MilestoneBar from './MilestoneBar';
import { motion } from 'framer-motion';
import { useMemo, useEffect, useState } from 'react';

export default function RewardDisplay({ reward }: { reward: number }) {
  const { currentItems, storeItems, setStoreItems } = useMarkStore();

  // Ensure store items are loaded (handles direct dashboard visit)
  useEffect(() => {
    const load = async () => {
      if (storeItems.length === 0) {
        const res = await fetchStoreItems();
        if (res.success && res.data) {
          setStoreItems(transformBackendStoreItems(res.data));
        }
      }
    };
    load();
  }, []);

  const [solPrice, setSolPrice] = useState<number | null>(null);

  // Fetch current SOL->USD price once
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
        );
        const json = await res.json();
        if (json.solana && json.solana.usd) {
          setSolPrice(json.solana.usd);
        }
      } catch (e) {
        console.error('Failed to fetch SOL price', e);
      }
    };
    fetchPrice();
  }, []);

  // Build milestones array based on item cost sorted ascending
  const milestones = useMemo(() => {
    if (!storeItems || storeItems.length === 0) return [];
    const sortedCosts = [...storeItems]
      .map((item) => item.cost)
      .filter((v, i, arr) => arr.indexOf(v) === i) // unique
      .sort((a, b) => a - b);
    return [...sortedCosts];
  }, [storeItems]);

  return (
    <div
      style={{ boxShadow: `inset 0 0 10px 0 rgba(0, 0, 0, 0.1)` }}
      className="transition-all duration-300 flex flex-col w-full relative bg-neutral-50 rounded-md h-full overflow-hidden"
    >
      <MilestoneBar reward={reward} milestones={milestones} />

      {currentItems && (
        <div className="absolute top-1/2 z-50 left-1/2 gap-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <motion.div
            key={currentItems.layoutId}
            layoutId={currentItems.layoutId}
            className="w-[200px] h-[200px] bg-white rounded-lg border p-1 border-neutral-200 shadow-lg"
          >
            <motion.img
              src={currentItems.image}
              alt={currentItems.text}
              width={200}
              layoutId={currentItems.layoutId + 'image'}
              height={200}
              draggable={false}
              className="w-full h-full object-cover  object-bottom rounded-md"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="max-w-[50%]"
          >
            <h3 className="text-xl font-nunito font-bold tracking-tight text-neutral-700">
              {currentItems.title}
            </h3>
            <p className="text-sm text-neutral-600 mb-2">
              {currentItems.description}
            </p>
            <p className="text-md font-bitcount-single font-medium text-neutral-700">
              ${currentItems.solana} USD
              {solPrice && (
                <span className="ml-2 text-neutral-500">
                  / {(currentItems.solana / solPrice).toFixed(2)} SOL
                </span>
              )}
            </p>
          </motion.div>
        </div>
      )}

      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <PixelBlast
          variant="circle"
          pixelSize={4}
          color="#e5e5e5"
          patternScale={3}
          patternDensity={1.5}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />

        {storeItems.map((item) => (
          <motion.div
            key={item.layoutId}
            animate={{
              opacity:
                currentItems && currentItems.layoutId !== item.layoutId
                  ? 0.6
                  : 1,
              filter:
                currentItems && currentItems.layoutId !== item.layoutId
                  ? 'blur(4px)'
                  : 'none',
            }}
            layoutId={item.layoutId}
            className="w-20 h-20 bg-white rounded-lg border p-[2px] border-neutral-200 absolute shadow-lg"
            style={{
              left: `${item.x}%`,
              top: `${item.y - 20}%`,
            }}
          >
            <motion.img
              src={item.image}
              alt={item.text}
              width={80}
              layoutId={item.layoutId + 'image'}
              height={80}
              draggable={false}
              className="w-full h-full object-cover  object-bottom rounded-md"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
