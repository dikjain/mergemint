/**
 * GitHub Authentication Hook
 *
 * Handles GitHub OAuth login via Supabase with admin privilege verification.
 * Provides authentication for both regular users and company/org admins.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { getCurrentSession } from '../api/apiExporter';

// Types for GitHub API responses
interface GitHubOrgMembership {
  organization: {
    login: string;
    id: number;
  };
  state: 'active' | 'pending';
  role: 'admin' | 'member';
}

interface GitHubRepo {
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

interface UserGitHubData {
  githubId: string;
  githubUsername: string;
  token: string;
  email?: string;
  avatarUrl?: string;
}

export const useGitHubAuth = () => {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserGitHubData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkSession();
  }, []);

  /**
   * Check for existing session and extract GitHub data
   */
  const checkSession = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user;

      if (session && user) {
        const githubData: UserGitHubData = {
          githubId: user.user_metadata?.provider_id || '',
          githubUsername:
            user.user_metadata?.user_name ||
            user.user_metadata?.preferred_username ||
            '',
          token: session.provider_token || '',
          email: user.email,
          avatarUrl: user.user_metadata?.avatar_url,
        };
        setUserData(githubData);
      }
    } catch (err) {
      console.error('Session check error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGitHub = async (
    redirectPath: string = '/dashboard',
    isCompanyLogin: boolean = false
  ) => {
    setIsAuthenticating(true);
    setError(null);

    try {
      // Check if already logged in
      const sessionResult = await getCurrentSession();

      if (sessionResult.success && sessionResult.data) {
        router.push(redirectPath);
        return;
      }

      // Define OAuth scopes based on login type
      const scopes = isCompanyLogin
        ? 'read:user user:email read:org repo'
        : 'read:user user:email';

      // Initiate OAuth flow
      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          scopes,
          redirectTo: `${window.location.origin}${redirectPath}`,
        },
      });

      if (authError) {
        setError('Failed to login with GitHub. Please try again.');
        setIsAuthenticating(false);
        return;
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsAuthenticating(false);
    }
  };

  const verifyOrgAdmin = async (
    orgName: string,
    token: string
  ): Promise<{ isAdmin: boolean; error?: string }> => {
    try {
      const response = await fetch(
        `https://api.github.com/user/memberships/orgs/${orgName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          return {
            isAdmin: false,
            error: 'You are not a member of this organization',
          };
        }
        return {
          isAdmin: false,
          error: 'Failed to verify organization membership',
        };
      }

      const membership: GitHubOrgMembership = await response.json();

      // User must be an active admin
      const isAdmin =
        membership.state === 'active' && membership.role === 'admin';

      if (!isAdmin) {
        return {
          isAdmin: false,
          error:
            membership.state !== 'active'
              ? 'Your organization membership is pending'
              : 'You need admin privileges for this organization',
        };
      }

      return { isAdmin: true };
    } catch (err) {
      console.error('Error verifying org admin:', err);
      return { isAdmin: false, error: 'Failed to verify admin privileges' };
    }
  };

  /**
   * Fetch all repositories where user has admin access
   * @param token - GitHub access token
   * @returns Array of repositories or null if error
   */
  const fetchAdminRepos = async (
    token: string
  ): Promise<GitHubRepo[] | null> => {
    try {
      const response = await fetch(
        'https://api.github.com/user/repos?affiliation=owner,organization_member&per_page=100',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
          },
        }
      );

      if (!response.ok) {
        console.error('Failed to fetch repos:', response.status);
        return null;
      }

      const repos: GitHubRepo[] = await response.json();

      // Filter only repos where user has admin access
      const adminRepos = repos.filter(
        (repo) => repo.permissions?.admin === true
      );

      return adminRepos;
    } catch (err) {
      console.error('Error fetching admin repos:', err);
      return null;
    }
  };

  /**
   * Fetch user's organizations where they have admin role
   * @param token - GitHub access token
   * @returns Array of organization memberships or null if error
   */
  const fetchAdminOrgs = async (
    token: string
  ): Promise<GitHubOrgMembership[] | null> => {
    try {
      const response = await fetch(
        'https://api.github.com/user/memberships/orgs?state=active',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
          },
        }
      );

      if (!response.ok) {
        console.error('Failed to fetch orgs:', response.status);
        return null;
      }

      const memberships: GitHubOrgMembership[] = await response.json();

      // Filter only orgs where user is admin
      const adminOrgs = memberships.filter(
        (membership) =>
          membership.state === 'active' && membership.role === 'admin'
      );

      return adminOrgs;
    } catch (err) {
      console.error('Error fetching admin orgs:', err);
      return null;
    }
  };

  const logout = async () => {
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        setError('Failed to logout');
        return;
      }
      setUserData(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError('An error occurred during logout');
    }
  };

  return {
    // State
    isAuthenticating,
    isLoading,
    userData,
    error,

    // Methods
    loginWithGitHub,
    verifyOrgAdmin,
    fetchAdminRepos,
    fetchAdminOrgs,
    logout,
    checkSession,
  };
};
