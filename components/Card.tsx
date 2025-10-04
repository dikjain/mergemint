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
}


export default function Card({ 
  height = 'h-full', 
  width = 'w-full', 
  children,
  className = ''
}: CardProps) {


  return (
    <div 
      className={`${width} ${height} bg-white rounded-lg border p-1 border-neutral-200 ${className}`}
    >
      {/* Inner container with neutral background */}
      <div className='w-full h-full bg-neutral-50 rounded-md border border-neutral-200'>
        {children}
      </div>
    </div>
  );
}

