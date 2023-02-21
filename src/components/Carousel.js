// import { useEffect, useState } from "react";
// import { ChevronLeft,ChevronRight} from "react-feather";

// export default function Carousel({children:products,autoSlide=false,autoSlideInterval=3000}){
//       const [curr, setCurr]= useState(0);

//       const prev =()=>setCurr((curr)=>(curr===0?products.length-1:curr-1))

//       const next =()=>setCurr((curr)=>(curr===products.length-1?0:curr+1))

//       useEffect(()=>{
//             if(!autoSlide)return
//             const slideInterval = setInterval(next,autoSlideInterval)
//             return () =>clearInterval(slideInterval)
//       },[])
//       return(
//             <div className="overflow-hidden relative" style={{overflow:'hidden',position:'relative'}}>
//                   <div className="absolute inset-0 flex items-center justify-between p-4" style={{position:'absolute',display:'flex',alignItem:'center'}}>
//                         <button onClick={prev} className="p-1 rounded-full shadow bg-white-80 text-gray-800 hover:bg-white">
//                               <ChevronLeft size={40}/>
//                         </button>
//                         <button onClick={next} className="p-1 rounded-full shadow bg-white-80 text-gray-800 hover:bg-white">
//                               <ChevronRight size={40}/>
//                         </button>
//                   </div>
//                   <div className=" ease-out " style={{transform:`translateX(-${curr*100}%)`,display:'flex',transition:'transform',transitionTimingFunction: 'ease-out'}}>
//                         {products}
//                   </div>
                  
//             </div>

//             <div className="overflow-hidden relative">
//       <div
//         className="flex transition-transform ease-out duration-500"
//         style={{ transform: `translateX(-${curr * 200}%)` }}
//       >
//         {products}
//       </div>
//       <div className="absolute inset-0 flex items-center justify-between p-4">
//         <button
//           onClick={prev}
//           className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
//         >
//           <ChevronLeft size={40} />
//         </button>
//         <button
//           onClick={next}
//           className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
//         >
//         <ChevronRight size={40} />
//         </button>
//       </div>

//       <div className="absolute bottom-4 right-0 left-0">
//         <div className="flex items-center justify-center gap-2">
//           {products.map((_, i) => (
//             <div
//               className={`
//               transition-all w-3 h-3 bg-white rounded-full
//               ${curr === i ? "p-2" : "bg-opacity-50"}
//             `}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//       )
// }