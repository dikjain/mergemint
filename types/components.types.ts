import type { User, UserDetails, PRRecord } from './api.types';

export interface CardProps {
  height?: string;
  width?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  padding?: string;
}

export interface SetupCardProps {
  children?: React.ReactNode;
  className?: string;
}

export interface PRComponentProps {
  pr: PRRecord;
}

export interface UserProfileProps {
  user: User | null;
  userDetails: UserDetails | null;
  onClick?: () => void;
  isAuthenticating?: boolean;
}

export interface MilestoneBarProps {
  reward: number;
  milestones: number[];
}

export interface AnimatedPathProps {
  path: string;
  color: string;
  gradientId: string;
  delay: number;
  horizontalDir: 'ltr' | 'rtl';
  verticalDir: 'ttb' | 'btt';
  cardSize: { width: number; height: number };
}

export interface ConnectButtonAnimationsProps {
  cardSize: { width: number; height: number };
  paths: string[];
}

export interface GitHubConnectCardProps {
  userData: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  onLogin: () => void;
}

export interface SecretKeyCardProps {
  secretKey: string;
  isAuthenticated: boolean;
  isLoading?: boolean;
}

export interface WebhookSetupCardProps {
  isAuthenticated?: boolean;
}

export interface WebhookConfig {
  id: string;
  title: string;
  url: string;
  events: string;
  image: string;
  note?: string;
}

export type PixelBlastVariant = 'square' | 'circle' | 'triangle' | 'diamond';

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

export interface MasonryItem {
  id: string;
  img: string;
  url: string;
  height: number;
}

export interface MasonryGridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

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
