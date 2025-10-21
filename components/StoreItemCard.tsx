'use client';

import React, { useEffect, useRef, useState } from 'react';
import Card from './Card';
import { StoreItem } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export const StoreItemCard = ({ item }: { item: StoreItem }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { wallet, wallets, select, connected, publicKey, disconnect } =
    useWallet();
  const { setVisible } = useWalletModal();
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsWalletDropdownOpen(false);
      }
    };

    if (isWalletDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isWalletDropdownOpen]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (item.video && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (item.video && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleNameClick = () => {
    setIsDialogOpen(true);
  };

  const handleWalletSelect = (walletName: string) => {
    const selectedWallet = wallets.find((w) => w.adapter.name === walletName);
    if (selectedWallet) {
      select(selectedWallet.adapter.name);
      setIsWalletDropdownOpen(false);
    }
  };

  const handleRedeem = () => {
    if (!connected) {
      setVisible(true);
    } else {
      console.log('Redeeming item for:', publicKey?.toString());
    }
  };

  return (
    <>
      <Card
        key={item.layoutId}
        height="h-64"
        width="w-full"
        className="hover:shadow-[0px_2px_16px_#12121260] hover:scale-[1.02] shadow-[0px_2px_4px_#12121230] transition-all duration-300 group"
      >
        <div
          className="relative h-full overflow-hidden rounded-md"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.video ? (
            <>
              <img
                src={item.image}
                alt={item.title}
                className={`w-full h-full object-bottom object-cover transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
              />
              <video
                ref={videoRef}
                src={item.video}
                className={`absolute inset-0 w-full h-full object-bottom object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                muted
                loop
                playsInline
              />
            </>
          ) : (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-bottom object-cover"
            />
          )}

          {item.video && (
            <div
              style={{ boxShadow: 'inset 0px 0px 3px #ffffff40' }}
              className="border border-[#12121210] absolute top-2  p-0.5 left-2 w-5 h-5  backdrop-blur-lg bg-black/20  rounded-sm flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-full h-full text-white/80"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                />
              </svg>
            </div>
          )}

          <div
            style={{ boxShadow: 'inset 0px 0px 3px #ffffff40 ' }}
            className="border px-1 h-5 border-[#12121210] absolute top-2   right-2   backdrop-blur-lg bg-black/20  rounded-sm items-center justify-center"
          >
            <p
              style={{ fontSize: 16, lineHeight: 20 }}
              className=" text-white/80 font-bitcount-single flex  items-center justify-center gap-1 h-full"
            >
              {0.0032}
              <img
                src="/images/solanaLogoMark.svg"
                alt="solana"
                style={{ filter: 'drop-shadow(0px 1px 0px #00000050)' }}
                className="h-3"
              />
            </p>
          </div>

          <div
            style={{ boxShadow: '0px -2px 6px #12121230' }}
            className="sticky bottom-0 left-0 w-full bg-black/20 backdrop-blur-2xl h-1/8 group-hover:h-1/4 transition-all duration-300 px-2  border flex-row rounded-t-xl items-center justify-between border-neutral-200/20"
          >
            <div className="flex items-center justify-between">
              <h1
                onClick={handleNameClick}
                className="text-sm text-shadow-[0px_1px_0px_#00000060] font-medium hover:text-neutral-300 transition-all duration-300 cursor-pointer text-neutral-200 font-exo-2 w-[70%] truncate border-r border-neutral-200/20  p-1"
              >
                {item.title}
              </h1>
              <p className="text-sm text-shadow-[0px_1px_0px_#00000060]  rounded-xl text-neutral-200 font-bitcount-single">
                {item.cost}MM
              </p>
            </div>
            <button
              onClick={handleNameClick}
              style={{
                marginLeft: 'auto',
                boxShadow: '0px 2px 4px #12121240, inset 0px 1px 4px #e0e0e070',
              }}
              className="text-sm w-full cursor-pointer  text-shadow-[0px_1px_0px_#00000060] bg-stone-800/5 font-exo-2   backdrop-blur-md border border-neutral-100/10  text-white rounded-md px-2 py-0.5 flex items-center justify-center gap-1 active:scale-[0.96] transition-transform duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 text-white/80"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
              View Details
            </button>
          </div>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-stone-100 border border-neutral-300/60 backdrop-blur-2xl min-w-[700px] max-h-[450px] flex gap-4 p-5">
          <div className="rounded-md w-2/3 shadow-[2px_2px_0px_#00000030] border border-neutral-300/70 h-full overflow-hidden bg-neutral-100">
            <img
              src={item.image}
              alt={item.title}
              className=" h-full -translate-y-1/4 w-full scale-150 object-cover object-bottom"
            />
          </div>

          <div className="flex flex-col gap-3.5">
            <DialogHeader className="pb-0">
              <DialogTitle className="text-xl font-exo-2 font-semibold text-neutral-800">
                {item.title}
              </DialogTitle>
            </DialogHeader>

            <div className="flex gap-3 w-full">
              <div className="flex-1 flex flex-col gap-1 border-r border-neutral-300/50 pr-3">
                <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">
                  SOL Price
                </span>
                <div className="flex items-center gap-1.5 bg-neutral-200/50 px-2 py-1.5 rounded-md shadow-[0px_2px_0px_#00000020]">
                  <span className="text-base font-bitcount-single text-neutral-800">
                    {0.0032}
                  </span>
                  <img
                    src="/images/solanaLogoMark.svg"
                    alt="solana"
                    className="h-4"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-1 pl-1">
                <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">
                  MM Cost
                </span>
                <span className="text-base font-bitcount-single text-neutral-800 bg-neutral-200/50 px-2 py-1.5 rounded-md shadow-[0px_2px_0px_#00000020]">
                  {item.cost} MM
                </span>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-xs font-semibold text-neutral-600 uppercase tracking-wide mb-1.5">
                Description
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                This exclusive NFT can be redeemed using your MergeMint points
                earned through contributions. Once redeemed, it will be minted
                and transferred to your connected wallet.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">
                Wallet
              </label>

              {connected && publicKey ? (
                <div
                  style={{ boxShadow: '0px 2px 4px #12121220' }}
                  className="w-full px-3 py-2.5 bg-neutral-100 border border-neutral-300/50 rounded-md flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-neutral-800 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-exo-2 font-medium text-sm text-neutral-800">
                        {wallet?.adapter.name}
                      </p>
                      <p className="text-xs text-neutral-500 font-mono">
                        {publicKey.toString().slice(0, 6)}...
                        {publicKey.toString().slice(-4)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={disconnect}
                    className="text-xs text-neutral-600 hover:text-neutral-800 font-exo-2 font-medium transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() =>
                      setIsWalletDropdownOpen(!isWalletDropdownOpen)
                    }
                    style={{ boxShadow: '0px 2px 4px #12121220' }}
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300/50 rounded-md font-exo-2 text-sm text-neutral-700 flex items-center justify-between hover:border-neutral-400/70 hover:bg-neutral-50 transition-all"
                  >
                    <span className="flex items-center gap-2">
                      {wallet ? (
                        <>
                          <div className="w-5 h-5 bg-neutral-200 rounded-full flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-3.5 h-3.5 text-neutral-600"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                              />
                            </svg>
                          </div>
                          <span className="font-medium">
                            {wallet.adapter.name}
                          </span>
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 text-neutral-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                            />
                          </svg>
                          <span>Select Wallet</span>
                        </>
                      )}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${isWalletDropdownOpen ? 'rotate-180' : ''}`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>

                  {isWalletDropdownOpen && wallets.length > 0 && (
                    <div
                      style={{ boxShadow: '0px 4px 12px #12121230' }}
                      className="absolute z-10 w-full mt-1 bg-white border border-neutral-300/70 rounded-md overflow-hidden max-h-56 overflow-y-auto"
                    >
                      {wallets.map((w) => (
                        <button
                          key={w.adapter.name}
                          onClick={() => handleWalletSelect(w.adapter.name)}
                          className={`w-full px-3 py-2.5 flex items-center gap-2.5 hover:bg-neutral-100 transition-colors text-left border-b border-neutral-200/50 last:border-b-0 ${
                            wallet?.adapter.name === w.adapter.name
                              ? 'bg-neutral-50'
                              : ''
                          }`}
                        >
                          <div className="w-7 h-7 bg-neutral-200 rounded-full flex items-center justify-center overflow-hidden">
                            {w.adapter.icon ? (
                              <img
                                src={w.adapter.icon}
                                alt={w.adapter.name}
                                className="w-5 h-5 object-contain"
                              />
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 text-neutral-600"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-exo-2 text-sm text-neutral-800 font-medium truncate">
                              {w.adapter.name}
                            </p>
                            <p className="text-xs text-neutral-500 truncate">
                              {w.readyState}
                            </p>
                          </div>
                          {wallet?.adapter.name === w.adapter.name && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2.5}
                              stroke="currentColor"
                              className="w-4 h-4 text-neutral-800 flex-shrink-0"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleRedeem}
              style={{
                boxShadow: connected
                  ? '0px 3px 0px #00000040'
                  : '0px 3px 0px #00000040',
              }}
              className={`w-full py-2.5 ${
                connected
                  ? 'bg-neutral-800 hover:bg-neutral-900'
                  : 'bg-neutral-700 hover:bg-neutral-800'
              } text-white rounded-md font-exo-2 font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-150 active:translate-y-[1px] active:shadow-[0px_2px_0px_#00000040]`}
            >
              {connected ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                    />
                  </svg>
                  Redeem for {item.cost} MM
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                    />
                  </svg>
                  Connect Wallet
                </>
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
