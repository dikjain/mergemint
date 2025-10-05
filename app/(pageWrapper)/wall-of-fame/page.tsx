"use client";

import Masonry from '@/components/Masonry';
import Sidebar from '@/components/Sidebar';


export default function WallOfFamePage() {
  // Mock data for wall of fame contributors using NFT monkey collection
  const items = [
    {
      id: "1",
      img: "https://wallpapers.com/images/high/nft-monkey-441q73yzqpw8o6y5.webp",
      url: "https://example.com/golden-ape",
      height: 400,
    },
    {
      id: "2", 
      img: "https://wallpapers.com/images/high/nft-monkey-r237cp3zh1bj5ivs.webp",
      url: "https://example.com/rare-ape",
      height: 450,
    },
    {
      id: "3",
      img: "https://wallpapers.com/images/high/nft-monkey-piax0vgvrmnr3tss.webp", 
      url: "https://example.com/digital-primate",
      height: 600,
    },
    {
      id: "4",
      img: "https://wallpapers.com/images/high/nft-monkey-pg4k4qtmfem0qlho.webp",
      url: "https://example.com/pixel-monkey", 
      height: 400,
    },
    {
      id: "5",
      img: "https://wallpapers.com/images/high/nft-monkey-fdm9t6g8p3h4nj7n.webp",
      url: "https://example.com/neon-ape",
      height: 500,
    },
    {
      id: "6",
      img: "https://wallpapers.com/images/high/nft-monkey-j0rpoqvt1zl8z03g.webp",
      url: "https://example.com/elite-monkey",
      height: 420,
    },
    {
      id: "7",
      img: "https://wallpapers.com/images/high/nft-monkey-cqcs8keyywd67e84.webp",
      url: "https://example.com/chrome-ape",
      height: 450,
    },
    {
      id: "8",
      img: "https://wallpapers.com/images/high/nft-monkey-2gqnsrs1nnyi66m2.webp",
      url: "https://example.com/legendary-primate",
      height: 480,
    }
  ];

  return (
    <div className="h-screen bg-white flex w-screen max-w-[1440px] overflow-hidden">
      <Sidebar />

      <section className="w-full h-full bg-white px-8 py-8 flex flex-col  border-r border-neutral-200 overflow-hidden">
        <h1 className="text-3xl font-bold text-neutral-600 font-exo-2 ">Wall of Fame</h1>
        <h1 className="text-md font-normal text-neutral-400 font-exo-2 mb-8 ">All the NFTs you win are displayed here as a mark of honour</h1>
        
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-scroll scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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
        </div>
      </section>
    </div>
  );
}