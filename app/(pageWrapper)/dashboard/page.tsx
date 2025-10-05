'use client';

/**
 * Dashboard Page Component
 * Displays user's merged PRs fetched from Supabase
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import Card from '../../../components/Card';
import PRComponent from '../../../components/PRComponent';
import { supabase } from '../../../lib/supabase';
import type { PRRecord } from '../../../lib/supabase';

/**
 * Type definition for authenticated user
 */
type User = {
  id: string;
  email?: string;
  user_metadata?: {
    avatar_url?: string;
    full_name?: string;
    user_name?: string;
  };
};

/**
 * Dashboard page component
 * Main dashboard with sidebar navigation and real-time PR data
 */
export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [prs, setPrs] = useState<PRRecord[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const { data: { session }, error: authError } = await supabase.auth.getSession();
        
        if (authError || !session) {
          console.log('No active session, redirecting to login...');
          router.push('/');
          return;
        }

        setUser(session.user as User);

        // Fetch user's PRs ordered by most recent
        const { data: prsData, error: prsError } = await supabase
          .from('prs')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });

        if (prsError) {
          console.error('Error fetching PRs:', prsError);
        } else {
          setPrs(prsData || []);
        }
      } catch (error) {
        console.error('Error initializing dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/');
      } else {
        setUser(session.user as User);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);


  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };


  const getDisplayName = () => {
    return user?.user_metadata?.full_name || 
           user?.user_metadata?.user_name || 
           user?.email || 
           'User';
  };

  // Loading state
  if (loading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const displayName = getDisplayName();
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className="h-screen bg-white flex w-screen max-w-[1440px]">
      <Sidebar />

      <section className="w-full h-full bg-white px-8 py-8 flex flex-col gap-4 border-r border-neutral-200">
        {/* User Profile Header */}
        <div className='ml-auto border border-neutral-200 rounded-lg p-1 flex items-center gap-2 text-neutral-500'>
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
          <button 
            onClick={handleLogout}
            className="ml-2 text-xs text-red-600 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats Card Placeholder */}
        <Card height="h-[40%]" width="w-full">  
          {/* Add stats or charts here */}
        </Card>

        {/* PRs Section */}
        <h1 className='text-xl font-bold text-neutral-600'>My PRs</h1>

        <div className="flex flex-col overflow-y-auto">
          {prs.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <p className="font-medium">No PRs found. Merge a PR to see it here!</p>
              <p className="text-sm mt-2">Make sure your GitHub webhook is configured.</p>
            </div>
          ) : (
            prs.map((pr) => (
              <PRComponent key={pr.id} pr={pr} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}