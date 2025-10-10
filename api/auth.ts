import { supabase } from '../lib/supabase';
import type { User, UserDetails, ApiResponse, AuthSession } from './types';

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

/**
 * Log out the current user
 * Used by: components/Sidebar.tsx
 */
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

    return {
      data: null,
      error: null,
      success: true,
    };
  } catch (error) {
    console.error('Unexpected error during logout:', error);
    return {
      data: null,
      error: 'An unexpected error occurred during logout.',
      success: false,
    };
  }
};

/**
 * Get current user session with details
 * Used by: hooks/useGitHubAuth.ts, app/(pageWrapper)/dashboard/page.tsx
 */
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
      return {
        data: null,
        error: 'No active session found.',
        success: false,
      };
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
