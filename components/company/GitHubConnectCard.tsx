import { useState, useEffect, useRef } from 'react';
import SetupCard from '../SetupCard';
import ConnectButtonAnimations from '../ConnectButtonAnimations';

/**
 * Props for GitHubConnectCard component
 */
interface GitHubConnectCardProps {
  /** GitHub user data */
  userData: any;
  /** Login handler function */
  onLogin: () => void;
}

/**
 * GitHubConnectCard Component
 *
 * First step in company setup: Connect GitHub account
 * Displays animated paths converging on the connect button
 */
export default function GitHubConnectCard({
  userData,
  onLogin,
}: GitHubConnectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });
  const [buttonCenter, setButtonCenter] = useState({ x: 0, y: 0 });
  const [buttonPos, setButtonPos] = useState({ width: 0, height: 0 });
  const [paths, setPaths] = useState<string[]>(['', '', '', '', '', '']);

  /**
   * Update button and card positions for animation calculations
   */
  useEffect(() => {
    const updatePositions = () => {
      if (!cardRef.current || !buttonRef.current) return;

      const cardRect = cardRef.current.getBoundingClientRect();
      const btnRect = buttonRef.current.getBoundingClientRect();

      setCardSize({ width: cardRect.width, height: cardRect.height });
      setButtonCenter({
        x: btnRect.left - cardRect.left + btnRect.width / 2,
        y: btnRect.top - cardRect.top + btnRect.height / 2,
      });
      setButtonPos({
        width: cardRect.width,
        height: cardRect.height,
      });
    };

    const timer = setTimeout(updatePositions, 100);
    window.addEventListener('resize', updatePositions);

    let resizeObserver: ResizeObserver | null = null;
    if (cardRef.current) {
      resizeObserver = new ResizeObserver(updatePositions);
      resizeObserver.observe(cardRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePositions);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [userData]);

  /**
   * Calculate SVG paths based on card and button positions
   */
  useEffect(() => {
    if (!cardSize.width || !cardSize.height || !buttonCenter.x) return;

    const { width: w, height: h } = cardSize;
    const { x: cx, y: cy } = buttonCenter;
    const offset = buttonPos.width / 16;
    const midY = (h + cy) / 2;

    setPaths([
      `M${w / 4},${h} L${w / 4},${midY} L${cx - offset},${midY} L${cx - offset},${cy}`,
      `M${(7 * w) / 8},${h} L${(7 * w) / 8},${cy + buttonPos.height / 32} L${cx},${cy + buttonPos.height / 32}`,
      `M${w / 8},${h} L${w / 8},${cy + buttonPos.height / 32} L${cx},${cy + buttonPos.height / 32}`,
      `M${(3 * w) / 4},${h} L${(3 * w) / 4},${midY} L${cx + offset},${midY} L${cx + offset},${cy}`,
      `M${w},${h / 2} L${(4 * w) / 6},${h / 2} L${(4 * w) / 6},${cy - cy / 6} L${cx + offset},${cy - cy / 6} L${cx + offset},${cy}`,
      `M0,${h / 2} L${(2 * w) / 6},${h / 2} L${(2 * w) / 6},${cy - cy / 6} L${cx - offset},${cy - cy / 6} L${cx - offset},${cy}`,
    ]);
  }, [cardSize, buttonCenter, buttonPos]);

  return (
    <SetupCard
      ref={cardRef}
      className="w-1/2 overflow-hidden flex flex-col items-center relative"
    >
      <h1 className="text-xl self-start font-semibold text-neutral-700 font-nunito mb-1">
        1. Connect GitHub
      </h1>
      <h1 className="text-sm font-medium text-neutral-500 font-nunito">
        Connect your GitHub account to get started. We ensure only owner/admin
        can add repositories to Mergemint. We take admin/owner repo's GitHub to
        assess that the repository he/she adds is owned/admin by him/her. We
        only read for access nothing else.
      </h1>

      <button
        ref={buttonRef}
        style={{
          boxShadow:
            'inset 0px 1.5px 4px 0px rgba(255, 255, 255, 0.6), 0px 2px 8px 0px rgba(0, 0, 0, 0.3)',
        }}
        className={`w-48 z-[10] ${userData ? 'cursor-default' : 'cursor-pointer'} px-4 py-2 shadow-lg my-auto bg-black text-white rounded-lg font-exo-2 font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2`}
        onClick={onLogin}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        {userData ? userData.githubUsername : 'Connect GitHub'}
      </button>

      <ConnectButtonAnimations cardSize={cardSize} paths={paths} />
    </SetupCard>
  );
}
