import CircularGallery from "./CircularGallery";


export default function RewardDisplay({ reward }: { reward: number }) {
  const milestones = [0, 16.67, 33.33, 50, 66.67, 83.33, 100];
  
  
  return (
    <div style={{ boxShadow: 'inset 0 0 6px 0 rgba(0, 0, 0, 0.1)' }} className='flex flex-col w-full relative bg-neutral-50 rounded-md h-full overflow-hidden'>
      
      {/* Progress Bar with Milestones */}
      <div className='absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] z-20'>
        <div className='relative h-2 bg-gray-200 rounded-full '>
          {/* Filled progress */}
          <div 
            className='absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500'
            style={{ width: `${Math.min(reward, 100)}%` }}
          />
          
          {/* Milestone circles */}
          {milestones.map((position, index) => (
            <div
              key={index}
              className='absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300'
              style={{ left: `${position}%` }}
            >
              <div 
                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  reward >= position 
                    ? 'bg-green-600 border-green-700 shadow-lg' 
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className='h-[500px] w-full scale-110 -translate-y-[10px]'>
        <CircularGallery 
          bend={-2} 
          textColor="#000000" 
          borderRadius={0.05} 
          scrollEase={0.02}
          autoplay={true}
          autoplaySpeed={4}
        />
      </div>
    </div>
  );
}   