/**
 * Dashboard layout component
 * Provides the main layout structure for dashboard pages with decorative background
 */
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen bg-neutral-100 relative">
      {children}
      {/* Decorative right side image that extends to screen end and blends with background */}
      <div className='absolute mix-blend-overlay  left-[1440px] right-0 top-0 bottom-0 h-full bg-neutral-100'>
        <img 
          src="images/right-lines.jpg" 
          alt="Right lines decoration" 
          className="w-full h-full object-cover pointer-events-none select-none" 
          draggable={false}
        />
      </div>
    </div>
  );
}
