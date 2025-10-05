'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import { fetchBounties, type Bounty } from '../../../api/apiExporter';
import { formatReward, formatDate, getBountyStatusBadge } from '../../../utils';

export default function BountiesPage() {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBounties = async () => {
      try {
        const result = await fetchBounties({
          orderBy: 'created_at',
          ascending: false
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
          <h1 className="text-3xl font-bold text-neutral-600 font-exo-2 ">Bounties</h1>
          {bounties.length > 0 && <div className="text-sm text-neutral-500">
            {bounties.length} {bounties.length === 1 ? 'bounty' : 'bounties'} available
          </div>}
        </div>

        <div className="flex-1 overflow-y-auto">
          {bounties.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <p className="font-medium">No bounties available</p>
              <p className="text-sm mt-2">Check back later for new opportunities!</p>
            </div>
          ) : (
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-7 gap-4 p-4 bg-neutral-50 border-b border-neutral-200 text-sm font-medium text-neutral-600">
                <div>Repository</div>
                <div>Issue #</div>
                <div>Reward</div>
                <div>Status</div>
                <div>Company</div>
                <div>Created</div>
                <div>Updated</div>
              </div>

              {/* Table Rows */}
              {bounties.map((bounty) => (
                <div 
                  key={bounty.id} 
                  className="grid grid-cols-7 gap-4 p-4 border-b border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer"
                  onClick={() => handleBountyClick(bounty)}
                >
                  {/* Repository Name */}
                  <div className="font-medium text-neutral-800">
                    {bounty.repo_name}
                  </div>

                  {/* Issue Number */}
                  <div className="text-neutral-600">
                    #{bounty.issue_number}
                  </div>

                  {/* Reward */}
                  <div className="font-semibold text-green-600">
                    {formatReward(bounty.reward)}
                  </div>

                  {/* Status */}
                  <div>
                    <span className={getBountyStatusBadge(bounty.status)}>
                      {bounty.status}
                    </span>
                  </div>

                  {/* Company */}
                  <div className="flex items-center gap-2">
                    {bounty.company_logo && (
                      <img 
                        src={bounty.company_logo} 
                        alt={`${bounty.company_name} logo`}
                        className="w-5 h-5 rounded object-cover"
                      />
                    )}
                    <span className="text-neutral-600 truncate">
                      {bounty.company_name || 'N/A'}
                    </span>
                  </div>

                  {/* Created Date */}
                  <div className="text-neutral-500 text-sm">
                    {formatDate(bounty.created_at)}
                  </div>

                  {/* Updated Date */}
                  <div className="text-neutral-500 text-sm">
                    {formatDate(bounty.updated_at)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}