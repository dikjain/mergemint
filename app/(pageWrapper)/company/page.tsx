'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import { usePathname } from 'next/navigation';
import { useGitHubAuth } from '../../../hooks/useGitHubAuth';
import {
  getCompanyByGitHubId,
  fetchUserOrganizations,
  storeGitHubData,
} from '../../../api/apiExporter';
import { supabase } from '../../../lib/supabase';
import GitHubConnectCard from '../../../components/company/GitHubConnectCard';
import SecretKeyCard from '../../../components/company/SecretKeyCard';
import WebhookSetupCard from '../../../components/company/WebhookSetupCard';
import type { Company, GitHubUserData } from '@/types';

export default function CompanyPage() {
  const path = usePathname();
  const { userData, isLoading, loginWithGitHub } = useGitHubAuth();
  const [companyData, setCompanyData] = useState<Company | null>(null);
  const [loadingCompany, setLoadingCompany] = useState(false);
  const [organizations, setOrganizations] = useState<GitHubUserData[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<number | null>(null);
  const [showOrgSelector, setShowOrgSelector] = useState(false);

  useEffect(() => {
    const fetchOrgsAndCompany = async () => {
      if (!userData?.token) return;

      setLoadingCompany(true);
      try {
        const orgs = await fetchUserOrganizations(userData.token);
        setOrganizations(orgs);

        if (orgs.length === 0) {
          setLoadingCompany(false);
          return;
        }

        let foundCompany = false;
        for (const org of orgs) {
          const result = await getCompanyByGitHubId(org.id.toString());
          if (result.success && result.data) {
            console.log(
              '🔑 Fetched webhook_secret:',
              result.data.webhook_secret
            );
            setCompanyData(result.data);
            setSelectedOrg(org.id);
            foundCompany = true;
            break;
          }
        }

        if (!foundCompany && orgs.length > 0) {
          setShowOrgSelector(true);
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
      } finally {
        setLoadingCompany(false);
      }
    };

    fetchOrgsAndCompany();
  }, [userData?.token]);

  const handleRegisterOrg = async () => {
    if (!selectedOrg || !userData?.token) return;

    setLoadingCompany(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user?.id) {
        await storeGitHubData(
          userData.token,
          session.user.id,
          true,
          selectedOrg
        );
        const result = await getCompanyByGitHubId(selectedOrg.toString());
        if (result.success && result.data) {
          setCompanyData(result.data);
          setShowOrgSelector(false);
        }
      }
    } catch (error) {
      console.error('Error registering organization:', error);
    } finally {
      setLoadingCompany(false);
    }
  };

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

        {showOrgSelector && organizations.length > 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white border border-neutral-200 rounded-lg p-8 max-w-md w-full shadow-sm">
              <h2 className="text-xl font-semibold text-neutral-700 font-nunito mb-4">
                Select Organization
              </h2>
              <p className="text-sm text-neutral-500 font-nunito mb-6">
                Choose which organization you want to register for webhooks:
              </p>
              <div className="space-y-3 mb-6">
                {organizations.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => setSelectedOrg(org.id)}
                    className={`w-full p-3 border rounded-lg text-left transition-all ${
                      selectedOrg === org.id
                        ? 'border-neutral-600 bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={org.avatar_url}
                        alt={org.login}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-neutral-700">
                          {org.login}
                        </p>
                        <p className="text-xs text-neutral-500">ID: {org.id}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={handleRegisterOrg}
                disabled={!selectedOrg || loadingCompany}
                className="w-full bg-neutral-800 text-white py-2 rounded-lg hover:bg-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed font-nunito"
              >
                {loadingCompany ? 'Registering...' : 'Register Organization'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex gap-6 h-[40%]">
              <GitHubConnectCard userData={userData} onLogin={handleLogin} />
              <SecretKeyCard
                secretKey={companyData?.webhook_secret || ''}
                isAuthenticated={!!userData}
                isLoading={loadingCompany}
              />
            </div>

            <WebhookSetupCard isAuthenticated={!!userData} />
          </div>
        )}
      </section>
    </div>
  );
}
