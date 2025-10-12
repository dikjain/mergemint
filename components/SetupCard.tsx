import React from 'react';

interface SetupCardProps {
  children?: React.ReactNode;
  className?: string;
}

const SetupCard = React.forwardRef<HTMLDivElement, SetupCardProps>(
  ({ children, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-white border border-neutral-300 hover:border-neutral-400 transition-all duration-300 rounded-xl p-4  ${className}`}
      >
        {children}
      </div>
    );
  }
);

SetupCard.displayName = 'SetupCard';

export default SetupCard;
