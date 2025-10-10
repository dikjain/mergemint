import AnimatedPath from './AnimatedPath';

interface ConnectButtonAnimationsProps {
  cardSize: { width: number; height: number };
  paths: string[];
}

export default function ConnectButtonAnimations({
  cardSize,
  paths,
}: ConnectButtonAnimationsProps) {
  const pathConfigs = [
    {
      color: '#ef4444',
      delay: 0,
      horizontalDir: 'ltr' as const,
      verticalDir: 'btt' as const,
    },
    {
      color: '#3b82f6',
      delay: 0,
      horizontalDir: 'rtl' as const,
      verticalDir: 'btt' as const,
    },
    {
      color: '#10b981',
      delay: 1,
      horizontalDir: 'ltr' as const,
      verticalDir: 'btt' as const,
    },
    {
      color: '#8b5cf6',
      delay: 2,
      horizontalDir: 'rtl' as const,
      verticalDir: 'btt' as const,
    },
    {
      color: '#f59e0b',
      delay: 1,
      horizontalDir: 'rtl' as const,
      verticalDir: 'ttb' as const,
    },
    {
      color: '#ec4899',
      delay: 2,
      horizontalDir: 'ltr' as const,
      verticalDir: 'ttb' as const,
    },
  ];

  if (!cardSize.width || !paths[0]) return null;

  return (
    <svg
      width={cardSize.width}
      height={cardSize.height}
      viewBox={`0 0 ${cardSize.width} ${cardSize.height}`}
      fill="none"
      className="absolute inset-0 pointer-events-none"
    >
      {pathConfigs.map((config, index) => (
        <AnimatedPath
          key={index}
          path={paths[index]}
          color={config.color}
          gradientId={`pulse-${index + 1}`}
          delay={config.delay}
          horizontalDir={config.horizontalDir}
          verticalDir={config.verticalDir}
          cardSize={cardSize}
        />
      ))}
    </svg>
  );
}
