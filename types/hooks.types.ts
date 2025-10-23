/**
 * Hooks Types
 *
 * This file contains types used by custom React hooks,
 * particularly for GitHub API integrations.
 */

// ===========================
// GitHub API Types
// ===========================

/**
 * GitHub organization membership response
 * Returned by GitHub API when checking org membership
 */
export interface GitHubOrgMembership {
  organization: {
    login: string;
    id: number;
  };
  state: 'active' | 'pending';
  role: 'admin' | 'member';
}

/**
 * GitHub repository data
 * Repository information with permission details
 */
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
  permissions?: {
    admin: boolean;
    push: boolean;
    pull: boolean;
  };
  private: boolean;
}

/**
 * User GitHub authentication data
 * Extracted from Supabase session after GitHub OAuth
 */
export interface UserGitHubData {
  githubId: string;
  githubUsername: string;
  token: string;
  email?: string;
  avatarUrl?: string;
}
