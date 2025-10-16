'use client';
import PRComponent from './PRComponent';
import Card from './Card';
import Image from 'next/image';
import { mockPRs } from '@/lib/mockData';
import type { MockPR } from '@/types';

export default function noUserBranding() {
  return (
    <Card height="h-full" width="w-full">
      <div className="w-full relative h-full">
        <div className="absolute w-full h-full flex items-center justify-center z-30">
          <Image
            src="/images/emptypr.png"
            alt="Empty PRs"
            fill
            objectFit="contain"
            style={{
              transform: 'translateX(-20%)',
              scale: '0.8',
              opacity: '0.9',
            }}
          />
          <h1
            style={{ transform: 'translateX(20%)' }}
            className="text-6xl font-bold text-neutral-700 font-nunito"
          >
            MAKE PR,
            <br /> EARN NFTs
          </h1>
        </div>

        <div className="bg-white blur-sm inset-0 z-10 absolute rounded-lg mask-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_100%)]"></div>
        <div className="rounded-lg overflow-hidden bg-neutral-50 blur-[1px]">
          {mockPRs.map((pr) => (
            <PRComponent key={pr.id} pr={pr as MockPR} />
          ))}
        </div>
      </div>
    </Card>
  );
}
