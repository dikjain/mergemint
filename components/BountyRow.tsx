import { Bounty } from '../api/apiExporter';
import { formatDate } from '@/utils/formatters';

interface BountyRowProps {
  bounty: Bounty;
  onClick: (bounty: Bounty) => void;
}

export default function BountyRow({ bounty, onClick }: BountyRowProps) {
  const getStatusDisplay = (status: string) => {
    if (status === 'pending') return 'OPEN';
    if (status === 'active') return 'CLOSED';
    return status;
  };

  const GitHubIssueIcon = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="inline-block"
    >
      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
    </svg>
  );

  const GitHubClosedIcon = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="inline-block"
    >
      <path d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z" />
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z" />
    </svg>
  );

  const isClosed = bounty.status === 'active';

  return (
    <div
      className="grid gap-4 p-4 border-b border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer"
      style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr' }}
      onClick={() => onClick(bounty)}
    >
      <div className="text-neutral-800 truncate">
        {bounty.issue_name || 'N/A'}
      </div>

      <div className="flex items-center gap-2 overflow-hidden">
        {bounty.company_logo && (
          <img
            src={bounty.company_logo}
            alt={`${bounty.company_name} logo`}
            className="w-5 h-5 rounded object-cover border border-neutral-200 flex-shrink-0"
          />
        )}
        <span className="text-neutral-600 truncate">
          {bounty.company_name || 'N/A'}
        </span>
      </div>

      <div className="font-medium text-neutral-800 truncate">
        {bounty.repo_name.split('/')[1]}
      </div>

      <div className="text-neutral-600 truncate">#{bounty.issue_number}</div>

      <div className="flex items-center truncate">
        <span className="px-2 py-1 text-xs font-medium rounded-full border border-neutral-200 text-neutral-600 flex items-center gap-1">
          {isClosed ? <GitHubClosedIcon /> : <GitHubIssueIcon />}
          <p className="mb-[1px]">{getStatusDisplay(bounty.status)}</p>
        </span>
      </div>

      <div className="text-neutral-500 text-sm truncate">
        {formatDate(bounty.created_at)}
      </div>
    </div>
  );
}
