
// User types
export type User = {
  id: string;
  email?: string;
  user_metadata?: {
    avatar_url?: string;
    full_name?: string;
    user_name?: string;
  };
};

// User details from users table
export type UserDetails = {
  id: string;
  github_username: string;
  avatar_url: string | null;
  ipr_count: number | null;
  created_at: string | null;
  updated_at: string | null;
};

// Bounty types
export type Bounty = {
  id: string;
  repo_name: string;
  issue_number: number;
  reward: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  company_name: string | null;
  company_logo: string | null;
  company_github: string | null;
  issue_url: string | null;
};

// PR types (matching the actual database schema)
export type PRRecord = {
  id: string;
  created_at: string;
  user_id: string;
  repo_name: string;
  pr_number: number;
  title: string;
  status: 'pending' | 'rejected' | 'completed';
  repo_image?: string;
};

// API Response types
export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  success: boolean;
};

// Auth session type
export type AuthSession = {
  user: User;
  userDetails: UserDetails | null;
  access_token: string;
  refresh_token: string;
  expires_at: number;
};
