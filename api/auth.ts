import { supabase } from '../lib/supabase';
import type {
  User,
  UserDetails,
  Company,
  GitHubUserData,
  ApiResponse,
  AuthSession,
} from './types';

const fetchUserDetails = async (
  userId: string
): Promise<UserDetails | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error fetching user details:', error);
    return null;
  }
};

const fetchGitHubUserData = async (
  token: string
): Promise<GitHubUserData | null> => {
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch GitHub user data:', response.status);
      return null;
    }
    const data: GitHubUserData = await response.json();
    console.log('🔥 GitHub User Data:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error fetching GitHub user data:', error);
    return null;
  }
};

export const fetchUserOrganizations = async (
  token: string
): Promise<GitHubUserData[]> => {
  try {
    const response = await fetch('https://api.github.com/user/orgs', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch organizations:', response.status);
      return [];
    }
    const orgs: GitHubUserData[] = await response.json();
    console.log(
      '🏢 User Organizations:',
      orgs.map((o) => ({ id: o.id, login: o.login }))
    );
    return orgs;
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return [];
  }
};

export const storeUserData = async (
  userId: string,
  githubData: GitHubUserData
): Promise<ApiResponse<UserDetails>> => {
  try {
    const userData = {
      id: userId,
      github_username: githubData.login,
      avatar_url: githubData.avatar_url,
      ipr_count: 0,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('users')
      .upsert(userData, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('Error storing user data:', error);
      return {
        data: null,
        error: 'Failed to store user data.',
        success: false,
      };
    }
    return { data, error: null, success: true };
  } catch (error) {
    console.error('Unexpected error storing user data:', error);
    return {
      data: null,
      error: 'An unexpected error occurred while storing user data.',
      success: false,
    };
  }
};

export const storeCompanyData = async (
  githubData: GitHubUserData
): Promise<ApiResponse<Company>> => {
  try {
    const companyData = {
      name: githubData.login,
      github_id: githubData.id,
      updated_at: new Date().toISOString(),
    };
    console.log(
      '💾 Storing Company - github_id:',
      githubData.id,
      '(',
      githubData.login,
      ')'
    );

    const { data, error } = await supabase
      .from('companies')
      .upsert(companyData, { onConflict: 'github_id' })
      .select()
      .single();

    if (error) {
      console.error('Error storing company data:', error);
      return {
        data: null,
        error: 'Failed to store company data.',
        success: false,
      };
    }
    return { data, error: null, success: true };
  } catch (error) {
    console.error('Unexpected error storing company data:', error);
    return {
      data: null,
      error: 'An unexpected error occurred while storing company data.',
      success: false,
    };
  }
};

export const storeGitHubData = async (
  token: string,
  userId: string,
  isCompanyContext: boolean = false,
  selectedOrgId?: number
): Promise<ApiResponse<UserDetails | Company>> => {
  try {
    if (isCompanyContext && selectedOrgId) {
      const orgs = await fetchUserOrganizations(token);
      const selectedOrg = orgs.find((org) => org.id === selectedOrgId);
      if (selectedOrg) {
        return await storeCompanyData(selectedOrg);
      }
      return {
        data: null,
        error: 'Selected organization not found.',
        success: false,
      };
    }

    const githubData = await fetchGitHubUserData(token);
    if (!githubData) {
      return {
        data: null,
        error: 'Failed to fetch GitHub data.',
        success: false,
      };
    }

    if (isCompanyContext || githubData.type === 'Organization') {
      return await storeCompanyData(githubData);
    } else {
      return await storeUserData(userId, githubData);
    }
  } catch (error) {
    console.error('Error storing GitHub data:', error);
    return {
      data: null,
      error: 'An unexpected error occurred while storing GitHub data.',
      success: false,
    };
  }
};

export const getCompanyByGitHubId = async (
  githubId: string
): Promise<ApiResponse<Company>> => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('github_id', Number(githubId))
      .single();

    if (error) {
      console.error('Error fetching company data:', error);
      return { data: null, error: 'Company not found.', success: false };
    }
    console.log(
      '📥 Fetched company:',
      data?.name,
      'webhook_secret:',
      data?.webhook_secret
    );
    return { data, error: null, success: true };
  } catch (error) {
    console.error('Unexpected error fetching company data:', error);
    return {
      data: null,
      error: 'An unexpected error occurred while fetching company data.',
      success: false,
    };
  }
};

export const logout = async (): Promise<ApiResponse<void>> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      return {
        data: null,
        error: 'Failed to logout. Please try again.',
        success: false,
      };
    }
    return { data: null, error: null, success: true };
  } catch (error) {
    console.error('Unexpected error during logout:', error);
    return {
      data: null,
      error: 'An unexpected error occurred during logout.',
      success: false,
    };
  }
};

export const getCurrentSession = async (): Promise<
  ApiResponse<AuthSession>
> => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Session error:', error);
      return {
        data: null,
        error: 'Failed to get current session.',
        success: false,
      };
    }

    if (!session) {
      return { data: null, error: 'No active session found.', success: false };
    }

    const userDetails = await fetchUserDetails(session.user.id);

    return {
      data: {
        user: session.user as User,
        userDetails,
        access_token: session.access_token,
        refresh_token: session.refresh_token || '',
        expires_at: session.expires_at || 0,
      },
      error: null,
      success: true,
    };
  } catch (error) {
    console.error('Unexpected error getting session:', error);
    return {
      data: null,
      error: 'An unexpected error occurred while getting session.',
      success: false,
    };
  }
};
