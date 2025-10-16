/**
 * Mock Data Types
 *
 * This file contains types for mock data used in development
 * and testing. These types mirror the actual database schema
 * but may have slight variations for testing purposes.
 */

// ===========================
// Mock User Types
// ===========================

/**
 * Mock user data for testing
 * Matches the users table schema
 */
export interface MockUser {
  id: string; // UUID
  github_username: string;
  avatar_url: string | null;
  ipr_count: number;
  created_at: string;
  updated_at: string;
}

// ===========================
// Mock PR Types
// ===========================

/**
 * Mock pull request data for testing
 * Matches the prs table schema
 */
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
