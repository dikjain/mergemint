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
import NoUserBranding from '../../../components/NoUserBranding';
import { useGitHubAuth } from '../../../hooks/useGitHubAuth';
import { ArrowUpRightIcon, FaceFrownIcon } from '@heroicons/react/24/outline';

import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const { loginWithGitHub, isAuthenticating } = useGitHubAuth();
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [prs, setPrs] = useState<PRRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initDashboard = async () => {
      try {
        const sessionResult = await getCurrentSession();

        if (!sessionResult.success || !sessionResult.data) {
          setLoading(false);
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
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    initDashboard();
  }, [router]);

  const handleLogin = async () => {
    await loginWithGitHub('/dashboard', false);
  };

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

          <UserProfile
            user={user}
            userDetails={userDetails}
            onClick={handleLogin}
            isAuthenticating={isAuthenticating}
          />
        </div>

        <Card height="h-[40%]" width="w-full">
          <RewardDisplay reward={(userDetails?.ipr_count || 0) * 4 || 0} />
        </Card>

        <h1 className="text-xl font-bold text-neutral-600 font-nunito">
          My PRs
        </h1>

        <div className="flex flex-col h-full overflow-y-auto">
          {!user ? (
            <NoUserBranding />
          ) : prs.length === 0 ? (
            <div className="w-full relative h-full flex items-center flex-col justify-center gap-2 flex-1">
              <div className="flex w-[300px] items-center  gap-2 mb-1 ">
                <h1 className="text-2xl font-bold text-neutral-600 font-nunito">
                  No PRs found
                </h1>
                <FaceFrownIcon className="w-8 h-8 text-neutral-600 -rotate-12" />
              </div>
              <h1 className="text-lg font-medium text-neutral-500 font-nunito max-w-[300px]">
                You can visit the
                <Link
                  href="/bounties"
                  className=" mx-1.5 bg-neutral-200 border border-neutral-300 text-sm -translate-y-0.5 px-2 rounded-full inline-flex items-center gap-1 hover:text-neutral-700 transition-all transition-300"
                >
                  Bounties <ArrowUpRightIcon className="w-3 h-3" />
                </Link>
                page to find some issue to get started with
              </h1>
            </div>
          ) : (
            prs.map((pr) => <PRComponent key={pr.id} pr={pr} />)
          )}
        </div>
      </section>
    </div>
  );
}
