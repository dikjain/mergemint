import { supabase } from '../lib/supabase';
import type { PRRecord, ApiResponse } from './types';

export const fetchUserPRs = async (
  userId: string,
  options?: {
    status?: PRRecord['status'];
    limit?: number;
    offset?: number;
    orderBy?: 'created_at';
    ascending?: boolean;
  }
): Promise<ApiResponse<PRRecord[]>> => {
  try {
    let query = supabase
      .from('prs')
      .select('*')
      .eq('user_id', userId);

    // Apply status filter if provided
    if (options?.status) {
      query = query.eq('status', options.status);
    }

    // Apply ordering
    const orderBy = options?.orderBy || 'created_at';
    const ascending = options?.ascending || false;
    query = query.order(orderBy, { ascending });

    // Apply pagination if provided
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching user PRs:', error);
      return {
        data: null,
        error: 'Failed to fetch PRs. Please try again.',
        success: false
      };
    }

    return {
      data: data || [],
      error: null,
      success: true
    };
  } catch (error) {
    console.error('Unexpected error fetching user PRs:', error);
    return {
      data: null,
      error: 'An unexpected error occurred while fetching PRs.',
      success: false
    };
  }
};

/**
 * Fetches all PRs (admin function)
 * @param options - Optional query parameters for filtering and ordering
 * @returns Promise with all PRs data
 */
export const fetchAllPRs = async (options?: {
  status?: PRRecord['status'];
  repoName?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'created_at';
  ascending?: boolean;
}): Promise<ApiResponse<PRRecord[]>> => {
  try {
    let query = supabase
      .from('prs')
      .select('*');

    // Apply status filter if provided
    if (options?.status) {
      query = query.eq('status', options.status);
    }

    // Apply repo filter if provided
    if (options?.repoName) {
      query = query.eq('repo_name', options.repoName);
    }

    // Apply ordering
    const orderBy = options?.orderBy || 'created_at';
    const ascending = options?.ascending || false;
    query = query.order(orderBy, { ascending });

    // Apply pagination if provided
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching all PRs:', error);
      return {
        data: null,
        error: 'Failed to fetch PRs. Please try again.',
        success: false
      };
    }

    return {
      data: data || [],
      error: null,
      success: true
    };
  } catch (error) {
    console.error('Unexpected error fetching all PRs:', error);
    return {
      data: null,
      error: 'An unexpected error occurred while fetching PRs.',
      success: false
    };
  }
};
