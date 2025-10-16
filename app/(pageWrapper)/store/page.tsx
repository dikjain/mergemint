'use client';

import React from 'react';
import Sidebar from '../../../components/Sidebar';
import Card from '../../../components/Card';
import { defaultItems } from '@/app/store/store';

export default function StorePage() {
  return (
    <div className="h-screen bg-white flex w-screen max-w-[1440px]">
      <Sidebar />

      <section className="w-full h-full bg-white px-8 py-8 flex flex-col gap-4 border-r border-neutral-200">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-neutral-600 font-exo-2">
            NFT Store
          </h1>
        </div>

        <div className="flex flex-col h-full overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {defaultItems.map((item) => (
              <Card
                key={item.layoutId}
                height="h-80"
                width="w-full"
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-full flex flex-col">
                  <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between p-2">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-800 mb-2 font-nunito">
                        {item.title}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-neutral-500">Price:</span>
                        <span className="text-lg font-bold text-neutral-800">
                          ${item.cost}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-neutral-500">
                          Solana:
                        </span>
                        <span className="text-sm font-medium text-purple-600">
                          {item.solana} SOL
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
