import { useMarkStore } from '@/app/store/store';
import PixelBlast from './PixelBlast';
import MilestoneBar from './MilestoneBar';
import { motion } from 'framer-motion';

export default function RewardDisplay({ reward }: { reward: number }) {
  const milestones = [0, 10, 25, 50, 80, 120, 200];
  const { currentItems, storeItems } = useMarkStore();

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
              {currentItems.solana} SOL
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
