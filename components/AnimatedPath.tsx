import { motion } from 'framer-motion';
import type { AnimatedPathProps } from '@/types';

export default function AnimatedPath({
  path,
  color,
  gradientId,
  delay,
  horizontalDir,
  verticalDir,
  cardSize,
}: AnimatedPathProps) {
  const isLtr = horizontalDir === 'ltr';
  const isTtb = verticalDir === 'ttb';

  return (
    <>
      <path d={path} stroke={color} strokeOpacity="0.2" />
      <path
        d={path}
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          animate={{
            x1: isLtr
              ? [0, cardSize.width * 2]
              : [cardSize.width, -cardSize.width],
            x2: isLtr
              ? [-cardSize.width, cardSize.width]
              : [cardSize.width * 2, 0],
            y1: isTtb ? [0, cardSize.height * 2] : [cardSize.height, 0],
            y2: isTtb
              ? [-cardSize.height, cardSize.height]
              : [cardSize.height * 2, cardSize.height],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
          }}
        >
          <stop stopColor={color} stopOpacity="0" />
          <stop offset="0.3" stopColor={color} stopOpacity="0.3" />
          <stop offset="0.5" stopColor={color} />
          <stop offset="0.7" stopColor={color} stopOpacity="0.3" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </>
  );
}
