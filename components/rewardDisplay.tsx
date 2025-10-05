import CircularGallery from "./CircularGallery";
import { useMarkStore, defaultItems } from "@/app/store/store";
import PixelBlast from './PixelBlast';
import Card from './Card';


export default function RewardDisplay({ reward }: { reward: number }) {
  const milestones = [0, 16.67, 33.33, 50, 66.67, 83.33, 100]
  const { setCurrentMark, setCurrentItems, currentItems } = useMarkStore()

  const handleMilestoneHover = (milestone: number) => {
    setCurrentMark(milestone)
    
    const milestoneIndex = milestones.indexOf(milestone)
    const itemForMilestone = defaultItems.slice(0, milestoneIndex + 1) 
    setCurrentItems(itemForMilestone.length > 0 ? itemForMilestone : null)
  }

  return (
    <div style={{ boxShadow: 'inset 0 0 10px 0 rgba(0, 0, 0, 0.1)' }} className='flex flex-col w-full relative bg-neutral-50 rounded-md h-full overflow-hidden'>
      
      
      {/* Progress Bar with Milestones */}
      <div style={{ boxShadow: ' 0 0 2px 0 rgba(0, 0, 0, 0.2)' }} className='absolute border border-black/5 bottom-[15px] left-1/2  bg-neutral-300 h-1.5 rounded-full -translate-x-1/2 w-[75%] z-20'>
        <div className='absolute top-0 left-0 bg-neutral-500 h-full rounded-full' style={{ width: `${Math.min(reward, 100)}%` }}></div>  
        {milestones.map((milestone, index) => (
          <div
            onMouseEnter={() => handleMilestoneHover(milestone)}
            onMouseLeave={() => setCurrentItems(null)}
            key={index}
            className={`absolute  translate-y-1/6 w-3 h-3 rounded-full border-2 border-white ${
              reward >= milestone ? 'bg-neutral-500' : 'bg-neutral-300'
            }`}
            style={{ left: `${milestone}%`, transform: 'translateX(-50%) translateY(-50%)' }}
          />
        ))}
      </div>

      {/* <div className='h-[500px] w-full scale-110 -translate-y-[15px]'>
        <CircularGallery 
          bend={-2} 
          textColor="#000000" 
          borderRadius={0.05} 
          scrollEase={0.02}
          autoplay={true}
          autoplaySpeed={4}
        />
      </div> */}

  
  
  
  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
    <PixelBlast
      variant="circle"
      pixelSize={4}
      color="#e5e5e5"
      patternScale={3}
      patternDensity={1.5}
      pixelSizeJitter={0.5}
      enableRipples
      rippleSpeed={0.4}
      rippleThickness={0.12}
      rippleIntensityScale={1.5}
      speed={0.6}
      edgeFade={0.25}
      transparent
    />
    
    {defaultItems.map((item, index) => (
      <Card
        key={item.layoutId}
        width="w-20"
        height="h-20"
        padding="p-0.5"
        className="absolute z-10 shadow-lg"
        style={{  
          left: `${item.x}%`,
          top: `${item.y}%`,
          transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`
        }}
      >
          <img
            src={item.image}
            alt={item.text}
            className="w-full h-full object-cover rounded-md"
          />
      </Card>
    ))}
  </div>


    </div>
  );
}   