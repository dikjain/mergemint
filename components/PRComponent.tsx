import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import type { PRComponentProps } from '@/types';

const getStatusConfig = (status: string) => {
  switch (status.toLowerCase()) {
    case 'approved':
    case 'completed':
      return {
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        icon: CheckCircleIcon,
        label: 'Completed',
      };
    case 'rejected':
      return {
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        icon: XCircleIcon,
        label: 'Rejected',
      };
    case 'pending':
    default:
      return {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        icon: ClockIcon,
        label: 'Pending',
      };
  }
};

/**
 * PRComponent - Renders a single PR item with all relevant information
 *
 * Features:
 * - Repository avatar with fallback to GitHub icon
 * - Truncated PR title with full title on hover
 * - Repository name display
 * - PR number with # prefix
 * - Status badge with appropriate icon and colors
 * - Hover effects for better UX
 */
export default function PRComponent({ pr }: PRComponentProps) {
  // Get status configuration for styling and icon
  const statusConfig = getStatusConfig(pr.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="w-full h-12 flex items-center gap-4 px-4 border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
      {/* Repository Image */}
      <div className="flex-shrink-0">
        <img
          src={
            pr.repo_image ||
            'https://images.icon-icons.com/2406/PNG/512/github_git_icon_145985.png'
          }
          alt={`${pr.repo_name} avatar`}
          className="w-6 h-6 rounded-full bg-neutral-200"
        />
      </div>

      {/* PR Title - Truncated with full title on hover */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-medium text-neutral-800 truncate"
          title={pr.title}
        >
          {pr.title}
        </p>
      </div>

      {/* Repository Name */}
      <div className="flex-shrink-0">
        <p className="text-sm text-neutral-600">{pr.repo_name}</p>
      </div>

      {/* PR Number */}
      <div className="flex-shrink-0">
        <p className="text-xs text-neutral-500">#{pr.pr_number}</p>
      </div>

      {/* Status Badge with Icon */}
      <div className="flex-shrink-0">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${statusConfig.bgColor} ${statusConfig.textColor}`}
        >
          <StatusIcon className="w-3 h-3" />
          {statusConfig.label}
        </span>
      </div>
    </div>
  );
}
