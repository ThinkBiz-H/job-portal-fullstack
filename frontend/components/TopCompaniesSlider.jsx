
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Building2, TrendingUp } from "lucide-react";

const companies = [
  {
    name: "Bajaj Allianz Life Insurance",
    logo: "/logos/bajaj.png",
    desc: "Provider of life insurance and financial services.",
    slug: "bajaj",
    jobs: 124,
    rating: 4.2,
    trending: true,
  },
  {
    name: "Paytm Service Pvt. Ltd.",
    logo: "/logos/paytm.png",
    desc: "Digital payment and e-commerce facilitator.",
    slug: "paytm",
    jobs: 89,
    rating: 4.0,
    trending: true,
  },
  {
    name: "Zomato",
    logo: "/logos/zomato.png",
    desc: "Online food delivery marketplace.",
    slug: "zomato",
    jobs: 156,
    rating: 4.3,
    trending: false,
  },
  {
    name: "Swiggy",
    logo: "/logos/swigee.png",
    desc: "Food delivery and ordering platform.",
    slug: "swiggy",
    jobs: 142,
    rating: 4.1,
    trending: true,
  },
  {
    name: "Kotak Life",
    logo: "/logos/kotak.png",
    desc: "Life insurance company.",
    slug: "kotak",
    jobs: 76,
    rating: 4.4,
    trending: false,
  },
  {
    name: "Amazon",
    logo: "/logos/amazon.png",
    desc: "E-commerce platform.",
    slug: "amazon",
    jobs: 210,
    rating: 4.5,
    trending: true,
  },
  {
    name: "Flipkart",
    logo: "/logos/flipkart.png",
    desc: "E-commerce marketplace.",
    slug: "flipkart",
    jobs: 98,
    rating: 4.0,
    trending: false,
  },
  {
    name: "Microsoft",
    logo: "/logos/microsoft.png",
    desc: "Technology and software company.",
    slug: "microsoft",
    jobs: 167,
    rating: 4.6,
    trending: true,
  },
];

export default function TopCompaniesSlider() {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const cardWidth = 320;
    const gap = 20;
    const scrollAmount = (cardWidth + gap) * (direction === "left" ? -1 : 1);

    sliderRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    setCurrentIndex((prev) => {
      const maxIndex = companies.length - 1;
      const newIndex =
        direction === "left"
          ? Math.max(0, prev - 1)
          : Math.min(maxIndex, prev + 1);
      return newIndex;
    });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("mousemove", handleMouseMove);
      return () => slider.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isDragging]);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 md:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0F2A44] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#0F2A44] font-semibold uppercase tracking-wider">
                  Featured Companies
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Job Openings in{" "}
                  <span className="text-[#0F2A44]">Top Companies</span>
                </h2>
              </div>
            </div>
            <p className="text-orange-400 max-w-2xl">
              Discover opportunities from India's most innovative and
              growth-focused companies
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-4">
            <Link
              href="/companies"
              className="px-6 py-3 bg-[#0F2A44] border border-gray-300 text-white font-medium rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              View All Companies
            </Link>

            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={currentIndex === companies.length - 3}
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
            <div className="text-2xl font-bold text-gray-900">
              {companies.length}+
            </div>
            <div className="text-gray-600">Top Companies</div>
          </div>
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
            <div className="text-2xl font-bold text-gray-900">1200+</div>
            <div className="text-gray-600">Active Jobs</div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
            <div className="text-2xl font-bold text-gray-900">4.2/5</div>
            <div className="text-gray-600">Avg. Company Rating</div>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
            <div className="text-2xl font-bold text-gray-900">48hr</div>
            <div className="text-gray-600">Avg. Response Time</div>
          </div>
        </div>

        {/* SLIDER */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-8 px-1 snap-x snap-mandatory scrollbar-hide"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            {companies.map((item, i) => (
              <div
                key={i}
                className="snap-start min-w-[300px] md:min-w-[340px] 
                  bg-white rounded-2xl border border-gray-200
                  p-6 shadow-lg transition-all duration-500
                  hover:shadow-2xl hover:-translate-y-2
                  flex flex-col min-h-[380px] group relative overflow-hidden"
              >
                {/* Trending Badge */}
                {item.trending && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-white text-xs font-semibold shadow-lg">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </div>
                  </div>
                )}

                {/* Company Rating */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-gray-800 text-sm font-semibold shadow-md">
                    <span className="text-yellow-500">★</span>
                    {item.rating}
                  </div>
                </div>

                {/* Logo Container with Gradient Background */}
                <div className="relative h-40 mb-6 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 overflow-hidden">
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <div className="relative w-full h-full">
                    <Image
                      src={item.logo}
                      fill
                      alt={item.name}
                      className="object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 280px, 320px"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <h3 className="font-bold text-gray-900 text-xl mb-3 leading-tight group-hover:text-orange-400 transition-colors duration-300">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2 flex-grow">
                  {item.desc}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <span className="text-orange-400 font-bold text-sm">
                        💼
                      </span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        Open Positions
                      </div>
                      <div className="font-bold text-gray-900">
                        {item.jobs}+
                      </div>
                    </div>
                  </div>

                  <div className="h-10 w-px bg-gray-200"></div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <span className="text-emerald-600 font-bold text-sm">
                        🚀
                      </span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Growth</div>
                      <div className="font-bold text-gray-900">High</div>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <Link
                  href={`/jobs?company=${item.slug}`}
                  className="mt-auto inline-flex items-center justify-center gap-2
                    bg-[#0F2A44] text-white font-semibold text-lg
                    px-6 py-3 rounded-xl
                    transition-all duration-300
                    hover:shadow-xl hover:shadow-blue-200 hover:scale-[1.02]
                    group-hover:from-blue-700 group-hover:to-blue-800"
                >
                  <span>View {item.jobs} Jobs</span>
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>

          {/* Scroll Progress Indicator */}
          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(companies.length / 3) }).map(
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (sliderRef.current) {
                        const cardWidth = 340;
                        const gap = 20;
                        sliderRef.current.scrollTo({
                          left: i * (cardWidth + gap) * 3,
                          behavior: "smooth",
                        });
                        setCurrentIndex(i * 3);
                      }
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      Math.floor(currentIndex / 3) === i
                        ? "bg-blue-600 w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ),
              )}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-10 border border-blue-200">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Want to see your company featured here?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join India's fastest growing companies hiring through our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/companies/register"
                className="px-8 py-3.5 bg-[#0F2A44] text-white font-semibold rounded-xl hover:bg-[#0F2A44] hover:text-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Register Your Company
              </Link>
              <Link
                href="/companies"
                className="px-8 py-3.5 bg-white border border-gray-300 text-gray-800 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Browse All Companies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
