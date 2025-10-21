'use client';

import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import UserProfile from '../../../components/UserProfile';
import { StoreItemCard } from '../../../components/StoreItemCard';
import { fetchStoreItems } from '../../../api/apiExporter';
import { useGitHubAuth } from '../../../hooks/useGitHubAuth';
import { useMarkStore } from '@/app/store/store';
import { useAuthStore } from '@/app/store/authStore';
import { transformBackendStoreItems } from '@/utils/storeTransformers';

export default function StorePage() {
  const { loginWithGitHub, isAuthenticating } = useGitHubAuth();
  const { user, userDetails, fetchSession } = useAuthStore();
  const [renderHeight, setRenderHeight] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { storeItems, setStoreItems } = useMarkStore();
  const screenRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  useEffect(() => {
    const loadStoreItems = async () => {
      setIsLoading(true);
      console.log('Fetching store items...');
      const response = await fetchStoreItems();

      if (response.success && response.data) {
        const transformedItems = transformBackendStoreItems(response.data);
        console.log('Transformed items:', transformedItems);
        setStoreItems(transformedItems);
      } else {
        console.error('Failed to load store items:', response.error);
      }

      setIsLoading(false);
    };

    loadStoreItems();
  }, [setStoreItems]);

  useEffect(() => {
    const updateHeight = () => {
      if (screenRef.current) {
        const height = screenRef.current.clientHeight;
        setRenderHeight(height);
      }
    };
    updateHeight();
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [screenRef.current, user]);

  const handleLogin = async () => {
    await loginWithGitHub('/store', false);
  };

  return (
    <div className="h-screen bg-white flex w-screen max-w-[1440px]">
      <Sidebar />

      <section className="w-full h-full bg-white px-4 pt-8  flex flex-col gap-4 border-r border-neutral-200">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-neutral-600 font-exo-2">
            NFT Store
          </h1>

          <UserProfile
            user={user}
            userDetails={userDetails}
            onClick={handleLogin}
            isAuthenticating={isAuthenticating}
          />
        </div>

        {user && (
          <div className="flex flex-col flex-1 overflow-x-hidden relative pb-8">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-neutral-500 font-exo-2">
                  Loading store items...
                </p>
              </div>
            ) : (
              <>
                <div
                  style={{ height: `${renderHeight}px` }}
                  className="border-l-2 border-dashed border-neutral-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5   absolute  w-full"
                >
                  {Array.from({ length: 5 }).map((_, index) => {
                    const count = storeItems.length % 5;
                    let height =
                      index + 1 <= count ? renderHeight : renderHeight - 268;

                    return (
                      <div
                        key={index}
                        style={{ height: `${height}px` }}
                        className=" ml-2 border-t-0 border-b-0 border-l-0 border-dashed border-2 border-neutral-200"
                      ></div>
                    );
                  })}
                </div>

                {Array.from({ length: Math.floor(storeItems.length / 5) }).map(
                  (_, index) => (
                    <div
                      key={index}
                      style={{
                        top: `${(index + 1) * 268 + index * 12 + 16}px`,
                      }}
                      className="w-full   absolute  border-l-0 border-r-0 border-t-0 border-dashed border-2 border-neutral-200"
                    ></div>
                  )
                )}

                <div
                  ref={screenRef}
                  className="grid px-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 pt-4"
                >
                  {storeItems.length === 0 && (
                    <div className="col-span-full text-center text-neutral-500 font-exo-2">
                      No items available in the store
                    </div>
                  )}
                  {storeItems.map((item) => (
                    <StoreItemCard key={item.layoutId} item={item} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
