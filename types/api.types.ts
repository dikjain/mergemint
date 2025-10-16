export type User = {
  id: string;
  email?: string;
  user_metadata?: {
    avatar_url?: string;
    full_name?: string;
    user_name?: string;
  };
};

export type UserDetails = {
  id: string;
  github_username: string;
  avatar_url: string | null;
  ipr_count: number | null;
  created_at: string | null;
  updated_at: string | null;
};

export type Company = {
  id: number;
  name: string;
  github_id: string;
  webhook_secret: string;
  created_at: string | null;
  updated_at: string | null;
};

export type GitHubUserData = {
  id: number;
  login: string;
  avatar_url: string;
  email?: string;
  name?: string;
  type: 'User' | 'Organization';
};

export type GitHubOrgData = {
  id: number;
  login: string;
  avatar_url?: string;
  description?: string;
};

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

export type Bounty = {
  id: string;
  repo_name: string;
  issue_number: number;
  issue_name: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  company_name: string | null;
  company_logo: string | null;
  company_github: string | null;
  issue_url: string | null;
};

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  success: boolean;
};

export type AuthSession = {
  user: User;
  userDetails: UserDetails | null;
  access_token: string;
  refresh_token: string;
  expires_at: number;
};

export type Database = {
  public: {
    Tables: {
      prs: {
        Row: PRRecord;
        Insert: Omit<PRRecord, 'id' | 'created_at'>;
        Update: Partial<Omit<PRRecord, 'id' | 'created_at'>>;
      };
    };
  };
};
