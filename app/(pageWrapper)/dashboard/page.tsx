'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import Card from '../../../components/Card';
import PRComponent from '../../../components/PRComponent';
import UserProfile from '../../../components/UserProfile';
import {
  getCurrentSession,
  fetchUserPRs,
  type User,
  type UserDetails,
  type PRRecord,
} from '../../../api/apiExporter';
import RewardDisplay from '../../../components/rewardDisplay';
import EmptyPrs from '../../../components/emptyPrs';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [prs, setPrs] = useState<PRRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initDashboard = async () => {
      try {
        // Check if session exists
        const sessionResult = await getCurrentSession();

        if (!sessionResult.success || !sessionResult.data) {
          // No session, redirect to landing page
          router.push('/');
          return;
        }

        // Session exists, load user data
        setUser(sessionResult.data.user);
        setUserDetails(sessionResult.data.userDetails);

        // Fetch user PRs
        const prsResult = await fetchUserPRs(sessionResult.data.user.id, {
          orderBy: 'created_at',
          ascending: false,
        });

        if (prsResult.success) {
          setPrs(prsResult.data || []);
        }
      } catch (error) {
        console.error('Dashboard initialization error:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    initDashboard();
  }, [router]);

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

  return (
    <div className="h-screen bg-white flex w-screen max-w-[1440px]">
      <Sidebar />

      <section className="w-full h-full bg-white px-8 py-8 flex flex-col gap-4 border-r border-neutral-200">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-neutral-600 font-exo-2">
            Dashboard
          </h1>
          <UserProfile user={user} userDetails={userDetails} />
        </div>

        <Card height="h-[40%]" width="w-full">
          <RewardDisplay reward={(userDetails?.ipr_count || 0) * 4 || 0} />
        </Card>

        <h1 className="text-xl font-bold text-neutral-600 font-nunito">
          My PRs
        </h1>

        <div className="flex flex-col overflow-y-auto">
          {prs.length === 0 ? (
            <EmptyPrs />
          ) : (
            prs.map((pr) => <PRComponent key={pr.id} pr={pr} />)
          )}
        </div>
      </section>
    </div>
  );
}
