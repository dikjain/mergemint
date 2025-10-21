import type { PRComponentProps } from '@/types';

export default function PRComponent({ pr }: PRComponentProps) {
  return (
    <div className="w-full h-12 flex items-center gap-4 px-4 border border-t-0 border-r-0 rounded-md border-neutral-200 hover:bg-neutral-50 transition-colors">
      <div className="flex-shrink-0">
        <img
          src={
            pr.repo_image ||
            'https://images.icon-icons.com/2406/PNG/512/github_git_icon_145985.png'
          }
          alt={`${pr.repo_name} avatar`}
          className="w-6 h-6 rounded-full border shadow-md border-neutral-200"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-medium text-neutral-800 truncate"
          title={pr.title}
        >
          {pr.title}
        </p>
      </div>

      <div className="flex-shrink-0">
        <p className="text-sm text-neutral-600">{pr.repo_name}</p>
      </div>

      <div className="flex-shrink-0">
        <p className="text-xs text-neutral-500">#{pr.pr_number}</p>
      </div>
    </div>
  );
}
