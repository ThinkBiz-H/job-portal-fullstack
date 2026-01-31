"use client";

import Image from "next/image";
import Link from "next/link";

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

const hoverColors = {
  orange: "hover:border-orange-500 hover:bg-orange-50",
  green: "hover:border-green-600 hover:bg-green-50",
  blue: "hover:border-blue-600 hover:bg-blue-50",
  purple: "hover:border-purple-600 hover:bg-purple-50",
};

export default function PopularSearches() {
  return (
    <section className="bg-[#fafafa] py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* MAIN GRID (6 BOXES) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((item) =>
            /* FIRST BOX = TITLE */
            item.type === "title" ? (
              <div key={item.id} className="bg-transparent flex items-center">
                <h2 className="text-4xl md:text-5xl font-bold  text-blackleading-tight">
                  Popular <br />
                  Searches on <br />
                  Apna
                </h2>
              </div>
            ) : (
              /* NORMAL CARDS */
              <div
                key={item.id}
                className={`group relative bg-white rounded-2xl border border-gray-200 
                p-8 min-h-[280px] overflow-hidden cursor-pointer
                transition-all duration-300 hover:shadow-xl
                ${hoverColors[item.color]}`}
              >
                {/* TAG */}
                <p className="text-xs text-gray-400 mb-2 uppercase">
                  {item.tag}
                </p>

                {/* TITLE */}
                <h3 className="text-xl font-semibold mb-3 relative z-10">
                  {item.title}
                </h3>

                {/* WATERMARK */}
                <h2
                  className="absolute top-16 left-5 text-5xl font-bold 
                  text-gray-200 opacity-30 select-none pointer-events-none
                  transition-all duration-300
                  group-hover:translate-x-3"
                >
                  {item.title.split(" ")[0]}
                </h2>

                {/* BUTTON */}
                <Link href={`/jobs`}>
                  <button
                    className="mt-4 flex items-center gap-2 text-sm font-medium
                    text-gray-800 border border-gray-300
                    px-4 py-2 rounded-md transition-all
                    group-hover:bg-orange-500 
                    group-hover:text-white
                    group-hover:border-orange-500"
                  >
                    View all →
                  </button>
                </Link>

                {/* IMAGE */}
                <div
                  className="absolute bottom-3 right-3 w-40 h-40
                  transition-all duration-300
                  group-hover:scale-105"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
