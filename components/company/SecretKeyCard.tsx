import { useState } from 'react';
import SetupCard from '../SetupCard';
import PixelBlast from '../PixelBlast';
import { FollowerPointerCard } from '../ui/following-pointer';
import {
  LockClosedIcon,
  Square2StackIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

/**
 * Props for SecretKeyCard component
 */
interface SecretKeyCardProps {
  /** Secret key to display and copy */
  secretKey: string;
  /** Whether user is authenticated */
  isAuthenticated: boolean;
}

/**
 * SecretKeyCard Component
 *
 * Second step in company setup: Copy the private secret key
 * Features an animated reveal effect on hover
 */
export default function SecretKeyCard({
  secretKey,
  isAuthenticated,
}: SecretKeyCardProps) {
  const [secretCardHovered, setSecretCardHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  /**
   * Copy secret key to clipboard
   */
  const handleCopySecret = async () => {
    if (!isAuthenticated) return;

    try {
      await navigator.clipboard.writeText(secretKey);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <SetupCard className="w-1/2 overflow-hidden flex flex-col items-center relative">
      <h1 className="text-xl self-start font-semibold text-neutral-700 font-nunito mb-1">
        2. Copy Private key
      </h1>
      <h1 className="text-sm font-medium text-neutral-500 font-nunito">
        We generate a unique secret key for your verified repositories to
        securely add issues to Mergemint. This key can only be generated once
        and cannot be regenerated, so please keep it safe and secure. Only
        repositories with this key will be able to submit issues to your
        dashboard.
      </h1>

      {/* Animated background effect */}
      <div className="absolute top-1/2 inset-0">
        <PixelBlast
          variant="circle"
          pixelSize={3}
          color="#e5e5e5"
          patternScale={3}
          patternDensity={1.8}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>

      <FollowerPointerCard
        title={
          isAuthenticated
            ? copied
              ? 'Copied!'
              : 'Click to Copy'
            : 'Login to unlock'
        }
        className="my-auto"
      >
        <div
          onMouseEnter={() => setSecretCardHovered(true)}
          onMouseLeave={() => setSecretCardHovered(false)}
          onClick={handleCopySecret}
          className="w-64 group relative overflow-hidden flex h-8 bg-neutral-200 rounded-md border border-neutral-200"
        >
          {isAuthenticated ? (
            <div className="absolute left-1/2 top-1/2 selection:bg-transparent cursor-pointer -translate-y-1/2 -translate-x-1/2 z-[1] font-nunito text-sm font-medium text-neutral-500 flex items-center gap-2">
              {copied ? (
                <CheckIcon className="w-4 h-4 text-neutral-500" />
              ) : (
                <Square2StackIcon className="w-4 h-4" />
              )}
              {copied ? 'Copied!' : secretKey}
            </div>
          ) : (
            <LockClosedIcon className="w-4 h-4 text-neutral-400 z-[1] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
          )}

          {/* Left curtain */}
          <motion.div
            className="flex-1 relative z-10 border-r border-neutral-200 bg-neutral-100 h-full"
            animate={{
              x: secretCardHovered
                ? isAuthenticated
                  ? '-100%'
                  : '-12.5%'
                : '0%',
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
          />

          {/* Right curtain */}
          <motion.div
            className="flex-1 relative z-10 bg-neutral-100 h-full"
            animate={{
              x: secretCardHovered
                ? isAuthenticated
                  ? '100%'
                  : '12.5%'
                : '0%',
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
          />

          {/* Inner shadow overlay */}
          <div
            style={{ boxShadow: 'inset 0px 0px 3px 0px rgba(0, 0, 0, 0.2)' }}
            className="inset-0 absolute rounded-sm pointer-events-none z-20"
          />
        </div>
      </FollowerPointerCard>
    </SetupCard>
  );
}
