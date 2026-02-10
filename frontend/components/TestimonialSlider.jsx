
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
        <div className="w-full lg:w-1/3 bg-[#0F2A44] text-white p-8 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
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
              <span className="text-orange-400">5 Crore+</span> <br />
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
                      ? "w-8 bg-[#0F2A44]"
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
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-orange-400 flex items-center justify-center">
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
          <div className="w-2 h-2 bg-[#0F2A44] rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500">Placed in {item.joined}</span>
        </div>

        <div className="flex items-center gap-1 text-orange-400 text-sm">
          <span className="font-medium">Success Story</span>
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}
