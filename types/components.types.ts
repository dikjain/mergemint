/**
 * Component Props Types
 *
 * This file contains all TypeScript interfaces for component props
 * across the application, organized by component category.
 */

import type { User, UserDetails, PRRecord } from './api.types';

// ===========================
// UI Component Props
// ===========================

/**
 * Card component props
 * Generic card wrapper with customizable dimensions
 */
export interface CardProps {
  /** Height of the card (e.g., 'full', '1/2', '2/5', '300px', 'auto') */
  height?: string;
  /** Width of the card (e.g., 'full', '1/2', '300px', 'auto') */
  width?: string;
  /** Optional children to render inside the card */
  children?: React.ReactNode;
  /** Optional additional CSS classes for the outer container */
  className?: string;
  /** Optional inline styles for the outer container */
  style?: React.CSSProperties;
  /** Optional padding for the card */
  padding?: string;
}

/**
 * SetupCard component props
 * Card used in setup/onboarding flows
 */
export interface SetupCardProps {
  children?: React.ReactNode;
  className?: string;
}

// ===========================
// PR Component Props
// ===========================

/**
 * PRComponent props
 * Displays a single pull request item
 * Supports both real database records and mock data
 */
export interface PRComponentProps {
  pr: PRRecord;
}

// ===========================
// User Profile Props
// ===========================

/**
 * UserProfile component props
 * Displays user avatar and authentication status
 */
export interface UserProfileProps {
  user: User | null;
  userDetails: UserDetails | null;
  onClick: () => void;
  isAuthenticating: boolean;
}

// ===========================
// Milestone & Progress Props
// ===========================

/**
 * MilestoneBar component props
 * Visual progress bar with milestone markers
 */
export interface MilestoneBarProps {
  reward: number;
  milestones: number[];
}

// ===========================
// Animation Component Props
// ===========================

/**
 * AnimatedPath component props
 * SVG path animation configuration
 */
export interface AnimatedPathProps {
  path: string;
  color: string;
  gradientId: string;
  delay: number;
  horizontalDir: 'ltr' | 'rtl';
  verticalDir: 'ttb' | 'btt';
  cardSize: { width: number; height: number };
}

/**
 * ConnectButtonAnimations component props
 * Multiple animated paths converging on a button
 */
export interface ConnectButtonAnimationsProps {
  cardSize: { width: number; height: number };
  paths: string[];
}

// ===========================
// Company Setup Component Props
// ===========================

/**
 * GitHubConnectCard component props
 * First step in company setup flow
 */
export interface GitHubConnectCardProps {
  /** GitHub user data */
  userData: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  /** Login handler function */
  onLogin: () => void;
}

/**
 * SecretKeyCard component props
 * Second step - displays and copies secret key
 */
export interface SecretKeyCardProps {
  /** Secret key to display and copy */
  secretKey: string;
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  /** Whether company data is loading */
  isLoading?: boolean;
}

/**
 * WebhookSetupCard component props
 * Third step - webhook configuration instructions
 */
export interface WebhookSetupCardProps {
  isAuthenticated?: boolean;
}

/**
 * Webhook configuration object
 * Used within WebhookSetupCard
 */
export interface WebhookConfig {
  id: string;
  title: string;
  url: string;
  events: string;
  image: string;
  note?: string;
}

// ===========================
// Visual Effect Component Props
// ===========================

/**
 * PixelBlast variant types
 * Different pixel shapes for the effect
 */
export type PixelBlastVariant = 'square' | 'circle' | 'triangle' | 'diamond';

/**
 * PixelBlast component props
 * Animated pixel background effect with various customization options
 */
export interface PixelBlastProps {
  variant?: PixelBlastVariant;
  pixelSize?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  antialias?: boolean;
  patternScale?: number;
  patternDensity?: number;
  liquid?: boolean;
  liquidStrength?: number;
  liquidRadius?: number;
  pixelSizeJitter?: number;
  enableRipples?: boolean;
  rippleIntensityScale?: number;
  rippleThickness?: number;
  rippleSpeed?: number;
  liquidWobbleSpeed?: number;
  autoPauseOffscreen?: boolean;
  speed?: number;
  transparent?: boolean;
  edgeFade?: number;
  noiseAmount?: number;
}

// ===========================
// Masonry Layout Props
// ===========================

/**
 * Masonry grid item
 * Individual item in the masonry layout
 */
export interface MasonryItem {
  id: string;
  img: string;
  url: string;
  height: number;
}

/**
 * Positioned grid item
 * Masonry item with calculated position and dimensions
 */
export interface MasonryGridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Masonry component props
 * Animated masonry grid layout with various effects
 */
export interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}
