
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const cards = [
  {
    id: 1,
    type: "title",
  },
  {
    id: 2,
    tag: "TRENDING AT #1",
    title: "Jobs for Freshers",
    image: "/images/freasher.png",
    slug: "freshers",
    color: "orange",
  },
  {
    id: 3,
    tag: "TRENDING AT #2",
    title: "Work from home Jobs",
    image: "/images/wfh.png",
    slug: "wfh",
    color: "green",
  },
  {
    id: 4,
    tag: "TRENDING AT #3",
    title: "Part time Jobs",
    image: "/images/parttime.png",
    slug: "part-time",
    color: "blue",
  },
  {
    id: 5,
    tag: "TRENDING AT #4",
    title: "Jobs for Women",
    image: "/images/women.png",
    slug: "women",
    color: "purple",
  },
  {
    id: 6,
    tag: "TRENDING AT #5",
    title: "Full time Jobs",
    image: "/images/fulltime.png",
    slug: "full-time",
    color: "orange",
  },
];

const colorConfig = {
  orange: {
    bg: "bg-gradient-to-br from-orange-50 to-orange-100",
    border: "border-orange-200",
    hover: "hover:border-orange-400 hover:shadow-orange-100",
    tag: "text-orange-700",
    button: "group-hover:bg-orange-600",
    accent: "bg-orange-500",
  },
  green: {
    bg: "bg-gradient-to-br from-emerald-50 to-green-100",
    border: "border-emerald-200",
    hover: "hover:border-emerald-400 hover:shadow-emerald-100",
    tag: "text-emerald-700",
    button: "group-hover:bg-emerald-600",
    accent: "bg-emerald-500",
  },
  blue: {
    bg: "bg-gradient-to-br from-blue-50 to-cyan-100",
    border: "border-blue-200",
    hover: "hover:border-blue-400 hover:shadow-blue-100",
    tag: "text-blue-700",
    button: "group-hover:bg-blue-600",
    accent: "bg-blue-500",
  },
  purple: {
    bg: "bg-gradient-to-br from-violet-50 to-purple-100",
    border: "border-violet-200",
    hover: "hover:border-violet-400 hover:shadow-violet-100",
    tag: "text-violet-700",
    button: "group-hover:bg-violet-600",
    accent: "bg-violet-500",
  },
};

export default function PopularSearches() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header with decorative elements */}
        <div className="text-center mb-12 md:mb-16 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full opacity-70"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular <span className="text-orange-500">Searches</span> on Apna
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover the most trending job categories that candidates are
            looking for right now
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cards.map((item) =>
            item.type === "title" ? (
              <div
                key={item.id}
                className="relative flex flex-col justify-center p-8 md:p-10 rounded-3xl 
                bg-gradient-to-br from-gray-900 to-black text-white
                overflow-hidden shadow-2xl"
              >
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full -translate-y-20 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full translate-y-10 -translate-x-10"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">🔥</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300 uppercase tracking-wider">
                        Top Categories
                      </p>
                      <p className="text-lg font-semibold">Trending Now</p>
                    </div>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    Popular <br />
                    Searches on <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                      Apna
                    </span>
                  </h2>

                  <p className="text-gray-300 mb-6">
                    Explore the most sought-after job opportunities tailored for
                    your career growth.
                  </p>

                  <Link href="/jobs">
                    <button className="flex items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Explore All Jobs
                      <span className="text-lg transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div
                key={item.id}
                className={`group relative rounded-2xl border-2 ${colorConfig[item.color].border} 
                p-6 md:p-8 min-h-[280px] overflow-hidden cursor-pointer
                transition-all duration-500 ${colorConfig[item.color].hover} 
                ${colorConfig[item.color].bg} shadow-lg hover:shadow-2xl
                hover:-translate-y-2`}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Trending badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${colorConfig[item.color].tag} ${colorConfig[item.color].bg} border ${colorConfig[item.color].border}`}
                  >
                    {item.tag.split("#")[1]}
                  </div>
                </div>

                {/* Animated accent line */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 ${colorConfig[item.color].accent} transform origin-left transition-transform duration-700 ${activeCard === item.id ? "scale-x-100" : "scale-x-0"}`}
                ></div>

                {/* TAG */}
                <p
                  className={`text-xs font-semibold mb-3 uppercase tracking-wider ${colorConfig[item.color].tag}`}
                >
                  {item.tag}
                </p>

                {/* TITLE */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10 leading-tight">
                  {item.title}
                </h3>

                {/* Watermark text with animation */}
                <div className="absolute top-16 left-6 opacity-5 pointer-events-none overflow-hidden">
                  <h2 className="text-7xl md:text-8xl font-black text-gray-900 whitespace-nowrap transform transition-transform duration-1000 group-hover:translate-x-4">
                    {item.title.split(" ")[0]}
                  </h2>
                </div>

                {/* BUTTON */}
                <Link href={`/jobs`}>
                  <button
                    className={`mt-6 flex items-center gap-2 text-sm font-semibold
                    text-gray-800 border border-gray-300
                    px-5 py-3 rounded-xl transition-all duration-300
                    ${colorConfig[item.color].button} 
                    group-hover:text-white
                    group-hover:border-transparent shadow-md hover:shadow-lg relative z-10`}
                  >
                    <span>View all opportunities</span>
                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </button>
                </Link>

                {/* IMAGE */}
                <div
                  className={`absolute bottom-4 right-4 w-36 h-36 md:w-44 md:h-44
                  transition-all duration-700
                  ${activeCard === item.id ? "scale-110 rotate-3" : "scale-100"}`}
                >
                  <div className="relative w-full h-full">
                    {/* Glow effect behind image */}
                    <div
                      className={`absolute inset-0 ${colorConfig[item.color].accent} opacity-10 blur-xl rounded-full`}
                    ></div>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain drop-shadow-lg"
                      sizes="(max-width: 768px) 144px, 176px"
                    />
                  </div>
                </div>

                {/* Pulse animation on hover */}
                {activeCard === item.id && (
                  <div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent animate-pulse"
                    style={{ borderColor: colorConfig[item.color].accent }}
                  ></div>
                )}
              </div>
            ),
          )}
        </div>

        {/* View all button for mobile */}
        <div className="mt-12 text-center lg:hidden">
          <Link href="/jobs">
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
              Browse All Job Categories
            </button>
          </Link>
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
            <div className="text-gray-600">Daily Job Searches</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600">Companies Hiring</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600">New Opportunities</div>
          </div>
        </div>
      </div>
    </section>
  );
}
