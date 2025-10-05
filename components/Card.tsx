'use client';

interface CardProps {
  /**
   * Height of the card (e.g., 'full', '1/2', '2/5', '300px', 'auto')
   * Accepts Tailwind height classes or custom values
   */
  height?: string;
  
  /**
   * Width of the card (e.g., 'full', '1/2', '300px', 'auto')
   * Accepts Tailwind width classes or custom values
   */
  width?: string;
  
  /**
   * Optional children to render inside the card
   */
  children?: React.ReactNode;
  
  /**
   * Optional additional CSS classes for the outer container
   */
  className?: string;

  /**
   * Optional inline styles for the outer container
   */
  style?: React.CSSProperties;

  /**
   * Optional padding for the card
   */
  padding?: string;
}


export default function Card({ 
  height = 'h-full', 
  width = 'w-full', 
  children,
  className = '',
  padding = 'p-1',
  style
}: CardProps) {


  return (
    <div 
      className={`${width} ${height} bg-white rounded-lg border ${padding} border-neutral-200 ${className}`}
      style={style}
    >
      {/* Inner container with neutral background */}
      <div className='w-full h-full bg-neutral-50 rounded-md border border-neutral-200'>
        {children}
      </div>
    </div>
  );
}

