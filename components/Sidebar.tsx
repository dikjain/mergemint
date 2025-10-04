'use client';

import { UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

// Navigation items configuration
const navigationItems = [
  { label: 'Dashboard', hasBorder: true },
  { label: 'Leaderboard', hasBorder: true },
  { label: 'Wall of Fame', hasBorder: false },
  { label: 'Profile', hasBorder: true, isBottom: true, icon: UserIcon },
  { label: 'Settings', hasBorder: false, icon: Cog6ToothIcon },
];


export default function Sidebar() {
  return (
    <div className="flex flex-col h-full max-w-[180px] py-8 px-6 gap-1 border-r border-neutral-300">
      {navigationItems.map((item, index) => (
        <h2 
          key={item.label}
          className={`text-md text-neutral-500 cursor-pointer text-nowrap font-semibold tracking-tight  flex items-center gap-1 font-nunito ${
            item.hasBorder ? 'border-b border-neutral-300' : ''
          } ${item.isBottom ? 'mt-auto' : ''}`}
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          {item.label}
        </h2>
      ))}
    </div>
  );
}
