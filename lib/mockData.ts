/**
 * Mock Data for Testing
 * 
 * This file contains mock data that matches the database schema for users and PRs tables.
 * It can be used for testing the PRComponent and dashboard functionality.
 */

import type { PRRecord } from './supabase';

// Mock Users Data (matching users table schema)
export interface MockUser {
  id: string; // UUID
  github_username: string;
  avatar_url: string | null;
  ipr_count: number;
  created_at: string;
  updated_at: string;
}

export const mockUsers: MockUser[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    github_username: 'johndoe',
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    ipr_count: 15,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-10-01T14:20:00Z'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    github_username: 'janedeveloper',
    avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
    ipr_count: 23,
    created_at: '2024-02-20T09:15:00Z',
    updated_at: '2024-10-02T16:45:00Z'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    github_username: 'codemaster',
    avatar_url: 'https://avatars.githubusercontent.com/u/3?v=4',
    ipr_count: 8,
    created_at: '2024-03-10T11:00:00Z',
    updated_at: '2024-10-03T13:30:00Z'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    github_username: 'reactqueen',
    avatar_url: 'https://avatars.githubusercontent.com/u/4?v=4',
    ipr_count: 31,
    created_at: '2024-01-25T08:45:00Z',
    updated_at: '2024-10-04T10:15:00Z'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    github_username: 'opensourcehero',
    avatar_url: null,
    ipr_count: 42,
    created_at: '2024-04-05T07:20:00Z',
    updated_at: '2024-10-05T12:00:00Z'
  }
];

// Mock PRs Data (matching prs table schema)
export interface MockPR {
  id: number; // bigint (generated always as identity)
  pr_number: number;
  user_id: string; // UUID reference to users
  repo_name: string;
  title: string;
  status: 'pending' | 'completed' | 'rejected';
  repo_image: string | null;
  created_at: string;
  updated_at: string;
}

export const mockPRs: MockPR[] = [
  {
    id: 1,
    pr_number: 24276,
    user_id: '550e8400-e29b-41d4-a716-446655440001',
    repo_name: 'cal.com',
    title: 'bug: AI assistant button overlaps bottom navigation and poor padding on Teams page (mobile)',
    status: 'completed',
    repo_image: 'https://avatars.githubusercontent.com/u/79145102?s=200&v=4',
    created_at: '2024-10-06T09:30:00Z',
    updated_at: '2024-10-06T09:30:00Z'
  },
  {
    id: 5,
    pr_number: 20387,
    user_id: '550e8400-e29b-41d4-a716-446655440005',
    repo_name: 'n8n',
    title: 'n8n-nodes-evolution-api unable to install',
    status: 'completed',
    repo_image: 'https://avatars.githubusercontent.com/u/45487711?s=200&v=4',
    created_at: '2024-10-06T12:00:00Z',
    updated_at: '2024-10-06T12:00:00Z'
  },
  {
    id: 3,
    pr_number: 2036,
    user_id: '550e8400-e29b-41d4-a716-446655440003',
    repo_name: 'Zero',
    title: 'docker.io/bitnami/valkey:8.0: not found',
    status: 'completed',
    repo_image: 'https://avatars.githubusercontent.com/u/198371852?s=200&v=4',
    created_at: '2024-10-04T11:15:00Z',
    updated_at: '2024-10-04T11:15:00Z'
},
{
  id: 4,
  pr_number: 39199,
  user_id: '550e8400-e29b-41d4-a716-446655440004',
  repo_name: 'supabase',
  title: '404 page - Improve documentation link on Getting Started page for Realtime',
  status: 'pending',
  repo_image: 'https://avatars.githubusercontent.com/u/54469796?s=200&v=4',
  created_at: '2024-10-03T16:45:00Z',
  updated_at: '2024-10-03T16:45:00Z'
},
  {
    id: 2,
    pr_number: 24258,
    user_id: '550e8400-e29b-41d4-a716-446655440002',
    repo_name: 'cal.com',
    title: 'Bug: Empty Screen Template Grid Layout Not Mobile Responsive',
    status: 'pending',
    repo_image: 'https://avatars.githubusercontent.com/u/79145102?s=200&v=4',
    created_at: '2024-10-05T14:20:00Z',
    updated_at: '2024-10-05T14:20:00Z'
  },
  {
    id: 6,
    pr_number: 20381,
    user_id: '550e8400-e29b-41d4-a716-446655440001',
    repo_name: 'n8n',
    title: 'Data Table: Incorrect Time Zone Conversion for datetime Type Data',
    status: 'pending',
    repo_image: 'https://avatars.githubusercontent.com/u/45487711?s=200&v=4',
    created_at: '2024-10-05T18:00:00Z',
    updated_at: '2024-10-05T18:00:00Z'
  }
];

/**
 * Convert MockPR to PRRecord format expected by PRComponent
 */
export function convertMockPRToPRRecord(mockPR: MockPR): PRRecord {
  return {
    id: mockPR.id.toString(),
    created_at: mockPR.created_at,
    user_id: mockPR.user_id,
    repo_name: mockPR.repo_name,
    pr_number: mockPR.pr_number,
    title: mockPR.title,
    status: mockPR.status,
    repo_image: mockPR.repo_image || undefined
  };
}

/**
 * Get mock PRs for a specific user
 */
export function getMockPRsForUser(userId: string): PRRecord[] {
  return mockPRs
    .filter(pr => pr.user_id === userId)
    .map(convertMockPRToPRRecord)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

/**
 * Get all mock PRs as PRRecord format
 */
export function getAllMockPRs(): PRRecord[] {
  return mockPRs
    .map(convertMockPRToPRRecord)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

/**
 * Get mock user by ID
 */
export function getMockUserById(userId: string): MockUser | undefined {
  return mockUsers.find(user => user.id === userId);
}

/**
 * Mock data toggle - set to true to use mock data instead of API calls
 */
export const USE_MOCK_DATA = process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
