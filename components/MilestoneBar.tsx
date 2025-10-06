import { useState } from 'react';
import { useMarkStore, defaultItems } from '@/app/store/store';

interface MilestoneBarProps {
  reward: number;
  milestones: number[];
}

export default function MilestoneBar({
  reward,
  milestones,
}: MilestoneBarProps) {
  const { setCurrentMark, setCurrentItems } = useMarkStore();
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);

  const handleMilestoneHover = (milestone: number) => {
    setCurrentMark(milestone);
    const milestoneIndex = milestones.indexOf(milestone);
    setCurrentItems(defaultItems[milestoneIndex]);
    setHoveredMilestone(milestone);
  };

  const handleMilestoneLeave = () => {
    setCurrentItems(null);
    setHoveredMilestone(null);
  };

  return (
    <div
      style={{ boxShadow: ' 0 0 2px 0 rgba(0, 0, 0, 0.2)' }}
      className="absolute border border-black/5 bottom-[8%] left-1/2  bg-neutral-300 h-1.5 rounded-full -translate-x-1/2 w-[75%] z-20"
    >
      <div
        className="absolute top-0 left-0 bg-neutral-500 h-full rounded-full"
        style={{ width: `${Math.min((reward / 200) * 100, 100)}%` }}
      ></div>

      {milestones.map((milestone, index) => {
        const progressPercentage = (milestone / 200) * 100; // Convert milestone to percentage of total (200)
        const isUnlocked = reward >= milestone;

        return (
          <div key={milestone} className="relative">
            <div
              onMouseEnter={() => handleMilestoneHover(milestone)}
              onMouseLeave={handleMilestoneLeave}
              className={`absolute translate-y-1/6   cursor-none w-3 h-3 rounded-full border-2 hover:scale-110 transition-all duration-300 border-white  ${
                isUnlocked
                  ? 'bg-neutral-500 hover:bg-neutral-600 '
                  : 'bg-neutral-300 hover:bg-neutral-400'
              }`}
              style={{
                left: `${progressPercentage}%`,
                transform: 'translateX(-50%) translateY(-50%)',
              }}
            />

            <div
              className={`absolute text-xs font-semibold font-bitcount-single text-neutral-500 transition-opacity duration-200 ${
                hoveredMilestone === milestone ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                left: `${progressPercentage}%`,
                top: '8px',
                transform: 'translateX(-50%)',
              }}
            >
              {milestone}
            </div>
          </div>
        );
      })}
    </div>
  );
}
