// "use client";

// import { useEffect, useRef } from "react";
// import Link from "next/link";

// /* ROW 1 DATA */
// const row1 = [
//   { name: "Delivery Person", jobs: "4,110 openings" },
//   { name: "Telecalling / BPO", jobs: "4,095 openings" },
//   { name: "Accounts / Finance", jobs: "3,677 openings" },
//   { name: "Field Sales", jobs: "3,513 openings" },
//   { name: "Business Development", jobs: "1,997 openings" },
//   { name: "Chemical Engineer", jobs: "1 openings" },
// ];

// /* ROW 2 DATA */
// const row2 = [
//   { name: "Nurse / Patient Care", jobs: "121 openings" },
//   { name: "Electrician / Wireman", jobs: "120 openings" },
//   { name: "Security Guard", jobs: "113 openings" },
//   { name: "Labour / Factory Worker", jobs: "153 openings" },
//   { name: "Maid / Baby Care", jobs: "141 openings" },
//   { name: "Software Developer", jobs: "158 openings" },
// ];

// /* AUTO SCROLL HOOK */
// function useAutoScroll(ref) {
//   const interval = useRef(null);

//   const start = () => {
//     interval.current = setInterval(() => {
//       if (!ref.current) return;

//       ref.current.scrollLeft += 1;

//       if (
//         ref.current.scrollLeft >=
//         ref.current.scrollWidth / 2
//       ) {
//         ref.current.scrollLeft = 0;
//       }
//     }, 20);
//   };

//   const stop = () => {
//     clearInterval(interval.current);
//   };

//   useEffect(() => {
//     start();
//     return () => stop();
//   }, []);

//   return { start, stop };
// }

// export default function TrendingRolesSlider() {
//   const row1Ref = useRef(null);
//   const row2Ref = useRef(null);

//   const row1Scroll = useAutoScroll(row1Ref);
//   const row2Scroll = useAutoScroll(row2Ref);

//   return (
//     <section className="bg-white py-14 overflow-hidden">

//       <div className="max-w-7xl mx-auto px-4">

//         {/* TITLE */}
//         <h2 className="text-2xl md:text-5xl font-bold text-center  text-orange-400 mb-10">
//           Trending job roles on Apna
//         </h2>

//         {/* ===== ROW 1 ===== */}
//         <div
//           ref={row1Ref}
//           onMouseEnter={row1Scroll.stop}
//           onMouseLeave={row1Scroll.start}
//           className="flex gap-4 overflow-x-scroll  scrollbar-hide mb-5 text-black text-4xl"
//         >
//           {[...row1, ...row1].map((item, i) => (
//             <RoleCard key={i} item={item} />
//           ))}
//         </div>

//         {/* ===== ROW 2 ===== */}
//         <div
//           ref={row2Ref}
//           onMouseEnter={row2Scroll.stop}
//           onMouseLeave={row2Scroll.start}
//           className="flex gap-4 overflow-x-scroll scrollbar-hide text-black text-4xl"
//         >
//           {[...row2, ...row2].map((item, i) => (
//             <RoleCard key={i} item={item} />
//           ))}
//         </div>

//         {/* BUTTON */}
//         <div className="text-center mt-10">
//           <Link
//             href="/jobs"
//             className="inline-flex items-center gap-2
//             border border-green-600
//             text-green-600
//             px-8 py-3 rounded-lg
//             hover:bg-green-600 hover:text-white
//             transition"
//           >
//             View all →
//           </Link>
//         </div>

//       </div>

//     </section>
//   );
// }

// /* CARD COMPONENT */
// function RoleCard({ item }) {
//   return (
//     <Link
//       href="/jobs"
//       className="min-w-[260px]
//       bg-white border rounded-xl
//       px-5 py-4
//       flex items-center gap-4
//       hover:border-orange-500
//       hover:shadow-md
//       transition"
//     >

//       {/* ICON */}
//       <div className="w-10 h-10 bg-gray-100 rounded-full
//       flex items-center justify-center">
//         📄
//       </div>

//       {/* TEXT */}
//       <div className="flex-1">

//         <h3 className="font-medium text-sm truncate">
//           {item.name}
//         </h3>

//         <p className="text-xs text-gray-500">
//           {item.jobs}
//         </p>

//       </div>

//       <span className="text-gray-400">›</span>

//     </Link>
//   );
// }
// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { TrendingUp, Zap, Sparkles, ArrowRight } from "lucide-react";

// /* ROW 1 DATA */
// const row1 = [
//   {
//     name: "Delivery Person",
//     jobs: "4,110 openings",
//     icon: "🚚",
//     category: "Logistics",
//     growth: "42%",
//   },
//   {
//     name: "Telecalling / BPO",
//     jobs: "4,095 openings",
//     icon: "📞",
//     category: "Customer Service",
//     growth: "38%",
//   },
//   {
//     name: "Accounts / Finance",
//     jobs: "3,677 openings",
//     icon: "💰",
//     category: "Finance",
//     growth: "35%",
//   },
//   {
//     name: "Field Sales",
//     jobs: "3,513 openings",
//     icon: "📊",
//     category: "Sales",
//     growth: "45%",
//   },
//   {
//     name: "Business Development",
//     jobs: "1,997 openings",
//     icon: "📈",
//     category: "Business",
//     growth: "52%",
//   },
//   {
//     name: "Chemical Engineer",
//     jobs: "1,842 openings",
//     icon: "⚗️",
//     category: "Engineering",
//     growth: "28%",
//   },
//   {
//     name: "Data Analyst",
//     jobs: "2,150 openings",
//     icon: "📊",
//     category: "Analytics",
//     growth: "55%",
//   },
//   {
//     name: "Digital Marketer",
//     jobs: "1,850 openings",
//     icon: "📱",
//     category: "Marketing",
//     growth: "48%",
//   },
// ];

// /* ROW 2 DATA */
// const row2 = [
//   {
//     name: "Nurse / Patient Care",
//     jobs: "1,221 openings",
//     icon: "👩‍⚕️",
//     category: "Healthcare",
//     growth: "48%",
//   },
//   {
//     name: "Electrician / Wireman",
//     jobs: "1,120 openings",
//     icon: "⚡",
//     category: "Technical",
//     growth: "31%",
//   },
//   {
//     name: "Security Guard",
//     jobs: "1,113 openings",
//     icon: "🛡️",
//     category: "Security",
//     growth: "29%",
//   },
//   {
//     name: "Labour / Factory Worker",
//     jobs: "1,153 openings",
//     icon: "🏭",
//     category: "Manufacturing",
//     growth: "26%",
//   },
//   {
//     name: "Maid / Baby Care",
//     jobs: "1,141 openings",
//     icon: "👶",
//     category: "Domestic",
//     growth: "34%",
//   },
//   {
//     name: "Software Developer",
//     jobs: "1,158 openings",
//     icon: "💻",
//     category: "Technology",
//     growth: "67%",
//   },
//   {
//     name: "Graphic Designer",
//     jobs: "950 openings",
//     icon: "🎨",
//     category: "Design",
//     growth: "42%",
//   },
//   {
//     name: "Content Writer",
//     jobs: "875 openings",
//     icon: "✍️",
//     category: "Writing",
//     growth: "39%",
//   },
// ];

// /* ENHANCED AUTO SCROLL HOOK */
// function useInfiniteScroll(ref, speed = 1.5) {
//   const animationRef = useRef(null);
//   const [isPaused, setIsPaused] = useState(false);
//   const [scrollPosition, setScrollPosition] = useState(0);

//   const animateScroll = () => {
//     if (!ref.current || isPaused) return;

//     ref.current.scrollLeft += speed;

//     // Seamless infinite scroll logic
//     const maxScroll = ref.current.scrollWidth / 2;

//     if (ref.current.scrollLeft >= maxScroll) {
//       ref.current.scrollLeft = 0;
//     }

//     setScrollPosition(ref.current.scrollLeft);
//     animationRef.current = requestAnimationFrame(animateScroll);
//   };

//   const start = () => {
//     if (animationRef.current) {
//       cancelAnimationFrame(animationRef.current);
//     }
//     animationRef.current = requestAnimationFrame(animateScroll);
//   };

//   const stop = () => {
//     if (animationRef.current) {
//       cancelAnimationFrame(animationRef.current);
//       animationRef.current = null;
//     }
//   };

//   const pause = () => {
//     setIsPaused(true);
//   };

//   const resume = () => {
//     setIsPaused(false);
//   };

//   useEffect(() => {
//     // Duplicate content for seamless scroll
//     if (ref.current) {
//       const container = ref.current;
//       const contentWidth = container.scrollWidth / 2;
//       container.style.scrollBehavior = "auto";
//     }

//     start();

//     return () => stop();
//   }, [isPaused]);

//   return { start, stop, pause, resume, isPaused, scrollPosition };
// }

// export default function TrendingRolesSlider() {
//   const row1Ref = useRef(null);
//   const row2Ref = useRef(null);
//   const [activeRole, setActiveRole] = useState(null);
//   const [isHoveringRow1, setIsHoveringRow1] = useState(false);
//   const [isHoveringRow2, setIsHoveringRow2] = useState(false);

//   const row1Scroll = useInfiniteScroll(row1Ref, 1.8);
//   const row2Scroll = useInfiniteScroll(row2Ref, 1.8);

//   // Reset scroll position on mount for better infinite scroll
//   useEffect(() => {
//     const resetScroll = () => {
//       if (row1Ref.current) {
//         row1Ref.current.scrollLeft = 0;
//       }
//       if (row2Ref.current) {
//         row2Ref.current.scrollLeft = 0;
//       }
//     };

//     // Small delay to ensure DOM is ready
//     setTimeout(resetScroll, 100);
//   }, []);

//   return (
//     <section className="bg-gradient-to-b from-white to-orange-50/20 py-16 md:py-24 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 md:px-8">
//         {/* Header */}
//         <div className="text-center mb-12 md:mb-16 relative">
//           <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-orange-100 rounded-full">
//             <Sparkles className="w-5 h-5 text-orange-600" />
//             <span className="text-sm font-semibold text-orange-700 uppercase tracking-wider">
//               Auto-Scrolling Live
//             </span>
//             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//           </div>

//           <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//             Trending <span className="text-orange-600">Job Roles</span> on Apna
//           </h2>

//           <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
//             Discover the most in-demand roles across industries with thousands
//             of opportunities waiting for you
//           </p>
//         </div>

//         {/* Stats Bar */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
//           <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
//             <div className="text-2xl font-bold text-gray-900">50K+</div>
//             <div className="text-gray-600">Total Openings</div>
//           </div>
//           <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
//             <div className="text-2xl font-bold text-gray-900">24%</div>
//             <div className="text-gray-600">Growth Rate</div>
//           </div>
//           <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
//             <div className="text-2xl font-bold text-gray-900">150+</div>
//             <div className="text-gray-600">Cities</div>
//           </div>
//           <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
//             <div className="text-2xl font-bold text-gray-900">₹5-25L</div>
//             <div className="text-gray-600">Avg. Salary Range</div>
//           </div>
//         </div>

//         {/* Auto Scroll Instructions */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
//             <span className="text-sm text-blue-600 font-medium">
//               ✨ Auto-scrolling • Hover to pause • Scroll manually
//             </span>
//           </div>
//         </div>

//         {/* ===== ROW 1 ===== */}
//         <div className="relative mb-8 group">
//           <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none"></div>
//           <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none"></div>

//           {/* Scroll Indicator */}
//           <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10">
//             <div className="flex items-center gap-1">
//               <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
//                   style={{
//                     transform: `translateX(${-row1Scroll.scrollPosition % 100}%)`,
//                     width: "50%",
//                   }}
//                 ></div>
//               </div>
//             </div>
//           </div>

//           <div
//             ref={row1Ref}
//             onMouseEnter={() => {
//               row1Scroll.pause();
//               setIsHoveringRow1(true);
//             }}
//             onMouseLeave={() => {
//               if (!isHoveringRow2) {
//                 row1Scroll.resume();
//               }
//               setIsHoveringRow1(false);
//             }}
//             className="flex gap-6 overflow-x-hidden scrollbar-hide py-6"
//           >
//             {/* Duplicate content for seamless scroll */}
//             {[...row1, ...row1, ...row1].map((item, i) => (
//               <RoleCard
//                 key={i}
//                 item={item}
//                 index={i}
//                 isActive={activeRole === item.name}
//                 onHover={setActiveRole}
//                 row="top"
//                 isScrolling={!row1Scroll.isPaused}
//               />
//             ))}
//           </div>
//         </div>

//         {/* ===== ROW 2 ===== */}
//         <div className="relative mb-12 group">
//           <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none"></div>
//           <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none"></div>

//           {/* Scroll Indicator */}
//           <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10">
//             <div className="flex items-center gap-1">
//               <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
//                   style={{
//                     transform: `translateX(${row2Scroll.scrollPosition % 100}%)`,
//                     width: "50%",
//                   }}
//                 ></div>
//               </div>
//             </div>
//           </div>

//           <div
//             ref={row2Ref}
//             onMouseEnter={() => {
//               row2Scroll.pause();
//               setIsHoveringRow2(true);
//             }}
//             onMouseLeave={() => {
//               if (!isHoveringRow1) {
//                 row2Scroll.resume();
//               }
//               setIsHoveringRow2(false);
//             }}
//             className="flex gap-6 overflow-x-hidden scrollbar-hide py-6"
//           >
//             {/* Duplicate content for seamless scroll */}
//             {[...row2, ...row2, ...row2].map((item, i) => (
//               <RoleCard
//                 key={i}
//                 item={item}
//                 index={i}
//                 isActive={activeRole === item.name}
//                 onHover={setActiveRole}
//                 row="bottom"
//                 isScrolling={!row2Scroll.isPaused}
//               />
//             ))}
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="text-center">
//           <Link
//             href="/jobs"
//             className="group inline-flex items-center gap-3
//             bg-gradient-to-r from-orange-500 to-orange-600
//             text-white font-semibold text-lg
//             px-8 py-4 rounded-xl
//             hover:shadow-xl hover:shadow-orange-200 hover:scale-105
//             transition-all duration-300"
//           >
//             <span>Explore All Trending Roles</span>
//             <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
//           </Link>

//           <p className="mt-6 text-gray-600">
//             Updated daily with new opportunities from top employers
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* CARD COMPONENT */
// function RoleCard({ item, index, isActive, onHover, row, isScrolling }) {
//   return (
//     <div
//       className={`relative min-w-[300px] md:min-w-[340px]
//       bg-white rounded-2xl border-2
//       px-6 py-5
//       flex items-center gap-5
//       transition-all duration-500 ${
//         isActive ? "border-orange-500 shadow-xl" : "border-gray-200 shadow-md"
//       }
//       group hover:shadow-2xl hover:-translate-y-2 ${
//         isScrolling ? "hover:border-orange-400" : ""
//       }`}
//       onMouseEnter={() => onHover(item.name)}
//       onMouseLeave={() => onHover(null)}
//     >
//       {/* Link wrapper for click */}
//       <Link
//         href={`/jobs?role=${encodeURIComponent(item.name.toLowerCase())}`}
//         className="absolute inset-0 z-10"
//         aria-label={`View ${item.name} jobs`}
//       />

//       {/* Scrolling Animation Effect */}
//       <div
//         className={`absolute inset-0 rounded-2xl ${
//           isScrolling
//             ? "bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
//             : ""
//         }`}
//       ></div>

//       {/* Background Glow Effect */}
//       <div
//         className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
//           row === "top"
//             ? "from-orange-50/30 to-transparent"
//             : "from-blue-50/30 to-transparent"
//         } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
//       ></div>

//       {/* Trending Badge for High Growth */}
//       {parseInt(item.growth) > 40 && (
//         <div className="absolute -top-2 -right-2 z-20">
//           <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white text-xs font-bold shadow-lg">
//             <TrendingUp className="w-3 h-3" />+{item.growth}
//           </div>
//         </div>
//       )}

//       {/* Icon Container */}
//       <div
//         className={`relative z-10 w-16 h-16 rounded-2xl ${
//           row === "top"
//             ? "bg-gradient-to-br from-orange-100 to-orange-200"
//             : "bg-gradient-to-br from-blue-100 to-blue-200"
//         }
//         flex items-center justify-center
//         transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
//       >
//         <div className="text-3xl">{item.icon}</div>

//         {/* Pulse Animation when active */}
//         {isActive && (
//           <div className="absolute inset-0 rounded-2xl border-2 border-orange-300 animate-ping opacity-30"></div>
//         )}
//       </div>

//       {/* Text Content */}
//       <div className="flex-1 relative z-10">
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
//             {item.category}
//           </span>
//           <div className="flex items-center gap-1">
//             <Zap className="w-3 h-3 text-yellow-500" />
//             <span className="text-xs font-bold text-yellow-600">HOT</span>
//           </div>
//         </div>

//         <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-orange-600 transition-colors duration-300">
//           {item.name}
//         </h3>

//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-lg font-bold text-gray-900 mb-1">{item.jobs}</p>
//             <p className="text-sm text-gray-500 flex items-center gap-1">
//               <TrendingUp className="w-3 h-3" />
//               <span className="font-medium text-green-600">
//                 +{item.growth} growth
//               </span>
//             </p>
//           </div>

//           <div
//             className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center
//             transition-all duration-300 group-hover:bg-orange-100 group-hover:text-orange-600"
//           >
//             <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TrendingUp, Zap, Sparkles, ArrowRight } from "lucide-react";

/* ROW 1 DATA */
const row1 = [
  {
    name: "Delivery Person",
    jobs: "4,110 openings",
    icon: "🚚",
    category: "Logistics",
    growth: "42%",
  },
  {
    name: "Telecalling / BPO",
    jobs: "4,095 openings",
    icon: "📞",
    category: "Customer Service",
    growth: "38%",
  },
  {
    name: "Accounts / Finance",
    jobs: "3,677 openings",
    icon: "💰",
    category: "Finance",
    growth: "35%",
  },
  {
    name: "Field Sales",
    jobs: "3,513 openings",
    icon: "📊",
    category: "Sales",
    growth: "45%",
  },
  {
    name: "Business Development",
    jobs: "1,997 openings",
    icon: "📈",
    category: "Business",
    growth: "52%",
  },
  {
    name: "Chemical Engineer",
    jobs: "1,842 openings",
    icon: "⚗️",
    category: "Engineering",
    growth: "28%",
  },
  {
    name: "Data Analyst",
    jobs: "2,150 openings",
    icon: "📊",
    category: "Analytics",
    growth: "55%",
  },
  {
    name: "Digital Marketer",
    jobs: "1,850 openings",
    icon: "📱",
    category: "Marketing",
    growth: "48%",
  },
];

/* ROW 2 DATA */
const row2 = [
  {
    name: "Nurse / Patient Care",
    jobs: "1,221 openings",
    icon: "👩‍⚕️",
    category: "Healthcare",
    growth: "48%",
  },
  {
    name: "Electrician / Wireman",
    jobs: "1,120 openings",
    icon: "⚡",
    category: "Technical",
    growth: "31%",
  },
  {
    name: "Security Guard",
    jobs: "1,113 openings",
    icon: "🛡️",
    category: "Security",
    growth: "29%",
  },
  {
    name: "Labour / Factory Worker",
    jobs: "1,153 openings",
    icon: "🏭",
    category: "Manufacturing",
    growth: "26%",
  },
  {
    name: "Maid / Baby Care",
    jobs: "1,141 openings",
    icon: "👶",
    category: "Domestic",
    growth: "34%",
  },
  {
    name: "Software Developer",
    jobs: "1,158 openings",
    icon: "💻",
    category: "Technology",
    growth: "67%",
  },
  {
    name: "Graphic Designer",
    jobs: "950 openings",
    icon: "🎨",
    category: "Design",
    growth: "42%",
  },
  {
    name: "Content Writer",
    jobs: "875 openings",
    icon: "✍️",
    category: "Writing",
    growth: "39%",
  },
];

/* ENHANCED AUTO SCROLL HOOK */
function useInfiniteScroll(ref, speed = 1.5) {
  const animationRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const animateScroll = () => {
    if (!ref.current || isPaused) return;

    ref.current.scrollLeft += speed;

    // Seamless infinite scroll logic
    const maxScroll = ref.current.scrollWidth / 2;

    if (ref.current.scrollLeft >= maxScroll) {
      ref.current.scrollLeft = 0;
    }

    setScrollPosition(ref.current.scrollLeft);
    animationRef.current = requestAnimationFrame(animateScroll);
  };

  const start = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animateScroll);
  };

  const stop = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const pause = () => {
    setIsPaused(true);
  };

  const resume = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    // Duplicate content for seamless scroll
    if (ref.current) {
      const container = ref.current;
      const contentWidth = container.scrollWidth / 2;
      container.style.scrollBehavior = "auto";
    }

    start();

    return () => stop();
  }, [isPaused]);

  return { start, stop, pause, resume, isPaused, scrollPosition };
}

export default function TrendingRolesSlider() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const [activeRole, setActiveRole] = useState(null);
  const [isHoveringRow1, setIsHoveringRow1] = useState(false);
  const [isHoveringRow2, setIsHoveringRow2] = useState(false);

  const row1Scroll = useInfiniteScroll(row1Ref, 1.8);
  const row2Scroll = useInfiniteScroll(row2Ref, 1.8);

  // Reset scroll position on mount for better infinite scroll
  useEffect(() => {
    const resetScroll = () => {
      if (row1Ref.current) {
        row1Ref.current.scrollLeft = 0;
      }
      if (row2Ref.current) {
        row2Ref.current.scrollLeft = 0;
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(resetScroll, 100);
  }, []);

  return (
    <section className="bg-gradient-to-b from-white to-orange-50/20 py-16 md:py-24 overflow-hidden w-full px-4 md:px-8">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16 relative w-full">
        {/* <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-orange-100 rounded-full">
          <Sparkles className="w-5 h-5 text-orange-600" />
          <span className="text-sm font-semibold text-orange-700 uppercase tracking-wider">
            Auto-Scrolling Live
          </span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div> */}

        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Trending <span className="text-orange-400">Job Roles</span> on Apna
        </h2>

        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Discover the most in-demand roles across industries with thousands of
          opportunities waiting for you
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">50K+</div>
          <div className="text-gray-600">Total Openings</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">24%</div>
          <div className="text-gray-600">Growth Rate</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">150+</div>
          <div className="text-gray-600">Cities</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">₹5-25L</div>
          <div className="text-gray-600">Avg. Salary Range</div>
        </div>
      </div>

      {/* Auto Scroll Instructions */}
      {/* <div className="text-center mb-8 w-full">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-600 font-medium">
            ✨ Auto-scrolling • Hover to pause • Scroll manually
          </span>
        </div>
      </div> */}

      {/* ===== ROW 1 ===== */}
      <div className="relative mb-8 group w-full">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none"></div>

        {/* Scroll Indicator */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex items-center gap-1">
            <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                style={{
                  transform: `translateX(${-row1Scroll.scrollPosition % 100}%)`,
                  width: "50%",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div
          ref={row1Ref}
          onMouseEnter={() => {
            row1Scroll.pause();
            setIsHoveringRow1(true);
          }}
          onMouseLeave={() => {
            if (!isHoveringRow2) {
              row1Scroll.resume();
            }
            setIsHoveringRow1(false);
          }}
          className="flex gap-6 overflow-x-hidden scrollbar-hide py-6 w-[100vw]"
        >
          {/* Duplicate content for seamless scroll */}
          {[...row1, ...row1, ...row1].map((item, i) => (
            <RoleCard
              key={i}
              item={item}
              index={i}
              isActive={activeRole === item.name}
              onHover={setActiveRole}
              row="top"
              isScrolling={!row1Scroll.isPaused}
            />
          ))}
        </div>
      </div>

      {/* ===== ROW 2 ===== */}
      <div className="relative mb-12 group w-full">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none"></div>

        {/* Scroll Indicator */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex items-center gap-1">
            <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                style={{
                  transform: `translateX(${row2Scroll.scrollPosition % 100}%)`,
                  width: "50%",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div
          ref={row2Ref}
          onMouseEnter={() => {
            row2Scroll.pause();
            setIsHoveringRow2(true);
          }}
          onMouseLeave={() => {
            if (!isHoveringRow1) {
              row2Scroll.resume();
            }
            setIsHoveringRow2(false);
          }}
          className="flex gap-6 overflow-x-hidden scrollbar-hide py-6 w-[100vw]"
        >
          {/* Duplicate content for seamless scroll */}
          {[...row2, ...row2, ...row2].map((item, i) => (
            <RoleCard
              key={i}
              item={item}
              index={i}
              isActive={activeRole === item.name}
              onHover={setActiveRole}
              row="bottom"
              isScrolling={!row2Scroll.isPaused}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center w-full">
        <Link
          href="/jobs"
          className="group inline-flex items-center gap-3
            bg-[#0F2A44]
            text-white font-semibold text-lg
            px-8 py-4 rounded-xl
            hover:shadow-xl hover:shadow-orange-200 hover:scale-105
            transition-all duration-300"
        >
          <span>Explore All Trending Roles</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
        </Link>
      </div>
    </section>
  );
}

/* CARD COMPONENT */
function RoleCard({ item, index, isActive, onHover, row, isScrolling }) {
  return (
    <div
      className={`relative min-w-[300px] md:min-w-[340px]
      bg-white rounded-2xl border-2
      px-6 py-5
      flex items-center gap-5
      transition-all duration-500 ${
        isActive ? "border-orange-500 shadow-xl" : "border-gray-200 shadow-md"
      }
      group hover:shadow-2xl hover:-translate-y-2 ${
        isScrolling ? "hover:border-orange-400" : ""
      }`}
      onMouseEnter={() => onHover(item.name)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Link wrapper for click */}
      <Link
        href={`/jobs?role=${encodeURIComponent(item.name.toLowerCase())}`}
        className="absolute inset-0 z-10"
        aria-label={`View ${item.name} jobs`}
      />

      {/* Scrolling Animation Effect */}
      <div
        className={`absolute inset-0 rounded-2xl ${
          isScrolling
            ? "bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
            : ""
        }`}
      ></div>

      {/* Background Glow Effect */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
          row === "top"
            ? "from-orange-50/30 to-transparent"
            : "from-blue-50/30 to-transparent"
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      ></div>

      {/* Trending Badge for High Growth */}
      {parseInt(item.growth) > 40 && (
        <div className="absolute -top-2 -right-2 z-20">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-[#0F2A44] rounded-full text-white text-xs font-bold shadow-lg">
            <TrendingUp className="w-3 h-3" />+{item.growth}
          </div>
        </div>
      )}

      {/* Icon Container */}
      <div
        className={`relative z-10 w-16 h-16 rounded-2xl ${
          row === "top"
            ? "bg-gradient-to-br from-orange-100 to-orange-200"
            : "bg-gradient-to-br from-blue-100 to-blue-200"
        } 
        flex items-center justify-center
        transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
      >
        <div className="text-3xl">{item.icon}</div>

        {/* Pulse Animation when active */}
        {isActive && (
          <div className="absolute inset-0 rounded-2xl border-2 border-orange-400 animate-ping opacity-30"></div>
        )}
      </div>

      {/* Text Content */}
      <div className="flex-1 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {item.category}
          </span>
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-yellow-500" />
            <span className="text-xs font-bold text-yellow-600">HOT</span>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-orange-600 transition-colors duration-300">
          {item.name}
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900 mb-1">{item.jobs}</p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span className="font-medium text-orange-400">
                +{item.growth} growth
              </span>
            </p>
          </div>

          <div
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center
            transition-all duration-300 group-hover:bg-orange-100 group-hover:text-orange-600"
          >
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
