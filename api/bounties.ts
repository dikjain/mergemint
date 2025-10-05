/**
 * Bounties API Module
 * 
 * Handles all bounty-related operations including
 * fetching bounties, filtering, and bounty management.
 */

import { supabase } from '../lib/supabase';
import type { Bounty, ApiResponse } from './types';

/**
 * Fetches all bounties from the database
 * @param options - Optional query parameters for filtering and ordering
 * @returns Promise with bounties data
 */
export const fetchBounties = async (options?: {
  status?: Bounty['status'];
  limit?: number;
  offset?: number;
  orderBy?: 'created_at' | 'updated_at' | 'reward';
  ascending?: boolean;
}): Promise<ApiResponse<Bounty[]>> => {
  try {
    let query = supabase
      .from('bounties')
      .select('*');

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
      console.error('Error fetching bounties:', error);
      return {
        data: null,
        error: 'Failed to fetch bounties. Please try again.',
        success: false
      };
    }

    return {
      data: data || [],
      error: null,
      success: true
    };
  } catch (error) {
    console.error('Unexpected error fetching bounties:', error);
    return {
      data: null,
      error: 'An unexpected error occurred while fetching bounties.',
      success: false
    };
  }
};

/**
 * Fetches a specific bounty by ID
 * @param bountyId - The ID of the bounty to fetch
 * @returns Promise with bounty data
 */
export const fetchBountyById = async (bountyId: string): Promise<ApiResponse<Bounty>> => {
  try {
    const { data, error } = await supabase
      .from('bounties')
      .select('*')
      .eq('id', bountyId)
      .single();

    if (error) {
      console.error('Error fetching bounty:', error);
      return {
        data: null,
        error: 'Failed to fetch bounty. Please try again.',
        success: false
      };
    }

    return {
      data: data,
      error: null,
      success: true
    };
  } catch (error) {
    console.error('Unexpected error fetching bounty:', error);
    return {
      data: null,
      error: 'An unexpected error occurred while fetching bounty.',
      success: false
    };
  }
};

/**
 * Fetches bounties by company
 * @param companyName - The name of the company
 * @returns Promise with bounties data
 */
export const fetchBountiesByCompany = async (companyName: string): Promise<ApiResponse<Bounty[]>> => {
  try {
    const { data, error } = await supabase
      .from('bounties')
      .select('*')
      .eq('company_name', companyName)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching company bounties:', error);
      return {
        data: null,
        error: 'Failed to fetch company bounties. Please try again.',
        success: false
      };
    }

    return {
      data: data || [],
      error: null,
      success: true
    };
  } catch (error) {
    console.error('Unexpected error fetching company bounties:', error);
    return {
      data: null,
      error: 'An unexpected error occurred while fetching company bounties.',
      success: false
    };
  }
};

/**
 * Gets bounty statistics
 * @returns Promise with bounty statistics
 */
export const getBountyStats = async (): Promise<ApiResponse<{
  total: number;
  active: number;
  completed: number;
  totalReward: number;
}>> => {
  try {
    const { data, error } = await supabase
      .from('bounties')
      .select('status, reward');

    if (error) {
      console.error('Error fetching bounty stats:', error);
      return {
        data: null,
        error: 'Failed to fetch bounty statistics.',
        success: false
      };
    }

    const stats = {
      total: data.length,
      active: data.filter(b => b.status === 'active').length,
      completed: data.filter(b => b.status === 'completed').length,
      totalReward: data.reduce((sum, b) => sum + (b.reward || 0), 0)
    };

    return {
      data: stats,
      error: null,
      success: true
    };
  } catch (error) {
    console.error('Unexpected error fetching bounty stats:', error);
    return {
      data: null,
      error: 'An unexpected error occurred while fetching statistics.',
      success: false
    };
  }
};
