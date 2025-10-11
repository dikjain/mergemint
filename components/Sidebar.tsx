'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {  Cog6ToothIcon } from '@heroicons/react/24/outline';
import { logout } from '../api/apiExporter';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
} from './ui/dialog';

const navigationItems = [
  { label: 'Dashboard', hasBorder: true, route: '/dashboard' },
  { label: 'Bounties', hasBorder: true, route: '/bounties' },
  { label: 'Wall of Fame', hasBorder: false, route: '/wall-of-fame' },
  { label: 'Settings', hasBorder: false, isBottom: true, icon: Cog6ToothIcon, route: '/settings' },
];

export default function Sidebar() {
  const router = useRouter();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleNavigation = (route: string, label: string) => {
    if (label === 'Settings') {
      setIsLogoutDialogOpen(true);
    } else {
      router.push(route);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      const result = await logout();
      
      if (result.success) {
        router.push('/');
      } else {
        alert(result.error || 'Failed to logout. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An unexpected error occurred during logout.');
    } finally {
      setIsLoggingOut(false);
      setIsLogoutDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-[180px] py-8 px-6 gap-1 border-r border-neutral-300">
      {navigationItems.map((item, index) => (
        <h2 
          key={item.label + index}
          onClick={() => handleNavigation(item.route, item.label)}
          className={`text-md text-neutral-500 cursor-pointer text-nowrap font-semibold tracking-tight flex items-center gap-1 font-nunito hover:text-neutral-700 transition-colors ${
            item.hasBorder ? 'border-b border-neutral-300' : ''
          } ${item.isBottom ? 'mt-auto' : ''}`}
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          {item.label}
        </h2>
      ))}
      
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
            <DialogDescription>
              You will be redirected to the login page and will need to sign in again to access your dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setIsLogoutDialogOpen(false)}
              className="px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
              disabled={isLoggingOut}
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors flex items-center gap-2 ${
                isLoggingOut 
                  ? 'bg-red-400 cursor-not-allowed' 
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {isLoggingOut ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Logging out...
                </>
              ) : (
                'Yes, log out'
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
