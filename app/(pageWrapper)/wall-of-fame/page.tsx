'use client';

import { useEffect, useState } from 'react';
import Masonry from '@/components/Masonry';
import Sidebar from '@/components/Sidebar';
import { useAuthStore } from '@/app/store/authStore';
import { fetchUserOwnedItems } from '@/api/apiExporter';
import { BackendStoreItem } from '@/types/api.types';

export default function WallOfFamePage() {
  const { user } = useAuthStore();
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOwnedItems = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const ownedItems = await fetchUserOwnedItems(user.id);

      // Transform to Masonry format
      const masonryItems = ownedItems.map(
        (item: BackendStoreItem, index: number) => ({
          id: item.id.toString(),
          img: item.image || '',
          url: '#',
          height: 500 + (index % 3) * 50, // Varied heights for masonry effect
        })
      );

      setItems(masonryItems);
      setIsLoading(false);
    };

    loadOwnedItems();
  }, [user?.id]);

  return (
    <div className="h-screen bg-white flex w-screen max-w-[1440px] overflow-hidden">
      <Sidebar />

      <section className="w-full h-full bg-white px-8 py-8 flex flex-col border-r border-neutral-200 overflow-hidden">
        <h1 className="text-3xl font-bold text-neutral-600 font-exo-2">
          Wall of Fame
        </h1>
        <h1 className="text-md font-normal text-neutral-400 font-exo-2 mb-8">
          All the items you own are displayed here as a mark of honour
        </h1>

        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-600 mx-auto mb-4"></div>
                <p className="text-neutral-500 font-exo-2">
                  Loading your collection...
                </p>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-16 h-16 mx-auto mb-4 text-neutral-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                <p className="text-neutral-500 font-exo-2 text-lg mb-2">
                  No items yet
                </p>
                <p className="text-neutral-400 font-nunito text-sm">
                  Start redeeming items from the store to build your collection!
                </p>
              </div>
            </div>
          ) : (
            <div
              className="h-full overflow-y-scroll scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <Masonry
                items={items}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.95}
                blurToFocus={true}
                colorShiftOnHover={false}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
