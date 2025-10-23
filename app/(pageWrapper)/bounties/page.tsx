'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import BountyRow from '../../../components/BountyRow';
import { fetchBounties, type Bounty } from '../../../api/apiExporter';

export default function BountiesPage() {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBounties = async () => {
      try {
        const result = await fetchBounties({
          orderBy: 'created_at',
          ascending: false,
        });

        if (!result.success) {
          console.error('Error fetching bounties:', result.error);
        } else {
          setBounties(result.data || []);
        }
      } catch (error) {
        console.error('Unexpected error fetching bounties:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBounties();
  }, []);

  const handleBountyClick = (bounty: Bounty) => {
    if (bounty.issue_url) {
      window.open(bounty.issue_url, '_blank', 'noopener,noreferrer');
    } else {
      const githubUrl = `https://github.com/${bounty.repo_name}/issues/${bounty.issue_number}`;
      window.open(githubUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading bounties...</p>
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
            Bounties
          </h1>
          {bounties.length > 0 && (
            <div className="text-sm text-neutral-500">
              {bounties.length} {bounties.length === 1 ? 'bounty' : 'bounties'}{' '}
              available
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {bounties.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <p className="font-medium">No bounties available</p>
              <p className="text-sm mt-2">
                Check back later for new opportunities!
              </p>
            </div>
          ) : (
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div
                className="grid gap-4 p-4 bg-neutral-50 border-b border-neutral-200 text-sm font-medium text-neutral-600"
                style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr' }}
              >
                <div>Issue Name</div>
                <div>Company</div>
                <div>Repository</div>
                <div>Issue #</div>
                <div>Status</div>
                <div>Created</div>
              </div>

              {bounties.map((bounty) => (
                <BountyRow
                  key={bounty.id}
                  bounty={bounty}
                  onClick={handleBountyClick}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
