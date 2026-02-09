// "use client";

// import Image from "next/image";
// import { useEffect, useRef } from "react";

// const testimonials = [
//   {
//     name: "Shiwangi Singla",
//     rating: 4.5,
//     image:  "/images/freasher.png",
//     text: "Thanks Apna for helping me find a job without much hassle. If you are a fresher or skilled person, you can easily find a job through the Apna app.",
//   },
//   {
//     name: "Jenil Ghevariya",
//     rating: 4.5,
//     image:  "/images/freasher.png",
//     text: "This app is very helpful if you are looking for a job. The team is also very supportive and friendly.",
//   },
//   {
//     name: "Kaynat Mansuri",
//     rating: 4.5,
//     image:  "/images/freasher.png",
//     text: "It is definitely a great app with correct job information. I would recommend it to my friends.",
//   },
// ];

// export default function TestimonialSlider() {
//   const sliderRef = useRef(null);

//   /* AUTO SCROLL */
//   useEffect(() => {
//     const slider = sliderRef.current;
//     let scroll = 0;

//     const interval = setInterval(() => {
//       scroll += 360;

//       if (scroll >= slider.scrollWidth / 2) {
//         scroll = 0;
//       }

//       slider.scrollTo({
//         left: scroll,
//         behavior: "smooth",
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="w-full bg-white overflow-hidden">

//       {/* MAIN WRAPPER */}
//      <div className="w-full flex flex-col lg:flex-row min-h-[320px]">

//         {/* LEFT GREEN (25%) */}
//        <div className="w-full lg:w-1/4 bg-green-700 text-white px-6 md:px-10 py-10 flex flex-col justify-center">

//           <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-3xl mb-6">
//             “
//           </div>

//           <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-6">
//             Join the community of 5 crore satisfied job seekers...
//           </h2>

//           <div className="flex items-center gap-1 text-yellow-400 text-lg">
//             ⭐ ⭐ ⭐ ⭐ ⭐
//           </div>

//           <p className="text-sm mt-1 opacity-90">
//             Play Store Ratings
//           </p>

//         </div>

//         {/* RIGHT SLIDER (75%) */}
//         <div className="w-full lg:w-3/4 bg-[#eaf7f2] py-8 md:py-10 px-4 md:pl-8 overflow-hidden">

//           <div
//             ref={sliderRef}
//             className="flex gap-6 overflow-x-scroll scroll-smooth scrollbar-hide"
//           >

//             {/* DUPLICATE FOR LOOP */}
//             {[...testimonials, ...testimonials].map((item, i) => (
//               <div
//                 key={i}
//                 className="min-w-[260px] sm:min-w-[300px] md:min-w-[340px] bg-white p-6 rounded-xl shadow-md"

//               >

//                 {/* USER */}
//                 <div className="flex items-center gap-3 mb-4">

//                   <Image
//                     src={item.image}
//                     width={108}
//                     height={108}
//                     alt={item.name}
//                     className="rounded-full object-cover"
//                   />

//                   <div>
//                     <h4 className="font-semibold text-xl text-black">
//                       {item.name}
//                     </h4>

//                     <div className="flex items-center gap-1 text-yellow-500 text-sm">
//                       ⭐⭐⭐⭐⭐
//                       <span className="text-gray-900 ml-1">
//                         {item.rating}
//                       </span>
//                     </div>
//                   </div>

//                 </div>

//                 {/* TEXT */}
//                 <p className="text-gray-500 text-lg leading-relaxed">
//                   "{item.text}"
//                 </p>

//               </div>
//             ))}

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// }
// "use client";

// import Image from "next/image";
// import { useEffect, useRef } from "react";

// const testimonials = [
//   {
//     name: "Shiwangi Singla",
//     rating: 4.6,
//     image: "https://randomuser.me/api/portraits/women/44.jpg",
//     text: "Apna helped me get my first job within weeks. The process was smooth and stress-free.",
//   },
//   {
//     name: "Jenil Ghevariya",
//     rating: 4.5,
//     image: "https://randomuser.me/api/portraits/men/32.jpg",
//     text: "Very useful platform with genuine job listings. Support team is quick and friendly.",
//   },
//   {
//     name: "Kaynat Mansuri",
//     rating: 4.7,
//     image: "https://randomuser.me/api/portraits/women/65.jpg",
//     text: "Accurate job information and easy application process. Highly recommended.",
//   },
//   {
//     name: "Rahul Verma",
//     rating: 4.4,
//     image: "https://randomuser.me/api/portraits/men/41.jpg",
//     text: "I started getting interview calls within days. Great experience overall.",
//   },
//   {
//     name: "Pooja Sharma",
//     rating: 4.8,
//     image: "https://randomuser.me/api/portraits/women/12.jpg",
//     text: "Best job platform I’ve used. Simple UI and trusted companies.",
//   },
//   {
//     name: "Aman Khan",
//     rating: 4.3,
//     image: "https://randomuser.me/api/portraits/men/76.jpg",
//     text: "Helped me find a job near my location. Perfect for entry-level roles.",
//   },
//   {
//     name: "Neha Patel",
//     rating: 4.6,
//     image: "https://randomuser.me/api/portraits/women/29.jpg",
//     text: "Notifications are relevant and timely. Applying for jobs is very easy.",
//   },
//   {
//     name: "Rohit Meena",
//     rating: 4.5,
//     image: "https://randomuser.me/api/portraits/men/58.jpg",
//     text: "Genuine employers and quick responses. Very reliable platform.",
//   },
//   {
//     name: "Simran Kaur",
//     rating: 4.7,
//     image: "https://randomuser.me/api/portraits/women/81.jpg",
//     text: "Got placed within a month. Great app for freshers and job seekers.",
//   },
//   {
//     name: "Mohit Jain",
//     rating: 4.4,
//     image: "https://randomuser.me/api/portraits/men/19.jpg",
//     text: "No consultancy fees, direct hiring. Simple and effective experience.",
//   },
// ];

// export default function TestimonialSlider() {
//   const sliderRef = useRef(null);

//   /* AUTO SCROLL */
//   useEffect(() => {
//     const slider = sliderRef.current;
//     let scroll = 0;

//     const interval = setInterval(() => {
//       scroll += 360;

//       if (scroll >= slider.scrollWidth / 2) {
//         scroll = 0;
//       }

//       slider.scrollTo({
//         left: scroll,
//         behavior: "smooth",
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="w-full bg-white overflow-hidden">
//       <div className="w-full flex flex-col lg:flex-row min-h-[320px]">
//         {/* LEFT */}
//         <div className="w-full lg:w-1/4 bg-green-700 text-white px-6 md:px-10 py-10 flex flex-col justify-center">
//           <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-3xl mb-6">
//             “
//           </div>

//           <h2 className="text-2xl font-bold leading-snug mb-6">
//             Join the community of 5 crore satisfied job seekers
//           </h2>

//           <div className="flex items-center gap-1 text-yellow-400 text-lg">
//             ⭐ ⭐ ⭐ ⭐ ⭐
//           </div>

//           <p className="text-sm mt-1 opacity-90">Play Store Ratings</p>
//         </div>

//         {/* RIGHT SLIDER */}
//         <div className="w-full lg:w-3/4 bg-[#eaf7f2] py-8 md:py-10 px-4 md:pl-8 overflow-hidden">
//           <div
//             ref={sliderRef}
//             className="flex gap-6 overflow-x-scroll scroll-smooth scrollbar-hide"
//           >
//             {[...testimonials, ...testimonials].map((item, i) => (
//               <div
//                 key={i}
//                 className="min-w-[260px] sm:min-w-[300px] md:min-w-[340px] bg-white p-6 rounded-xl shadow-md"
//               >
//                 <div className="flex items-center gap-3 mb-4">
//                   <Image
//                     src={item.image}
//                     width={72}
//                     height={72}
//                     alt={item.name}
//                     className="rounded-full object-cover"
//                   />

//                   <div>
//                     <h4 className="font-semibold text-lg text-black">
//                       {item.name}
//                     </h4>
//                     <div className="flex items-center gap-1 text-yellow-500 text-sm">
//                       ⭐⭐⭐⭐⭐
//                       <span className="text-gray-900 ml-1">{item.rating}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <p className="text-gray-600 text-base leading-relaxed">
//                   "{item.text}"
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// "use client";

// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";
// import {
//   Star,
//   Quote,
//   ChevronLeft,
//   ChevronRight,
//   Sparkles,
//   Award,
//   Users,
// } from "lucide-react";

// const testimonials = [
//   {
//     name: "Shiwangi Singla",
//     rating: 4.6,
//     image: "https://randomuser.me/api/portraits/women/44.jpg",
//     text: "Apna helped me get my first job within weeks. The process was smooth and stress-free.",
//     role: "Marketing Executive",
//     company: "TechCorp Ltd.",
//     joined: "2023",
//   },
//   {
//     name: "Jenil Ghevariya",
//     rating: 4.5,
//     image: "https://randomuser.me/api/portraits/men/32.jpg",
//     text: "Very useful platform with genuine job listings. Support team is quick and friendly.",
//     role: "Software Engineer",
//     company: "Innovate Tech",
//     joined: "2022",
//   },
//   {
//     name: "Kaynat Mansuri",
//     rating: 4.7,
//     image: "https://randomuser.me/api/portraits/women/65.jpg",
//     text: "Accurate job information and easy application process. Highly recommended.",
//     role: "HR Manager",
//     company: "Global Solutions",
//     joined: "2023",
//   },
//   {
//     name: "Rahul Verma",
//     rating: 4.4,
//     image: "https://randomuser.me/api/portraits/men/41.jpg",
//     text: "I started getting interview calls within days. Great experience overall.",
//     role: "Sales Manager",
//     company: "SalesForce Inc.",
//     joined: "2022",
//   },
//   {
//     name: "Pooja Sharma",
//     rating: 4.8,
//     image: "https://randomuser.me/api/portraits/women/12.jpg",
//     text: "Best job platform I've used. Simple UI and trusted companies.",
//     role: "Product Designer",
//     company: "DesignHub",
//     joined: "2023",
//   },
//   {
//     name: "Aman Khan",
//     rating: 4.3,
//     image: "https://randomuser.me/api/portraits/men/76.jpg",
//     text: "Helped me find a job near my location. Perfect for entry-level roles.",
//     role: "Field Executive",
//     company: "LogiFast",
//     joined: "2023",
//   },
//   {
//     name: "Neha Patel",
//     rating: 4.6,
//     image: "https://randomuser.me/api/portraits/women/29.jpg",
//     text: "Notifications are relevant and timely. Applying for jobs is very easy.",
//     role: "Content Writer",
//     company: "ContentMasters",
//     joined: "2022",
//   },
//   {
//     name: "Rohit Meena",
//     rating: 4.5,
//     image: "https://randomuser.me/api/portraits/men/58.jpg",
//     text: "Genuine employers and quick responses. Very reliable platform.",
//     role: "Operations Manager",
//     company: "OpsPro",
//     joined: "2023",
//   },
//   {
//     name: "Simran Kaur",
//     rating: 4.7,
//     image: "https://randomuser.me/api/portraits/women/81.jpg",
//     text: "Got placed within a month. Great app for freshers and job seekers.",
//     role: "Business Analyst",
//     company: "DataInsights",
//     joined: "2023",
//   },
//   {
//     name: "Mohit Jain",
//     rating: 4.4,
//     image: "https://randomuser.me/api/portraits/men/19.jpg",
//     text: "No consultancy fees, direct hiring. Simple and effective experience.",
//     role: "Accountant",
//     company: "FinancePro",
//     joined: "2022",
//   },
// ];

// export default function TestimonialSlider() {
//   const sliderRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const intervalRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);

//   // Auto scroll with smooth animation
//   const startAutoScroll = () => {
//     if (intervalRef.current) clearInterval(intervalRef.current);

//     intervalRef.current = setInterval(() => {
//       if (!sliderRef.current || isPaused) return;

//       const slider = sliderRef.current;
//       const cardWidth = 360; // Approximate card width with gap
//       const maxScroll = slider.scrollWidth / 2;

//       let newScroll = slider.scrollLeft + cardWidth;

//       if (newScroll >= maxScroll) {
//         newScroll = 0;
//       }

//       slider.scrollTo({
//         left: newScroll,
//         behavior: "smooth",
//       });

//       setCurrentIndex(
//         (prev) => (prev + 1) % Math.floor(slider.scrollWidth / cardWidth),
//       );
//     }, 3000);
//   };

//   // Manual navigation
//   const scrollToIndex = (direction) => {
//     if (!sliderRef.current) return;

//     const slider = sliderRef.current;
//     const cardWidth = 360;
//     const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

//     slider.scrollBy({
//       left: scrollAmount,
//       behavior: "smooth",
//     });

//     setCurrentIndex((prev) => {
//       const newIndex = direction === "left" ? prev - 1 : prev + 1;
//       const totalItems = Math.floor(slider.scrollWidth / 2 / cardWidth);
//       return (newIndex + totalItems) % totalItems;
//     });

//     // Restart auto-scroll after manual navigation
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     setTimeout(startAutoScroll, 5000);
//   };

//   // Drag functionality
//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setStartX(e.pageX - sliderRef.current.offsetLeft);
//     setScrollLeft(sliderRef.current.scrollLeft);
//     setIsPaused(true);
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//     setIsPaused(false);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging || !sliderRef.current) return;
//     e.preventDefault();
//     const x = e.pageX - sliderRef.current.offsetLeft;
//     const walk = (x - startX) * 1.5;
//     sliderRef.current.scrollLeft = scrollLeft - walk;
//   };

//   useEffect(() => {
//     startAutoScroll();
//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [isPaused]);

//   const handleScroll = () => {
//     if (!sliderRef.current) return;

//     const scrollPos = sliderRef.current.scrollLeft;
//     const cardWidth = 360;
//     const newIndex = Math.floor(scrollPos / cardWidth) % testimonials.length;
//     setCurrentIndex(newIndex);
//   };

//   return (
//     <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 md:py-28 overflow-hidden">
//       {/* Background Decorations */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/30 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 md:px-8">
//         {/* Header Section */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-200">
//             <Sparkles className="w-5 h-5 text-green-600" />
//             <span className="text-sm font-bold text-green-700 uppercase tracking-widest">
//               Success Stories
//             </span>
//             <Award className="w-5 h-5 text-green-600" />
//           </div>

//           <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//             Trusted by <span className="text-green-600">5 Crore+</span> Job
//             Seekers
//           </h2>

//           <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
//             Join millions who found their dream job through Apna. Real stories
//             from real people.
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
//           <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
//                 <Users className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <div className="text-3xl font-bold text-gray-900">5 Crore+</div>
//                 <div className="text-gray-600">Active Users</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
//                 <Star className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <div className="text-3xl font-bold text-gray-900">4.6/5</div>
//                 <div className="text-gray-600">Play Store Rating</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-600 flex items-center justify-center">
//                 <Award className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <div className="text-3xl font-bold text-gray-900">10L+</div>
//                 <div className="text-gray-600">Jobs Delivered</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Slider Container */}
//         <div className="relative">
//           {/* Navigation Arrows */}
//           <button
//             onClick={() => scrollToIndex("left")}
//             className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8
//               z-20 w-12 h-12 rounded-full bg-white border border-gray-300
//               flex items-center justify-center hover:bg-gray-50 hover:border-gray-400
//               transition-all duration-300 shadow-lg"
//           >
//             <ChevronLeft className="w-5 h-5 text-gray-700" />
//           </button>

//           <button
//             onClick={() => scrollToIndex("right")}
//             className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8
//               z-20 w-12 h-12 rounded-full bg-white border border-gray-300
//               flex items-center justify-center hover:bg-gray-50 hover:border-gray-400
//               transition-all duration-300 shadow-lg"
//           >
//             <ChevronRight className="w-5 h-5 text-gray-700" />
//           </button>

//           {/* Gradient Fades */}
//           <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
//           <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

//           {/* The Slider */}
//           <div
//             ref={sliderRef}
//             onMouseDown={handleMouseDown}
//             onMouseUp={handleMouseUp}
//             onMouseMove={handleMouseMove}
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//             onScroll={handleScroll}
//             className="flex gap-6 overflow-x-scroll scrollbar-hide py-8 px-4
//               cursor-grab active:cursor-grabbing"
//             style={{ scrollBehavior: "smooth" }}
//           >
//             {[...testimonials, ...testimonials].map((item, i) => (
//               <TestimonialCard
//                 key={i}
//                 item={item}
//                 index={i % testimonials.length}
//               />
//             ))}
//           </div>

//           {/* Progress Indicators */}
//           <div className="flex justify-center gap-2 mt-8">
//             {testimonials.slice(0, 5).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   if (!sliderRef.current) return;
//                   const cardWidth = 360;
//                   sliderRef.current.scrollTo({
//                     left: index * cardWidth,
//                     behavior: "smooth",
//                   });
//                   setCurrentIndex(index);
//                   setIsPaused(true);
//                   setTimeout(() => setIsPaused(false), 3000);
//                 }}
//                 className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                   currentIndex % testimonials.length === index
//                     ? "w-8 bg-gradient-to-r from-green-500 to-emerald-600"
//                     : "bg-gray-300 hover:bg-gray-400"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Play Store Rating */}
//         <div className="text-center mt-16">
//           <div className="inline-flex flex-col md:flex-row items-center gap-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
//             <div className="flex items-center gap-3">
//               <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
//                 <Star className="w-8 h-8 text-white" />
//               </div>
//               <div className="text-left">
//                 <div className="text-4xl font-bold text-gray-900">4.6/5</div>
//                 <div className="text-gray-600">Play Store Rating</div>
//               </div>
//             </div>

//             <div className="h-12 w-px bg-gray-200 hidden md:block"></div>

//             <div>
//               <div className="flex items-center gap-1 mb-2">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className="w-6 h-6 fill-yellow-400 text-yellow-400"
//                   />
//                 ))}
//               </div>
//               <p className="text-gray-600">Based on 50 lakh+ reviews</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function TestimonialCard({ item, index }) {
//   return (
//     <div
//       className="min-w-[340px] md:min-w-[380px]
//       bg-white rounded-2xl border border-gray-200
//       p-6 shadow-xl transition-all duration-500
//       hover:shadow-2xl hover:-translate-y-2
//       group"
//     >
//       {/* Quote Icon */}
//       <div className="absolute top-6 right-6 opacity-10">
//         <Quote className="w-16 h-16 text-gray-400" />
//       </div>

//       {/* User Info */}
//       <div className="flex items-start gap-4 mb-6">
//         <div className="relative">
//           <Image
//             src={item.image}
//             width={80}
//             height={80}
//             alt={item.name}
//             className="rounded-2xl object-cover border-2 border-white shadow-lg"
//           />
//           {/* Verified Badge */}
//           <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
//             <span className="text-white text-xs font-bold">✓</span>
//           </div>
//         </div>

//         <div className="flex-1">
//           <div className="flex justify-between items-start">
//             <div>
//               <h4 className="font-bold text-lg text-gray-900">{item.name}</h4>
//               <p className="text-gray-600 text-sm">
//                 {item.role} • {item.company}
//               </p>
//             </div>

//             <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full">
//               <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//               <span className="font-bold text-gray-900">{item.rating}</span>
//             </div>
//           </div>

//           {/* Rating Stars */}
//           <div className="flex items-center gap-1 mt-2">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`w-4 h-4 ${
//                   i < Math.floor(item.rating)
//                     ? "fill-yellow-400 text-yellow-400"
//                     : "fill-gray-200 text-gray-200"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Testimonial Text */}
//       <div className="relative">
//         <Quote className="absolute -top-2 -left-2 w-8 h-8 text-green-200 transform -rotate-180" />
//         <p className="text-gray-700 text-lg leading-relaxed pl-6 italic">
//           "{item.text}"
//         </p>
//       </div>

//       {/* Footer Info */}
//       <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//           <span className="text-sm text-gray-500">Placed in {item.joined}</span>
//         </div>

//         <div className="flex items-center gap-1 text-green-600">
//           <span className="text-sm font-medium">Success Story</span>
//           <ChevronRight className="w-4 h-4" />
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  Users,
} from "lucide-react";

const testimonials = [
  {
    name: "Shiwangi Singla",
    rating: 4.6,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Apna helped me get my first job within weeks. The process was smooth and stress-free.",
    role: "Marketing Executive",
    company: "TechCorp Ltd.",
    joined: "2023",
  },
  {
    name: "Jenil Ghevariya",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Very useful platform with genuine job listings. Support team is quick and friendly.",
    role: "Software Engineer",
    company: "Innovate Tech",
    joined: "2022",
  },
  {
    name: "Kaynat Mansuri",
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Accurate job information and easy application process. Highly recommended.",
    role: "HR Manager",
    company: "Global Solutions",
    joined: "2023",
  },
  {
    name: "Rahul Verma",
    rating: 4.4,
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    text: "I started getting interview calls within days. Great experience overall.",
    role: "Sales Manager",
    company: "SalesForce Inc.",
    joined: "2022",
  },
  {
    name: "Pooja Sharma",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    text: "Best job platform I've used. Simple UI and trusted companies.",
    role: "Product Designer",
    company: "DesignHub",
    joined: "2023",
  },
  {
    name: "Aman Khan",
    rating: 4.3,
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    text: "Helped me find a job near my location. Perfect for entry-level roles.",
    role: "Field Executive",
    company: "LogiFast",
    joined: "2023",
  },
  {
    name: "Neha Patel",
    rating: 4.6,
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    text: "Notifications are relevant and timely. Applying for jobs is very easy.",
    role: "Content Writer",
    company: "ContentMasters",
    joined: "2022",
  },
  {
    name: "Rohit Meena",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/58.jpg",
    text: "Genuine employers and quick responses. Very reliable platform.",
    role: "Operations Manager",
    company: "OpsPro",
    joined: "2023",
  },
  {
    name: "Simran Kaur",
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/women/81.jpg",
    text: "Got placed within a month. Great app for freshers and job seekers.",
    role: "Business Analyst",
    company: "DataInsights",
    joined: "2023",
  },
  {
    name: "Mohit Jain",
    rating: 4.4,
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    text: "No consultancy fees, direct hiring. Simple and effective experience.",
    role: "Accountant",
    company: "FinancePro",
    joined: "2022",
  },
];

export default function TestimonialSlider() {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto scroll with smooth animation
  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!sliderRef.current || isPaused) return;

      const slider = sliderRef.current;
      const cardWidth = 360;
      const maxScroll = slider.scrollWidth / 2;

      let newScroll = slider.scrollLeft + cardWidth;

      if (newScroll >= maxScroll) {
        newScroll = 0;
      }

      slider.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });

      setCurrentIndex(
        (prev) => (prev + 1) % Math.floor(slider.scrollWidth / cardWidth),
      );
    }, 1000);
  };

  // Manual navigation
  // const scrollToIndex = (direction) => {
  //   if (!sliderRef.current) return;

  //   const slider = sliderRef.current;
  //   const cardWidth = 360;
  //   const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

  //   slider.scrollBy({
  //     left: scrollAmount,
  //     behavior: "smooth",
  //   });

  //   setCurrentIndex((prev) => {
  //     const newIndex = direction === "left" ? prev - 1 : prev + 1;
  //     const totalItems = Math.floor(slider.scrollWidth / 2 / cardWidth);
  //     return (newIndex + totalItems) % totalItems;
  //   });

  //   if (intervalRef.current) clearInterval(intervalRef.current);
  //   setTimeout(startAutoScroll, 5000);
  // };

  // Drag functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    setIsPaused(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  const handleScroll = () => {
    if (!sliderRef.current) return;

    const scrollPos = sliderRef.current.scrollLeft;
    const cardWidth = 360;
    const newIndex = Math.floor(scrollPos / cardWidth) % testimonials.length;
    setCurrentIndex(newIndex);
  };

  return (
    <section className="w-full min-h-[500px] bg-white overflow-hidden">
      <div className="w-full flex flex-col lg:flex-row">
        {/* LEFT SECTION - ORIGINAL WIDTH CONCEPT */}
        <div className="w-full lg:w-1/3 bg-gradient-to-br from-green-600 to-emerald-700 text-white p-8 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">
                Success Stories
              </span>
              <Award className="w-5 h-5 text-white" />
            </div>

            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl mb-8">
              <Quote className="w-8 h-8" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Trusted by <br />
              <span className="text-yellow-300">5 Crore+</span> <br />
              Job Seekers
            </h2>

            <div className="flex items-center gap-3 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-yellow-300 text-yellow-300"
                />
              ))}
              <span className="text-xl font-bold ml-2">4.6/5</span>
            </div>
          </div>
        </div>

        {/* RIGHT SLIDER SECTION */}
        <div className="w-full lg:w-2/3 bg-gradient-to-br from-gray-50 to-white py-12 px-4 md:px-8 lg:px-12 relative">
          {/* Navigation Arrows */}
          {/* <button
            onClick={() => scrollToIndex("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 
              z-20 w-12 h-12 rounded-full bg-white border border-gray-300 
              flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 
              transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={() => scrollToIndex("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2
              z-20 w-12 h-12 rounded-full bg-white border border-gray-300 
              flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 
              transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button> */}

          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* The Slider */}
          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-scroll scrollbar-hide py-4 px-4 h-full
              cursor-grab active:cursor-grabbing"
            style={{ scrollBehavior: "smooth" }}
          >
            {[...testimonials, ...testimonials].map((item, i) => (
              <TestimonialCard
                key={i}
                item={item}
                index={i % testimonials.length}
              />
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2">
              {testimonials.slice(0, 5).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!sliderRef.current) return;
                    const cardWidth = 360;
                    sliderRef.current.scrollTo({
                      left: index * cardWidth,
                      behavior: "smooth",
                    });
                    setCurrentIndex(index);
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 3000);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex % testimonials.length === index
                      ? "w-8 bg-gradient-to-r from-green-500 to-emerald-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ item, index }) {
  return (
    <div
      className="min-w-[300px] md:min-w-[340px] lg:min-w-[360px]
      bg-white rounded-2xl border border-gray-200 
      p-6 shadow-xl transition-all duration-500
      hover:shadow-2xl hover:-translate-y-2
      group flex flex-col h-[280px]"
    >
      {/* User Info */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <Image
            src={item.image}
            width={60}
            height={60}
            alt={item.name}
            className="rounded-xl object-cover border-2 border-white shadow-md"
          />
          {/* Verified Badge */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-gray-900">{item.name}</h4>
              <p className="text-gray-600 text-xs">
                {item.role} • {item.company}
              </p>
            </div>

            <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-gray-900 text-sm">
                {item.rating}
              </span>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(item.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Text */}
      <div className="flex-1 relative">
        <Quote className="absolute -top-2 -left-2 w-6 h-6 text-green-100 transform -rotate-180" />
        <p className="text-gray-700 leading-relaxed pl-4 text-sm md:text-base italic line-clamp-4">
          "{item.text}"
        </p>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500">Placed in {item.joined}</span>
        </div>

        <div className="flex items-center gap-1 text-green-600 text-sm">
          <span className="font-medium">Success Story</span>
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}
