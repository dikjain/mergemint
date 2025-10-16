'use client';

import type { CardProps } from '@/types';

export default function Card({
  height = 'h-full',
  width = 'w-full',
  children,
  className = '',
  padding = 'p-1',
  style,
}: CardProps) {
  return (
    <div
      className={`${width} ${height} bg-white rounded-lg border ${padding} border-neutral-200 ${className}`}
      style={style}
    >
      {/* Inner container with neutral background */}
      <div className="w-full h-full bg-neutral-50 rounded-md border border-neutral-200">
        {children}
      </div>
    </div>
  );
}
