'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import Card from '../../../components/Card';
import PRComponent from '../../../components/PRComponent';
import UserProfile from '../../../components/UserProfile';
import { 
  getCurrentSession, 
  logout, 
  onAuthStateChange, 
  fetchUserPRs,
  type User,
  type UserDetails,
  type PRRecord,
  type AuthSession
} from '../../../api/apiExporter';


export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [prs, setPrs] = useState<PRRecord[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const sessionResult = await getCurrentSession();
        
        if (!sessionResult.success || !sessionResult.data) {
          console.log('No active session, redirecting to login...');
          router.push('/');
          return;
        }

        setUser(sessionResult.data.user);

        const userDetailsData = sessionResult.data.userDetails;
        setUserDetails(userDetailsData);

        const prsResult = await fetchUserPRs(sessionResult.data.user.id, {
          orderBy: 'created_at',
          ascending: false
        });

        if (!prsResult.success) {
          console.error('Error fetching PRs:', prsResult.error);
        } else {
          setPrs(prsResult.data || []);
        }
      } catch (error) {
        console.error('Error initializing dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();

    const unsubscribe = onAuthStateChange((session: AuthSession | null) => {
      if (!session) {
        router.push('/');
      } else {
        setUser(session.user);
        setUserDetails(session.userDetails);
      }
    });

    return unsubscribe;
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


        <div className='flex items-center justify-between'>
          <h1 className="text-3xl font-bold text-neutral-600 font-exo-2">Dashboard</h1>
          <UserProfile user={user} userDetails={userDetails} />
        </div>

        {/* Stats Card Placeholder */}
        <Card height="h-[40%]" width="w-full">  
          {/* Add stats or charts here */}
        </Card>

        {/* PRs Section */}
        
        <h1 className='text-xl font-bold text-neutral-600 font-nunito'>My PRs</h1>
  

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