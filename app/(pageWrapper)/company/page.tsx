'use client';

import Sidebar from '../../../components/Sidebar';
import { usePathname } from 'next/navigation';
import { useGitHubAuth } from '../../../hooks/useGitHubAuth';
import GitHubConnectCard from '../../../components/company/GitHubConnectCard';
import SecretKeyCard from '../../../components/company/SecretKeyCard';
import WebhookSetupCard from '../../../components/company/WebhookSetupCard';

export default function CompanyPage() {
  const path = usePathname();
  const { userData, isLoading, loginWithGitHub } = useGitHubAuth();

  const secretKey = 'HEYAKDAKHDIUSAYHDAIUSH';

  const handleLogin = async () => {
    await loginWithGitHub('/company', true);
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-white flex w-screen max-w-[1440px]">
        <Sidebar isCompany={path === '/company'} />
        <section className="w-full h-full bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-neutral-600 font-nunito">Loading...</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex w-screen max-w-[1440px]">
      <Sidebar isCompany={path === '/company'} />

      <section className="w-full h-full relative px-8 py-8 flex flex-col gap-6 border-r border-neutral-200 overflow-y-auto">
        <h1 className="text-3xl font-bold text-neutral-600 font-exo-2">
          Company Dashboard
        </h1>

        <div className="flex-1 flex flex-col gap-6">
          <div className="flex gap-6 h-[40%]">
            <GitHubConnectCard userData={userData} onLogin={handleLogin} />
            <SecretKeyCard secretKey={secretKey} isAuthenticated={!!userData} />
          </div>

          <WebhookSetupCard isAuthenticated={!!userData} />
        </div>
      </section>
    </div>
  );
}
