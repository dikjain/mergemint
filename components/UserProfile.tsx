"use client";

import { User, UserDetails } from '@/api/apiExporter';
import { getDisplayName } from '@/utils';

type UserProfileProps = {
  user: User | null;
  userDetails: UserDetails | null;
};

export default function UserProfile({ user, userDetails }: UserProfileProps) {
  const displayName = getDisplayName(user);
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className='border border-neutral-200 rounded-lg p-1 relative flex items-center gap-2 text-neutral-500'>
      {avatarUrl ? (
        <img 
          src={avatarUrl} 
          alt="User avatar" 
          className='w-6 h-6 rounded-full object-cover'
        />
      ) : (
        <div className='w-6 h-6 bg-black/20 rounded-full' />
      )}
      <span className="text-sm">{displayName}</span>

      {!userDetails && (
        <div className='w-2 h-2 bg-red-600 border border-red-500 absolute right-0 top-0 rounded-full translate-x-1/3 -translate-y-1/3 animate-pulse'></div>
      )}
    </div>
  );
}
