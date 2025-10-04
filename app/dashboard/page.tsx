'use client';

import Sidebar from '../../components/Sidebar';
import Card from '../../components/Card';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon 
} from '@heroicons/react/24/outline';

// Mock data for PRs based on the image
const mockPRData = [
  {
    id: 1,
    repo_image: 'https://images.icon-icons.com/2406/PNG/512/github_git_icon_145985.png', // GitHub repo avatar
    title: 'feat: Add new authentication flow',
    name: 'auth-enhancement',
    status: 'Pending'
  },
  {
    id: 2,
    repo_image: 'https://images.icon-icons.com/2406/PNG/512/github_git_icon_145985.png',
    title: 'fix: Resolve database connection issue',
    name: 'db-connection-fix',
    status: 'Approved'
  },
  {
    id: 3,
    repo_image: 'https://images.icon-icons.com/2406/PNG/512/github_git_icon_145985.png',
    title: 'docs: Update API documentation',
    name: 'api-docs-update',
    status: 'Rejected'
  },
  {
    id: 4,
    repo_image: 'https://images.icon-icons.com/2406/PNG/512/github_git_icon_145985.png',
    title: 'refactor: Optimize component rendering',
    name: 'component-optimization',
    status: 'Pending'
  }
];

/**
 * Get status styling and icon based on PR status
 * @param status - The status of the PR
 * @returns Object containing styling classes and icon component
 */
const getStatusConfig = (status: string) => {
  switch (status) {
    case 'Approved':
      return {
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        icon: CheckCircleIcon
      };
    case 'Rejected':
      return {
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        icon: XCircleIcon
      };
    case 'Pending':
    default:
      return {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        icon: ClockIcon
      };
  }
};

/**
 * Dashboard page component
 * Main dashboard layout with sidebar navigation
 */
export default function Dashboard() {
  return (
    <div className="h-screen bg-white flex w-screen max-w-[1440px]">
      <Sidebar />

      <section className="w-full h-full bg-white px-8 py-8 flex flex-col gap-4 border-r border-neutral-200">

        <div className='ml-auto border border-neutral-200 rounded-lg p-1 flex items-center gap-2 text-neutral-500'><div className='w-6 h-6  bg-black/20 rounded-full'/>Dikshit mahanot</div>

        <Card height="h-[40%]" width="w-full">
          {/* Card content goes here */}
        </Card>
      <h1 className='text-xl font-bold text-neutral-600'>My PRs</h1>

      {/* PR rows mapping mock data */}
      <div className="flex flex-col ">
        {mockPRData.map((pr) => {
          const statusConfig = getStatusConfig(pr.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <div key={pr.id} className='w-full h-12 flex items-center gap-4 px-4  border-b border-neutral-200 hover:bg-neutral-50 transition-colors'>
              {/* Repository Image */}
              <div className="flex-shrink-0">
                <img 
                  src={pr.repo_image} 
                  alt="Repository" 
                  className="w-6 h-6 rounded-full bg-neutral-200"
                />
              </div>
              
              {/* Title */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-800 truncate">
                  {pr.title}
                </p>
              </div>
              
              {/* Name */}
              <div className="flex-shrink-0">
                <p className="text-sm text-neutral-600">
                  {pr.name}
                </p>
              </div>
              
              {/* Status with Icon */}
              <div className="flex-shrink-0">
                <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                  <StatusIcon className="w-3 h-3" />
                  {pr.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      </section>


      
    </div>
  );
}