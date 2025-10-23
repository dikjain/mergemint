export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Mobile/Tablet Blocker - Only show on screens < 768px */}
      <div className="md:hidden flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-neutral-900 to-neutral-800 p-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 mx-auto bg-neutral-700 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-neutral-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white font-exo-2">
              Desktop Only
            </h1>
            <p className="text-neutral-400 text-base leading-relaxed">
              MergeMint currently only supports laptop and desktop devices.
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-3 text-sm text-neutral-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span>Please access from a computer</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span>Minimum screen width: 768px</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View - Hidden on mobile/tablet */}
      <div className="hidden md:block h-screen w-screen bg-neutral-100 relative">
        {children}
        <div className="absolute mix-blend-overlay  left-[1440px] right-0 top-0 bottom-0 h-full bg-neutral-100">
          <img
            src="images/right-lines.jpg"
            alt="Right lines decoration"
            className="w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
          />
        </div>
      </div>
    </>
  );
}
