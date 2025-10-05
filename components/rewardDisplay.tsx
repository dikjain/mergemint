import CircularGallery from "./CircularGallery";


export default function RewardDisplay({ reward }: { reward: number }) {
  const milestones = [0, 16.67, 33.33, 50, 66.67, 83.33, 100]
  
  console.log(reward);
  console.log(milestones);
  
  return (
    <div style={{ boxShadow: 'inset 0 0 6px 0 rgba(0, 0, 0, 0.1)' }} className='flex flex-col w-full relative bg-neutral-50 rounded-md h-full overflow-hidden'>
      
      
      {/* Progress Bar with Milestones */}
      <div className='absolute bottom-[15px] left-1/2 bg-neutral-300 h-1.5 rounded-full -translate-x-1/2 w-[75%] z-20'>
        <div className='absolute top-0 left-0 bg-red-500 h-full rounded-full' style={{ width: `${Math.min(reward, 100)}%` }}></div>
      </div>

      <div className='h-[500px] w-full scale-110 -translate-y-[15px]'>
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